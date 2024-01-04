import React, { useRef, useEffect } from "react";
import {
  Col,
  Row,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from "reactstrap";
import { CommonButton } from "components/Common/ButtonCommon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-control/InputField";
import httpService from "services/httpService";
import toastr from "toastr";
import TextareaField from "components/form-control/Textarea";
import { CommonText } from "components/Common/TextCommon";
import { formatNumber } from "helpers/erp_helper";
import SelectConst from "components/form-control/SelectConst";

export default function ModalAppointment({
  toggle,
  setToggle,
  orderInfo,
  setPaymentSuccess,
  postOrder,
  currentEmployee,
}) {
  const validateSchema = yup.object().shape({
    depositAmount: yup
      .string()
      .test(
        "lowerThanTotal",
        "Số tiền vượt quá tổng",
        value => Number(value.replace(".", "")) < orderInfo?.total || 0
      ),
    scheduledTime: yup.date().required("Hãy chọn lịch hẹn"),
  });
  const formProps = useForm({
    mode: "onBlur",
    defaultValues: {
      note: "",
      status: "confirmed",
      scheduledTime: "",
      depositAmount: "",
    },
    resolver: yupResolver(validateSchema),
  });
  const { handleSubmit, getValues, reset } = formProps;
  const handleDeposit = async () => {
    console.log(getValues("scheduledTime"));
    try {
      //createOrder
      const urlCreateOrder = "/api/v1/create-order";
      const response = await httpService.post(urlCreateOrder, postOrder);
      toastr.success("Thanh toán thành công");
      setToggle(false);
      setPaymentSuccess(true);
      reset();
      const orderId = response.results.objectId;
      //update Order
      try {
        const url = `/parse/classes/Order/${orderId}`;
        const updateOrder = {
          status: "confirmed",
          branchName: currentEmployee?.branch?.name || "",
          cashier: {
            __type: "Pointer",
            className: "Employee",
            objectId: currentEmployee?.objectId || "",
          },
        };
        httpService.put(url, updateOrder);
      } catch (err) {}
      try {
        //Get Branch Account
        const urlGetBranchAccount = "/parse/classes/Account";
        const paramsBranchAccount = {
          limit: 1,
          where: {
            branch: {
              __type: "Pointer",
              className: "Branch",
              objectId: currentEmployee?.branch?.objectId || "",
            },
          },
        };
        //Create Appointment
        const urlCreateAppointment = "/parse/classes/Appointment";
        const postAppointment = {
          status: "confirmed",
          paymentMethod: "GET_GOLD_STORE",
          order: {
            __type: "Pointer",
            className: "Order",
            objectId: orderId,
          },
          scheduledTime: {
            __type: "Date",
            iso: getValues("scheduledTime"),
          },
          note: getValues("note"),
          delivery: {
            store: currentEmployee?.branch?.objectId,
            pickupDate: getValues("scheduledTime"),
            method: "GET_GOLD_STORE",
          },
          type: "receive_gold",
          customer: {
            __type: "Pointer",
            className: "Customer",
            objectId: orderInfo.customer.objectId,
          },
        };
        const combinedApi = await Promise.all([
          httpService.get(urlGetBranchAccount, { params: paramsBranchAccount }),
          httpService.post(urlCreateAppointment, postAppointment),
        ]);

        const branchAccountId = combinedApi[0].results[0].objectId;
        //create Transaction
        // try {
        //   const url = `/parse/classes/Transaction`;
        //   const createdTransaction = {
        //     status: "confirmed",
        //     type: "pay",
        //     cashier: {
        //       __type: "Pointer",
        //       className: "Employee",
        //       objectId: currentEmployee.objectId,
        //     },
        //     amount: -Number(getValues("depositAmount").replace(".", "")),
        //     target: {
        //       __type: "Pointer",
        //       className: "Account",
        //       objectId: branchAccountId,
        //     },
        //     order: {
        //       __type: "Pointer",
        //       className: "Order",
        //       objectId: orderId,
        //     },
        //   };
        //   httpService.post(url, createdTransaction);
        // } catch (err) {}
      } catch (err) {}
    } catch (err) {}
  };
  if (!orderInfo) return null;
  return (
    <Modal size="lg" isOpen={toggle} centered={true}>
      <ModalHeader style={{ textTransform: "capitalize" }}>
        Đặt cọc và hẹn lịch
      </ModalHeader>
      <ModalBody className="px-2">
        <Row>
          <Col>
            {/* <SelectConst
                            label="Phương thức"
                            name="codMethod"
                            {...formProps}
                            errors={formProps.formState.errors}
                            options={[
                                { value: "cash", text: "Tiền mặt" },
                                { value: "banktransfer", text: "Chuyển khoản" },
                            ]}
                        /> */}
            <InputField
              label="Tiền cọc"
              name="depositAmount"
              {...formProps}
              errors={formProps.formState.errors}
            />
            <InputField
              label="Ngày hẹn"
              name="scheduledTime"
              type="datetime-local"
              {...formProps}
              errors={formProps.formState.errors}
            />
          </Col>
          <Col>
            <TextareaField
              name="note"
              label={<span className="fw-bold">Mô tả yêu cầu</span>}
              {...formProps}
              errors={formProps.formState.errors}
              rows={6}
            />
          </Col>
        </Row>
        <hr />
        <div className="d-flex">
          <CommonText level={1} className="mt-0">
            Trả thực
          </CommonText>
          <CommonText level={1} className="text-danger ms-auto mt-0">
            {formatNumber(orderInfo.total || 0)}
          </CommonText>
        </div>
      </ModalBody>
      <ModalFooter>
        <CommonButton level={0} onClick={() => setToggle(false)} type="button">
          Hủy
        </CommonButton>
        <CommonButton
          level={2}
          onClick={handleSubmit(handleDeposit)}
          type="button"
        >
          Hoàn tất
        </CommonButton>
      </ModalFooter>
    </Modal>
  );
}
ModalAppointment.propTypes = {
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
  setPaymentSuccess: PropTypes.func,
  orderInfo: PropTypes.object,
  postOrder: PropTypes.object,
  currentEmployee: PropTypes.object,
};
