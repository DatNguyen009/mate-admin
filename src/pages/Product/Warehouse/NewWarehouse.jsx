import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, Container, Row } from "reactstrap";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import { GET_WAREHOUSE } from "helpers/url_helper";
import { message } from "antd";
import { BranchPointer, WarehousePointer } from "helpers/pointer";
import VVSTable from "components/form-control/VVSTable";

const NewWarehouse = () => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getWarehouseDetail();
  }, [id]);

  const schema = yup
    .object({
      name: yup.string().required("Vui lòng không để trống!"),
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

  const { renderForm } = useGetFormSchema(
    "Warehouse",
    yup,
    rest,
    errors,
    false
  );

  const getWarehouseDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `${GET_WAREHOUSE}/${id}?include=["branch"]`
    );

    if (!res) {
      history.replace("/warehouse");
      toastrErrorAlert("Không tìm thấy kho!");
      return;
    }

    const { reset } = rest;

    reset({
      ...res,
      branch: res?.branch
        ? {
            text: res.branch.name,
            objectId: res.branch.objectId,
            className: "Branch",
            __type: "Pointer",
          }
        : { text: "" },
    });
  };

  const onSubmit = async values => {
    const { createdAt, updatedAt, objectId, branch, ...warehouseValues } =
      values;

    const body = {
      ...warehouseValues,
      ...(branch?.objectId
        ? { branch: BranchPointer(branch?.objectId) }
        : { branch: { __op: "Delete" } }),
    };

    if (id) {
      try {
        await httpService.put(GET_WAREHOUSE + `/${id}`, body);
        message.success("Cập nhật kho thành công!!");
        return;
      } catch (error) {
        message.error("Cập nhật kho không thành công. Vui lòng thử lại sau!");
      }
    }

    try {
      const res = await httpService.post(GET_WAREHOUSE, body);
      message.success("Tạo kho thành công!!");
      history.replace(`/warehouse/${res.objectId}`);
    } catch (error) {
      message.error("Tạo kho không thành công. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={"Kho"}>
            <div className="d-flex" style={{ gap: 8 }}>
              <CommonButton level={0}>Lưu</CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>{renderForm()}</Row>
          </Card>

          <Card body>
            <Row>
              <VVSTable
                name="StockReport"
                title="Sản phẩm trong kho"
                whereQuery={{ warehouse: WarehousePointer(id) }}
                disableAdd
                disableDelete
              />
            </Row>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default NewWarehouse;
