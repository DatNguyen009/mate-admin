import { Type } from "react-bootstrap-table2-editor";
import toastr from "toastr";

import BagdeStatus from "components/Common/BagdeStatus";
import React from "react";
export const DATA_YOUR_SHORTCUTS_PAYROLL = [
  {
    id: 1,
    path: "/salary-structure",
    title: "Salary Structure",
    typeBadge: "active",
    titleBadge: "active",
  },
  {
    id: 2,
    path: "/payroll-entry",
    title: "Payroll Entry",
    typeBadge: "info",
    titleBadge: "pending",
  },
  {
    id: 3,
    path: "/salary-slip",
    title: "Salary Slip",
    typeBadge: "inactive",
    titleBadge: "pending",
    count: 4,
  },
  {
    id: 4,
    path: "/income-tax-slab",
    title: "Income Tax Slab",
    typeBadge: "pending",
    titleBadge: "pending",
  },
  {
    id: 5,
    path: "/query-report/Salary%20Register",
    title: "Salary Register",
    typeBadge: "dark",
    titleBadge: "pending",
  },
  {
    id: 6,
    path: "/dashboard-view/Payroll",
    title: "DashBoard",
    typeBadge: "info",
    titleBadge: "pending",
  },
];

export const DATABOXTAGS_PAYROLL = [
  {
    title: "Payroll",
    BoxTags: [
      {
        itemBoxTag: "Salary Component",
        countEmployee: [],
        path: "/salary-component",
      },
      {
        itemBoxTag: "Salary Structure",
        countEmployee: [],
        path: "/salary-structure",
      },
      {
        itemBoxTag: "Salary Structure Assignment",
        countEmployee: [],
        path: "/salary-structure-assignment",
      },
      {
        itemBoxTag: "Payroll Entry",
        countEmployee: [],
        path: "/payroll-entry",
      },
      {
        itemBoxTag: "Salary Slip",
        countEmployee: [],
        path: "/salary-slip",
      },
    ],
  },
  {
    title: "Taxation",
    BoxTags: [
      {
        itemBoxTag: "Payroll Period",
        countEmployee: [],
        path: "/payroll-period",
      },
      {
        itemBoxTag: "Income Tax Slab",
        countEmployee: [],
        path: "/income-tax-slab",
      },
      {
        itemBoxTag: "Employee Other Income",
        countEmployee: [],
        path: "/employee-other-income",
      },
      {
        itemBoxTag: "Employee Tax Exemption Declaration",
        countEmployee: [],
        path: "/employee-tax-exemption-declaration",
      },
      {
        itemBoxTag: "Employee Tax Exemption Proof Submission",
        countEmployee: [],
        path: "/employee-tax-exemption-proof-submission",
      },
      {
        itemBoxTag: "Employee Tax Exemption Category",
        countEmployee: [],
        path: "/employee-tax-exemption-category",
      },
      {
        itemBoxTag: "Employee Tax Exemption Sub Category",
        countEmployee: [],
        path: "/employee-tax-exemption-sub-category",
      },
    ],
  },
  {
    title: "Compensations",
    BoxTags: [
      {
        itemBoxTag: "Additional Salary",
        countEmployee: [],
        path: "/additional-salary",
      },
      {
        itemBoxTag: "Retention Bonus",
        countEmployee: [],
        path: "/retention-bonus",
      },
      {
        itemBoxTag: "Employee Incentive",
        countEmployee: [],
        path: "/employee-incentive",
      },
      {
        itemBoxTag: "Employee Benefit Application",
        countEmployee: [],
        path: "/employee-benefit-application",
      },
      {
        itemBoxTag: "Employee Benefit Claim",
        countEmployee: [],
        path: "/employee-benefit-claim",
      },
    ],
  },

  {
    title: "Reports",
    BoxTags: [
      {
        itemBoxTag: "Salary Register",
        countEmployee: [],
        path: "/query-report/Salary Register",
      },
      {
        itemBoxTag: "Salary Payments Based On Payment Mode",
        countEmployee: [],
        path: "/query-report/Salary Payments Based On Payment Mode",
      },
      {
        itemBoxTag: "Salary Payments via ECS",
        countEmployee: [],
        path: "/query-report/Salary Payments via ECS",
      },
      {
        itemBoxTag: "Income Tax Deductions",
        countEmployee: [],
        path: "/query-report/Income Tax Deductions",
      },
      {
        itemBoxTag: "Bank Remittance",
        countEmployee: [],
        path: "/query-report/Bank Remittance",
      },
    ],
  },
];

export const COLUMNS_TABLE_PAYROLL = [
  {
    path: "payroll-entry",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },

      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
      {
        dataField: "currency",
        text: "Currency",
        sort: true,
      },
      {
        dataField: "Branch",
        text: "Branch",
        sort: true,
      },
      {
        dataField: "postingDate",
        text: "Posting Date",
        sort: true,
      },
    ],
  },

  {
    path: "salary-component",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "abbr",
        text: "Abbr",
        sort: true,
      },
      {
        dataField: "description",
        text: "Description",
        sort: true,
      },
    ],
  },

  {
    path: "salary-structure",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "isActive",
        text: "isActive",
      },

      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
      {
        dataField: "payrollFrequency",
        text: "Payroll Frequency",
        sort: true,
      },
    ],
  },
  {
    path: "salary-structure-assignment",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },

      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "salaryStructure.name",
        text: "Salary Structure",
        sort: true,
      },
    ],
  },
  {
    path: "salary-slip",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "postingDate",
        text: "Posting Date",
        sort: true,
      },
      {
        dataField: "payrollFrequency",
        text: "Payroll Frequency",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee ID",
        sort: true,
      },

      {
        dataField: "employee.designation",
        text: "Designation",
        sort: true,
      },

      // {
      //   dataField: "payrollFrequency",
      //   text: "Payroll Frequency",
      //   sort: true,
      // },
    ],
  },
  {
    path: "salary-component",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "abbr",
        text: "Abbr",
        sort: true,
      },
      {
        dataField: "description",
        text: "Description",
        sort: true,
      },
    ],
  },
  {
    path: "payroll-period",
    columnsPage: [
      {
        dataField: "payrollPeriodName",
        text: "Name",
        sort: true,
      },
      {
        dataField: "company",
        text: "Company",
        sort: true,
      },
      {
        dataField: "startDate",
        text: "Start Date",
        sort: true,
      },
      {
        dataField: "endDate",
        text: "End Date",
        sort: true,
      },
    ],
  },
  {
    path: "income-tax-slab",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "effectiveFrom",
        text: "Effective from",
        sort: true,
      },
    ],
  },
  {
    path: "employee-other-income",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "payrollPeriod.payrollPeriodName",
        text: "Payroll Period",
        sort: true,
      },
      {
        dataField: "amount",
        text: "Amount",
        sort: true,
      },
      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
    ],
  },
  {
    path: "employee-tax-exemption-declaration",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "payrollPeriod.payrollPeriodName",
        text: "Payroll Period",
        sort: true,
      },
    ],
  },
  {
    path: "employee-tax-exemption-proof-submission",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "payrollPeriod.payrollPeriodName",
        text: "Payroll Period",
        sort: true,
      },
    ],
  },
  {
    path: "employee-tax-exemption-category",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "maxExemptionAmount",
        text: "Max Exemption Amount",
        sort: true,
      },
    ],
  },
  {
    path: "employee-tax-exemption-sub-category",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "taxExemptionCategory.name",
        text: "Tax Exemption Category",
        sort: true,
      },
      {
        dataField: "maxExemptionAmount",
        text: "Max Exemption Amount",
        sort: true,
      },
    ],
  },
  {
    path: "employee-benefit-application",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "date",
        text: "Date",
        sort: true,
      },
      {
        dataField: "payrollPeriod.payrollPeriodName",
        text: "Payroll Period",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
    ],
  },
  {
    path: "employee-benefit-claim",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "claimDate",
        text: "Claim Date",
        sort: true,
      },
      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
      ,
    ],
  },
  {
    path: "additional-salary",
    columnsPage: [
      {
        dataField: "series",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "salaryComponent.name",
        text: "Salary Component",
        sort: true,
      },
      {
        dataField: "amount",
        text: "Amount",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Salary Register",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "taxExemptionCategory",
        text: "Tax Exemption Category",
        sort: true,
      },
      {
        dataField: "maxExemptionAmount",
        text: "Max Exemption Amount",
        sort: true,
      },
    ],
  },
  {
    path: "retention-bonus",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "bonusPaymentDate",
        text: "Bonus Payment Date",
        sort: true,
      },
      {
        dataField: "bonusAmount",
        text: "Bonus Amount ",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Salary Payments Based On Payment Mode",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "taxExemptionCategory",
        text: "Tax Exemption Category",
        sort: true,
      },
      {
        dataField: "maxExemptionAmount",
        text: "Max Exemption Amount",
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "emloyee",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "bonusPaymentDate",
        text: "Bonus Payment Date",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Salary Payments via ECS",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "taxExemptionCategory",
        text: "Tax Exemption Category",
        sort: true,
      },
      {
        dataField: "maxExemptionAmount",
        text: "Max Exemption Amount",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Income Tax Deductions",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "taxExemptionCategory",
        text: "Tax Exemption Category",
        sort: true,
      },
      {
        dataField: "maxExemptionAmount",
        text: "Max Exemption Amount",
        sort: true,
      },
    ],
  },
  {
    path: "query-report/Bank Remittance",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "taxExemptionCategory",
        text: "Tax Exemption Category",
        sort: true,
      },
      {
        dataField: "maxExemptionAmount",
        text: "Max Exemption Amount",
        sort: true,
      },
    ],
  },
  {
    path: "employee-incentive",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "employee.firstName",
        text: "Employee Name",
        sort: true,
      },
      {
        dataField: "employee.employeeId",
        text: "Employee",
        sort: true,
      },
    ],
  },
];

export const TITLE_STATUS_PAYROLL = {
  payrollPeriod: "payroll-period",
  employeeOtherIncome: "employee-other-income",
};

export const DATA_TABLE_COMMON_PAYROLL = [
  {
    tableName: "Accounts",
    columns: [
      {
        dataField: "company",
        text: "Company",
      },
      {
        dataField: "account",
        text: "Account",
      },
    ],
  },
  {
    tableName: "Taxable Salary Slabs",
    columns: [
      {
        dataField: "fromAmount",
        text: "From Amount",
        validator: newValue => {
          if (isNaN(newValue)) {
            return toastr.error("From Amount should be numeric");
          }
        },
      },
      {
        dataField: "toAmount",
        text: "To Amount",
        validator: newValue => {
          if (isNaN(newValue)) {
            return toastr.error("To Amount should be numeric");
          }
        },
      },
      {
        dataField: "percentDeduction",
        text: "Percent Deduction",
        validator: newValue => {
          if (isNaN(newValue)) {
            return toastr.error("Percent Deduction should be numeric");
          }
        },
      },
      {
        dataField: "condition",
        text: "Condition",
      },
    ],
  },
  {
    tableName: "Taxes and Charges on Income Tax ",
    columns: [
      {
        dataField: "description",
        text: "Description",
      },
      {
        dataField: "percent",
        text: "percent",
      },
      {
        dataField: "minTaxableIncome",
        text: "Min Taxable Income",
      },
      {
        dataField: "maxTaxableIncome",
        text: "Max Taxable Income",
      },
    ],
  },
  {
    tableName: "Declarations",
    columns: [
      {
        dataField: "exemptionSubCategory",
        text: "Exemption Sub Category",
      },
      {
        dataField: "exemptionCategory",
        text: "Exemption Category",
      },
      {
        dataField: "maximumExemptedAmount",
        text: "Maximum Exempted Amount",
      },
      {
        dataField: "declaredAmount",
        text: "Declared Amount",
      },
    ],
  },
  {
    tableName: "Tax Exemption Proofs",
    columns: [
      {
        dataField: "exemptionSubCategory",
        text: "Exemption Sub Category",
      },
      {
        dataField: "exemptionCategory",
        text: "Exemption Category",
      },
      {
        dataField: "maximumExemptedAmount",
        text: "Maximum Exempted Amount",
      },
      {
        dataField: "typeOfProof",
        text: "Type of Proof",
      },
      {
        dataField: "actualAmount",
        text: "Actual Amount",
      },
    ],
  },
  {
    tableName: "Employee Details",
    columns: [
      {
        dataField: "employee",
        text: "Employee",
      },
      {
        dataField: "employeeName",
        text: "Employee Name",
      },
      {
        dataField: "department",
        text: "Department",
      },
      {
        dataField: "designation",
        text: "Designation",
      },
    ],
  },
  {
    tableName: "Earnings, Deductions",
    columns: [
      {
        dataField: "earningComponent",
        text: "Component",
      },
      {
        dataField: "abbr",
        text: "Abbr",
      },
      {
        dataField: "amount",
        text: "Amount",
      },
      {
        dataField: "statisticalComponent",
        text: "Statistical Component",
        editor: {
          type: Type.CHECKBOX,
          value: "Yes:No",
        },
      },
      {
        dataField: "formula",
        text: "Formula",
        editor: {
          type: Type.TEXTAREA,
        },
      },
    ],
  },
  {
    tableName: "Employee Benefits",
    columns: [
      {
        dataField: "earningComponent",
        text: "Earning Component",
      },
      {
        dataField: "maxBenefitAmount",
        text: "Max Benefit Amount",
      },
      {
        dataField: "amount",
        text: "Amount",
        validator: value => {
          if (isNaN(value)) {
            return toastr.error("Amount should be numeric");
          }
        },
      },
    ],
  },
  {
    tableName: "Deductions",
    columns: [
      {
        dataField: "deductionsComponent",
        text: "Component",
      },
      {
        dataField: "abbr",
        text: "Abbr",
      },
      {
        dataField: "amount",
        text: "Amount",
      },
      {
        dataField: "statisticalComponent",
        text: "Statistical Component",
        editor: {
          type: Type.CHECKBOX,
          value: "Yes:No",
        },
      },
      {
        dataField: "formula",
        text: "Formula",
        editor: {
          type: Type.TEXTAREA,
        },
      },
    ],
  },
];

export const DATA_FILTER_TABLE_PAYROLL = [
  {
    id: "salary-component",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "payroll-entry",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "payroll-period",
    isFilterDate: false,
    isFilterSearch: true,
  },

  {
    id: "salary-structure",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "salary-slip",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "income-tax-slab",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-other-income",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "salary-structure-assignment",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-tax-exemption-declaration",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-tax-exemption-proof-submission",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-tax-exemption-category",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-tax-exemption-sub-category",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-benefit-application",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "additional-salary",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "employee-benefit-claim",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "retention-bonus",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "query-report/Salary Register",
    isFilterDate: true,
    isFilterSearch: true,
  },
  {
    id: "query-report/Salary Payments Based On Payment Mode",
    isFilterDate: true,
    isFilterSearch: true,
  },
  {
    id: "query-report/Salary Payments via ECS",
    isFilterDate: true,
    isFilterSearch: true,
  },
  {
    id: "query-report/Income Tax Deductions",
    isFilterDate: true,
    isFilterSearch: true,
  },
  {
    id: "employee-incentive",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "query-report/Bank Remittance",
    isFilterDate: false,
    isFilterSearch: true,
  },
];
