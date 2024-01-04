import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CommonInputt } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import httpService from "services/httpService";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { debounce, get } from "lodash";
import { getTextByRole } from "helpers/lifestyle_helper";

VVSSelect.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  model: PropTypes.string,
  searchField: PropTypes.string,
  fieldView: PropTypes.array,
  path: PropTypes.string,
  setValue: PropTypes.any,
  onSelect: PropTypes.func,
  modeType: PropTypes.bool,
  defaultValue: PropTypes.array,
  setError: PropTypes.func,
  clearErrors: PropTypes.func,
  handleOnChange: PropTypes.func,
  condition: PropTypes.array,
  conditionText: PropTypes.string,
  conditionField: PropTypes.object,
  includeField: PropTypes.array,
  customizeRender: PropTypes.any,
  disabled: PropTypes.bool,
};

function VVSSelect(props) {
  const {
    label,
    register,
    required,
    name,
    model,
    searchField,
    fieldView,
    path,
    setValue,
    errors,
    onSelect,
    modeType,
    defaultValue,
    setError,
    clearErrors,
    handleOnChange,
    conditionText,
    conditionField,
    includeField,
    customizeRender,
    disabled = false,
  } = props;
  const [displayInput, setDisplayInput] = useState(false);
  const [responseApi, setResponseApi] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (defaultValue?.length) {
      const tagsMap = defaultValue.map((tag, index) => {
        return {
          index,
          name: tag.name,
          objectId: tag.objectId,
        };
      });
      setTags(tagsMap);
      return;
    }
  }, [JSON.stringify(defaultValue)]);

  const handleOnClickV2 = async () => {
    const url = `/parse/classes/${model}`;
    const response = await httpService.get(url, {
      params: {
        where: {
          ...(conditionField && { ...conditionField }),
        },
        limit: 15,
        ...(includeField?.length && { include: includeField }),
      },
    });
    setResponseApi(response?.results);
    setDisplayInput(true);
  };

  const handleOnChangeV2 = debounce(async e => {
    const url = `/parse/classes/${model}`;

    if (!e.target.value) {
      setValue(name, "");
      const response = await httpService.get(url, {
        params: {
          where: {
            ...(conditionField && { ...conditionField }),
          },
          limit: 15,
          ...(includeField?.length && { include: includeField }),
        },
      });
      setResponseApi(response?.results);
      return;
    }

    const response = await httpService.get(url, {
      params: {
        where: {
          searchField: { $regex: e.target.value, $options: "i" },
          ...(conditionField && { ...conditionField }),
        },
        limit: 15,
        ...(includeField?.length && { include: includeField }),
      },
    });
    setResponseApi(response?.results);

    if (!response.results.length) {
      setError(name, { type: "string", message: `This ${name} is not exist!` });
      return;
    }
    clearErrors(name);
    const itemFilter = response.results.filter(
      item =>
        item[searchField]
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );
    const validateItem = itemFilter.find(
      p => p[searchField] === e.target.value
    );

    if (validateItem === undefined) {
      setError(
        name,
        { type: "string", message: `This ${name} is not exist!` },
        { shouldFocus: true }
      );
      return;
    }
    clearErrors(name);
  }, 300);

  const handleItemSelected = (item, fieldReset) => {
    setValue(name, item[fieldReset]);
    setDisplayInput(false);
    clearErrors(name);
    onSelect && onSelect(item);
  };

  const handleItemSelectedModeTag = (item, fieldReset) => {
    setTags(prev => [
      ...prev,
      {
        index: tags.length,
        name: item[fieldReset],
        objectId: item["objectId"],
      },
    ]);
    onSelect &&
      onSelect([
        ...tags,
        {
          index: tags.length,
          name: item[fieldReset],
          objectId: item["objectId"],
        },
      ]);
    setDisplayInput(false);
  };

  const onBlurInput = () => {
    setTimeout(() => {
      setDisplayInput(false);
    }, 150);
  };

  const handleDeteleTags = tag => {
    const newTags = tags.filter(i => i.index !== tag.index);
    setTags(newTags);
    onSelect && onSelect(newTags);
  };
  return (
    <div>
      {label ? (
        <CommonText
          className={"form-label mb-1" + (required && " star-red-required")}
        >
          {label}
        </CommonText>
      ) : null}
      {register && (
        <>
          <CommonInputt
            className="form-control"
            {...register(name, { required })}
            onClick={handleOnClickV2}
            onChange={
              handleOnChange
                ? event => {
                    handleOnChangeV2(event);
                    handleOnChange(event);
                  }
                : event => handleOnChangeV2(event)
            }
            autoComplete="off"
            onBlur={onBlurInput}
            disabled={disabled}
          />
          <ul
            className="awesomplete"
            style={{
              display: displayInput && !disabled ? "block" : "none",
              overflowY: "scroll",
              height: "250px",
            }}
          >
            {responseApi?.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() =>
                    modeType
                      ? handleItemSelectedModeTag(item, fieldView[0])
                      : handleItemSelected(item, fieldView[0])
                  }
                >
                  {!customizeRender ? (
                    <React.Fragment>
                      {fieldView?.map((field, index) => (
                        <div
                          key={index + "field"}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "3px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: index === 0 ? 700 : 500,
                              fontSize: index === 0 ? 13 : 10,
                            }}
                          >
                            {fieldView && field === "role"
                              ? getTextByRole(
                                  get(item, field),
                                  get(item, "userType")
                                ).title
                              : get(item, field)}
                          </span>
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    customizeRender(item)
                  )}
                </li>
              );
            })}
            {conditionField && conditionText && (
              <li>
                <span>
                  {`Filters applied for`} <b>{conditionText}</b>
                </span>
              </li>
            )}

            {/* <Link to={path ? path : "#"}>
              <li>
                <i className="bx bx-plus"></i>
                <span>{`Create a new ${model}`}</span>
              </li>
            </Link>
            <li>
              <i className="bx bx-search-alt"></i>
              <span>Advanced Search</span>
            </li> */}
          </ul>
        </>
      )}

      {!!tags.length &&
        tags?.map((item, index) => (
          <Button
            type="button"
            className="tags-selected"
            color="success"
            key={index}
            style={{ marginTop: 10 }}
          >
            <span>{item.name}</span>
            <i
              className="mdi mdi-close"
              onClick={() => handleDeteleTags(item)}
            ></i>
          </Button>
        ))}

      {errors && (
        <CommonText level={0} color={"red"} style={{ margin: 0 }}>
          {errors[name]?.message}
        </CommonText>
      )}
    </div>
  );
}

export default VVSSelect;
