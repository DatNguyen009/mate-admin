import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import { CommonText } from "components/Common/TextCommon";
import InputField from "components/form-control/InputField";
import { GET_CURRENT_USER } from "helpers/url_helper";
import Table from "components/form-control/Table";
import { formatNumber, roundedMoney } from "helpers/erp_helper";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Card, Col, Container, Row, ModalBody, ModalFooter } from "reactstrap";
import ModalCommon from "components/Common/ModalCommon";
import * as yup from "yup";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import httpService from "services/httpService";
import { Link } from "react-router-dom";
import { useState } from "react";
import toastr from "toastr";
import InputQuantity from "components/form-control/InputQuantity";
import OrderInfo from "./OrderInfo";
import Clock from "../../../components/Common/Clock";
import SelectConst from "components/form-control/SelectConst";
import { useEffect } from "react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { apiGetCustomerCashAccount } from "./apiGetCustomerCashAccount";
import { BreadCrumbs } from "components/Common/Breadcrumbs";
import ModalAppointment from "./ModalAppointment";
import ModalNewCustomer from "./ModalNewCustomer";
import Order from "components/Modal/Order";
import { useReactToPrint } from "react-to-print";

const defaultValues = {
  useMasterKey: true,
  paymentMethod: "cod",
  voucherIds: [],
  customerId: "",
  note: "",
  items: [],
  delivery: {},
  shopId: "",
  interestRateId: "",
  signature: "",
  customer: {
    fullName: "",
    addressCombined: "",
    email: "",
    user: {
      phone: "",
    },
    objectId: "",
  },
  total: 0,
  searchCategory: "phone",
};
const defaultValuesModal = {
  codMethod: "cash",
  receivedMoney: "",
  refundedMoney: -1,
  accountNumber: "",
};
const shoppingCartHeader = [
  {
    text: "Mã vạch",
    CellComponent: VVSSelectModel,
    cellComponentProps: (formProps, indexOfRow) => ({
      style: { width: "8rem" },
      name: `items.${indexOfRow}.product.barcode`,
      model: "Product",
      configName: "ProductByBarcode",
      onSelect: async item => {
        const { setValue, getValues } = formProps;
        if (item) {
          try {
            const url = "/api/v1/shopping-cart";
            const response = await httpService.post(url, {
              ...getValues(),
              items: [
                {
                  productId: item.objectId,
                  quantity: getValues(`items.${indexOfRow}.quantity`),
                },
              ],
            });
            const productInfo = response.results.items[0];
            setValue(`items.${indexOfRow}.product`, item);
            setValue(
              `items.${indexOfRow}.sellingPrice`,
              Math.round(productInfo.sellingPrice)
            );
            setValue(
              "total",
              getValues("total") -
                getValues(`items.${indexOfRow}.total`) +
                Math.round(productInfo.total)
            );
            setValue(
              `items.${indexOfRow}.total`,
              Math.round(productInfo.price)
            );
          } catch (err) {
            console.log(err);
          }
        }
      },
    }),
  },
  {
    text: "Hình ảnh",
    field: "product.image.url",
    formatter: cell => (
      <img src={cell || ""} style={{ objectFit: "cover", width: "64px" }} />
    ),
  },
  {
    text: "Sản phẩm",
    field: "product",
    formatter: product =>
      product.name &&
      `${product.name}. Loại vàng:${product.goldType}. KLT:${product.totalWeight}. KLĐ:${product.stoneWeight}. KLV:${product.goldWeight}`,
  },
  {
    text: "Số lượng",
    CellComponent: InputQuantity,
    textAlign: "center",
    cellComponentProps: (formProps, indexOfRow) => ({
      name: `items.${indexOfRow}.quantity`,
      onChange: value => {
        const { setValue, getValues } = formProps;
        setValue(
          "total",
          getValues("total") -
            getValues(`items.${indexOfRow}.total`) +
            value *
              (getValues(`items.${indexOfRow}.sellingPrice`) +
                getValues(`items.${indexOfRow}.product.serviceFee`))
        );
        setValue(
          `items.${indexOfRow}.total`,
          value *
            (getValues(`items.${indexOfRow}.sellingPrice`) +
              getValues(`items.${indexOfRow}.product.serviceFee`))
        );
      },
    }),
  },
  {
    text: "Đơn giá",
    field: "sellingPrice",
    textAlign: "right",
    formatter: formatNumber,
  },
  {
    text: "Tiền công",
    field: "product.serviceFee",
    textAlign: "right",
    formatter: formatNumber,
  },
  {
    text: "Tổng",
    field: "total",
    dependentField: true,
    formatter: formatNumber,
    textAlign: "right",
  },
];
const defaultShoppingCartRowValue = {
  product: {
    name: "",
    productId: "",
    objectId: "",
    sellingPrice: 0,
    promotionPrice: 0,
  },
  total: 0,
  quantity: 1,
};
const formatBeforePost = values => {
  const items = values.items.map(item => ({
    productId: item.product.objectId,
    quantity: item.quantity,
  }));
  const { customer, ...postPackage } = {
    ...values,
    customerId: values.customer?.objectId || null,
    items,
  };
  return postPackage;
};
const searchOptionToSelectProps = searchOption => {
  switch (searchOption) {
    case "phone":
      return {
        configName: "CustomerByPhone",
      };
    case "name":
      return {
        configName: "CustomerByName",
      };
    default:
      break;
  }
};
const searchCategoryOptions = [
  { value: "phone", text: "SĐT" },
  { value: "name", text: "Tên" },
];
export default function Selling() {
  const [orderInfo, setOrderInfo] = useState(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const validationSchema = yup.object().shape({
    items: yup.array().of(
      yup.object().shape({
        product: yup.object().shape({
          name: yup.string().required("Trường này không thể để trống"),
        }),
        quantity: yup.number().positive(),
      })
    ),
    total: yup.number(),
  });
  const validationSchemaModal = yup.object().shape({
    accountNumber: yup
      .string()
      .test("notEmpty", "Không thể trống", (value, formContext) => {
        return !orderInfo || formContext.parent.codMethod == "cash" || value;
      }),
    refundedMoney: yup
      .number()
      .test("validateMoney", "Không đủ tổng tiền", (value, formContext) => {
        return (
          !orderInfo ||
          formContext.parent.codMethod == "banktransfer" ||
          value >= 0
        );
      }),
  });
  const formProps = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formPropsModal = useForm({
    mode: "onBlur",
    defaultValues: defaultValuesModal,
    resolver: yupResolver(validationSchemaModal),
  });
  const {
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = formProps;
  const {
    handleSubmit: handleSubmitModal,
    reset: resetModal,
    setValue: setValueModal,
    watch: watchModal,
  } = formPropsModal;
  const selectedCustomer = watch("customer");
  const searchCategory = watch("searchCategory");
  const refundedMoney = watchModal("refundedMoney");
  const [sampleInfos, setSampleInfos] = useState([]);
  const [togglePayingModal, setTogglePayingModal] = useState(false);
  const [toggleDepositModal, setToggleDepositModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentWareHouse, setCurrentWareHouse] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [toggleCreateCustomer, setToggleCreateCustomer] = useState(false);
  const orderRef = useRef(null);

  const handlePrintBill = useReactToPrint({
    content: () => orderRef.current,
  });
  const handleCreateShoppingCart = async values => {
    const postCart = formatBeforePost(values);
    if (values.items.length == 0) {
      toastr.error("Giỏ hàng trống");
      return;
    }
    const url = "/api/v1/shopping-cart";
    try {
      const response = await httpService.post(url, postCart);
      toastr.success("Tạo đơn hàng thành công");
      setOrderInfo({
        ...response.results,
        customer: response.customer,
        total: roundedMoney(response.results.total),
      });
    } catch (err) {
      toastr.error("Tạo đơn hàng thất bại");
    }
  };
  const handleSaveSample = () => {
    setSampleInfos(prev => [...prev, getValues()]);
  };
  const handleCancelOrder = e => {
    e.preventDefault();
    reset();
  };
  const handleReturn = () => {
    setOrderInfo(null);
    setPaymentSuccess(false);
    resetModal();
  };
  const handlePaying = async values => {
    setTogglePayingModal(false);
    try {
      //createOrder
      const url = "/api/v1/create-order";
      const response = await httpService.post(
        url,
        formatBeforePost(getValues())
      );
      toastr.success("Thanh toán thành công");
      setPaymentSuccess(true);
      setCreatedOrder(response.results);
      console.log(response.results);
      //update Order
      const orderId = response.results.objectId;
      try {
        const url = `/parse/classes/Order/${orderId}`;
        const updateOrder = {
          codMethod: values.codMethod,
          status: "completed",
          branchName: currentEmployee?.branch?.name || "",
          cashier: {
            __type: "Pointer",
            className: "Employee",
            objectId: currentEmployee?.objectId || "",
          },
        };
        if (updateOrder.codMethod == "cash") {
          updateOrder.receivedMoney = Number(
            values.receivedMoney.replaceAll(".", "")
          );
          updateOrder.refundedMoney = values.refundedMoney;
        }
        if (updateOrder.codMethod == "banktransfer") {
          updateOrder.accountNumber = values.accountNumber;
        }
        httpService.put(url, updateOrder);
      } catch (err) {}

      try {
        //Get Branch Account
        const urlGetBranchAccount = "/parse/classes/Account";
        const paramsBranchAccount = {
          limit: 1,
          where: {
            branch: {
              __type: "Pointer",
              className: "Branch",
              objectId: currentEmployee?.branch?.objectId || "",
            },
          },
        };
        //Get current Warehouse

        //Create Export Session
        const urlCreateSession = "/parse/classes/StockChangeSession";
        const postSession = {
          status: "completed",
          type: "export",
          code: "STO-EXP-" + Date.now(),
          order: {
            __type: "Pointer",
            className: "Order",
            objectId: orderId,
          },
          source: {
            __type: "Pointer",
            className: "WareHouse",
            objectId: currentWareHouse?.objectId || "",
          },
        };
        //Get customer cash account
        const combinedApi = await Promise.all([
          httpService.get(urlGetBranchAccount, { params: paramsBranchAccount }),
          httpService.post(urlCreateSession, postSession),
        ]);

        const branchAccountId = combinedApi[0].results[0]?.objectId || "";
        const sessionId = combinedApi[1].objectId;

        // const customerCashAccountId = combinedApi[2];

        try {
          const requests = [];
          orderInfo.items.forEach(item => {
            requests.push({
              method: "POST",
              path: `/parse/classes/StockChangeItem`,
              body: {
                session: {
                  __type: "Pointer",
                  className: "StockChangeSession",
                  objectId: sessionId,
                },
                quantity: item.quantity,
                product: {
                  __type: "Pointer",
                  className: "Product",
                  objectId: item.productId,
                },
              },
            });
          });
          httpService.post("/parse/batch", { requests });
        } catch (err) {
          console.log(err);
        }
        //create Transaction
        // try {
        //   const url = `/parse/classes/Transaction`;
        //   const createdTransaction = {
        //     status: "completed",
        //     type: "pay",
        //     cashier: {
        //       __type: "Pointer",
        //       className: "Employee",
        //       objectId: currentEmployee.objectId,
        //     },
        //     amount: -orderInfo.total,
        //     target: {
        //       __type: "Pointer",
        //       className: "Account",
        //       objectId: branchAccountId,
        //     },
        //     order: {
        //       __type: "Pointer",
        //       className: "Order",
        //       objectId: orderId,
        //     },
        //   };
        //   httpService.post(url, createdTransaction);
        // } catch (err) {
        //   console.log(err);
        // }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      toastr.error("Thanh toán thất bại");
    }
  };
  const handleSetTotal = () => {
    let tmp = 0;
    getValues("items").forEach(item => (tmp += item.total));
    setValue("total", tmp);
  };
  const formatReceivedMoney = useCallback(
    debounce(
      e => setValueModal("receivedMoney", formatNumber(e.target.value)),
      1000
    ),
    []
  );
  const handleCreateCustomerSuccess = customer => {
    setValue("customer", customer);
  };
  useEffect(async () => {
    try {
      const response = await httpService.get(GET_CURRENT_USER);
      const url = `/parse/classes/Employee`;
      const params = {
        where: {
          user: {
            className: "_User",
            __type: "Pointer",
            objectId: response["objectId"] || "",
          },
        },
        include: ["branch"],
        limit: 1,
      };
      try {
        const response = await httpService.get(url, { params });
        response.results?.length && setCurrentEmployee(response.results[0]);
        const urlGetCurrentWareHouse = "/parse/classes/WareHouse";
        const paramsGetCurrentWareHouse = {
          limit: 1,
          where: {
            branch: {
              __type: "Pointer",
              className: "Branch",
              objectId: response.results[0]?.branch?.objectId || "",
            },
            isBranchDefault: true,
          },
        };
        const response0 = await httpService.get(urlGetCurrentWareHouse, {
          params: paramsGetCurrentWareHouse,
        });
        setCurrentWareHouse(response0.results?.[0] || null);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log("Api get employee failed");
    }
  }, []);
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumbs />
        <div className="d-flex align-items-center mb-2">
          <h4 className="mb-0 font-size-18 text-capitalize">{"Bán hàng"}</h4>
          <div className="flex-grow-1" />
          {!orderInfo ? (
            <React.Fragment>
              <CommonButton
                level={3}
                onClick={handleSubmit(handleCreateShoppingCart)}
              >
                Hoàn thành
              </CommonButton>
              <div style={{ width: "12px" }} />
              <CommonButton level={0} onClick={handleSaveSample}>
                Lưu nháp
              </CommonButton>
              <div style={{ width: "12px" }} />
              <CommonButton level={2} onClick={handleCancelOrder}>
                Làm mới
              </CommonButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!paymentSuccess ? (
                <React.Fragment>
                  <CommonButton
                    level={4}
                    onClick={() => setToggleDepositModal(true)}
                  >
                    Đặt cọc
                  </CommonButton>
                  <div style={{ width: "12px" }} />
                  <CommonButton
                    level={3}
                    onClick={() => setTogglePayingModal(true)}
                  >
                    Thanh toán
                  </CommonButton>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <CommonButton level={4} onClick={() => setIsPrintOpen(true)}>
                    In hóa đơn
                  </CommonButton>
                  {/* <div style={{ width: "12px" }} />
                  <CommonButton level={0} onClick={handleReturn}>
                    In phiếu thu
                  </CommonButton> */}
                </React.Fragment>
              )}
              <div style={{ width: "12px" }} />
              <CommonButton level={2} onClick={handleReturn}>
                Quay lại
              </CommonButton>
            </React.Fragment>
          )}
        </div>
        <Card body>
          <div className="d-flex align-items-center justify-content-between mb-1">
            {currentEmployee && (
              <CommonText level={1} className="mt-0">
                {`Nhân viên ${currentEmployee.fullName}`}
              </CommonText>
            )}
            <CommonText level={1} className="mt-0">
              <Clock />
            </CommonText>
            {currentEmployee && (
              <CommonText level={1} className="mt-0">
                {`Chi nhánh ${currentEmployee.branch.name}`}
              </CommonText>
            )}
          </div>

          {!orderInfo && (
            <Row className="mb-3">
              <Col xs={4}>
                <div className="d-flex">
                  <CommonText className={"form-label"}>
                    Tìm kiếm khách hàng
                  </CommonText>
                  <div className="flex-grow-1" />

                  <a
                    className="text-primary mt-3"
                    onClick={() => setToggleCreateCustomer(true)}
                  >
                    Tạo khách hàng mới?
                  </a>
                </div>
                <div className="d-flex">
                  <VVSSelectModel
                    placeholder={`Nhập ${
                      searchCategory == "phone" ? "số điện thoại" : "tên"
                    } khách hàng`}
                    name="customer.text"
                    model="Customer"
                    modelField="customer"
                    {...searchOptionToSelectProps(searchCategory)}
                    onSelect={item => setValue("customer", item)}
                    includeField={["user"]}
                    errors={formProps.formState.errors}
                    className="flex-grow-1 rounded-0 rounded-start"
                    {...formProps}
                  />
                  <SelectConst
                    className="fw-bold bg-secondary bg-gradient text-white rounded-0 rounded-end"
                    arrowProps={{ style: { borderTopColor: "white" } }}
                    style={{ minWidth: "4rem" }}
                    name="searchCategory"
                    options={searchCategoryOptions}
                    {...formProps}
                  />
                </div>
              </Col>
              {selectedCustomer?.objectId && (
                <React.Fragment>
                  <Col>
                    <CommonText level={1}>Họ và tên</CommonText>
                    <CommonText
                      level={1}
                      style={{ display: "block" }}
                      className="mt-0 fw-normal"
                    >
                      {`${selectedCustomer.fullName || ""}`}
                    </CommonText>
                  </Col>
                  <Col>
                    <CommonText level={1}>Số điện thoại</CommonText>
                    <CommonText
                      level={1}
                      style={{ display: "block" }}
                      className="mt-0 fw-normal"
                    >
                      {`${selectedCustomer.phone || ""}`}
                    </CommonText>
                  </Col>
                </React.Fragment>
              )}
              <Col>
                <InputField
                  name="voucher"
                  placeholder="Nhập mã Voucher"
                  style={{ maxWidth: "15rem" }}
                  {...formProps}
                  label="Voucher"
                />
              </Col>
            </Row>
          )}

          {!orderInfo && (
            <React.Fragment>
              <Table
                headers={shoppingCartHeader}
                defaultRowValue={defaultShoppingCartRowValue}
                formProps={{
                  errors: formProps.formState.errors,
                  ...formProps,
                }}
                title={<h4 className="font-size-1 my-0 mb-2">Giỏ hàng</h4>}
                onDelete={handleSetTotal}
                name="items"
              />
              <Row>
                <Col xs={2} className="ms-auto">
                  <CommonText level={1}>Tổng tiền</CommonText>
                </Col>
                <Col xs={1} className="me-2">
                  <div className="d-flex">
                    <div className="flex-grow-1"></div>
                    <CommonText level={1} className="text-danger">
                      {formatNumber(getValues("total")) || 0}
                    </CommonText>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          )}
          {orderInfo && <OrderInfo orderInfo={orderInfo} {...formProps} />}
        </Card>
      </Container>
      <ModalCommon
        modalTitle="Hóa đơn"
        isShowModal={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        size="xl"
      >
        <ModalBody>
          <Order
            orderRef={orderRef}
            orderItems={createdOrder?.orderItems}
            total={createdOrder?.total}
            inforCustomer={createdOrder?.customer}
            note={createdOrder?.note}
          />
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={handlePrintBill}>
            Print
          </CommonButton>
        </ModalFooter>
      </ModalCommon>

      <ModalCommon
        modalTitle="Thanh toán đơn hàng"
        isShowModal={togglePayingModal}
        onClose={() => setTogglePayingModal(false)}
      >
        <ModalBody className="px-2">
          <div className="d-flex align-items-center">
            <CommonText level={1} className=" flex-grow-1 my-0">
              Phương thức
            </CommonText>
            <div>
              <SelectConst
                name="codMethod"
                errors={formPropsModal.formState.errors}
                {...formPropsModal}
                options={[
                  { value: "cash", text: "Tiền mặt" },
                  { value: "banktransfer", text: "Chuyển khoản" },
                ]}
              />
            </div>
          </div>
          <div style={{ height: "12px" }}></div>
          {watchModal("codMethod") == "cash" ? (
            <React.Fragment>
              <div className="d-flex align-items-center">
                <CommonText level={1} className=" flex-grow-1 my-0">
                  Tiền nhận
                </CommonText>
                <div>
                  <InputField
                    name="receivedMoney"
                    className="text-end"
                    style={{ maxWidth: "10rem" }}
                    errors={formPropsModal.formState.errors}
                    {...formPropsModal}
                    onChange={e => {
                      formatReceivedMoney(e);
                      setValueModal(
                        "refundedMoney",
                        Number(e.target.value.replaceAll(".", "")) -
                          orderInfo.total
                      );
                    }}
                  />
                </div>
              </div>
              <div style={{ height: "12px" }}></div>

              <div className="d-flex align-items-center">
                <CommonText level={1} className="flex-grow-1 my-0">
                  Tiền thối
                </CommonText>
                <CommonText level={1} className="mt-0 ms-auto">
                  {refundedMoney >= 0
                    ? formatNumber(refundedMoney) || 0
                    : "Chưa đủ tổng"}
                </CommonText>
              </div>
            </React.Fragment>
          ) : (
            <div className="d-flex align-items-center">
              <CommonText level={1} className="flex-grow-1 my-0">
                Nhập số tài khoản
              </CommonText>
              <div>
                <InputField
                  name="accountNumber"
                  className="text-end"
                  style={{ maxWidth: "10rem" }}
                  errors={formPropsModal.formState.errors}
                  {...formPropsModal}
                />
              </div>
            </div>
          )}
          <hr />
          <div className="d-flex">
            <CommonText level={1} className="mt-0">
              Trả thực
            </CommonText>
            <CommonText level={1} className="text-danger ms-auto mt-0">
              {formatNumber(orderInfo?.total || 0)}
            </CommonText>
          </div>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => setTogglePayingModal(false)}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleSubmitModal(handlePaying)}
            type="button"
          >
            Hoàn tất
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
      <ModalAppointment
        orderInfo={orderInfo}
        setPaymentSuccess={setPaymentSuccess}
        toggle={toggleDepositModal}
        postOrder={formatBeforePost(getValues())}
        currentEmployee={currentEmployee}
        setToggle={setToggleDepositModal}
      />
      <ModalNewCustomer
        toggle={toggleCreateCustomer}
        setToggle={setToggleCreateCustomer}
        onCreateSuccess={handleCreateCustomerSuccess}
      />
    </div>
  );
}
