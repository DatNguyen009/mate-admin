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
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-control/InputField";
import httpService from "services/httpService";
import toastr from "toastr";
import ModalCommon from "components/Common/ModalCommon";
import SelectConst from "components/form-control/SelectConst";
import { CommonText } from "components/Common/TextCommon";
import { formatNumber } from "helpers/erp_helper";
import VVSSelectModel from "components/form-control/VVSSelectModel";
export default function ModalPayment({
  toggle,
  setToggle,
  getInfo,
  cashier,
  onCreateSuccess,
}) {
  const validateSchema = yup.object().shape({});
  const formProps = useForm({
    mode: "onBlur",
    defaultValues: {
      paymentMethod: "cash",
    },
    resolver: yupResolver(validateSchema),
  });
  const { handleSubmit, watch, reset } = formProps;
  const paymentMethod = watch("paymentMethod");
  const handleFinishPayment = async values => {
    try {
      const url = "/parse/functions/create-purchase";
      const info = getInfo();
      const items = info.items.map(item => ({
        goldType: item.goldType,
        weight: Number(item.weight),
      }));
      const postPurchase = {
        ...getInfo(),
        items,
        paymentMethod,
        customerId: info.customer?.objectId || "",
        cashier: cashier?.objectId || "",
        branchId: cashier?.branch?.objectId || "",
      };
      await httpService.post(url, postPurchase);
      onCreateSuccess && onCreateSuccess();
      toastr.success("Mua hàng thành công");
      setToggle(false);
      reset();
    } catch (err) {
      toastr.error("Mua hàng thất bại");
      console.log(err);
    }
  };
  return (
    <ModalCommon
      modalTitle="Thanh toán mua vàng"
      isShowModal={toggle}
      onClose={() => setToggle(false)}
    >
      <ModalBody className="px-2">
        <div className="d-flex align-items-center">
          <CommonText level={1} className=" flex-grow-1 my-0">
            Phương thức
          </CommonText>
          <SelectConst
            name="paymentMethod"
            errors={formProps.formState.errors}
            {...formProps}
            options={[
              { value: "cash", text: "Tiền mặt" },
              { value: "banktransfer", text: "Chuyển khoản" },
            ]}
          />
        </div>
        {paymentMethod == "banktransfer" && (
          <React.Fragment>
            <div style={{ height: "12px" }}></div>
            <div className="d-flex align-items-center">
              <CommonText level={1} className="flex-grow-1 my-0">
                Chọn ngân hàng
              </CommonText>
              <div>
                <VVSSelectModel
                  name="bank.Name"
                  className="text-end"
                  style={{ maxWidth: "12rem" }}
                  errors={formProps.formState.errors}
                  {...formProps}
                  model="SysCfg"
                  conditionField={{
                    Category: "bank",
                  }}
                />
              </div>
            </div>
            <div style={{ height: "12px" }} />
            <div className="d-flex align-items-center">
              <CommonText level={1} className="flex-grow-1 my-0">
                Số tài khoản khách hàng
              </CommonText>
              <div>
                <InputField
                  name="accountNumber"
                  className="text-end"
                  style={{ maxWidth: "12rem" }}
                  errors={formProps.formState.errors}
                  {...formProps}
                />
              </div>
            </div>
          </React.Fragment>
        )}

        <hr />
        <div className="d-flex">
          <CommonText level={1} className="mt-0">
            Tổng tiền
          </CommonText>
          <CommonText level={1} className="text-danger ms-auto mt-0">
            {formatNumber(getInfo("total") || 0)}
          </CommonText>
        </div>
      </ModalBody>
      <ModalFooter>
        <CommonButton level={0} onClick={() => setToggle(false)} type="button">
          Hủy
        </CommonButton>
        <CommonButton
          level={2}
          onClick={handleSubmit(handleFinishPayment)}
          type="button"
        >
          Hoàn tất
        </CommonButton>
      </ModalFooter>
    </ModalCommon>
  );
}
ModalPayment.propTypes = {
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
  getInfo: PropTypes.func,
  cashier: PropTypes.object,
  onCreateSuccess: PropTypes.func,
};
