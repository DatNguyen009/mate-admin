import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, ModalBody, ModalFooter, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import ImageNoData from "../../assets/images/list-empty-state.svg";
import { CommonButton } from "./ButtonCommon";
import ModalCommon from "./ModalCommon";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "./Spacing";
import httpService from "services/httpService";
import { TABLE_CONFIG, TABLE_REPORT_CONFIG } from "../../constants/dataHR";
import { Link, useHistory } from "react-router-dom";
import { CommonInput, CommonSelect } from "./inputCommon";
import { isEmpty, startCase } from "lodash";
import toastr from "toastr";
import _ from "lodash";

export default function VVSTable(props) {
  const { modelName, report, sendDataToParent, tableChart } = props;
  const modelNameUrlFormat = _.lowerCase(modelName).replaceAll(" ", "-");
  const tblCols = report
    ? TABLE_REPORT_CONFIG[modelName].columns
    : TABLE_CONFIG[modelName].columns;

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

  const includeString =
    (report ? TABLE_REPORT_CONFIG[modelName] : TABLE_CONFIG[modelName]).include
      ?.map(field => `include=${field}`)
      .join("&") || "";

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
      `/${modelNameUrlFormat}/${row[TABLE_CONFIG[modelName].routingField]}`,
      { row }
    );
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [tblData, setTblData] = React.useState([]);

  const history = useHistory();

  const handleAddInline = () => {
    tblData.push({});
    setTblData([...tblData]);
  };

  const refresh = () => {
    setSelectedRows(new Set());
    setIsCheckAll(false);

    let whereStatements = {};

    tblCols
      .filter(
        col => col.search && col.search.options && searchFields[col.field]
      )
      .forEach(col => {
        whereStatements[col.field] = searchFields[col.field];
      });

    tblCols
      .filter(col => col.search === "text" && searchFields[col.field])
      .forEach(col => {
        whereStatements[col.field] = {
          $text: { $search: { $term: searchFields[col.field] } },
        };
      });

    tblCols
      .filter(col => col.search === "string" && searchFields[col.field])
      .forEach(col => {
        whereStatements[col.field] = { $regex: `^${searchFields[col.field]}` };
      });

    whereStatements = Object.keys(whereStatements).length
      ? `where=${JSON.stringify(whereStatements)}`
      : "";

    const url =
      `/parse/classes/${modelName}?${whereStatements}&${includeString}&limit=${
        pagingInfo.noItemPerPage
      }&skip=${pagingInfo.startIndex - 1}&count=1` +
      (pagingInfo.sortField ? `&order=${pagingInfo.sortField}` : "");

    httpService.get(url).then(async json => {
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
      const tblDataSpecial = await Promise.all(
        tblCols.map(col => {
          if (!col.privateUrl) return null;
          return httpService.get(col.privateUrl);
        })
      );
      tblDataSpecial.forEach((colData, index) => {
        if (!colData) return;
        const col = tblCols[index];
        let formatCol = {};
        colData["results"].forEach(
          entry => (formatCol[_.get(entry, "objectId")] = entry)
        );
        json["results"].forEach(row => {
          row[col.field] =
            _.get(formatCol, `${row.objectId}.${col.field}`) ||
            (col.type === "number" && 0);
        });
      });
      setTblData(json["results"]);
      sendDataToParent && sendDataToParent(json["results"]);
    });
  };

  React.useEffect(() => {
    refresh();
  }, [modelName]);

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
        tblCols
          .filter(col => col.field != "createdAt")
          .forEach(col => (copiedObj[col.field] = row[col.field]));
        beforeInlineSave(copiedObj);
        return {
          method: row.objectId ? "PUT" : "POST",
          path: `/parse/classes/${modelName}/${row.objectId || ""}`,
          body: copiedObj,
        };
      });
    httpService.post("/parse/batch", { requests }).then(json => {
      if (json.length > 0) {
        console.log("json", json);
        toastr.success("Objects have been saved successfully");
        refresh();
      }
    });
  };

  const handleFieldChange = (row, fieldName, value) => {
    row.isDirty = true;
    row[fieldName] = value;
  };
  return (
    <React.Fragment>
      <Row>
        <div className="subHeaderQueryReports d-flex justify-content-between align-items-center text-capitalize">
          {!report && (
            <>
              <h4 className="mb-0 font-size-18 text-capitalize">
                {startCase(modelName)}
              </h4>
              <div className="d-flex justify-content-between align-items-center">
                {selectedRows.size ? (
                  <CommonButton
                    level={2}
                    onClick={toggleModal}
                    className="text-capitalize"
                    type="button"
                  >
                    <i className="dripicons-trash"></i>
                  </CommonButton>
                ) : (
                  <span className="text-capitalize">Select Rows To Edit</span>
                )}
                <CommonButton
                  level={enableSearch ? 0 : 1}
                  onClick={() => {
                    setEnableSearch(!enableSearch);
                  }}
                >
                  <i className="dripicons-search"></i>
                </CommonButton>
                <CommonButton
                  level={enableEditMode ? 0 : 1}
                  onClick={() => {
                    setEnableEditMode(!enableEditMode);
                  }}
                >
                  <i className="dripicons-pencil"></i>
                </CommonButton>

                {enableEditMode && (
                  <CommonButton
                    level={0}
                    onClick={() => {
                      handleSaveEdits(!enableEditMode);
                    }}
                  >
                    Save
                  </CommonButton>
                )}
                <Link to={`${modelNameUrlFormat}/new-${modelNameUrlFormat}`}>
                  <CommonButton level={0} className="text-capitalize">
                    {`+ Add ${startCase(modelName)}`}
                  </CommonButton>
                </Link>
              </div>
            </>
          )}
        </div>
      </Row>

      <Spacer size={10} />

      <Row>
        <Col md="12">
          <Card body>
            <table className="table  align-middle table-nowrap table-hover">
              <thead className="table-light">
                <tr>
                  {enableEditMode && (
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
                  )}
                  <th width="50">STT</th>
                  {tblCols.map((col, index) => (
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
                    {enableEditMode && (
                      <td className="selection-cell">
                        <input
                          type="checkbox"
                          id={row.objectId}
                          onClick={handleClick}
                          defaultChecked={selectedRows.has(row.objectId)}
                        ></input>
                      </td>
                    )}
                    <td className="text-center">
                      {pagingInfo.startIndex + index}
                    </td>
                    {tblCols.map(col => (
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
                            <span
                              className={col?.width && "custom-tr-size"}
                              style={col?.width && { width: col.width }}
                            >
                              {_.get(row, col.field)}
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

      {!report && (
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
      )}

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

VVSTable.propTypes = {
  modelName: PropTypes.string,
  report: PropTypes.bool,
  sendDataToParent: PropTypes.func,
  tableChart: PropTypes.array,
};
