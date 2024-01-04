import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { CommonButton } from "./ButtonCommon";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "./Spacing";
import httpService from "services/httpService";
import { SCHEMAS } from "../../constants/schema";
import { Link, useHistory, useParams } from "react-router-dom";
import { CommonInput, CommonSelect } from "./inputCommon";
import InputField from "components/form-control/InputField";
import { startCase } from "lodash";
import _ from "lodash";
import { DropdownToggle, Input, InputType, Label } from "reactstrap";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";

export default function VVSTableDesign2(props) {
  const { modelName } = useParams();

  if (!modelName) modelName = useParams().modelName;

  const [tblDesigns, setTblDesigns] = useState({});
  const [schema, setSchema] = useState({});
  const [dictSchema, setDictSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [formDesign, setFormDesign] = useState({
    blocks: [
      {
        name: "default",
        cols: [
          {
            fields: [],
          },
        ],
      },
    ],
  });
  const [pagingInfo, setPagingInfo] = useState({
    noItemPerPage: 10,
    pageIndex: 0,
    startIndex: 1,
    endIndex: 0,
    total: 0,
    sortField: null,
    pageIndexes: [],
  });

  //https://vset.vvs.vn/parse/schemas

  const url = "/parse/schemas";

  const colFormaters = (colType, row, col) => {
    var val = "";
    val = row[col.name];

    if (col.subField) {
      console.log(col.subField.name);
      val = val && val[col.subField.name];
    }
    // console.log(col.subField);
    return <span>{val && val.toString()}??</span>;
  };

  const generateInputField = field => {
    switch (field.type) {
      case "String":
        return (
          <CommonInput
            type="text"
            name={field.name}
            value={formData[field.name]}
          />
        );
      case "Date":
        return (
          <CommonInput
            type="date"
            name={field.name}
            value={formData[field.name]}
          />
        );
      case "hasMany":
        return <div>{field.type}</div>;
      default:
        return (
          <CommonInput
            type="text"
            name={field.name}
            value={FormData[field.name]}
          />
        );
    }
  };

  // Table/Form Design
  const [tblDesign, setTblDesign] = useState({ cols: [{ name: "idx" }] });
  const [tblAllFields, setTblAllFields] = useState([]);

  const handlePageClick = pageIndex => {
    pagingInfo.pageIndex = pageIndex - 1;
    pagingInfo.startIndex = pagingInfo.pageIndex * pagingInfo.noItemPerPage + 1;
    refresh();
  };

  const [tblData, setTblData] = React.useState([]);

  const refresh = () => {
    let whereStatements = {};

    whereStatements = Object.keys(whereStatements).length
      ? `where=${JSON.stringify(whereStatements)}`
      : "";

    const tblDesigns = JSON.parse(localStorage.getItem("tblDesigns") || "{}");
    const formDesigns = JSON.parse(localStorage.getItem("formDesigns") || "{}");

    if (tblDesigns[modelName]) {
      setTblDesign({ ...tblDesigns[modelName] });
    }

    if (formDesigns[modelName]) {
      setFormDesign({ ...formDesigns[modelName] });
    }

    const includeString =
      tblDesigns[modelName]?.cols
        ?.filter(col => col.type === "Pointer")
        .map(col => col.name)
        .map(field => `include=${field}`)
        .join("&") || "";

    const url =
      `/parse/classes/${modelName}?${whereStatements}&${includeString}&limit=${
        pagingInfo.noItemPerPage
      }&skip=${pagingInfo.startIndex - 1}&count=1` +
      (pagingInfo.sortField ? `&order=${pagingInfo.sortField}` : "");

    httpService.get(url).then(json => {
      setTblData(json["results"]);
      console.log(json);
      pagingInfo.startIndex =
        pagingInfo.pageIndex * pagingInfo.noItemPerPage + 1;
      pagingInfo.endIndex = pagingInfo.startIndex + json["results"].length;
      pagingInfo.total = json["count"];
      pagingInfo.pageIndexes = Array.from(
        { length: Math.ceil(json["count"] / pagingInfo.noItemPerPage) },
        (x, i) => i + 1
      );
      const copiedObj = { ...pagingInfo };
      setPagingInfo(copiedObj);
    });
  };

  React.useEffect(() => {
    refresh();
    const table = _.filter(SCHEMAS.tables, v => {
      return v.className === modelName;
    })[0];
    handleModelChange(modelName, table);
  }, []);

  React.useEffect(() => {
    if (tblData.length !== 0) {
      // setIsLoading(false);
    }
  }, [tblData, pagingInfo]);

  const handleUpdateItemPerPage = value => {
    pagingInfo.noItemPerPage = parseInt(value, 10);
    handlePageClick(1);
  };

  const handleSaveConfig = e => {
    tblDesigns[modelName] = tblDesign;
    const tblDesignsAll = JSON.parse(
      localStorage.getItem("tblDesigns") || "{}"
    );
    tblDesignsAll[modelName] = tblDesign;

    const formDesignsAll = JSON.parse(
      localStorage.getItem("formDesigns") || "{}"
    );
    formDesignsAll[modelName] = formDesign;

    localStorage.setItem("tblDesigns", JSON.stringify(tblDesignsAll));
    localStorage.setItem("formDesigns", JSON.stringify(formDesignsAll));
  };

  const handleFieldChange = (row, fieldName, value) => {
    row.isDirty = true;
    row[fieldName] = value;
  };

  SCHEMAS.tables.forEach(tbl => {
    dictSchema[tbl.className] = tbl;
  });

  const handleModelChange = (tblName, table) => {
    setSchema(table);
    const excludeFields = new Set(["ACL"]);

    // other related tables
    // user: { type: "Pointer", targetClass: "_User" },
    const relatedTbls = {};
    SCHEMAS.tables.forEach(tbl => {
      Object.keys(tbl.fields).forEach(fieldName => {
        var field = tbl.fields[fieldName];
        if (field.targetClass === modelName) {
          relatedTbls[tbl.className] = field;
          field.relatedFieldName = fieldName;
        }
      });
    });

    console.log(relatedTbls);

    const fields = Object.keys(table.fields)
      .filter(fieldName => !excludeFields.has(fieldName))
      .map(fieldName => {
        let _b = { ...table.fields[fieldName] };
        _b["name"] = fieldName;
        if (_b["type"] === "Pointer") {
          _b["fields"] = [];
        }
        return _b;
      });

    Object.keys(relatedTbls).forEach(fieldName => {
      var fieldInfo = {
        type: "hasMany",
        name: fieldName,
        relatedField: relatedTbls[fieldName],
        tblCols: [],
      };

      fields.push(fieldInfo);
      table.fields[fieldName] = fieldInfo;
    });

    setTblAllFields(fields);

    fields.forEach(field => tblAllFields.push(field));
  };

  const handTblDesignAddColumnAfter = col => {
    // try to remove column first
    const i = tblDesign.cols.indexOf(col);

    if (i != -1) {
      tblDesign.cols.splice(i + 1, 0, tblAllFields[0]);
      setTblDesign({ ...tblDesign });
      return;
    }
    tblDesign.cols.push(col);
    setTblDesign({ ...tblDesign });
  };

  const handTblDesignRemoveColumn = (col, index) => {
    tblDesign.cols.splice(index, 1);
    setTblDesign({ ...tblDesign });
  };

  return (
    <React.Fragment>
      <Spacer size={80} />

      <Card body>
        <h4>{modelName}</h4>
        {formDesign.blocks.map((block, index) => (
          <Row key={index}>
            <div className="col-md-12">
              <CommonInput
                className="col-md-4"
                type="text"
                defaultValue={block.name}
                onChange={e => {
                  block.name = e.target.value;
                }}
              />
            </div>

            {block.cols.map((col, index) => (
              <Col key={index}>
                {col.fields &&
                  col.fields.map((field, index) => (
                    <div key={index}>
                      <CommonSelect
                        defaultValue={field.name}
                        onChange={e => {
                          field.name = e.target.value;
                          _.extend(field, schema.fields[e.target.value]);
                          console.log(field, schema.fields[e.target.value]);
                          setFormDesign({ ...formDesign });
                        }}
                      >
                        {tblAllFields &&
                          tblAllFields.map((field, fieldIndex) => (
                            <option key={fieldIndex} value={field.name}>
                              {field.name}
                            </option>
                          ))}
                      </CommonSelect>

                      <span
                        onClick={e => {
                          console.log("add");
                          if (!field.subFields) field.subFields = [];
                          field.subFields.push({ name: "test", value: "test" });
                          setFormDesign({ ...formDesign });
                        }}
                      >
                        Add
                      </span>

                      {field.type == "Pointer" &&
                        field.name &&
                        dictSchema[field.targetClass] &&
                        field.subFields &&
                        field.subFields.map((subField, sui) => (
                          <CommonSelect key={sui} onChange={e => {}}>
                            {dictSchema[field.targetClass] &&
                              dictSchema[field.targetClass].fields &&
                              Object.keys(
                                dictSchema[field.targetClass].fields
                              ).map((subFieldOption, si) => (
                                <option key={si} value={field.name}>
                                  {subFieldOption}
                                </option>
                              ))}
                          </CommonSelect>
                        ))}
                    </div>
                  ))}

                <CommonButton
                  level={0}
                  onClick={e => {
                    col.fields.push({ name: "" });
                    setFormDesign({ ...formDesign });
                  }}
                >
                  <i className="fas fas fa-plus-circle"></i>
                </CommonButton>
              </Col>
            ))}
            <CommonButton
              level={0}
              onClick={e => {
                block.cols.push({ fields: [] });
                setFormDesign({ ...formDesign });
              }}
            >
              <i className="fas fas fa-plus-circle"></i>
            </CommonButton>

            <CommonButton
              level={1}
              onClick={e => {
                formDesign.blocks.push({
                  name: "default",
                  cols: [
                    {
                      fields: [],
                    },
                  ],
                });
                setFormDesign({ ...formDesign });
              }}
            >
              <i className="fas fas fa-plus-circle"></i>
            </CommonButton>
          </Row>
        ))}
      </Card>

      <Row>
        <div className="subHeaderQueryReports d-flex justify-content-between align-items-center text-capitalize">
          <h4 className="mb-0 font-size-18 text-capitalize">
            {startCase(modelName)}
          </h4>
          <div className="d-flex justify-content-between align-items-center">
            <CommonButton
              level={0}
              onClick={() => {
                handleSaveConfig();
              }}
            >
              Save
            </CommonButton>
          </div>
        </div>
      </Row>
      <Spacer size={10} />
      <Row>
        <Col md="12">
          <Card body>
            <table className="table  align-middle table-nowrap table-hover">
              <thead className="table-light">
                <tr>
                  {tblDesign.cols.map((col, index) => (
                    <th key={index} tabIndex="0" style={{ lineHeight: "35px" }}>
                      {col.name}
                      {col.name !== "idx" && (
                        <CommonSelect
                          defaultValue={col.name}
                          onChange={e => {
                            tblDesign.cols[index] =
                              schema.fields[e.target.value] || {};
                            tblDesign.cols[index].name = e.target.value;
                            setTblDesign({ ...tblDesign });
                            console.log(dictSchema[col.targetClass]?.fields);
                          }}
                        >
                          {tblAllFields.map((field, fieldIndex) => (
                            <option key={fieldIndex} value={field.name}>
                              {field.name}
                            </option>
                          ))}
                        </CommonSelect>
                      )}
                      {col.type} {col.targetClass}
                      {/* {col.type === "Pointer" &&
                        dictSchema[col.targetClass] && Object.keys(dictSchema[col.targetClass]?.fields) } */}
                      {col.type === "Pointer" && dictSchema[col.targetClass] && (
                        <CommonSelect
                          defaultValue={
                            tblDesign.cols[index].subField &&
                            tblDesign.cols[index].subField.name
                          }
                          onChange={e => {
                            var subField =
                              dictSchema[col.targetClass].fields[
                                e.target.value
                              ];
                            subField["name"] = e.target.value;
                            tblDesign.cols[index].subField = subField;
                            console.log(tblDesign.cols[index]);
                          }}
                        >
                          {dictSchema[col.targetClass] &&
                            Object.keys(
                              dictSchema[col.targetClass]?.fields
                            ).map((field, fieldIndex) => (
                              <option key={fieldIndex} value={field}>
                                {field}
                              </option>
                            ))}
                        </CommonSelect>
                      )}
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ float: "right" }}
                      >
                        <CommonButton
                          level={1}
                          onClick={e => handTblDesignAddColumnAfter(col)}
                        >
                          <i className="fas fas fa-plus-circle"></i>
                        </CommonButton>
                        <CommonButton
                          onClick={e => handTblDesignRemoveColumn(col, index)}
                          level={2}
                        >
                          <i className="fas fas fa-times-circle"></i>
                        </CommonButton>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tblData.map((row, index) => (
                  <tr key={index}>
                    {tblDesign.cols.map(col => (
                      <td key={col.name}>
                        {col.name === "idx" ? (
                          <span>
                            {pagingInfo.startIndex + index} {row.objectId}
                          </span>
                        ) : (
                          <span>
                            {/* {row[col.name]} */}
                            {/* {JSON.stringify(col)} */}
                            {colFormaters(col.type, row, col)}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>
      <div className="inner-custom-pagination d-flex col">
        <div className="col-sm-12 col-md-5">
          <div
            className="dataTables_info"
            id="datatable-buttons_info"
            role="status"
            aria-live="polite"
          >
            Showing {pagingInfo.startIndex} to {pagingInfo.endIndex - 1} of{" "}
            {pagingInfo.total} entries - Item per page
            <select
              className="d-custom-pagination-select"
              onChange={e => handleUpdateItemPerPage(e.target.value)}
            >
              {[5, 10, 20, 30, 40].map((number, index) => (
                <option value={number} key={index}>
                  {number}
                </option>
              ))}
            </select>
            <i className="bx bxs-down-arrow"></i>
          </div>
        </div>
        <div className="text-md-right ms-auto">
          <ul className="pagination react-bootstrap-table-page-btns-ul">
            {pagingInfo.pageIndexes.map((page, index) => (
              <li
                className={`page-item ${
                  pagingInfo.pageIndex === page - 1 ? "active" : ""
                }`}
                onClick={() => handlePageClick(page)}
                key={index}
                title="{page}"
              >
                <a href="#" className="page-link">
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

VVSTableDesign2.propTypes = {
  modelName: PropTypes.string,
};
