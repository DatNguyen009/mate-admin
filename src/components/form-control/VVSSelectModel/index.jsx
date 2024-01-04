import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { CommonInputt } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import httpService from "services/httpService";
import { Link } from "react-router-dom";

import _, { debounce } from "lodash";
import DEFAULT_CONFIG from "components/form-control/VVSSelectModel/config";
VVSSelectModel.propTypes = {
  register: PropTypes.func,
  label: PropTypes.any,
  name: PropTypes.string,
  model: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  setValue: PropTypes.func,
  getValues: PropTypes.func,
  setError: PropTypes.func,
  clearErrors: PropTypes.func,
  conditionText: PropTypes.string,
  conditionField: PropTypes.object,
  includeField: PropTypes.array,
  modelField: PropTypes.string,
  configName: PropTypes.string,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  customizeOptions: PropTypes.array,
  customizeRender: PropTypes.func,
  rest: PropTypes.object,
  placeholder: PropTypes.string,
  showOptionAll: PropTypes.bool,
};
const generateQuery = (
  index,
  subFields,
  models,
  searchValue,
  exact = false
) => {
  if (subFields.length - 1 < index) {
    return !exact
      ? {
          $regex: `${searchValue || ""}`,
          $options: "i",
        }
      : searchValue;
  }
  if (subFields.length - 1 == index) {
    return {
      $inQuery: {
        where: {
          [subFields[index]]: !exact
            ? {
                $regex: `${searchValue || ""}`,
                $options: "i",
              }
            : searchValue,
        },
        className: models[index],
      },
    };
  }
  return {
    $inQuery: {
      where: {
        [subFields[index]]: generateQuery(
          index + 1,
          subFields,
          models,
          searchValue
        ),
        $options: "i",
      },
      className: models[index],
    },
  };
};

function VVSSelectModel(props) {
  const {
    label,
    register,
    required,
    name,
    model,
    setValue,
    clearErrors,
    errors,
    setError,
    conditionText,
    conditionField,
    includeField,
    getValues,
    modelField,
    configName,
    onSelect,
    className,
    customizeRender,
    customizeOptions = [],
    placeholder,
    showOptionAll,
    ...rest
  } = props;
  const id = !modelField
    ? name.substring(0, name.lastIndexOf(".") + 1) + "objectId"
    : name.substring(
        0,
        name.indexOf(`${modelField}.`) + modelField.length + 1
      ) + "objectId";
  const subField = !modelField
    ? name.slice(name.lastIndexOf(".") + 1, name.length)
    : name.slice(
        name.indexOf(`${modelField}.`) + modelField.length + 1,
        name.length
      );
  const {
    fieldView = [subField],
    renderedField = subField,
    searchField = [subField],
    models = [],
  } = DEFAULT_CONFIG[configName || model] || {};
  const [displayInput, setDisplayInput] = useState(false);
  const [options, setOptions] = useState(null);
  const [selectedItem, setSelectedItem] = useState(
    getValues(id) ? getValues(id.slice(0, id.indexOf("objectId"))) : null
  );
  const [refresh, setRefresh] = useState(false);
  const query = (searchValue, exact = false) => {
    const searchOptions = searchField.map(searchField => {
      const indexOfFirstPoint = searchField.indexOf(".");
      const containedModelField =
        indexOfFirstPoint == -1
          ? searchField
          : searchField.slice(0, indexOfFirstPoint);
      const subFields =
        indexOfFirstPoint == -1
          ? []
          : searchField.slice(indexOfFirstPoint + 1).split(".");
      return `{"${containedModelField}":${JSON.stringify(
        generateQuery(0, subFields, models, searchValue, exact)
      )}}`;
    });
    return `"$or":[${searchOptions.toString()}]`;
  };

  const conditionStr = JSON.stringify(conditionField);
  const condition = conditionField
    ? `,${conditionStr.slice(1, conditionStr.length - 1)}`
    : "";
  const includeFieldStr = includeField
    ? `&include=${JSON.stringify(includeField)}`
    : "";
  const handleOnClick = async e => {
    setDisplayInput(true);
  };
  const handleOnChange = debounce(async e => {
    if (!options) {
      return;
    }
    let value = e.target.value.trim();
    if (renderedField == "barcode") {
      value = value.toLowerCase();
    }
    try {
      const url = `/parse/classes/${model}?where={${query(
        value,
        true
      )}${condition}}${includeFieldStr}&limit=10`;
      const response = await httpService.get(url);
      if (response.results && response.results.length == 1)
        handleSelectItem(response.results[0]);
    } catch (err) {
      console.log(err);
    }
    resetSelectOptions(value);
  }, 360);
  const handleSelectItem = item => {
    if (item.objectId === "all") {
      setValue(name, "Tất cả");
      setDisplayInput(false);
      resetSelectOptions();
      if (!item) return;
      setSelectedItem(item);
      onSelect && onSelect({});
      return;
    }
    setDisplayInput(false);
    resetSelectOptions();
    if (!item) return;
    setSelectedItem(item);
    onSelect && onSelect(item);
  };
  const handleOnBlur = e => {
    const className =
      e.relatedTarget?.className.substring(
        0,
        e.relatedTarget.className.lastIndexOf("-")
      ) || "";
    const itemIndex = Number(
      e.relatedTarget?.className.slice(
        e.relatedTarget.className.lastIndexOf("-") + 1
      )
    );
    if (
      e.relatedTarget &&
      e.relatedTarget.tagName == "LI" &&
      className == "select-model-item"
    ) {
      if (isNaN(itemIndex)) return;
      const item = options[itemIndex];
      setValue(name, _.get(item, renderedField), { shouldValidate: true });
      item && setValue(id, item["objectId"]);
      return;
    }
    resetSelectOptions();
    setDisplayInput(false);
    const inputValue = getValues(name)?.trim() || "";
    if (!inputValue) {
      setValue(id, "");
      setSelectedItem(null);
      onSelect && onSelect(null);
      return;
    }
    setValue(name, _.get(selectedItem, renderedField));
  };
  const resetSelectOptions = async (searchValue = "") => {
    try {
      const url = `/parse/classes/${model}?where={${query(
        searchValue
      )}${condition}}${includeFieldStr}&limit=10`;
      const response = await httpService.get(url);
      setOptions(response?.results);
    } catch (err) {}
  };
  useEffect(() => {
    resetSelectOptions();
  }, [model, condition, configName, refresh]);
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <CommonText
          className={
            "mt-0 mb-1 form-label" + (required && " star-red-required")
          }
        >
          {label}
        </CommonText>
      )}

      <div className={"position-relative" + " " + className}>
        <CommonInputt
          placeholder={placeholder}
          className={"form-control" + " " + className}
          {...register(name, {
            onBlur: e => handleOnBlur(e),
            onChange: event => handleOnChange(event),
          })}
          onClick={e => {
            e.stopPropagation();
            handleOnClick(e);
          }}
          onDoubleClick={e => {
            e.stopPropagation();
          }}
          autoComplete="off"
          {...rest}
        />
        <ul
          className="awesomplete"
          style={{
            maxHeight: options && "200px",
            display: displayInput ? "block" : "none",
          }}
          onClick={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
        >
          {showOptionAll && (
            <li
              className={"select-model-item-0"}
              tabIndex="0"
              onClick={() =>
                handleSelectItem({
                  objectId: "all",
                  name: "Tất cả",
                  value: `all${name}`,
                })
              }
            >
              <div className="text-wrap fw-bold">Tất cả</div>
            </li>
          )}
          {options?.map((item, index) => {
            return (
              <li
                key={index}
                className={"select-model-item-" + index}
                tabIndex="0"
                onClick={() => handleSelectItem(item)}
              >
                {!customizeRender ? (
                  <React.Fragment>
                    <div className="text-wrap fw-bold">
                      {_.get(item, fieldView[0])}
                    </div>
                    {fieldView[1] && (
                      <div className="text-wrap">
                        {_.get(item, fieldView[1])}
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  customizeRender(item)
                )}
              </li>
            );
          })}
          {customizeOptions.map((Option, index) => (
            <li
              className="select-model-item-customize"
              tabIndex="0"
              key={"customize-option" + index}
              onClick={() => handleSelectItem(null)}
            >
              <Option {...props} setRefresh={setRefresh} />
            </li>
          ))}
        </ul>
      </div>

      {(_.get(errors, name) ||
        _.get(errors, id.slice(0, id.lastIndexOf(".")))?.message) && (
        <CommonText level={0} color={"red"} style={{ margin: 0 }}>
          {_.get(errors, name)?.message ||
            _.get(errors, id.slice(0, id.lastIndexOf(".")))?.message ||
            ""}
        </CommonText>
      )}
    </div>
  );
}
export default VVSSelectModel;
