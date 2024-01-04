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
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import VVSTableLite from "components/Common/VVSTableLite";

export default function VVSTableFormX(props) {
  let { modelName, id } = useParams();
  let where = {};

  if (!modelName) modelName = useParams().modelName;

  // we have some config
  var queryShortcut = {
    "transaction-withdraw-request": {
      model: "Transaction",
      filter: { type: "withdraw", status: "requested" },
    },
    "transaction-deposit-request": {
      model: "Transaction",
      filter: { type: "deposit", status: "requested" },
    },
    "cfg-banks": {
      model: "SysCfg",
      filter: { Category: "bank" },
    },
    "investment-product": {
      model: "Product",
      filter: { isVoucher: false },
    },
    "voucher-product": {
      model: "Product",
      filter: { isVoucher: true },
    },
  };

  if (queryShortcut[modelName]) {
    where = queryShortcut[modelName].filter;
    modelName = queryShortcut[modelName].model;
  }

  const [tblDesigns, setTblDesigns] = useState({});
  const [formDesigns, setFormDesigns] = useState({});
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
    sortField: "-createdAt",
    pageIndexes: [],
  });

  const url = "/parse/schemas";

  const colFormaters = (colType, row, col) => {
    var val = "";
    val = row[col.name];
    if (col.subField) {
      val = val && val[col.subField.name];
    }
    return <span>{val && val.toString()}</span>;
  };

  const history = useHistory();
  const handleRowClick = row => {
    history.push(`/vvsx/${modelName}/${row.objectId}`, { row });
  };

  const generateInputField = (field, objData) => {
    switch (field.type) {
      case "String":
        return (
          <CommonInput
            type="text"
            name={field.name}
            value={objData[field.name]}
          />
        );
      case "Date":
        console.log(objData[field.name]);
        return (
          <CommonInput
            type="text"
            name={field.name}
            value={objData[field.name]}
          />
        );
      case "Pointer":
        console.log("Pointer", field, objData[field.name]);
        const formDesigns = JSON.parse(
          localStorage.getItem("formDesigns") || "{}"
        );
        const formDesignSubModel = formDesigns[field.targetClass];
        var subObjData = objData[field.name];
        return (
          <div>
            {formDesignSubModel.blocks.map((block, index) => (
              <Row key={index}>
                <Col md="12">
                  <Card body>
                    <Row>
                      <div className="col-md-12">
                        <h4>{block.name}</h4>
                      </div>

                      {block.cols.map((col, index) => (
                        <Col className="col-md-4" key={index}>
                          {col.fields.map((field, index) => (
                            <div key={index}>
                              {field.name}
                              {generateInputField(field, subObjData)}
                            </div>
                          ))}
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
            ))}
          </div>
        );
        return (
          <div>
            {objData.toString()} {objData.objectId}
          </div>
        );
      case "hasMany":
        var query = {};
        query[field.relatedField.relatedFieldName] = {
          __type: "Pointer",
          className: field.relatedField.targetClass,
          objectId: objData.objectId,
        };
        return <VVSTableLite modelName={field.name} where={query} />;
      default:
        return (
          <CommonInput
            type="text"
            name={field.name}
            value={objData[field.name]}
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
  const [objData, setObjData] = React.useState({});

  const refresh = () => {
    let whereStatements = where;

    whereStatements = Object.keys(whereStatements).length
      ? `where=${JSON.stringify(whereStatements)}`
      : "";

    var includeString =
      tblDesigns[modelName]?.cols
        ?.filter(col => col.type === "Pointer")
        .map(col => col.name)
        .map(field => `include=${field}`)
        .join("&") || "";

    if (id !== "all") {
      const _formDesigns = JSON.parse(
        localStorage.getItem("formDesigns") || "{}"
      );
      var _formDesign = _formDesigns[modelName];
      var fields = [];

      _formDesign.blocks &&
        _formDesign.blocks.forEach(block => {
          block &&
            block.cols.forEach(col => {
              col.fields.forEach(field => {
                if (field.type === "Pointer") fields.push(field);
              });
            });
        });
      includeString =
        fields
          ?.filter(col => col.type === "Pointer")
          .map(col => col.name)
          .map(field => `include=${field}`)
          .join("&") || "";
    }

    console.log(id, "fields", fields);

    var modelFindUrl = modelName + (id != "all" ? "/" + id : "");
    var url = `/parse/classes/${modelFindUrl}`;

    if (id == "all") {
      url =
        `/parse/classes/${modelName}?${whereStatements}&${includeString}&limit=${
          pagingInfo.noItemPerPage
        }&skip=${pagingInfo.startIndex - 1}&count=1` +
        (pagingInfo.sortField ? `&order=${pagingInfo.sortField}` : "");
    } else {
      url = `/parse/classes/${modelFindUrl}?${includeString}`;
    }

    httpService.get(url).then(json => {
      if (id == "all") {
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
        const tblDesigns = JSON.parse(
          localStorage.getItem("tblDesigns") || "{}"
        );
        if (tblDesigns[modelName]) {
          setTblDesign({ ...tblDesigns[modelName] });
        }
      } else {
        setObjData(json);
        const formDesigns = JSON.parse(
          localStorage.getItem("formDesigns") || "{}"
        );
        if (formDesigns[modelName]) {
          setFormDesign({ ...formDesigns[modelName] });
        }
      }
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
    localStorage.setItem("tblDesigns", JSON.stringify(tblDesignsAll));
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
    const excludeFields = new Set(["ACL", "objectId"]);

    const fields = Object.keys(table.fields)
      .filter(fieldName => !excludeFields.has(fieldName))
      .map(fieldName => {
        let _b = { ...table.fields[fieldName] };
        _b["name"] = fieldName;
        return _b;
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
        <HeaderCreateItem title="modelName">
          <CommonButton level={0}>Save</CommonButton>
        </HeaderCreateItem>
        {formDesign.blocks.map((block, index) => (
          <Row key={index}>
            <div className="col-md-12">
              <h4>{block.name}</h4>
            </div>

            {block.cols.map((col, index) => (
              <Col key={index}>
                {col.fields.map((field, index) => (
                  <div key={index}>
                    {field.name}
                    {generateInputField(field, objData)}
                  </div>
                ))}
              </Col>
            ))}
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
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tblData.map((row, index) => (
                  <tr key={index} onDoubleClick={() => handleRowClick(row)}>
                    {tblDesign.cols.map(col => (
                      <td key={col.name}>
                        {col.name === "idx" ? (
                          <span>{pagingInfo.startIndex + index}</span>
                        ) : (
                          <span>{colFormaters(col.type, row, col)}</span>
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

VVSTableFormX.propTypes = {
  modelName: PropTypes.string,
};
