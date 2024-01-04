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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  schemaErrorMessages,
  DATA_SCHEMA_VALIDATION,
} from "constants/dataSchemaValidation";

const useGetFormSchemaVer2 = (propModelName, yup, isCard = true) => {
  const [form, setForm] = useState([]);
  const [images, setImages] = useState({});
  const [address, setAddress] = useState({});
  const [content, setContent] = useState("");
  const [postCategory, setPostCategory] = useState([]);
  const [isImageChange, setIsImageChange] = useState(false);
  const [schema, setSchema] = useState({});

  const {
    handleSubmit,
    formState: { errors: errorsState },
    ...restState
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getFormSchema();
  }, []);

  useEffect(() => {
    if (form.length === 0) return;

    const schemaValue = addFormSchema(form);
    setSchema(schemaValue);
  }, [form.length]);

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

  const addFormSchema = form => {
    let schemaObj = {};

    const mergeSchemaField = ({ type, baseSchema, schemaList }) => {
      if (!Array.isArray(schemaList) || !schemaList.length) return null;

      const schemasType = DATA_SCHEMA_VALIDATION[String(type).toLowerCase()];
      const schemaFormat = schemaList.map(s => s.code);

      const merged = schemaFormat.reduce((mergedSchemas, code) => {
        const findSchema = schemasType.find(s => s.code === code);
        return mergedSchemas.concat(findSchema.value);
      }, baseSchema);

      return merged;
    };

    const addSchemaField = child => {
      const { type, name, required, targetClass, schemaList } = child;
      if (!required && (!Array.isArray(schemaList) || !schemaList.length))
        return;

      switch (type) {
        case "String":
        case "Textarea":
        case "Select":
        case "Date":
        case "DateTime": {
          const baseSchema = yup.string();
          const schemaMerged = mergeSchemaField({
            type,
            baseSchema,
            schemaList,
          });

          schemaObj = {
            ...schemaObj,
            ...(required
              ? {
                  [name]: yup
                    .string()
                    .required(schemaErrorMessages.required)
                    .concat(schemaMerged),
                }
              : {
                  [name]: schemaMerged,
                }),
          };
          break;
        }
        // case "Boolean": {
        //   schemaObj = {
        //     ...schemaObj,
        //     [name]: yup
        //       .bool()
        //       .oneOf([true], errorMessages.required),
        //   };
        //   break;
        // }
        case "Pointer": {
          schemaObj = {
            ...schemaObj,
            ...(required && {
              [name]: yup
                .object()
                .nullable()
                .transform((_, val) =>
                  val?.objectId
                    ? {
                        __type: "Pointer",
                        className: targetClass,
                        objectId: val.objectId,
                      }
                    : null
                )
                .required(schemaErrorMessages.required),
            }),
          };
          break;
        }
        case "Number": {
          const baseSchema = yup.number();
          const schemaMerged = mergeSchemaField({
            type,
            baseSchema,
            schemaList,
          });

          schemaObj = {
            ...schemaObj,
            ...(required
              ? {
                  [name]: yup
                    .number()
                    .required(schemaErrorMessages.required)
                    .concat(schemaMerged),
                }
              : {
                  [name]: schemaMerged,
                }),
          };
          break;
        }
        default: {
          break;
        }
      }
    };

    form.map(block => {
      {
        block?.fields?.map(field => {
          {
            field.children.map(child => {
              {
                if (child.name === "blank") return;
                addSchemaField(child);
              }
            });
          }
        });
      }
    });

    return yup.object(schemaObj).required();
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
                {...restState}
                name={name + ".Name"}
                errors={errorsState}
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
              {...restState}
              errors={errorsState}
              model={targetClass}
            />
          );
        }
        case "PostCategory": {
          return (
            <SelectField
              {...child}
              {...restState}
              errors={errorsState}
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
            <TextareaField
              {...child}
              {...restState}
              errors={errorsState}
              rows={rows}
            />
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
                  {...restState.register(name)}
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
                {...restState}
                errors={errorsState}
                address={address}
                setAddress={setAddress}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "File": {
          const { getValues, setValue } = restState;
          return (
            <>
              <CommonLabel>{label}</CommonLabel>
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
                {...restState}
                errors={errorsState}
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
                {...restState}
                errors={errorsState}
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
                {...restState}
                errors={errorsState}
                type="text"
                onChange={_.debounce(
                  e => restState.setValue(name, e.target.value),
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
                {...restState}
                errors={errorsState}
                {...includeFunctions[name]}
              />
            </div>
          );
        }
        case "Date": {
          return (
            <div style={{ minHeight: 78 }}>
              <IDatePicker
                {...child}
                {...restState}
                errors={errorsState}
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
                {...restState}
                errors={errorsState}
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
                {...restState}
                errors={errorsState}
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
    handleSubmit,
    rest: restState,
    errors: errorsState,
  };
};

export default useGetFormSchemaVer2;
