import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Container } from "reactstrap";
import * as yup from "yup";
import "antd/dist/antd.css";

import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonText } from "components/Common/TextCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { GET_COMPETITOR } from "helpers/url_helper";
import httpService from "services/httpService";
import { language_vn } from "helpers/language_vn";
import InputField from "components/form-control/InputField";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import { useDispatch } from "react-redux";
import { formatNumber, generateCode } from "helpers/erp_helper";

const HEADERS_TABLE_ORDER = [
  {
    text: "Tên sản phẩm",
    CellComponent: VVSSelectModel,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `tb_order.${indexOfRow}.name`,
      model: "Product",
      conditionField: {
        isActive: true,
      },
      onSelect: value => {
        if (!value) return;
        const { setValue } = formValue;
        setValue(
          `tb_order.${indexOfRow}.price`,
          formatNumber(value.sellingPrice)
        );
      },
    }),
  },
  {
    text: "Giá",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `tb_order.${indexOfRow}.price`,
      type: "string",
      disabled: true,
    }),
  },
  {
    text: "Số lượng",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `tb_order.${indexOfRow}.quantity`,
      type: "number",
      min: 0,
      onChange: () => {
        const { setValue, getValues } = formValue;
        const tbOrder = [...getValues("tb_order")];
        const totalPrice = tbOrder.reduce((total, item) => {
          total =
            total +
            Number(item.quantity || 0) *
              Number(item.price.replaceAll(".", "") || 0);

          return total;
        }, 0);
        setValue("price", totalPrice);
      },
    }),
  },
];

const DEFAULT_ROW_VALUE = {};

export default function NewCompetitor() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  const schema = yup
    .object({
      name: yup.string().required("Vui lòng nhập tên"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Competitor", yup, rest, errors);

  useEffect(() => {
    fetchCompetitorDetail();
  }, []);

  const fetchCompetitorDetail = async () => {
    if (!id) return;
    try {
      const res = await httpService.get(`${GET_COMPETITOR}/${id}`);
      const { reset } = rest;
      reset({
        ...res,
      });
    } catch (error) {
      history.replace("/competitor");
      toastrErrorAlert(language_vn.error);
      return;
    }
  };

  const onSubmit = async value => {
    const { createdAt, updatedAt, ...remaining } = value;

    const newCompetitor = {
      ...remaining,
      competitorId: await generateCode("Competitor", "competitorId"),
    };

    try {
      if (id) {
        const { competitorId, ...remaining } = newCompetitor;
        const res = await httpService.put(GET_COMPETITOR + `/${id}`, remaining);
        if (res?.updatedAt) {
          toastrSuccessAlert("Cập nhật đối thủ thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
        return;
      }
      const res = await httpService.post(GET_COMPETITOR, newCompetitor);
      if (res?.createdAt) {
        toastrSuccessAlert("Tạo đối thủ thành công!!");
        history.replace(`/competitor/${res.objectId}`);
        return;
      }
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    } catch (error) {
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / Sửa Đối Thủ ">
            <div className="d-flex align-items-center mb-2">
              <CommonButton level={0}>{language_vn.save}</CommonButton>
            </div>
          </HeaderCreateItem>

          <Card body>
            <CommonText level={1} className="m-0">
              Thông tin đối thủ
            </CommonText>
            {renderForm(excludeFields)}
          </Card>
        </form>
      </Container>
    </div>
  );
}
