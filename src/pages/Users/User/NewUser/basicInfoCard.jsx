import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "reactstrap";

import { CommonText } from "components/Common/TextCommon";
import SelectField from "components/form-control/Select";
import InputField from "components/form-control/InputField";

const BasicInfoCard = props => {
  const { username, errors, register, LANGUAGE_OPTIONS, fullName } = props;
  return (
    <Card body>
      <CommonText level={1} className="m-0">
        Basic Info
      </CommonText>
      <Row>
        <Col>
          <InputField
            label="Username"
            required
            name="username"
            disabled
            value={username}
            errors={errors}
          />
          <InputField
            label="Last Name"
            register={register}
            name="lastName"
            errors={errors}
          />
          <SelectField
            label="Language"
            register={register}
            name="language"
            errors={errors}
            options={LANGUAGE_OPTIONS}
          />
        </Col>
        <Col>
          <InputField
            label="First Name"
            register={register}
            required
            name="firstName"
            errors={errors}
          />
          <InputField
            label="Full Name"
            name="fullName"
            disabled
            errors={errors}
            value={fullName}
          />
        </Col>
        <Col>
          <InputField
            label="Middle Name (Optional)"
            register={register}
            name="middleName"
            errors={errors}
          />
          <InputField
            label="Time Zone"
            register={register}
            name="timeZone"
            errors={errors}
          />
        </Col>
      </Row>
    </Card>
  );
};

BasicInfoCard.propTypes = {
  username: PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
  LANGUAGE_OPTIONS: PropTypes.array,
  fullName: PropTypes.string,
};

export default BasicInfoCard;
