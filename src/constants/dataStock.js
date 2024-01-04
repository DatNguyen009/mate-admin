export const DATA_TABLE_COMMON_STOCK = {
  applicableForCountries: [
    {
      dataField: "country",
      text: "Country",
    },
  ],
  barcodes: [
    {
      dataField: "barcode",
      text: "Barcode",
    },
    {
      dataField: "barcodeType",
      text: "Barcode Type",
    },
  ],
  autoReOrder: [
    {
      dataField: "checkIn",
      text: "Check in (group)",
    },
    {
      dataField: "requestFor",
      text: "Request for",
    },
    {
      dataField: "reOrderLevel",
      text: "ReOrderLevel",
    },
    {
      dataField: "reOrderQty",
      text: "Re-order Qty",
    },
    {
      dataField: "materialRequestType",
      text: "Material Request Type",
    },
  ],
  unitsOfMeasure: [
    {
      dataField: "uom",
      text: "UOM",
    },
    {
      dataField: "conversionFactor",
      text: "Conversion Factor",
    },
  ],
  attributes: [
    {
      dataField: "attribute",
      text: "Attribute",
    },
    {
      dataField: "attributeValue",
      text: "Attribute Value",
    },
  ],
  itemDefaults: [
    {
      dataField: "company",
      text: "Company",
    },
    {
      dataField: "defaultWarehouse",
      text: "Default Warehouse",
    },
    {
      dataField: "defaultPriceList",
      text: "Default Price List",
    },
  ],
  supplierItems: [
    {
      dataField: "supplier",
      text: "Supplier",
    },
    {
      dataField: "supplierPartNumber",
      text: "Supplier Part Number",
    },
  ],
  customerItems: [
    {
      dataField: "customerName",
      text: "Customer Name",
    },
    {
      dataField: "customerGroup",
      text: "Customer Group",
    },
    {
      dataField: "refCode",
      text: "Ref Code",
    },
  ],
  taxes: [
    {
      dataField: "itemTaxTemplate",
      text: "Item Tax Template",
    },
    {
      dataField: "taxCategory",
      text: "Tax Category",
    },
    {
      dataField: "validFrom",
      text: "Valid From",
    },
    {
      dataField: "minimumNetRate",
      text: "Minimum Net Rate",
    },
    {
      dataField: "maximumNetRate",
      text: "Maximum Net Rate",
    },
  ],
  websiteItemGroups: [
    {
      dataField: "itemGroup",
      text: "Item Group",
    },
  ],
  packageItems: [
    {
      dataField: "item",
      text: "item",
    },
    {
      dataField: "qty",
      text: "qty",
    },
    {
      dataField: "description",
      text: "description",
    },
    {
      dataField: "uom",
      text: "UOM",
    },
  ],
  products: [
    {
      dataField: "product",
      text: "Product Name",
    },
    {
      dataField: "price",
      text: "Price ($)",
      editable: false,
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "total",
      text: "Total ($)",
      editable: false,
    },
  ],
  receiveUsers: [
    {
      dataField: "username",
      text: "Username",
    },
    {
      dataField: "fullName",
      text: "Full Name",
      editable: false,
    },
    {
      dataField: "status",
      text: "Status",
      editable: false,
    },
  ],
  itemAttributeValues: [
    {
      dataField: "attributeValue",
      text: "Attribute Value",
    },
    {
      dataField: "abbreviation",
      text: "Abbreviation",
    },
  ],
};

export const TITLE_STATUS_STOCK = {
  item: "item",
};

export const COLUMNS_TABLE = [
  {
    path: "item",
    columnsPage: [
      {
        dataField: "itemCode",
        text: "Item Code",
        sort: true,
      },
      {
        dataField: "itemName",
        text: "Item Name",
        sort: true,
      },
      {
        dataField: "disabled",
        text: "Status",
        sort: true,
      },
      {
        dataField: "itemGroup.name",
        text: "Item Group",
        sort: true,
      },
      {
        dataField: "createdAt",
        text: "innitiated date",
      },
    ],
  },
  {
    path: "warehouse",
    columnsPage: [
      {
        dataField: "warehouseName",
        text: "WareHouse Name",
        sort: true,
      },
      {
        dataField: "disabled",
        text: "Status",
        sort: true,
      },
      {
        dataField: "isGroup",
        text: "Is Group",
        sort: true,
      },
      {
        dataField: "company.name",
        text: "Company",
        sort: true,
      },
      {
        dataField: "city",
        text: "City",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
    ],
  },
  {
    path: "item-attribute",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "attributeName",
        text: "Attribute Name",
        sort: true,
      },
    ],
  },
  {
    path: "price-list",
    columnsPage: [
      {
        dataField: "priceListName",
        text: "Name",
        sort: true,
      },
      {
        dataField: "enabled",
        text: "Status",
        sort: true,
      },
      {
        dataField: "currency",
        text: "Currency",
        sort: true,
      },
      {
        dataField: "buying",
        text: "Buying",
        sort: true,
      },
      {
        dataField: "selling",
        text: "Selling",
        sort: true,
      },
    ],
  },
  {
    path: "product-bundle",
    columnsPage: [
      {
        dataField: "id",
        text: "No",
      },
      {
        dataField: "parentItem",
        text: "Parent Item",
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
    path: "material-request",
    columnsPage: [
      {
        dataField: "series",
        text: "Series",
        sort: true,
      },
      {
        dataField: "transactionDate",
        text: "Transaction Date",
        sort: true,
      },
      {
        dataField: "purpose",
        text: "Purpose",
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
    path: "material-request",
    columnsPage: [
      {
        dataField: "series",
        text: "Series",
        sort: true,
      },
      {
        dataField: "transactionDate",
        text: "Transaction Date",
        sort: true,
      },
      {
        dataField: "purpose",
        text: "Purpose",
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
    path: "order",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "customer.name",
        text: "Customer",
        sort: true,
      },
      {
        dataField: "total",
        text: "Total",
        sort: true,
      },
      {
        dataField: "paymentMethod",
        text: "Payment Method",
        sort: true,
      },
      {
        dataField: "receivingType",
        text: "Type of Receiving",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "date",
        text: "Created Date",
        sort: true,
      },
    ],
  },
  {
    path: "product",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "category.name",
        text: "Category",
        sort: true,
      },
      {
        dataField: "sellingPrice",
        text: "Price",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
    ],
  },
  {
    path: "notification",
    columnsPage: [
      {
        dataField: "title",
        text: "Title",
        sort: true,
      },
      {
        dataField: "sentNotifications",
        text: "Sent Notifications",
        sort: true,
      },
      {
        dataField: "notificationReadingRate",
        text: "Notification Reading Rate",
        sort: true,
      },
      {
        dataField: "sentTime",
        text: "Sent Time",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
    ],
  },
];

export const DATA_FILTER_TABLE = [
  {
    id: "item",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "product-bundle",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "warehouse",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "item-attribute",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "price-list",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "material-request",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "material-request",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "order",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "product",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "notification",
    isFilterDate: false,
    isFilterSearch: true,
  },
];

export const DATA_DROPDOWN_MENU_STOCK = [
  {
    id: 1,
    name: "Import",
  },
  {
    id: 2,
    name: "User Permissions",
  },
  {
    id: 3,
    name: "Role Permissions Manager",
  },
  {
    id: 4,
    name: "Customize",
  },
  {
    id: 5,
    name: "Toggle Sidebar",
  },
  {
    id: 6,
    name: "Share URL",
  },
  {
    id: 7,
    name: "List Setting",
  },
];

export const DATA_DROPDOWN_LISTVIEW_STOCK = [
  {
    id: 1,
    icon: "bx bx-file",
    name: "Report",
  },
  {
    id: 2,
    icon: "bx bxs-dashboard",
    name: "Dashboard",
  },
  {
    id: 3,
    icon: "bx bxs-layout",
    name: "Kanban",
  },
  {
    id: 4,
    icon: "bx bx-images",
    name: "image",
  },
];

export const DATA_QUICK_ACCESS = [
  {
    id: 1,
    typeBadge: "success",
    titleBadge: "Available",
    count: 14,
    path: "/item",
    title: "Item",
  },
  {
    id: 2,
    typeBadge: "dark",
    titleBadge: "Pending",
    count: 0,
    path: "/leave-application",
    title: "Material Request",
  },
  {
    id: 3,
    typeBadge: "success",
    titleBadge: "Open",
    count: 3,
    path: "/stock-entry",
    title: "Stock Entry",
  },
  {
    id: 4,
    typeBadge: "warning",
    titleBadge: "To Bill",
    count: 1,
    path: "/purchase-receipt",
    title: "Purchase Receipt",
  },
  {
    id: 5,
    typeBadge: "dark",
    titleBadge: "To Bill",
    count: 0,
    path: "/delivery-note",
    title: "Delivery Note",
  },
  {
    id: 6,
    typeBadge: "danger",
    titleBadge: "Open",
    count: 3,
    path: "/stock-ledger",
    title: "Stock Ledger",
  },
  {
    id: 7,
    typeBadge: "info",
    titleBadge: "Open",
    count: 3,
    path: "/stock-balance",
    title: "Stock Balance",
  },
  {
    id: 7,
    typeBadge: "success",
    titleBadge: "Open",
    count: 3,
    path: "/dashboard",
    title: "Dashboard",
  },
];

export const DATABOXTAGS = [
  {
    title: "Items and Pricing",
    BoxTags: [
      {
        itemBoxTag: "Item",
        path: "/item",
        countEmployee: [],
      },
      {
        itemBoxTag: "Item Group",
        countEmployee: [],
        path: "/item-group",
      },
      {
        itemBoxTag: "Product Bundle",
        countEmployee: [],
        path: "/product-bundle",
      },
      {
        itemBoxTag: "Price List",
        countEmployee: [],
        path: "/price-list",
      },
      {
        itemBoxTag: "Shipping Rule",
        countEmployee: [],
        path: "/shipping-rule",
      },
      {
        itemBoxTag: "Pricing Rule",
        countEmployee: [],
        path: "/pricing-rule",
      },
      {
        itemBoxTag: "Item Alternative",
        countEmployee: [],
        path: "/price-list",
      },
      {
        itemBoxTag: "Item Manufacturer",
        countEmployee: [],
        path: "/item-manufacturer",
      },
      {
        itemBoxTag: "Customs Tariff Number",
        countEmployee: [],
        path: "/customs-tariff-number",
      },
    ],
  },

  {
    title: "Stock Transactions",
    BoxTags: [
      {
        itemBoxTag: "Material Request",
        countEmployee: [],
        path: "/material-request",
      },
      {
        itemBoxTag: "Stock Entry",
        countEmployee: [],
        path: "/stock-entry",
      },
      {
        itemBoxTag: "Delivery Note",
        countEmployee: [],
        path: "/delivery-note",
      },
      {
        itemBoxTag: "Purchase Receipt",
        countEmployee: [],
        path: "/purchase-receipt",
      },
      {
        itemBoxTag: "Pick List",
        countEmployee: [],
        path: "/pick-list",
      },
      {
        itemBoxTag: "Delivery Trip",
        countEmployee: [],
        path: "/delivery-trip",
      },
    ],
  },
  {
    title: "Stock Reports",
    BoxTags: [
      {
        itemBoxTag: "Stock Ledger",
        path: "/stock-ledger",
        countEmployee: [],
      },
      {
        itemBoxTag: "Stock Balance",
        path: "/stock-balance",
        countEmployee: [],
      },
      {
        itemBoxTag: "Stock Projected Qty",
        path: "/stock-projected-qty",
        countEmployee: [],
      },
      {
        itemBoxTag: "Stock Summary",
        path: "/stock-summary",
        countEmployee: [],
      },
      {
        itemBoxTag: "Stock Ageing",
        path: "/stock-ageing",
        countEmployee: [],
      },
      {
        itemBoxTag: "Item Price Stock",
        path: "/item-price-stock",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Order",
    BoxTags: [
      { itemBoxTag: "Order", path: "/order", countEmployee: [] },
      { itemBoxTag: "Order Item", path: "/order-item", countEmployee: [] },
      { itemBoxTag: "Product", path: "/product", countEmployee: [] },
      { itemBoxTag: "Transaction", path: "/transaction", countEmployee: [] },
      { itemBoxTag: "Notification", path: "/notification" },
    ],
  },
  {
    title: "Settings",
    BoxTags: [
      {
        itemBoxTag: "Stock Settings",
        path: "/stock-settings",
        countEmployee: [],
      },
      {
        itemBoxTag: "Warehouse",
        path: "/warehouse",
        countEmployee: [],
      },
      {
        itemBoxTag: "Unit of Measure (UOM)",
        path: "/unit-of-measure",
        countEmployee: [],
      },
      {
        itemBoxTag: "Item Variant Settings",
        path: "/item-variant-settings",
        countEmployee: [],
      },
      {
        itemBoxTag: "Brand",
        path: "/brand",
        countEmployee: [],
      },
      {
        itemBoxTag: "Item Attribute",
        path: "/item-attribute",
        countEmployee: [],
      },
      {
        itemBoxTag: "UOM Conversion Factor",
        path: "/conversion-factor",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Serial No and Batch",
    BoxTags: [
      {
        itemBoxTag: "Serial No",
        path: "/serial-no",
        countEmployee: [],
      },
      {
        itemBoxTag: "Batch",
        path: "/batch",
        countEmployee: [],
      },
      {
        itemBoxTag: "Installation Note",
        path: "/installation-note",
        countEmployee: [],
      },
      {
        itemBoxTag: "Serial No Service Contract Expiry",
        path: "/serial-no-service-contract-expiry",
        countEmployee: [],
      },
      {
        itemBoxTag: "Serial No Status",
        path: "/serial-no-status",
        countEmployee: [],
      },
      {
        itemBoxTag: "Serial No Warranty Expiry",
        path: "/serial-no-warranty-expiry",
        countEmployee: [],
      },
    ],
  },
  {
    title: "Tools",
    BoxTags: [
      {
        itemBoxTag: "Stock Reconciliation",
        path: "/stock-reconciliation",
        countEmployee: [],
      },
      {
        itemBoxTag: "Landed Cost Voucher",
        path: "/landed-cost-voucher",
        countEmployee: [],
      },
      {
        itemBoxTag: "Packing Slip",
        path: "/packing-slip",
        countEmployee: [],
      },
      {
        itemBoxTag: "Quality Inspection",
        path: "/quality-inspection",
        countEmployee: [],
      },
      {
        itemBoxTag: "Quality Inspection Template",
        path: "/quality-inspection-template",
        countEmployee: [],
      },
      {
        itemBoxTag: "Quick Stock Balance",
        path: "/quick-stock-balance",
        countEmployee: [],
      },
    ],
  },

  {
    title: "Key Reports",
    BoxTags: [
      {
        itemBoxTag: "Item-wise Price List Rate",
        path: "/item-wise-price-list-rate",
        countEmployee: [],
      },
      {
        itemBoxTag: "Stock Analytics",
        path: "/stock-analytics",
        countEmployee: [],
      },
      {
        itemBoxTag: "Stock Qty vs Serial No Count",
        path: "/stock-qty-vs-serial-no-count",
        countEmployee: [],
      },
      {
        itemBoxTag: "Delivery Note Trends",
        path: "/delivery-note-trends",
        countEmployee: [],
      },
      {
        itemBoxTag: "Purchase Receipt Trends",
        path: "/purchase-receipt-trends",
        countEmployee: [],
      },
      {
        itemBoxTag: "Sales Order Analysis",
        path: "/sales-order-analysis",
        countEmployee: [],
      },
      {
        itemBoxTag: "Purchase Order Analysis",
        path: "/purchase-order-analysis",
        countEmployee: [],
      },
      {
        itemBoxTag: "Item Shortage Report",
        path: "/Item Shortage Report    ",
        countEmployee: [],
      },
      {
        itemBoxTag: "Batch-Wise Balance History",
        path: "/batch-wise-balance-history",
        countEmployee: [],
      },
    ],
  },

  {
    title: "Other Reports",
    BoxTags: [
      {
        itemBoxTag: "Requested Items To Be Transferred",
        countEmployee: [],
        path: "/requested-items-to-be-transferred",
      },
      {
        itemBoxTag: "Batch Item Expiry Status",
        countEmployee: [],
        path: "/batch-item-expiry-status",
      },
      {
        itemBoxTag: "Item Prices",
        countEmployee: [],
        path: "/item-prices",
      },
      {
        itemBoxTag: "Itemwise Recommended Reorder Level",
        countEmployee: [],
        path: "/itemwise-recommended-reorder-level",
      },
      {
        itemBoxTag: "Item Variant Details",
        countEmployee: [],
        path: "/item-variant-details",
      },
      {
        itemBoxTag: "Subcontracted Raw Materials To Be Transferred",
        countEmployee: [],
        path: "/subcontracted-raw-materials-to-be-transferred",
      },
      {
        itemBoxTag: "Subcontracted Item To Be Received",
        countEmployee: [],
        path: "/subcontracted-item-to-be-received",
      },
      {
        itemBoxTag: "Stock and Account Value Comparison",
        countEmployee: [],
        path: "/stock-and-account-value-comparison",
      },
    ],
  },
];

export const PRODUCT_WARRANTY = `<div class="intro">
<p>- VSJ bảo h&agrave;nh miễn ph&iacute; si&ecirc;u &acirc;m l&agrave;m mới trang sức v&agrave;ng trong suốt qu&aacute; tr&igrave;nh bảo h&agrave;nh</p>
<p>- Bảo h&agrave;nh t&iacute;nh ph&iacute; đối với c&aacute;c lỗi, hư hỏng c&oacute; thể khắc phục, sửa chữa do lỗi người d&ugrave;ng trong qu&aacute; tr&igrave;nh sử dụng.</p>
<p>- VSJ sẽ kh&ocirc;ng nhận bảo h&agrave;nh sản phẩm hoặc bảo h&agrave;nh t&iacute;nh ph&iacute; khi kh&aacute;ch kh&ocirc;ng xuất tr&igrave;nh phiếu b&aacute;n h&agrave;ng.</p>
<p>- VSJ c&oacute; thể nhận từ chối bảo h&agrave;nh trường hợp sản phẩm bị hư hỏng do người d&ugrave;ng trong qu&aacute; tr&igrave;nh sử dụng, c&aacute;c lỗi kh&ocirc;ng thể khắc phục được.</p>
<p>- VSJ kh&ocirc;ng chịu tr&aacute;ch nhiệm bảo h&agrave;nh đối với sản phẩm đ&atilde; bị can thiệp bởi một đơn vị kh&aacute;c trước đ&oacute;.</p>
</div>
`;

export const PRODUCT_PAYMENT_DELIVERY = `<div class="intro">
<p>- VSJ bảo h&agrave;nh miễn ph&iacute; si&ecirc;u &acirc;m l&agrave;m mới trang sức v&agrave;ng trong suốt qu&aacute; tr&igrave;nh bảo h&agrave;nh</p>
<p>- Bảo h&agrave;nh t&iacute;nh ph&iacute; đối với c&aacute;c lỗi, hư hỏng c&oacute; thể khắc phục, sửa chữa do lỗi người d&ugrave;ng trong qu&aacute; tr&igrave;nh sử dụng.</p>
<p>- VSJ sẽ kh&ocirc;ng nhận bảo h&agrave;nh sản phẩm hoặc bảo h&agrave;nh t&iacute;nh ph&iacute; khi kh&aacute;ch kh&ocirc;ng xuất tr&igrave;nh phiếu b&aacute;n h&agrave;ng.</p>
<p>- VSJ c&oacute; thể nhận từ chối bảo h&agrave;nh trường hợp sản phẩm bị hư hỏng do người d&ugrave;ng trong qu&aacute; tr&igrave;nh sử dụng, c&aacute;c lỗi kh&ocirc;ng thể khắc phục được.</p>
<p>- VSJ kh&ocirc;ng chịu tr&aacute;ch nhiệm bảo h&agrave;nh đối với sản phẩm đ&atilde; bị can thiệp bởi một đơn vị kh&aacute;c trước đ&oacute;.</p>
</div>
`;
