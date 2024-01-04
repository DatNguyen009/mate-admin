import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "reactstrap";
import _ from "lodash";

import { CommonLabel } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import httpService from "services/httpService";
import VVSAddress2 from "components/Common/VVSAddress2";
import UploadImage from "components/Common/UploadImage";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import SelectConst from "components/form-control/SelectConst";
import InputField from "components/form-control/InputField";
import TextareaField from "components/form-control/Textarea";
import Notes from "components/Projects/CardCollapse/Notes";
import SelectField from "components/form-control/Select";
import VVSSelectRelation from "components/Common/VVSSelectRelation";
import { uploadFilesApi } from "apis/file";
import VVSTable from "components/form-control/VVSTable";
import { formatNumber } from "helpers/erp_helper";
import IDatePicker from "components/Common/DatePicker";

const useGetFormSchema = (propModelName, yup, rest, errors, isCard = true) => {
  const [form, setForm] = useState([]);
  const [images, setImages] = useState({});
  const [address, setAddress] = useState({});
  const [content, setContent] = useState("");
  const [postCategory, setPostCategory] = useState([]);
  const [isImageChange, setIsImageChange] = useState(false);

  useEffect(() => {
    getFormSchema();
  }, []);

  const getFormSchema = async () => {
    const res = await httpService.get(
      '/parse/classes/SysCfg?where={"Code":"FormConfig"}'
    );
    const { results: postCategory } = await httpService.get(
      '/parse/classes/SysCfg?where={"Category":"Post"}'
    );

    const form = res.results[0].Values.find(
      model => model.name === propModelName
    )?.form;

    setForm(form || []);
    setPostCategory(
      postCategory.map((p, index) => ({
        index,
        name: p.Name,
        value: p.objectId,
      }))
    );
  };

  const getImages = detail => {
    const images = Object.entries(detail).reduce((obj, [name, value]) => {
      if (value?.__type === "File") {
        obj[name] = value;
      }
      return obj;
    }, {});
    setImages(images);
  };

  const getAddress = detail => {
    const { province, district, ward, type } = detail;
    setAddress({ province, district, ward, type });
  };

  const getContent = detail => {
    setContent(detail?.content || "");
  };

  const renderForm = (excludeFields = [], includeFunctions = {}) => {
    if (!form.length) return null;

    const renderField = child => {
      const {
        type,
        targetClass,
        name,
        label,
        rows = 6,
        model,
        disabled,
        readOnly,
      } = child;

      switch (type) {
        case "SysCfg": {
          return (
            <div style={{ minHeight: 78 }}>
              <VVSSelectModel
                {...child}
                {...rest}
                name={name + ".Name"}
                errors={errors}
                model={targetClass}
                configName={name}
                conditionField={{
                  Category: child.category,
                }}
              />
            </div>
          );
        }
        case "Table": {
          return (
            <VVSTable name={model} disableAdd disableDelete disableSearch />
          );
        }
        case "Relation": {
          return (
            <VVSSelectRelation
              {...child}
              {...rest}
              errors={errors}
              model={targetClass}
            />
          );
        }
        case "PostCategory": {
          return (
            <SelectField
              {...child}
              {...rest}
              errors={errors}
              options={postCategory}
            />
          );
        }
        case "TextEditor": {
          return (
            <Notes
              label={label}
              onChangeTextEditor={setContent}
              content={content}
            />
          );
        }
        case "Textarea": {
          return (
            <TextareaField {...child} {...rest} errors={errors} rows={rows} />
          );
        }
        case "Boolean": {
          return (
            <div
              style={{ minHeight: 78, gap: 8 }}
              className="d-flex flex-column"
            >
              <CommonText className="mt-0 mb-1">{label}</CommonText>
              <div className="form-check form-check-success">
                <input
                  type="checkbox"
                  className="form-check-input mr-3"
                  id={`${child.id}|checkbox`}
                  disabled={readOnly || disabled}
                  {...rest.register(name)}
                  {...includeFunctions[name]}
                />
                <label htmlFor={`${child.id}|checkbox`}>
                  {_.startCase(name)}
                </label>
              </div>
            </div>
          );
        }
        case "Address": {
          return (
            <div style={{ minHeight: 78 }}>
              <VVSAddress2
                {...child}
                {...rest}
                errors={errors}
                address={address}
                setAddress={setAddress}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "File": {
          const { getValues, setValue } = rest;
          return (
            <>
              <CommonLabel className={"mt-0 bold"} style={{ fontWeight: 600 }}>
                {label}
              </CommonLabel>
              <UploadImage
                onUploaded={file => {
                  setValue(name, file);
                  setIsImageChange(true);
                }}
                imgFile={getValues(name)}
                disabled={disabled}
                readOnly={readOnly}
              />
            </>
          );
        }
        case "Pointer": {
          return (
            <div style={{ minHeight: 78 }}>
              <VVSSelectModel
                model={targetClass}
                {...child}
                {...rest}
                errors={errors}
                name={`${name}.text`}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "Select": {
          return (
            <div style={{ minHeight: 78 }}>
              <SelectConst
                {...child}
                {...rest}
                errors={errors}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "Number": {
          return (
            <div style={{ minHeight: 78 }}>
              <InputField
                {...child}
                {...rest}
                errors={errors}
                type="text"
                onChange={_.debounce(
                  e => rest.setValue(name, formatNumber(e.target.value)),
                  1000
                )}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "SelectConst": {
          return (
            <div style={{ minHeight: 78 }}>
              <SelectField
                {...child}
                {...rest}
                errors={errors}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "Date": {
          return (
            <div style={{ minHeight: 78 }}>
              <IDatePicker
                {...rest}
                {...child}
                errors={errors}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "DateTime": {
          return (
            <div style={{ minHeight: 78 }}>
              <InputField
                {...child}
                {...rest}
                errors={errors}
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        default: {
          return (
            <div style={{ minHeight: 78 }}>
              <InputField
                {...child}
                {...rest}
                errors={errors}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
      }
    };

    return form.map(block => {
      return (
        <Card body key={block.id} className={`${!isCard && "p-0 shadow-none"}`}>
          {block.title && (
            <CommonText level={1} className="m-0">
              {block.title}
            </CommonText>
          )}
          <Row>
            {block.fields.map(field => {
              const cloneChildren = [...field.children].map(child => ({
                ...child,
                ...includeFunctions[child.name],
              }));
              field.children = cloneChildren;
              const isAllHidden = _.every(cloneChildren, ["hidden", true]);
              if (isAllHidden) return null;

              return (
                <Col key={field.id} xs={field.cols}>
                  <Row>
                    {field.children
                      .filter(child => !_.includes(excludeFields, child.name))
                      .map(child => {
                        const xs =
                          (child?.fullWidth && 12) ||
                          (field?.flex === "column" && 12) ||
                          (field?.flex === "row" &&
                            12 /
                              field.children.filter(child => !child?.fullWidth)
                                .length);
                        return (
                          <Col key={child.id} xs={xs}>
                            {child.name === "blank" ? (
                              <div style={{ height: 78 }}></div>
                            ) : (
                              renderField(child)
                            )}
                          </Col>
                        );
                      })}
                  </Row>
                </Col>
              );
            })}
          </Row>
        </Card>
      );
    });
  };

  const uploadImg = async file => {
    if (!file) return;

    if (file.isRemove) {
      await httpService.delete(`/parse/files/${file.name}`, {
        headers: {
          "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
        },
      });
      return null;
    }

    if (isImageChange) {
      const results = await uploadFilesApi([file]);
      setIsImageChange(false);
      return results[0];
    }

    if (file.url) {
      return file;
    }

    const results = await uploadFilesApi([file]);
    return results[0];
  };

  return {
    renderForm,
    images,
    content,
    getImages,
    getAddress,
    getContent,
    uploadImg,
  };
};

export default useGetFormSchema;
