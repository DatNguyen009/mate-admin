import React from "react";
import PropTypes from "prop-types";
import { CommonLabel, CommonInput } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import { Input } from "reactstrap";
CheckBoxGroup.propTypes = {
  register: PropTypes.func,
  listData: PropTypes.array,
  errors: PropTypes.object,
  onChange: PropTypes.object,
};

function CheckBoxGroup(props) {
  const { register, listData, errors, onChange } = props;
  const mapData = listData.map((entry, i) => (
    <div key={i}>
      <div className="d-flex align-items-center">
        <input
          className="me-2"
          type="checkbox"
          {...register(entry.name)}
          id={entry.name}
          onChange={onChange?.[entry.name] && (e => onChange[entry.name](e))}
          disabled={entry.isDisabled}
          onClick={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
        />
        <CommonLabel className="my-0" for={entry.name}>
          {entry.label}
        </CommonLabel>
      </div>
      {entry.helperText && (
        <CommonText level={0} color="gray" className="mt-0 mb-3">
          {entry.helperText}
        </CommonText>
      )}
      {errors && (
        <CommonText level={0} color={"red"} style={{ margin: 0 }}>
          {errors[entry.name]?.message}
        </CommonText>
      )}
    </div>
  ));
  return <div className="mt-3">{mapData}</div>;
}

export default CheckBoxGroup;
