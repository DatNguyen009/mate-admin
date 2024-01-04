import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import moment from "moment/moment";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonText } from "components/Common/TextCommon";
import InputField from "components/form-control/InputField";
import TextareaField from "components/form-control/Textarea";
import VVSTable from "components/form-control/VVSTable";
import { validateYupSchema } from "formik";
import { formatNumber } from "helpers/erp_helper";
import React, { Fragment, useRef } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Container, ModalBody, ModalFooter, Row } from "reactstrap";
import httpService from "services/httpService";
import SelectConst from "components/form-control/SelectConst";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { TEXT_CANCELED, TEXT_CONFIRMED } from "helpers/name_helper";
import ModalCommon from "components/Common/ModalCommon";
import Order from "components/Modal/Order";

import { useReactToPrint } from "react-to-print";
import { language_vn } from "helpers/language_vn";
import { GET_BRANCH, GET_ORDERS, GET_TRANSACTION } from "helpers/url_helper";
import ModalConfirm from "components/Modal/ModalConfirm";

export default function DetailOrder() {
  const [text, setText] = useState(null);
  const [id, setId] = useState("");
  const [status, setStatus] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [orderRes, setOrderRes] = useState({});
  const [orderDetail, setOrderDetail] = useState({});
  const [transactionRes, setTransactionRes] = useState({});
  const [isConfirmActiveOrder, setIsConfirmActiveOrder] = useState(false);
  const [reRenderTransactionTable, setReRenderTransactionTable] =
    useState(false);

  const params = useParams();
  const { id: code } = params;
  const orderRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });

  const { register, reset, getValues, setValue } = useForm({
    mode: "onblur",
    resolver: yupResolver(validateYupSchema),
  });

  const handleCancelOrder = () => {
    const urlOrder = `/parse/classes/Order/${id}`;
    const updateStatusCanceled = {
      status: "canceled",
    };
    httpService
      .put(urlOrder, updateStatusCanceled)
      .then(() => {
        toastrCRUDSuccess("Status", TEXT_CANCELED);
        setValue("status", "canceled");
      })
      .catch(error => console.log(error));
  };

  const handleConfirmOrder = () => {
    const urlOrder = `/parse/classes/Order/${id}`;
    const updateStatusConfirmed = {
      status: "confirmed",
    };
    httpService
      .put(urlOrder, updateStatusConfirmed)
      .then(() => {
        toastrCRUDSuccess("Status", TEXT_CONFIRMED);
        setValue("status", "confirmed");
      })
      .catch(error => console.log(error));
  };

  const handleShowModel = () => {
    setOpenModal(true);
  };

  const onSubmit = () => {
    const { note, status } = getValues();

    const urlOrder = `/parse/classes/Order/${id}`;
    httpService
      .put(urlOrder, { note, status })
      .then(() => toastrSuccessAlert("Cập nhật đơn hàng thành công!!!"))
      .catch(error => toastrErrorAlert(language_vn.error));
  };

  useEffect(async () => {
    try {
      let branch;
      const urlOrder = "parse/classes/Order";
      const paramsOrder = {
        where: { code },
        include: ["customer", "cashier", "contract"],
      };

      const resOrder = await httpService.get(urlOrder, { params: paramsOrder });
      const paramsTransaction = {
        where: {
          order: {
            objectId: `${resOrder.results[0].objectId}`,
            __type: "Pointer",
            className: "Order",
          },
        },
      };
      const resTransaction = await httpService.get(GET_TRANSACTION, {
        params: paramsTransaction,
      });
      const detailOrder = resOrder.results[0];
      // try {
      //   const urlPrintOrder = `/api/v1/pages/order/${detailOrder.objectId}`;
      //   const response = await httpService.get(urlPrintOrder);
      //   setOrderRes(response.results);
      // } catch (err) {
      //   console.log(err);
      // }
      setOrderDetail(detailOrder);
      setStatus(detailOrder.status);
      setText(detailOrder.total);
      setId(detailOrder.objectId);
      setTransactionRes(resTransaction.results[0]);
      const urlContract = "parse/classes/Contract";
      const paramsContract = {
        where: {
          order: {
            objectId: `${detailOrder.objectId}`,
            __type: "Pointer",
            className: "Order",
          },
        },
      };
      const resContract = await httpService.get(urlContract, {
        params: paramsContract,
      });
      if (detailOrder.delivery?.store) {
        const resBranch = await httpService.get(
          GET_BRANCH + `/${detailOrder.delivery?.store}`
        );
        branch = resBranch;
      }

      const detailContract =
        resContract.results.length > 0 && resContract.results[0];
      reset({
        ...detailOrder,
        codeContract: detailContract?.code,
        createdAt:
          moment(detailOrder.createdAt).format("DD-MM-yyyy") +
          " - " +
          moment(detailOrder.createdAt).format("hh:mm A"),
        updatedAt:
          moment(detailOrder.updatedAt).format("DD-MM-yyyy") +
          " - " +
          moment(detailOrder.updatedAt).format("hh:mm A"),
        delivery:
          detailOrder.receivingType === "GET_DELIVER_TO_HOME"
            ? detailOrder.delivery.addr +
              " - " +
              detailOrder.delivery.ward +
              " - " +
              detailOrder.delivery.district +
              " - " +
              detailOrder.delivery.city
            : branch?.name,
        paymentMethod:
          detailOrder.paymentMethod === language_vn.COD
            ? language_vn.cash
            : detailOrder.paymentMethod === language_vn.WALLET
            ? language_vn.from_wallet
            : detailOrder.paymentMethod === language_vn.BANKTRANSFER
            ? language_vn.transfer
            : detailOrder.paymentMethod === language_vn.SAVING &&
              language_vn.buySaving,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOrderActive = async () => {
    try {
      setIsConfirmActiveOrder(false);
      if (orderDetail?.paymentMethod === "banktransfer") {
        const res = await httpService.put(
          GET_TRANSACTION + `/${transactionRes.objectId}`,
          {
            status: "completed",
          }
        );
        if (res?.updatedAt) {
          const res = await httpService.put(GET_ORDERS + `/${id}`, {
            status: "confirmed",
          });
          setValue("status", "confirmed");
          setStatus("confirmed");
          if (res?.updatedAt) {
            setReRenderTransactionTable(prev => !prev);
            toastrSuccessAlert("Kích hoạt hợp đồng thành công!!!!");
            return;
          }
          toastrErrorAlert(language_vn.error);
          return;
        }

        return;
      }

      const res = await httpService.put(GET_ORDERS + `/${id}`, {
        status: "confirmed",
      });
      setValue("status", "confirmed");
      setStatus("confirmed");
      if (res?.updatedAt) {
        setReRenderTransactionTable(prev => !prev);
        toastrSuccessAlert("Kích hoạt hợp đồng thành công!!!!");
        return;
      }
      toastrErrorAlert(language_vn.error);
    } catch (error) {
      console.log("error", error);
      toastrErrorAlert(language_vn.error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <HeaderCreateItem title={"Chi tiết đơn hàng " + `${code}`}>
            <div className="d-flex align-items-center">
              {(status === "processing" ||
                status === "early-settle" ||
                status === "confirmed") && (
                <>
                  <CommonButton level={2} onClick={() => handleCancelOrder()}>
                    Hủy
                  </CommonButton>
                  <div style={{ width: "12px" }} />
                </>
              )}
              {/* <CommonButton level={0}>Thanh toán</CommonButton> */}
              {(status === "processing" || status === "early-settle") && (
                <div style={{ width: "12px" }} />
              )}
              {(status === "processing" || status === "early-settle") && (
                <>
                  <CommonButton level={3} onClick={() => handleConfirmOrder()}>
                    Xác nhận
                  </CommonButton>
                  <div style={{ width: "12px" }} />
                </>
              )}
              {/* <div style={{ width: "12px" }} />
              <CommonButton level={0} onClick={handleShowModel}>
                In
              </CommonButton> */}

              {status === "unconfirmed" && (
                <>
                  <CommonButton
                    level={0}
                    onClick={() => {
                      setIsConfirmActiveOrder(true);
                    }}
                  >
                    Kích hoạt đơn hàng
                  </CommonButton>
                  <div style={{ width: "12px" }} />
                </>
              )}

              <CommonButton level={3} onClick={() => onSubmit()}>
                Lưu
              </CommonButton>
            </div>
          </HeaderCreateItem>
          <form>
            <Card body>
              <Row>
                <Col>
                  <InputField
                    label={
                      <Fragment>
                        Khách hàng
                        <Link
                          to={`/customer/${getValues("customer.objectId")}`}
                        >
                          (chi tiết)
                        </Link>
                      </Fragment>
                    }
                    name="customer.fullName"
                    register={register}
                    readOnly
                  />
                </Col>
                <Col>
                  <SelectConst
                    label="Trạng thái"
                    name="status"
                    register={register}
                    sysCfgName="orderStatus"
                    disableOptions={
                      getValues("status") === "unconfirmed" ? true : false
                    }
                  />
                </Col>
                <Col>
                  <InputField
                    label="Hình thức thanh toán"
                    name="paymentMethod"
                    register={register}
                    readOnly
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Số diện thoại"
                    name="customer.phone"
                    register={register}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputField
                    label="Email"
                    name="customer.email"
                    register={register}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputField
                    label="Mã hợp đồng"
                    name="contract.code"
                    register={register}
                    readOnly
                  />
                </Col>
              </Row>
              <VVSTable
                name="OrderItem"
                whereQuery={{
                  order: {
                    __type: "Pointer",
                    className: "Order",
                    objectId: `${id}`,
                  },
                }}
                className="p-0 mt-3 "
                disableAdd
                disableDelete
                disableSearch
              />
              <Row>
                <div style={{ textAlign: "right" }}>
                  <CommonText level={10} mt={0}>
                    {"Tổng tiền : " + formatNumber(`${text}`)}
                  </CommonText>
                </div>
              </Row>
              <Row>
                <Col>
                  <TextareaField
                    label={"Ghi chú"}
                    disabled
                    register={register}
                    name="note"
                  />
                </Col>
                <Col>
                  <TextareaField
                    label={"Địa chỉ giao"}
                    disabled
                    register={register}
                    name="delivery"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Thu ngân"
                    name="cashier.fullName"
                    register={register}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputField
                    label="Thời gian thu ngân"
                    name="createdAt"
                    register={register}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputField
                    label="Mã đơn hàng"
                    name="code"
                    register={register}
                    readOnly
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Tạo lúc"
                    name="createdAt"
                    register={register}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputField
                    label="Cập nhật lúc"
                    name="updatedAt"
                    register={register}
                    readOnly
                  />
                </Col>
              </Row>
            </Card>
            <Card>
              <CommonText level={1} className="ml-5" ml={20}>
                Lịch sử giao dịch
              </CommonText>
              <VVSTable
                name="TransactionContract"
                disableDelete
                disableAdd
                disableSearch
                whereQuery={{
                  order: {
                    __type: "Pointer",
                    className: "Order",
                    objectId: getValues("objectId"),
                  },
                }}
                triggerRerender={reRenderTransactionTable}
                styleViewTopTable={{
                  paddingTop: "0px",
                  marginTop: "-10px",
                }}
              />
            </Card>
          </form>
        </Container>
      </div>
      <ModalCommon
        modalTitle="Hóa đơn"
        isShowModal={openModal}
        onClose={() => setOpenModal(false)}
        size="xl"
      >
        <ModalBody>
          <Order
            orderRef={orderRef}
            orderItems={orderRes.orderItems}
            total={orderRes.total}
            inforCustomer={orderRes.customer}
            note={orderRes.note}
          />
          ;
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={handlePrint}>
            Print
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
      <ModalConfirm
        toggle={() => {
          setIsConfirmActiveOrder(false);
        }}
        isOpen={isConfirmActiveOrder}
        title="Bạn có chắc chắn muốn kích hoạt đơn hàng này hay không?"
        onConfirm={handleOrderActive}
      />
    </React.Fragment>
  );
}
