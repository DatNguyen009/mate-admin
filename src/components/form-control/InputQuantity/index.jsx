import React from "react";
import PropTypes from "prop-types";
import { CommonInputt } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import { CommonButton } from "components/Common/ButtonCommon";
import _ from "lodash";
import { useState } from "react";
InputQuantity.propTypes = {
  register: PropTypes.func,
  label: PropTypes.any,
  name: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  helperText: PropTypes.string,
  className: PropTypes.string,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  onChange: PropTypes.func,
  rest: PropTypes.object,
};

function InputQuantity(props) {
  const {
    label,
    register,
    required,
    name,
    errors,
    onChange,
    helperText,
    setValue,
    className,
    watch,
    ...rest
  } = props;
  const [displayOptions, setDisPlayOptions] = useState(false);
  const inputValue = watch(name);
  const handlePlusInput = () => {
    onChange && onChange(Number(inputValue) + 1);
    setValue(name, Number(inputValue) + 1);
  };
  const handleMinusInput = () => {
    setValue(name, Number(inputValue) - 1);
    onChange && onChange(Number(inputValue) - 1);
  };
  const handleDropDownOptions = () => {
    setDisPlayOptions(true);
  };
  const handleSelectOption = item => {
    setDisPlayOptions(false);
    setValue(name, Number(item));
    onChange && onChange(Number(item));
  };
  const handleOnBlur = () => {
    setDisPlayOptions(false);
  };
  return (
    <div>
      {label && (
        <CommonText
          className={"form-label" + (required && " star-red-required")}
        >
          {label}
        </CommonText>
      )}

      <div className={"d-flex align align-items-center"}>
        <CommonButton
          level={0}
          className="text-capitalize"
          style={{
            minHeight: "2em",
            minWidth: "2em",
          }}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            handleMinusInput();
          }}
        >
          -
        </CommonButton>
        <div className={"position-relative"}>
          <CommonInputt
            className="form-control text-center mx-2"
            style={{ maxWidth: "3rem" }}
            {...register(name, {
              required,
              onChange: event => {
                onChange && onChange(event.target.value);
              },
              onBlur: () => handleOnBlur(),
            })}
            onClick={event => {
              event.stopPropagation();
              handleDropDownOptions();
            }}
          />
          {displayOptions && (
            <ul
              className="awesomplete"
              style={{ maxHeight: "12em", minWidth: "3.6rem" }}
              onClick={e => e.stopPropagation()}
            >
              {[5, 10, 20, 40, 60, 80, 100].map((item, index) => (
                <li
                  key={index}
                  onMouseDown={e => e.preventDefault()}
                  onClick={e => handleSelectOption(item)}
                >
                  <strong className="text-wrap">{item}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
        <CommonButton
          level={0}
          className="text-capitalize"
          style={{
            minHeight: "2em",
            minWidth: "2em",
          }}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            handlePlusInput(event);
          }}
        >
          +
        </CommonButton>
      </div>

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
    </div>
  );
}

export default InputQuantity;
