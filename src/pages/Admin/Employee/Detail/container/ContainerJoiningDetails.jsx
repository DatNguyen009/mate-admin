import React from "react";
import { Col, Row } from "reactstrap";
import InputField from "components/form-control/InputField";
import PropTypes from "prop-types";

export default function ContainerJoiningDetails(props) {
  const { register, jobApplicant } = props;

  return (
    <React.Fragment>
      <Row>
        <Col>
          <InputField
            label="Job Applicant"
            name="jobApplicant"
            register={register}
            list="jobApplicantList"
            listData={jobApplicant}
            titleSelect="name"
            autoComplete
          />
          <InputField
            type="date"
            label="Offer Date"
            name="offerDate"
            register={register}
          />
          <InputField
            type="date"
            label="Confirmation Date"
            name="confirmationDate"
            register={register}
          />
        </Col>
        <Col>
          <InputField
            type="date"
            label="Contract End Date"
            name="contractEndDate"
            register={register}
          />
          <InputField label="Notice (days)" name="notice" register={register} />
          <InputField
            type="date"
            label="Date Of Retirement"
            name="dateOfRetirement"
            register={register}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

ContainerJoiningDetails.propTypes = {
  register: PropTypes.any,
  jobApplicant: PropTypes.array,
};
