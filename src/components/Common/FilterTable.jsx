import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, ModalBody, ModalFooter, Row } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import DatePicker from "react-datepicker";
import Spacing from "./Spacing";
import { useHistory, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ImageNoData from "../../assets/images/list-empty-state.svg";
import { formaterColumn } from "helpers/erp_helper";
import { CommonButton } from "./ButtonCommon";
import ModalCommon from "./ModalCommon";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "./Spacing";
import { debounce } from "lodash";

export default function FilterTable(props) {
  const {
    dataFilterTable,
    dataTable,
    columnTable,
    onDelete = () => {},
    onSearch = () => {},
  } = props;

  const [selectedRows, setSelectedRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const { SearchBar } = Search;
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.replace("/", "");

  const toggleModal = () => {
    setOpenModal(prev => !prev);
  };
  const handleDeleteClicked = () => {
    onDelete(selectedRows);
    setSelectedRows([]);
    toggleModal();
  };

  const selectRow = {
    mode: "checkbox",
    onSelect: (row, isSelect, rowIndex) => {
      if (isSelect) {
        setSelectedRows([...selectedRows, row]);
        return;
      }
      setSelectedRows(prev => prev.filter(row => row.id !== rowIndex));
    },
    onSelectAll: (isSelect, rows) => {
      if (isSelect) {
        setSelectedRows([...rows]);
        return;
      }
      setSelectedRows([]);
    },
  };

  const pageOptions = {
    sizePerPage: 10,
    totalSize: dataTable.length,
    custom: true,
  };

  const dataFilter = dataFilterTable?.filter(item => {
    if (item.id === path) return item;
  });

  const mapColumn = formaterColumn(columnTable, history, path);

  const mapTables = dataTable?.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });

  return (
    <React.Fragment>
      <Row>
        <Col md="12">
          <Card body>
            <PaginationProvider
              pagination={paginationFactory(pageOptions)}
              keyField="id"
              columns={mapColumn[0]?.columnsPage}
              data={mapTables}
            >
              {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                  keyField="id"
                  columns={mapColumn[0]?.columnsPage}
                  data={mapTables}
                  search
                >
                  {toolkitProps => (
                    <React.Fragment>
                      <div className="filter__section">
                        <div className="filter__section--input">
                          {dataFilter && dataFilter[0]?.isFilterSearch && (
                            <div className="search-box me-2 mb-2">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          )}
                          {dataFilter && dataFilter[0]?.isFilterDate && (
                            <div className="d-flex" style={{ gap: "20px" }}>
                              <DatePicker
                                className="form-control"
                                placeholderText="Select date"
                              />
                              <DatePicker
                                className="form-control"
                                placeholderText="Select date"
                              />
                            </div>
                          )}
                        </div>
                        <div className="filter__section--btn">
                          {Boolean(selectedRows.length) && (
                            <CommonButton
                              height={25}
                              level={2}
                              onClick={toggleModal}
                              type="button"
                            >
                              <i className="dripicons-trash"></i>
                            </CommonButton>
                          )}
                          <div className="page-item">
                            <div
                              className="page-link"
                              style={{
                                borderRadius: "0.25rem",
                              }}
                            >
                              <i className="bx bx-filter"></i> Filter
                            </div>
                          </div>
                          <ul className="pagination page-marginbottom">
                            <li className="page-item">
                              <p className="page-link page-marginbottom">
                                <i className="bx bx-sort-down"></i>
                              </p>
                            </li>
                            <li className="page-item ">
                              <p className="page-link page-marginbottom">
                                Last Modified On
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <Spacing size={10} />
                      <div>
                        <div className="table-responsive">
                          <BootstrapTable
                            classes={
                              "table align-middle table-nowrap table-hover"
                            }
                            headerClasses="table-light"
                            key={JSON.stringify(mapTables)}
                            keyField="id"
                            responsive
                            selectRow={selectRow}
                            data={mapTables}
                            columns={mapColumn[0].columnsPage}
                            bordered={false}
                            striped={false}
                            {...toolkitProps.baseProps}
                            {...paginationTableProps}
                          />
                        </div>
                        <Row className="d-flex justify-content-center text-center">
                          {mapTables.length === 0 && (
                            <React.Fragment>
                              <img
                                src={ImageNoData}
                                alt="No data"
                                style={{ width: 120 }}
                              />
                              <p style={{ fontSize: 15 }}> No data</p>
                            </React.Fragment>
                          )}
                        </Row>
                        <Row className="align-items-md-center mt-30">
                          <Col className="inner-custom-pagination d-flex">
                            <div className="d-inline">
                              <SizePerPageDropdownStandalone
                                {...paginationProps}
                              />
                            </div>
                            <div className="text-md-right ms-auto">
                              <PaginationListStandalone {...paginationProps} />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </React.Fragment>
                  )}
                </ToolkitProvider>
              )}
            </PaginationProvider>
          </Card>
        </Col>
      </Row>

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
            Are you sure to delete this employee?
          </CommonText>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={toggleModal}>
            Cancel
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleDeleteClicked}
            disabled={!selectedRows.length}
          >
            Delete
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </React.Fragment>
  );
}

FilterTable.propTypes = {
  dataFilterTable: PropTypes.array,
  dataTable: PropTypes.array,
  columnTable: PropTypes.array,
  onDelete: PropTypes.func,
  onSearch: PropTypes.func,
};
