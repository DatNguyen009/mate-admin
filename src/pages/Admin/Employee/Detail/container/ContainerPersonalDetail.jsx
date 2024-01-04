import { CommonLabel } from "components/Common/inputCommon";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";
import TextareaField from "components/form-control/Textarea";
import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";

const MARITAL_STATUS = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "Single", value: "Single" },
  { index: 3, name: "Married", value: "Married" },
  { index: 4, name: "Divorced", value: "Divorced" },
  { index: 5, name: "Widowed", value: "Widowed" },
];

const BLOOD_GROUP = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "A+", value: "A+" },
  { index: 2, name: "A-", value: "A-" },
  { index: 3, name: "B+", value: "B+" },
  { index: 4, name: "B-", value: "B-" },
  { index: 5, name: "AB+", value: "AB+" },
  { index: 6, name: "AB-", value: "AB-" },
  { index: 7, name: "O+", value: "O+" },
  { index: 8, name: "O-", value: "O-" },
];

export default function ContainerPersonalDetail(props) {
  const { register } = props;

  return (
    <React.Fragment>
      <Row>
        <Col>
          <InputField
            label="Passport Number"
            name="passportNumber"
            register={register}
          />
          <InputField
            type="date"
            label="Date of Issue"
            name="doI"
            register={register}
          />
          <InputField
            type="date"
            label="Valid Upto"
            name="validUpto"
            register={register}
          />
          <InputField label="Place of Issue" name="poI" register={register} />
          <SelectField
            label="Marital Status"
            name="maritalStatus"
            register={register}
            options={MARITAL_STATUS}
          />
          <SelectField
            label="Blood Group"
            name="bloodGroup"
            register={register}
            options={BLOOD_GROUP}
          />
        </Col>
        <Col>
          <TextareaField
            label="Family Background"
            name="familyBackground"
            register={register}
            rows={7}
          />
          <CommonLabel className="form-label mt-0">
            Here you can maintain family details like name and occupation of
            parent, spouse and children
          </CommonLabel>
          <br></br>
          <TextareaField
            label="Health Details"
            name="healthDetails"
            register={register}
            rows={7}
          />
          <CommonLabel className="form-label mt-0">
            Here you can maintain height, weight, allergies, medical concerns
            etc
          </CommonLabel>
        </Col>
      </Row>
    </React.Fragment>
  );
}

ContainerPersonalDetail.propTypes = {
  register: PropTypes.any,
};
