import React, { useEffect } from "react";
import { Card, Container } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import Table from "components/form-control/Table";
import { CommonText } from "components/Common/TextCommon";
import VVSSelectRelation from "components/Common/VVSSelectRelation";
import { addVoucher, updateVoucher } from "redux-toolkit/slices/CMS/Voucher";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import moment from "moment";
import { formatNumber } from "helpers/erp_helper";
import { voucherContent } from "./constant";
import { language_vn } from "helpers/language_vn";

const HEADERS = [
  {
    text: "Nhãn hiệu",
    CellComponent: VVSSelectRelation,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `policy.${indexOfRow}.brands`,
      model: "Brand",
    }),
  },
  {
    text: "Danh mục",
    CellComponent: VVSSelectRelation,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `policy.${indexOfRow}.categories`,
      model: "Category",
    }),
  },
  {
    text: "Sản phẩm",
    CellComponent: VVSSelectRelation,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `policy.${indexOfRow}.products`,
      model: "Product",
    }),
  },
];

const NewVoucher = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getVoucherDetail();
  }, [id]);

  const schema = yup
    .object({
      name: yup.string().required("This field is required!"),
      budget: yup
        .number()
        .transform((_, val) => (val ? Number(val.replaceAll(".", "")) : 0)),
      amount: yup
        .number()
        .transform((_, val) => (val ? Number(val.replaceAll(".", "")) : 0)),
      maxDiscount: yup
        .number()
        .transform((_, val) => (val ? Number(val.replaceAll(".", "")) : 0)),
      maxRedemption: yup
        .number()
        .transform((_, val) => (val ? Number(val.replaceAll(".", "")) : 0)),
      maxRedemptionPerCustomer: yup
        .number()
        .transform((_, val) => (val ? Number(val.replaceAll(".", "")) : 0)),
      priceAbove: yup
        .number()
        .transform((_, val) => (val ? Number(val.replaceAll(".", "")) : 0)),
      startDate: yup
        .object()
        .shape({ __type: yup.string(), iso: yup.string() })
        .nullable()
        .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),
      endDate: yup
        .object()
        .shape({ __type: yup.string(), iso: yup.string() })
        .nullable()
        .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      type: "fixed",
      budget: "",
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().add(1, "months").format("YYYY-MM-DD"),
    },
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Voucher", yup, rest, errors);

  const getVoucherDetail = async () => {
    if (!id) return;

    try {
      const res = await httpService.get(`/parse/classes/Voucher/${id}`);

      const { reset } = rest;
      reset({
        ...res,
        startDate: moment(res?.startDate?.iso || "").format("YYYY-MM-DD"),
        endDate: moment(res?.endDate?.iso || "").format("YYYY-MM-DD"),
        budget: formatNumber(res?.budget),
        amount: formatNumber(res?.amount),
        priceAbove: formatNumber(res?.priceAbove),
        maxRedemption: formatNumber(res?.maxRedemption),
        maxRedemptionPerCustomer: formatNumber(res?.maxRedemptionPerCustomer),
        maxDiscount: formatNumber(res?.maxDiscount),
      });
    } catch (errorRes) {
      if (errorRes?.response?.data?.code === 101) {
        toastrErrorAlert("Không tìm thấy Voucher!");
        history.replace("/voucher");
      }
    }
  };

  const onSubmit = async values => {
    if (
      values.amount < 0 &&
      (values.type === "fixed" || values.type === "percent")
    ) {
      toastrErrorAlert("Giá trị giảm không được nhỏ hơn không!");
      return;
    }
    if (values.amount > 100 && values.type === "percent") {
      toastrErrorAlert("Giá trị giảm phần trăm không được vượt quá 100%!");
      return;
    }

    const { createdAt, updatedAt, ...voucherValues } = values;

    const voucher = {
      ...voucherValues,
      content: voucherContent,
      displayApp: voucherValues.displayApp ? "Yes" : "No",
    };

    if (id) {
      dispatch(updateVoucher({ dataItem: voucher, dataId: id }));
      return;
    }

    const res = await dispatch(addVoucher(voucher));
    history.replace(`/voucher/${res.payload.objectId}`);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / Chỉnh sửa Voucher">
            <CommonButton level={0} type="submit">
              {language_vn.save}
            </CommonButton>
          </HeaderCreateItem>
          {renderForm()}
          <Card body>
            <CommonText level={1} className="m-0">
              Điều kiện
            </CommonText>
            <Table headers={HEADERS} formProps={{ ...rest }} name="policy" />
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default NewVoucher;
