import React from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import CardCollapse from "components/Common/CardCollapse";
import SelectField from "components/form-control/Select";

const DocumentFollowCard = props => {
  const { register, errors, FREQUENCY_OPTIONS } = props;

  return (
    <CardCollapse
      title="Document Follow"
      element={
        <Col xs={6}>
          <ComponentCheckbox className="form-label m-0">
            <input
              type="checkbox"
              {...register("sendNotificationsForDocuments")}
              id="send-notifications-for-document-checkbox"
            />
            <LabelCheckbox
              className="form-label"
              for="send-notifications-for-document-checkbox"
            >
              Send Notifications For Documents Followed By Me
            </LabelCheckbox>
          </ComponentCheckbox>
          <SelectField
            label="Frequency"
            register={register}
            name="frequency"
            errors={errors}
            options={FREQUENCY_OPTIONS}
          />
        </Col>
      }
    />
  );
};

DocumentFollowCard.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  FREQUENCY_OPTIONS: PropTypes.array,
};

export default DocumentFollowCard;
