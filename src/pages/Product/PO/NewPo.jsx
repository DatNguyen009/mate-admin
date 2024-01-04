import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Col, Container, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import VVSSelect from "components/form-control/VVSSelect";
import VVSTable from "components/form-control/VVSTable";
import { message } from "antd";
import { API_APPROVED_PO, API_CREATE_PO, API_PO } from "helpers/url_helper";
import { useHistory, useParams } from "react-router-dom";
import httpService from "services/httpService";
import { PoPointer } from "helpers/pointer";
import SelectField from "components/form-control/Select";

export const STATUS_OPTIONS = [
  { index: 1, name: "Mới", value: "new" },
  { index: 2, name: "Đã hoàn thành", value: "completed" },
  { index: 3, name: "Đã chấp nhận", value: "approved" },
  { index: 4, name: "Đã nhận một phần", value: "partially-received" },
  { index: 5, name: "Đã huỷ bỏ", value: "rejected" },
];

function NewPo() {
  const [supplierSelected, setSupplierSelected] = useState({});
  const ref = useRef();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getPODetail();
  }, [id]);

  const schema = yup
    .object({
      supplier: yup.string().required("Vui lòng không để trống!"),
    })
    .required();
  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getPODetail = async () => {
    if (!id) return;

    const res = await httpService.get(`${API_PO}/${id}?include=["supplier"]`);

    if (!res) {
      history.replace("/po");
      toastrErrorAlert("Không tìm thấy po!");
      return;
    }

    const { reset } = rest;
    setSupplierSelected(res.supplier);
    reset({
      supplier: res.supplier?.name,
      status: res.status,
    });
  };

  const onSubmit = async () => {
    const data = ref.current.submitForm();

    if (!data || data?.POItem?.length <= 0) {
      message.error("Vui lòng nhập sản phẩm!!!");
      return;
    }

    const sumQuanlityDuplicate = Object.values(
      data?.POItem.map(item => {
        return {
          productId: item.product.objectId,
          quantity: Number(item.quantity),
        };
      })?.reduce((product, { productId, quantity }) => {
        product[productId] = {
          productId,
          quantity:
            (product[productId] ? Number(product[productId].quantity) : 0) +
            Number(quantity),
        };
        return product;
      }, {})
    );

    const body = {
      items: sumQuanlityDuplicate,
      supplierId: supplierSelected.objectId,
    };

    if (id) {
      try {
        await httpService.put(API_CREATE_PO, {
          items: body.items,
          poId: id,
        });
        message.success("Cập nhật PO thành công!!");
      } catch (error) {
        message.error("Cập nhật PO không thành công. Vui lòng thử lại sau!");
      }
      return;
    }

    try {
      const res = await httpService.post(API_CREATE_PO, body);
      message.success("Tạo PO thành công!!");
      history.replace(`/po/${res.poId}`);
    } catch (error) {
      message.error("Tạo PO không thành công. Vui lòng thử lại sau!");
    }
  };

  const handleUpdateStatus = async status => {
    try {
      const body = { poId: id, status };
      await httpService.post(API_APPROVED_PO, body);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={"Thêm PO"}>
            <div className="d-flex" style={{ gap: 8 }}>
              {((rest.getValues("status") === STATUS_OPTIONS[0].value && id) ||
                !id) && <CommonButton level={0}>Lưu</CommonButton>}
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>
              <Col xs={4}>
                <VVSSelect
                  label="Nhà cung cấp"
                  name="supplier"
                  required
                  errors={errors}
                  model="Supplier"
                  searchField="name"
                  fieldView={["name", "address"]}
                  onSelect={setSupplierSelected}
                  {...rest}
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
                    {...rest}
                  />
                </Col>
              )}
            </Row>
            <VVSTable
              ref={ref}
              title={`Sản phẩm`}
              name={"stock-product-item"}
              enableInlineEdit
              disableBtnSave
              whereQuery={{
                ...(id ? { po: PoPointer(id) } : { test: "" }),
              }}
              disableDelete={
                !["new", undefined].includes(rest.getValues("status"))
                  ? true
                  : false
              }
              disableAdd={
                ["new", undefined].includes(rest.getValues("status"))
                  ? false
                  : true
              }
            />
          </Card>
        </form>
      </Container>
    </div>
  );
}

export default NewPo;
