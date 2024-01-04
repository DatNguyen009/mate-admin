import React from "react";
import { Card, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";

const SERIES_OPTIONS = [
  {
    id: 0,
    name: "HR-EMP-",
    value: "HR-EMP-",
  },
];

const STATUS_OPTIONS = [
  { name: "Active", value: "Active" },
  { name: "InActive", value: "InActive" },
  { name: "Suspended", value: "Suspended" },
  { name: "Left", value: "Left" },
];

const GENDER_OPTIONS = [
  { name: "", value: "" },
  { name: "Prefer not to say", value: "PreferNotToSay" },
  { name: "Non-Conforming", value: "NonConforming" },
  { name: "Genderqueer", value: "Genderqueer" },
  { name: "Transgender", value: "Transgender" },
  { name: "Other", value: "Other" },
  { name: "Male", value: "Male" },
  { name: "Female", value: "Female" },
];

export default function ContainerPersonalInfor(props) {
  const { register, errors, employmentType, salutation, company, objectId } =
    props;
  return (
    <React.Fragment>
      <Card body>
        <Row>
          <Col>
            {!objectId && (
              <SelectField
                label="Series"
                name="series"
                register={register}
                errors={errors}
                options={SERIES_OPTIONS}
                required
              />
            )}
            <InputField
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Middle Name"
              name="middleName"
              register={register}
              errors={errors}
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
            />
            <InputField
              label="Salutation"
              name="salutation"
              register={register}
              errors={errors}
              list="dateOfBirthList"
              listData={salutation}
              titleSelect="salutation"
              autoComplete
            />
            <InputField
              label="Employment Type"
              name="employmentType"
              register={register}
              errors={errors}
              list="employmentTypeList"
              listData={employmentType}
              titleSelect="name"
              autoComplete
            />
          </Col>
          <Col>
            <InputField
              label="Company"
              name="company"
              register={register}
              errors={errors}
              required
              list="companyList"
              listData={company}
              titleSelect="name"
              autoComplete
            />
            <SelectField
              label="Status"
              name="status"
              register={register}
              errors={errors}
              options={STATUS_OPTIONS}
              required
            />
            <SelectField
              label="Gender"
              name="gender"
              register={register}
              errors={errors}
              options={GENDER_OPTIONS}
              required
            />
            <InputField
              type="date"
              label="Date of Birth"
              name="dateOfBirth"
              register={register}
              errors={errors}
              required
            />
            <InputField
              type="date"
              label="Date of Joining"
              name="dateOfJoin"
              register={register}
              errors={errors}
              required
            />
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
}

ContainerPersonalInfor.propTypes = {
  register: PropTypes.any,
  errors: PropTypes.any,
  employmentType: PropTypes.array,
  salutation: PropTypes.array,
  company: PropTypes.array,
  objectId: PropTypes.string,
};
