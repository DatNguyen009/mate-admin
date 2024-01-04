import React from "react";
import PropTypes from "prop-types";

import CardCollapse from "components/Common/CardCollapse";
import TextareaField from "components/form-control/Textarea";
import {
  CommonLabel,
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import TableCommon from "components/Common/TableCommon";

const EmailCard = props => {
  const { register, errors, userEmails, DATA_TABLE_COMMON, setUserEmails, id } =
    props;
  return (
    <CardCollapse
      title="Email"
      element={
        <>
          <TextareaField
            label="Email Signature"
            register={register}
            name="emailSignature"
            errors={errors}
            rows={7}
          />
          <ComponentCheckbox className="form-label">
            <input
              type="checkbox"
              {...register("sendNotificationsForEmail")}
              id="send-notifications-for-email-checkbox"
            />
            <LabelCheckbox
              className="form-label"
              for="send-notifications-for-email-checkbox"
            >
              Send Notifications For Email Threads
            </LabelCheckbox>
          </ComponentCheckbox>
          <ComponentCheckbox className="form-label">
            <input
              type="checkbox"
              {...register("sendCopy")}
              id="send-copy-checkbox"
            />
            <LabelCheckbox className="form-label" for="send-copy-checkbox">
              Send Me A Copy of Outgoing Emails
            </LabelCheckbox>
          </ComponentCheckbox>
          <ComponentCheckbox className="form-label">
            <input
              type="checkbox"
              {...register("allowedInMentions")}
              id="allowed-in-mentions-checkbox"
            />
            <LabelCheckbox
              className="form-label"
              for="allowed-in-mentions-checkbox"
            >
              Allowed In Mentions
            </LabelCheckbox>
          </ComponentCheckbox>
          <CommonLabel>User Emails</CommonLabel>
          <TableCommon
            dataTableCommon={userEmails || []}
            columns={DATA_TABLE_COMMON.userEmails}
            onHandleChangeTable={setUserEmails}
            disableAddRow={Boolean(id)}
          />
        </>
      }
    />
  );
};

EmailCard.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  userEmails: PropTypes.array,
  DATA_TABLE_COMMON: PropTypes.object,
  setUserEmails: PropTypes.func,
  id: PropTypes.string,
};

export default EmailCard;
