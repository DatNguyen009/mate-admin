import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "reactstrap";
import _ from "lodash";

import { CommonButton } from "components/Common/ButtonCommon";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import InputField from "components/form-control/InputField";

const RoleCard = props => {
  const {
    handleSelectAllRole,
    handleUnselectAllRole,
    USER_ROLE,
    roles,
    handleSelectRole,
  } = props;

  return (
    <Card body>
      <CommonText level={1} color="black">
        Roles
      </CommonText>
      <Col xs={6}>
        <InputField label="Role Profile" name="roleProfile" />
      </Col>
      <div className="d-flex mt-3">
        <CommonButton
          type="button"
          className="m-0"
          onClick={handleSelectAllRole}
        >
          Select All
        </CommonButton>
        <CommonButton type="button" onClick={handleUnselectAllRole}>
          Unselect All
        </CommonButton>
      </div>
      <Row>
        {USER_ROLE.map((item, index) => (
          <Col xs={4} key={index}>
            <ComponentCheckbox className="form-label">
              <input
                type="checkbox"
                id={`${index}-checkbox`}
                checked={_.some(roles, item)}
                onChange={() => handleSelectRole(item)}
              />
              <LabelCheckbox className="form-label" for={`${index}-checkbox`}>
                {item.title}
              </LabelCheckbox>
            </ComponentCheckbox>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

RoleCard.propTypes = {
  handleSelectAllRole: PropTypes.func,
  handleUnselectAllRole: PropTypes.func,
  USER_ROLE: PropTypes.array,
  roles: PropTypes.array,
  handleSelectRole: PropTypes.func,
};

export default RoleCard;
