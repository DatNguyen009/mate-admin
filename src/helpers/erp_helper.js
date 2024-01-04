import { createAsyncThunk } from "@reduxjs/toolkit";
import BagdeStatus from "components/Common/BagdeStatus";
import React from "react";
import httpService from "services/httpService";
import { useHistory } from "react-router-dom";
import moment from "moment";
import RatingTooltip from "react-rating-tooltip";
import * as Yup from "yup";
import AvatarCommon from "components/Common/AvatarCommon";
import { CommonText } from "components/Common/TextCommon";
import styled from "styled-components";
import { Card, Col, Row } from "reactstrap";
import CardCollapse from "components/Common/CardCollapse";
import InputField from "components/form-control/InputField";
import _ from "lodash";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import SelectConst from "components/form-control/SelectConst";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import VVSAddress2 from "components/Common/VVSAddress2";
import { uploadFilesApi } from "apis/file";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import { language_vn } from "helpers/language_vn";

export const createOrUpdateRowInModel = async (url, id, data, type) => {
  try {
    if (type.toLowerCase() === "create") {
      const res = await httpService.post(url, data);
      return res;
    }
    if (type.toLowerCase() === "update") {
      const res = await httpService.put(`${url}/${id}`, data);
      return res;
    }
  } catch (error) {
    toastrErrorAlert(language_vn.error);
  }
};

export const checkIsJSON = text => {
  if (!text) return false;
  if (
    /^[\],:{}\s]*$/.test(
      text
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const uploadImg = async file => {
  if (!file) return;

  if (file.isRemove) {
    await httpService.delete(`/parse/files/${file.name}`, {
      headers: {
        "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
      },
    });
    return null;
  }

  const results = await uploadFilesApi([file]);
  return results[0];
};

export const getLastItemInUrl = () => {
  const history = useHistory();
  const splitUrl = history.location.pathname.split("/");
  const title = splitUrl[splitUrl.length - 1].replaceAll("-", " ");
  return title;
};

export const getSeries = (list, key) => {
  const year = moment().year(moment().year()).format("YY");
  const month = moment().month(moment().month()).format("MM");

  const index =
    Math.max(
      0,
      ...list.map(item => {
        const seriesSplited = item.series.split("-");
        return seriesSplited[seriesSplited.length - 1];
      })
    ) + 1;
  const series = `${key}-${year}-${month}-${index}`;
  return series;
};

export const commonHandleHttpMethodGet = (name, url) => {
  return createAsyncThunk(name, async (params, thunkAPI) => {
    if (params) {
      const response = await httpService.get(`${url}/${params}`);
      return response;
    }
    const response = await httpService.get(url);
    return response?.results || response;
  });
};

export const formatData = (datas, fieldName) => {
  const checkData = datas && datas.length > 0;
  if (checkData) {
    const labels = datas.map(data =>
      data[fieldName[0]] && data[fieldName[0]].length > 0
        ? data[fieldName[0]]
        : "online"
    );
    const dataNumber = datas.map(data => data[fieldName[1]] || 0);

    return {
      labels,
      datasets: [
        {
          backgroundColor: addColorChart(dataNumber),
          data: dataNumber,
          label: "",
        },
      ],
    };
  }
  return {};
};

export const addColorChart = arrayData => {
  let arrayColor = [];
  for (let i = 0; i < arrayData.length; i++) {
    arrayColor.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
  return arrayColor;
};

export const commonHandleHttpMethodGetByParams = (name, url) => {
  return createAsyncThunk(name, async (params, thunkAPI) => {
    try {
      const response = await httpService.get(url, {
        params: {
          where: params,
        },
      });
      return response.results;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
};

export const commonHandleHttpMethodPost = (name, url) => {
  return createAsyncThunk(name, async (params, thunkAPI) => {
    const response = await httpService.post(url, params);
    return response;
  });
};

export const commonHandleHttpMethodPostV2 = (name, url) => {
  return createAsyncThunk(name, async (params, thunkAPI) => {
    const { data, refresh } = params;
    const response = await httpService.post(url, data);
    if (refresh) thunkAPI.dispatch(refresh());
    return response;
  });
};

export const commonHandleHttpMethodPut = (name, url) => {
  return createAsyncThunk(name, async (params, thunkAPI) => {
    const response = await httpService.put(`${url}/${params[1]}`, params[0]);
    return response;
  });
};

export const commonHandleHttpMethodPutV2 = (name, url) => {
  return createAsyncThunk(name, async (params, thunkAPI) => {
    const { dataItem, dataId, refresh } = params;
    const response = await httpService.put(`${url}/${dataId}`, dataItem);
    if (refresh) thunkAPI.dispatch(refresh());
    return response;
  });
};

export const commonHandleHttpMethodDelete = (name, url) => {
  return createAsyncThunk(name, async (params, thunkAPI) => {
    const response = await httpService.delete(`${url}/${params}`);
    return response;
  });
};

export const commonHandleHttpMethodMultipleDelete = (name, url) => {
  return createAsyncThunk(
    name,
    async ({ itemObjectIds, refresh }, thunkAPI) => {
      const requests = itemObjectIds.map(id => ({
        method: "DELETE",
        path: `${url}/${id}`,
      }));

      const response = await httpService.post("/parse/batch", { requests });
      thunkAPI.dispatch(refresh());
      return response;
    }
  );
};

export const getUserRole = async () => {
  const currentUser = await httpService.get("/parse/users/me");

  if (!currentUser) {
    localStorage.removeItem("authUser");
    window.location.href = document.location.origin + "/login";
    return;
  }

  const userRole = await httpService.get(
    `/parse/roles?where={"users": {"__type":"Pointer", "className":"_User","objectId": "${currentUser.objectId}"}}`
  );
  return userRole.results.map(role => role.name);
};

export const checkAdmin = async () => {
  const { objectId } = await httpService.get("/parse/users/me");
  const roleList = await httpService.get(
    `/parse/roles?where={"name":"Admin","users": {"__type":"Pointer","className":"_User","objectId":"${objectId}"}}`
  );
  return roleList.results.length > 0;
};

export const initializationIndex = (data, name) => {
  return (
    Math.max(
      0,
      ...data.map(item => {
        const seriesSplited = item[name].split("-");
        return seriesSplited[seriesSplited.length - 1];
      })
    ) + 1
  );
};

export const generateCode = async (modelName, fieldName) => {
  const modelUrl = `/parse/classes/${modelName}?limit=50&order=-createdAt`;
  const modelList = (await httpService.get(modelUrl)).results;
  if (modelName === "Employee" && !modelList.length) {
    return "MNV000001";
  }
  if (modelName === "Customer" && !modelList.length) {
    return "MKH000001";
  }
  if (modelName === "Competitor" && !modelList.length) {
    return "DT000001";
  }
  if (modelName === "Quotation" && !modelList.length) {
    return "BG000001";
  }
  if (modelName === "Campaign" && !modelList.length) {
    return "CD000001";
  }
  if (modelName === "Project" && !modelList.length) {
    return "PR000001";
  }
  const modelCodes = modelList.filter(m => m[fieldName]).map(m => m[fieldName]);

  const modelCodeSplit = modelCodes[0].split("");
  const codeHead = modelCodeSplit
    .filter(item => _.isNaN(_.parseInt(item)))
    .join("");
  const codeLength = modelCodeSplit.filter(
    item => !_.isNaN(_.parseInt(item))
  ).length;

  const codeNumbers = modelCodes.map(m => {
    const modelCodeSplit = m.split("");
    const codeNumber = modelCodeSplit
      .filter(item => !_.isNaN(_.parseInt(item)))
      .join("");
    return _.parseInt(codeNumber);
  });

  return (
    codeHead +
    _.padStart(JSON.stringify(Math.max(0, ...codeNumbers) + 1), codeLength, "0")
  );
};

export const initTaskOrderOnBoard = (data, status) => {
  return Math.max(
    0,
    ...data.map(item => {
      if (item.status !== status) return null;
      return item.order;
    })
  );
};

export const checkError = (errors, checkList) => {
  let hasError = false;
  for (let index = 0; index < checkList.length; index++) {
    if (errors.hasOwnProperty(checkList[index])) {
      return (hasError = true);
    }
  }
  return hasError;
};

export const checkExistItem = (arrayCheck, fieldCheck, value) => {
  const itemCheck = arrayCheck.find(emp => emp[fieldCheck] === value);
  return itemCheck;
};

export const convertToPointer = (arrayCheck, fieldCheck, value) => {
  const itemCheck = arrayCheck.find(item => item[fieldCheck] === value);

  if (itemCheck) {
    return {
      __type: "Pointer",
      className: itemCheck.objectClassName,
      objectId: itemCheck.objectId,
    };
  }

  return null;
};

export const numberOrNullValidation = name => {
  return Yup.number()
    .transform((val, originVal) => {
      if (!originVal) return null;
      return val;
    })
    .nullable(true)
    .typeError(`${name} must be a number`);
};

export const formatNumber = number => {
  if (!number) return "";
  return number
    .toString()
    .replaceAll(".", "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const roundedMoney = number => {
  return Math.round(number / 1000) * 1000;
};
export const formatProductVariance = variance => {
  if (!variance?.objectId) return "";
  const color = `${variance.color ? "Màu: " + variance.color + ". " : ""}`;
  const size = variance.size ? "Kích cỡ: " + variance.size + ". " : "";
  const goldWeight = variance.goldWeight
    ? "Khối lượng vàng: " + variance.goldWeight + " chỉ. "
    : "";
  const stoneWeight = variance.stoneWeight
    ? "Khối lượng đá: " + variance.stoneWeight + " chỉ. "
    : "";
  const totalWeight = variance.totalWeight
    ? "Khối lượng tổng: " + variance.totalWeight + " chỉ. "
    : "";
  return `${color}${size}${goldWeight}${stoneWeight}${totalWeight}`;
};

export const isUniqueArr = (arr, fieldCheck) => {
  var tmpArr = [];
  for (var obj in arr) {
    if (tmpArr.indexOf(arr[obj][fieldCheck]) < 0) {
      tmpArr.push(arr[obj][fieldCheck]);
    } else {
      return arr[obj];
    }
  }
  return true;
};

export const translateAccount = (account, isCustomer) => {
  if (!account) return;
  switch (account.type) {
    case "wallet":
      return "Ví cá nhân";
    case "saving":
      return "Ví tích luỹ";
    case "bank":
      return (account.name = `${
        account.bank?.Name ? account.bank.Name + ". " : ""
      }${account.accountNumber ? "STK: " + account.accountNumber : ""}`);
    default:
      return "";
  }
};
export const renderForm = (form, rest, errors) => {
  const renderFields = fieldItem => {
    const { type, name, targetClass, label } = fieldItem;

    switch (type) {
      case "Pointer": {
        return (
          <VVSSelectModel
            name={`${name}.text`}
            id={`${name}.objectId`}
            model={targetClass}
            errors={errors}
            {...fieldItem}
            {...rest}
          />
        );
      }
      case "Date": {
        return (
          <InputField
            {...fieldItem}
            {...rest}
            errors={errors}
            type="datetime-local"
          />
        );
      }
      case "Boolean": {
        return (
          <div style={{ height: 95 }} className="d-flex">
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
      case "Select": {
        return <SelectConst {...fieldItem} {...rest} errors={errors} />;
      }
      case "Address": {
        return <VVSAddress2 {...fieldItem} {...rest} errors={errors} />;
      }
      default: {
        return <InputField {...fieldItem} {...rest} errors={errors} />;
      }
    }
  };

  return form.map(block => {
    const { id, type, fields, title, cols } = block;

    if (type === "collapse") {
      return (
        <CardCollapse
          title={title}
          key={id}
          element={
            <Row>
              {Object.entries(fields).map(([fieldName, value]) => (
                <Col xs={12 / cols} key={fieldName}>
                  {renderFields(value)}
                </Col>
              ))}
            </Row>
          }
        />
      );
    }

    return (
      <Card body key={id}>
        {title && (
          <CommonText level={1} className="m-0">
            {title}
          </CommonText>
        )}
        <Row>
          {Object.entries(fields).map(([fieldName, value]) => (
            <Col xs={12 / cols} key={fieldName}>
              {renderFields(value)}
            </Col>
          ))}
        </Row>
      </Card>
    );
  });
};

export const generateYupSchema = (form, yup) => {
  if (!form) return;

  const requiredFields = _.filter(
    _.flatten(
      form.map(block => Object.values(block.fields).map(field => field))
    ),
    field => field.required
  );
  const modelSchemas = requiredFields.reduce((objSchema, currentField) => {
    const { required, name, type, label } = currentField;

    if (required && type === "Pointer") {
      objSchema[name] = yup.lazy(value =>
        typeof value === "object"
          ? yup
              .object()
              .required(`${_.startCase(label)} is required!`)
              .typeError(`${_.startCase(label)} is required!`)
          : yup.string().required(`${label} is required!`)
      );
      return objSchema;
    }

    if (required && type === "Number") {
      objSchema[name] = yup
        .number()
        .typeError(`${label} must be a number`)
        .nullable()
        .moreThan(0, "Floor area cannot be negative")
        .transform((_, val) => (val !== "" ? Number(val) : null));
      return objSchema;
    }

    if (required) {
      objSchema[name] = yup.string().required(`${label} is required!`);
      return objSchema;
    }

    return objSchema;
  }, {});

  return modelSchemas;
};
export const parseNumber = value => {
  if (!value) return null;
  if (typeof value === "string" && value?.includes(".")) {
    return Number(value.replaceAll(".", ""));
  }
  return Number(value);
};
export const splitFullName = fullName => {
  if (!fullName) {
    return { firstName: "", lastName: "" };
  }
  let firstName = fullName.split(" ").slice(0, -1).join(" ");
  let lastName = fullName.split(" ").slice(-1).join(" ");
  return { firstName, lastName };
};

export const countTimeSince = date => {
  if (!date) return "";

  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " năm";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " tháng";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút";
  }

  if (Math.floor(seconds) <= 60) return "vừa xong";

  return Math.floor(seconds) + " giấy";
};

export const getFileType = fileName => {
  if (!fileName) return null;

  const extension = (fileName?.split(".")?.pop() + "").toUpperCase();
  switch (extension) {
    case "PNG":
    case "JPG":
    case "JPEG":
      return { type: "image", extension: extension.toLowerCase() };

    case "XLSX":
    case "DOCX":
    case "DOC":
    case "PDF":
      return { type: "file", extension: extension.toLowerCase() };

    default:
      return null;
  }
};

export const options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "3000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export const newEmployee = (
  values,
  splitUrl,
  textEditor,
  dataTableEQ,
  dataTablePWE,
  dataTableHIC,
  companys,
  employeeId,
  objectId,
  series
) => {
  const companySelected = companys.find(
    company => company.name === values.company
  );
  return {
    firstName: values.firstName,
    middleName: values.middleName,
    lastName: values.lastName,
    fullName: `${values.lastName} ${values.middleName} ${values.firstName}`,
    dob: values.dateOfBirth,
    doj: values.dateOfJoin,
    status: values.status,
    gender: values.gender,
    designation: "Engineer",
    employeeId: objectId ? series.id : employeeId,
    series: objectId ? series.id : employeeId,
    company: {
      objectId: companySelected?.objectId,
      __type: "Pointer",
      className: "Company",
    },
    salutation: values.salutation,
    employmentType: values.employmentType,
    emergencyContact: {
      relation: values.emergencyContactRelation,
      name: values.emergencyContactName,
      phone: values.emergencyContactPhone,
    },
    erpNextUser: values.userID,
    joiningInfo: {
      jobApplicant: values.jobApplicant,
      confirmationDate: values.contractEndDate,
      offerDate: values.offerDate,
      date: values.confirmationDate,
      contractEndDate: values.contractEndDate,
      notice: values.notice,
      dateOfRetirement: values.dateOfRetirement,
    },
    departmentAndGrade: {
      department: values.department,
      grade: values.grade,
      designation: values.designation,
      branch: values.branch,
      reportsTo: values.reportsTo,
    },
    approvers: {
      expenseApprover: values.expenseApprover,
      leaveApprover: values.leaveApprover,
      shiftRequestApprover: values.shiftRequestApprover,
    },
    attendanceAndLeaveDetails: {
      attendanceDeviceID: values.attendanceDeviceID,
      holidayList: values.holidayList,
      defaultShift: values.defaultShift,
    },
    salary: {
      mode: values.model,
      bankName: "",
      accountNo: "",
      payrollCostCenter: values.payrollCostCenter,
    },
    contactDetail: {
      phone: values.contactDetailPhone,
      personalEmail: values.contactDetailPesonalEmail,
      permanentAddressIs: values.contactDetailPermanentAddressIs,
      currentAddressIs: values.contactDetailCurrentAddressIs,
      preferedContactEmail: values.contactDetailPrederedContactEmail,
      companyEmail: values.contactDetailCompanyEmail,
      permanentAddress: values.permanentAddress,
      currentAddress: values.currentAddress,
    },
    personalBio: {
      content: textEditor,
    },
    healthInsurance: {
      healthInsuranceProvider: values.healthInsuranceProvider,
    },
    personalDetails: {
      passportNumber: values.passportNumber,
      familyBackground: values.familyBackground,
      doI: values.doI,
      validUpto: values.validUpto,
      healthDetails: values.healthDetails,
      poI: values.poI,
      maritalStatus: values.maritalStatus,
      bloodGroup: values.bloodGroup,
    },
    educationalQualifications: dataTableEQ,
    previousWorkExperience: dataTablePWE,
    historyInCompany: dataTableHIC,
    exit: {
      regignationLetterDate: values.regignationLetterDate,
      relievingDate: values.relievingDate,
      reasonForLeaving: values.reasonForLeaving,
      leaveEncashed: values.leaveEncashed,
      exitInterviewHeldOn: values.exitInterviewHeldOn,
      newWorkplace: values.newWorkplace,
      feedback: values.feedback,
    },
    contracts: values.contracts,
  };
};

export const initialNewEmployee = inforEmployeeById => {
  return {
    id: inforEmployeeById?.id || "",
    series: inforEmployeeById?.employeeId || "HR-EMP-",
    company: "Vastbit",
    firstName: inforEmployeeById?.firstName || "",
    middleName: inforEmployeeById?.middleName || "",
    lastName: inforEmployeeById?.lastName || "",
    status: inforEmployeeById?.status || "",
    gender: inforEmployeeById?.gender || "",
    dateOfBirth: inforEmployeeById?.dob || "",
    dateOfJoin: inforEmployeeById?.doj || "",
    salutaion: inforEmployeeById?.salutation || "",
    employmentType: inforEmployeeById?.employmentType || "",
    emergencyContactName: inforEmployeeById.emergencyContact?.name || "",
    emergencyContactPhone: inforEmployeeById.emergencyContact?.phone || "",
    emergencyContactRelation:
      inforEmployeeById.emergencyContact?.relation || "",
    userID: "",

    jobApplicant: inforEmployeeById?.joiningInfo?.jobApplicant || "",
    confirmationDate: inforEmployeeById?.joiningInfo?.confirmationDate || "",
    offerDate: inforEmployeeById?.joiningInfo?.offerDate || "",
    date: inforEmployeeById?.joiningInfo?.date || "",
    contractEndDate: inforEmployeeById?.joiningInfo?.contractEndDate || "",
    notice: inforEmployeeById?.joiningInfo?.notice || "",
    dateOfRetirement: inforEmployeeById?.joiningInfo?.dateOfRetirement || "",

    department: inforEmployeeById?.departmentAndGrade?.department || "",
    grade: inforEmployeeById?.departmentAndGrade?.grade || "",
    designation: inforEmployeeById?.departmentAndGrade?.designation || "",
    branch: inforEmployeeById?.departmentAndGrade?.branch || "",
    reportsTo: inforEmployeeById?.departmentAndGrade?.reportsTo || "",

    expenseApprover: inforEmployeeById?.approvers?.expenseApprover || "user_id",
    leaveApprover: inforEmployeeById?.approvers?.leaveApprover || "",
    shiftRequestApprover: inforEmployeeById?.approvers?.shift || "",

    attendanceDeviceID:
      inforEmployeeById?.attendanceAndLeaveDetails?.attendanceDeviceID || "",
    holidayList:
      inforEmployeeById?.attendanceAndLeaveDetails?.holidayList || "",
    defaultShift:
      inforEmployeeById?.attendanceAndLeaveDetails?.defaultShift || "",

    model: inforEmployeeById?.salary?.mode || "",
    payrollCostCenter: inforEmployeeById?.salary?.payrollCostCenter || "",

    healthInsuranceProvider:
      inforEmployeeById?.healthInsurance?.healthInsuranceProvider || "",

    contactDetailPhone:
      inforEmployeeById?.contactDetail?.contactDetailPhone || "",
    contactDetailPrederedEmail:
      inforEmployeeById?.contactDetail?.preferedContactEmail || "",
    contactDetailPesonalEmail:
      inforEmployeeById?.contactDetail?.personalEmail || "",
    contactDetailCompanyEmail:
      inforEmployeeById?.contactDetail?.companyEmail || "",
    permanentAddressIs:
      inforEmployeeById?.contactDetail?.permanentAddressIs || "",
    currentAddressIs: inforEmployeeById?.contactDetail?.currentAddressIs || "",
    permanentAddress: inforEmployeeById?.contactDetail?.permanentAddress || "",
    currentAddress: inforEmployeeById?.contactDetail?.currentAddress || "",

    passportNumber: inforEmployeeById?.personalDetails?.passportNumber || "",
    doI: inforEmployeeById?.personalDetails?.doI || "",
    validUpto: inforEmployeeById?.personalDetails?.validUpto || "",
    poI: inforEmployeeById?.personalDetails?.poI || "",
    maritalStatus: inforEmployeeById?.personalDetails?.maritalStatus || "",
    bloodGroup: inforEmployeeById?.personalDetails?.bloodGroup || "",
    familyBackground:
      inforEmployeeById?.personalDetails?.familyBackground || "",
    healthDetails: inforEmployeeById?.personalDetails?.healthDetails || "",

    regignationLetterDate: inforEmployeeById?.exit?.regignationLetterDate || "",
    relievingDate: inforEmployeeById?.exit?.relievingDate || "",
    reasonForLeaving: inforEmployeeById?.exit?.reasonForLeaving || "",
    leaveEncashed: inforEmployeeById?.exit?.leaveEncashed || "",
    exitInterviewHeldOn: inforEmployeeById?.exit?.exitInterviewHeldOn || "",
    newWorkplace: inforEmployeeById?.exit?.newWorkplace || "",
    feedback: inforEmployeeById?.exit?.feedback || "",
    contracts: [],
  };
};

export const handleUpdateDataTable = (
  column,
  dataTable,
  setDataTable,
  newValue,
  row,
  pathName
) => {
  if (!newValue) return;

  const object = column?.editor?.options.find(i => i.value === newValue);
  const objectClone = [...dataTable];
  const findIdDataTable = dataTable.findIndex(i => i.id === row.id);
  if (column?.editor && column.dataField === "employee") {
    objectClone[findIdDataTable].employeeName = object.item[0].firstName;
    objectClone[findIdDataTable].department =
      object.item[0].departmentAndGrade.department;
    objectClone[findIdDataTable].designation = object.item[0].designation;
    setDataTable(objectClone);
    return;
  }

  if (column?.editor && column.dataField === "component") {
    objectClone[findIdDataTable].abbr = object.item[0].abbr;
    objectClone[findIdDataTable].amount = object.item[0].amount;
    objectClone[findIdDataTable].maxBenefitAmount =
      object.item[0].maxBenefitAmount;
    setDataTable(objectClone);
    return;
  }

  if (column?.editor && column.dataField === "exemptionSubCategory") {
    objectClone[findIdDataTable].exemptionCategory =
      object?.item[0].taxExemptionCategory?.name;
    objectClone[findIdDataTable].maximumExemptedAmount =
      object?.item[0].maxExemptionAmount;
    setDataTable(objectClone);
    return;
  }

  if (column?.editor && column.dataField === "earningComponent") {
    objectClone[findIdDataTable].abbr = object.item[0].abbr;
    objectClone[findIdDataTable].amount = object.item[0].amount;
    objectClone[findIdDataTable].maxBenefitAmount =
      object.item[0].maxBenefitAmount;
    setDataTable(objectClone);
    return;
  }
  if (column?.editor && column.dataField === "deductionsComponent") {
    objectClone[findIdDataTable].abbr = object.item[0].abbr;
    objectClone[findIdDataTable].amount = object.item[0].amount;
    objectClone[findIdDataTable].maxBenefitAmount =
      object.item[0].maxBenefitAmount;
    setDataTable(objectClone);
    return;
  }
  if (column?.editor && column.dataField === "task") {
    objectClone[findIdDataTable].subject = object.item[0].subject;
    objectClone[findIdDataTable].objectId = object.item[0].objectId;
    setDataTable(objectClone);
    return;
  }

  if (column?.editor && column.dataField === "user") {
    objectClone[findIdDataTable].username = object.item[0].username;
    setDataTable(objectClone);
    return;
  }
  if (column?.editor && column.dataField === "product") {
    const { sellingPrice, objectId } = object.item[0];
    const objectRow = objectClone[findIdDataTable];
    objectRow.price = sellingPrice;
    objectRow.quantity = 1;
    objectRow.total = objectRow.price * objectRow.quantity;
    objectRow.objectId = objectId;
    setDataTable(objectClone);
    return;
  }
  if (column?.editor && column.dataField === "username") {
    const objectRow = objectClone[findIdDataTable];
    objectRow.fullName = object.item[0].fullName;
    objectRow.status = object.item[0].status;
    setDataTable(objectClone);
    return;
  }

  if (
    column?.editor &&
    (column.dataField === "activityType" ||
      column.dataField === "hrs" ||
      column.dataField === "IsBillable")
  ) {
    const objectRow = objectClone[findIdDataTable];
    objectRow.billingRate = object.item[0].defaultBillingRate;
    objectRow.activityTypeObjId = object.item[0].objectId;
    objectRow.costingRate = object.item[0].defaultCostingRate;
    if (objectRow.activityType === "" || isNaN(objectRow.hrs)) {
      objectRow.totalBillableAmount = 0;
      objectRow.totalCostingAmount = 0;
    } else {
      objectRow.totalBillableAmount = objectRow.hrs * objectRow.billingRate;
      objectRow.totalCostingAmount = objectRow.hrs * objectRow.costingRate;
    }
    setDataTable(objectClone);
    return;
  }

  if (
    column?.editor &&
    column.dataField === "itemCode" &&
    pathName === "sales-order"
  ) {
    const rowData = object.item[0];
    row.quantity = 1;
    row.rate = rowData.valuationRate * 1;
    row.amount = row.quantity * row.rate;
    setDataTable(objectClone);
    return;
  }

  if (
    column?.editor &&
    (column.dataField === "activityType" ||
      column.dataField === "hrs" ||
      column.dataField === "IsBillable")
  ) {
    const objectRow = objectClone[findIdDataTable];
    objectRow.billingRate = object.item[0].defaultBillingRate;
    objectRow.activityTypeObjId = object.item[0].objectId;
    objectRow.costingRate = object.item[0].defaultCostingRate;
    if (objectRow.activityType === "" || isNaN(objectRow.hrs)) {
      objectRow.totalBillableAmount = 0;
      objectRow.totalCostingAmount = 0;
    } else {
      objectRow.totalBillableAmount = objectRow.hrs * objectRow.billingRate;
      objectRow.totalCostingAmount = objectRow.hrs * objectRow.costingRate;
    }
    setDataTable(objectClone);
    return;
  }
  if (
    column?.editor &&
    pathName === "voucher" &&
    (column.dataField === "brand" || column.dataField === "category")
  ) {
    const { objectId } = object.item[0];
    const objectRow = objectClone[findIdDataTable];
    objectRow.objectId = objectId;
    setDataTable(objectClone);
    return;
  }

  if (
    column?.editor &&
    pathName === "journal-entry-template" &&
    column.dataField === "account"
  ) {
    const { objectId } = object.item[0];
    const objectRow = objectClone[findIdDataTable];
    objectRow.objectId = objectId;
    setDataTable(objectClone);
    return;
  }
};

export const handleUpdateRow = (
  column,
  dataTable,
  setDataTable,
  newValue,
  row,
  pathName
) => {
  if (!newValue) return;

  const objectClone = [...dataTable];
  const findIdDataTable = dataTable.findIndex(i => i.id === row.id);

  if (column.dataField === "quantity" && pathName === "sales-order") {
    if (isNaN(newValue)) {
      row.quantity = 1;
    }
    row.amount = row.quantity * row.rate;
    setDataTable(objectClone);
    return;
  }

  if (column.dataField === "rate" && pathName === "sales-order") {
    if (isNaN(newValue)) {
      row.rate = 0;
    }

    row.amount = row.quantity * row.rate;
    setDataTable(objectClone);
    return;
  }

  if (column.dataField === "quantity") {
    const objectRow = objectClone[findIdDataTable];
    objectRow.total = objectRow.price * (objectRow.quantity * 1);
    setDataTable(objectClone);
    return;
  }
};

export const getRandomArbitrary = num => {
  return Math.floor(Math.random() * num);
};

export const RedirectDetailPage = (infor, path, history) => {
  if (!path.search("employee/")) {
    return history.push(`/employee-contract/${infor.code}`, { infor });
  }
  switch (path) {
    case "employee": {
      return history.push(`/employee/${infor.series}`, {
        infor,
      });
    }

    case "salary-component": {
      return history.push(`/salary-component/${infor.name}`, {
        infor,
      });
    }

    case "salary-structure": {
      return history.push(`/salary-structure/${infor.name}`, {
        infor,
      });
    }

    case "employee-group": {
      return history.push(
        `/employee-group/${infor.name.replaceAll(" ", "-")}`,
        {
          infor: infor,
        }
      );
    }
    case "opportunity": {
      return history.push(`/opportunity/${infor.objectId}`, { infor });
    }

    case "project": {
      return history.push(`/project/${infor.name}`, { infor });
    }

    case "customer": {
      return history.push(`/customer/${infor.customerId}`);
    }
    case "appointment": {
      return history.push(`/appointment/${infor.objectId}`, { infor });
    }

    case "attendance": {
      return history.push(`/attendance/${infor.series}`, {
        infor,
      });
    }
    case "salary-structure-assignment": {
      return history.push(`/salary-structure-assignment/${infor.name}`, {
        infor,
      });
    }
    case "payroll-entry": {
      return history.push(`/payroll-entry/${infor.name}`, {
        infor,
      });
    }
    case "salary-slip": {
      return history.push(`/salary-slip/${infor.name}`, {
        infor,
      });
    }
    case "employee-skill-map": {
      return history.push(`employee-skill-map/${infor.objectId}`);
    }
    case "employee-promotion": {
      return history.push(`employee-promotion/${infor.objectId}`);
    }

    case "shift-type": {
      return history.push(`shift-type/${infor.objectId}`, { infor });
    }

    case "shift-request": {
      return history.push(`shift-request/${infor.name}`, { infor });
    }

    case "shift-assignment": {
      return history.push(`shift-assignment/${infor.name}`, { infor });
    }

    case "item": {
      return history.push(`item/${infor.itemCode}`, { infor });
    }
    case "payroll-period": {
      return history.push(`/payroll-period/${infor.payrollPeriodName}`, {
        infor,
      });
    }

    case "employee-tax-exemption-category": {
      return history.push(`/employee-tax-exemption-category/${infor.name}`);
    }

    case "employee-benefit-claim": {
      return history.push(`/employee-benefit-claim/${infor.name}`);
    }

    case "employee-tax-exemption-sub-category": {
      return history.push(
        `/employee-tax-exemption-sub-category/${infor.name}`,
        { infor }
      );
    }
    case "retention-bonus": {
      return history.push(`/retention-bonus/${infor.name}`, { infor });
    }

    case "job-opening": {
      return history.push(
        `/job-opening/${infor.jobTitle.replaceAll(" ", "-")}`,
        { infor }
      );
    }

    case "job-offer": {
      return history.push(`/job-offer/${infor.series}`, { infor });
    }

    case "job-applicant-source": {
      return history.push(
        `/job-applicant-source/${infor.name.replaceAll(" ", "-")}`,
        { infor }
      );
    }

    case "customer-group": {
      return history.push(`/customer-group/${infor.objectId}`, { infor });
    }
    case "item-attribute": {
      return history.push(`/item-attribute/${infor.objectId}`, { infor });
    }

    case "territory": {
      return history.push(`/territory/${infor.objectId}`, { infor });
    }

    case "employee-other-income": {
      return history.push(`/employee-other-income/${infor.name}`);
    }

    case "additional-salary": {
      return history.push(`/additional-salary/${infor.series}`);
    }
    case "job-applicant": {
      return history.push(`/job-applicant/${infor.name.replaceAll(" ", "-")}`, {
        infor,
      });
    }
    case "terms-and-conditions": {
      return history.push(
        `/terms-and-conditions/${infor.title.replaceAll(" ", "-")}`,
        {
          infor,
        }
      );
    }
    case "income-tax-slab": {
      return history.push(`/income-tax-slab/${infor.name}`);
    }
    case "employee-tax-exemption-declaration": {
      return history.push(`/employee-tax-exemption-declaration/${infor.name}`);
    }
    case "employee-tax-exemption-proof-submission": {
      return history.push(
        `/employee-tax-exemption-proof-submission/${infor.name}`
      );
    }

    case "employee-grade": {
      return history.push(
        `/employee-grade/${infor.name.replaceAll(" ", "-")}`,
        {
          infor,
        }
      );
    }

    case "leave-type": {
      return history.push(`/leave-type/${infor.name}`);
    }

    case "leave-period": {
      return history.push(`/leave-period/${infor.name}`);
    }

    case "leave-application": {
      return history.push(`/leave-application/${infor.series}`);
    }

    case "leave-policy": {
      return history.push(`/leave-policy/${infor.name}`);
    }

    case "leave-policy-assignment": {
      return history.push(`/leave-policy-assignment/${infor.name}`);
    }

    case "leave-allocation": {
      return history.push(`/leave-allocation/${infor.series}`);
    }

    case "leave-block-list": {
      return history.push(`/leave-block-list/${infor.name}`);
    }

    case "leave-encashment": {
      return history.push(`/leave-encashment/${infor.name}`);
    }

    case "compensatory-leave-request": {
      return history.push(`/compensatory-leave-request/${infor.name}`);
    }

    case "department": {
      return history.push(`/department/${infor.name}`);
    }

    case "employee-onboarding-template": {
      return history.push(`/employee-onboarding-template/${infor.series}`, {
        infor,
      });
    }

    case "employee-onboarding": {
      return history.push(`/employee-onboarding/${infor.series}`, {
        infor,
      });
    }
    case "material-request": {
      return history.push(`/material-request/${infor.series}`, {
        infor,
      });
    }

    case "grievance-type": {
      return history.push(
        `/grievance-type/${infor.name.replaceAll(" ", "-")}`,
        {
          infor,
        }
      );
    }

    case "employee-incentive": {
      return history.push(`/employee-incentive/${infor.name}`);
    }

    case "price-list": {
      return history.push(`/price-list/${infor.priceListName}`);
    }

    case "employee-benefit-application": {
      return history.push(`/employee-benefit-application/${infor.name}`);
    }

    case "employee-separation-template": {
      return history.push(`/employee-separation-template/${infor.series}`, {
        infor,
      });
    }

    case "project-type": {
      return history.push(`/project-type/${infor.name}`, {
        infor,
      });
    }

    case "employee-separation": {
      return history.push(`/employee-separation/${infor.series}`, {
        infor,
      });
    }

    case "attendance-request": {
      return history.push(`/attendance-request/${infor.series}`, {
        infor,
      });
    }

    case "task": {
      return history.push(`/task/${infor.name}`);
    }

    case "task-type": {
      return history.push(`/task-type/${infor.name}`);
    }

    case "user": {
      return history.push(`/user/${infor.username}`);
    }
    case "employee-transfer": {
      return history.push(`employee-transfer/${infor.series}`, { infor });
    }

    case "employee-grievance": {
      return history.push(`employee-grievance/${infor.series}`, { infor });
    }

    case "posts": {
      return history.push(`posts/${infor.series}`, { infor });
    }

    case "order": {
      return history.push(`/order/${infor.name}`);
    }

    case "notification": {
      return history.push(`/notification/${infor.title}`);
    }

    case "promotional-scheme": {
      return history.push(`promotional-scheme/${infor.series}`, { infor });
    }
    case "voucher": {
      return history.push(`voucher/${infor.series}`, { infor });
    }

    case "warehouse": {
      return history.push(`warehouse/${infor.name}`, { infor });
    }
    default:
      break;
  }
};

export const formaterColumn = (columnTable, history, path) => {
  return columnTable?.reduce((newArr, item) => {
    if (item.path === path) {
      const mapItem = item.columnsPage.map(i => {
        if (i.dataField === "status") {
          return {
            ...i,
            formatter: (cell, row) => {
              return <BagdeStatus typeBadge={cell} titleBadge={cell} key={i} />;
            },
          };
        }

        if (i.dataField === "enabled" && path === "price-list") {
          return {
            ...i,
            formatter: (cell, row) => {
              return (
                <BagdeStatus
                  typeBadge={cell ? "inactive" : "active"}
                  titleBadge={cell ? "inactive" : "active"}
                  key={i}
                />
              );
            },
          };
        }

        if (i.dataField === "fullName" && path === "employee") {
          return {
            ...i,
            formatter: (cell, row) => (
              <span
                key={i}
                onClick={() => RedirectDetailPage(row, path, history)}
              >
                {`${row.firstName} ${row.middleName} ${row.lastName}`}
              </span>
            ),
          };
        }

        if (i.dataField === "startDate" && path) {
          return {
            ...i,
            formatter: cell => <span>{cell?.iso.slice(0, 10)}</span>,
          };
        }

        if (i.dataField === "endDate" && path) {
          return {
            ...i,
            formatter: cell => <span>{cell?.iso.slice(0, 10)}</span>,
          };
        }

        if (i.dataField === "attachment" && path) {
          return {
            ...i,
            formatter: cell => {
              const Container = styled.div`
                position: relative;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                gap: 10px;

                width: fit-content;
                padding: 0.4rem 0.6rem;

                border-radius: 6px;
                border: 1px solid #c2c2c238;
                background-color: #fff;
                box-shadow: 2px 2px 3px 0px #00000042;

                .delete-icon-box {
                  opacity: 0;
                  transition: all 0.2s;
                }

                &:hover {
                  .delete-icon-box {
                    opacity: 1;
                  }
                }
              `;

              const isFileImg = type => {
                const fileType = type.split(".")[1];
                return ["png", "jpeg", "jpg", "gif", "tiff", "raw"].includes(
                  fileType.toLowerCase()
                );
              };

              const truncateFileName = (name, maxLength = 10) => {
                if (name.length < maxLength + 3) return name;

                const nameSplit = name.split(".");
                const fileExtension = nameSplit[nameSplit.length - 1];
                const truncateName = name.substring(0, maxLength);
                return `${truncateName}... .${fileExtension}`;
              };

              return (
                <Container>
                  <div>
                    {isFileImg(cell?.name) ? (
                      <AvatarCommon
                        style={{ borderRadius: 4 }}
                        config={{
                          size: 38,
                          borderWidth: 2,
                          borderColor: "black",
                        }}
                        src={cell.url}
                      />
                    ) : (
                      <i className="far fa-file fa-3x" />
                    )}
                  </div>
                  <div>
                    <CommonText mt={0}>
                      {truncateFileName(cell.name)}
                    </CommonText>
                  </div>
                </Container>
              );
            },
          };
        }

        if (i.dataField === "fullName" && path === "attendance") {
          return {
            ...i,
            formatter: (cell, row) => (
              <span onClick={() => RedirectDetailPage(row, path, history)}>
                {`${row.employee?.firstName} ${row.employee?.middleName} ${row.employee?.lastName}`}
              </span>
            ),
          };
        }

        if (i.dataField === "attendanceDate" && path === "attendance") {
          return {
            ...i,
            formatter: (cell, row) => <span>{row.date.iso.slice(0, 10)}</span>,
          };
        }

        if (i.dataField === "amount" && path === "additional-salary") {
          return {
            ...i,
            formatter: (cell, row) => <span key={i}>VND {row.amount}</span>,
          };
        }

        if (i.dataField === "rate" && path === "job-applicant") {
          return {
            ...i,
            formatter: cell => (
              <div className="applicant_rating">
                <RatingTooltip
                  max={5}
                  defaultRating={cell}
                  ActiveComponent={<i className="mdi mdi-star text-primary" />}
                  InActiveComponent={
                    <i className="mdi mdi-star-outline text-muted" />
                  }
                  disabled
                />
              </div>
            ),
          };
        }

        if (i.dataField === "disable" && path === "terms-and-conditions") {
          return {
            ...i,
            formatter: (cell, row) => (
              <div className="applicant_rating">
                <BagdeStatus
                  typeBadge={row.disabled ? "dark" : "info"}
                  titleBadge={row.disabled ? "Disabled" : "Enabled"}
                />
              </div>
            ),
          };
        }

        if (i.dataField === "disabled" && path === "terms-and-conditions") {
          return {
            ...i,
            formatter: (cell, row) => (
              <input
                type="checkbox"
                name="disabled"
                defaultChecked={row.disabled ? true : false}
                disabled
              />
            ),
          };
        }

        if (i.dataField === "date" && path === "employee-grievance") {
          return {
            ...i,
            formatter: cell => <span>{cell.iso.slice(0, 10)}</span>,
          };
        }

        if (i.dataField === "disabled" && path === "warehouse") {
          return {
            ...i,
            formatter: cell => {
              return (
                <BagdeStatus
                  typeBadge={cell ? "inactive" : "active"}
                  titleBadge={cell ? "inactive" : "active"}
                  key={i}
                />
              );
            },
          };
        }

        if (i.dataField === "appliesToCompany" && path === "leave-block-list") {
          return {
            ...i,
            formatter: (cell, row) => (
              <input type="checkbox" checked={cell} disabled />
            ),
          };
        }

        if (i.dataField === "isCarryForward" && path === "leave-type") {
          return {
            ...i,
            formatter: (cell, row) => (
              <input type="checkbox" checked={cell} disabled />
            ),
          };
        }

        if (i.dataField === "createdAt" && path === "item") {
          return {
            ...i,
            formatter: (cell, row) => (
              <span>{moment(cell).format("YYYY-MM-DD")}</span>
            ),
          };
        }

        if (i.dataField === "fromDate" && path === "attendance-request") {
          return {
            ...i,
            formatter: cell => <span>{cell.iso.slice(0, 10)}</span>,
          };
        }

        if (i.dataField === "toDate" && path === "attendance-request") {
          return {
            ...i,
            formatter: cell => <span>{cell.iso.slice(0, 10)}</span>,
          };
        }

        if (
          (i.dataField === "isGroup" || i.dataField === "isMilestone") &&
          path === "task"
        ) {
          return {
            ...i,
            formatter: (cell, row) => {
              return (
                <input
                  type="checkbox"
                  name="disabled"
                  defaultChecked={row[i.dataField] ? true : false}
                  disabled
                />
              );
            },
          };
        }
        if (i.dataField === "priority" && path === "task") {
          return {
            ...i,
            formatter: (cell, row) => {
              return <BagdeStatus typeBadge={cell} titleBadge={cell} key={i} />;
            },
          };
        }

        if (i.dataField === "total" && path === "order") {
          return {
            ...i,
            formatter: (cell, row) => {
              return (
                <span
                  key={i}
                  onClick={() => RedirectDetailPage(row, path, history)}
                >
                  ${cell}
                </span>
              );
            },
          };
        }

        if (i.dataField === "sentTime" && path === "notification") {
          return {
            ...i,
            formatter: (cell, row) => {
              return (
                <span
                  key={i}
                  onClick={() => RedirectDetailPage(row, path, history)}
                >
                  {moment(cell).format("YYYY-MM-DD HH:mm")}
                </span>
              );
            },
          };
        }

        if (i.dataField === "isActive" && path === "salary-structure") {
          return {
            ...i,
            formatter: cell => (
              <div className="applicant_rating">
                <BagdeStatus
                  typeBadge={cell === "yes" ? "success" : "dark"}
                  titleBadge={cell === "yes" ? "Yes" : "No"}
                />
              </div>
            ),
          };
        }

        if (i.dataField === "thumbnail" && path === "posts") {
          return {
            ...i,
            formatter: cell => (
              <AvatarCommon
                key={`key-${cell}`}
                config={{ size: 40, borderWidth: 2, circle: true }}
                src={cell?.url}
                className="circle-avatar-hover"
                alt={cell?.url}
              />
            ),
          };
        }

        if (i.dataField === "createdAt" && path === "posts") {
          return {
            ...i,
            formatter: cell => <span>{cell.slice(0, 10)}</span>,
          };
        }

        if (i.dataField === "disable" && path === "promotional-scheme") {
          return {
            ...i,
            formatter: cell => (
              <div className="applicant_rating">
                <BagdeStatus
                  typeBadge={cell === true ? "inactive" : "success"}
                  titleBadge={cell === true ? "Disable" : "Enable"}
                />
              </div>
            ),
          };
        }

        if (i.dataField === "image" && path === "promotional-scheme") {
          return {
            ...i,
            formatter: cell => (
              <AvatarCommon
                key={`key-${cell}`}
                config={{ size: 40, borderWidth: 2, circle: true }}
                src={cell}
                className="circle-avatar-hover"
                alt={cell}
              />
            ),
          };
        }

        if (i.dataField === "displayApp" && path === "voucher") {
          return {
            ...i,
            formatter: cell => (
              <input
                type="checkbox"
                name="disabled"
                defaultChecked={cell === "Yes" ? true : false}
                disabled
              />
            ),
          };
        }

        if (i.dataField === "disabled" && path === "item") {
          return {
            ...i,
            formatter: cell => {
              return (
                <BagdeStatus
                  typeBadge={cell ? "inactive" : "active"}
                  titleBadge={cell ? "inactive" : "active"}
                  key={i}
                />
              );
            },
          };
        }

        return {
          ...i,
          formatter: (cell, row) => (
            <span
              key={i}
              onClick={() => RedirectDetailPage(row, path, history)}
            >
              {cell}
            </span>
          ),
        };
      });
      newArr.push({ path: item.path, columnsPage: mapItem });
    }
    return newArr;
  }, []);
};
