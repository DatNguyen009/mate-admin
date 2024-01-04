import Spacer from "components/Common/Spacing";
import InputField from "components/form-control/InputField";
import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";

export default function MoreInfo({ register, companys, departments, errors }) {
  return (
    <React.Fragment>
      <Row className="p-1">
        <div className="col-lg-6 col-md-12 mb-1 ">
          <InputField
            label="Department"
            name="department"
            register={register}
            autoComplete
            list="departments"
            listData={departments}
            titleSelect="name"
            errors={errors}
          />
          <Spacer size={16} />
          <InputField
            label="Company"
            name="company"
            register={register}
            autoComplete
            list="companies"
            listData={companys}
            titleSelect="name"
            errors={errors}
          />
        </div>
      </Row>
    </React.Fragment>
  );
}

MoreInfo.propTypes = {
  register: PropTypes.func.isRequired,
  companys: PropTypes.array,
  departments: PropTypes.array,
  errors: PropTypes.object,
};
