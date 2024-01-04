import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import {
  CommonInputt,
  WrapperInputNumber,
  CommonInputNumber,
} from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import httpService from "services/httpService";
import { debounce } from "lodash";
import { useHistory } from "react-router-dom";
import _ from "lodash";

function InputFieldNumber(props) {
  const history = useHistory();
  const {
    control,
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
    min,
    max,
    suffix,
    ...rest
  } = props;

  return (
    <React.Fragment>
      {label && (
        <CommonText
          className={"form-label" + (required && " star-red-required")}
        >
          {label}
        </CommonText>
      )}
      {control ? (
        <>
          <Controller
            render={({ field }) => {
              return (
                <WrapperInputNumber>
                  <CommonInputNumber
                    className={"form-control " + className}
                    value={field.value}
                    name={field.name}
                    onChange={value => onChange && onChange(value)}
                    placeholder={placeHolder}
                    onClick={event => {
                      event.stopPropagation();
                      onClick && onClick(event);
                      clickToPage && history.push(`${clickToPage}`);
                    }}
                    onDoubleClick={event => {
                      event.stopPropagation();
                    }}
                    min={min}
                    max={max}
                  />
                  {suffix && <span className="suffix">{suffix}</span>}
                </WrapperInputNumber>
              );
            }}
            {...props}
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
        </>
      ) : (
        <CommonInputNumber
          className={"form-control " + className}
          {...register(name, {
            required,
            onChange: event => {
              onChange && onChange(event);
            },
          })}
          placeholder={placeHolder}
          onClick={event => {
            event.stopPropagation();
            onClick && onClick(event);
            clickToPage && history.push(`${clickToPage}`);
          }}
          onDoubleClick={event => {
            event.stopPropagation();
          }}
          {...props}
        />
      )}
    </React.Fragment>
  );
}

InputFieldNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  suffix: PropTypes.string,
  control: PropTypes.object,
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
  rest: PropTypes.object,
};

export default InputFieldNumber;
