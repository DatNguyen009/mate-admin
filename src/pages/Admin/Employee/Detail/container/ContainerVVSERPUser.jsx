import React from "react";
import { Button, Col, Row } from "reactstrap";
import { CommonLabel } from "components/Common/inputCommon";
import InputField from "components/form-control/InputField";
import PropTypes from "prop-types";

export default function ContainerVVSERPUser(props) {
  const { register } = props;
  return (
    <React.Fragment>
      <Row>
        <Col>
          <InputField label="User ID" name="userID" register={register} />
          <CommonLabel>
            System User (login) ID. If set, it will become default for all HR
            forms.
          </CommonLabel>
          <br></br>
          <Button color="light">Create User</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
ContainerVVSERPUser.propTypes = {
  register: PropTypes.any,
};
