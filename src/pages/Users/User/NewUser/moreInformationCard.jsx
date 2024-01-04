import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";

import { CommonButton } from "components/Common/ButtonCommon";
import {
  CommonLabel,
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import CardCollapse from "components/Common/CardCollapse";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";
import TextareaField from "components/form-control/Textarea";

const MoreInformationCard = props => {
  const {
    register,
    errors,
    GENDER_OPTIONS,
    handleOpenUploadModal,
    THEME_OPTIONS,
  } = props;

  return (
    <CardCollapse
      title="More Information"
      element={
        <Row>
          <Col>
            <SelectField
              label="Gender"
              register={register}
              name="gender"
              errors={errors}
              options={GENDER_OPTIONS}
            />
            <InputField
              label="Birth Date"
              register={register}
              name="birthDate"
              errors={errors}
              type="date"
            />
            <TextareaField
              label="Interests"
              register={register}
              name="interests"
              errors={errors}
              rows={5}
            />
            <CommonLabel className="mt-0">Banner Image</CommonLabel>
            <CommonButton
              type="button"
              level={1}
              style={{ marginLeft: 0 }}
              onClick={handleOpenUploadModal}
            >
              Attach
            </CommonButton>
            <SelectField
              label="Desk Theme"
              register={register}
              name="deskTheme"
              errors={errors}
              options={THEME_OPTIONS}
            />
          </Col>
          <Col>
            <InputField
              label="Phone"
              register={register}
              name="phone"
              errors={errors}
            />
            <InputField
              label="Location"
              register={register}
              name="location"
              errors={errors}
            />
            <TextareaField
              label="Bio"
              register={register}
              name="bio"
              errors={errors}
              rows={5}
            />
            <ComponentCheckbox className="form-label m-0">
              <input
                type="checkbox"
                {...register("muteSounds")}
                id="mute-sounds-checkbox"
              />
              <LabelCheckbox className="form-label" for="mute-sounds-checkbox">
                Mute Sounds
              </LabelCheckbox>
            </ComponentCheckbox>
          </Col>
          <Col>
            <InputField
              label="Mobile No"
              register={register}
              name="mobileNo"
              errors={errors}
            />
          </Col>
        </Row>
      }
    />
  );
};

MoreInformationCard.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  GENDER_OPTIONS: PropTypes.array,
  THEME_OPTIONS: PropTypes.array,
  handleOpenUploadModal: PropTypes.func,
};

export default MoreInformationCard;
