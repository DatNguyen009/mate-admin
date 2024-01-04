import { combineReducers } from "redux";

// Front
import Layout from "store/layout/reducer";

// Authentication
import Login from "store/auth/login/reducer";
// import Account from "store/auth/register/reducer";
import ForgetPassword from "store/auth/forgetpwd/reducer";
import Profile from "store/auth/profile/reducer";

//E-commerce
import ecommerce from "store/e-commerce/reducer";

//Calendar
import calendar from "store/calendar/reducer";

//chat
import chat from "store/chat/reducer";

//crypto
import crypto from "store/crypto/reducer";

//invoices
import invoices from "store/invoices/reducer";

//projects
import projects from "store/projects/reducer";
import ActivityType from "./slices/Projects/activityType";

//tasks
import tasks from "store/tasks/reducer";

//contacts
import contacts from "store/contacts/reducer";

//mails
import mails from "store/mails/reducer";

//Dashboard
import Dashboard from "store/dashboard/reducer";

//Dasboard saas
import DashboardSaas from "store/dashboard-saas/reducer";

//Redux Toolkit
//Employee reducer
import Employee from "./slices/Employee/EmployeeSlice";
import EmployeeGroup from "./slices/Employee/EmployeeGroupSlide";
import Branch from "./slices/Branch/BranchSlide";
import LayoutToolkit from "./slices/Layout/LayoutSlice";
import SysCfgToolkit from "./slices/SysCfgSlice/SysCfgSlice";
import EmployeeSkillMap from "./slices/Employee/EmployeeSkillMapSlice";
import EmployeePromotion from "./slices/Employee/EmployeePromotionSlice";
import HrSetting from "./slices/Employee/HrSettingSlice";
import EmailTemplate from "./slices/Accounting/EmailTemplateSlice";
import Contract from "./slices/Employee/ContractSlice";
import DailyWork from "./slices/Employee/DailyWorkSlice";

//Payroll
import SalaryStructure from "./slices/Payroll/SalaryStructure/salaryStructure";
import SalaryComponent from "./slices/Payroll/SalaryComponent/salaryComponent";
import AdditionalSalary from "./slices/Payroll/AdditionSalary/additionalSalary";
import EmployeeIncentive from "./slices/Payroll/EmployeeIncentive/employeeIncentive";
import EmployeeBenefitApplication from "./slices/Payroll/EmployeeBenefitApplication/employeeBenefitApplication";

//CRM Page
import Customer from "./slices/CRM/CustomerSlice";
import Appointment from "./slices/CRM/AppointmentSlice";
import Opportunity from "./slices/CRM/OpportunitySlice";
import Lead from "./slices/CRM/LeadSlice";
import Territory from "./slices/CRM/TerritorySlice";
import CustomerGroup from "./slices/CRM/CustomerGroupSlice";
import Contact from "./slices/CRM/contactSlice";
import Address from "./slices/CRM/addressSlice";

import Modal from "./slices/Modal/ModalSlice";
import Company from "./slices/Company/CompanySlide";
import SalaryStructureAssignment from "./slices/Payroll/SalaryStructureAssignment/salaryStructureAssignment";
import Department from "./slices/Department/DepartmentSlide";
import PayrollEntry from "./slices/Payroll/PayrollEntry/payrollEntry";
//Attendace
import Attendance from "./slices/Attendance/Attendance";
import AttendanceRequest from "./slices/Attendance/AttendanceRequestSlice";
import SalarySlip from "./slices/Payroll/SalarySlip/salarySlip";

//JobOpening
import JobOpening from "./slices/Employee/JobOpening/JobOpeningSlice";
import JobApplicantSource from "./slices/Employee/JobApplicantSource/JobApplicantSourceSlice";

//Tax
import PayrollPeriod from "./slices/Payroll/PayrollPeriod/payrollPeriod";
import EmployeeOtherIncome from "./slices/Payroll/EmployeeOtherIncome/employeeOtherIncome";
import JobApplicant from "./slices/Employee/JobApplicant/JobApplicantSlide";

import TermAndCondition from "./slices/Employee/TermAndCondition/TermAndConditionSlide";

import JobOffer from "./slices/Employee/JobOffer/JobOfferSlide";
import EmployeeGrade from "./slices/Employee/EmployeeGrade/EmployeeGradeSlide";
import IncomeTaxSlab from "./slices/Payroll/IncomeTaxSlab/incomeTaxSlab";
import EmployeeTaxExemptionDeclaration from "./slices/Payroll/EmployeeTaxExemptionDeclaration/employeeTaxExemptionDeclaration";
import EmployeeTaxExemptionProofSubmission from "./slices/Payroll/EmployeeTaxExemptionProofSubmission/employeeTaxExemptionProofSubmission";

//Accounting
import CostCenter from "./slices/Accounting/costCenterSlice";
import TaxWithholdingCategory from "./slices/Accounting/taxWithholdingCategorySlice";
import Account from "./slices/Accounting/AccountSlice";
import Bank from "./slices/Accounting/BankSlice";
import BankAccount from "./slices/Accounting/BankAccountSlice";
//Accoungting Master
import PaymentTerm from "./slices/Accounting/paymentTermSlice";
import FiscalYear from "./slices/Accounting/fiscalYearSlice";
import JournalEntryTemplate from "./slices/Accounting/JournalEntryTemplateSlice";

import LeaveBlockList from "./slices/Leave/leaveBlockListSlice";
import EmployeeOnboardingTemplate from "./slices/Employee/EmployeeOnboardingTemplate/EmployeeOnboardingTemplateSlide";
import EmployeeSeparationTemplate from "./slices/Employee/EmployeeSeparationTemplate/EmployeeSeparationTemplateSlide";
import EmployeeOnboarding from "./slices/Employee/EmployeeOnboarding/EmployeeOnboarding";
import EmployeeSeparation from "./slices/Employee/EmployeeSeparation/EmployeeSeparationSlice";
import EmployeeTransfer from "./slices/Employee/EmployeeTransfer/EmployeeTransferSlice";
import EmployeeGrievances from "./slices/Employee/EmployeeGrievance/EmployeeGrievanceSlice";

import EmployeeTaxExemptionCategory from "./slices/Payroll/EmployeeTaxExemptionCategory/employeeTaxExemptionCategory";
import EmployeeTaxExemptionSubCategory from "./slices/Payroll/EmployeeTaxExemptionSubCategory/employeeTaxExemptionSubCategory";
import RetentionBonus from "./slices/Payroll/RetentionBonus/retentionBonus";
import GrievanceType from "./slices/Employee/GrievanceType/GrievanceTypeSlice";

//Leave
import LeaveType from "./slices/Leave/leaveTypeSlice";
import LeavePeriod from "./slices/Leave/leavePeriodSlice";
import LeaveApplication from "./slices/Leave/leaveApplicationSlice";
import LeavePolicy from "./slices/Leave/leavePolicySlice";
import LeavePolicyAssignment from "./slices/Leave/leavePolicyAssignmentSlice";
import LeaveAllocation from "./slices/Leave/leaveAllocationSlice";
import LeaveEncashment from "./slices/Leave/leaveEncashmentSlice";
import CompensatoryLeaveRequest from "./slices/Leave/compensatoryLeaveRequestSlice";
import HolidayList from "./slices/Leave/holidayListSlice";

//Users
import User from "./slices/Users/userSlice";

import EmployeeBenefitClaim from "./slices/Payroll/EmployeeBenefitClaim/employeeBenefitClaim";
import ProjectType from "./slices/Projects/projectType";
import Project from "./slices/Projects/project";
import Task from "./slices/Projects/task";
import TaskType from "./slices/Projects/taskType";
import TaskComment from "./slices/Projects/taskComment";

//ShiftManage
import ShiftType from "./slices/Employee/ShiftManages/ShiftType";
import ShiftAssignment from "./slices/Employee/ShiftManages/ShiftAssignment";
import ShiftRequest from "./slices/Employee/ShiftManages/ShiftRequest";

//CMS
import Posts from "./slices/CMS/PostsSlice";
import Tag from "./slices/CMS/TagSlice";

//Support
import Issue from "./slices/Support/issue";
import MaterialRequest from "./slices/Stock/materialRequest";
//Items and Pricing
import Item from "./slices/Stock/ItemsAndPricing/ItemSlice";
import ItemGroup from "./slices/Stock/ItemsAndPricing/ItemGroupSlice";
import AssetCategory from "./slices/Stock/ItemsAndPricing/AssetCategorySlice";
import Promotion from "./slices/CMS/Promotion";
import Voucher from "./slices/CMS/Voucher";

//Stock
import Order from "./slices/Stock/orderSlice";
import Product from "./slices/Stock/productSlice";
import Notification from "./slices/Stock/notificationSlice";
import Brand from "./slices/Stock/BrandSlice";
import Timesheet from "./slices/Projects/timesheets";

//Selling
import Quotation from "./slices/Selling/quotationSlice";
import Warehouse from "./slices/Stock/warehouseSlice";
import ItemAttribute from "./slices/Stock/itemAttributeSlice";
import PriceList from "./slices/Stock/priceListSlice";
import ActivityCost from "./slices/Projects/activityCost";
import SalesOrder from "./slices/Selling/salesOrderSlice";
import SalesPartner from "./slices/Selling/salesPartnerSlice";

import AppraisalTemplate from "./slices/Employee/AppraisalTemplate";
import Appraisal from "./slices/Employee/Appraisal";
import EnergyPointRule from "./slices/Employee/EnergyPointRule";

import SupplierGroupSlice from "./slices/Buying/SupplierGroup";
import SupplierSlice from "./slices/Buying/Suppiler";
//Loans
import LoanType from "./slices/Loans/LoanTypeSlice";
import LoanDisbursement from "./slices/Loans/LoanDisbursementSlice";
import Driver from "./slices/Employee/Driver";
import Vehicle from "./slices/Employee/Vehicle";
import VehicleLog from "./slices/Employee/VehicleLog";

import Menu from "./slices/SysCfgSlice/MenuSlice";

import LoanApplicationSlice from "./slices/Loans/LoanApplication";
import LoanSlice from "./slices/Loans/Loan";
import LoanSecurityTypeSlice from "./slices/Loans/LoanSecurityType";
import LoanSecuritySlice from "./slices/Loans/LoanSecurity";
import LoanSecurityPledgeSlice from "./slices/Loans/LoanSecurityPledge";
import LoanSecurityUnpledgeSlice from "./slices/Loans/LoanSecurityUnpledge";
import BankAccountTypeSlice from "./slices/Accounting/BankAccountType";
import BankAccountSubTypeSlice from "./slices/Accounting/BankAccountSubType";
import LoanRepayment from "./slices/Loans/LoanRepaymentSlice";
import LoanWriteOff from "./slices/Loans/LoanWriteOffSlice";

import ProcessLoanInterestAccrualSlice from "./slices/Loans/ProcessLoanInterestAccrual";
import ProcessLoanSecurityShortfallSlice from "./slices/Loans/ProcessLoanSecurityShortfall";

import QualityInspection from "./slices/Stock/qualityInspectionSlice";
import Category from "./slices/Product/category";
import CallReport from "./slices/CallReport/index";
const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas,
  Employee,
  LayoutToolkit,
  SysCfgToolkit,
  Branch,
  SalaryComponent,
  SalaryStructure,
  EmployeeGroup,
  Customer,
  Lead,
  Modal,
  SalaryStructure,
  SalaryStructureAssignment,
  Appointment,
  Opportunity,
  Department,
  PayrollEntry,
  Attendance,
  Company,
  Department,
  PayrollEntry,
  SalarySlip,
  JobOpening,
  JobApplicantSource,
  AdditionalSalary,
  Territory,
  CustomerGroup,
  EmployeeSkillMap,
  EmployeePromotion,
  PayrollPeriod,
  EmployeeOtherIncome,
  JobApplicant,
  TermAndCondition,
  JobOffer,
  EmployeeGrade,
  IncomeTaxSlab,
  EmployeeTaxExemptionDeclaration,
  EmployeeTaxExemptionProofSubmission,
  CostCenter,
  LeaveBlockList,
  EmployeeOnboardingTemplate,
  EmployeeTaxExemptionCategory,
  EmployeeTaxExemptionSubCategory,
  RetentionBonus,
  EmployeeOnboarding,
  GrievanceType,
  EmployeeIncentive,
  EmployeeBenefitApplication,
  LeaveType,
  LeavePeriod,
  LeaveApplication,
  LeavePolicy,
  EmployeeBenefitClaim,
  EmployeeSeparationTemplate,
  EmployeeSeparation,
  EmployeeTransfer,
  EmployeeGrievances,
  ProjectType,
  Project,
  AttendanceRequest,
  LeavePolicyAssignment,
  LeaveAllocation,
  LeaveEncashment,
  CompensatoryLeaveRequest,
  ShiftType,
  ShiftAssignment,
  ShiftRequest,
  Task,
  TaskType,
  TaskComment,
  User,
  Posts,
  Issue,
  MaterialRequest,
  Item,
  ItemGroup,
  AssetCategory,
  Order,
  Product,
  Notification,
  Promotion,
  Voucher,
  Brand,
  ActivityType,
  Contact,
  Quotation,
  Warehouse,
  ItemAttribute,
  PriceList,
  HrSetting,
  EmailTemplate,
  Timesheet,
  ActivityCost,
  Address,
  SalesOrder,
  ActivityCost,
  Address,
  SalesOrder,
  TaxWithholdingCategory,
  Contract,
  Tag,
  AppraisalTemplate,
  Appraisal,
  DailyWork,
  EnergyPointRule,
  HolidayList,
  SupplierGroupSlice,
  SupplierSlice,
  LoanType,
  Account,
  Driver,
  Vehicle,
  VehicleLog,
  Category,
  Menu,
  LoanApplicationSlice,
  LoanSlice,
  LoanDisbursement,
  LoanSecurityTypeSlice,
  LoanSecuritySlice,
  Bank,
  LoanSecurityPledgeSlice,
  LoanSecurityUnpledgeSlice,
  BankAccountSubTypeSlice,
  BankAccountTypeSlice,
  BankAccount,
  SalesPartner,
  LoanRepayment,
  LoanWriteOff,
  ProcessLoanInterestAccrualSlice,
  ProcessLoanSecurityShortfallSlice,
  PaymentTerm,
  FiscalYear,
  JournalEntryTemplate,
  QualityInspection,
  Category,
  CallReport,
});

export default rootReducer;
