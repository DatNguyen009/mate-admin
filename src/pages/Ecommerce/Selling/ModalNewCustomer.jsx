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

export default function ModalNewCustomer({
  toggle,
  setToggle,
  onCreateSuccess,
}) {
  const validateSchema = yup.object().shape({
    fullName: yup.string().required("Trường này không thể trống"),
    phone: yup.string().required("Trường này không thể trống"),
  });
  const formProps = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
    },
    resolver: yupResolver(validateSchema),
  });
  const { handleSubmit, reset } = formProps;
  const handleCreateCustomer = async values => {
    try {
      const url = "/parse/functions/create-customer";
      const newCustomer = values;
      const response = await httpService.post(url, newCustomer);
      toastr.success("Tạo khách hàng thành công");
      console.log(response);
      onCreateSuccess && onCreateSuccess(response.result.data);
      setToggle(false);
      reset();
    } catch (err) {
      toastr.error("Tạo khách hàng thất bại");
      console.log(err);
    }
  };
  return (
    <Modal size="md" isOpen={toggle} centered={true}>
      <ModalHeader style={{ textTransform: "capitalize" }}>
        Tạo khách hàng mới
      </ModalHeader>
      <ModalBody className="px-2">
        <Row>
          <Col>
            <InputField
              label="Họ và tên"
              name="fullName"
              {...formProps}
              errors={formProps.formState.errors}
            />
          </Col>
          <Col>
            <InputField
              label="SĐT"
              name="phone"
              {...formProps}
              errors={formProps.formState.errors}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <CommonButton
          level={0}
          onClick={() => {
            setToggle(false);
            reset();
          }}
          type="button"
        >
          Hủy
        </CommonButton>
        <CommonButton
          level={2}
          onClick={handleSubmit(handleCreateCustomer)}
          type="button"
        >
          Tạo mới
        </CommonButton>
      </ModalFooter>
    </Modal>
  );
}
ModalNewCustomer.propTypes = {
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
  onCreateSuccess: PropTypes.func,
};
