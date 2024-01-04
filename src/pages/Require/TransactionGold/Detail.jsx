import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
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
import {
  GET_APPOINTMENT,
  GET_BRANCH,
  GET_CURRENT_USER,
} from "helpers/url_helper";
import toastr from "toastr";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { language_vn } from "helpers/language_vn";
const validationSchema = yup.object().shape({
  attachments: yup.array().min(1, "Đính kèm ít nhất 1 file").required(),
  note: yup.string().required("Hãy ghi gì đó"),
});
function DetailTransactionGold() {
  const history = useHistory();
  const params = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [branchTransactionDetail, setBranchTransactionDetail] = useState({});
  const [reRenderTransactionTable, setReRenderTransactionTable] =
    useState(false);
  const { id: objectId } = params;
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

  useEffect(async () => {
    try {
      const url = "/parse/classes/Appointment/" + objectId;
      const params = {
        include: ["order", "customer", "customer.user", "order.contract"],
      };
      const response = await httpService.get(url, { params });

      const transactionSelected = response;
      if (response.delivery?.store) {
        const resBranch = await httpService.get(
          GET_BRANCH + `/${response.delivery?.store}`
        );
        setBranchTransactionDetail(resBranch);
      }
      setTransactionDetail(response);
      reset({
        ...transactionSelected,
        createdAt: moment(transactionSelected.createdAt).format(
          "YYYY-MM-DDTHH:mm"
        ),
        scheduledTime: {
          iso: moment(transactionSelected?.scheduledTime?.iso).format(
            "YYYY-MM-DDTHH:mm"
          ),
        },
        note: "",
        attachments: [],
      });
      setValue("order.contract.code", transactionSelected?.details);
    } catch (err) {
      if (err.error == "Object not found.") history.replace("/pages-404");
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
        appointment: {
          __type: "Pointer",
          className: "Appointment",
          objectId: getValues("objectId"),
        },
        createdBy: {
          __type: "Pointer",
          className: "_User",
          objectId: currentUser?.objectId || "",
        },
      };
      try {
        const url = "/parse/classes/AppointmentAttachment";
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
          label="Số điện thoại"
          register={register}
          readOnly
          name="customer.phone"
        />
      </Col>
      <Col xs={4}>
        <SelectConst
          label="Trạng thái"
          register={register}
          disableOptions
          sysCfgName="transactionGoldStatus"
          name="status"
        />
      </Col>
      {transactionDetail && transactionDetail?.type !== "sell_gold" && (
        <Col xs={4}>
          <InputField
            label={
              <Fragment>
                Mã đơn hàng
                <Link to={`/order/${getValues("order.code")}`}>(chi tiết)</Link>
              </Fragment>
            }
            register={register}
            readOnly
            name="order.code"
          />
        </Col>
      )}

      {transactionDetail && transactionDetail?.type !== "sell_gold" && (
        <Col xs={4}>
          <InputField
            label={
              <Fragment>
                Mã hợp đồng
                <Link to={`/contract/${getValues("order.contract.code")}`}>
                  (chi tiết)
                </Link>
              </Fragment>
            }
            register={register}
            readOnly
            name="order.contract.code"
          />
        </Col>
      )}

      <Col xs={4}>
        <SelectConst
          label="Loại giao dịch"
          register={register}
          disableOptions
          sysCfgName="transactionGold"
          name="type"
        />
      </Col>
      <Col xs={4}>
        <InputField
          label="Ngày hẹn"
          register={register}
          readOnly
          type="datetime-local"
          name="scheduledTime.iso"
        />
      </Col>
      <Col xs={4}>
        <InputField
          label="Ngày tạo"
          register={register}
          readOnly
          type="datetime-local"
          name="createdAt"
        />
      </Col>

      <Col xs={12}>
        <p
          className="mt-3"
          style={{
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Đã xác nhận cuộc hẹn tại{" "}
          {transactionDetail.delivery && (
            <strong className="text-danger">
              {transactionDetail.delivery?.method === "GET_GOLD_DELIVERY"
                ? `${transactionDetail.delivery?.addr}-${transactionDetail.delivery?.ward}-${transactionDetail.delivery?.district}-${transactionDetail.delivery?.city}`
                : branchTransactionDetail.name}
            </strong>
          )}
        </p>
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
        name="AppointmentAttachment"
        disableAdd
        disableDelete
        disableSearch
        whereQuery={{
          appointment: {
            __type: "Pointer",
            className: "Appointment",
            objectId: getValues("objectId") || "",
          },
        }}
        triggerRerender={reRenderTransactionTable}
      />
    </React.Fragment>
  );

  const handleCancelAppointment = async status => {
    try {
      const response = await httpService.put(
        GET_APPOINTMENT + `/${transactionDetail?.objectId}`,
        {
          status,
        }
      );
      if (response?.updatedAt) {
        setValue("status", status);
        toastrSuccessAlert(
          status === "canceled"
            ? "Huỷ lịch thành công!!!"
            : status === "confirmed"
            ? "Đặt lịch thành công!!!"
            : ""
        );
        return;
      }
      toastrErrorAlert(language_vn.error);
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form>
            <HeaderCreateItem title={`Chi tiết giao dịch vàng`}>
              <div className="d-flex align-items-center">
                {(getValues("status") === "unconfirmed" ||
                  getValues("status") !== "confirmed") && (
                  <CommonButton
                    level={3}
                    type="button"
                    onClick={() => handleCancelAppointment("confirmed")}
                  >
                    Xác nhận
                  </CommonButton>
                )}
                <div style={{ width: "12px" }} />
                {getValues("status") !== "canceled" && (
                  <CommonButton
                    level={2}
                    type="button"
                    onClick={() => handleCancelAppointment("canceled")}
                  >
                    Hủy lịch
                  </CommonButton>
                )}
              </div>
            </HeaderCreateItem>
            <Card body>{renderTransacTionInfo}</Card>
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
      </div>
    </React.Fragment>
  );
}
export default DetailTransactionGold;
