import { createSlice } from "@reduxjs/toolkit";
import { commonHandleHttpMethodGet } from "helpers/erp_helper";
import { GET_SYSCFG } from "helpers/url_helper";
import { find } from "lodash";
import "toastr/build/toastr.min.css";

export const fetchSysCfg = commonHandleHttpMethodGet(
  "sysCfgSlice/fetchSysCfg",
  GET_SYSCFG
);

const initialState = {
  loading: false,
  fetched: false,
  branch: [],
  employmentType: [],
  department: [],
  salutation: [],
  healthInsuranceProvider: [],
  employmentGrade: [],
  holidays: [],
  designation: [],
  gender: [],
  shiftType: [],
  taskStatus: [],
  priority: [],
  currency: [],
  uom: [],
  menu: [],
  marketSegments: [],
  industryTypes: [],
  currency: [],
  country: [],
  postCategory: [],
  taxCategories: [],
  contractType: [],
  month: [],
  accountType: [],
  modeOfPayment: [],
  dueDateType: [],
  discountType: [],
  rootType: [],
  bankTransaction: [],
  refDocumentType: [],
  refDocumentType: [],
  journalEntryType: [],
};

const sysCfgSlice = createSlice({
  name: "sysCfgSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSysCfg.fulfilled]: (state, action) => {
      state.salutation = find(action.payload, { Code: "Salutation" }).Values;
      state.employmentType = find(action.payload, {
        Code: "EmploymentType",
      }).Values;
      state.branch = find(action.payload, { Code: "Branch" }).Values;
      state.menu = find(action.payload, { Code: "Menu" }).Values;
      state.department = find(action.payload, { Code: "Department" }).Values;
      state.healthInsuranceProvider = find(action.payload, {
        Code: "HealthInsuranceProvider",
      }).Values;
      state.employmentGrade = find(action.payload, {
        Code: "EmploymentGrade",
      }).Values;
      state.holidays = find(action.payload, { Code: "Holiday" }).Values;
      state.designation = find(action.payload, {
        Code: "Designation",
      }).Values;
      state.gender = find(action.payload, { Code: "Gender" }).Values;
      state.shiftType = find(action.payload, { Code: "ShiftType" }).Values;
      state.taskStatus = find(action.payload, { Code: "TaskStatus" }).Values;
      state.priority = find(action.payload, { Code: "Priority" }).Values;
      state.currency = find(action.payload, { Code: "Currency" }).Values;
      state.uom = find(action.payload, { Code: "UOM" }).Values;
      state.marketSegments = find(action.payload, {
        Code: "MarketSegment",
      }).Values;

      state.industryTypes = find(action.payload, {
        Code: "IndustryType",
      }).Values;
      state.currency = find(action.payload, { Code: "Currency" }).Values;
      state.country = find(action.payload, { Code: "Country" }).Values;

      state.taxCategories = find(action.payload, {
        Code: "TaxCategory",
      }).Values;
      state.contractType = find(action.payload, {
        Code: "Labour",
      }).Values;

      state.month = find(action.payload, {
        Code: "Month",
      }).Values;

      state.accountType = find(action.payload, {
        Code: "AccountType",
      }).Values;

      state.modeOfPayment = find(action.payload, {
        Code: "ModeOfPayment",
      }).Values;
      state.dueDateType = find(action.payload, {
        Code: "DueDateType",
      }).Values;
      state.discountType = find(action.payload, {
        Code: "DiscountType",
      }).Values;
      state.rootType = find(action.payload, {
        Code: "RootType",
      }).Values;

      // state.bankTransaction = find(action.payload, {
      //   Code: "BankTransaction",
      // }).Values;
      state.refDocumentType = find(action.payload, {
        Code: "RefDocumentType",
      }).Values;
      // state.journalEntryType = find(action.payload, {
      //   Code: "JournalEntryType",
      // }).Values;

      state.fetched = true;
    },
  },
});

const { actions, reducer } = sysCfgSlice;
export default reducer;
export const {} = actions;
