import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Col, Row } from "reactstrap";

import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import CardCollapse from "components/Common/CardCollapse";
import InputField from "components/form-control/InputField";

const AllowModulesCard = props => {
  const {
    register,
    errors,
    USER_ALLOW_MODULES,
    allowModules,
    handleSelectAllowModule,
  } = props;

  return (
    <CardCollapse
      title="Allow Modules"
      element={
        <>
          <Col xs={6}>
            <InputField
              label="Module Profile"
              register={register}
              name="moduleProfile"
              errors={errors}
            />
          </Col>
          <Row>
            {USER_ALLOW_MODULES.map(item => (
              <Col xs={6} key={item.id}>
                <ComponentCheckbox className="form-label">
                  <input
                    type="checkbox"
                    id={`module-${item.id}-checkbox`}
                    checked={_.some(allowModules, item)}
                    onChange={() => handleSelectAllowModule(item)}
                  />
                  <LabelCheckbox
                    className="form-label"
                    for={`module-${item.id}-checkbox`}
                  >
                    {item.title}
                  </LabelCheckbox>
                </ComponentCheckbox>
              </Col>
            ))}
          </Row>
        </>
      }
    />
  );
};

AllowModulesCard.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  USER_ALLOW_MODULES: PropTypes.array,
  allowModules: PropTypes.array,
  handleSelectAllowModule: PropTypes.func,
};

export default AllowModulesCard;
