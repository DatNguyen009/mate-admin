import React from "react";
import PropTypes from "prop-types";
import { CommonText } from "components/Common/TextCommon";
import { CommonSelect } from "components/Common/inputCommon";

SelectField.propTypes = {
  register: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  rows: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
};

function SelectField(props) {
  const {
    label,
    register,
    required,
    name,
    errors,
    options,
    onChange,
    helperText,
    disabled,
  } = props;

  const mapOptions = options => {
    return options.map((option, index) => {
      return (
        <option value={option.value} key={index} disabled={disabled}>
          {option.name}
        </option>
      );
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {label ? (
        <CommonText
          className={"mt-0 mb-1 " + (required && "star-red-required")}
        >
          {label}
        </CommonText>
      ) : null}
      <div style={{ position: "relative", width: "100%" }}>
        <CommonSelect
          {...register(name, {
            required: `${name} is required`,
            onChange,
          })}
          className="form-control"
          disabled={disabled}
        >
          {/* <option value="" hidden></option> */}
          {options && mapOptions(options)}
        </CommonSelect>
        <i
          className=" bx bx-chevron-down"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        ></i>
      </div>
      {/* <Spacer size={20} /> */}

      {helperText && (
        <CommonText level={0} color="gray" className="m-0">
          {helperText}
        </CommonText>
      )}
      {_.get(errors, name) ? (
        <CommonText level={0} color={"red"} style={{ margin: 0 }}>
          {_.get(errors, name)?.message}
        </CommonText>
      ) : null}
    </div>
  );
}

export default SelectField;
