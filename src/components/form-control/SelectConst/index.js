import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CommonText } from "components/Common/TextCommon";
import { CommonSelect } from "components/Common/inputCommon";
import _ from "lodash";
import httpService from "services/httpService";
function SelectConst(props) {
  const {
    label,
    required,
    name,
    errors,
    helperText,
    sysCfgName,
    register,
    onChange,
    emptyOption,
    disableOptions,
    disableEmptyOption,
    arrowProps,
    setValue,
    getValues,
    className,
    ...rest
  } = props;
  const [options, setOptions] = useState(null);
  const registerForm = register
    ? register(name, {
        onChange: e => {
          onChange && onChange(e);
        },
      })
    : null;
  useEffect(async () => {
    if (props.options) {
      setOptions(props.options);
      return;
    }
    const res = await httpService.get(
      `/parse/classes/SysCfg?where={"Code": "${sysCfgName}"}`
    );
    setOptions(res.results[0]?.Values || []);
  }, [JSON.stringify(props.options)]);
  useEffect(() => {
    getValues && setValue(name, getValues(name));
  }, [options]);
  return (
    <div className={className || ""}>
      {label && (
        <CommonText
          className={"mt-0 mb-1 " + (required && "star-red-required")}
        >
          {label}
        </CommonText>
      )}
      <div className={"position-relative"}>
        <div
          {...arrowProps}
          className={"arrowSelect" + " " + (arrowProps?.className || "")}
        />

        <CommonSelect
          className={"form-control mt-0" + className}
          onClick={e => e.stopPropagation()}
          onChange={onChange && onChange}
          onDoubleClick={event => {
            event.stopPropagation();
          }}
          {...registerForm}
          {...rest}
        >
          {!disableEmptyOption &&
            (emptyOption ? (
              <option value="">{emptyOption}</option>
            ) : (
              <option value="" hidden></option>
            ))}
          {options &&
            options?.map((option, index) => (
              <option
                value={option.value}
                key={index}
                disabled={disableOptions}
                className="text-wrap"
              >
                {option?.text ||
                  option?.name ||
                  option?.salutation ||
                  option?.employmentType}
              </option>
            ))}
        </CommonSelect>
      </div>
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
SelectConst.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  sysCfgName: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  emptyOption: PropTypes.string,
  className: PropTypes.string,
  rest: PropTypes.object,
  disableOptions: PropTypes.bool,
  arrowProps: PropTypes.object,
  disableEmptyOption: PropTypes.bool,
  setValue: PropTypes.func,
  getValues: PropTypes.func,
};

export default SelectConst;
