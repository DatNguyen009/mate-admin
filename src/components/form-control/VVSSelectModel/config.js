const DEFAULT_CONFIG = {
  PaymentTerm: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Employee: {
    renderedField: "fullName",
    fieldView: ["fullName", "series"],
    searchField: ["fullName", "employeeId", "phone"],
  },
  Company: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Branch: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Department: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  _Role: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Lead: {
    renderedField: "leadId",
    fieldView: ["leadId", "name"],
    searchField: ["leadId"],
  },
  Customer: {
    renderedField: "fullName",
    fieldView: ["phone", "fullName"],
    searchField: ["phone"],
  },
  CustomerByPhone: {
    renderedField: "phone",
    fieldView: ["phone"],
    // models: ["_User"],
    searchField: ["phone"],
  },
  CustomerByName: {
    renderedField: "fullName",
    fieldView: ["fullName"],
    searchField: ["fullName"],
  },
  Campaign: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Category: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Brand: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Product: {
    renderedField: "name",
    searchField: ["name", "barcode"],
    fieldView: ["name", "barcode"],
  },
  ProductByBarcode: {
    renderedField: "barcode",
    searchField: ["name", "barcode"],
    fieldView: ["name", "barcode"],
  },
  ProductVariance: {
    renderedField: "barcode",
    searchField: [
      "barcode",
      "color",
      "size",
      "totalWeight",
      "goldWeight",
      "stoneWeight",
    ],
    fieldView: ["name", "barcode"],
  },
  WareHouse: {
    renderedField: "name",
    searchField: ["name", "code"],
    fieldView: ["name", "code"],
  },
  department: {
    renderedField: "Name",
    fieldView: ["Name"],
    models: ["SysCfg"],
    searchField: ["Name"],
  },
  Vendor: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  EmployeeGroup: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  EmployeeGrade: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  CustomerMember: {
    renderedField: "code",
    fieldView: ["code", "fullName"],
    searchField: ["code"],
  },
  EmployeeMember: {
    renderedField: "employeeId",
    fieldView: ["employeeId", "fullName"],
    searchField: ["employeeId", "fullName", "phone"],
  },
  Kpi: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  NotificationTemplate: {
    renderedField: "title",
    fieldView: ["title", "name"],
    searchField: ["title"],
  },
  Campaign: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
  Project: {
    renderedField: "name",
    fieldView: ["name"],
    searchField: ["name"],
  },
};
export default DEFAULT_CONFIG;
