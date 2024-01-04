import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, Col, Container, Row } from "reactstrap";
import Spacing from "./Spacing";
import ImageNoData from "../../assets/images/list-empty-state.svg";
import _ from "lodash";
import ViewableCommon from "./ViewableCommon";
import { CommonButton } from "./ButtonCommon";
import { useDispatch } from "react-redux";
import { LIST_CHECK_COLUMN } from "constants/dataTable";
import { fetchEmployee } from "redux-toolkit/slices/Employee/EmployeeSlice";
import { fetchBranch } from "redux-toolkit/slices/Branch/BranchSlide";
import { handleUpdateDataTable, handleUpdateRow } from "helpers/erp_helper";
import UpdateProperty from "components/Hr/Employee/Modal/UpdateProperty/UpdateProperty";
import useReuseData from "custom-hook/useReuseData";
import { fetchSysCfg } from "redux-toolkit/slices/SysCfgSlice/SysCfgSlice";
import { fetchCompany } from "redux-toolkit/slices/Company/CompanySlide";
import { fetchSalaryComponent } from "redux-toolkit/slices/Payroll/SalaryComponent/salaryComponent";
import { fetchLeaveTypes } from "redux-toolkit/slices/Leave/leaveTypeSlice";
import { fetchEmployeeTaxExemptionSubCategory } from "redux-toolkit/slices/Payroll/EmployeeTaxExemptionSubCategory/employeeTaxExemptionSubCategory";
import { fetchTasks } from "redux-toolkit/slices/Projects/task";
import { fetchProducts } from "redux-toolkit/slices/Stock/productSlice";
import { fetchUsers } from "redux-toolkit/slices/Users/userSlice";
import { fetchItem } from "redux-toolkit/slices/Stock/ItemsAndPricing/ItemSlice";
import { fetchBrand } from "redux-toolkit/slices/Stock/BrandSlice";
import { fetchItemAttribute } from "redux-toolkit/slices/Stock/itemAttributeSlice";
import { fetchWarehouse } from "redux-toolkit/slices/Stock/warehouseSlice";
import { fetchPriceList } from "redux-toolkit/slices/Stock/priceListSlice";
import { fetchActivityType } from "redux-toolkit/slices/Projects/activityType";
import { fetchProject } from "redux-toolkit/slices/Projects/project";
import { useLocation } from "react-router-dom";
import Attachments from "components/attachments";
import AttachmentReviewer from "components/attachments/AttachmentReviewer";
import { fetchCategory } from "redux-toolkit/slices/CMS/CategorySlice";
import { fetchAccount } from "redux-toolkit/slices/Accounting/AccountSlice";

export default function TableCommon(props) {
  const {
    dataTableCommon,
    columns,
    onHandleChangeTable,
    isModal,
    disableAddRow,
  } = props;
  const [column, setColumn] = useState(columns);
  const [isShowModal, setIsShowModal] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const { department, designation, uom } = useReuseData(
    fetchSysCfg,
    "SysCfgToolkit"
  );
  const { employees } = useReuseData(fetchEmployee, "Employee");
  const { companys } = useReuseData(fetchCompany, "Company");
  const { branchs } = useReuseData(fetchBranch, "Branch");
  const { users } = useReuseData(fetchUsers, "User");
  const { items } = useReuseData(fetchItem, "Item");
  const { activityTypeList } = useReuseData(fetchActivityType, "ActivityType");
  const { brands } = useReuseData(fetchBrand, "Brand");
  const { itemAttribute } = useReuseData(fetchItemAttribute, "ItemAttribute");
  const { priceList } = useReuseData(fetchPriceList, "PriceList");
  const { warehouse } = useReuseData(fetchWarehouse, "Warehouse");
  const { country, contractType, bankTransaction } = useReuseData(
    fetchSysCfg,
    "SysCfgToolkit"
  );
  const { projectList } = useReuseData(fetchProject, "Project");
  const { salaryComponent } = useReuseData(
    fetchSalaryComponent,
    "SalaryComponent"
  );
  const { leaveTypes } = useReuseData(fetchLeaveTypes, "LeaveType");
  const { employeeTaxExemptionSubCategory } = useReuseData(
    fetchEmployeeTaxExemptionSubCategory,
    "EmployeeTaxExemptionSubCategory"
  );
  const { tasks } = useReuseData(fetchTasks, "Task");
  const { products } = useReuseData(fetchProducts, "Product");
  const { categories } = useReuseData(fetchCategory, "Category");
  const { accounts } = useReuseData(fetchAccount, "Account");

  const [dataTable, setDataTable] = useState(dataTableCommon);
  const [currentDataTable, setCurrentDataTable] = useState([]);
  const [key, setKey] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/");
  const pathName = path[1];

  const pageOptions = {
    sizePerPage: 5,
    totalSize: dataTable?.length,
    custom: true,
  };

  const selectRow = {
    mode: "checkbox",
    onSelect: (row, isSelect) => {
      if (isSelect) {
        setCurrentDataTable(prev => [...prev, row]);
        return;
      }
      const filterDataTable = currentDataTable?.filter(
        item => item.id !== row.id
      );
      setCurrentDataTable(filterDataTable);
    },

    onSelectAll: (isSelect, rows, e) => {
      if (dataTable.length === 0) {
        return;
      }
      if (isSelect && dataTable.length !== 0) {
        setCurrentDataTable([]);
        setCurrentDataTable(rows);
        return;
      }
      setCurrentDataTable([]);
    },
  };

  const editRow = {
    mode: "click",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, column) => {
      if (column.editor?.type === "select") {
        handleUpdateDataTable(
          column,
          dataTable,
          setDataTable,
          newValue,
          row,
          pathName
        );
      }
      handleUpdateRow(column, dataTable, setDataTable, newValue, row, pathName);
      onHandleChangeTable(prev => [...dataTable]);
    },
  };

  const handleAddRow = () => {
    const row = {
      id: dataTable.length
        ? Math.max(...dataTable.map(data => data.id)) + 1
        : 1,
    };
    columns
      .map(column => column.dataField)
      .forEach(field => {
        row[field] = "";
      });
    setDataTable(prev => [...prev, row]);
    setAttachments([]);
    // onHandleChangeTable(prev => [...prev, row]);
  };

  const handleDetele = () => {
    const ids = currentDataTable.map(c => c.id);
    const newDataTable = dataTable.filter(d => !ids.includes(d.id));
    setCurrentDataTable([]);
    setDataTable(newDataTable);
    onHandleChangeTable(newDataTable);
    setKey(prev => !prev);
  };

  const hanleClearFile = selectedFile => {
    const attachmentFiles = attachments.filter(
      file => file.name !== selectedFile.name
    );
    setAttachments(attachmentFiles);
  };

  const fetchApiColumnTable = (type, column, nameColumn) => {
    switch (nameColumn) {
      case "employee": {
        return {
          ...column,
          editor: {
            type,
            options: employees?.map(item => ({
              label: item.series,
              value: item.series,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "leaveType": {
        return {
          ...column,
          editor: {
            type,
            options: leaveTypes?.map(item => ({
              label: item.name,
              value: item.name,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "product": {
        return {
          ...column,
          editor: {
            type,
            options: products?.map(item => ({
              label: item.name,
              value: item.name,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "username": {
        return {
          ...column,
          editor: {
            type,
            options: users?.map(item => ({
              label: item.username,
              value: item.username,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "branch": {
        return {
          ...column,
          editor: {
            type: type,
            options: branchs?.map(item => {
              return {
                label: item.name,
                value: item.branch,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "attribute": {
        return {
          ...column,
          editor: {
            type: type,
            options: itemAttribute?.map(item => {
              return {
                label: item.attributeName,
                value: item.attributeName,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "defaultPriceList": {
        return {
          ...column,
          editor: {
            type: type,
            options: priceList?.map(item => {
              return {
                label: item.priceListName,
                value: item.priceListName,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "country": {
        return {
          ...column,
          editor: {
            type: type,
            options: country?.map(item => {
              return {
                label: item.country,
                value: item.country,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "defaultWarehouse": {
        return {
          ...column,
          editor: {
            type: type,
            options: warehouse?.map(item => {
              return {
                label: item.warehouseName,
                value: item.warehouseName,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "checkIn": {
        return {
          ...column,
          editor: {
            type: type,
            options: warehouse?.map(item => {
              return {
                label: item.warehouseName,
                value: item.warehouseName,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "department": {
        return {
          ...column,
          editor: {
            type: type,
            options: department?.map(item => {
              return {
                label: item.department,
                value: item.department,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "designation": {
        return {
          ...column,
          editor: {
            type: type,
            options: designation?.map(item => {
              return {
                label: item.designation,
                value: item.designation,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "company": {
        return {
          ...column,
          editor: {
            type: type,
            options: companys?.map((item, index) => {
              return {
                id: index,
                label: item.name,
                value: item.branch,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "account": {
        return {
          ...column,
          editor: {
            type: type,
            options: accounts?.map((item, index) => {
              return {
                id: index,
                label: item.name,
                value: item.name,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "component": {
        return {
          ...column,
          editor: {
            type: type,
            options: salaryComponent?.map(item => ({
              label: item.name,
              value: item.name,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "exemptionSubCategory": {
        return {
          ...column,
          editor: {
            type: type,
            options: employeeTaxExemptionSubCategory?.map(item => ({
              value: item.name,
              label: item.name,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "itemCode": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: items?.map(item => ({
              value: item.itemName,
              label: item.itemName,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "brand": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: brands?.map(brand => ({
              value: brand.name,
              label: brand.name,
              item: [{ ...brand }],
            })),
          },
        };
      }

      case "uom": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: uom?.map(uom => ({
              value: uom.name,
              label: uom.name,
              item: [{ ...uom }],
            })),
          },
        };
      }

      case "contractType": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: contractType?.map(type => ({
              value: type,
              label: type,
              item: [{ ...type }],
            })),
          },
        };
      }

      case "salesPerson": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "Incentives",
                value: "salePerson1",
              },
              {
                label: "Sale Person2",
                value: "salePerson2",
              },
            ],
          },
        };
      }

      case "offerTerm": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "Incentives",
                value: "incentives",
              },
              {
                label: "Notice Period",
                value: "noticePeriod",
              },
              {
                label: "Leaves per Year",
                value: "leavesPerYear",
              },
              {
                label: "Responsibilities",
                value: "responsibilities",
              },
              {
                label: "Job Description",
                value: "jobDescription",
              },
            ],
          },
        };
      }

      case "earningComponent": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: salaryComponent
              .filter(item => item.type === "earning")
              ?.map(item => {
                return {
                  label: item.name,
                  value: item.name,
                  item: [{ ...item }],
                };
              }),
          },
        };
      }

      case "deductionsComponent": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: salaryComponent
              .filter(item => item.type === "deduction")
              ?.map(item => {
                return {
                  label: item.name,
                  value: item.name,
                  item: [{ ...item }],
                };
              }),
          },
        };
      }

      case "user": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: users.map((item, index) => {
              return {
                key: index,
                label: item?.username,
                value: item?.objectId,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "role": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "Guest",
                value: "Guest",
              },
              {
                label: "System Manager",
                value: "SystemManager",
              },
              {
                label: "All",
                value: "All",
              },
              {
                label: "Administrator",
                value: "Administrator",
              },
              {
                label: "Website Manager",
                value: "WebsiteManager",
              },
              {
                label: "Dashboard Manager",
                value: "DashboardManager",
              },
              {
                label: "Script Manager",
                value: "ScriptManager",
              },
            ],
          },
        };
      }

      case "task": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: tasks.map(item => {
              return {
                label: item.name,
                value: item.name,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "discountType": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "",
                value: "",
              },
              {
                label: "Discount Percentage",
                value: "discountPercentage",
              },
              {
                label: "Discount Amount",
                value: " discountAmount",
              },
            ],
          },
        };
      }
      case "activityType": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: activityTypeList?.map(item => {
              return {
                label: item.name,
                value: item.name,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "project": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: projectList?.map(item => {
              return {
                label: item.name,
                value: item.name,
                item: [{ ...item }],
              };
            }),
          },
        };
      }

      case "barcodeType": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "",
                value: "",
              },
              {
                label: "Discount Percentage",
                value: "discountPercentage",
              },
              {
                label: "Discount Amount",
                value: " discountAmount",
              },
            ],
          },
        };
      }

      case "uom": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "EAN",
                value: "EAN",
              },
              {
                label: "UPC-A",
                value: "UPC-A",
              },
            ],
          },
        };
      }

      case "materialRequestType": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "Purchase",
                value: "Purchase",
              },
              {
                label: "Transfer",
                value: "Transfer",
              },
              {
                label: "Material Issue",
                value: "Material Issue",
              },
              {
                label: "Manufacture",
                value: "Manufacture",
                label: "Unit",
                value: "Unit",
              },
              {
                label: "Box",
                value: "Box",
              },
              {
                label: "Nos",
                value: "Nos",
              },
              {
                label: "Pair",
                value: "Pair",
              },
              {
                label: "Set",
                value: "Set",
              },
              {
                label: "Meter",
                value: "Meter",
              },
              {
                label: "Barleycorn",
                value: "Barleycorn",
              },
              {
                label: "Calibre",
                value: "Calibre",
              },
              {
                label: "Cable Length (UK)",
                value: "Cable Length (UK)",
              },
              {
                label: "Cable Length (US)",
                value: "Cable Length (US)",
              },
              {
                label: "Cable Length",
                value: "Cable Length",
              },
              {
                label: "Centimeter",
                value: "Centimeter",
              },
              {
                label: "Ells (UK)",
                value: "Ells (UK)",
              },
              {
                label: "Ems(Pica)",
                value: "Ems(Pica)",
              },
              {
                label: "Fathom",
                value: "Fathom",
              },
              {
                label: "Foot",
                value: "Foot",
              },
              {
                label: "Furlong",
                value: "Furlong",
              },
              {
                label: "Hand",
                value: "Hand",
              },
            ],
          },
        };
      }

      case "attachment": {
        return {
          ...column,
          formatter: (cell, row) => {
            if (cell !== "") {
              return (
                <>
                  {attachments?.map(file => (
                    <React.Fragment key={file.name}>
                      <AttachmentReviewer
                        file={file}
                        onDelete={hanleClearFile}
                      />
                    </React.Fragment>
                  ))}
                </>
              );
            }
          },
          editorRenderer: (editorProps, value) => {
            return (
              <Attachments
                {...editorProps}
                value={value}
                attachments={attachments}
                onChange={setAttachments}
                maxFiles={1}
                button={
                  <Button style={{ width: "fit-content" }} type="button">
                    <div className="d-flex">
                      <i
                        className="bx bx-message-x"
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                        ref={node => node}
                      ></i>
                      <p style={{ marginBottom: 0 }}>Attachments</p>
                    </div>
                  </Button>
                }
              />
            );
          },
        };
      }

      case "category": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: categories?.map(item => ({
              value: item.name,
              label: item.name,
              item: [{ ...item }],
            })),
          },
        };
      }

      case "fieldinBankTransaction": {
        return {
          ...column,
          editor: {
            type: Type.SELECT,
            options: bankTransaction?.map(item => ({
              value: item.name,
              label: item.name,
              item: [{ ...item }],
            })),
          },
        };
      }
      default:
        break;
    }
  };

  const mapColumnsFilter = columns => {
    const mapColumns = columns.map(column => {
      const isCheckListColumn = LIST_CHECK_COLUMN.find(
        item => item.nameColumn === column.dataField
      );
      if (isCheckListColumn) {
        const columns = fetchApiColumnTable(
          Type.SELECT,
          column,
          isCheckListColumn.nameColumn
        );
        return columns;
      }

      return {
        ...column,
      };
    });

    setColumn(mapColumns);
  };

  const onToggleModal = () => {
    setIsShowModal(prev => !prev);
  };

  const EmptyTable = () => {
    return (
      <Row className="d-flex justify-content-center text-center">
        {dataTable?.length === 0 && (
          <React.Fragment>
            <img src={ImageNoData} alt="No data" style={{ width: 60 }} />
            <p style={{ fontSize: 11 }}> No data</p>
          </React.Fragment>
        )}
      </Row>
    );
  };

  useEffect(() => {
    setDataTable([]);
  }, [JSON.stringify(columns)]);

  useEffect(() => {
    mapColumnsFilter(columns);
  }, [
    JSON.stringify(employees),
    JSON.stringify(leaveTypes),
    JSON.stringify(salaryComponent),
    JSON.stringify(branchs),
    JSON.stringify(department),
    JSON.stringify(designation),
    JSON.stringify(companys),
    JSON.stringify(employeeTaxExemptionSubCategory),
    JSON.stringify(tasks),
    JSON.stringify(products),
    JSON.stringify(users),
    JSON.stringify(columns),
    JSON.stringify(items),
    JSON.stringify(brands),
    JSON.stringify(uom),
    JSON.stringify(itemAttribute),
    JSON.stringify(warehouse),
    JSON.stringify(country),
    JSON.stringify(activityTypeList),
    JSON.stringify(contractType),
    JSON.stringify(attachments),
  ]);

  useEffect(() => {
    setDataTable(dataTableCommon);
  }, [JSON.stringify(dataTableCommon)]);

  return (
    <PaginationProvider
      pagination={paginationFactory(pageOptions)}
      keyField="id"
      columns={column}
      data={dataTable}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider keyField="id" columns={column} data={dataTable}>
          {toolkitProps => (
            <React.Fragment>
              <Spacing size={10} />
              <div>
                <div className="table-responsive">
                  <BootstrapTable
                    key={key}
                    keyField="id"
                    responsive
                    selectRow={selectRow}
                    columns={column}
                    data={dataTable}
                    cellEdit={cellEditFactory(editRow)}
                    {...toolkitProps.baseProps}
                    {...paginationTableProps}
                    noDataIndication={EmptyTable}
                  />
                </div>

                <Row className="align-items-md-center mt-30">
                  <Col className="inner-custom-pagination d-flex flex-row">
                    <div className="d-inline d-flex flex-row">
                      <SizePerPageDropdownStandalone {...paginationProps} />
                      <div className="d-flex" style={{ gap: 10 }}>
                        <ViewableCommon
                          if={() => !_.isEmpty(currentDataTable)}
                          caseTrue={
                            <CommonButton
                              height={24}
                              level={2}
                              onClick={handleDetele}
                              type="button"
                              style={{ marginLeft: 16 }}
                            >
                              Delete
                            </CommonButton>
                          }
                        />
                        <ViewableCommon
                          if={() => isModal}
                          caseTrue={
                            <>
                              <CommonButton
                                level={1}
                                height={24}
                                onClick={onToggleModal}
                                type="button"
                              >
                                Add Row
                              </CommonButton>
                              <UpdateProperty
                                isShowModal={isShowModal}
                                modalTitle="Update Property"
                                onCloseModal={onToggleModal}
                                onHandleChangeTable={onHandleChangeTable}
                              ></UpdateProperty>
                            </>
                          }
                          caseFalse={
                            <>
                              {!disableAddRow ? (
                                <CommonButton
                                  level={1}
                                  height={24}
                                  style={{ marginLeft: 10 }}
                                  onClick={handleAddRow}
                                  type="button"
                                >
                                  Add Row
                                </CommonButton>
                              ) : (
                                ""
                              )}
                            </>
                          }
                        />
                      </div>
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
  );
}

TableCommon.propTypes = {
  dataTableCommon: PropTypes.array,
  columns: PropTypes.array,
  onHandleChangeTable: PropTypes.func,
  isModal: PropTypes.bool,
  disableAddRow: PropTypes.bool,
};
