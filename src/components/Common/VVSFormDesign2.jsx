import React, { useState, useRef, useEffect } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import _, { startCase } from "lodash";

import { CommonButton } from "./ButtonCommon";
import { CommonLabel } from "./inputCommon";
import { CommonText } from "./TextCommon";
import httpService from "services/httpService";
import InputField from "components/form-control/InputField";
import { TEXT_PUT } from "helpers/name_helper";
import { toastrCRUDSuccess } from "./AlertToastr";
import SelectConst from "components/form-control/SelectConst";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import UploadImage from "./UploadImage";
import VVSAddress2 from "./VVSAddress2";
import TextareaField from "components/form-control/Textarea";
import Notes from "components/Projects/CardCollapse/Notes";
import SelectField from "components/form-control/Select";
import VVSSelectRelation from "./VVSSelectRelation";
import MODEL_CONFIG from "constants/ModelConfig";
import VVSTable from "components/form-control/VVSTable";
import { DATA_SCHEMA_VALIDATION } from "constants/dataSchemaValidation";

const COMPONENT_OPTIONS = [
  { index: 1, name: "String", value: "String" },
  { index: 2, name: "Number", value: "Number" },
  { index: 3, name: "Select", value: "Select" },
  { index: 4, name: "Textarea", value: "Textarea" },
  { index: 5, name: "Table", value: "Table" },
  { index: 6, name: "Date", value: "Date" },
  { index: 7, name: "Address", value: "Address" },
  { index: 8, name: "File", value: "File" },
  { index: 9, name: "Boolean", value: "Boolean" },
  { index: 10, name: "Pointer", value: "Pointer" },
  { index: 11, name: "TextEditor", value: "TextEditor" },
  { index: 12, name: "PostCategory", value: "PostCategory" },
  { index: 13, name: "Relation", value: "Relation" },
  { index: 14, name: "Object", value: "Object" },
  { index: 15, name: "SysCfg", value: "SysCfg" },
  { index: 16, name: "SelectConst", value: "SelectConst" },
  { index: 17, name: "DateTime", value: "DateTime" },
];

const ADDRESS_TYPE_OPTIONS = [
  { index: 1, name: "Province", value: "province" },
  { index: 2, name: "District", value: "district" },
  { index: 3, name: "Ward", value: "ward" },
];

const VVSFormDesign2 = () => {
  let modelName = "";
  if (_.includes(useParams().modelName, "_")) {
    const originalModelName = useParams().modelName.split("_");
    const capitalizeModelName = _.capitalize(originalModelName[1]);
    modelName = _.padStart(
      capitalizeModelName,
      capitalizeModelName.length + 1,
      "_"
    );
  } else {
    modelName = _.startCase(useParams().modelName).replaceAll(" ", "");
  }
  const [form, setForm] = useState([]);
  const [modelSchemas, setModelSchemas] = useState([]);
  const [sysCfg, setSysCfg] = useState([]);
  const [labelEdit, setLabelEdit] = useState("");
  const [isNewModel, setIsNewModel] = useState(false);
  const [modelConfig, setModelConfig] = useState(null);
  const [formLayout, setFormLayout] = useState(null);
  const [address, setAddress] = useState({});
  const [postCategory, setPostCategory] = useState([]);
  const [sysCfgCategory, setSysCfgCategory] = useState([]);
  const titleRef = useRef(null);
  const labelRef = useRef(null);
  const modelConfigList = Object.keys(MODEL_CONFIG);

  useEffect(() => {
    getModelSchema();
  }, []);

  const schema = yup.object({}).required();
  const {
    handleSubmit,
    formState: { errors },
    ...formRestProps
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getModelSchema = async () => {
    const modelSchema = await httpService.get(
      `/parse/schemas/${
        modelName === "Warehouse"
          ? "WareHouse"
          : modelName === "Userinfo"
          ? "UserInfo"
          : startCase(modelName)
      }`,
      {
        headers: {
          "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFSY",
        },
      }
    );
    const sysCfg = await httpService.get(
      `/parse/classes/SysCfg?limit=200&order=Name`
    );
    const { results: postCategory } = await httpService.get(
      '/parse/classes/SysCfg?where={"Category":"Post"}'
    );
    setPostCategory(
      postCategory.map((p, index) => ({
        index,
        name: p.Name,
        value: p.Name,
        objectId: p.objectId,
      }))
    );
    setSysCfgCategory(
      _.uniq(
        sysCfg.results.filter(item => item.Category).map(item => item.Category)
      )
    );
    setSysCfg(sysCfg.results);
    const formConfig = sysCfg.results.find(item => item.Code === "FormConfig");
    setModelConfig(formConfig);
    const model = formConfig.Values.find(model => model.name === modelName);
    if (!model) setIsNewModel(true);
    setForm(model?.form || []);
    const modelSchemaMap = _.orderBy(
      Object.entries(modelSchema.fields).map(([name, value]) => ({
        id: uuidv4(),
        name,
        ...value,
      })),
      ["name"],
      ["asc"]
    );
    setModelSchemas(modelSchemaMap);
  };
  const handleAddBlock = () => {
    const title = titleRef.current.value;
    const newBlock = { id: uuidv4(), fields: [], ...(title && { title }) };
    setForm([...form, newBlock]);
    titleRef.current.value = "";
  };
  const handleDeleteBlock = blockId => {
    setForm([...form].filter(block => block.id !== blockId));
  };
  const handleAddField = blockId => {
    const targetBlock = form.find(block => block.id === blockId);
    targetBlock.fields = [
      ...targetBlock.fields,
      { id: uuidv4(), cols: 4, rows: 1, children: [] },
    ];
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleDeleteField = (blockId, fieldId) => {
    const targetBlock = form.find(block => block.id === blockId);
    const updateFields = targetBlock.fields.filter(
      field => field.id !== fieldId
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChangeFieldCols = (blockId, fieldId, cols) => {
    const targetBlock = form.find(block => block.id === blockId);
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? { ...field, cols } : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChangeFieldRows = (blockId, fieldId, rows) => {
    const targetBlock = form.find(block => block.id === blockId);
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? { ...field, rows } : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChooseField = (blockId, fieldId, event) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const schema = modelSchemas.find(s => s.name === event.target.value);

    if (event.target.value === "warehouse") {
      targetField.children = [
        ...targetField.children,
        {
          name: "warehouse",
          id: uuidv4(),
          label: "WareHouse",
          required: false,
          type: "Pointer",
          targetClass: "WareHouse",
        },
      ];

      const updateFields = targetBlock.fields.map(field =>
        field.id === fieldId ? targetField : field
      );
      targetBlock.fields = updateFields;

      setForm(
        [...form].map(block => (block.id === blockId ? targetBlock : block))
      );

      event.target.value = "";
      return;
    }

    if (event.target.value === "blank") {
      targetField.children = [
        ...targetField.children,
        { name: "blank", id: uuidv4() },
      ];
      const updateFields = targetBlock.fields.map(field =>
        field.id === fieldId ? targetField : field
      );
      targetBlock.fields = updateFields;

      setForm(
        [...form].map(block => (block.id === blockId ? targetBlock : block))
      );

      event.target.value = "";
      return;
    }

    if (event.target.value === "table") {
      targetField.children = [
        ...targetField.children,
        { name: "table", id: uuidv4(), type: "Table" },
      ];
      const updateFields = targetBlock.fields.map(field =>
        field.id === fieldId ? targetField : field
      );
      targetBlock.fields = updateFields;

      setForm(
        [...form].map(block => (block.id === blockId ? targetBlock : block))
      );

      event.target.value = "";
      return;
    }

    if (event.target.value === "password") {
      targetField.children = [
        ...targetField.children,
        { name: "password", label: "Password", id: uuidv4(), type: "String" },
      ];
      const updateFields = targetBlock.fields.map(field =>
        field.id === fieldId ? targetField : field
      );
      targetBlock.fields = updateFields;

      setForm(
        [...form].map(block => (block.id === blockId ? targetBlock : block))
      );

      event.target.value = "";
      return;
    }

    const checkExist = targetField.children.findIndex(
      child => child.name === event.target.value
    );
    if (checkExist !== -1) {
      event.target.value = "";
      return;
    }
    targetField.children = [
      ...targetField.children,
      { ...schema, label: _.startCase(schema.name) },
    ];
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;

    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );

    event.target.value = "";
  };
  const handleRemoveChild = (blockId, fieldId) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    targetField.children = [];
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;

    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChangeFieldFlex = e => {
    const blockId = e.target.id.split("|")[0];
    const fieldId = e.target.id.split("|")[1];
    const flex = e.target.id.split("|")[2];
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    targetField.flex = flex;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChangeChildType = (blockId, fieldId, childId, type) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, schemaList: [], type } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChangeTextareaRows = (blockId, fieldId, childId, rows) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, rows } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChooseTableModel = (blockId, fieldId, childId, model) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, model } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChooseTableConfig = (blockId, fieldId, childId, configName) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, configName } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleSelectSysCfg = (blockId, fieldId, childId, sysCfgName) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, sysCfgName } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleSelectAddressType = (blockId, fieldId, childId, addressType) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, addressType } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleEditLabel = (blockId, fieldId, childId) => {
    const label = labelRef.current.value;

    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, label } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
    setLabelEdit("");
  };
  const handleSaveForm = async () => {
    const { createdAt, updatedAt, ...modelConfigValues } = modelConfig;
    const updateValues = !isNewModel
      ? [...modelConfig.Values].map(model =>
          model.name === modelName ? { name: modelName, form } : model
        )
      : [...modelConfig.Values, { name: modelName, form }];
    modelConfigValues.Values = updateValues;

    httpService
      .put(`/parse/classes/SysCfg/${modelConfig.objectId}`, modelConfigValues)
      .then(() => {
        toastrCRUDSuccess("Form", TEXT_PUT);
      });
  };
  const handleAddSchemaValidationField = (
    blockId,
    fieldId,
    childId,
    childType,
    event
  ) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const childField = targetField.children.find(child => child.id === childId);

    const schemasType = DATA_SCHEMA_VALIDATION[String(childType).toLowerCase()];
    const checkExist =
      childField.schemaList &&
      childField.schemaList.length > 0 &&
      childField.schemaList.findIndex(s => s.code === event.target.value) !==
        -1;
    if (checkExist) {
      event.target.value = "";
      return;
    }

    const schemaSelected = schemasType?.find(
      s => s.code === event.target.value
    );

    console.log("schemaSelected: ", schemaSelected);
    if (!childField || !schemaSelected) return;
    const schemaList = [...(childField.schemaList || []), schemaSelected];
    event.target.value = "";
    console.log("schemaList: ", schemaList);

    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, schemaList } : child
    );
    console.log("updateChildren: ", updateChildren);
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleChooseChildOption = e => {
    const blockId = e.target.id.split("|")[0];
    const fieldId = e.target.id.split("|")[1];
    const childId = e.target.id.split("|")[2];
    const optionName = e.target.id.split("|")[3];
    const checked = e.target.checked;

    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, [optionName]: checked } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleCheckClearSchemaValidationField = e => {
    const blockId = e.target.id.split("|")[0];
    const fieldId = e.target.id.split("|")[1];
    const childId = e.target.id.split("|")[2];
    const code = e.target.id.split("|")[3];

    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const childField = targetField.children.find(child => child.id === childId);
    const filterSchemas = childField.schemaList.filter(s => s.code !== code);
    const updateChildren = targetField.children.map(child =>
      child.id === childId
        ? { ...child, schemaList: [...filterSchemas] }
        : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const handleSelectSysCfgCategory = (blockId, fieldId, childId, category) => {
    const targetBlock = form.find(block => block.id === blockId);
    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    const updateChildren = targetField.children.map(child =>
      child.id === childId ? { ...child, category } : child
    );
    targetField.children = updateChildren;
    const updateFields = targetBlock.fields.map(field =>
      field.id === fieldId ? targetField : field
    );
    targetBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };
  const renderForm = () => {
    return form.map(block => (
      <Card body key={block.id}>
        <div className="d-flex align-items-center justify-content-between">
          <CommonText className="m-0" level={1}>
            {block?.title || ""}
          </CommonText>
          <div className="d-flex" style={{ gap: 6 }}>
            <CommonButton level={0} onClick={() => handleAddField(block.id)}>
              Add Field
            </CommonButton>
            <CommonButton level={2} onClick={() => handleDeleteBlock(block.id)}>
              <i className="fas fa-trash" />
            </CommonButton>
          </div>
        </div>
        <Row className="mt-3">
          {block?.fields?.map(field => (
            <Col key={field.id} xs={field.cols} className="mb-4">
              <div
                className="d-flex flex-wrap align-items-end justify-content-between mb-2"
                style={{ gap: 6 }}
              >
                <div className="d-flex flex-column align-items-center">
                  <CommonLabel className="m-0">Cols: </CommonLabel>
                  <input
                    className="form-control"
                    type="number"
                    defaultValue={field.cols}
                    min={4}
                    max={12}
                    step={4}
                    style={{ width: 60, height: 30 }}
                    onChange={e =>
                      handleChangeFieldCols(block.id, field.id, e.target.value)
                    }
                  />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <CommonLabel className="m-0">Rows: </CommonLabel>
                  <input
                    className="form-control"
                    type="number"
                    defaultValue={field.rows}
                    min={1}
                    max={4}
                    style={{ width: 60, height: 30 }}
                    onChange={e =>
                      handleChangeFieldRows(block.id, field.id, e.target.value)
                    }
                  />
                </div>
                <select
                  className="rounded py-1 px-2"
                  style={{ border: "1px solid #ced4da" }}
                  onChange={e => handleChooseField(block.id, field.id, e)}
                >
                  <option value="">Select schema</option>
                  <option value="blank">Blank field</option>
                  <option value="table">Table</option>
                  <option value="password">Password</option>
                  <option value="warehouse">WareHouse</option>
                  <option disabled>------------------</option>
                  {modelSchemas.map(m => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <CommonButton
                  level={2}
                  onClick={() => handleDeleteField(block.id, field.id)}
                >
                  <i className="fas fa-trash" />
                </CommonButton>
              </div>
              <div>
                <div
                  style={{
                    minHeight: field.rows * 90,
                  }}
                  className="border rounded py-3 px-2"
                >
                  {Boolean(field.children.length) && (
                    <div
                      className="align-items-center d-flex mb-3"
                      style={{ gap: 6 }}
                    >
                      <input
                        className="form-check-input m-0"
                        type="radio"
                        name={`${block.id}|${field.id}|radio`}
                        id={`${block.id}|${field.id}|column`}
                        checked={field?.flex === "column"}
                        onChange={handleChangeFieldFlex}
                      />
                      <label
                        htmlFor={`${block.id}|${field.id}|column`}
                        className="m-0"
                      >
                        Column
                      </label>
                      <input
                        className="form-check-input m-0"
                        type="radio"
                        name={`${block.id}|${field.id}|radio`}
                        id={`${block.id}|${field.id}|row`}
                        checked={field?.flex === "row"}
                        onChange={handleChangeFieldFlex}
                      />
                      <label
                        htmlFor={`${block.id}|${field.id}|row`}
                        className="m-0"
                      >
                        Row
                      </label>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveChild(block.id, field.id)}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  )}
                  <div
                    className="d-flex flex-column justify-content-around align-items-center"
                    style={{ gap: 12 }}
                  >
                    {field.children.map(child => (
                      <div key={child.id}>
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: 6 }}
                        >
                          <>
                            {(child.name === "blank" && (
                              <input
                                className="form-control"
                                style={{ width: 120, paddingBlock: 2 }}
                                type="text"
                                disabled
                                value={child?.name}
                              />
                            )) ||
                              (child.name === "table" && (
                                <>
                                  <input
                                    className="form-control"
                                    style={{ width: 120, paddingBlock: 2 }}
                                    type="text"
                                    disabled
                                    value={child?.name}
                                  />
                                  <select
                                    className="rounded border border-secondary"
                                    style={{ paddingBlock: 2 }}
                                    defaultValue={child?.model}
                                    onChange={e =>
                                      handleChooseTableModel(
                                        block.id,
                                        field.id,
                                        child.id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value=""></option>
                                    {modelConfigList.map((item, index) => (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </select>
                                </>
                              )) || (
                                <>
                                  {labelEdit === child.id ? (
                                    <>
                                      <input
                                        className="form-control"
                                        style={{ width: 120, paddingBlock: 2 }}
                                        type="text"
                                        defaultValue={child?.label}
                                        ref={labelRef}
                                      />
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => setLabelEdit("")}
                                      >
                                        <i className="fas fa-times" />
                                      </button>
                                      <button
                                        className="btn btn-outline-success btn-sm"
                                        onClick={() =>
                                          handleEditLabel(
                                            block.id,
                                            field.id,
                                            child.id
                                          )
                                        }
                                      >
                                        <i className="fas fa-check" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <input
                                        className="form-control"
                                        style={{ width: 120, paddingBlock: 2 }}
                                        type="text"
                                        disabled
                                        value={child?.label}
                                      />
                                      <button
                                        className="btn btn-outline-info btn-sm"
                                        onClick={() => setLabelEdit(child.id)}
                                      >
                                        <i className="far fa-edit" />
                                      </button>
                                    </>
                                  )}
                                  <select
                                    className="rounded border border-secondary"
                                    style={{ paddingBlock: 2 }}
                                    defaultValue={child?.type}
                                    onChange={e =>
                                      handleChangeChildType(
                                        block.id,
                                        field.id,
                                        child.id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    {_.map(COMPONENT_OPTIONS, item => (
                                      <option
                                        value={item.value}
                                        key={item.index}
                                      >
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                  {child.type === "Select" && (
                                    <select
                                      className="rounded border border-secondary"
                                      style={{ paddingBlock: 2, width: 80 }}
                                      defaultValue={child?.sysCfgName}
                                      onChange={e =>
                                        handleSelectSysCfg(
                                          block.id,
                                          field.id,
                                          child.id,
                                          e.target.value
                                        )
                                      }
                                    >
                                      {_.map(sysCfg, (item, index) => (
                                        <option key={index} value={item.Code}>
                                          {item.Name}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                  {child.type === "Address" && (
                                    <select
                                      className="rounded border border-secondary"
                                      style={{ paddingBlock: 2, width: 80 }}
                                      defaultValue={child?.addressType}
                                      onChange={e =>
                                        handleSelectAddressType(
                                          block.id,
                                          field.id,
                                          child.id,
                                          e.target.value
                                        )
                                      }
                                    >
                                      {_.map(
                                        ADDRESS_TYPE_OPTIONS,
                                        (item, index) => (
                                          <option
                                            key={index}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  )}
                                  {child.type === "Textarea" && (
                                    <input
                                      className="form-control"
                                      type="number"
                                      defaultValue={child?.rows || 6}
                                      min={6}
                                      max={20}
                                      style={{ width: 60, height: 30 }}
                                      onChange={e =>
                                        handleChangeTextareaRows(
                                          block.id,
                                          field.id,
                                          child.id,
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  )}
                                  {child.type === "SysCfg" && (
                                    <select
                                      className="rounded border border-secondary"
                                      style={{ paddingBlock: 2, width: 80 }}
                                      value={child?.category}
                                      onChange={e =>
                                        handleSelectSysCfgCategory(
                                          block.id,
                                          field.id,
                                          child.id,
                                          e.target.value
                                        )
                                      }
                                    >
                                      {_.map(sysCfgCategory, (item, index) => (
                                        <option key={index} value={item}>
                                          {item}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </>
                              )}
                          </>
                        </div>
                        {["String", "Number"].includes(child.type) && (
                          <div
                            className="d-flex align-items-center mt-2"
                            style={{ gap: 12 }}
                          >
                            <label className="mb-0">Validation:</label>
                            <select
                              className="rounded border border-secondary"
                              style={{ paddingBlock: 2, width: 150 }}
                              onChange={e =>
                                handleAddSchemaValidationField(
                                  block.id,
                                  field.id,
                                  child.id,
                                  String(child.type).toLowerCase(),
                                  e
                                )
                              }
                            >
                              <option value="">Select valid schema</option>
                              {_.map(
                                DATA_SCHEMA_VALIDATION[
                                  String(child.type).toLowerCase()
                                ],
                                (item, index) => (
                                  <option key={index} value={item.code}>
                                    {item.text}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        )}
                        <div
                          className="d-flex justify-content-center align-items-center mt-2"
                          style={{ gap: 12 }}
                        >
                          <div className="form-check form-check-success">
                            <label
                              htmlFor={`${block.id}|${field.id}|${child.id}|fullWidth`}
                            >
                              Full
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={child?.fullWidth}
                              id={`${block.id}|${field.id}|${child.id}|fullWidth`}
                              onChange={handleChooseChildOption}
                            />
                          </div>
                          <div className="form-check form-check-success">
                            <label
                              htmlFor={`${block.id}|${field.id}|${child.id}|required`}
                            >
                              Required
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={child.required}
                              id={`${block.id}|${field.id}|${child.id}|required`}
                              onChange={handleChooseChildOption}
                            />
                          </div>
                          <div className="form-check form-check-success">
                            <label
                              htmlFor={`${block.id}|${field.id}|${child.id}|readOnly`}
                            >
                              Read Only
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={child.readOnly}
                              id={`${block.id}|${field.id}|${child.id}|readOnly`}
                              onChange={handleChooseChildOption}
                            />
                          </div>
                          <div className="form-check form-check-success">
                            <label
                              htmlFor={`${block.id}|${field.id}|${child.id}|disabled`}
                            >
                              Disabled
                            </label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={child.disabled}
                              id={`${block.id}|${field.id}|${child.id}|disabled`}
                              onChange={handleChooseChildOption}
                            />
                          </div>
                        </div>
                        {child.schemaList && child.schemaList.length > 0 && (
                          <div
                            className="d-flex align-items-center mt-2"
                            style={{ gap: 12 }}
                          >
                            {child.schemaList.map((s, index) => (
                              <div
                                key={index}
                                className="form-check form-check-success"
                              >
                                <label
                                  htmlFor={`${block.id}|${field.id}|${child.id}|${s.code}`}
                                >
                                  {s.text}
                                </label>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={true}
                                  id={`${block.id}|${field.id}|${child.id}|${s.code}`}
                                  onChange={
                                    handleCheckClearSchemaValidationField
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    ));
  };
  const previewForm = () => {
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
            <div style={{ minHeight: 89 }}>
              <VVSSelectModel
                {...child}
                {...formRestProps}
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
              {...formRestProps}
              errors={errors}
              model={targetClass}
            />
          );
        }
        case "PostCategory": {
          return (
            <SelectField
              {...child}
              {...formRestProps}
              errors={errors}
              options={postCategory}
            />
          );
        }
        case "TextEditor": {
          return (
            <Notes label={label} onChangeTextEditor={() => {}} content={""} />
          );
        }
        case "Textarea": {
          return (
            <TextareaField
              {...child}
              {...formRestProps}
              errors={errors}
              rows={rows}
            />
          );
        }
        case "Boolean": {
          return (
            <div
              style={{ height: 89, gap: 6 }}
              className="d-flex flex-column justify-content-center"
            >
              <CommonText className="m-0">{label}</CommonText>
              <div className="form-check form-check-success">
                <input
                  type="checkbox"
                  className="form-check-input mr-3"
                  id={`${child.id}|checkbox`}
                  disabled={readOnly || disabled}
                  {...formRestProps.register(name)}
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
            <div style={{ minHeight: 89 }}>
              <VVSAddress2
                {...child}
                {...formRestProps}
                errors={errors}
                address={address}
                setAddress={setAddress}
              />
            </div>
          );
        }
        case "File": {
          return (
            <>
              <CommonLabel>{label}</CommonLabel>
              <UploadImage
                onUploaded={() => {}}
                imgSrc=""
                disabled={disabled}
                readOnly={readOnly}
              />
            </>
          );
        }
        case "Pointer": {
          return (
            <div style={{ minHeight: 89 }}>
              <VVSSelectModel
                model={targetClass}
                {...child}
                {...formRestProps}
                errors={errors}
                name={`${name}.text`}
              />
            </div>
          );
        }
        case "Select": {
          return <SelectConst {...child} {...formRestProps} errors={errors} />;
        }
        default: {
          return (
            <div style={{ minHeight: 89 }}>
              <InputField {...child} {...formRestProps} errors={errors} />
            </div>
          );
        }
      }
    };
    const formLayout = form.map(block => {
      return (
        <Card body key={block.id}>
          {block.title && (
            <CommonText level={1} className="m-0">
              {block.title}
            </CommonText>
          )}
          <Row>
            {block.fields.map(field => {
              return (
                <Col key={field.id} xs={field.cols} className="border">
                  <Row>
                    {field.children.map(child => {
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
                            <p
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: 69, margin: 0 }}
                            >
                              Blank Field
                            </p>
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
    setFormLayout(formLayout);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex" style={{ gap: 12 }}>
            <input
              className="form-control"
              style={{ width: 200 }}
              type="text"
              placeholder="Title"
              ref={titleRef}
            />
            <CommonButton level={0} onClick={handleAddBlock}>
              Add Block
            </CommonButton>
          </div>
          <div className="d-flex" style={{ gap: 12 }}>
            <CommonButton level={0} onClick={previewForm}>
              Preview
            </CommonButton>
            <CommonButton level={0} onClick={handleSaveForm}>
              Save Form
            </CommonButton>
          </div>
        </div>
        {renderForm()}
        {formLayout}
      </Container>
    </div>
  );
};

export default VVSFormDesign2;
