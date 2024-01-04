import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Card, Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import httpService from "services/httpService";
import VVSTable from "components/form-control/VVSTable";
import {
  API_EXPORT,
  API_IMPORT,
  API_STOCK_CHANGE_ITEM,
  API_STOCK_CHANGE_SESSION,
  GET_CURRENT_USER,
} from "helpers/url_helper";
import { useLocation } from "react-router-dom";
import { CommonText } from "components/Common/TextCommon";
import { useForm } from "react-hook-form";
import Clock from "components/Common/Clock";
import { CommonButton } from "components/Common/ButtonCommon";
import VVSSelect from "components/form-control/VVSSelect";
import { OrderPointer, PoPointer, SessionPointer } from "helpers/pointer";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import Spacer from "components/Common/Spacing";
import SelectField from "components/form-control/Select";

export const STATUS_OPTIONS = [
  { index: 1, name: "Mới", value: "new" },
  { index: 2, name: "Đã hoàn thành", value: "completed" },
  { index: 3, name: "Đã chấp nhận", value: "approved" },
  { index: 4, name: "Đã huỷ bỏ", value: "rejected" },
];

const createTitle = stockAction => {
  switch (stockAction) {
    case "import":
      return "Nhập kho";
    case "export":
      return "Xuất kho";
    case "stock-transfer":
      return "Chuyển kho";
    case "stock-adjustment":
      return "Điều chỉnh kho";
    case "stock-audit":
      return "Kiểm kho";
    default:
      return "Nhập hàng";
  }
};
const targetCondition = stockAction =>
  stockAction == "import" || stockAction == "stock-transfer";
const sourceCondition = stockAction => stockAction != "import";
const sessionModel = stockAction =>
  stockAction != "stock-audit" ? "StockChangeSession" : "StockAuditSession";

export default function Stock() {
  const { pathname } = useLocation();
  const stockAction = pathname?.slice(1) || "import";
  const [openModalSessionPreview, setOpenModalSessionPreview] = useState(false);
  const [openModalBarcodePreview, setOpenModalBarcodePreview] = useState(false);
  const [printPreview, setPrintPreview] = useState(null);
  const [url, setUrl] = useState(null);
  const history = useHistory();

  const schema = yup
    .object({
      warehouse: yup.string().required("Vui lòng không để trống!"),
      ...(stockAction === "import" && {
        po: yup.string().required("Vui lòng không để trống!"),
      }),
      ...(stockAction === "export" && {
        order: yup.string().required("Vui lòng không để trống!"),
      }),
    })
    .required();
  const {
    formState: { errors },
    ...formProps
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { getValues, setValue, watch } = formProps;
  const selectedSession = watch("selectedSession");
  const currentEmployee = watch("currentEmployee");
  const target = watch("target.objectId");
  const source = watch("source.objectId");

  useEffect(async () => {
    try {
      const response = await httpService.get(GET_CURRENT_USER);
      setValue("currentUser", response);
      try {
        const url = `/parse/classes/Employee`;
        const params = {
          where: {
            user: {
              className: "_User",
              __type: "Pointer",
              objectId: getValues("currentUser.objectId"),
            },
          },
          include: ["branch"],
          limit: 1,
        };
        const response = await httpService.get(url, { params });
        response.results?.length &&
          setValue("currentEmployee", response.results[0]);
        try {
          const url = `/parse/classes/WareHouse`;
          const params = {
            where: {
              branch: {
                className: "Branch",
                __type: "Pointer",
                objectId: getValues("currentEmployee.branch.objectId"),
              },
              isBranchDefault: true,
            },
          };
          const response = await httpService.get(url, { params });
          if (response.results?.length) {
            if (sourceCondition(stockAction)) {
              setValue("source", response.results[0]);
              setValue("source.objectId", response.results[0].objectId);
              return;
            }

            setValue("target", response.results[0]);
            setValue("target.objectId", response.results[0].objectId);
            return;
          }
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log("Employee not found");
      }
    } catch (err) {
      console.log("Api get employee failed");
    }
  }, []);

  const [warehouseSelected, setWarehouseSelected] = useState({});
  const [poSelected, setPoSelected] = useState({});
  const [orderSelected, setOrderSelected] = useState({});
  const [products, setProducts] = useState([]);
  const ref = useRef();
  const { state } = useLocation();
  const [stockChangeSessionDetail, setStockChangeSessionDetail] = useState(
    state?.dataTranfer || null
  );

  useEffect(async () => {
    if (!state) {
      return;
    }
    if (
      stockChangeSessionDetail &&
      stockChangeSessionDetail?.type === "export"
    ) {
      setWarehouseSelected(stockChangeSessionDetail?.source);
      setOrderSelected(stockChangeSessionDetail?.order);
      formProps.reset({
        warehouse: stockChangeSessionDetail?.source.name,
        order: stockChangeSessionDetail?.order.code,
        status: stockChangeSessionDetail?.status,
      });
      return;
    }
    if (
      stockChangeSessionDetail &&
      stockChangeSessionDetail.type === "import"
    ) {
      const stockChangeSessionbyId = await getStockChangeSessionById(
        stockChangeSessionDetail?.po.objectId,
        stockChangeSessionDetail?.objectId
      );

      const stockChangeItemMap = stockChangeSessionbyId?.map(
        item => item.product?.objectId
      );

      setProducts(prev => {
        return prev?.map(item => {
          if (stockChangeItemMap.includes(item.product.objectId)) {
            return {
              ...item,
              quantity:
                stockChangeSessionbyId[
                  stockChangeSessionbyId.findIndex(
                    itemRes =>
                      itemRes.product.objectId === item.product.objectId
                  )
                ].quantity,
            };
          }
          return item;
        });
      });

      setWarehouseSelected(stockChangeSessionDetail?.target);
      setPoSelected(stockChangeSessionDetail?.po);
      formProps.reset({
        warehouse: stockChangeSessionDetail?.target.name,
        po: stockChangeSessionDetail?.po.code,
      });
    }
  }, [JSON.stringify(stockChangeSessionDetail), JSON.stringify(products)]);

  const getStockChangeSessionById = async (poId, sessionId) => {
    const option = {
      params: {
        where: {
          po: PoPointer(poId),
          session: SessionPointer(sessionId),
        },
        include: ["product"],
      },
    };
    const res = await httpService.get(API_STOCK_CHANGE_ITEM, option);
    return res.results;
  };

  const onSubmit = async () => {
    const data = ref.current.submitForm();
    if (!data) {
      return;
    }
    if (stockAction === "import") {
      try {
        const body = {
          poId: poSelected.objectId,
          targetId: warehouseSelected.objectId,
          sourceId: "",
          items: data?.POItem.map(item => {
            return {
              productId: item.product.objectId,
              quantity: Number(item.quantity),
            };
          }),
        };
        if (stockChangeSessionDetail?.type) {
          await httpService.put(API_IMPORT, {
            ...body,
            sessionId: stockChangeSessionDetail.objectId,
          });
          setProducts(prev => {
            return prev?.map(item => {
              if (
                data?.POItem.map(poItem => poItem.product.objectId).includes(
                  item.product.objectId
                )
              ) {
                return {
                  ...item,
                  quantity:
                    body.items[
                      body.items.findIndex(
                        itemRes => itemRes.productId === item.product.objectId
                      )
                    ].quantity,
                };
              }
              return item;
            });
          });
          message.success("Cập nhật kho thành công!!");
          return;
        }
        const res = await httpService.post(API_IMPORT, body);
        await httpService.put(API_STOCK_CHANGE_SESSION + `/${res?.sessionId}`, {
          status: "completed",
        });
        message.success("Nhập kho thành công!!");
        history.push("/warehouse-management");
      } catch (error) {
        message.error("Nhập kho không thành công. Vui lòng thử lại sau!");
      }
      return;
    } else {
      try {
        const body = {
          orderId: orderSelected.objectId,
          targetId: "",
          sourceId: warehouseSelected.objectId,
        };
        await httpService.post(API_EXPORT, body);
        message.success("Xuất kho thành công!!");
        history.push("/warehouse-management");
      } catch (error) {
        message.error("Xuất kho không thành công. Vui lòng thử lại sau!");
      }
    }
  };

  const handleCreateNew = () => {
    setStockChangeSessionDetail(null);
    setWarehouseSelected(null);
    setOrderSelected(null);
    setPoSelected(null);
    formProps.reset({
      warehouse: "",
      po: "",
      order: "",
    });
  };

  const handleUpdateStatus = async status => {
    try {
      await httpService.put(
        API_STOCK_CHANGE_SESSION + `/${stockChangeSessionDetail?.objectId}`,
        { status }
      );
      message.success("Cập nhật trạng thái thành công!!");
    } catch (error) {
      message.error(
        "Cập nhật trạng thái không thành công. Vui lòng thử lại sau!"
      );
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={formProps.handleSubmit(onSubmit)}>
          <HeaderCreateItem title={createTitle(stockAction)}>
            <div className="flex-grow-1" />
            {stockChangeSessionDetail && (
              <>
                <CommonButton level={0} onClick={handleCreateNew}>
                  Tạo mới
                </CommonButton>
                <Spacer size={8} />
              </>
            )}

            {stockChangeSessionDetail?.type !== "export" && (
              <div className="d-flex">
                <CommonButton level={0}>Lưu</CommonButton>
              </div>
            )}
          </HeaderCreateItem>
          <Row>
            <Col xs={12} sm={12}>
              <Card body>
                <Row>
                  <Col xs={4}>
                    <VVSSelect
                      label="Chọn Kho"
                      name="warehouse"
                      required
                      model="WareHouse"
                      searchField="name"
                      fieldView={["name", "address"]}
                      onSelect={setWarehouseSelected}
                      path="/warehouse"
                      {...formProps}
                      errors={errors}
                    />
                  </Col>
                  <Col xs={4}>
                    {stockAction === "import" ? (
                      <VVSSelect
                        label="Chọn Po"
                        name="po"
                        required
                        model="PO"
                        searchField="code"
                        fieldView={["code", "supplier.name"]}
                        onSelect={setPoSelected}
                        path="/po/new-po"
                        errors={errors}
                        conditionField={{
                          $or: [
                            { status: STATUS_OPTIONS[2].value },
                            { status: "partially-received" },
                          ],
                        }}
                        includeField={["supplier"]}
                        {...formProps}
                      />
                    ) : (
                      stockAction === "export" && (
                        <VVSSelect
                          label="Chọn Order"
                          name="order"
                          required
                          model="Order"
                          searchField="code"
                          fieldView={["code"]}
                          onSelect={setOrderSelected}
                          path={""}
                          conditionField={{
                            isActive: true,
                            status: "confirmed",
                          }}
                          {...formProps}
                          errors={errors}
                        />
                      )
                    )}
                  </Col>
                  {stockAction === "export" && stockChangeSessionDetail && (
                    <Col xs={4} style={{ alignSelf: "center" }}>
                      <SelectField
                        label="Trạng thái"
                        name="status"
                        options={STATUS_OPTIONS}
                        required
                        errors={errors}
                        onChange={e => handleUpdateStatus(e.target.value)}
                        {...formProps}
                      />
                    </Col>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>
          {(poSelected?.objectId || orderSelected?.objectId) && products && (
            <Row className="mt-2">
              <Col xs={12} sm={12}>
                <VVSTable
                  ref={ref}
                  title={`Sản phẩm`}
                  name={stockAction === "import" ? "POItem" : "OrderItem"}
                  enableInlineEdit={stockAction === "import" ? true : false}
                  disableBtnSave
                  disableAdd
                  disableDelete
                  whereQuery={{
                    ...(poSelected?.objectId && {
                      po: PoPointer(poSelected.objectId),
                    }),
                    ...(orderSelected?.objectId && {
                      order: OrderPointer(orderSelected.objectId),
                    }),
                  }}
                  onCallbackData={setProducts}
                  resetValueTable={
                    stockAction === "import"
                      ? products?.map((item, index) => {
                          return {
                            key: `POItem.${index}.quantity`,
                            value: item?.quantity,
                          };
                        })
                      : {}
                  }
                />
              </Col>
            </Row>
          )}
        </form>
      </Container>
    </div>
  );
}
