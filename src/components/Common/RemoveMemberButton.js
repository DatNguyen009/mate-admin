import React from "react";
import PropTypes from "prop-types";

import { CommonButton } from "components/Common/ButtonCommon";
import httpService from "services/httpService";
import _ from "lodash";

const RemoveMemberButton = props => {
  const {
    getValues,
    setValue,
    selectedRows,
    setSelectedRows,
    componentProps: { removeField },
  } = props;

  const onClick = async () => {
    const members = getValues("Employee").filter((_, i) => selectedRows.has(i));
    const { Employee: prevEmployee } = getValues();
    const difference = _.difference(prevEmployee, members);
    const requests = members.map(({ objectId }) => ({
      method: "PUT",
      path: `/parse/classes/Employee/${objectId}`,
      body: { [removeField]: { __op: "Delete" } },
    }));
    await httpService.post("/parse/batch", { requests });
    setValue("Employee", difference);
    setSelectedRows(new Set());
  };

  return (
    <CommonButton onClick={onClick} level={2} type="button">
      <i className="dripicons-trash" />
    </CommonButton>
  );
};

RemoveMemberButton.propTypes = {
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  selectedRows: PropTypes.object,
  setSelectedRows: PropTypes.func,
  componentProps: PropTypes.object,
};

export default RemoveMemberButton;
