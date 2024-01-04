import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, Row, ModalFooter } from "reactstrap";
import * as yup from "yup";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectField from "components/form-control/Select";
import InputField from "components/form-control/InputField";

export default function ModalEmployeeOtherIncome(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;
  const initialEmployeeOtherIncome = {
    employee: "",
    payrollPeriod: "",
    company: "",
    amount: "",
  };
  const schema = yup
    .object({
      employee: yup.string().required("Please Enter Your For Employee"),
      payrollPeriod: yup.string().required("Please Enter Your Payroll Period"),
      company: yup.string().required("Please Enter Your Company"),
      amount: yup.string().required("Please Enter Your Amount"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    initialEmployeeOtherIncome,
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {};
  return (
    <ModalCommon
      modalTitle={modalTitle}
      isShowModal={isShowModal}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col>
              <SelectField
                options={[]}
                label="Employee"
                name="employee"
                register={register}
                required
                errors={errors}
              />
              <SelectField
                options={[]}
                label="Payroll Period"
                name="payrollPeriod"
                register={register}
                required
                errors={errors}
              />
              <SelectField
                options={[]}
                label="Company"
                name="company"
                register={register}
                required
                errors={errors}
              />
              <InputField
                label="Amount"
                name="amount"
                register={register}
                required
                errors={errors}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} type="submit">
            Save
          </CommonButton>
        </ModalFooter>
      </form>
    </ModalCommon>
  );
}

ModalEmployeeOtherIncome.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
