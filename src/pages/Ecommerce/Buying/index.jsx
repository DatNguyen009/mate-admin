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
import PurchaseOrderInfo from "./PurchaseOrderInfo";
import Clock from "../../../components/Common/Clock";
import SelectConst from "components/form-control/SelectConst";
import { useEffect } from "react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { BreadCrumbs } from "components/Common/Breadcrumbs";
import ModalNewCustomer from "./ModalNewCustomer";
import Order from "components/Modal/Order";
import { useReactToPrint } from "react-to-print";
import ModalPayment from "./ModalPayment";
import { useMemo } from "react";

const defaultValues = {
  customer: null,
  note: "",
  items: [],
  branch: null,
  cashier: null,
  total: 0,
  searchCategory: "phone",
  bank: null,
  accountNumber: "",
};
const buyingCartHeader = [
  {
    text: "Loại vàng",
    CellComponent: SelectConst,
    cellComponentProps: (formProps, indexOfRow) => ({
      name: `items.${indexOfRow}.goldType`,
      sysCfgName: "goldType",
      className: "w-100",
      onChange: async e => {
        const { setValue, getValues } = formProps;
        try {
          const url = "parse/classes/SysCfg";
          const params = {
            where: {
              name: "gold-pos-final",
            },
            limit: 1,
          };
          const resGetBuyingPrice = await httpService.get(url, { params });
          const buyingPrice =
            resGetBuyingPrice.results[0].valueObj[e.target.value].buying;
          setValue(`items.${indexOfRow}.buyingPrice`, buyingPrice);
          setValue(
            `items.${indexOfRow}.total`,
            buyingPrice * getValues(`items.${indexOfRow}.weight`)
          );
          setValue("total", calculateTotal(getValues("items")));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  },
  {
    text: "Giá mua(vnđ/chỉ)",
    field: "buyingPrice",
    formatter: cell => formatNumber(Math.round(cell)),
    textAlign: "right",
  },
  {
    text: "Khối lượng(chỉ)",
    CellComponent: InputField,
    cellComponentProps: (formProps, indexOfRow) => ({
      name: `items.${indexOfRow}.weight`,
      className: "w-25 text-center",
      onChange: e => {
        const { setValue, getValues } = formProps;
        setValue(
          `items.${indexOfRow}.total`,
          e.target.value * getValues(`items.${indexOfRow}.buyingPrice`)
        );
        setValue("total", calculateTotal(getValues("items")));
      },
      onFocus: async e => {
        if (e.target.value) return;
        const { setValue, getValues } = formProps;
        const url = "/parse/classes/GoldWeight";
        const response = await httpService.get(url);
        const weightData = response.results[0];
        const updatedAt = new Date(weightData.updatedAt);
        const diffMs = Date.now() - updatedAt;
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        if (diffMins < 10) {
          const weight = Number((weightData.value * 10).toFixed(3));
          setValue(`items.${indexOfRow}.weight`, weight);
          setValue(
            `items.${indexOfRow}.total`,
            weight * getValues(`items.${indexOfRow}.buyingPrice`)
          );
          setValue("total", calculateTotal(getValues("items")));
        }
      },
    }),
    textAlign: "center",
  },
  {
    text: "Tổng",
    field: "total",
    formatter: cell => formatNumber(Math.round(cell)),
    textAlign: "right",
  },
];
const defaultBuyingCartRowValue = {
  goldType: "",
  total: 0,
  buyingPrice: 0,
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
const calculateTotal = items => {
  return items.reduce((prev, cur) => {
    return prev + cur.total || 0;
  }, 0);
};

export default function Buying() {
  const [purchaseOrderInfo, setPurchaseOrderInfo] = useState(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const validationSchema = yup.object().shape({
    items: yup.array().of(
      yup.object().shape({
        goldType: yup.string().required("Trường này không thể để trống"),
        weight: yup.number().positive("Không hợp lệ").typeError("Không hợp lệ"),
      })
    ),
    total: yup.number(),
  });
  const formProps = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, getValues, watch, setValue, reset } = formProps;
  const selectedCustomer = watch("customer");
  const searchCategory = watch("searchCategory");
  const total = watch("total");
  const [toggleBuyingModal, setToggleBuyingModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [toggleCreateCustomer, setToggleCreateCustomer] = useState(false);
  const orderRef = useRef(null);

  const handlePrintBill = useReactToPrint({
    content: () => orderRef.current,
  });
  const handlePreviewPurchaseOrder = values => {
    setPurchaseOrderInfo(values);
  };
  const handleSaveSample = () => {
    setSampleInfos(prev => [...prev, getValues()]);
  };
  const handleCancelOrder = e => {
    e.preventDefault();
    reset();
  };
  const handleReturn = () => {
    setPurchaseOrderInfo(null);
    setPaymentSuccess(false);
    // resetModal();
  };
  const handleSetTotal = () => {
    let tmp = 0;
    getValues("items").forEach(item => (tmp += item.total));
    setValue("total", tmp);
  };

  const handleCreateCustomerSuccess = customer => {
    setValue("customer", customer);
  };
  const renderClock = useMemo(() => <Clock />, []);
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
      } catch (err) {
        console.log("Api get employee failed");
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
          <h4 className="mb-0 font-size-18 text-capitalize">{"Mua hàng"}</h4>
          <div className="flex-grow-1" />
          {!purchaseOrderInfo ? (
            <React.Fragment>
              <CommonButton
                level={3}
                onClick={handleSubmit(handlePreviewPurchaseOrder)}
              >
                Hoàn thành
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
                    level={3}
                    onClick={() => setToggleBuyingModal(true)}
                  >
                    Thanh toán
                  </CommonButton>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
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
              {renderClock}
            </CommonText>
            {currentEmployee && (
              <CommonText level={1} className="mt-0">
                {`Chi nhánh ${currentEmployee.branch.name}`}
              </CommonText>
            )}
          </div>

          {!purchaseOrderInfo && (
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
                    onSelect={item => {
                      setValue("customer", item);
                    }}
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
              <Col />
            </Row>
          )}

          {!purchaseOrderInfo && (
            <React.Fragment>
              <Table
                headers={buyingCartHeader}
                defaultRowValue={defaultBuyingCartRowValue}
                formProps={{
                  errors: formProps.formState.errors,
                  ...formProps,
                }}
                title={<h4 className="font-size-1 my-0 mb-2">Giỏ hàng</h4>}
                onDelete={handleSetTotal}
                name="items"
              />
              <Row className="me-2">
                <Col xs={2} className="ms-auto">
                  <CommonText level={1}>Tổng tiền</CommonText>
                </Col>
                <Col xs={1}>
                  <div className="d-flex">
                    <div className="flex-grow-1"></div>
                    <CommonText level={1} className="text-danger">
                      {formatNumber(total) || 0}
                    </CommonText>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          )}
          {purchaseOrderInfo && (
            <PurchaseOrderInfo info={purchaseOrderInfo} {...formProps} />
          )}
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
      <ModalPayment
        toggle={toggleBuyingModal}
        setToggle={setToggleBuyingModal}
        getInfo={getValues}
        cashier={currentEmployee}
        onCreateSuccess={() => setPaymentSuccess(true)}
      />
      <ModalNewCustomer
        toggle={toggleCreateCustomer}
        setToggle={setToggleCreateCustomer}
        onCreateSuccess={handleCreateCustomerSuccess}
      />
    </div>
  );
}
