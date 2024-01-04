import React from "react";
import { Redirect } from "react-router-dom";

// Pages Component
import Chat from "../pages/page-themes/Chat/Chat";

// Pages File Manager
import FileManager from "../pages/page-themes/FileManager/index";

// Pages Calendar
import Calendar from "../pages/page-themes/Calendar/index";

// User profile
import UserProfile from "../pages/page-themes/Authentication/UserProfile";

//Ecommerce Pages
import EcommerceProducts from "../pages/page-themes/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/page-themes/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/page-themes/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/page-themes/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/page-themes/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/page-themes/Ecommerce/EcommerceCheckout";
import EcommerceShops from "../pages/page-themes/Ecommerce/EcommerceShops/index";
import EcommerceAddProduct from "../pages/page-themes/Ecommerce/EcommerceAddProduct";

//Email
import EmailInbox from "../pages/page-themes/Email/email-inbox";
import EmailRead from "../pages/page-themes/Email/email-read";
import EmailBasicTemplte from "../pages/page-themes/Email/email-basic-templte";
import EmailAlertTemplte from "../pages/page-themes/Email/email-template-alert";
import EmailTemplateBilling from "../pages/page-themes/Email/email-template-billing";

//Invoices
import InvoicesList from "../pages/page-themes/Invoices/invoices-list";
import InvoiceDetail from "../pages/page-themes/Invoices/invoices-detail";

// Authentication related pages
import Login from "../pages/page-themes/Authentication/Login";
import Logout from "../pages/page-themes/Authentication/Logout";
import ForgetPwd from "../pages/page-themes/Authentication/ForgetPassword";

// Inner Authentication
import Login1 from "../pages/page-themes/AuthenticationInner/Login";
import Login2 from "../pages/page-themes/AuthenticationInner/Login2";
import Register1 from "../pages/page-themes/AuthenticationInner/Register";
import Register2 from "../pages/page-themes/AuthenticationInner/Register2";
import Recoverpw from "../pages/page-themes/AuthenticationInner/Recoverpw";
import Recoverpw2 from "../pages/page-themes/AuthenticationInner/Recoverpw2";
import ForgetPwd1 from "../pages/page-themes/AuthenticationInner/ForgetPassword";
import ForgetPwd2 from "../pages/page-themes/AuthenticationInner/ForgetPwd2";
import LockScreen from "../pages/page-themes/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "../pages/page-themes/AuthenticationInner/auth-lock-screen-2";
import ConfirmMail from "../pages/page-themes/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "../pages/page-themes/AuthenticationInner/page-confirm-mail-2";
import EmailVerification from "../pages/page-themes/AuthenticationInner/auth-email-verification";
import EmailVerification2 from "../pages/page-themes/AuthenticationInner/auth-email-verification-2";
import TwostepVerification from "../pages/page-themes/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "../pages/page-themes/AuthenticationInner/auth-two-step-verification-2";

// Dashboard
// import Dashboard from "../pages/page-themes/Dashboard/index";
import DashboardSaas from "../pages/page-themes/Dashboard-saas/index";
import DashboardBlog from "../pages/page-themes/Dashboard-blog/index";

// Charts
import ChartApex from "../pages/page-themes/Charts/Apexcharts";
import ChartistChart from "../pages/page-themes/Charts/ChartistChart";
import ChartjsChart from "../pages/page-themes/Charts/ChartjsChart";
import EChart from "../pages/page-themes/Charts/EChart";
import SparklineChart from "../pages/page-themes/Charts/SparklineChart";
import ChartsKnob from "../pages/page-themes/Charts/charts-knob";
import ReCharts from "../pages/page-themes/Charts/ReCharts";

// Maps
import MapsGoogle from "../pages/page-themes/Maps/MapsGoogle";
import MapsVector from "../pages/page-themes/Maps/MapsVector";
import MapsLeaflet from "../pages/page-themes/Maps/MapsLeaflet";

//Icons
import IconBoxicons from "../pages/page-themes/Icons/IconBoxicons";
import IconDripicons from "../pages/page-themes/Icons/IconDripicons";
import IconMaterialdesign from "../pages/page-themes/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/page-themes/Icons/IconFontawesome";

//Tables
import BasicTables from "../pages/page-themes/Tables/BasicTables";
import DatatableTables from "../pages/page-themes/Tables/DatatableTables";
import ResponsiveTables from "../pages/page-themes/Tables/ResponsiveTables";
import EditableTables from "../pages/page-themes/Tables/EditableTables";
import DragDropTables from "../pages/page-themes/Tables/DragDropTables";

// Forms
import FormElements from "../pages/page-themes/Forms/FormElements/index";
import FormLayouts from "../pages/page-themes/Forms/FormLayouts";
import FormAdvanced from "../pages/page-themes/Forms/FormAdvanced";
import FormEditors from "../pages/page-themes/Forms/FormEditors";
import FormValidations from "../pages/page-themes/Forms/FormValidations";
import FormMask from "../pages/page-themes/Forms/FormMask";
import FormRepeater from "../pages/page-themes/Forms/FormRepeater";
import FormUpload from "../pages/page-themes/Forms/FormUpload";
import FormWizard from "../pages/page-themes/Forms/FormWizard";
import FormXeditable from "../pages/page-themes/Forms/FormXeditable";
import DualListbox from "../pages/page-themes/Forms/DualListbox";

//Ui
import UiAlert from "../pages/page-themes/Ui/UiAlert";
import UiButtons from "../pages/page-themes/Ui/UiButtons";
import UiCards from "../pages/page-themes/Ui/UiCards";
import UiCarousel from "../pages/page-themes/Ui/UiCarousel";
import UiColors from "../pages/page-themes/Ui/UiColors";
import UiDropdown from "../pages/page-themes/Ui/UiDropdown";
import UiGeneral from "../pages/page-themes/Ui/UiGeneral";
import UiGrid from "../pages/page-themes/Ui/UiGrid";
import UiImages from "../pages/page-themes/Ui/UiImages";
import UiLightbox from "../pages/page-themes/Ui/UiLightbox";
import UiModal from "../pages/page-themes/Ui/UiModal";
import UiProgressbar from "../pages/page-themes/Ui/UiProgressbar";
import UiSweetAlert from "../pages/page-themes/Ui/UiSweetAlert";
import UiTabsAccordions from "../pages/page-themes/Ui/UiTabsAccordions";
import UiTypography from "../pages/page-themes/Ui/UiTypography";
import UiVideo from "../pages/page-themes/Ui/UiVideo";
import UiSessionTimeout from "../pages/page-themes/Ui/UiSessionTimeout";
import UiRating from "../pages/page-themes/Ui/UiRating";
import UiRangeSlider from "../pages/page-themes/Ui/UiRangeSlider";
import UiNotifications from "../pages/page-themes/Ui/ui-notifications";
import UiToast from "../pages/page-themes/Ui/UiToast";
import UiOffCanvas from "../pages/page-themes/Ui/UiOffCanvas";
import Breadcrumb from "../pages/page-themes/Ui/UiBreadcrumb";
import UiPlaceholders from "../pages/page-themes/Ui/UiPlaceholders";

//Pages
import PagesStarter from "../pages/page-themes/Utility/pages-starter";
import PagesMaintenance from "../pages/page-themes/Utility/pages-maintenance";
import PagesComingsoon from "../pages/page-themes/Utility/pages-comingsoon";
import PagesTimeline from "../pages/page-themes/Utility/pages-timeline";
import PagesFaqs from "../pages/page-themes/Utility/pages-faqs";
import PagesPricing from "../pages/page-themes/Utility/pages-pricing";
import Pages404 from "../pages/page-themes/Utility/pages-404";
import Pages500 from "../pages/page-themes/Utility/pages-500";

//Blog
import BlogList from "../pages/page-themes/Blog/BlogList/index";
import BlogGrid from "../pages/page-themes/Blog/BlogGrid/index";
import BlogDetails from "../pages/page-themes/Blog/BlogDetails";

import NewDepartment from "pages/Admin/Department/NewDepartment";
import Announcement from "pages/Admin/Settings/Announcement";

//Design
import VVSFormDesign2 from "components/Common/VVSFormDesign2";
import FormDesign from "pages/Design/FormDesign";
import VVSTableDesign2 from "components/Common/VVSTableDesign2";
import VVSTableFormX from "components/Common/VVSTableFormX";
import VVSTable from "components/Common/VVSTable";

//Dashboard
import Dashboard from "pages/Dashboard/index";

//Admin
import Employee from "pages/Admin/Employee/Employee";
import NewEmployee from "pages/Admin/Employee/NewEmployee";
import Department from "pages/Admin/Department";
import SettingPage from "pages/Admin/Settings";
import Account from "pages/Admin/Account";
import NewAccount2 from "pages/Admin/Account/NewAccount2";
import NewUser from "pages/Users/User/NewUser";
import Roles from "pages/Admin/Roles";

//CRM
import Customer from "pages/CRM/Customer";
import NewCustomer from "pages/CRM/Customer/NewCustomer";
import Lead from "pages/CRM/Lead";
import NewLead from "pages/CRM/Lead/pages/NewLead";
import Branch from "pages/CRM/Branch";
import NewBranch from "pages/CRM/Branch/NewBranch";

//ECommerce
import Selling from "pages/Ecommerce/Selling";
import Order from "pages/Ecommerce/Order";
import NewOrder from "pages/Ecommerce/Selling";
import DetailOrder from "pages/Ecommerce/Order/DetailOrder";
import Promotion from "pages/Ecommerce/Promotion";
import NewPromotion from "pages/Ecommerce/Promotion/Add";
import DetailPromotion from "pages/Ecommerce/Promotion/Detail";
import Voucher from "pages/Ecommerce/Voucher";
import NewVoucher from "pages/Ecommerce/Voucher/NewVoucher";
import Fee from "pages/Ecommerce/Fee/View";
import PurchaseOrder from "pages/Ecommerce/PurchaseOrder/View";
import DetailPurchaseOrder from "pages/Ecommerce/PurchaseOrder/Detail";
//Product
import TableProduct from "pages/Product/Products/Product";
import NewProduct from "pages/Product/Products/NewProduct";
import ProductCategory from "pages/Product/ProductCategories/View";
import NewProductCategory from "pages/Product/ProductCategories/NewProductCategory";
import WareHouse from "pages/Product/Warehouse";
import Brand from "pages/Product/Brand";
import Vendor from "pages/Product/Vendor";
import Stock from "pages/Product/Stock";
import GoldPrice from "pages/Product/GoldPrice";

//ProductSaving
import ProductSaving from "pages/Saving/ProductSaving";
import NewProductSaving from "pages/Saving/ProductSaving/NewProductSaving";

//Saving
import InterestRate from "pages/Saving/InterestRate";
import Contract from "pages/Saving/Contract/View";
import DetailContract from "pages/Saving/Contract/Detail";

// Template
import Template from "pages/Template";
import ContentTemplate from "pages/Template/ContentTemplate";
// Require
import TransactionMoney from "pages/Require/TransactionMoney";
import TransactionGold from "pages/Require/TransactionGold";
import DetailTransactionMoney from "pages/Require/TransactionMoney/Detail";
import DetailTransactionGold from "pages/Require/TransactionGold/Detail";

//News
import Posts from "pages/News/Post";
import NewPosts from "pages/News/Post/NewPosts";
import ListPosts from "pages/News/PostCategory/View";

//Report
import ReportPages from "pages/Report/ReportPage";

// PHL
import User from "pages/PHL/User";
import Question from "pages/PHL/Question";
import DetailQuestion from "pages/PHL/Question/DetailQuestion";
import StockReport from "pages/Product/StockReport";

import NewTemplate from "pages/Template/NewTemplate";
import Buying from "pages/Ecommerce/Buying";
import CustomerGroup from "pages/CRM/Customer/Group";
import NewCustomerGroup from "pages/CRM/Customer/Group/NewGroup";
import SourceLead from "pages/CRM/Lead/pages/SourceLead";
import Investment from "pages/CRM/Investment";
import EmployeeGroup from "pages/Admin/Employee/EmployeeGroup";
import NewEmployeeGroup from "pages/Admin/Employee/EmployeeGroup/Detail";
import EmployeeGrade from "pages/Admin/Employee/EmployeeGrade";
import NewEmployeeGrade from "pages/Admin/Employee/EmployeeGrade/NewEmployeeGrade";
import ContractEarlySettle from "pages/Saving/Contract/ContractEarlySettle";
import AllotmentLead from "pages/CRM/Lead/pages/AllotmentLead";
import { SMSTemplate } from "pages/CRM/SMSTemplate";
import Bank from "pages/Admin/Bank";
import NewBank from "pages/Admin/Bank/NewBank";
import Holiday from "pages/Admin/Holiday";
import NewHoliday from "pages/Admin/Holiday/NewHoliday";
import SendMass from "pages/CRM/SendMassage";
import NewSendMass from "pages/CRM/SendMassage/NewSendMass";
import NewSMSTemplate from "pages/CRM/SMSTemplate/NewSMSTemplate";
import OrderProcessed from "pages/Require/OrderProcessed";
import Competitor from "pages/CRM/Competitor";
import NewCompetitor from "pages/CRM/Competitor/NewCompetitor";
import Campaign from "pages/CRM/Campaign";
import NewCampaign from "pages/CRM/Campaign/NewCampaign";
import Opportunity from "pages/CRM/Opportunity";
import NewOpportunity from "pages/CRM/Opportunity/NewOpportunity";
import Task from "pages/CRM/Task";
import SalePipeline from "pages/CRM/Opportunity/SalePipeline";
import Project from "pages/CRM/Project";
import NewProject from "pages/CRM/Project/NewProject";
import ExtendContract from "pages/Require/ExtendContract";
import CustomerVerify from "pages/CRM/Customer/CustomerVerify";
import CustomerInVerify from "pages/CRM/Customer/CustomerInVerify";
import CustomerInterest from "pages/CRM/Customer/CustomerInterest";
import LeadPotential from "pages/CRM/Lead/pages/LeadPotential";
import TransactionDepositCompleted from "pages/Require/TransactionMoney/DepositCompleted";
import ExtensionManagement from "pages/CallCenter/ExtensionManagement";
import CallReport from "pages/CallCenter/CallReport";
import Quote from "pages/CRM/Quote";
import NewQuotation from "pages/CRM/Quote/NewQuote";
import ChatZalo from "pages/Chat";
import KPIManagement from "pages/KPI/Management/KPIManagement";
import LeadReportPage from "pages/Lead-Report";
import FunnelReportAll from "pages/Report/FunnelReport";
import KPIEmployee from "pages/KPI/KPIEmployee";
import NewKPIEmployee from "pages/KPI/KPIEmployee/NewKPIEmloyee";
import KPIGroup from "pages/KPI/KPIGroup";
import NewKPIGroup from "pages/KPI/KPIGroup/NewKPIGroup";
import Administrators from "pages/Administrators";

//KPI
import Criteria from "pages/KPI/Criteria";
import NewCriteria from "pages/KPI/Criteria/NewCriteria";
import Message from "pages/CallCenter/Message";
import TransactionWithdrawCompleted from "pages/Require/TransactionMoney/WithdrawCompleted";
import VoucherCode from "pages/Ecommerce/VoucherCode";
import Interest from "pages/CRM/Customer/Interest";
import Potential from "pages/CRM/Lead/pages/LeadPotential/Potential";
import Invested from "pages/CRM/Customer/invested";
import Allotment from "pages/CRM/Allotment";
import NewWarehouse from "pages/Product/Warehouse/NewWarehouse";
import WarehouseManagement from "pages/Product/Warehouse/WarehouseManagement";
import NewPo from "pages/Product/PO/NewPo";
import Inventory from "pages/Product/Warehouse/Inventory";
import PO from "pages/Product/PO";
import EventSeminar from "pages/LifeStyle/EventSeminar";
import NewsPage from "pages/LifeStyle/News";
import TweetPage from "pages/LifeStyle/Tweet";
import EmailTemplatePage from "pages/LifeStyle/EmailTemplate";
import NewsDetail from "pages/LifeStyle/News/Detail";
import TweetsDetail from "pages/LifeStyle/Tweet/Detail";
import EmailTemplateDetail from "pages/LifeStyle/EmailTemplate/Detail";
import SeminarDetail from "pages/LifeStyle/EventSeminar/Detail";
import AccountDetail from "pages/LifeStyle/Account/Detail";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/dashboard-saas", component: DashboardSaas },
  { path: "/dashboard-blog", component: DashboardBlog },
  { path: "/:modelName/form-design", component: FormDesign },
  { path: "/:modelName/form-design-2", component: VVSFormDesign2 },
  { path: "/account/new-account", component: NewAccount2 },
  { path: "/account/:id", component: AccountDetail },
  { path: "/bank-account", component: Bank },
  { path: "/bank-account/:id", component: NewBank },
  { path: "/bank-account/new-bank-account", component: NewBank },

  { path: "/holiday", component: Holiday },
  { path: "/holiday/new-holiday", component: NewHoliday },
  { path: "/holiday/:id", component: NewHoliday },

  //profile
  { path: "/profile", component: UserProfile },

  { path: "/lead", component: Lead },
  { path: "/customer", component: Customer },
  { path: "/customer/new-customer", component: NewCustomer },
  { path: "/customer/:id", component: NewCustomer },
  { path: "/lead/new-lead", component: NewLead },
  { path: "/lead/:id", component: NewLead },
  { path: "/contract", component: Contract },
  { path: "/contract/:id", component: DetailContract },
  { path: "/source-lead", component: SourceLead },
  { path: "/contract-early-settle", component: ContractEarlySettle },
  { path: "/contract-early-settle/:id", component: DetailContract },
  { path: "/extend-contract", component: ExtendContract },
  { path: "/extend-contract/:id", component: DetailContract },

  { path: "/customer-group", component: CustomerGroup },
  { path: "/customer-group/new-customer-group", component: NewCustomerGroup },
  { path: "/customer-group/:id", component: NewCustomerGroup },

  { path: "/allotment", component: Allotment },
  { path: "/customer-saving", component: Investment },
  { path: "/customer-saving/:id", component: NewCustomer },
  { path: "/lead-allotment", component: AllotmentLead },
  { path: "/customer-verified", component: CustomerVerify },
  { path: "/customer-verified/:id", component: NewCustomer },
  { path: "/customer-inverified", component: CustomerInVerify },
  { path: "/customer-inverified/:id", component: NewCustomer },
  { path: "/customer-interest", component: CustomerInterest },
  { path: "/customer-interest/:id", component: NewLead },
  { path: "/customer-interest/new-customer-interest", component: NewLead },
  { path: "/lead-potential", component: LeadPotential },
  { path: "/lead-potential/new-lead-potential", component: NewLead },
  { path: "/lead-potential/:id", component: NewLead },

  { path: "/interest", component: Interest },
  { path: "/invested", component: Invested },
  { path: "/interest/:id", component: NewLead },
  { path: "/interest/new-interest", component: NewLead },
  { path: "/potential", component: Potential },
  { path: "/potential/new-potential", component: NewLead },
  { path: "/potential/:id", component: NewLead },

  { path: "/sms-template/", component: SMSTemplate },
  { path: "/send-mass", component: SendMass },
  { path: "/send-mass/new-send-mass", component: NewSendMass },
  { path: "/send-mass/:id", component: NewSendMass },
  { path: "/sms-template/new-sms-template", component: NewSMSTemplate },
  { path: "/sms-template/:id", component: NewSMSTemplate },

  // PHL
  { path: "/user", component: User },
  { path: "/questions", component: Question },
  { path: "/questions/:id", component: DetailQuestion },

  //CMS
  { path: "/post", component: Posts },
  { path: "/post/new-post", component: NewPosts },
  { path: "/post/:id", component: NewPosts },
  // Ecommerce
  { path: "/voucher", component: Voucher },
  { path: "/voucher/new-voucher", component: NewVoucher },
  { path: "/voucher/:id", component: NewVoucher },

  { path: "/voucher-code", component: VoucherCode },

  { path: "/order/new-order", component: NewOrder },
  { path: "/order/:id", component: DetailOrder },
  { path: "/order", component: Order },
  { path: "/purchase-order", component: PurchaseOrder },
  { path: "/purchase-order/:id", component: DetailPurchaseOrder },
  { path: "/fee", component: Fee },
  { path: "/product", component: TableProduct },
  { path: "/product-category", component: ProductCategory },
  {
    path: "/product-category/new-product-category",
    component: NewProductCategory,
  },
  {
    path: "/product-category/:id",
    component: NewProductCategory,
  },
  {
    path: "/warehouse",
    component: WareHouse,
  },
  {
    path: "/gold-price",
    component: GoldPrice,
  },
  {
    path: "/brand",
    component: Brand,
  },
  {
    path: "/vendor",
    component: Vendor,
  },
  //Selling
  { path: "/selling", component: Selling },
  //Buying
  { path: "/buying", component: Buying },
  //chat
  { path: "/chat", component: Chat },
  { path: "/chat-zalo", component: ChatZalo },

  //File Manager
  { path: "/apps-filemanager", component: FileManager },

  //calendar
  { path: "/calendar", component: Calendar },

  //Ecommerce
  { path: "/ecommerce-products", component: EcommerceProducts },
  { path: "/ecommerce-product-details/:id", component: EcommerceProductDetail },

  { path: "/ecommerce-orders", component: EcommerceOrders },
  { path: "/ecommerce-customers", component: EcommerceCustomers },
  { path: "/ecommerce-cart", component: EcommerceCart },
  { path: "/ecommerce-checkout", component: EcommerceCheckout },
  { path: "/ecommerce-shops", component: EcommerceShops },
  { path: "/ecommerce-add-product", component: EcommerceAddProduct },

  //Email
  { path: "/email-inbox", component: EmailInbox },
  { path: "/email-read", component: EmailRead },
  { path: "/email-template-basic", component: EmailBasicTemplte },
  { path: "/email-template-alert", component: EmailAlertTemplte },
  { path: "/email-template-billing", component: EmailTemplateBilling },

  //Blog
  { path: "/blog-list", component: BlogList },
  { path: "/blog-grid", component: BlogGrid },
  { path: "/blog-details", component: BlogDetails },

  //Charts
  { path: "/apex-charts", component: ChartApex },
  { path: "/chartist-charts", component: ChartistChart },
  { path: "/chartjs-charts", component: ChartjsChart },
  { path: "/e-charts", component: EChart },
  { path: "/sparkline-charts", component: SparklineChart },
  { path: "/charts-knob", component: ChartsKnob },
  { path: "/re-charts", component: ReCharts },

  // Icons
  { path: "/icons-boxicons", component: IconBoxicons },
  { path: "/icons-dripicons", component: IconDripicons },
  { path: "/icons-materialdesign", component: IconMaterialdesign },
  { path: "/icons-fontawesome", component: IconFontawesome },

  // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },
  { path: "/tables-dragndrop", component: DragDropTables },

  // Maps
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-vector", component: MapsVector },
  { path: "/maps-leaflet", component: MapsLeaflet },

  // Forms
  { path: "/form-elements", component: FormElements },
  { path: "/form-layouts", component: FormLayouts },
  { path: "/form-advanced", component: FormAdvanced },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-mask", component: FormMask },
  { path: "/form-repeater", component: FormRepeater },
  { path: "/form-uploads", component: FormUpload },
  { path: "/form-wizard", component: FormWizard },
  { path: "/form-validation", component: FormValidations },
  { path: "/form-xeditable", component: FormXeditable },
  { path: "/dual-listbox", component: DualListbox },

  // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-colors", component: UiColors },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-sweet-alert", component: UiSweetAlert },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-rating", component: UiRating },
  { path: "/ui-rangeslider", component: UiRangeSlider },
  { path: "/ui-notifications", component: UiNotifications },
  { path: "/ui-toasts", component: UiToast },
  { path: "/ui-offcanvas", component: UiOffCanvas },
  { path: "/ui-breadcrumb", component: Breadcrumb },
  { path: "/ui-placeholders", component: UiPlaceholders },
  //Utility
  { path: "/pages-starter", component: PagesStarter },
  { path: "/pages-timeline", component: PagesTimeline },
  { path: "/pages-faqs", component: PagesFaqs },
  { path: "/pages-pricing", component: PagesPricing },

  //HR
  { path: "/employee", component: Employee },
  { path: "/employee/new-employee", component: NewEmployee },
  { path: "/employee/:id", component: NewEmployee },
  { path: "/department", component: Department },
  { path: "/department/new-department", component: NewDepartment },
  { path: "/department/:id", component: NewDepartment },
  { path: "/branch", component: Branch },
  { path: "/branch/new-branch", component: NewBranch },
  { path: "/branch/:id", component: NewBranch },

  {
    path: "/employee-group",
    component: EmployeeGroup,
  },
  {
    path: "/employee-group/new-employee-group",
    component: NewEmployeeGroup,
  },
  {
    path: "/employee-group/:id",
    component: NewEmployeeGroup,
  },

  {
    path: "/employee-grade",
    component: EmployeeGrade,
  },
  {
    path: "/employee-grade/new-employee-grade",
    component: NewEmployeeGrade,
  },
  {
    path: "/employee-grade/:id",
    component: NewEmployeeGrade,
  },

  //Product
  { path: "/import", component: Stock },
  { path: "/stock-transfer", component: Stock },
  { path: "/export", component: Stock },
  { path: "/stock-adjustment", component: Stock },
  { path: "/stock-audit", component: Stock },
  { path: "/stock-report", component: StockReport },
  { path: "/user", component: User },
  { path: "/user/:id", component: NewUser },
  {
    path: "/warehouse/new-warehouse",
    component: NewWarehouse,
  },
  {
    path: "/warehouse/:id",
    component: NewWarehouse,
  },
  { path: "/warehouse-management", component: WarehouseManagement },

  { path: "/po/new-po", component: NewPo },
  { path: "/po/:id", component: NewPo },
  { path: "/po", component: PO },
  { path: "/inventory/:id", component: Inventory },

  //Product-Saving
  { path: "/product-saving", component: ProductSaving },
  { path: "/product-saving/new-product-saving", component: NewProductSaving },
  { path: "/product-saving/:id", component: NewProductSaving },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/account" /> },

  { path: "/product/new-product", component: NewProduct },
  { path: "/product/:id", component: NewProduct },
  { path: "/notification", component: Notification },
  { path: "/account", component: Account },
  {
    path: "/settings",
    component: Roles,
  },
  {
    path: "/announcement",
    component: Announcement,
  },
  //Products
  {
    path: "/post-category",
    component: ListPosts,
  },
  {
    path: "/interest-rate",
    component: InterestRate,
  },
  // Promotion
  {
    path: "/promotion",
    component: Promotion,
  },
  {
    path: "/promotion/new-promotion",
    component: NewPromotion,
  },
  {
    path: "/promotion/:id",
    component: DetailPromotion,
  },
  // Report
  {
    path: "/kpi",
    component: Criteria,
  },
  { path: "/kpi/new-kpi", component: NewCriteria },
  { path: "/kpi/:id", component: NewCriteria },
  {
    path: "/kpi-employee",
    component: KPIEmployee,
  },
  { path: "/kpi-employee/new-kpi-employee", component: NewKPIEmployee },
  { path: "/kpi-employee/:id", component: NewKPIEmployee },

  {
    path: "/kpi-group",
    component: KPIGroup,
  },
  { path: "/kpi-group/new-kpi-group", component: NewKPIGroup },
  { path: "/kpi-group/:id", component: NewKPIGroup },
  {
    path: "/report",
    component: ReportPages,
  },
  {
    path: "/kpi-report",
    component: KPIManagement,
  },
  {
    path: "/lead-report",
    component: LeadReportPage,
  },
  {
    path: "/funnel-report",
    component: FunnelReportAll,
  },
  // Require
  {
    path: "/transaction",
    component: TransactionMoney,
  },
  {
    path: "/transaction/:id",
    component: DetailTransactionMoney,
  },
  {
    path: "/transaction-gold",
    component: TransactionGold,
  },
  {
    path: "/transaction-gold/:id",
    component: DetailTransactionGold,
  },

  {
    path: "/order-processed",
    component: OrderProcessed,
  },
  {
    path: "/order-processed/:id",
    component: DetailOrder,
  },
  {
    path: "/transaction-withdraw-completed",
    component: TransactionWithdrawCompleted,
  },
  {
    path: "/transaction-withdraw-completed/:id",
    component: DetailTransactionMoney,
  },
  {
    path: "/transaction-deposit-completed",
    component: TransactionDepositCompleted,
  },
  {
    path: "/transaction-deposit-completed/:id",
    component: DetailTransactionMoney,
  },

  //Call Center
  { path: "/extention-management", component: ExtensionManagement },
  { path: "/call-history", component: CallReport },
  { path: "/message-history", component: Message },

  // Template
  {
    path: "/template",
    component: Template,
  },
  {
    path: "/template/new-template",
    component: NewTemplate,
  },
  {
    path: "/template/:id",
    component: NewTemplate,
  },
  {
    path: "/app/:modelName/:id",
    component: VVSTableDesign2,
  },
  {
    path: "/vvsx/:modelName/:id",
    component: VVSTableFormX,
  },
  {
    path: "/vvs/:modelName/:id",
    component: VVSTable,
  },

  //CRM
  { path: "/competitor", component: Competitor },
  { path: "/competitor/new-competitor", component: NewCompetitor },
  { path: "/competitor/:id", component: NewCompetitor },
  { path: "/campaign", component: Campaign },
  { path: "/campaign/new-campaign", component: NewCampaign },
  { path: "/campaign/:id", component: NewCampaign },
  { path: "/sale-pipeline", component: SalePipeline },
  { path: "/quote", component: Quote },
  { path: "/quote/new-quote", component: NewQuotation },
  { path: "/quote/:id", component: NewQuotation },

  //Project
  { path: "/project", component: Project },
  { path: "/project/new-project", component: NewProject },
  { path: "/project/:id", component: NewProject },

  //Task management
  { path: "/task", component: Task },

  //Opportunity
  { path: "/opportunity", component: Opportunity },
  { path: "/opportunity/new-opportunity", component: NewOpportunity },
  { path: "/opportunity/:id", component: NewOpportunity },
  // Administrators
  {
    path: "/administrators",
    component: Administrators,
  },

  // Life style

  {
    path: "/event-seminar",
    component: EventSeminar,
  },
  {
    path: "/event-seminar/:id",
    component: SeminarDetail,
  },
  {
    path: "/news",
    component: NewsPage,
  },
  {
    path: "/news/:id",
    component: NewsDetail,
  },
  {
    path: "/news/new-news",
    component: NewsDetail,
  },
  {
    path: "/tweet",
    component: TweetPage,
  },
  {
    path: "/tweet/:id",
    component: TweetsDetail,
  },
  {
    path: "/tweet/new-tweet",
    component: TweetsDetail,
  },
  {
    path: "/email-template",
    component: EmailTemplatePage,
  },
  {
    path: "/email-template/:id",
    component: EmailTemplateDetail,
  },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-login-2", component: Login2 },

  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2", component: Register2 },

  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/pages-recoverpw-2", component: Recoverpw2 },

  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/pages-forgot-pwd-2", component: ForgetPwd2 },

  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/auth-lock-screen-2", component: LockScreen2 },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-confirm-mail-2", component: ConfirmMail2 },
  { path: "/auth-email-verification", component: EmailVerification },
  { path: "/auth-email-verification-2", component: EmailVerification2 },
  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },
  { path: "*", component: Pages404 },
];

export { authProtectedRoutes, publicRoutes };
