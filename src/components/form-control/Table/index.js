import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ModalBody, ModalFooter } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { CommonButton } from "../../Common/ButtonCommon";
import ModalCommon from "../../Common/ModalCommon";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "../../Common/Spacing";
import _ from "lodash";
import { useFieldArray } from "react-hook-form";

const headerAlign = (textAlign = "left") => {
  switch (textAlign) {
    case "left":
      return "justify-content-start";
    case "right":
      return "justify-content-end";
    case "center":
      return "justify-content-center";
    default:
      return "justify-content-start";
  }
};
export default function Table({
  name,
  headers,
  defaultRowValue,
  formProps,
  disableAdd,
  disableDelete,
  disableSelect,
  onDelete,
  onSelect,
  onChangePaging,
  onItemClick,
  title,
}) {
  const { control, getValues, watch } = formProps;
  const { fields, append, remove } = useFieldArray({ name, control });
  const [selectedRows, setSelectedRows] = useState(() =>
    fields.map(_ => false)
  );
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pagingInfo, setPagingInfo] = useState({
    noItemPerPage: 10,
    pageIndex: 0,
    startIndex: 1,
    total: fields.length,
    pageIndexes: [1],
  });
  const cellValue = (header, index) => {
    if (header.dependentField) return watch(`${name}.${index}.${header.field}`);
    return getValues(`${name}.${index}.${header.field}`);
  };
  const handleSelectAll = e => {
    const { checked } = e.target;
    setIsCheckAll(checked);
    if (!checked) {
      setSelectedRows(prev => {
        prev.forEach((_, index) => {
          if (
            index >= pagingInfo.startIndex - 1 &&
            index < pagingInfo.startIndex - 1 + pagingInfo.noItemPerPage
          )
            prev[index] = false;
        });
        return prev;
      });
      return;
    }
    setSelectedRows(prev => {
      prev.forEach((_, index) => {
        if (
          index >= pagingInfo.startIndex - 1 &&
          index < pagingInfo.startIndex - 1 + pagingInfo.noItemPerPage
        )
          prev[index] = true;
      });
      return prev;
    });
  };
  const handleSelectRow = index => {
    setSelectedRows(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleAddRow = e => {
    append(defaultRowValue, { shouldFocus: false });
    // refresh(fields.length + 1);
  };

  const handleDeleteClicked = () => {
    setOpenModal(false);
    const deleteIndexes = [];
    selectedRows.forEach((row, index) => row && deleteIndexes.push(index));
    remove(deleteIndexes);
    onDelete && onDelete();
    // refresh(fields.length - deleteIndexes.length);
  };

  const toggleModal = () => {
    setOpenModal(prev => !prev);
  };
  const handleUpdateItemPerPage = value => {
    pagingInfo.noItemPerPage = parseInt(value, 10);
    handlePageClick(1);
  };
  const handlePageClick = pageIndex => {
    pagingInfo.pageIndex = pageIndex - 1;
  };

  useEffect(() => {
    const total = fields.length;
    setSelectedRows(new Array(total).fill(false));
    setIsCheckAll(false);
    pagingInfo.startIndex = pagingInfo.pageIndex * pagingInfo.noItemPerPage + 1;
    while (pagingInfo.startIndex > total && pagingInfo.startIndex > 1) {
      pagingInfo.pageIndex += -1;
      pagingInfo.startIndex =
        pagingInfo.pageIndex * pagingInfo.noItemPerPage + 1;
    }
    pagingInfo.total = total;
    pagingInfo.pageIndexes = Array.from(
      { length: Math.ceil(total / pagingInfo.noItemPerPage) },
      (x, i) => i + 1
    );
    const copiedObj = { ...pagingInfo };
    setPagingInfo(copiedObj);
  }, [fields, pagingInfo.pageIndex]);

  useEffect(() => {
    const selectIndexes = [];
    if (isCheckAll && selectedRows.every(i => i === true)) {
      selectedRows.forEach((_, index) => selectIndexes.push(index));
      onSelect?.(selectIndexes);
      return;
    }
    selectedRows.forEach((row, index) => row && selectIndexes.push(index));
    onSelect?.(selectIndexes);
  }, [isCheckAll, selectedRows]);

  return (
    <React.Fragment>
      <div className="subHeaderQueryReports d-flex align-items-center">
        <div className="flex-grow-1">{title}</div>
      </div>
      <table className="table align-middle table-nowrap table-hover">
        <thead className="table-dark">
          <tr>
            {(!disableDelete || !disableSelect) && (
              <th
                className="selection-cell-header"
                data-row-selection="true"
                width="30"
              >
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  checked={isCheckAll}
                  onChange={handleSelectAll}
                ></input>
              </th>
            )}
            <th width="50">STT</th>
            {headers.map((header, index) => (
              <th
                key={index}
                tabIndex="0"
                style={{
                  textAlign: header.textAlign || "left",
                  width: `${100 / headers.length}%`,
                }}
              >
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields
            .slice(
              pagingInfo.startIndex - 1,
              pagingInfo.startIndex - 1 + pagingInfo.noItemPerPage
            )
            .map((_, i) => {
              const index = pagingInfo.startIndex + i - 1;
              return (
                <tr key={index} onDoubleClick={() => onItemClick(_)}>
                  {(!disableDelete || !disableSelect) && (
                    <td className="selection-cell">
                      <input
                        type="checkbox"
                        checked={selectedRows[index]}
                        onChange={() => handleSelectRow(index)}
                        onClick={e => e.stopPropagation()}
                      />
                    </td>
                  )}

                  <td className="fw-bold text-center">
                    <span>{index + 1}</span>
                  </td>
                  {headers.map(header => {
                    return (
                      <td
                        key={header.text + " " + index}
                        style={{
                          position: "relative",
                          textAlign: header.textAlign || "left",
                        }}
                      >
                        <div
                          className={
                            "w-100 d-flex " + headerAlign(header.textAlign)
                          }
                          style={{ height: "35px" }}
                        >
                          {header.CellComponent ? (
                            <header.CellComponent
                              {...header.cellComponentProps(formProps, index)}
                              {...formProps}
                            />
                          ) : !header.formatter ? (
                            <span className="fw-bold text-wrap">
                              {cellValue(header, index)}
                            </span>
                          ) : (
                            <span className="fw-bold text-wrap">
                              {header.formatter(cellValue(header, index))}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {!fields.length && (
        <div
          style={{
            height: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <i className="fas fa-database" style={{ fontSize: 35 }} />
          <span style={{ fontSize: 15 }}>No data</span>
        </div>
      )}
      <div className="d-flex align-items-center">
        {fields.length > 10 && (
          <div
            className="dataTables_info"
            id="datatable-buttons_info"
            role="status"
            aria-live="polite"
          >
            <select
              className="d-custom-pagination-select"
              onChange={e => handleUpdateItemPerPage(e.target.value)}
              value={pagingInfo.noItemPerPage}
            >
              {[10, 20, 30, 50].map((number, index) => (
                <option value={number} key={index}>
                  {number}
                </option>
              ))}
            </select>
            <i className="bx bxs-down-arrow"></i>
          </div>
        )}
        {!disableAdd && (
          <CommonButton
            level={0}
            className="text-capitalize"
            onClick={handleAddRow}
            type="button"
          >
            Thêm
          </CommonButton>
        )}
        <div style={{ width: "12px" }}></div>
        {selectedRows.includes(true) && !disableDelete && (
          <CommonButton
            level={2}
            onClick={toggleModal}
            className="text-capitalize"
            type="button"
          >
            <i className="dripicons-trash"></i>
          </CommonButton>
        )}

        {pagingInfo.pageIndexes.length > 1 && (
          <div className="text-md-right ms-auto">
            <ul className="pagination react-bootstrap-table-page-btns-ul">
              {pagingInfo.pageIndexes.map((page, index) => (
                <li
                  className={`page-item ${
                    pagingInfo.pageIndex === page - 1 ? "active" : ""
                  }`}
                  onClick={() => {
                    handlePageClick(page);
                    onChangePaging && setTimeout(() => onChangePaging(), 500);
                  }}
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
        )}
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
            Xác nhận xóa?
          </CommonText>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={toggleModal} type="button">
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleDeleteClicked}
            disabled={!selectedRows.length}
            type="button"
          >
            Xóa
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </React.Fragment>
  );
}

Table.propTypes = {
  headers: PropTypes.array,
  name: PropTypes.string,
  formProps: PropTypes.object,
  defaultRowValue: PropTypes.object,
  disableAdd: PropTypes.bool,
  disableDelete: PropTypes.bool,
  disableSelect: PropTypes.bool,
  title: PropTypes.any,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onChangePaging: PropTypes.func,
  onItemClick: PropTypes.func,
};
