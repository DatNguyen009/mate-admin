import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import { Button, Card, Col, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { CommonButton } from "./ButtonCommon";
import { CommonText } from "./TextCommon";
import InputField from "components/form-control/InputField";
import { CommonLabel, ComponentCheckbox, LabelCheckbox } from "./inputCommon";
import httpService from "services/httpService";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_PUT } from "helpers/name_helper";
import CardCollapse from "./CardCollapse";
import classNames from "classnames";
import SelectConst from "components/form-control/SelectConst";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import VVSAddress from "./VVSAddress";
import TextareaField from "components/form-control/Textarea";
import VVSAddress2 from "./VVSAddress2";
import UploadImage from "./UploadImage";

const COMPONENT_OPTIONS = [
  { index: 1, name: "String", value: "String" },
  { index: 2, name: "Select", value: "Select" },
  { index: 3, name: "Textarea", value: "Textarea" },
  { index: 4, name: "Table", value: "Table" },
  { index: 5, name: "Date", value: "Date" },
  { index: 6, name: "Address", value: "Address" },
];

const VVSFormDesign = () => {
  const modelName = _.startCase(useParams().modelName).replaceAll(" ", "");
  const [form, setForm] = useState([]);
  const [modelSchema, setModelSchema] = useState({});
  const [isNewModelConfig, setIsNewModelConfig] = useState(false);
  const [formConfig, setFormConfig] = useState({});
  const [latestForm, setLatestForm] = useState([]);
  const [saved, setSaved] = useState(true);
  const [labelEdit, setLabelEdit] = useState({});
  const labelRef = useRef(null);
  const titleInputRef = useRef(null);
  const [SysCfg, setSysCfg] = useState([]);

  const history = useHistory();

  const schema = yup.object({}).required();

  const {
    handleSubmit,
    formState: { errors },
    ...formRestProps
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(async () => {
    getFormConfig();
  }, []);

  useEffect(() => {
    if (JSON.stringify(form) !== latestForm) setSaved(false);
    else setSaved(true);
  }, [JSON.stringify(form), latestForm]);

  const getFormConfig = async () => {
    const modelNameCheck = modelName === "Account" ? "_User" : modelName;
    const schemaSelected = await httpService.get(
      `/parse/schemas/${modelNameCheck}`
    );

    if (!schemaSelected) {
      history.replace("/dashboard");
      toastrErrorAlert("Model not found!");
      return;
    }

    const schemaClone = { ...schemaSelected };
    schemaClone.fields = Object.entries(schemaSelected.fields).map(
      ([key, value]) => ({
        name: key,
        ...value,
      })
    );

    setModelSchema(schemaClone);

    const res = await httpService.get(
      `/parse/classes/SysCfg?limit=200&order=Name`
    );
    setSysCfg(res.results);
    const formConfig = res.results.find(item => item.Code === "FormConfig");
    setFormConfig(formConfig);
    const modelConfig = formConfig.Values.find(
      model => model.name === modelName
    );

    if (!modelConfig) setIsNewModelConfig(true);

    setForm(modelConfig?.form || []);
    setLatestForm(JSON.stringify(modelConfig?.form) || "");
  };

  const handleAddBlock = (type = "default") => {
    const title = titleInputRef.current.value;
    if (type === "collapse" && title === "") return;

    const newBlock = { id: uuidv4(), title, fields: {}, cols: 2, type };
    setForm([...form, newBlock]);
    titleInputRef.current.value = "";
  };

  const handleDeleteBlock = blockId => {
    setForm([...form].filter(block => block.id !== blockId));
  };

  const handleAddField = (fieldItem, blockId, component = "") => {
    const currentBlock = form.find(block => block.id === blockId);

    if (!currentBlock) return;

    const newOrder =
      Math.max(
        0,
        ...Object.values(currentBlock.fields).map(field => field.order)
      ) + 1;

    currentBlock.fields[fieldItem.name] = {
      ...fieldItem,
      order: newOrder,
      label: _.startCase(fieldItem.name),
      type: component ? component : fieldItem.type,
      disabled: false,
      readOnly: false,
    };

    setForm(
      [...form].map(block => (block.id === blockId ? currentBlock : block))
    );
  };

  const handleRemoveField = (fieldName, blockId) => {
    const currentBlock = form.find(block => block.id === blockId); //find target block
    const updateFields = _.omit(currentBlock.fields, [fieldName]); //filter field
    Object.keys(updateFields).map(
      (fieldName, index) => (updateFields[fieldName].order = index + 1)
    ); //reset order
    currentBlock.fields = updateFields; //re-assign updated field
    setForm(
      [...form].map(block => (block.id === blockId ? currentBlock : block))
    ); //update form state
  };

  const handleChangeColumn = (columns, blockId) => {
    setForm(prev =>
      prev.map(block =>
        block.id === blockId ? { ...block, cols: Number(columns) } : block
      )
    );
  };

  const renderFields = (field, blockId) => {
    const { type, name, required, targetClass, label } = field;

    switch (type) {
      case "Pointer": {
        return (
          <div className="my-3">
            {renderCustomLabel(field, blockId)}
            <VVSSelectModel
              required={required}
              name={`${name}.text`}
              id={`${name}.objectId`}
              model={targetClass}
              {...formRestProps}
            />
            {renderInputFooter(field, blockId)}
          </div>
        );
      }
      case "Boolean": {
        return (
          <div style={{ height: 95 }} className={`d-flex`}>
            <ComponentCheckbox className="form-label m-0" key={name}>
              <input type="checkbox" id={`${_.kebabCase(name)}-checkbox`} />
              <LabelCheckbox
                className="form-label m-0"
                for={`${_.kebabCase(name)}-checkbox`}
              >
                {label}
              </LabelCheckbox>
            </ComponentCheckbox>
          </div>
        );
      }
      case "Date": {
        return (
          <div className="my-3">
            {renderCustomLabel(field, blockId)}
            <InputField
              required={required}
              name={name}
              type="date"
              {...formRestProps}
              key={name}
            />
            {renderInputFooter(field, blockId)}
          </div>
        );
      }
      case "Select": {
        return (
          <div className="my-3">
            {renderCustomLabel(field, blockId)}
            <SelectConst
              required={required}
              name={field.name}
              key={name}
              sysCfgName={field?.sysCfgName}
              {...formRestProps}
            />
            {renderInputFooter(field, blockId)}
          </div>
        );
      }
      case "Textarea": {
        return (
          <>
            {renderCustomLabel(field, blockId)}
            <TextareaField
              required={required}
              name={field.name}
              key={name}
              rows={7}
              {...formRestProps}
            />
            {renderInputFooter(field, blockId)}
          </>
        );
      }
      case "Address": {
        return (
          <div className="my-3">
            {renderCustomLabel(field, blockId)}
            <InputField
              required={required}
              name={name}
              {...formRestProps}
              key={name}
            />
            {renderInputFooter(field, blockId)}
          </div>
        );
      }
      case "File": {
        return (
          <div className="my-3">
            {renderCustomLabel(field, blockId)}
            <UploadImage onUploaded={() => {}} imgSrc="" />
          </div>
        );
      }
      default: {
        return (
          <div className="my-3">
            {renderCustomLabel(field, blockId)}
            <InputField
              required={required}
              name={name}
              {...formRestProps}
              key={name}
            />
            {renderInputFooter(field, blockId)}
          </div>
        );
      }
    }
  };

  const renderCustomLabel = (field, blockId) => {
    const originalType = modelSchema.fields.find(
      item => item.name === field.name
    )?.type;

    return (
      <div
        className={`d-flex ${
          labelEdit.fieldName ? "flex-wrap" : "flex-nowrap"
        } align-items-center justify-content-between mb-1`}
        style={{ gap: 6 }}
      >
        <div className="d-flex align-items-center" style={{ gap: 6 }}>
          {labelEdit.fieldName === field.name &&
          labelEdit.blockId === blockId ? (
            <>
              <input
                className="form-control"
                style={{ width: 200, height: 30 }}
                type="text"
                defaultValue={field.label}
                ref={labelRef}
              />
              <div className="btn-group btn-group-sm" role="group">
                <Button
                  color="danger"
                  outline
                  type="button"
                  onClick={() => setLabelEdit({})}
                >
                  Cancel
                </Button>
                <Button
                  color="info"
                  outline
                  type="button"
                  onClick={() => handleSaveLabel(field.name, blockId)}
                >
                  Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <CommonLabel
                className={`m-0 ${field.required && "star-red-required"}`}
              >
                {field.label}
              </CommonLabel>
              <i
                className="fas fa-pencil-alt"
                onClick={() => setLabelEdit({ blockId, fieldName: field.name })}
              />
            </>
          )}
        </div>
        <div className="d-flex" style={{ gap: 6 }}>
          {field.type === "Address" && (
            <select
              className="form-select"
              style={{ width: 100 }}
              id={`${blockId}|${field.name}`}
              onChange={handleChangeAddressType}
              value={field?.addressType}
            >
              <option value=""></option>
              <option value="province">Province</option>
              <option value="district">District</option>
              <option value="ward">Ward</option>
            </select>
          )}
          {field.type === "Select" && (
            <select
              className="form-select"
              style={{ width: 100 }}
              onChange={e =>
                handleChooseSelectConstant(field, blockId, e.target.value)
              }
              defaultValue={field?.sysCfgName}
            >
              <option value=""></option>
              {_.map(SysCfg, (item, index) => (
                <option key={index} value={item.Code}>
                  {item.Name}
                </option>
              ))}
            </select>
          )}
          <select
            className="form-select"
            style={{ width: 100 }}
            onChange={e =>
              handleChangeCustomComponent(blockId, field.name, e.target.value)
            }
            defaultValue={field.type}
          >
            <option value={originalType}>{originalType}</option>
            {_.map(COMPONENT_OPTIONS, item => (
              <option value={item.value} key={item.index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const handleChangeAddressType = e => {
    const blockId = e.target.id.split("|")[0];
    const fieldName = e.target.id.split("|")[1];
    const value = e.target.value;
    const targetBlock = form.find(block => block.id === blockId);
    targetBlock.fields[fieldName].addressType = value;

    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };

  const renderInputFooter = (field, blockId) => {
    return (
      <div className="d-flex align-items-center" style={{ gap: 12 }}>
        <div className="form-check form-check-success m-0">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={field.disabled}
            onChange={e => handleChecked(e)}
            id={`${blockId}|${field.name}|disabled`}
          />
          <label
            className="m-0"
            style={{ fontSize: 12 }}
            htmlFor={`${blockId}|${field.name}|disabled`}
          >
            Disabled
          </label>
        </div>
        <div className="form-check form-check-success m-0">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={field.readOnly}
            onChange={e => handleChecked(e)}
            id={`${blockId}|${field.name}|readOnly`}
          />
          <label
            className="m-0"
            style={{ fontSize: 12 }}
            htmlFor={`${blockId}|${field.name}|readOnly`}
          >
            Read Only
          </label>
        </div>
        <div className="form-check form-check-success m-0">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked={field.required}
            onChange={e => handleChecked(e)}
            id={`${blockId}|${field.name}|required`}
          />
          <label
            className="m-0"
            style={{ fontSize: 12 }}
            htmlFor={`${blockId}|${field.name}|required`}
          >
            Required
          </label>
        </div>
      </div>
    );
  };

  const handleSaveLabel = (fieldName, blockId) => {
    const newLabel = labelRef.current.value;

    if (!newLabel) return;

    const cBlock = form.find(block => block.id === blockId);

    if (!cBlock) return;

    cBlock.fields[fieldName].label = newLabel;
    setForm([...form].map(block => (block.id === blockId ? cBlock : block)));
    setLabelEdit({});
  };

  const handleChangeCustomComponent = (blockId, fieldName, component) => {
    const targetBlock = form.find(block => block.id === blockId);
    targetBlock.fields[fieldName].type = component;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };

  const handleChecked = e => {
    const blockId = e.target.id.split("|")[0];
    const fieldName = e.target.id.split("|")[1];
    const type = e.target.id.split("|")[2];
    const checked = e.target.checked;

    const currentBlock = form.find(block => block.id === blockId);
    currentBlock.fields[fieldName][type] = checked;

    setForm(
      [...form].map(block => (block.id === blockId ? currentBlock : block))
    );
  };

  const handleChooseSelectConstant = (field, blockId, value) => {
    const targetBlock = form.find(block => block.id === blockId);
    targetBlock.fields[field.name].sysCfgName = value;
    setForm(
      [...form].map(block => (block.id === blockId ? targetBlock : block))
    );
  };

  const handleSaveForm = async () => {
    const { createdAt, updatedAt, ...formConfigClone } = formConfig;
    const modelNameCheck = modelName === "_User" ? "Account" : modelName;
    const updateValues = !isNewModelConfig
      ? [...formConfig.Values].map(model =>
          model.name === modelNameCheck ? { name: modelNameCheck, form } : model
        )
      : [...formConfig.Values, { name: modelNameCheck, form }];
    formConfigClone.Values = updateValues;

    httpService
      .put(`/parse/classes/SysCfg/${formConfig.objectId}`, formConfigClone)
      .then(() => {
        toastrCRUDSuccess("Form", TEXT_PUT);
      });

    setLatestForm(JSON.stringify(form));
  };

  const onSubmit = async values => {
    const { createdAt, updatedAt, ...filteredValues } = values;
    console.log("filteredValues :>> ", filteredValues);
  };

  const onDragEnd = result => {
    const { destination, source } = result;

    if (!destination?.droppableId) return;

    const blockId = destination?.droppableId.split("|")[0];
    const currentBlock = form.find(block => block.id === blockId);
    const destinationCol = Number(destination.droppableId.split("|")[1]);
    const sourceCol = Number(source.droppableId.split("|")[1]);

    if (!currentBlock) return;

    const columns = _.range(currentBlock.cols).map((_, index) => {
      const colIndex = index + 1;
      const targetColumn = colIndex === currentBlock.cols ? 0 : colIndex;
      return {
        colIndex,
        fields: Object.values(currentBlock.fields).filter(
          field =>
            field.order === colIndex ||
            field.order % currentBlock.cols === targetColumn
        ),
      };
    });

    if (destinationCol === sourceCol) {
      const destinationFields = columns[destinationCol - 1].fields;
      const destinationIndex = destination.index;
      const sourceObj = destinationFields.find(
        (_, index) => index === source.index
      );
      const updateDestination = destinationFields.filter(
        (_, index) => index !== source.index
      );
      updateDestination.splice(destinationIndex, 0, sourceObj);
      const finalDestination = updateDestination.map((field, index) => ({
        ...field,
        order: destinationCol + currentBlock.cols * index,
      }));
      columns[destinationCol - 1].fields = finalDestination;
      const updateFields = {};
      _.map(_.flatten(columns.map(col => col.fields)), field => {
        updateFields[field.name] = field;
      });

      currentBlock.fields = updateFields;
      setForm(
        [...form].map(block => (block.id === blockId ? currentBlock : block))
      );

      return;
    }

    const destinationFields = columns[destinationCol - 1].fields;
    const sourceFields = columns[sourceCol - 1].fields;
    const destinationIndex = destination.index;
    const sourceObj = sourceFields.find((_, index) => index === source.index);
    destinationFields.splice(destinationIndex, 0, sourceObj);
    const updateDestinationFields = destinationFields.map((field, index) => ({
      ...field,
      order: destinationCol + currentBlock.cols * index,
    }));
    const updateSourceFields = sourceFields
      .filter((_, index) => index !== source.index)
      .map((field, index) => ({
        ...field,
        order: sourceCol + currentBlock.cols * index,
      }));

    columns[destinationCol - 1].fields = updateDestinationFields;
    columns[sourceCol - 1].fields = updateSourceFields;
    const updateFields = {};

    _.map(_.flatten(columns.map(col => col.fields)), field => {
      updateFields[field.name] = field;
    });

    currentBlock.fields = updateFields;
    setForm(
      [...form].map(block => (block.id === blockId ? currentBlock : block))
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex align-items-center" style={{ gap: 12 }}>
        <h2>{_.startCase(modelName)} Form Design</h2>
        <span
          style={{ padding: 6 }}
          className={classNames(
            "cardShortcut__status",
            !saved
              ? "badge badge-soft-warning cardShortcut__status--warning"
              : "badge badge-soft-success cardShortcut__status--success"
          )}
        >
          {saved ? "Saved " : "Not Saved"}
        </span>
      </div>
      <div className="my-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center" style={{ gap: 12 }}>
          <input
            className="form-control"
            style={{ width: 200 }}
            type="text"
            placeholder="Title"
            ref={titleInputRef}
          />
          <CommonButton
            level={0}
            type="button"
            onClick={() => handleAddBlock("default")}
          >
            Add Block
          </CommonButton>
          <CommonButton
            level={0}
            type="button"
            onClick={() => handleAddBlock("collapse")}
          >
            Add Collapse Block
          </CommonButton>
        </div>
        <CommonButton level={0} onClick={handleSaveForm}>
          Save Form
        </CommonButton>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {_.map(form, (block, index) =>
          block.type === "default" ? (
            <Card body key={block.id}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <CommonText level={1} className="m-0">
                  {block.title}
                </CommonText>
                <div className="d-flex align-items-center" style={{ gap: 12 }}>
                  <CommonText level={0} className="m-0">
                    Column quantity:
                  </CommonText>
                  <input
                    className="form-control"
                    type="number"
                    defaultValue={block.cols}
                    style={{ width: 60 }}
                    min={1}
                    max={4}
                    onChange={e => handleChangeColumn(e.target.value, block.id)}
                  />
                  <CommonButton
                    level={2}
                    type="button"
                    style={{ width: "fit-content" }}
                    onClick={() => handleDeleteBlock(block.id)}
                  >
                    <i className="fas fa-trash" />
                  </CommonButton>
                </div>
              </div>
              <div>
                <Row>
                  {_.map(_.range(block.cols), (_, index) => {
                    const colIndex = index + 1;
                    const targetColumn = colIndex === block.cols ? 0 : colIndex;
                    return (
                      <Col xs={12 / block.cols} key={uuidv4()}>
                        <Droppable
                          key={colIndex}
                          droppableId={block.id + "|" + colIndex}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={
                                snapshot.isDraggingOver
                                  ? { backgroundColor: "#f8f8fb" }
                                  : {}
                              }
                            >
                              {Object.entries(block.fields)
                                .filter(
                                  ([fieldName, value]) =>
                                    value.order === colIndex ||
                                    value.order % block.cols === targetColumn
                                )
                                .map(([fieldName, value], index) => (
                                  <Draggable
                                    key={fieldName}
                                    draggableId={fieldName}
                                    index={index}
                                  >
                                    {provided => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        {renderFields(
                                          block.fields[fieldName],
                                          block.id
                                        )}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </Col>
                    );
                  })}
                </Row>
              </div>
              <div className="tag-grid-list">
                {Object.entries(block.fields).map(([fieldName, value]) => (
                  <span
                    className="cardShortcut__statusbadge badge-soft-success cardShortcut__status--success tag-grid-item"
                    key={fieldName}
                    onClick={() => handleRemoveField(fieldName, block.id)}
                  >
                    {fieldName}
                  </span>
                ))}
                {_.orderBy(modelSchema.fields, "name", "asc")
                  .filter(
                    fieldItem =>
                      !_.includes(Object.keys(block.fields), fieldItem.name)
                  )
                  .map(fieldItem => (
                    <span
                      className="cardShortcut__statusbadge badge-soft-dark cardShortcut__status--dark tag-grid-item"
                      key={fieldItem.name}
                      onClick={() => handleAddField(fieldItem, block.id)}
                    >
                      {fieldItem.name}
                    </span>
                  ))}
              </div>
            </Card>
          ) : (
            <CardCollapse
              key={block.id}
              title={block.title}
              defaultFlag={true}
              element={
                <>
                  <div
                    className="d-flex align-items-center justify-content-end"
                    style={{ gap: 12 }}
                  >
                    <CommonText level={0} className="m-0">
                      Column quantity:
                    </CommonText>
                    <input
                      className="form-control"
                      type="number"
                      defaultValue={block.cols}
                      style={{ width: 60 }}
                      min={1}
                      max={4}
                      onChange={e =>
                        handleChangeColumn(e.target.value, block.id)
                      }
                    />
                    <CommonButton
                      level={2}
                      type="button"
                      style={{ width: "fit-content" }}
                      onClick={() => handleDeleteBlock(block.id)}
                    >
                      <i className="fas fa-trash" />
                    </CommonButton>
                  </div>
                  <Row>
                    {_.map(_.range(block.cols), (_, index) => {
                      const colIndex = index + 1;
                      const targetColumn =
                        colIndex === block.cols ? 0 : colIndex;
                      return (
                        <Col xs={12 / block.cols} key={uuidv4()}>
                          <Droppable
                            key={colIndex}
                            droppableId={block.id + "|" + colIndex}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={
                                  snapshot.isDraggingOver
                                    ? { backgroundColor: "#f8f8fb" }
                                    : {}
                                }
                              >
                                {Object.entries(block.fields)
                                  .filter(
                                    ([fieldName, value]) =>
                                      value.order === colIndex ||
                                      value.order % block.cols === targetColumn
                                  )
                                  .map(([fieldName, value], index) => (
                                    <Draggable
                                      key={fieldName}
                                      draggableId={fieldName}
                                      index={index}
                                    >
                                      {provided => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          {renderFields(
                                            block.fields[fieldName],
                                            block.id
                                          )}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </Col>
                      );
                    })}
                  </Row>
                  <div className="tag-grid-list">
                    {Object.entries(block.fields).map(([fieldName, value]) => (
                      <span
                        className="cardShortcut__statusbadge badge-soft-success cardShortcut__status--success tag-grid-item"
                        key={fieldName}
                        onClick={() => handleRemoveField(fieldName, block.id)}
                      >
                        {fieldName}
                      </span>
                    ))}
                    {_.orderBy(modelSchema.fields, "name", "asc")
                      .filter(
                        fieldItem =>
                          !_.includes(Object.keys(block.fields), fieldItem.name)
                      )
                      .map(fieldItem => (
                        <span
                          className="cardShortcut__statusbadge badge-soft-dark cardShortcut__status--dark tag-grid-item"
                          key={fieldItem.name}
                          onClick={() => handleAddField(fieldItem, block.id)}
                        >
                          {fieldItem.name}
                        </span>
                      ))}
                  </div>
                </>
              }
            />
          )
        )}
      </form>
    </DragDropContext>
  );
};

export default VVSFormDesign;
