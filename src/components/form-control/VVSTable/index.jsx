import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import { CommonInput } from "components/Common/inputCommon";
import ModalCommon from "components/Common/ModalCommon";
import Spacer from "components/Common/Spacing";
import { CommonText } from "components/Common/TextCommon";
import VVSExcel from "components/Common/VVSExcel";
import MODEL_CONFIG from "constants/ModelConfig";
import { language_vn } from "helpers/language_vn";
import { TEXT_POST } from "helpers/name_helper";
import {
  GET_CUSTOMER,
  GET_DOWNLOAD_EXCEL,
  GET_EMPLOYEE,
  GET_KPI_ASSIGNMENT,
  GET_LEAD,
  GET_USERS,
} from "helpers/url_helper";
import _, { debounce } from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useImperativeHandle, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Col, ModalBody, ModalFooter, Row } from "reactstrap";
import httpService from "services/httpService";
import toastr from "toastr";
import SelectConst from "../SelectConst";
import VVSSelectModel from "../VVSSelectModel";
import { useRoles } from "hooks/useRoles";

const createNewRow = (cols, row) => {
  cols.forEach(col => {
    const currentName = col.field.substring(0, col.field.indexOf("."));
    switch (col.type) {
      case "model":
        _.set(row, `${currentName}.objectId`, "");
        if (!_.get(row, col.field)) _.set(row, col.field, "");
        break;
      case "number":
        if (!_.get(row, col.field)) _.set(row, col.field, 0);
        break;
      case "boolean":
        if (!_.get(row, col.field)) _.set(row, col.field, false);
        break;
      default:
        if (!_.get(row, col.field)) _.set(row, col.field, "");
        break;
    }
  });
  return row;
};
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
const VVSTable = React.forwardRef((props, ref) => {
  const {
    onRowClick,
    onRowDoubleClick,
    whereQuery,
    defaultRowValue,
    beforeSaveInlineEdit,
    enableInlineEdit,
    disableAdd,
    disableSearch,
    disableDelete,
    disableBtnSave,
    title,
    triggerRerender,
    name,
    filter,
    className,
    helperButtons = [],
    showImportExcel,
    showExportExcel,
    fieldsDownload,
    styleViewTopTable,
    pointer,
    showAllotmentLead,
    template,
    enableConfirmWithDraw,
    routingPath,
    showCancelAllotment,
    resetValueTable,
    onCallbackData,
  } = props;

  const { roles } = useRoles();
  const history = useHistory();
  const location = useLocation();
  const CONFIG = MODEL_CONFIG[name];
  const modelName = CONFIG.modelName || name;
  const [isLoading, setIsLoading] = useState(true);
  const formProps = useForm({
    mode: "onBlur",
    defaultValues: { [modelName]: [], filter: filter?.defaultValue || "" },
    resolver: CONFIG.validationSchema
      ? yupResolver(CONFIG.validationSchema)
      : undefined,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
  } = formProps;
  const tblCols = CONFIG.columns;
  const { fields, replace, prepend, insert } = useFieldArray({
    name: modelName,
    control,
    shouldUnregister: true,
  });
  const [openModal, setOpenModal] = useState(false);
  const [openModalAllotment, setOpenModalAllotment] = useState(false);
  const [toggleCancelTransactionWithDraw, setToggleCancelTransactionWithDraw] =
    useState(false);
  const [
    toggleCompletedTransactionWithDraw,
    setToggleCompletedTransactionWithDraw,
  ] = useState(false);
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchFields, setSearchFields] = useState(() => {
    if (filter) return { [filter.field]: filter?.defaultValue || "" };
    return {};
  });
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [pagingInfo, setPagingInfo] = useState({
    noItemPerPage: 10,
    pageIndex: 0,
    startIndex: 1,
    endIndex: 0,
    total: 0,
    sortField: "-createdAt",
    pageIndexes: [],
  });
  const [isFetchedColSearch, setIsFetchedColSearch] = useState(false);
  const [chosenRow, setChosenRow] = useState(null);
  const [dataExcel, setDataExcel] = useState([]);
  const [dataTableFull, setDataTableFull] = useState([]);
  const [employeeGroup, setEmployeeGroup] = useState({});
  const [employee, setEmployee] = useState({});
  const language = language_vn;
  useEffect(() => {
    if (showImportExcel) {
      const urlDataFields = `/parse/classes/${modelName}?include=["category.name"]`;
      return httpService.get(urlDataFields).then(async json => {
        setDataTableFull(json);
      });
    }
    return;
  }, []);

  useEffect(() => {
    if (location.search) {
      const splitLocationSearch = location.search.split("=");
      pagingInfo.pageIndex = Number(splitLocationSearch[1]) - 1;
      refresh();
      return;
    }
  }, [location.search]);

  const cellValue = (header, index) => {
    if (header.dependentField)
      return watch(`${modelName}.${index}.${header.field}`);
    return getValues(`${modelName}.${index}.${header.field}`);
  };
  const includeString =
    CONFIG.include?.map(field => `include=${field}`).join("&") || "";
  const filterCol = filter && tblCols.find(col => col.field == filter.field);
  const refresh = () => {
    setChosenRow(null);
    setSelectedRows(new Set());
    setIsCheckAll(false);
    let whereStatements = { ...whereQuery };
    tblCols.forEach(col => {
      if (!searchFields[col.field]) {
        return;
      }
      switch (col.type) {
        case "string":
          if (col.searchOptions)
            whereStatements[col.field] = searchFields[col.field];
          else
            whereStatements[col.field] = {
              $regex: `${searchFields[col.field]}`,
              $options: "i",
            };
          break;
        case "number":
          if (col.searchOptions)
            whereStatements[col.field] = searchFields[col.field];
          else {
            const numb = Number(searchFields[col.field]);
            if (!numb) break;
            if (numb >= 0) whereStatements[col.field] = { $gte: numb };
            else whereStatements[col.field] = { $lte: numb };
          }
          break;
        case "model":
          const containedModelField = col.field.substring(
            0,
            col.field.indexOf(".")
          );
          const targetField = col.field.slice(col.field.indexOf(".") + 1);
          const subFields = targetField.split(".");
          const toNumber = Number(searchFields[col.field]);
          const generateQuery = index => {
            if (subFields.length - 1 == index) {
              if (!col.searchOptions)
                return {
                  $inQuery: {
                    where: {
                      $or: [
                        {
                          [subFields[index]]: {
                            $regex: `${searchFields[col.field]}`,
                            $options: "i",
                          },
                        },
                        {
                          [subFields[index]]: toNumber
                            ? toNumber >= 0
                              ? { $gte: toNumber }
                              : { $lte: toNumber }
                            : {},
                        },
                      ],
                    },
                    className: col.modelNames[index],
                  },
                };
              return {
                $inQuery: {
                  where: {
                    [subFields[index]]: searchFields[col.field],
                  },
                  className: col.modelNames[index],
                },
              };
            }
            return {
              $inQuery: {
                where: {
                  [subFields[index]]: generateQuery(index + 1),
                },
                className: col.modelNames[index],
              },
            };
          };
          whereStatements[containedModelField] = generateQuery(0);
          break;
        case "boolean":
          const isTrueSet = searchFields[col.field] === "true";
          whereStatements[col.field] = isTrueSet;
          break;
        default:
          break;
      }
    });

    whereStatements = Object.keys(whereStatements).length
      ? `where=${JSON.stringify(whereStatements)}`
      : "";
    const url =
      `/parse/classes/${modelName}?${includeString}&${whereStatements}&limit=${
        pagingInfo.noItemPerPage
      }&skip=${pagingInfo.noItemPerPage * pagingInfo.pageIndex}&count=1` +
      (pagingInfo.sortField ? `&order=${pagingInfo.sortField}` : "");

    httpService.get(url).then(async json => {
      setIsLoading(false);
      pagingInfo.total = json["count"];
      pagingInfo.pageIndexes = Array.from(
        { length: Math.ceil(json["count"] / pagingInfo.noItemPerPage) },
        (_, i) => i + 1
      );
      pagingInfo.startIndex =
        pagingInfo.pageIndex * pagingInfo.noItemPerPage + 1;
      pagingInfo.endIndex = pagingInfo.startIndex + json["results"].length;
      const copiedObj = { ...pagingInfo };
      setPagingInfo(copiedObj);
      reset({ [modelName]: json["results"] });
      onCallbackData && onCallbackData(json["results"]);
      // replace(json["results"]);
    });
  };
  const handleSelectAll = e => {
    const { checked } = e.target;
    if (checked)
      fields.forEach((_, index) => {
        selectedRows.add(index);
      });
    else setSelectedRows(new Set());
    setIsCheckAll(checked);
  };

  const handlePageClick = pageIndex => {
    pagingInfo.pageIndex = pageIndex - 1;
    if (filter) {
      history.replace(location.pathname + `?page=${pageIndex}${location.hash}`);
      return;
    }
    history.replace(location.pathname + `?page=${pageIndex}`);
    refresh();
  };

  const handleCheckBoxClick = (e, index) => {
    setSelectedRows(prev => {
      if (e.target.checked) prev.add(index);
      else prev.delete(index);
      return new Set(prev);
    });
  };

  const handleAddInline = () => {
    prepend(createNewRow(tblCols, defaultRowValue || {}), {
      shouldFocus: false,
    });
    setSelectedRows(prev => {
      const newState = new Set([0]);
      prev.forEach(index => newState.add(index + 1));
      return newState;
    });
    onRowClick && chosenRow && setChosenRow(prev => prev + 1);
  };
  const handleAddInPage = () => {
    if (routingPath) {
      history.push(routingPath);
      return;
    }
    history.push(`${location.pathname}/new-${location.pathname.slice(1)}`);
  };
  const toggleModal = () => {
    setOpenModal(prev => !prev);
  };
  const handleDeleteClicked = async () => {
    const token = localStorage.getItem("authUser");
    let config = {
      headers: {
        "X-Parse-Application-Id": "SCWASRTWK1Y9AVMP1KFC",
        "X-Parse-Session-Token": JSON.parse(token),
        "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
      },
    };

    if (modelName === "_User") {
      const requests = []; //_user
      const requestsCustomer = [];
      const requestsAccount = [];
      const requestsEmployee = [];

      for (const index of selectedRows) {
        if (!fields[index].objectId) return;
        const resCustomer = await httpService.get(GET_CUSTOMER, {
          params: {
            where: {
              user: {
                objectId: fields[index].objectId,
                className: "_User",
                __type: "Pointer",
              },
            },
          },
        });
        const resEmployee = await httpService.get(GET_EMPLOYEE, {
          params: {
            where: {
              user: {
                objectId: fields[index].objectId,
                className: "_User",
                __type: "Pointer",
              },
            },
          },
        });

        if (resEmployee.results.length) {
          requestsEmployee.push({
            method: "DELETE",
            path: `/parse/classes/Employee/${resEmployee.results[0].objectId}`,
          });
        }

        if (resCustomer.results.length) {
          requestsCustomer.push({
            method: "DELETE",
            path: `/parse/classes/Customer/${resCustomer.results[0].objectId}`,
          });
          if (resCustomer.results[0]?.accounts?.length) {
            resCustomer.results[0]?.accounts.forEach(item => {
              requestsAccount.push({
                method: "DELETE",
                path: `/parse/classes/Account/${item.objectId}`,
              });
            });
          }
        }

        requests.push({
          method: "DELETE",
          path: `/parse/classes/${modelName}/${fields[index].objectId}`,
        });
      }

      try {
        for (let index = 0; index < 4; index++) {
          if (
            (requests.length !== 0 && index === 3) ||
            (requestsAccount.length !== 0 && index === 0) ||
            (requestsCustomer.length !== 0 && index === 1) ||
            (requestsEmployee.length !== 0 && index === 2)
          ) {
            await axios.post(
              process.env.REACT_APP_BASE_URL + "/parse/batch",
              index === 0
                ? {
                    requests: requestsAccount,
                  }
                : index === 1
                ? { requests: requestsCustomer }
                : index === 2
                ? { requests: requestsEmployee }
                : { requests },
              config
            );
            refresh();
          }
        }
        toastrSuccessAlert("Xoá tài khoản thành công!!!");
      } catch (error) {
        toastrErrorAlert("Xoá tài khoản thất bại!!!");
      }
      toggleModal();
      return;
    }

    if (modelName === "Customer") {
      toastrErrorAlert(
        "Bạn không thể xoá khách hàng, vui lòng truy cập vào tài khoản để xoá tài khoản và khách hàng của bạn!!!"
      );
      toggleModal();
      return;
    }

    if (modelName === "Employee") {
      const requests = [];
      const requestsUser = [];

      for (const index of selectedRows) {
        if (!fields[index].objectId) return;

        const { results: resUser } = await httpService.get(GET_USERS, {
          params: {
            where: {
              objectId: fields[index].user.objectId,
            },
          },
        });

        if (resUser.length > 0) {
          requestsUser.push({
            method: "DELETE",
            path: `/parse/classes/_User/${resUser[0].objectId}`,
          });
        }
        requests.push({
          method: "DELETE",
          path: `/parse/classes/${modelName}/${fields[index].objectId}`,
        });
      }

      try {
        for (let index = 0; index < 2; index++) {
          if (
            (requests.length !== 0 && index === 1) ||
            (requestsUser.length !== 0 && index === 0)
          ) {
            await axios.post(
              process.env.REACT_APP_BASE_URL + "/parse/batch",
              index === 0
                ? {
                    requests: requestsUser,
                  }
                : { requests },
              config
            );
            refresh();
          }
        }
        toastrSuccessAlert("Xoá tài khoản thành công!!!");
      } catch (error) {
        toastrErrorAlert("Xoá tài khoản thất bại!!!");
      }
      toggleModal();
      return;
    }

    if (modelName === "EmployeeGroup") {
      const requestsEmployee = [];
      const requestKPIAssignment = [];
      const requestLead = [];

      for (const index of selectedRows) {
        if (!fields[index].objectId) return;

        const resEmployee = await httpService.get(GET_EMPLOYEE, {
          params: {
            where: {
              groups: {
                $in: [
                  {
                    objectId: fields[index].objectId,
                    className: "EmployeeGroup",
                    __type: "Pointer",
                  },
                ],
              },
            },
          },
        });

        const resKpiAssignment = await httpService.get(GET_KPI_ASSIGNMENT, {
          params: {
            where: {
              team: {
                objectId: fields[index].objectId,
                className: "EmployeeGroup",
                __type: "Pointer",
              },
            },
          },
        });

        const resLead = await httpService.get(GET_LEAD, {
          params: {
            where: {
              salesTeam: {
                objectId: fields[index].objectId,
                className: "EmployeeGroup",
                __type: "Pointer",
              },
            },
          },
        });

        if (resEmployee.results.length > 0) {
          resEmployee.results.forEach(employee => {
            requestsEmployee.push({
              method: "PUT",
              path: `/parse/classes/Employee/${employee.objectId}`,
              body: {
                groups: {
                  __op: "Delete",
                },
              },
            });
          });
        }
        if (resKpiAssignment.results.length > 0) {
          resKpiAssignment.results.forEach(group => {
            requestKPIAssignment.push({
              method: "PUT",
              path: `/parse/classes/KPIAssignment/${group.objectId}`,
              body: {
                team: {
                  __op: "Delete",
                },
              },
            });
          });
        }
        if (resLead.results.length > 0) {
          resLead.results.forEach(lead => {
            requestLead.push({
              method: "PUT",
              path: `/parse/classes/Lead/${lead.objectId}`,
              body: {
                salesTeam: {
                  __op: "Delete",
                },
              },
            });
          });
        }

        try {
          for (let index = 0; index < 3; index++) {
            await axios.post(
              process.env.REACT_APP_BASE_URL + "/parse/batch",
              index === 0
                ? { requests: requestsEmployee }
                : index === 1
                ? { requests: requestKPIAssignment }
                : index === 2
                ? { requests: requestLead }
                : { requests },
              config
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    const requests = [];
    selectedRows.forEach(index => {
      if (!fields[index].objectId) return;
      requests.push({
        method: "DELETE",
        path: `/parse/classes/${modelName}/${fields[index].objectId}`,
      });
    });
    httpService.post("/parse/batch", { requests }).then(json => {
      refresh();
    });
    toggleModal();
  };

  const handleAllotmentSelected = () => {
    if (!employeeGroup?.objectId && !employee?.objectId) {
      toastrErrorAlert("Vui lòng chọn nhóm hoặc nhân viên cần phân bổ!");
      return;
    }
    const requests = [];
    selectedRows.forEach(index => {
      if (!fields[index].objectId) return;
      requests.push({
        method: "PUT",
        path: `/parse/classes/${modelName}/${fields[index].objectId}`,
        body: {
          ...(employeeGroup?.objectId && {
            salesTeam: {
              objectId: employeeGroup.objectId,
              className: "EmployeeGroup",
              __type: "Pointer",
            },
          }),
          salesStaff: employee?.objectId
            ? {
                objectId: employee?.objectId,
                className: "Employee",
                __type: "Pointer",
              }
            : null,
        },
      });
    });

    httpService
      .post("/parse/batch", { requests })
      .then(json => {
        refresh();
        let resultsSuccess = 0;
        let resultsError = 0;
        json.forEach(item => {
          if (item?.success) {
            resultsSuccess++;
            return;
          }
          resultsError++;
        });
        if (!resultsSuccess !== 0) {
          toastrSuccessAlert(`Phân bổ thành công ${resultsSuccess} nhân viên`);
        }
        if (resultsError !== 0) {
          toastrSuccessAlert(`Phân bổ thất bại ${resultsError} nhân viên`);
        }
      })
      .catch(() => {
        toastrSuccessAlert(language.error);
      });

    setOpenModalAllotment(false);
  };

  const handleUpdateItemPerPage = value => {
    pagingInfo.noItemPerPage = parseInt(value, 10);
    handlePageClick(1);
  };

  const handleSortColumn = fieldName => {
    switch (pagingInfo.sortField) {
      case `${fieldName}`:
        pagingInfo.sortField = `-${fieldName}`;
        break;
      case `-${fieldName}`:
        pagingInfo.sortField = null;
        break;
      default:
        pagingInfo.sortField = `${fieldName}`;
        break;
    }
    refresh();
  };

  const handleInputSearch = debounce((e, col) => {
    searchFields[col.field] = e.target.value;
    pagingInfo.pageIndex = 0;
    refresh();
  }, 360);
  const validateOnlySelectedRow = errors => {
    if (!errors[modelName]) return;
    for (const index of selectedRows) {
      if (errors[modelName][index]) return;
    }
    handleSaveEdits(getValues());
  };
  const handleSaveEdits = values => {
    const requests = values[modelName]
      .filter((_, i) => selectedRows.has(i))
      .map(row => {
        const { updatedAt, createdAt, ...copiedObj } = row;
        //handle Value Type
        tblCols.forEach(col => {
          const currentName = col.field.substring(0, col.field.indexOf("."));
          switch (col.type) {
            case "number":
              _.set(copiedObj, col.field, Number(_.get(copiedObj, col.field)));
              break;
            case "date":
              _.set(
                copiedObj,
                col.field,
                new Date(_.get(copiedObj, col.field))
              );
              _.set(copiedObj, `${currentName}.__type`, "Date");
              break;
            case "model":
              if (_.get(copiedObj, `${currentName}.objectId`)) {
                _.set(copiedObj, `${currentName}.__type`, "Pointer");
                _.set(copiedObj, `${currentName}.className`, col.modelNames[0]);
                return;
              }
              _.set(copiedObj, `${currentName}`, null);
              break;
          }
        });
        beforeSaveInlineEdit && beforeSaveInlineEdit(copiedObj);
        return {
          method: row.objectId ? "PUT" : "POST",
          path: `/parse/classes/${modelName}/${row.objectId || ""}`,
          body: copiedObj,
        };
      });

    httpService.post("/parse/batch", { requests }).then(json => {
      if (json.length > 0) {
        // toastr.success("Lưu thành công");
        refresh();
      } else {
        toastr.error("Lưu thất bại");
      }
    });
  };
  const handleOnRowDoubleClick = (row, index) => {
    const routingValue = row[CONFIG.routingField];
    if (CONFIG.routingPath) {
      const { routingPath } = CONFIG;
      const routingPathArr = routingPath.split("/");
      const fieldName = routingPathArr[routingPathArr.length - 1];
      const routingValue = row[fieldName] || row[routingPathArr[1]][fieldName];
      routingPathArr[2] = routingValue;
      const path = routingPathArr.join("/");
      history.push(path);
      return;
    }
    if (routingValue && !enableInlineEdit) {
      history.push(`${location.pathname}/${routingValue}`);
      return;
    }
    if (selectedRows.has(index)) {
      setSelectedRows(prev => {
        prev.delete(index);
        return new Set(prev);
      });
    } else {
      setSelectedRows(prev => {
        prev.add(index);
        return new Set(prev);
      });
    }
  };
  const handleOnRowClick = (e, row, index) => {
    onRowClick && onRowClick(row);
    if (onRowClick && row.objectId) {
      setChosenRow(index);
    }
  };
  const handleCancelChange = () => {
    refresh();
  };
  let threeDotsBefore = false;
  let threeDotsAfter = false;
  const renderPageInPagination = pageNumber => {
    const Page = (
      <span className="page-link" style={{ cursor: "pointer" }}>
        {pageNumber}
      </span>
    );
    const ThreeDots = (
      <span className="page-link" style={{ cursor: "pointer" }}>
        ...
      </span>
    );
    if (pageNumber <= 2) return Page;
    if (
      pageNumber <= pagingInfo.pageIndex + 3 &&
      pageNumber >= pagingInfo.pageIndex - 1
    )
      return Page;
    if (pageNumber > pagingInfo.pageIndexes.length - 2) return Page;
    if (pageNumber > pagingInfo.pageIndex + 1 && !threeDotsAfter) {
      threeDotsAfter = true;
      return ThreeDots;
    }
    if (pageNumber < pagingInfo.pageIndex + 1 && !threeDotsBefore) {
      threeDotsBefore = true;
      return ThreeDots;
    }
    return null;
  };
  useEffect(() => {
    if (!isFetchedColSearch) return;
    setValue("filter", filter?.defaultValue || "");
    if (filter) searchFields[filter.field] = filter?.defaultValue || "";
    refresh();
  }, [
    name,
    JSON.stringify(whereQuery),
    isFetchedColSearch,
    triggerRerender,
    JSON.stringify(filter),
  ]);
  useEffect(async () => {
    try {
      const response = await Promise.all(
        tblCols.map(col => {
          if (col.searchOptions) {
            return httpService.get(
              `/parse/classes/SysCfg?where={"Code": "${col.searchOptions}"}`
            );
          }
          return null;
        })
      );
      response.forEach((res, i) => {
        if (!res) return;
        const searchOptions = res.results[0]?.Values || [];
        tblCols[i].searchOptionsFetched = searchOptions;
        if (!tblCols[i].formatter)
          tblCols[i].formatter = cell =>
            searchOptions.find(item => item.value == cell)?.text || "";
      });
    } catch (err) {
    } finally {
      setIsFetchedColSearch(true);
    }
  }, []);

  useEffect(() => {
    if (_.isEmpty(resetValueTable)) {
      setIsLoading(false);
      return;
    }
    if (resetValueTable) {
      setIsLoading(true);
      resetValueTable.forEach(item => {
        formProps.setValue(item.key, item.value);
      });
      setIsLoading(false);
    }
  }, [JSON.stringify(resetValueTable)]);

  const handleOnExport = async () => {
    try {
      const token = localStorage.getItem("authUser");

      let config = {
        headers: {
          "X-Parse-Application-Id": "SCWASRTWK1Y9AVMP1KFC",
          "X-Parse-Session-Token": JSON.parse(token),
        },
      };

      const _filter = { ...whereQuery };
      if (filter && filter["field"] && filter["defaultValue"]) {
        _filter[filter["field"]] = filter["defaultValue"];
      }

      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + GET_DOWNLOAD_EXCEL,
        {
          className: modelName,
          fields: tblCols.map(item => item.field),
          columnName: tblCols.map(item => item.text),
          pointer,
          filter: _filter || {},
        },
        config
      );

      if (res && res.data.result.path) {
        window.open(res.data.result.path);
        return;
      }
      toastrErrorAlert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    } catch (error) {
      toastrErrorAlert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  const handleImportToServer = async () => {
    if (modelName === "VoucherCode") {
      try {
        const requests = dataExcel.map(row => {
          const start = moment(row.startDate, "DD/MM/YYYY").format(
            "MM/DD/YYYY"
          );
          const end = moment(row.endDate, "DD/MM/YYYY").format("MM/DD/YYYY");

          return {
            method: "POST",
            path: `/parse/classes/VoucherCode`,
            body: {
              ...row,
              price: Number(row.price),
              brand: {
                className: "Brand",
                objectId: row.brand,
                __type: "Pointer",
              },
              startDate: {
                iso: start,
                __type: "Date",
              },
              endDate: {
                iso: end,
                __type: "Date",
              },
            },
          };
        });
        await httpService.post("/parse/batch", { requests });
        refresh();
        setDataExcel([]);
      } catch (error) {
        toastrErrorAlert(language.error);
      }
      return;
    }
    const requests = dataExcel.map(row => {
      const { __rowNum__, ...rowMap } = row;
      return {
        method: "POST",
        path: `/parse/classes/${modelName}`,
        body: { ...rowMap },
      };
    });

    try {
      const res = await httpService.post("/parse/batch", { requests });
      const resSuccess = [];
      resSuccess.push();
      toastrCRUDSuccess(modelName, TEXT_POST);
      refresh();
      setDataExcel([]);
    } catch (error) {
      toastrErrorAlert(language.error);
    }
  };

  const onHandleAllotment = () => {
    if (selectedRows.size) {
      setValue("salesTeam", "");
      setValue("salesStaff", "");
      setEmployee({});
      setEmployeeGroup({});
      setOpenModalAllotment(true);
      return;
    }
    history.push("lead-allotment", { modelName: modelName });
  };

  const handleCancelTransactionWithDraw = () => {
    const requests = [];
    selectedRows.forEach(index => {
      if (!fields[index].objectId) return;
      requests.push({
        method: "PUT",
        path: `/parse/classes/${modelName}/${fields[index].objectId}`,
        body: {
          status: "canceled",
        },
      });
    });

    httpService
      .post("/parse/batch", { requests })
      .then(json => {
        refresh();
        let resultsSuccess = 0;
        let resultsError = 0;
        json.forEach(item => {
          if (item?.success) {
            resultsSuccess++;
            return;
          }
          resultsError++;
        });
        if (!resultsSuccess !== 0) {
          toastrSuccessAlert(
            `Huỷ ${resultsSuccess} giao dịch rút tiền thành công!`
          );
        }
        if (resultsError !== 0) {
          toastrSuccessAlert(
            `Huỷ ${resultsError} giao dịch rút tiền thất bại!`
          );
        }
      })
      .catch(() => {
        toastrSuccessAlert(language.error);
      });

    setToggleCancelTransactionWithDraw(false);
  };
  const handleCompletedTransactionWithDraw = () => {
    const requests = [];
    selectedRows.forEach(index => {
      if (!fields[index].objectId) return;
      requests.push({
        method: "PUT",
        path: `/parse/classes/${modelName}/${fields[index].objectId}`,
        body: {
          status: "completed",
        },
      });
    });

    httpService
      .post("/parse/batch", { requests })
      .then(json => {
        refresh();
        let resultsSuccess = 0;
        let resultsError = 0;
        json.forEach(item => {
          if (item?.success) {
            resultsSuccess++;
            return;
          }
          resultsError++;
        });
        if (!resultsSuccess !== 0) {
          toastrSuccessAlert(
            `Chuyển trạng thái hoàn thành ${resultsSuccess} giao dịch rút tiền thành công!`
          );
        }
        if (resultsError !== 0) {
          toastrSuccessAlert(
            `Chuyển trạng thái hoàn thành ${resultsError} giao dịch rút tiền thất bại!`
          );
        }
      })
      .catch(() => {
        toastrSuccessAlert(language.error);
      });

    setToggleCompletedTransactionWithDraw(false);
  };

  const handleCancelAllotment = () => {
    const requests = [];

    selectedRows.forEach(index => {
      if (!fields[index].objectId) return;
      requests.push({
        method: "PUT",
        path: `/parse/classes/Employee/${fields[index].objectId}`,
        body: {
          isActive: false,
        },
      });
    });

    httpService
      .post("/parse/batch", { requests })
      .then(json => {
        refresh();
        let resultsSuccess = 0;
        let resultsError = 0;
        json.forEach(item => {
          if (item?.success) {
            resultsSuccess++;
            return;
          }
          resultsError++;
        });
        if (!resultsSuccess !== 0) {
          toastrSuccessAlert(
            `Khoá tài khoản nhân viên thành công ${resultsSuccess} `
          );
        }
        if (resultsError !== 0) {
          toastrSuccessAlert(
            `Khoá tài khoản nhân viên thất bại ${resultsError}`
          );
        }
      })
      .catch(() => {
        toastrSuccessAlert(language.error);
      });
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(() => {})();
      if (!_.isEmpty(errors)) {
        return;
      }
      return getValues();
    },
    formProps: value => {
      return formProps;
    },
  }));

  return (
    <React.Fragment>
      <Row>
        <div className="subHeaderQueryReports d-flex align-items-center text-capitalize">
          {typeof title == "string" ? (
            <h4 className="my-0 font-size-18 text-capitalize">{title}</h4>
          ) : (
            title
          )}
          <div className="flex-grow-1" />
          <div
            style={{ zIndex: 100 }}
            className="d-flex justify-content-between align-items-center"
          >
            {filter &&
              !filterCol.searchOptions &&
              (filterCol.type === "number" ||
                filterCol.type === "string" ||
                filterCol.type === "model") && (
                <CommonInput
                  onChange={e => handleInputSearch(e, filterCol)}
                  name="filter"
                  {...formProps}
                ></CommonInput>
              )}

            {filter && filterCol.searchOptions && (
              <>
                <SelectConst
                  key={filterCol?.searchOptionsFetched}
                  onChange={e => handleInputSearch(e, filterCol)}
                  options={
                    filter?.defaultValue === "deposit"
                      ? [
                          { text: "Nạp tiền", value: "deposit" },
                          { text: "Chuyển khoản/Tiền mặt", value: "pay" },
                        ]
                      : filter?.defaultValue === "withdraw"
                      ? [
                          { text: "Rút tiền", value: "withdraw" },
                          { text: "Tất toán sớm", value: "refund" },
                        ]
                      : filterCol.searchOptionsFetched
                  }
                  emptyOption="Toàn bộ"
                  name="filter"
                  {...formProps}
                />
                <div style={{ width: "12px", height: "12px" }}></div>
              </>
            )}

            {selectedRows.size && showCancelAllotment ? (
              <CommonButton
                level={2}
                onClick={handleCancelAllotment}
                className="text-capitalize"
                type="button"
              >
                Khóa tài khoản
              </CommonButton>
            ) : null}

            {selectedRows.size && !disableDelete ? (
              <CommonButton
                level={2}
                onClick={toggleModal}
                className="text-capitalize"
                type="button"
              >
                <i className="dripicons-trash"></i>
              </CommonButton>
            ) : null}

            {!!selectedRows.size && (enableInlineEdit || !disableDelete) && (
              <CommonButton level={2} onClick={handleCancelChange}>
                Hủy
              </CommonButton>
            )}

            {!!selectedRows?.size && enableInlineEdit && !disableBtnSave && (
              <CommonButton
                level={0}
                onClick={handleSubmit(handleSaveEdits, validateOnlySelectedRow)}
                type="button"
              >
                Lưu
              </CommonButton>
            )}
            {!!selectedRows.size &&
              enableConfirmWithDraw &&
              filter?.defaultValue === "withdraw" && (
                <>
                  <CommonButton
                    level={3}
                    type="button"
                    onClick={() => {
                      setToggleCompletedTransactionWithDraw(true);
                    }}
                  >
                    Hoàn thành
                  </CommonButton>
                  <CommonButton
                    level={4}
                    type="button"
                    onClick={() => {
                      setToggleCancelTransactionWithDraw(true);
                    }}
                  >
                    Huỷ giao dịch
                  </CommonButton>
                </>
              )}

            {helperButtons.map(
              (item, index) =>
                (!item.onlyInEditMode || selectedRows.size > 0) && (
                  <item.component
                    key={index}
                    {...formProps}
                    componentProps={item.componentProps}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                )
            )}
            {!disableAdd && (
              <CommonButton
                level={0}
                type="button"
                className="text-capitalize"
                onClick={enableInlineEdit ? handleAddInline : handleAddInPage}
              >
                Thêm
              </CommonButton>
            )}
            {showAllotmentLead && (
              <CommonButton onClick={onHandleAllotment}>Phân bổ</CommonButton>
            )}

            {!disableSearch && (
              <CommonButton
                level={enableSearch ? 0 : 1}
                onClick={() => {
                  setEnableSearch(!enableSearch);
                }}
                type="button"
              >
                <i className="dripicons-search"></i>
              </CommonButton>
            )}

            {showImportExcel && (
              <VVSExcel
                modelName={modelName}
                onOutputExcels={setDataExcel}
                template={template}
              />
            )}

            {dataExcel.length !== 0 && (
              <div className="d-flex" style={{ gap: 10 }}>
                <CommonButton
                  type="button"
                  style={{ margin: "10px 5px 10px 0px" }}
                  onClick={handleImportToServer}
                >
                  {language.save_data_import}
                </CommonButton>
              </div>
            )}

            {showExportExcel &&
              (roles?.includes("Admin") || roles?.includes("Accountant")) && (
                <CommonButton onClick={handleOnExport}>
                  <i className="bx bx-import"></i>
                </CommonButton>
              )}
          </div>
        </div>
      </Row>
      <Spacer size={12} />
      <Row>
        <Col md="12">
          <Card
            body
            className={`table-responsive-md ${className || ""}`}
            style={styleViewTopTable}
          >
            <Spacer size={12} />
            <table className="table align-middle table-nowrap table-hover">
              <thead className="table-dark">
                <tr>
                  {(enableInlineEdit || !disableDelete) && (
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
                  {tblCols
                    .filter(
                      col =>
                        (!col.hiddenInNormalMode && !selectedRows.size) ||
                        (selectedRows.size && !col.hiddenInEditMode)
                    )
                    .map((col, index) => (
                      <th key={index} tabIndex="0">
                        <div className={"d-flex " + headerAlign(col.textAlign)}>
                          {col.text}
                          {col.type !== "model" && !col.disableSort && (
                            <div
                              className="order ms-2"
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
                            </div>
                          )}
                        </div>

                        {!col.disableSearch &&
                          enableSearch &&
                          !col.searchOptions &&
                          (col.type === "number" ||
                            col.type === "string" ||
                            col.type === "model") && (
                            <CommonInput
                              onChange={e => handleInputSearch(e, col)}
                            ></CommonInput>
                          )}
                        {!col.disableSearch &&
                          enableSearch &&
                          col.searchOptions && (
                            <SelectConst
                              onChange={e => handleInputSearch(e, col)}
                              options={col.searchOptionsFetched}
                              emptyOption="Toàn bộ"
                            />
                          )}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {dataExcel.map((row, i) => {
                  return (
                    <tr
                      key={i}
                      style={{ cursor: "pointer" }}
                      onClick={e => handleOnRowClick(e, row, i)}
                      onDoubleClick={() =>
                        onRowDoubleClick
                          ? onRowDoubleClick(row)
                          : handleOnRowDoubleClick(row, i)
                      }
                      className={chosenRow == i ? "table-secondary" : ""}
                    >
                      {(enableInlineEdit || !disableDelete) && (
                        <td className="selection-cell">
                          <input type="checkbox"></input>
                        </td>
                      )}

                      <td
                        className="text-center"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        {pagingInfo.startIndex + i}
                      </td>

                      {tblCols.map((col, index) => {
                        return (
                          <td
                            key={index + "dsadsadsa"}
                            className="position-relative text-wrap"
                            style={{
                              maxWidth: "20em",
                              textAlign: col.textAlign || "left",
                            }}
                          >
                            <span>{row[col?.field]}</span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {fields.map((row, index) => (
                  <tr
                    key={index}
                    onClick={e => handleOnRowClick(e, row, index)}
                    onDoubleClick={() =>
                      onRowDoubleClick
                        ? onRowDoubleClick(row)
                        : handleOnRowDoubleClick(row, index)
                    }
                    className={chosenRow == index ? "table-secondary" : ""}
                    style={{ cursor: "pointer" }}
                  >
                    {(enableInlineEdit || !disableDelete) && (
                      <td className="selection-cell">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(index)}
                          onChange={e => handleCheckBoxClick(e, index)}
                          onClick={e => {
                            e.stopPropagation();
                          }}
                          onDoubleClick={e => {
                            e.stopPropagation();
                          }}
                        ></input>
                      </td>
                    )}

                    <td className="text-center">
                      {pagingInfo.startIndex + index + dataExcel?.length}
                    </td>
                    {tblCols
                      .filter(
                        col =>
                          (!col.hiddenInNormalMode && !selectedRows.size) ||
                          (selectedRows.size && !col.hiddenInEditMode)
                      )
                      .map(col => (
                        <td
                          key={col.field + index}
                          className="position-relative text-wrap"
                          style={{
                            maxWidth: "20em",
                            textAlign: col.textAlign || "left",
                          }}
                        >
                          {(selectedRows.has(index) &&
                            enableInlineEdit &&
                            col.editInlineOptions && (
                              <col.editInlineOptions.cellComponent
                                errors={errors}
                                name={`${modelName}.${index}.${col.field}`}
                                rowName={`${modelName}.${index}`}
                                options={col.searchOptionsFetched}
                                {...formProps}
                                {...col.editInlineOptions.cellComponentProps(
                                  formProps,
                                  `${modelName}.${index}`
                                )}
                              />
                            )) || (
                            <span>
                              {col.formatter
                                ? col.formatter(
                                    cellValue(col, index),
                                    getValues(`${modelName}.${index}`)
                                  )
                                : cellValue(col, index)}
                            </span>
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {isLoading && (
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
                <div className="spinner-border text-info" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {!fields.length && !dataExcel.length && !isLoading && (
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
          </Card>
        </Col>
      </Row>
      {pagingInfo.pageIndexes.length > 1 && (
        <div className="inner-custom-pagination d-flex col">
          <div className="col-sm-12 col-md-5">
            <div
              className="dataTables_info"
              id="datatable-buttons_info"
              role="status"
              aria-live="polite"
            >
              <select
                className="d-custom-pagination-select"
                onChange={e => handleUpdateItemPerPage(e.target.value)}
              >
                {[10, 15, 20, 30, 40].map((number, index) => (
                  <option value={number} key={index}>
                    {number}
                  </option>
                ))}
              </select>
              <i className="bx bxs-down-arrow"></i>
              <span>
                {`${pagingInfo.startIndex}-${
                  pagingInfo.endIndex - 1
                } trên tổng ${pagingInfo.total} hàng`}
              </span>
            </div>
          </div>
          <nav className="text-md-right ms-auto">
            <ul className="pagination react-bootstrap-table-page-btns-ul">
              {pagingInfo.pageIndexes.map((page, index) => (
                <li
                  className={`page-item ${
                    pagingInfo.pageIndex === page - 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageClick(page)}
                  key={index}
                >
                  {renderPageInPagination(page)}
                </li>
              ))}
            </ul>
          </nav>
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
            style={{ fontSize: 16, fontWeight: "normal", marginLeft: "16px" }}
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
            disabled={!selectedRows.size}
            type="button"
          >
            Xóa
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
      <ModalCommon
        modalTitle="Phân bổ nhân viên"
        isShowModal={openModalAllotment}
        onClose={() => {
          setOpenModalAllotment(false);
        }}
      >
        <ModalBody>
          <Spacer size={20} />
          <Row>
            <Col sm={6}>
              <VVSSelectModel
                name="salesTeam"
                model="EmployeeGroup"
                {...formProps}
                conditionField={{ isActive: true }}
                onSelect={setEmployeeGroup}
                placeholder={language_vn.chooseGroup}
              />
            </Col>
            <Col sm={6}>
              <VVSSelectModel
                name="salesStaff"
                model="Employee"
                {...formProps}
                conditionField={{
                  ...(employeeGroup?.objectId && {
                    group: {
                      objectId: employeeGroup?.objectId,
                      className: "EmployeeGroup",
                      __type: "Pointer",
                    },
                  }),
                  isActive: true,
                }}
                onSelect={setEmployee}
                placeholder={language_vn.chooseEmployee}
              />
            </Col>
          </Row>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={2}
            onClick={() => {
              setOpenModalAllotment(false);
            }}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={0}
            onClick={handleAllotmentSelected}
            disabled={!selectedRows.size}
            type="button"
          >
            Phân bổ
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
      <ModalCommon
        modalTitle="Huỷ giao dịch"
        isShowModal={toggleCancelTransactionWithDraw}
        onClose={() => setToggleCancelTransactionWithDraw(false)}
      >
        <ModalBody className="px-2">
          <CommonText
            style={{ fontSize: 16, fontWeight: "normal" }}
            level={0}
            className=""
          >
            Tác vụ không thể hoàn tác
          </CommonText>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => setToggleCancelTransactionWithDraw(false)}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleCancelTransactionWithDraw}
            type="button"
          >
            Xác nhận
          </CommonButton>
        </ModalFooter>
      </ModalCommon>

      <ModalCommon
        modalTitle="Hoàn thành"
        isShowModal={toggleCompletedTransactionWithDraw}
        onClose={() => setToggleCompletedTransactionWithDraw(false)}
      >
        <ModalBody className="px-2">
          <CommonText
            style={{ fontSize: 16, fontWeight: "normal" }}
            level={0}
            className=""
          >
            Chuyển trạng thái thành Đã hoàn thành
          </CommonText>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => setToggleCompletedTransactionWithDraw(false)}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleCompletedTransactionWithDraw}
            type="button"
          >
            Xác nhận
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </React.Fragment>
  );
});

export default VVSTable;

VVSTable.propTypes = {
  name: PropTypes.string,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  whereQuery: PropTypes.object,
  defaultRowValue: PropTypes.object,
  beforeSaveInlineEdit: PropTypes.func,
  enableInlineEdit: PropTypes.bool,
  disableAdd: PropTypes.bool,
  disableSearch: PropTypes.bool,
  disableDelete: PropTypes.bool,
  title: PropTypes.any,
  triggerRerender: PropTypes.bool,
  filter: PropTypes.object,
  helperButtons: PropTypes.array,
  className: PropTypes.string,
  showImportExcel: PropTypes.bool,
  fieldsDownload: PropTypes.array,
  showExportExcel: PropTypes.bool,
  styleViewTopTable: PropTypes.object,
  pointer: PropTypes.string,
  showAllotmentLead: PropTypes.bool,
  template: PropTypes.array,
  enableConfirmWithDraw: PropTypes.bool,
  routingPath: PropTypes.string,
  showCancelAllotment: PropTypes.bool,
  disableBtnSave: PropTypes.bool,
  resetValueTable: PropTypes.array,
  onCallbackData: PropTypes.func,
};
