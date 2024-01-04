import InputField from "components/form-control/InputField";
import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import Spacer from "components/Common/Spacing";

export default function Timeline({ register, isTemplate, errors }) {
  return (
    <React.Fragment>
      <Row className="p-1">
        <div className="col-lg-6 col-md-12 mb-1">
          <InputField
            type="date"
            label="Expected Start Date"
            name="expectedStartDate"
            register={register}
            autoComplete
          />
          <InputField
            label="Expected Time (in hours)"
            name="expectedTime"
            register={register}
            autoComplete
            errors={errors}
          />
          {isTemplate && (
            <InputField
              label="Begin On (Days)"
              name="beginOn"
              register={register}
              autoComplete
              errors={errors}
            />
          )}
        </div>
        <div className="col-lg-6 col-md-12 mb-1 ">
          <InputField
            type="date"
            label="Expected End Date"
            name="expectedEndDate"
            register={register}
            autoComplete
          />
          <InputField
            label="% Progress"
            name="progress"
            register={register}
            autoComplete
            errors={errors}
          />
          {isTemplate && (
            <InputField
              label="Duration (Days)"
              name="duration"
              register={register}
              autoComplete
              errors={errors}
            />
          )}
          <Spacer size={20} />
          <ComponentCheckbox>
            <input
              {...register("isMilestone")}
              type="checkbox"
              value=""
              id="isMilestone"
              style={{ marginTop: 0 }}
            />
            <LabelCheckbox htmlFor="isMilestone">Is Milestone</LabelCheckbox>
          </ComponentCheckbox>
        </div>
      </Row>
    </React.Fragment>
  );
}

Timeline.propTypes = {
  isTemplate: PropTypes.bool,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
};
