import React from "react";
import PropTypes from "prop-types";
import { CommonInputt } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import httpService from "services/httpService";
import { debounce } from "lodash";
import { useHistory } from "react-router-dom";
import _ from "lodash";
InputField.propTypes = {
  register: PropTypes.func,
  label: PropTypes.any,
  name: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  helperText: PropTypes.string,
  className: PropTypes.string,
  clickToPage: PropTypes.string,
  placeHolder: PropTypes.string,
  componentRef: PropTypes.any,
  rest: PropTypes.object,
};
function InputField(props) {
  const history = useHistory();
  const {
    label,
    register,
    required,
    name,
    errors,
    onChange,
    onClick,
    helperText,
    className,
    clickToPage,
    placeHolder,
    componentRef,
    ...rest
  } = props;

  return (
    <React.Fragment>
      {label && (
        <CommonText
          className={
            "mt-0 mb-1 form-label" + (required && " star-red-required")
          }
        >
          {label}
        </CommonText>
      )}
      <CommonInputt
        className={"form-control " + className}
        placeholder={placeHolder}
        {...register(name, {
          required,
          onChange: event => {
            onChange && onChange(event);
          },
        })}
        onClick={event => {
          event.stopPropagation();
          onClick && onClick(event);
          clickToPage && history.push(`${clickToPage}`);
        }}
        onDoubleClick={event => {
          event.stopPropagation();
        }}
        {...rest}
      />

      {helperText && (
        <CommonText level={0} color={"gray"} style={{ margin: 0 }}>
          {helperText}
        </CommonText>
      )}
      {_.get(errors, name) && (
        <CommonText level={0} color={"red"} style={{ margin: 0 }}>
          {_.get(errors, name)?.message}
        </CommonText>
      )}
    </React.Fragment>
  );
}

export default InputField;
