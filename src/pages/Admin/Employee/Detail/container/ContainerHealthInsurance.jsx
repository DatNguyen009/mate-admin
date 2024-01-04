import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import InputField from "components/form-control/InputField";
export default function ContainerHealthInsurance(props) {
  const { healthInsuranceProvider, register } = props;
  return (
    <React.Fragment>
      <Row>
        <Col md="6">
          <InputField
            label="Health Insurance Provider"
            name="healthInsuranceProvider"
            register={register}
            list="healthInsuranceProviderList"
            listData={healthInsuranceProvider}
            titleSelect="name"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

ContainerHealthInsurance.propTypes = {
  healthInsuranceProvider: PropTypes.array,
  register: PropTypes.any,
};
