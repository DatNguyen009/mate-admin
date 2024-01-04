export const KPI_MANAGEMENT = handleOpenModal => {
  return [
    {
      id: 1,
      title: "Tổng số KPI thưởng (VNĐ)",
      // content: "VNĐ",
      nameIcon: "bx bx-message-check",
      onClick: () => {
        handleOpenModal(true);
      },
      style: {
        cursor: "pointer",
      },
    },
    {
      id: 2,
      title: "Tổng doanh thu (VNĐ)",
      // content: "VNĐ",
      nameIcon: "bx bx-message-rounded-minus",
    },
    {
      id: 3,
      title: "Tổng hoa hồng (VNĐ)",
      // content: "VNĐ",
      nameIcon: "bx bx-message-rounded-minus",
    },
    {
      id: 4,
      title: "Tổng HĐ",
      // content: "Hợp đồng",
      nameIcon: "bx bx-area",
    },
  ];
};

export const LIST_ITEM = [
  {
    id: 1,
    title: "Tổng Hợp Đồng Hôm Nay",
    content: "Hợp Đồng Tích Luỹ",
    nameIcon: "bx bx-message-check",
  },
  {
    id: 2,
    title: "Tổng Đơn Hàng Hôm Nay",
    content: "Đơn Hàng",
    nameIcon: "bx bx-message-rounded-minus",
  },
  {
    id: 3,
    title: "Tổng Số Lượng Nhân Viên",
    content: "Nhân Viên",
    nameIcon: "bx bx-area",
  },
  {
    id: 4,
    title: "Khách Hàng Mới Trong Tháng",
    content: "Khách Hàng",
    nameIcon: "bx bx-group",
  },
];

export const LIST_ITEM_SALE = [
  {
    id: 1,
    title: "Tổng Lead ",
    content: "Khách hàng",
    nameIcon: "bx bx-message-check",
  },
  {
    id: 2,
    title: "Tổng KH tiềm năng",
    content: "Khách hàng",
    nameIcon: "bx bx-message-rounded-minus",
  },
  {
    id: 3,
    title: "Tổng KH quan tâm",
    content: "Khách hàng",
    nameIcon: "bx bx-area",
  },
  {
    id: 4,
    title: "Tổng KH Mua gói tích lũy",
    content: "Khách hàng",
    nameIcon: "bx bx-group",
  },
];
export const LIST_REPORT = [
  {
    id: 1,
    title: "Tổng tiền đã nạp",
    content: "",
    nameIcon: "bx bx-message-check",
    number: 100,
  },
  {
    id: 2,
    title: "Tổng tiền đã rút",
    content: "",
    nameIcon: "bx bx-message-rounded-minus",
    number: 10000,
  },
  {
    id: 3,
    title: "Tổng doanh thu(hợp đồng)",
    content: "",
    nameIcon: "bx bx-area",
    number: 3000,
  },
];

export const LIST_REPORT_LEAD = [
  {
    id: 1,
    title: "Tổng Khách hàng tiềm năng",
    nameIcon: "bx bx-group",
  },
  {
    id: 2,
    title: "Tổng trạng thái hiện có",
    nameIcon: "bx bx-message-check",
  },
  {
    id: 3,
    title: "Tổng khu vực hiện có",
    nameIcon: "bx bx-area",
  },
  {
    id: 4,
    title: "Tổng nguồn hiện có",
    nameIcon: "bx bx-message-rounded-minus",
  },
];
export const DATA_CURRENT = [
  {
    title: "Đơn hàng gần đây",
    modelName: "Order",
    orderField: "createdAt",
    limit: 4,
  },
];
export const DATA_CHART = [
  {
    titleOfLine:
      "Tổng số lượng khách hàng truy cập thông qua các nền tảng quảng cáo ",
    titleOfBar: "Tổng doanh thu hôm nay",
    titleOfDoughnut: "Doanh thu tháng 2",
    data: [
      {
        branch: "Chi Nhánh 1",
        turnover: 1000000,
      },
      {
        branch: "Chi Nhánh 2",
        turnover: 2000000,
      },
      {
        branch: "Chi Nhánh 3",
        turnover: 3000000,
      },
      {
        branch: "Chi Nhánh 4",
        turnover: 4000000,
      },
    ],
  },
];

export const DATA_CUSTOMER_REPORT = [
  {
    title: "Báo cáo thống kê nguồn khách hàng qua các nền tảng",
    data: [
      {
        customerId: "#001",
        customerName: "Nguyễn Văn A",
        customerResources: "Youtube",
      },
      {
        customerId: "#002",
        customerName: "Nguyễn Văn B",
        customerResources: "Youtube",
      },
      {
        customerId: "#003",
        customerName: "Nguyễn Văn C",
        customerResources: "Youtube",
      },
      {
        customerId: "#004",
        customerName: "Nguyễn Văn D",
        customerResources: "Youtube",
      },
    ],
  },
];

export const DATA_AGENCY_CHART = [
  {
    title: "Tổng doanh thu theo đại lý",
    data: [
      {
        agency: "Đại lý 1",
        quantity: 1,
      },
      {
        agency: "Đại lý 2",
        quantity: 2,
      },
      {
        agency: "Đại lý 3",
        quantity: 3,
      },
      {
        agency: "Đại lý 4",
        quantity: 4,
      },
    ],
  },
];
