import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, ModalBody, ModalFooter } from "reactstrap";
import CardCollapse from "components/Common/CardCollapse";
import { Link, useHistory, useParams } from "react-router-dom";
import InputField from "components/form-control/InputField";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
import httpService from "services/httpService";
import { useForm } from "react-hook-form";
import SelectConst from "components/form-control/SelectConst";
import { Fragment } from "react";
import TextareaField from "components/form-control/Textarea";
import UploadFIle from "components/form-control/UploadFile";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadFilesApi } from "apis/file";
import VVSTable from "components/form-control/VVSTable";
import { GET_CURRENT_USER, GET_REFERRAL_BONUS } from "helpers/url_helper";
import toastr from "toastr";
import { formatNumber } from "helpers/erp_helper";
import ModalCommon from "components/Common/ModalCommon";
import { CommonText } from "components/Common/TextCommon";
import { translateAccount } from "helpers/erp_helper";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import { useRoles } from "hooks/useRoles";

const validationSchema = yup.object().shape({
  attachments: yup.array().min(1, "Đính kèm ít nhất 1 file").required(),
  note: yup.string().required("Hãy ghi gì đó"),
});
const ACCOUNTANT = "Accountant";

function DetailTransactionMoney() {
  const history = useHistory();
  const params = useParams();
  const { roles } = useRoles();
  const [currentUser, setCurrentUser] = useState(null);
  const [reRenderTransactionTable, setReRenderTransactionTable] =
    useState(false);
  const { id: code } = params;
  const [toggleCompleteTransaction, setToggleCompleteTransaction] =
    useState(false);
  const [toggleCancleTransaction, setToggleCancelTransaction] = useState(false);
  const formProps = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    reset,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formProps;
  const status = watch("status");
  useEffect(async () => {
    try {
      const url = "/parse/classes/Transaction";
      const params = {
        where: { code },
        limit: 1,
        include: [
          "order",
          "target.customer.accounts.bank",
          "source.customer.accounts.bank",
          "target.customer.user",
          "source.customer.user",
          "target.bank",
          "source.bank",
        ],
      };
      const response = await httpService.get(url, { params });
      const resReferralBonus = await httpService.get(GET_REFERRAL_BONUS, {
        params: {
          where: {
            customer: response.results[0]?.customer,
          },
        },
      });
      if (!response.results.length) {
        history.replace("/pages-404");
        return;
      }
      const transactionSelected = response.results[0];

      transactionSelected.targetName = translateAccount(
        transactionSelected.target
      );
      transactionSelected.sourceName = translateAccount(
        transactionSelected.source
      );
      const customer =
        transactionSelected.target?.customer ||
        transactionSelected.source?.customer;
      if (customer) {
        customer.wallet = customer.accounts.find(
          account => account.type == "wallet"
        );
        if (customer.wallet)
          customer.wallet.balance = formatNumber(customer.wallet.balance);
        customer.saving = customer.accounts.find(
          account => account.type == "saving"
        );
        if (customer.saving)
          customer.saving.balance = formatNumber(customer.saving.balance);
        customer.bankAccount = customer.accounts
          .filter(account => account.type == "bank")
          .map(account => ({
            value: `${account.accountNumber}`,
            text: `${account.bank?.Name ? account.bank.Name + ". " : ""}${
              account.accountNumber ? "STK: " + account.accountNumber : ""
            }`,
          }));
      }

      reset({
        ...transactionSelected,
        amount: formatNumber(Math.abs(transactionSelected.amount)) || 0,
        createdAt: moment(transactionSelected.createdAt).format(
          "YYYY-MM-DDTHH:mm"
        ),
        customer,
        note: "",
        attachments: [],
        ["referralBonus.balance"]: formatNumber(
          resReferralBonus.results[0]?.balance
        ),
      });
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
        transaction: {
          __type: "Pointer",
          className: "Transaction",
          objectId: getValues("objectId"),
        },
        createdBy: {
          __type: "Pointer",
          className: "_User",
          objectId: currentUser?.objectId || "",
        },
      };
      try {
        const url = "/parse/classes/TransactionAttachment";
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
  const renderTransacTionInfo = (
    <Row>
      <Col xs={4}>
        <InputField
          label="Mã giao dịch"
          register={register}
          readOnly
          name="code"
        />
      </Col>
      <Col xs={4}>
        <SelectConst
          label="Trạng thái"
          disableOptions
          sysCfgName="transactionStatus"
          name="status"
          {...formProps}
        />
      </Col>
      <Col xs={4}>
        <SelectConst
          label="Loại giao dịch"
          disableOptions
          sysCfgName="transactionMoney"
          name="type"
          {...formProps}
        />
      </Col>
      <Col xs={4}>
        <InputField
          label="Số tiền"
          register={register}
          readOnly
          name="amount"
        />
      </Col>
      {getValues("source") && (
        <Col xs={4}>
          <InputField
            label="Tài khoản nguồn"
            register={register}
            readOnly
            name="sourceName"
          />
        </Col>
      )}
      {getValues("target") && (
        <Col xs={4}>
          <InputField
            label="Tài khoản đích"
            register={register}
            readOnly
            name="targetName"
          />
        </Col>
      )}

      <Col xs={4}>
        <InputField
          label="Ngày tạo"
          register={register}
          readOnly
          type="datetime-local"
          name="createdAt"
        />
      </Col>
      <Col xs={4}>
        <InputField label="Nội dung" register={register} name="memo" readOnly />
      </Col>
    </Row>
  );
  const renderCustomerInfo = (
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
          label="Họ và tên"
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
            name="customer.user.phone"
          />
        </Col>
      )}
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
      <Col xs={4}>
        <InputField
          label="Số dư ví hoa hồng"
          register={register}
          readOnly
          name="referralBonus.balance"
        />
      </Col>
    </Row>
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
        name="TransactionAttachment"
        disableAdd
        disableDelete
        disableSearch
        whereQuery={{
          transaction: {
            __type: "Pointer",
            className: "Transaction",
            objectId: getValues("objectId") || "",
          },
        }}
        triggerRerender={reRenderTransactionTable}
      />
    </React.Fragment>
  );

  const handleCompleteTransaction = async () => {
    try {
      const url = `/parse/classes/Transaction/${getValues("objectId")}`;
      const updateTransaction = {
        status: "completed",
      };
      const res = await httpService.put(url, updateTransaction);
      if (res?.status) {
        toastrErrorAlert(
          "Bạn không đủ tiền trong tài khoản để hoàn thành giao dịch này, xác nhận giao dịch không thành công!!"
        );
        return;
      }
      setValue("status", "completed");
      setToggleCompleteTransaction(false);
      toastr.success("Hoàn thành giao dịch");
    } catch (err) {
      console.log("Update transaction failed");
    }
  };

  const handleCancelTransaction = async () => {
    try {
      const url = `/parse/classes/Transaction/${getValues("objectId")}`;
      const updateTransaction = {
        status: "canceled",
      };
      await httpService.put(url, updateTransaction);
      setValue("status", "canceled");
      setToggleCancelTransaction(false);
      toastr.warning("Giao dịch đã bị hủy");
    } catch (err) {
      console.log("Update transaction failed");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form>
          <HeaderCreateItem title={`Chi tiết giao dịch #${code}`}>
            {status == "requested" && (
              <div className="d-flex align-items-center">
                <CommonButton
                  level={3}
                  type="button"
                  onClick={() => setToggleCompleteTransaction(true)}
                >
                  Xác nhận thành công
                </CommonButton>
                <div style={{ width: "12px" }} />
                <CommonButton
                  level={2}
                  type="button"
                  onClick={() => setToggleCancelTransaction(true)}
                >
                  Hủy giao dịch
                </CommonButton>
              </div>
            )}
          </HeaderCreateItem>
          <Card body>{renderTransacTionInfo}</Card>
          <CardCollapse
            element={renderCustomerInfo}
            title="Thông tin khách hàng"
            defaultFlag={true}
          />
          <CardCollapse
            element={renderAttachment}
            title="File đính kèm"
            defaultFlag={true}
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
        </form>
      </Container>
      <ModalCommon
        modalTitle="Cập nhật trạng thái hoàn thành"
        isShowModal={toggleCompleteTransaction}
        onClose={() => setToggleCompleteTransaction(false)}
      >
        <ModalBody className="px-2">
          <CommonText
            style={{ fontSize: 16, fontWeight: "normal" }}
            level={0}
            className=""
          >
            Tác vụ không thể hoàn tác
          </CommonText>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => setToggleCompleteTransaction(false)}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleCompleteTransaction}
            type="button"
          >
            Xác nhận
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
      <ModalCommon
        modalTitle="Hủy giao dịch"
        isShowModal={toggleCancleTransaction}
        onClose={() => setToggleCancelTransaction(false)}
      >
        <ModalBody>
          <CommonText
            style={{ fontSize: 16, fontWeight: "normal" }}
            level={0}
            mt={0}
          >
            Tác vụ không thể hoàn tác
          </CommonText>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => setToggleCancelTransaction(false)}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleCancelTransaction}
            type="button"
          >
            Xác nhận
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </div>
  );
}

export default DetailTransactionMoney;
