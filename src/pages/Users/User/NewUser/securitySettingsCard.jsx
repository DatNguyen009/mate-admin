import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";

import CardCollapse from "components/Common/CardCollapse";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";

const SecuritySettingsCard = props => {
  const { register, errors, USER_TYPE_OPTIONS } = props;

  return (
    <CardCollapse
      title="Security Settings"
      element={
        <Row>
          <Col>
            <InputField
              label="Simultaneous Sessions"
              register={register}
              name="simultaneousSessions"
              errors={errors}
            />
            <InputField
              label="Restrict IP"
              register={register}
              name="restrictIp"
              errors={errors}
              helperText="Restrict user from this IP address only. Multiple IP addresses can be added by separating with commas. Also accepts partial IP addresses like (111.111.111)"
            />
            <InputField
              label="Last IP"
              register={register}
              name="lastIp"
              errors={errors}
            />
          </Col>
          <Col>
            <InputField
              label="Login After"
              register={register}
              name="loginAfter"
              errors={errors}
            />
            <SelectField
              label="User Type"
              register={register}
              name="userType"
              errors={errors}
              options={USER_TYPE_OPTIONS}
              helperText="If the user has any role checked, then the user becomes a 'System User'. 'System User' has access to the desktop"
            />
            <InputField
              label="Last Active"
              register={register}
              name="lastActive"
              errors={errors}
            />
          </Col>
          <Col>
            <InputField
              label="Login Before"
              register={register}
              name="loginBefore"
              errors={errors}
            />
            <InputField
              label="Last Login"
              register={register}
              name="lastLogin"
              errors={errors}
            />
          </Col>
        </Row>
      }
    />
  );
};

SecuritySettingsCard.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  USER_TYPE_OPTIONS: PropTypes.array,
};

export default SecuritySettingsCard;
