import React from "react";
import { Col, Row } from "reactstrap";
import { CommonLabel } from "components/Common/inputCommon";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";
import PropTypes from "prop-types";

const PREDERED_CONTACT_EMAIL = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "Company Email", value: "CompanyEmail" },
  { index: 2, name: "Personal Email", value: "PersonalEmail" },
  { index: 3, name: "User ID", value: "UserID" },
];

const PERMANENT_ADDRESS_IS = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "Rented", value: "Rented" },
  { index: 2, name: "Owned", value: "Owned" },
];

export default function ContainerContactDetail(props) {
  const { register } = props;

  return (
    <React.Fragment>
      <Row>
        <Col>
          <InputField
            label="Mobile"
            name="contactDetailPhone"
            register={register}
          />
          <InputField
            label="Personal Email"
            name="contactDetailPesonalEmail"
            register={register}
          />
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
          <CommonLabel
            className="form-check-label"
            htmlFor="defaultCheck1"
            style={{ marginTop: 0 }}
          >
            Unsubscribed
          </CommonLabel>
          <SelectField
            label="Permanent Address Is"
            name="contactDetailPermanentAddressIs"
            options={PERMANENT_ADDRESS_IS}
            register={register}
          />
          <InputField
            label="Permanent Address"
            name="permanentAddress"
            register={register}
          />
        </Col>
        <Col>
          <SelectField
            label="Predered Contact Email"
            name="contactDetailPrederedContactEmail"
            options={PREDERED_CONTACT_EMAIL}
            register={register}
          />
          <InputField
            label="Company Email"
            name="contactDetailCompanyEmail"
            register={register}
          />
          <CommonLabel className="form-label mt-0">
            Provide Email Address registered in company
          </CommonLabel>
          <SelectField
            label="Current Address Is"
            name="contactDetailCurrentAddressIs"
            options={PERMANENT_ADDRESS_IS}
            register={register}
          />
          <InputField
            label="Current Address"
            name="currentAddress"
            register={register}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

ContainerContactDetail.propTypes = {
  register: PropTypes.any,
};
