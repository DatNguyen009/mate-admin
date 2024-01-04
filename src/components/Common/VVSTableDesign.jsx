import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, ModalBody, ModalFooter, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import ImageNoData from "../../assets/images/list-empty-state.svg";
import { CommonButton } from "./ButtonCommon";
import ModalCommon from "./ModalCommon";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "./Spacing";
import httpService from "services/httpService";
import { Link, useHistory, useParams } from "react-router-dom";
import { CommonInput, CommonSelect } from "./inputCommon";
import { omit, startCase } from "lodash";
import toastr from "toastr";
import _ from "lodash";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
} from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
// import { SCHEMAS } from "constants/schemas";

export default function VVSTableDesign() {
  const modelName = _.startCase(useParams().modelName).replaceAll(" ", "");
  const modelNameUrlFormat = _.lowerCase(modelName).replaceAll(" ", "-");
  const [schema, setSchema] = useState([]);

  const [tblColsDesign, setTblColsDesign] = useState([]);
  const [modelConfig, setModelConfig] = useState({});
  const [isNewModal, setIsNewModal] = useState(false);
  const [listInclude, setlistInclude] = useState([]);

  // const modelSchema = schema.find(s => s.className === id);
  let modelSchema = schema.find(s => s.className === modelName);

  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchFields, setSearchFields] = useState({});
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [enableEditMode, setEnableEditMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [pagingInfo, setPagingInfo] = useState({
    noItemPerPage: 10,
    pageIndex: 0,
    startIndex: 1,
    endIndex: 0,
    total: 0,
    sortField: null,
    pageIndexes: [],
  });

  useEffect(() => {
    httpService.get("/parse/classes/SysCfg").then(response => {
      const tableConfig = response.results.find(
        item => item.Code === `${modelName}Config`
      );

      if (!tableConfig) {
        setIsNewModal(true);
        return;
      }

      setTblColsDesign(
        [...tableConfig.Values[0].columns].map(c => ({
          ...c,
          formatter: cell =>
            cell?.objectId ? (
              <span>{cell?.name || cell?.series || ""}</span>
            ) : (
              <span>{cell}</span>
            ),
        }))
      );
      setModelConfig(tableConfig);
    });
  }, []);

  useEffect(() => {
    const getSchema = async () => {
      const response = await httpService.get("parse/schemas");
      const schemas = response.results;
      if (!schemas) return;
      let emptyArr = [];
      schemas.map(schema => {
        emptyArr.push(omit(schema, ["indexes", "classLevelPermissions"]));
      });
      setSchema(emptyArr);
      // const [listInclude, setlistInclude] = useState([]);

      if (modelSchema) {
        let arrayIncludes = [];
        Object.entries(modelSchema?.fields).forEach(([key, value]) => {
          console.log("key, value :>> ", key, value);

          if (value.type === "Pointer") {
            arrayIncludes.push(key);
          }
        });
        setlistInclude(arrayIncludes);
      }
    };
    getSchema();
  }, [JSON.stringify(schema), JSON.stringify(listInclude)]);

  const handleSaveTableCols = () => {
    const newModelConfig = {
      Code: `${modelName}Config`,
      Name: `${_.startCase(modelName)} Config`,
      Values: [
        {
          routingField: "objectId",
          columns: tblColsDesign,
        },
      ],
    };
    console.log(isNewModal, "modal");
    console.log("first", newModelConfig);
    // if (isNewModal) {
    //   httpService.post("/parse/classes/SysCfg", newModelConfig).then(() => {
    //     toastrCRUDSuccess(`New ${_.startCase(modelName)} Config`, TEXT_POST);
    //   });
    // } else {
    //   httpService
    //     .put(`/parse/classes/SysCfg/${modelConfig.objectId}`, newModelConfig)
    //     .then(() => {
    //       toastrCRUDSuccess(`New ${_.startCase(modelName)} Config`, TEXT_PUT);
    //     });
    // }
  };

  const handleSelectAll = e => {
    const { id, checked } = e.target;
    if (checked)
      tblData.forEach((row, index) => {
        selectedRows.add(row.objectId);
      });
    else setSelectedRows(new Set());

    setIsCheckAll(checked);
  };

  const handlePageClick = pageIndex => {
    pagingInfo.pageIndex = pageIndex - 1;
    pagingInfo.startIndex = pagingInfo.pageIndex * pagingInfo.noItemPerPage + 1;
    refresh();
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    if (checked) selectedRows.add(id);
    else selectedRows.delete(id);
    setSelectedRows(new Set(selectedRows));
  };

  const handleRowClick = row => {
    history.push(
      `/${modelNameUrlFormat}/${row[modelConfig.Values[0].routingField]}`,
      { row }
    );
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [tblData, setTblData] = React.useState([]);

  const refresh = () => {
    setSelectedRows(new Set());
    setIsCheckAll(false);

    let whereStatements = {};

    tblColsDesign
      .filter(
        col => col.search && col.search.options && searchFields[col.field]
      )
      .forEach(col => {
        whereStatements[col.field] = searchFields[col.field];
      });

    tblColsDesign
      .filter(col => col.search === "text" && searchFields[col.field])
      .forEach(col => {
        whereStatements[col.field] = {
          $text: { $search: { $term: searchFields[col.field] } },
        };
      });

    tblColsDesign
      .filter(col => col.search === "string" && searchFields[col.field])
      .forEach(col => {
        whereStatements[col.field] = { $regex: `^${searchFields[col.field]}` };
      });

    whereStatements = Object.keys(whereStatements).length
      ? `where=${JSON.stringify(whereStatements)}`
      : "";

    const includeString =
      listInclude?.map(field => `include=${field}`).join("&") || "";
    const url =
      `/parse/classes/${modelName}?${whereStatements}&${includeString}&limit=${
        pagingInfo.noItemPerPage
      }&skip=${pagingInfo.startIndex - 1}&count=1` +
      (pagingInfo.sortField ? `&order=${pagingInfo.sortField}` : "");
    httpService.get(url).then(json => {
      setTblData(json["results"]);
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
  }, [JSON.stringify(listInclude)]);

  React.useEffect(() => {
    if (tblData.length !== 0) {
      setIsLoading(false);
    }
  }, [tblData, pagingInfo]);

  const toggleModal = () => {
    setOpenModal(prev => !prev);
  };

  const handleDeleteClicked = () => {
    var requests = [];
    for (const id of selectedRows) {
      requests.push({
        method: "DELETE",
        path: `/parse/classes/${modelName}/${id}`,
      });
    }
    httpService.post("/parse/batch", { requests }).then(json => {
      toggleModal();
      refresh();
    });
  };

  const handleUpdateItemPerPage = value => {
    pagingInfo.noItemPerPage = parseInt(value, 10);
    handlePageClick(1);
  };

  const handleSortColumn = fieldName => {
    pagingInfo.sortField =
      (pagingInfo.sortField && pagingInfo.sortField === fieldName ? "-" : "") +
      fieldName;
    refresh();
  };

  const handleInputSearch = e => {
    searchFields[e.target.id.replace("search-field-", "")] = e.target.value;
    refresh();
  };

  const handleSaveEdits = e => {
    const requests = tblData
      .filter(row => row.isDirty)
      .map(row => {
        var copiedObj = {};
        tblColsDesign.forEach(col => (copiedObj[col.field] = row[col.field]));
        return {
          method: "PUT",
          path: `/parse/classes/${modelName}/${row.objectId}`,
          body: copiedObj,
        };
      });
    httpService.post("/parse/batch", { requests }).then(json => {
      if (json.length > 0) {
        toastr.success("Objects have been saved successfully");
        refresh();
      }
    });
  };

  const handleFieldChange = (row, fieldName, value) => {
    row.isDirty = true;
    row[fieldName] = value;
  };

  const handleClickAddCol = field => {
    const checkExists = tblColsDesign.findIndex(t => t.field === field);
    if (checkExists === -1) {
      setTblColsDesign([
        ...tblColsDesign,
        {
          field,
          text: _.startCase(field),
          sort: true,
          formatter: cell =>
            cell?.objectId ? (
              <span>{cell?.name || cell?.series || ""}</span>
            ) : (
              <span>{cell}</span>
            ),
        },
      ]);
    }
  };

  return (
    <React.Fragment>
      <div className="mb-5 d-flex justify-content-around">
        <div style={{ flex: 1 }}>
          <h3>Model Fields</h3>
          <div className="d-flex flex-column" style={{ gap: 18 }}>
            {Object.entries(modelSchema?.fields || {}).map((item, index) => {
              if (item[1].type === "Pointer") {
                let pointer = schema.find(
                  i => i.className === item[1].targetClass
                );
                console.log(pointer);
                return (
                  <div key={index} className="d-flex" style={{ gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{item[0]}</span>
                    <select
                      id="lang"
                      // onChange={this.change}
                      // value={this.state.value}
                    >
                      {/* {pointer.map((e, index) => index)} */}
                    </select>

                    <CommonButton
                      level={0}
                      style={{ width: "fit-content" }}
                      onClick={() => handleClickAddCol(item[0])}
                    >
                      Add
                    </CommonButton>
                  </div>
                );
              }
              return (
                <div key={index} className="d-flex" style={{ gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{item[0]}</span>
                  <CommonButton
                    level={0}
                    style={{ width: "fit-content" }}
                    onClick={() => handleClickAddCol(item[0])}
                  >
                    Add
                  </CommonButton>
                </div>
              );
            })}
            {/* {Object.getOwnPropertyNames(modelSchema?.fields || {})
              .filter(f => !_.some(tblColsDesign, ["field", f]))
              .map((field, index) => {
                return (
                  <div key={index} className="d-flex" style={{ gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{field}</span>
                    <CommonButton
                      level={0}
                      style={{ width: "fit-content" }}
                      onClick={() => handleClickAddCol(field)}
                    >
                      Add
                    </CommonButton>
                  </div>
                );
              })} */}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Table Columns</h3>
          <div className="d-flex flex-column" style={{ gap: 18 }}>
            {tblColsDesign.map((t, index) => {
              return (
                <div key={index} className="d-flex" style={{ gap: 10 }}>
                  <span style={{ fontSize: 18 }}>
                    {index + 1} {". "} {t.field.split(".")[0]}
                  </span>
                  <CommonButton
                    level={2}
                    style={{ width: "fit-content" }}
                    onClick={() => {
                      setTblColsDesign(
                        [...tblColsDesign].filter(
                          item => item.field !== t.field
                        )
                      );
                    }}
                  >
                    Delete
                  </CommonButton>
                </div>
              );
            })}
          </div>
          <CommonButton type="button" level={0} onClick={handleSaveTableCols}>
            Save
          </CommonButton>
        </div>
      </div>
      <Row>
        <div className="subHeaderQueryReports d-flex justify-content-between align-items-center text-capitalize">
          <h4 className="mb-0 font-size-18 text-capitalize">
            {startCase(modelName)}
          </h4>
        </div>
      </Row>

      <Spacer size={10} />

      <Row>
        <Col md="12">
          <Card body>
            <table className="table  align-middle table-nowrap table-hover">
              <thead className="table-light">
                <tr>
                  <th
                    className="selection-cell-header"
                    data-row-selection="true"
                    width="30"
                  >
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      defaultChecked={isCheckAll}
                      onClick={handleSelectAll}
                    ></input>
                  </th>
                  <th width="50">STT</th>
                  {tblColsDesign.map((col, index) => (
                    <th key={index} tabIndex="0">
                      {col.text}
                      <span
                        className="order"
                        onClick={() => handleSortColumn(col.field)}
                      >
                        {(pagingInfo.sortField === col.field && (
                          <i className="fas fa-sort-alpha-down"></i>
                        )) ||
                          (pagingInfo.sortField === `-${col.field}` && (
                            <i className="fas fa-sort-alpha-up-alt"></i>
                          )) || (
                            <i className="light fas fa-sort-alpha-up-alt"></i>
                          )}
                      </span>

                      {enableSearch &&
                        (col.search === "text" || col.search === "string") && (
                          <CommonInput
                            id={`search-field-${col.field}`}
                            onChange={e => handleInputSearch(e)}
                          ></CommonInput>
                        )}

                      {enableSearch &&
                        col.search &&
                        col.search.options &&
                        col.search.options.values && (
                          <CommonSelect
                            id={`search-field-${col.field}`}
                            onChange={e => handleInputSearch(e)}
                          >
                            <option value="">All</option>
                            {col.search.options.values.map((value, index) => (
                              <option value={value} key={index}>
                                {value}
                              </option>
                            ))}
                          </CommonSelect>
                        )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tblData.map((row, index) => (
                  <tr key={index} onDoubleClick={() => handleRowClick(row)}>
                    <td className="selection-cell">
                      <input
                        type="checkbox"
                        id={row.objectId}
                        onClick={handleClick}
                        defaultChecked={selectedRows.has(row.objectId)}
                      ></input>
                    </td>
                    <td>{pagingInfo.startIndex + index}</td>
                    {tblColsDesign.map(col => (
                      <td key={col.field}>
                        {(enableEditMode && col.search === "string" && (
                          <CommonInput
                            type="text"
                            defaultValue={_.get(row, col.field)}
                            onChange={e =>
                              handleFieldChange(row, col.field, e.target.value)
                            }
                          />
                        )) ||
                          (enableEditMode && col.search === "boolean" && (
                            <CommonSelect
                              id={`search-field-${col.field}`}
                              value={_.get(row, col.field)}
                              onChange={e =>
                                handleFieldChange(
                                  row,
                                  col.field,
                                  e.target.value
                                )
                              }
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </CommonSelect>
                          )) ||
                          (col.formatter &&
                            col.formatter(_.get(row, col.field), row)) || (
                            <span>{_.get(row, col.field)}</span>
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

      <ModalCommon
        modalTitle="Delete"
        isShowModal={openModal}
        onClose={toggleModal}
      >
        <ModalBody>
          <Spacer size={20} />
          <CommonText
            style={{ fontSize: 16, fontWeight: "normal" }}
            level={0}
            mt={0}
          >
            Are you sure to delete this {modelName}?
          </CommonText>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={toggleModal} type="button">
            Cancel
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleDeleteClicked}
            disabled={!selectedRows.size}
            type="button"
          >
            Delete
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </React.Fragment>
  );
}

VVSTableDesign.propTypes = {
  modelName: PropTypes.string,
};
