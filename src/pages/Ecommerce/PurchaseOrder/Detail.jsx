import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import moment from "moment/moment";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonText } from "components/Common/TextCommon";
import InputField from "components/form-control/InputField";
import TextareaField from "components/form-control/Textarea";
import VVSTable from "components/form-control/VVSTable";
import { formatNumber } from "helpers/erp_helper";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Card, Col, Container, ModalBody, ModalFooter, Row } from "reactstrap";
import httpService from "services/httpService";
import SelectConst from "components/form-control/SelectConst";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import { TEXT_CANCELED, TEXT_CONFIRMED, TEXT_PUT } from "helpers/name_helper";
import ModalCommon from "components/Common/ModalCommon";
// import PurchaseOrder from "components/Modal/PurchaseOrder";
import { useReactToPrint } from "react-to-print";

const payementMethodOptions = [
  {
    text: "Tiền mặt",
    value: "cash",
  },
  { text: "Chuyển khoản", value: "banktransfer" },
];
export default function DetailPurchaseOrder() {
  const { id: code } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const purchaseorderRef = useRef(null);
  const [printPurchaseOrder, setPrintPurchaseOrder] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => purchaseorderRef.current,
  });

  const formProps = useForm({
    mode: "onblur",
  });
  const { getValues, reset } = formProps;
  const handleCancelPurchaseOrder = () => {
    const urlPurchaseOrder = `/parse/classes/PurchaseOrder/${id}`;
    const updateStatusCanceled = {
      status: "canceled",
    };
    httpService
      .put(urlPurchaseOrder, updateStatusCanceled)
      .then(() => {
        toastrCRUDSuccess("Status", TEXT_CANCELED);
        setValue("status", "canceled");
      })
      .catch(error => console.log(error));
  };

  const handleConfirmPurchaseOrder = () => {
    const urlPurchaseOrder = `/parse/classes/PurchaseOrder/${id}`;
    const updateStatusConfirmed = {
      status: "confirmed",
    };
    httpService
      .put(urlPurchaseOrder, updateStatusConfirmed)
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
    const { note } = getValues();
    const urlPurchaseOrder = `/parse/classes/PurchaseOrder/${id}`;
    httpService
      .put(urlPurchaseOrder, { note })
      .then(() => toastrCRUDSuccess("Information", TEXT_PUT))
      .catch(error => toastrError());
  };

  useEffect(async () => {
    try {
      const urlPurchaseOrder = "/parse/classes/PurchaseOrder";
      const paramsPurchaseOrder = {
        where: { code },
        include: ["customer", "cashier", "branch"],
        limit: 1,
      };
      const resPurchaseOrder = await httpService.get(urlPurchaseOrder, {
        params: paramsPurchaseOrder,
      });

      const detailPurchaseOrder =
        resPurchaseOrder.results?.length && resPurchaseOrder.results[0];
      if (!detailPurchaseOrder) {
        history.replace("/page-404");
        return;
      }
      console.log(detailPurchaseOrder);
      reset({
        ...detailPurchaseOrder,
        createdAt: moment(detailPurchaseOrder.createdAt).format(
          "YYYY-MM-DD HH:mm"
        ),
        updatedAt: moment(detailPurchaseOrder.updatedAt).format(
          "YYYY-MM-DD HH:mm"
        ),
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <HeaderCreateItem title={"Chi tiết đơn mua hàng " + `${code}`}>
            <div className="d-flex align-items-center">
              <CommonButton level={4} onClick={handleShowModel}>
                In đơn
              </CommonButton>
              {/* <div style={{ width: "12px" }} /> */}
            </div>
          </HeaderCreateItem>
          <form>
            <Card body>
              <Row>
                <Col>
                  <InputField
                    label="Khách Hàng"
                    name="customer.fullName"
                    readOnly
                    {...formProps}
                  />
                </Col>
                <Col>
                  <SelectConst
                    label="Trạng thái"
                    name="status"
                    sysCfgName="orderStatus"
                    disableOptions
                    {...formProps}
                  />
                </Col>
                <Col>
                  <SelectConst
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    {...formProps}
                    disableOptions
                    options={payementMethodOptions}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Thu ngân"
                    name="cashier.fullName"
                    {...formProps}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputField
                    label="Chi nhánh"
                    name="branch.name"
                    {...formProps}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputField
                    label="Ngày tạo"
                    name="createdAt"
                    {...formProps}
                    readOnly
                  />
                </Col>
              </Row>
              <VVSTable
                name="PurchaseOrderItem"
                whereQuery={{
                  purchaseOrder: {
                    __type: "Pointer",
                    className: "PurchaseOrder",
                    objectId: getValues("objectId"),
                  },
                }}
                className="p-0 mt-3"
                disableAdd
                disableDelete
                disableSearch
              />
              <Row>
                <Col xs={4}>
                  <TextareaField
                    label={"Ghi chú"}
                    readOnly
                    {...formProps}
                    name="note"
                    rows={4}
                  />
                </Col>
                <Col xs={2} className="ms-auto d-flex">
                  <CommonText
                    level={10}
                    mt={0}
                    className="text-danger ms-auto me-2"
                  >
                    {formatNumber(Math.round(getValues("total")))}
                  </CommonText>
                </Col>
              </Row>
            </Card>
          </form>
        </Container>
      </div>
      {/* <ModalCommon
                modalTitle="Hóa đơn"
                isShowModal={openModal}
                onClose={() => setOpenModal(false)}
                size="xl"
            >
                <ModalBody>
                    <PurchaseOrder
                        purchaseorderRef={purchaseorderRef}
                        purchaseorderItems={purchaseorderRes.purchaseorderItems}
                        total={purchaseorderRes.total}
                        inforCustomer={purchaseorderRes.customer}
                        note={purchaseorderRes.note}
                    />
                    ;
                </ModalBody>
                <ModalFooter>
                    <CommonButton level={0} onClick={handlePrint}>
                        Print
                    </CommonButton>
                </ModalFooter>
            </ModalCommon> */}
    </React.Fragment>
  );
}
