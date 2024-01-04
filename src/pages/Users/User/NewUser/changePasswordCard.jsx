import React from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import CardCollapse from "components/Common/CardCollapse";
import InputField from "components/form-control/InputField";

const ChangePasswordCard = props => {
  const { register, errors } = props;

  return (
    <CardCollapse
      title="Change Password"
      element={
        <>
          <Col xs={6}>
            <InputField
              label="Set New Password"
              register={register}
              name="password"
              errors={errors}
            />
            <ComponentCheckbox className="form-label">
              <input
                type="checkbox"
                {...register("isLogout")}
                id="is-logout-checkbox"
              />
              <LabelCheckbox className="form-label" for="is-logout-checkbox">
                Logout From All Devices After Changing Password
              </LabelCheckbox>
            </ComponentCheckbox>
          </Col>
        </>
      }
    />
  );
};

ChangePasswordCard.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default ChangePasswordCard;
