import React from "react";
import PropTypes from "prop-types";
import { CommonText } from "components/Common/TextCommon";
import { CommonTextarea } from "components/Common/inputCommon";

TextareaField.propTypes = {
  register: PropTypes.func.isRequired,
  label: PropTypes.any,
  name: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  rows: PropTypes.number,
  rest: PropTypes.object,
};

function TextareaField(props) {
  const { label, register, required, name, errors, rows, ...rest } = props;
  return (
    <div>
      {label ? (
        <CommonText
          className={
            "mt-0 mb-1 form-label" + (required && " star-red-required")
          }
        >
          {label}
        </CommonText>
      ) : null}
      <CommonTextarea
        className="form-control"
        {...register(name, { required })}
        rows={rows || "6"}
        {...rest}
      />
      {errors && (
        <CommonText level={0} color={"red"} style={{ margin: 0 }}>
          {errors[name]?.message}
        </CommonText>
      )}
    </div>
  );
}

export default TextareaField;
