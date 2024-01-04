import toastr from "toastr";

export const DATA_YOUR_SHORTCUTS = [
  {
    id: 1,
    typeBadge: "success",
    titleBadge: "Success",
    count: 4,
    path: "/posts",
    title: "posts",
  },
  {
    id: 2,
    typeBadge: "dark",
    titleBadge: "Success",
    count: 4,
    path: "/promotional-scheme",
    title: "Promotional Scheme",
  },

  {
    id: 3,
    typeBadge: "inactive",
    titleBadge: "inactive",
    count: 4,
    path: "/voucher",
    title: "Voucher",
  },
];

export const DATABOXTAGS = [
  {
    title: "Posts",
    BoxTags: [
      {
        itemBoxTag: "Posts",
        path: "/posts",
      },
      {
        itemBoxTag: "Discount",
        path: "/discount",
      },
      {
        itemBoxTag: "Voucher",
        path: "/voucher",
      },
    ],
  },
];

export const DATA_CREATE_SETUP = [
  {
    title: "Let's Set Up Your Website..",
    description: "Blogs, Website View Tracking, and more.",
    item: [
      {
        id: 1,
        name: "Introduction to Website",
        data: {
          title: "Introduction to Website",
          content: "",
          nameBtn: "Watch Video",
        },
      },
      {
        id: 2,
        name: "Create Blogger",
        data: {
          title: "Create Blogger",
          content: "",
          nameBtn: "Create Entry",
        },
      },
      {
        id: 3,
        name: "Add Blog Category",
        data: {
          title: "Add Blog Category",
          content: "",
          nameBtn: "Create Entry",
        },
      },
      {
        id: 4,
        name: "Enable Website Tracking",
        data: {
          title: "Enable Website Tracking",
          content: "",
          nameBtn: "Update Settings",
        },
      },
      {
        id: 5,
        name: "Learn about Web Pages",
        data: {
          title: "Learn about Web Pages",
          content: "",
          nameBtn: "Show Form Tour",
        },
      },
    ],
  },
];

export const DATA_FILTER_TABLE = [
  {
    id: "posts",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "promotional-scheme",
    isFilterDate: false,
    isFilterSearch: true,
  },
  {
    id: "voucher",
    isFilterDate: false,
    isFilterSearch: true,
  },
];

export const COLUMNS_TABLE = [
  {
    path: "posts",
    columnsPage: [
      {
        dataField: "thumbnail",
        text: "Thumbnail",
        sort: true,
      },
      {
        dataField: "title",
        text: "Title",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "category.name",
        text: "Category",
        sort: true,
      },
      {
        dataField: "createdBy.username",
        text: "Created By",
        sort: true,
      },

      {
        dataField: "createdAt",
        text: "Created At",
        sort: true,
      },
    ],
  },

  {
    path: "promotional-scheme",
    columnsPage: [
      {
        dataField: "image",
        text: "Image",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "applyOn",
        text: "Apply On",
        sort: true,
      },
      {
        dataField: "disable",
        text: "Disable",
        sort: true,
      },
      {
        dataField: "validFrom",
        text: "Date Start",
        sort: true,
      },
      {
        dataField: "validUpto",
        text: "Date End",
        sort: true,
      },
    ],
  },

  {
    path: "voucher",
    columnsPage: [
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "count",
        text: "Count",
        sort: true,
      },
      {
        dataField: "branch.name",
        text: "Branch Apply",
        sort: true,
      },
      {
        dataField: "displayApp",
        text: "Display App",
        sort: true,
      },
      {
        dataField: "dateStart",
        text: "Date Start",
        sort: true,
      },
      {
        dataField: "dateEnd",
        text: "Date End",
        sort: true,
      },
    ],
  },
];

export const DATA_TABLE_COMMON_CMS = {
  itemCode: [
    {
      dataField: "itemCode",
      text: "Item Code",
    },
    {
      dataField: "uom",
      text: "UOM",
    },
  ],
  itemGroup: [
    {
      dataField: "itemGroup",
      text: "Item Group",
    },
    {
      dataField: "uom",
      text: "UOM",
    },
  ],
  brand: [
    {
      dataField: "brand",
      text: "Brand",
    },
    {
      dataField: "uom",
      text: "UOM",
    },
  ],

  priceDiscountSlabs: [
    {
      dataField: "minQty",
      text: "Min Qty",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "maxQty",
      text: "Max Qty",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "minAmount",
      text: "Min Amount",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "maxAmount",
      text: "Max Amount",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "discountType",
      text: "Discount Type",
    },
    {
      dataField: "discountValue",
      text: "Discount Value",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "rate",
      text: "Rate",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "branch",
      text: "Branch",
    },
  ],

  productDiscountSlabs: [
    {
      dataField: "minQty",
      text: "Min Qty",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "maxQty",
      text: "Max Qty",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "minAmount",
      text: "Min Amount",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "maxAmount",
      text: "Max Amount",
      validator: newValue => {
        if (isNaN(newValue)) {
          return toastr.error("From Amount should be numeric");
        }
      },
      formatter: cell => {
        return Number(cell).toLocaleString("it-IT");
      },
    },
    {
      dataField: "itemCode",
      text: "Item Code",
    },
    {
      dataField: "branch",
      text: "Branch",
    },
  ],
};
