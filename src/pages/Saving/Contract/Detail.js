import React, { useEffect, useState, Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import CardCollapse from "components/Common/CardCollapse";
import { useHistory, useParams, Link } from "react-router-dom";
import InputField from "components/form-control/InputField";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
import httpService from "services/httpService";
import { useForm } from "react-hook-form";
import { CommonText } from "components/Common/TextCommon";
import VVSTable from "components/form-control/VVSTable";
import UploadFIle from "components/form-control/UploadFile";
import TextareaField from "components/form-control/Textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadFilesApi } from "apis/file";
import SelectConst from "components/form-control/SelectConst";
import toastr from "toastr";
import { checkIsJSON, formatNumber } from "helpers/erp_helper";
import ModalCommon from "components/Common/ModalCommon";
import SelectField from "components/form-control/Select";
import _ from "lodash";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { useRoles } from "hooks/useRoles";

const ACCOUNTANT = "Accountant";
const selectProperty = [
  { index: 0, name: "Đang hiệu lực", value: "effective" },
  { index: 1, name: "Đã tất toán sớm", value: "early-settled" },
  { index: 2, name: "Đã thanh lý", value: "completed" },
  { index: 3, name: "Đang xử lý", value: "pending" },
  { index: 4, name: "Đã huỷ", value: "canceled" },
];

const validationSchema = yup.object().shape({
  attachments: yup.array().min(1, "Đính kèm ít nhất 1 file").required(),
  note: yup.string().required("Hãy ghi gì đó"),
});

function DetailContract() {
  const history = useHistory();
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [contractTemplate, setContractTemplate] = useState(null);
  const [detailContract, setDetailContract] = useState(null);
  const { id: code } = params;
  const { roles } = useRoles();
  const formProps = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formProps;
  const [reRenderTransactionTable, setReRenderTransactionTable] =
    useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(async () => {
    try {
      const url = "/parse/classes/Contract";
      const params = {
        where: { code },
        limit: 1,
        include: [
          "interestRateRef",
          "customer.accounts",
          "customer.user",
          "order",
        ],
      };
      const response = await httpService.get(url, { params });
      const kycInformationUrl = `/parse/classes/KycInformation?where={"customer":{"__type":"Pointer", "className":"Customer", "objectId":"${response.results[0]?.customer?.objectId}"}}`;
      const kycInfoResponse = (await httpService.get(kycInformationUrl))
        .results[0];

      if (!response.results.length) {
        history.push("/pages-404");
        return;
      }
      const contractSelected = response.results[0];
      const addressParseObj = checkIsJSON(
        contractSelected.customer?.addressLine1
      )
        ? JSON.parse(contractSelected.customer?.addressLine1)
        : null;
      const addressParseObj2 = checkIsJSON(
        contractSelected.customer?.addressLine2
      )
        ? JSON.parse(contractSelected.customer?.addressLine2)
        : null;

      const customer = contractSelected.customer;
      customer.wallet = customer.accounts.find(
        account => account.type == "wallet"
      );
      customer.saving = customer.accounts.find(
        account => account.type == "saving"
      );
      customer.bankAccount = customer.accounts
        .filter(account => account.type == "bank")
        .map(account => ({
          value: `${account.accountNumber}`,
          text: `${account.bank.vn_name || ""}-${account.accountNumber}`,
        }));
      setDetailContract(contractSelected);
      reset({
        ...contractSelected,
        startDate: {
          iso: moment(contractSelected.startDate.iso).format(
            "yyyy-MM-DD HH:mm"
          ),
        },
        endDate: {
          iso: moment(contractSelected.endDate.iso).format("yyyy-MM-DD HH:mm"),
        },
        total: formatNumber(contractSelected.total),
        customer,
        note: "",
        attachments: [],
      });
      setValue(
        "customer.wallet.balance",
        formatNumber(customer.wallet.balance) || 0
      );
      setValue(
        "customer.saving.balance",
        formatNumber(customer.saving.balance) || 0
      );

      setValue("customer.CCCDNumber", kycInfoResponse.CCCDNumber || 0);
      setValue("customer.CCCDIssuePlace", kycInfoResponse.CCCDIssuePlace || "");
      setValue(
        "customer.CCCDIssueDate",
        customer.birthday
          ? moment(kycInfoResponse.CCCDIssueDate.iso).format("DD-MM-YYYY")
          : ""
      );
      setValue(
        "customer.birthday",
        customer.birthday
          ? moment(customer.birthday.iso).format("DD-MM-YYYY")
          : ""
      );
      setValue(
        "customer.addressLine1",
        !_.isEmpty(addressParseObj)
          ? `${addressParseObj?.addr}-${addressParseObj?.ward}-${addressParseObj?.district}-${addressParseObj?.city}`
          : ""
      );
      setValue(
        "customer.addressLine2",
        !_.isEmpty(addressParseObj2)
          ? `${addressParseObj2?.addr}-${addressParseObj2?.ward}-${addressParseObj2?.district}-${addressParseObj2?.city}`
          : ""
      );

      const contractTemplateUrl = `/api/v1/pages/contract/${contractSelected.objectId}`;
      const contractTemplate = await httpService.get(contractTemplateUrl);
      setContractTemplate(contractTemplate);
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await httpService.get(GET_CURRENT_USER);
      setCurrentUser(response);
    } catch (err) {
      console.log("Api get creator failed");
    }
  }, []);
  const handleSaveNote = async values => {
    try {
      const firstIndexUnUploaded = values.attachments.findIndex(
        attachment => !attachment.url
      );
      const responseUploadFiles = await uploadFilesApi(
        values.attachments.slice(firstIndexUnUploaded)
      );
      values.attachments.splice(
        firstIndexUnUploaded,
        responseUploadFiles.length,
        ...responseUploadFiles
      );
      const postAttachmentFormat = {
        note: values.note,
        attachments: values.attachments,
        contract: {
          __type: "Pointer",
          className: "Contract",
          objectId: getValues("objectId"),
        },
        createdBy: {
          __type: "Pointer",
          className: "_User",
          objectId: currentUser?.objectId || "",
        },
      };
      try {
        const url = "/parse/classes/ContractAttachment";
        await httpService.post(url, postAttachmentFormat);
        toastr.success("Tạo ghi chú thành công");
        setValue("note", "");
        setValue("attachments", []);
        setReRenderTransactionTable(prev => !prev);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderCustomerInfo = (
    <>
      <Row>
        <Col xs={4}>
          <InputField
            label={
              <Fragment>
                Mã khách hàng
                <Link to={`/customer/${getValues("customer.objectId")}`}>
                  (chi tiết)
                </Link>
              </Fragment>
            }
            register={register}
            readOnly
            name="customer.code"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Họ tên"
            register={register}
            readOnly
            name="customer.fullName"
          />
        </Col>
        {!roles?.includes(ACCOUNTANT) && (
          <Col xs={4}>
            <InputField
              label="Số điện thoại"
              register={register}
              readOnly
              name="customer.phone"
            />
          </Col>
        )}
        <Col xs={4}>
          <InputField
            label="Ngày sinh"
            register={register}
            readOnly
            name="customer.birthday"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Giới tính"
            register={register}
            readOnly
            name="customer.gender"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Số CMND/CCCD"
            register={register}
            readOnly
            name="customer.CCCDNumber"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Ngày cấp"
            register={register}
            readOnly
            name="customer.CCCDIssueDate"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Nơi cấp"
            register={register}
            readOnly
            name="customer.CCCDIssuePlace"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Địa chỉ liên hệ"
            register={register}
            readOnly
            name="customer.addressLine1"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Địa chỉ thường trú"
            register={register}
            readOnly
            name="customer.addressLine2"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Số dư ví cá nhân"
            register={register}
            readOnly
            name="customer.wallet.balance"
          />
        </Col>
        <Col xs={4}>
          <InputField
            label="Số dư ví tích luỹ"
            register={register}
            readOnly
            name="customer.saving.balance"
          />
        </Col>
        <Col xs={4}>
          <SelectConst
            label="Danh sách tài khoản ngân hàng"
            options={getValues(`customer.bankAccount`)}
            disableEmptyOption
          />
        </Col>
      </Row>
      <VVSTable
        name="CustomerAccount"
        whereQuery={{
          type: "bank",
          customer: {
            __type: "Pointer",
            className: "Customer",
            objectId: getValues("customer.objectId"),
          },
        }}
        disableAdd
        disableDelete
        disableSearch
        className="m-0 p-0 shadow-none"
      />
    </>
  );
  const renderAttachment = (
    <React.Fragment>
      <Row>
        <Col xs={4}>
          <UploadFIle
            name="attachments"
            label="Nhấn để đính kèm file"
            errors={errors}
            {...formProps}
          />
        </Col>
        <Col xs={8}>
          <TextareaField
            register={register}
            name="note"
            rows={10}
            label={<strong>Ghi chú</strong>}
            required
            errors={errors}
          />
        </Col>
      </Row>
      <VVSTable
        name="ContractAttachment"
        disableAdd
        disableDelete
        disableSearch
        whereQuery={{
          contract: {
            __type: "Pointer",
            className: "Contract",
            objectId: getValues("objectId") || "",
          },
        }}
        triggerRerender={reRenderTransactionTable}
      />
    </React.Fragment>
  );

  const renderSavingHistory = getValues("objectId") ? (
    <VVSTable
      name="TransactionContract"
      disableDelete
      disableAdd
      disableSearch
      whereQuery={{
        contract: {
          __type: "Pointer",
          className: "Contract",
          objectId: getValues("objectId"),
        },
      }}
    />
  ) : null;

  // const handlePaymentConstract = async () => {
  //   try {
  //     const url = "/parse/functions/liquidateContract";
  //     const { result } = await httpService.post(url, {
  //       contractId: detailContract.objectId,
  //     });
  //     if (result) toastrErrorAlert(result);
  //       else {    toastrSuccessAlert("Thanh lý hộp đồng thành công");
  //  }
  //   } catch (error) {
  //     console.log(error);
  //     toastrErrorAlert("Thanh lý hộp đồng thất bại");
  //   }
  // };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <HeaderCreateItem
                title={`Chi tiết hợp đồng ${code}`}
              ></HeaderCreateItem>
              <div className="d-flex gap-1">
                {/* <CommonButton level={2} type="button" >
                  Hủy hộp đồng
                </CommonButton> */}
                {/* <CommonButton
                  level={3}
                  type="button"
                  onClick={handlePaymentConstract}
                >
                  Thanh lý
                </CommonButton> */}
                <CommonButton
                  type="button"
                  level={0}
                  onClick={() => {
                    window.open(
                      `https://vset.live1.vn/api/v1/pages/contract/${detailContract.objectId}`,
                      "_blank"
                    );
                  }}
                >
                  Xem hợp đồng
                </CommonButton>
              </div>

              {/* {detailContract?.paidAmount === detailContract?.total && (
                <CommonButton level={3}>Thanh lý</CommonButton>
              )} */}
              {/* {detailContract?.isAllowEarlySettle &&
                detailContract?.status !== "early-settled" && (
                  <CommonButton level={0}>Tất toán sớm</CommonButton>
                )} */}
            </div>
            {detailContract?.isAllowEarlySettle &&
              detailContract?.status === "early-settled" && (
                <Card body>
                  <CommonText level={1}>Thông tin tất toán sớm</CommonText>
                  <Row>
                    <Col sm={3}>
                      <Row>
                        <CommonText className="text-danger">
                          Tiền phạt 20%
                        </CommonText>
                        <CommonText
                          style={{
                            display: "block",
                            width: "100%",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            backgroundClip: "padding-box",
                            boxShadow: "none",
                            marginTop: "0.5rem",
                          }}
                        >
                          {detailContract &&
                            formatNumber(detailContract.total * 0.2)}
                        </CommonText>
                      </Row>
                    </Col>
                    <Col sm={3}>
                      <Row>
                        <CommonText className="text-danger">
                          Tiền lãi đã nhận
                        </CommonText>
                        <CommonText
                          style={{
                            display: "block",
                            width: "100%",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            backgroundClip: "padding-box",
                            boxShadow: "none",
                            marginTop: "0.5rem",
                          }}
                        >
                          {detailContract &&
                            formatNumber(detailContract.currentInterest)}
                        </CommonText>
                      </Row>
                    </Col>
                    <Col sm={3}>
                      <Row>
                        <CommonText className="text-danger">
                          Chiết khấu
                        </CommonText>
                        <CommonText
                          style={{
                            display: "block",
                            width: "100%",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            backgroundClip: "padding-box",
                            boxShadow: "none",
                            marginTop: "0.5rem",
                          }}
                        ></CommonText>
                      </Row>
                    </Col>
                    <Col sm={3}>
                      <Row>
                        <CommonText className="text-danger">
                          Tổng tiền còn lại
                        </CommonText>
                        <CommonText
                          style={{
                            display: "block",
                            width: "100%",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            backgroundClip: "padding-box",
                            boxShadow: "none",
                            marginTop: "0.5rem",
                          }}
                        >
                          {detailContract &&
                            formatNumber(
                              detailContract.total -
                                detailContract.total * 0.2 -
                                detailContract.currentInterest
                            )}
                        </CommonText>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              )}

            <Card body>
              <CommonText level={1}>Thông tin hợp đồng</CommonText>
              <Row>
                <Col>
                  <InputField
                    label="Mã hợp dồng"
                    register={register}
                    readOnly
                    name="code"
                  />
                </Col>
                <Col>
                  <InputField
                    label="Gói tích luỹ"
                    register={register}
                    readOnly
                    name="interestRateRef.name"
                  />
                </Col>
                <Col>
                  <SelectField
                    label="Trạng thái"
                    register={register}
                    required
                    name="status"
                    options={selectProperty}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Tổng giá trị"
                    register={register}
                    readOnly
                    name="total"
                  />
                </Col>
                <Col>
                  <InputField
                    label="Số kỳ tích luỹ(tháng)"
                    register={register}
                    readOnly
                    name="interestRateRef.noPeriods"
                  />
                </Col>
                <Col>
                  <InputField
                    label="Lãi suất(%)"
                    register={register}
                    readOnly
                    name="interestRateRef.rate"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Thời gian bắt đầu"
                    register={register}
                    readOnly
                    type="datetime-local"
                    name="startDate.iso"
                  />
                </Col>
                <Col>
                  <InputField
                    label="Thời gian dự kiến hết hạn"
                    register={register}
                    readOnly
                    type="datetime-local"
                    name="endDate.iso"
                  />
                </Col>
                <Col>
                  <InputField
                    label="Mã đơn hàng"
                    register={register}
                    readOnly
                    name="order.code"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <InputField
                    label="Chiết khấu"
                    register={register}
                    readOnly
                    name="dsadsa"
                  />
                </Col>
              </Row>
            </Card>
          </form>
          <CardCollapse
            element={renderCustomerInfo}
            title="Thông tin khách hàng"
            defaultFlag={true}
          />
          <CardCollapse
            element={renderAttachment}
            title="File đính kèm"
            defaultFlag={false}
            topRightElement={
              <CommonButton
                level={0}
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleSubmit(handleSaveNote)();
                }}
              >
                Lưu
              </CommonButton>
            }
          />
          <CardCollapse
            element={renderSavingHistory}
            defaultFlag={true}
            title="Lịch sử tích luỹ"
          />
        </Container>
      </div>
      <ModalCommon
        modalTitle="Chi tiết hợp đồng"
        isShowModal={openModal}
        onClose={() => setOpenModal(false)}
        size="xl"
      >
        <div className="px-5 pt-5">
          <div dangerouslySetInnerHTML={{ __html: contractTemplate }} />
        </div>
      </ModalCommon>
    </React.Fragment>
  );
}

export default DetailContract;
