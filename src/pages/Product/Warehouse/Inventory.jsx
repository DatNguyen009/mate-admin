import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import VVSSelect from "components/form-control/VVSSelect";
import VVSTable from "components/form-control/VVSTable";
import { StockCountSessionPointer, WarehousePointer } from "helpers/pointer";
import {
  API_COUNT_SESSION,
  API_STOCK_COUNT_SESSION,
  API_STOCK_REPORT,
} from "helpers/url_helper";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Col, Container, Row } from "reactstrap";
import httpService from "services/httpService";
import * as yup from "yup";
import { useLocation, useParams } from "react-router-dom";
import SelectField from "components/form-control/Select";
import { message } from "antd";

export const STATUS_OPTIONS = [
  { index: 1, name: "Mới", value: "new" },
  { index: 2, name: "Đã hoàn thành", value: "completed" },
];

const Inventory = () => {
  const [warehouseSelected, setWarehouseSelected] = useState({});
  const { state } = useLocation();
  const { id } = useParams();
  const [stockCountSessionDetail, setStockCountSessionDetail] = useState(
    state?.dataTranfer || null
  );
  const schema = yup.object({}).required();
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    if (stockCountSessionDetail) {
      setWarehouseSelected(stockCountSessionDetail?.warehouse);
      formProps.reset({
        warehouse: stockCountSessionDetail?.warehouse.name,
        status: stockCountSessionDetail.status,
      });

      const stockReports = await getStockReportById(
        stockCountSessionDetail?.warehouse?.objectId
      );

      setProducts(prev => {
        return prev?.map(item => {
          return {
            ...item,
            quantity:
              stockReports[
                stockReports.findIndex(
                  itemRes => itemRes.product.objectId === item.product.objectId
                )
              ].quantity,
          };
        });
      });
    }
  }, [JSON.stringify(stockCountSessionDetail), JSON.stringify(products)]);

  const {
    formState: { errors },
    ...formProps
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getStockReportById = async warehouseId => {
    const option = {
      params: {
        where: {
          warehouse: WarehousePointer(warehouseId),
        },
        include: ["product", "warehouse"],
      },
    };
    const stockReports = await httpService.get(API_STOCK_REPORT, option);
    return stockReports.results;
  };

  const create = async () => {
    const body = {
      warehouseId: "cawTimcVnj",
      items: [
        { productId: "i7i8DOqilt", quantity: Number(2) },
        { productId: "L6d60OAMu3", quantity: Number(3) },
      ],
    };
    await httpService.post(API_COUNT_SESSION, body);
  };

  const handleUpdateStatus = async status => {
    try {
      await httpService.put(API_STOCK_COUNT_SESSION + `/${id}`, { status });
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
        <HeaderCreateItem title={"Kiểm kho"}>
          <div className="flex-grow-1" />

          {/* <div className="d-flex">
            <CommonButton level={0} onClick={create}>
              Lưu
            </CommonButton>
          </div> */}
        </HeaderCreateItem>
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
                disabled={true}
              />
            </Col>
            {id && (
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
          {warehouseSelected?.objectId && (
            <Row className="mt-2">
              <Col xs={12} sm={12}>
                <VVSTable
                  title={`Danh Sách Sản Phẩm`}
                  name={"StockCountItem"}
                  enableInlineEdit
                  disableBtnSave
                  disableAdd
                  disableDelete
                  whereQuery={{
                    session: StockCountSessionPointer(id),
                  }}
                  onCallbackData={setProducts}
                  resetValueTable={
                    products?.map((item, index) => {
                      return {
                        key: `StockCountItem.${index}.quantityReality`,
                        value: item?.quantity,
                      };
                    }) || []
                  }
                />
              </Col>
            </Row>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Inventory;
