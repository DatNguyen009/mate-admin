import React from "react";
import { Col, Row } from "reactstrap";
import SelectField from "components/form-control/Select";
import PropTypes from "prop-types";
import InputField from "components/form-control/InputField";

const SALARY_MODE = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "Bank", value: "Bank" },
  { index: 2, name: "Cash", value: "Cash" },
  { index: 3, name: "Cheque", value: "Cheque" },
];

export default function ContainerSalaryDetail(props) {
  const { register } = props;

  return (
    <React.Fragment>
      <Row>
        <Col md="6">
          <SelectField
            label="Salary Mode"
            name="model"
            options={SALARY_MODE}
            register={register}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <InputField
            label="Payroll Cost Center"
            name="payrollCostCenter"
            register={register}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
ContainerSalaryDetail.propTypes = {
  register: PropTypes.any,
};
