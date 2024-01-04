import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import moment from "moment";
import { CommonDataPicker } from "../inputCommon";
import { CommonText } from "../TextCommon";
import _ from "lodash";
import { ConfigProvider } from "antd";
import vi from "antd/lib/locale/vi_VN";

const format = "DD/MM/YYYY";

function IDatePicker(props) {
  const {
    value,
    control,
    name,
    errors,
    label,
    required,
    disabled,
    picker,
    formatDate,
    allowClear,
    onChange,
    width,
    ...rest
  } = props;
  const handleChange = (value, field) => {
    field.onChange(value);
    onChange && onChange(value);
  };
  return (
    <>
      {label && (
        <CommonText
          className={
            "mt-0 mb-1 form-label" + (required && " star-red-required")
          }
        >
          {label}
        </CommonText>
      )}
      {control ? (
        <>
          <Controller
            render={({ field }) => {
              return (
                <ConfigProvider locale={vi}>
                  <CommonDataPicker
                    key={field.value}
                    disabled={disabled}
                    name={field.name}
                    value={field.value && moment(field.value)}
                    defaultValue={field.value && moment(field.value)}
                    format={formatDate || format}
                    picker={picker && picker}
                    placeholder=""
                    onChange={value => handleChange(value, field)}
                    allowClear={allowClear}
                    {...rest}
                  />
                </ConfigProvider>
              );
            }}
            {...props}
          />
          {_.get(errors, name) && (
            <CommonText level={0} color={"red"} style={{ margin: 0 }}>
              {_.get(errors, name)?.message}
            </CommonText>
          )}
        </>
      ) : (
        <ConfigProvider locale={vi}>
          <CommonDataPicker
            picker={picker && picker}
            value={value && moment(value)}
            defaultValue={value && moment(value)}
            onChange={value => onChange(value)}
            format={formatDate || format}
            allowClear={allowClear}
            style={{ width }}
            {...rest}
          />
        </ConfigProvider>
      )}
    </>
  );
}
IDatePicker.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
  control: PropTypes.object,
  onChange: PropTypes.func,
  getValues: PropTypes.func,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
  required: PropTypes.any,
  label: PropTypes.string,
  picker: PropTypes.string,
  formatDate: PropTypes.string,
  allowClear: PropTypes.bool,
  width: PropTypes.number,
};
export default IDatePicker;
