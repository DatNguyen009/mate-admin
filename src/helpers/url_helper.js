//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//PRODUCTS
export const GET_PRODUCTS = "/parse/classes/Product";
export const PRODUCT_PARAMS = "?include=branch&include=category";
export const GET_PRODUCTS_DETAIL = "/product";

export const ADD_NEW_PROJECT = "/add/product";
export const UPDATE_PROJECT = "/update/product";
export const DELETE_PROJECT = "/delete/product";

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";

//CHATS
export const GET_CHATS = "/chats";
export const GET_GROUPS = "/groups";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "/add/messages";

//ORDERS
export const GET_ORDERS = "/parse/classes/Order";
export const ADD_NEW_ORDER = "/parse/classes/Order";
export const UPDATE_ORDER = "/parse/classes/Order";
export const DELETE_ORDER = "/parse/classes/Order";
export const ORDER_PARAMS =
  "?order=-createdAt&include=customer&include=cashier";

//NOTIFICATION
export const GET_NOTIFICATIONS = "/parse/classes/Notification";

//CART DATA
export const GET_CART_DATA = "/cart";

//CUSTOMERS
export const GET_CUSTOMERS = "/parse/classes/Customer";
export const CUSTOMER_PARAMS =
  "?include=territory&include=customerGroup&include=accountManager&include=taxWithholdingCategory";
export const GET_CUSTOMER_QUERY = "?include=territory&include=customerGroup";
export const GET_CUSTOMER = "/parse/classes/Customer";
export const ADD_NEW_CUSTOMER = "/parse/classes/Customer";
export const UPDATE_CUSTOMER = "/parse/classes/Customer";
export const DELETE_CUSTOMER = "/parse/classes/Customer";

//CUSTOMER GROUP
export const GET_CUSTOMER_GROUP = "parse/classes/CustomerGroup";

//TERRITORY
export const GET_TERRITORY = "/parse/classes/Territory";
export const ADD_NEW_TERRITORY = "parse/classes/Territory";
export const UPDATE_TERRITORY = "parse/classes/Territory";
export const DELETE_TERRITORY = "parse/classes/Territory";

//SHOPS
export const GET_SHOPS = "/shops";

//CRYPTO
export const GET_WALLET = "/wallet";
export const GET_CRYPTO_ORDERS = "/crypto/orders";

//INVOICES
export const GET_INVOICES = "/invoices";
export const GET_INVOICE_DETAIL = "/invoice";

//PROJECTS
export const GET_PROJECTS = "/projects";
export const GET_PROJECT_DETAIL = "/project";

//TASKS
export const GET_TASKS = "/tasks";

//CONTACTS
export const GET_USERS = "parse/classes/_User";
export const USER_PARAMS = "?include=userRole";
export const GET_CURRENT_USER = "/parse/users/me";
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/add/user";
export const UPDATE_USER = "/update/user";
export const DELETE_USER = "/delete/user";

//Mails
export const GET_INBOX_MAILS = "/inboxmails";
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail";
export const DELETE_INBOX_MAIL = "/delete/inboxmail";

//starred mail
export const GET_STARRED_MAILS = "/starredmails";

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails";

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails";

//Send mail
export const GET_SENT_MAILS = "/sentmails";

//Trash mail
export const GET_TRASH_MAILS = "/trashmails";

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data";
export const GET_YEARLY_DATA = "/yearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

export const TOP_SELLING_DATA = "/top-selling-data";

export const GET_EARNING_DATA = "/earning-charts-data";

//Files
export const GET_FILES = "/parse/files";

//Employee
export const GET_EMPLOYEE = "/parse/classes/Employee";
export const GET_EMPLOYEE_QUERY = "?include=company&order=-createdAt";

export const GET_EMPLOYEE_DETAIL = "?include=company";
export const GET_EMPLOYEE_GROUP = "/parse/classes/EmployeeGroup";
export const GET_EMPLOYEE_SKILL_MAPS =
  "parse/classes/EmployeeSkillMap?include=employee";
export const ADD_EMPLOYEE_SKILL_MAP = "/parse/classes/EmployeeSkillMap";
export const GET_EMPLOYEE_PROMOTIONS =
  "parse/classes/EmployeePromotion?include=employee&include=company";
export const ADD_EMPLOYEE_PROMOTION = "/parse/classes/EmployeePromotion";

//Branch
export const GET_BRANCH = "/parse/classes/Branch";
//Company
export const GET_COMPANY = "/parse/classes/Company";
//Department
export const GET_DEPARTMENT =
  "/parse/classes/Department?include=company&include=costCenter&include=leaveBlockList";
export const ADD_DEPARTMENT = "/parse/classes/Department";
export const GET_DEPARTMENT_PARAMS = "?include=company";
//SalaryComponent
export const GET_SALARY_COMPONENT = "/parse/classes/SalaryComponent";
//Lead
export const LEAD_URL = "/parse/classes/Lead";

//SysCfg
export const GET_SYSCFG = "/parse/classes/SysCfg";
// Salary Structure
export const GET_SALARY_STRUCTURE = "/parse/classes/SalaryStructure";
export const GET_SALARY_STRUCTURE_QUERY =
  "?include=company&include=salaryComponent";

export const GET_SALARY_STRUCTURE_ASSIGNMENT =
  "/parse/classes/SalaryStructureAssignment";

export const GET_SALARY_STRUCTURE_ASSIGNMENT_DETAIL =
  "?include=employee&include=salaryStructure&include=employee.company";

export const GET_SALARY_STRUCTURE_ASSIGNMENT_FULL =
  "/parse/classes/SalaryStructureAssignment?include=employee&include=salaryStructure";

//CRM
export const GET_SMS_TEMPLATE = "/parse/classes/NotificationTemplate";

//Appointment
export const GET_APPOINTMENT = "/parse/classes/Appointment";

//Opportunity
export const GET_OPPORTUNITY = "/parse/classes/Opportunity";
export const GET_OPPORTUNITY_INCLUDE =
  "?include=client&include=lead&include=productCategory&skip=0&order=-createdAt";

//Contact
export const GET_CONTACTS = "/parse/classes/Contact";

export const GET_ADDRESSES = "/parse/classes/Address";

export const GET_PAYROLL_ENTRY = "/parse/classes/PayrollEntry";
// Attendance
export const GET_ATTENDANCE = "/parse/classes/Attendance";
export const GET_ATTENDANCE_INCLUDE =
  "?include=employee&include=company&include=shift&include=leaveType&order=-createdAt";

export const GET_ATTENDANCE_REQUEST = "/parse/classes/AttendanceRequest";
export const GET_ATTENDANCE_REQUEST_INCLUDE =
  "?include=employee&include=company";

export const GET_PAYROLL_ENTRY_DETAIL =
  "?include=company&include=department&include=branch&include=employee";
export const GET_PAYROLL_ENTRY_FULL =
  GET_PAYROLL_ENTRY + GET_PAYROLL_ENTRY_DETAIL;

export const GET_SALARY_SLIP = "/parse/classes/SalarySlip";
export const GET_SALARY_SLIP_DETAIL = "?include=employee&include=company";
export const GET_SALARY_SLIP_FULL = GET_SALARY_SLIP + GET_SALARY_SLIP_DETAIL;

export const GET_ADDITIONAL_SALARY_DETAIL =
  "?include=employee&include=company&include=salaryComponent";
export const GET_ADDITIONAL_SALARY = "/parse/classes/AdditionalSalary";
export const GET_ADDITIONAL_SALARY_FULL =
  GET_ADDITIONAL_SALARY + GET_ADDITIONAL_SALARY_DETAIL;

export const GET_INCOME_TAX_SLAB = "/parse/classes/IncomeTaxSlab";
export const GET_INCOME_TAX_SLAB_DETAIL = "?include=company";
export const GET_INCOME_TAX_SLAB_FULL =
  GET_INCOME_TAX_SLAB + GET_INCOME_TAX_SLAB_DETAIL;

export const GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION =
  "/parse/classes/EmployeeTaxExemptionDeclaration";
export const GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION_DETAIL =
  "?include=company&include=employee&include=payrollPeriod";
export const GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION_FULL =
  GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION +
  GET_EMPLOYEE_TAX_EXEMPTION_DECLARATION_DETAIL;

export const GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION =
  "/parse/classes/EmployeeTaxExemptionProofSubmission";
export const GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION_DETAIL =
  "?include=company&include=employee&include=payrollPeriod";
export const GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION_FULL =
  GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION +
  GET_EMPLOYEE_TAX_EXEMPTION_PROOF_SUBMISSION_DETAIL;

//Recruitment

export const GET_JOB_OPENING =
  "/parse/classes/JobOpening?include=company&order=-createdAt";
export const GET_JOB_OPENING_DETAIL = "?include=company";
export const POST_JOB_OPENING = "/parse/classes/JobOpening";
export const GET_JOB_APPLICANT_SOURCE = "/parse/classes/JobApplicantSource";

export const GET_PAYROLL_PERIOD = "/parse/classes/PayrollPeriod";

export const GET_EMPLOYEE_OTHER_INCOME = "/parse/classes/EmployeeOtherIncome";
export const GET_EMPLOYEE_OTHER_INCOME_QUERY =
  "?include=company&include=employee&include=payrollPeriod";

export const GET_JOB_APPLICANT =
  "/parse/classes/JobApplicant?include=source&include=jobOpening";
export const POST_JOB_APPLICANT = "/parse/classes/JobApplicant";
export const GET_JOB_APPLICANT_DETAIL = "?include=source&include=jobOpening";

export const GET_EMPLOYEE_INCENTIVE = "/parse/classes/EmployeeIncentive";
export const GET_EMPLOYEE_INCENTIVE_DETAIL =
  "?include=employee&include=company&include=salaryComponent";
export const GET_EMPLOYEE_INCENTIVE_FULL =
  GET_EMPLOYEE_INCENTIVE + GET_EMPLOYEE_INCENTIVE_DETAIL;

export const GET_EMPLOYEE_BENEFIT_APPLICATION =
  "/parse/classes/EmployeeBenefitApplication";
export const GET_EMPLOYEE_BENEFIT_APPLICATION_DETAIL =
  "?include=employee&include=company&include=payrollPeriod";
export const GET_EMPLOYEE_BENEFIT_APPLICATION_FULL =
  GET_EMPLOYEE_BENEFIT_APPLICATION + GET_EMPLOYEE_BENEFIT_APPLICATION_DETAIL;

//Term and condition

export const GET_TERM_AND_CONDITION = "/parse/classes/TermAndCondition";

export const GET_JOB_OFFER = "/parse/classes/JobOffer";
export const GET_JOB_OFFER_DETAIL =
  "/parse/classes/JobOffer?include=jobApplicant&include=company&include=termAndCondition";

export const GET_JOB_OFFER_DETAIL_INCLUDE =
  "?include=jobApplicant&include=company&include=termAndCondition";

export const GET_EMPLOYEE_GRADE = "/parse/classes/EmployeeGrade";
export const GET_EMPLOYEE_GRADE_DETAIL = "?include=salaryStructure";

//PaymentTerm
export const GET_PAYMENT_TERM = "/parse/classes/PaymentTerm";
//Fiscal Year
export const GET_FISCAL_YEAR = "/parse/classes/FiscalYear";
export const GET_FISCAL_YEAR_PARAMS = "?include=companies";
//Cost Center
export const GET_COST_CENTERS = "/parse/classes/CostCenter?include=company";
export const GET_LEAVE_BLOCK_LIST = "/parse/classes/LeaveBlockList";
export const LEAVE_BLOCK_LIST_PARAMS = "?include=company";

//Tax Withholding Category
export const GET_TAX_WITHHOLDING_CATEGORIES =
  "/parse/classes/TaxWithholdingCategory";

//Employee onboarding template
export const GET_EMPLOYEE_ONBOARDING_TEMPLATE =
  "/parse/classes/EmployeeOnboardingTemplate";

export const GET_EMPLOYEE_ONBOARDING_TEMPLATE_DETAIL =
  "/parse/classes/EmployeeOnboardingTemplate?include=company&include=employeeGrade";

export const GET_EMPLOYEE_ONBOARDING_TEMPLATE_INCLUDE =
  "?include=company&include=employeeGrade";
export const GET_EMPLOYEE_TAX_EXEMPTION_CATEGORY =
  "/parse/classes/EmployeeTaxExemptionCategory";

export const GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY =
  "/parse/classes/EmployeeTaxExemptionSubCategory";
export const GET_EMPLOYEE_TAX_EXEMPTION_SUB_CATEGORY_QUERY =
  "?include=taxExemptionCategory";

export const GET_RETENTION_BONUS = "/parse/classes/RetentionBonus";
export const GET_RETENTION_BONUS_QUERY =
  "?include=company&include=employee&include=salaryComponent";

//Employee onboarding
export const GET_EMPLOYEE_ONBOARDING = "/parse/classes/EmployeeOnboarding";

export const GET_EMPLOYEE_ONBOARDING_DETAIL =
  "/parse/classes/EmployeeOnboarding?include=company&include=employeeGrade&include=jobApplicant&include=jobOffer&include=employeeOnboardingTemplate";

export const GET_EMPLOYEE_ONBOARDING_INCLUDE =
  "?include=company&include=employeeGrade&include=jobApplicant&include=jobOffer&include=employeeOnboardingTemplate";

//Grievance Type
export const GET_GRIEVANCE_TYPE = "/parse/classes/GrievanceType";

//Leave
export const GET_LEAVE_TYPES =
  "/parse/classes/LeaveType?include=earningComponent";
export const ADD_LEAVE_TYPE = "/parse/classes/LeaveType";
export const GET_LEAVE_PERIODS = "/parse/classes/LeavePeriod?include=company";
export const ADD_LEAVE_PERIOD = "/parse/classes/LeavePeriod";
export const GET_LEAVE_APPLICATIONS = "/parse/classes/LeaveApplication";
export const LEAVE_APPLICATIONS_PARAMS =
  "?include=leaveType&include=employee&include=salarySlip&include=company";
export const GET_LEAVE_POLICY = "/parse/classes/LeavePolicy";

export const GET_HOLIDAY_LIST = "/parse/classes/HolidayList";

export const GET_EMPLOYEE_BENEFIT_CLAIM = "/parse/classes/EmployeeBenefitClaim";
export const GET_EMPLOYEE_BENEFIT_CLAIM_QUERY =
  "?include=company&include=employee";
export const GET_EMPLOYEE_BENEFIT_CLAIM_FULL =
  GET_EMPLOYEE_BENEFIT_CLAIM + GET_EMPLOYEE_BENEFIT_CLAIM_QUERY;

export const GET_EMPLOYEE_SEPARATION_TEMPLATE =
  "/parse/classes/EmployeeSeparationTemplate";

export const GET_EMPLOYEE_SEPARATION_TEMPLATE_DETAIL =
  "/parse/classes/EmployeeSeparationTemplate?include=company&include=employeeGrade";

export const GET_EMPLOYEE_SEPARATION_TEMPLATE_INCLUDE =
  "?include=company&include=employeeGrade";
export const GET_EMPLOYEE_SEPARATION = "/parse/classes/EmployeeSeparation";

export const GET_EMPLOYEE_SEPARATION_DETAIL =
  "/parse/classes/EmployeeSeparation?include=company&include=employee&include=employeeSeparationTemplate";
export const GET_EMPLOYEE_SEPARATION_INCLUDE =
  "?include=company&include=employee&include=employeeSeparationTemplate";

export const GET_EMPLOYEE_TRANSFER = "/parse/classes/EmployeeTransfer";
export const GET_EMPLOYEE_TRANSFER_DETAIL =
  "/parse/classes/EmployeeTransfer?include=employee&include=company";
export const GET_EMPLOYEE_TRANSFER_INCLUDE =
  "?include=employee&include=company";
export const GET_EMPLOYEE_GRIEVANCE = "/parse/classes/EmployeeGrievance";
export const GET_EMPLOYEE_GRIEVANCE_INCLUDE =
  "?include=raisedBy&include=employeeResponsible";
//Projects
export const GET_PROJECT_TYPE = "/parse/classes/ProjectType";
export const GET_ACTIVITY_TYPE = "/parse/classes/ActivityType";
export const GET_ACTIVITY_COST = "/parse/classes/ActivityCost";
export const GET_ACTIVITY_COST_QUERY = "?include=employee&include=activityType";

export const ORDER_BY = "?order=-createdAt";
export const GET_PROJECT = "/parse/classes/Project";
export const GET_PROJECT_QUERY =
  "?include=company&include=projectType&include=customer&include=salesOrder&include=costCenterList&include=defaultCostCenter&order=-createdAt";
export const GET_LEAVE_POLICY_ASSIGNMENT =
  "/parse/classes/LeavePolicyAssignment";
export const LEAVE_POLICY_ASSIGNMENT_PARAMS =
  "?include=employee&include=company&include=leavePolicy&include=leavePeriod";
export const GET_LEAVE_ALLOCATIONS = "/parse/classes/LeaveAllocation";
export const LEAVE_ALLOCATION_PARAMS =
  "?include=leaveType&include=employee&include=leavePolicyAssignment&include=company";
export const GET_LEAVE_ENCASHMENT = "/parse/classes/LeaveEncashment";
export const LEAVE_ENCASHMENT_PARAMS =
  "?include=leavePeriod&include=employee&include=company&include=leaveType";
export const GET_COMPENSATORY_LEAVE_REQUEST =
  "/parse/classes/CompensatoryLeaveRequest";
export const COMPENSATORY_LEAVE_REQUEST_PARAMS =
  "?include=employee&include=leaveType";

// Task
export const GET_TASK = "/parse/classes/Task";
export const GET_TASK_QUERY =
  "?include=company&include=department&include=parentTask&include=project&include=type&include=issue&include=completedBy";
export const GET_TASK_FULL = GET_TASK + GET_TASK_QUERY;

export const GET_TASK_TYPE = "/parse/classes/TaskType";
export const GET_TASK_COMMENT = "/parse/classes/TaskComment";
export const GET_TIMESHEET = "/parse/classes/Timesheet";
export const GET_TIMESHEET_QUERY =
  "?include=company&include=customer&include=project&include=employee";
//ShiftType
export const GET_SHIFT_TYPE = "/parse/classes/ShiftType";
export const SHIFT_TYPE_QUERY = "?include=holidayList";
export const GET_SHIFT_REQUEST = "/parse/classes/ShiftRequest";
export const GET_SHIFT_ASSIGNMENT = "/parse/classes/ShiftAssignment";
export const GET_SHIFT_REQUEST_QUERY =
  "?include=employee&include=shiftType&include=company";
export const GET_SHIFT_ASSIGNMENT_QUERY =
  "?include=employee&include=shiftType&include=company";

//CMS
export const GET_POST = "/parse/classes/Post";
export const GET_POST_QUERY =
  "?include=createdBy&include=tags&include=category&order=-createdAt";
export const GET_ISSUE = "/parse/classes/Issue";
export const GET_PROMOTION = "/parse/classes/Promotion";
export const GET_PROMOTION_QUERY =
  "?include=createdBy&include=product&order=-createdAt&include=company&include=brand";
export const GET_VOUCHER = "/parse/classes/Voucher";
export const GET_VOUCHER_QUERY = `? include = ["branch", "products", "categories", "brands"] & order=-createdAt`;
export const GET_TAG = "/parse/classes/Tag";

export const GET_MATERIAL_REQUEST = "/parse/classes/MaterialRequest";
export const GET_MATERIAL_REQUEST_QUERY = {
  include: ["company"],
};
//Items and Pricing
export const GET_ITEM = "/parse/classes/Item";
export const GET_ITEM_GROUP = "/parse/classes/ItemGroup";
export const GET_ITEM_GROUP_QUERY =
  "?include=itemGroup&include=brand&include=assetCategory&order=-createdAt";
export const GET_ASSET_CATEGORY = "/parse/classes/AssetCategory";

export const GET_BRAND = "/parse/classes/Brand";

//Selling
//Quotation
export const GET_QUOTATIONS = "/parse/classes/Quotation";
export const QUOTATION_PARAMS =
  "?include=customer&include=company&include=lead&include=terms";

//Sales Partner
export const GET_SALES_PARTNERS = "/parse/classes/SalesPartner";
export const SALES_PARTNER_PARAMS = "?include=territory";

//WareHouse
export const GET_WAREHOUSE = "/parse/classes/WareHouse";
export const GET_WAREHOUSE_QUERY = "?include=company";

//ItemAttribute
export const GET_ITEM_ATTRIBUTE = "/parse/classes/ItemAttribute";

//PriceList
export const GET_PRICE_LIST = "/parse/classes/PriceList";
//Hr Settings
export const GET_HR_SETTING = "/parse/classes/HrSetting";
export const GET_HR_SETTING_QUERY =
  "?include=leaveApprovalNotificationTemplate&include=leaveStatusNotificationTemplate";
export const GET_EMAIL_TEMPLATE = "/parse/classes/EmailTemplate";
export const GET_DAILY_WORK = "/parse/classes/DailyWorkSummaryGroup";

//Sales Order
export const GET_SALES_ORDER = "/parse/classes/SalesOrder";
export const SALES_ORDER_PARAMS = `? include = company & include=customer & include=territory & include=companyAddressName & include=contactPerson & include=customerAddress & include=shippingAddressName & include=priceList & include=sourceWarehouse`;
//contract
export const POST_CONTRACT = "/parse/batch";
export const GET_CONTRACT = "/parse/classes/Contract";
export const GET_CONTRACT_INCLUDE =
  "?include=company&include=partyUser&include=partyNameCustomer&include=partyNameEmployee&include=partyNameSupplier";
export const GET_APPRAISAL_TEMPLATE = "/parse/classes/AppraisalTemplate";
export const GET_APPRAISAL = "/parse/classes/Appraisal";
export const GET_APPRAISAL_QUERY =
  "?include=appraisalTemplate&include=employee&include=company";
export const GET_ENERGY_POINT_RULE = "/parse/classes/EnergyPointRule";

export const GET_SUPPLIER_GROUP = "/parse/classes/SupplierGroup";
export const GET_SUPPLIER_GROUP_QUERY = "?include=parentSupplierGroup";
export const GET_SUPPLIER_QUERY = "?include=supplierGroup";
export const GET_SUPPLIER = "/parse/classes/Supplier";
//Loans
export const GET_LOAN_TYPE = "/parse/classes/LoanType";
export const GET_LOAN_TYPE_PARAMS =
  "?include=paymentAccount&include=company&include=loanAccount&include=interestIncomeAccount&include=penaltyIncomeAccount&order=-createdAt";
export const GET_LOAN_DISBURSEMENT = "/parse/classes/LoanDisbursement";
export const GET_LOAN_DISBURSEMENT_PARAMS = `? include = ["company", "againstLoan", "costCenter", "bankAccount"] & order=-createdAt`;
export const GET_LOAN_DISBURSEMENT_NEWEST_PARAMS = `? order = -createdAt & limit=1`;
export const GET_LOAN_REPAYMENTS = "/parse/classes/LoanRepayment";
export const LOAN_REPAYMENTS_PARAMS = `? include = ["againstLoan", "applicantForEmployee", "applicantForCustomer", "loanType", "costCenter", "againstLoan.loanType"]`;
export const GET_LOAN_WRITE_OFFS = "/parse/classes/LoanWriteOff";
export const LOAN_WRITE_OFF_PARAMS = `? include = ["applicantForCustomer", "costCenter", "loan", "writeOffAccount"]`;
export const GET_ACCOUNT = "/parse/classes/Account";
export const GET_ACCOUNT_PARAMS =
  "?include=company&include=parentAccount&order=-createdAt";

export const GET_BANK = "/parse/classes/Bank";
export const GET_JOURNAL_ENTRY_TEMPLATE = "/parse/classes/JournalEntryTemplate";
export const GET_JOURNAL_ENTRY_TEMPLATE_PARAMS =
  "?include=company&include=accountingEntries&order=-createdAt";
export const GET_BANK_ACCOUNT = "/parse/classes/BankAccount";
export const GET_BANK_ACCOUNT_PARAMS = `? include = ["bank", "accountSubtype", "accountType", "company", "companyAccount"]`;
export const GET_DRIVER_QUERY = "?include=employee&include=transporter";
export const GET_DRIVER = "/parse/classes/Driver";

export const GET_VEHICLE_QUERY = "?include=employee";
export const GET_VEHICLE = "/parse/classes/Vehicle";

export const GET_VEHICLE_LOG_QUERY = `? include = ["employee", "supplier", "licensePlate"]`;
export const GET_VEHICLE_LOG = "/parse/classes/VehicleLog";
export const GET_CATEGORY = "/parse/classes/Category";
export const GET_IMPORTED_SESSION = `/ parse / classes / ImportedSession ? order = -importedAt & include=creator`;
export const GET_MENU =
  '/parse/classes/Menu?where={"isRootPath":true}&order=order';

export const GET_ALL_MENU = '/parse/classes/Menu?where={"appName":"web_admin"}';

export const GET_LOAN_APPLICATION = "/parse/classes/LoanApplication";
export const GET_LOAN_APPLICATION_QUERY = `include = ["applicantForCustomer", "applicantForEmployee", "company", "loanType"]`;
export const GET_ITEM_LASTEST_INCLUDE = "?order=-createdAt&limit=1";

export const GET_ITEM_LASTEST_AND = "&order=-createdAt&limit=1";

export const GET_LOAN = "/parse/classes/Loan";
export const GET_LOAN_QUERY = `include = ["loanType", "company", "loanApplication"]`;

export const GET_LOAN_SECURITY_TYPE = "/parse/classes/LoanSecurityType";
export const GET_LOAN_SECURITY = "/parse/classes/LoanSecurity";
export const GET_LOAN_SECURITY_PRICE = "/parse/classes/LoanSecurityPrice";
export const GET_LOAN_SECURITY_PRICE_PLEDGE =
  "/parse/classes/LoanSecurityPledge";
export const GET_LOAN_SECURITY_PRICE_PLEDGE_QUERY = `include = ["applicantForCustomer", "applicantForEmployee", "company", "loan", "loanApplication"]`;

export const GET_LOAN_SECURITY_PRICE_UNPLEDGE =
  "/parse/classes/LoanSecurityUnpledge";
export const GET_LOAN_SECURITY_PRICE_UNPLEDGE_QUERY = `include = ["applicantForCustomer", "applicantForEmployee", "company", "loan", "loanApplication"]`;
export const GET_BANK_ACCOUNT_TYPE = "/parse/classes/BankAccountType";
export const GET_BANK_ACCOUNT_SUB_TYPE = "/parse/classes/BankAccountSubtype";
export const GET_PROCESS_LOAN_INTEREST_ACCRUAL =
  "/parse/classes/ProcessLoanInterestAccrual";
export const GET_PROCESS_LOAN_SECURITY_SHORTFALL =
  "/parse/classes/ProcessLoanSecurityShortfall";

export const GET_QUALITY_INSPECTION = "/parse/classes/QualityInspection";

export const GET_DOWNLOAD_EXCEL = "/parse/functions/download-excel";
export const GET_LEAD_ASSIGNMENT = "/parse/functions/shared-lead";
export const GET_LEAD = "/parse/classes/Lead";
export const GET_SEND_MASS = "/parse/classes/SendMass";
export const GET_TRANSACTION = "/parse/classes/Transaction";
export const GET_CAMPAIGN = "/parse/classes/Campaign";
export const GET_COMPETITOR = "/parse/classes/Competitor";
export const GET_USERS1 = "/parse/users";
export const GET_MESSAGE = "/parse/classes/Message";
export const GET_CALL_LOG = "/parse/classes/CallLog";
export const GET_SUMMARY_LEAD = "/parse/functions/summary-lead";
export const GET_SUMMARY_CUSTOMER = "/parse/functions/summary-customer";
export const GET_KPI_CRITERIA = "/parse/classes/Kpi";
export const GET_KPI_ASSIGNMENT = "/parse/classes/KPIAssignment";
export const GET_REFERRAL_BONUS = "/parse/classes/ReferralBonus";

export const API_PO = "/parse/classes/PO";
export const API_STOCK_REPORT = "/parse/classes/StockReport";
export const API_STOCK_COUNT_SESSION = "/parse/classes/StockCountSession";
export const API_STOCK_CHANGE_SESSION = "/parse/classes/StockChangeSession";
export const API_STOCK_CHANGE_ITEM = "/parse/classes/StockChangeItem";
export const API_CREATE_PO = "/api/v1/purchase-order";
export const API_IMPORT = "/api/v1/import";
export const API_EXPORT = "/api/v1/export";
export const API_COUNT_INVENTORY = "api/v1/stock-count-warehouse";
export const API_APPROVED_PO = "/api/v1/approved-purchase-order";
export const API_COUNT_SESSION = "/api/v1/stock-count-warehouse";

export const GET_NEWS = "/parse/classes/News";
export const GET_TWEETS = "/parse/classes/Tweet";
export const GET_SEMINAR = "/parse/classes/Seminar";
export const GET_PROVINCE = "/parse/classes/Province";
export const GET_DISTRICT = "/parse/classes/District";
export const GET_WARD = "/parse/classes/Ward";
export const GET_USER_INFO = "/parse/classes/UserInfo";
