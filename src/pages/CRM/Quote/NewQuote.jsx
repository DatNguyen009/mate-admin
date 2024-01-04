import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
import { GET_QUOTATIONS } from "helpers/url_helper";
import httpService from "services/httpService";
import { language_vn } from "helpers/language_vn";
import InputField from "components/form-control/InputField";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import Table from "components/form-control/Table";
import { formatNumber, generateCode } from "helpers/erp_helper";

const DEFAULT_ROW_VALUE = {};

export default function NewQuotation() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  const [sourceSelected, setSourceSelected] = useState("customer");
  const [quotationDetail, setQuotationDetail] = useState({});
  const [includeFunctions, setIncludeFunctions] = useState({
    typeCustomer: {
      onChange: e => {
        setSourceSelected(e.target.value);
      },
    },
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const HEADERS_TABLE_ORDER = [
    {
      text: "Tên sản phẩm",
      CellComponent: VVSSelectModel,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `tb_order.${indexOfRow}.name`,
        model: "Product",
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
          setValue(
            `tb_order.${indexOfRow}.totalPrice`,
            formatNumber(
              (Number(getValues(`tb_order.${indexOfRow}.quantity`)) || 0) *
                Number(
                  getValues(`tb_order.${indexOfRow}.price`).replaceAll(
                    ".",
                    ""
                  ) || 0
                )
            )
          );
          setTotalPrice(totalPrice);
        },
      }),
    },
    {
      text: "Thành tiền",
      CellComponent: InputField,
      cellComponentProps: (formValue, indexOfRow) => ({
        name: `tb_order.${indexOfRow}.totalPrice`,
        type: "string",
        disabled: true,
      }),
    },
  ];

  const schema = yup.object({}).required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      status: "draft",
      typeCustomer: "customer",
      quotationDate: moment(new Date()).format("YYYY-MM-DD"),
    },
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Quotation", yup, rest, errors);

  useEffect(() => {
    if (location.state?.lead?.objectId) {
      rest.setValue("typeCustomer", "lead");
      setSourceSelected("lead");
      setTimeout(() => {
        rest.setValue("lead", {
          text: location.state.lead?.name,
          objectId: location.state.lead.objectId,
          className: "Lead",
          __type: "Pointer",
        });
      }, 500);
    }
    if (location.state?.opportunity?.objectId) {
      rest.setValue("typeCustomer", location.state?.opportunity?.source);
      setSourceSelected(location.state?.opportunity?.source);
      setTimeout(() => {
        rest.setValue(
          location.state?.opportunity?.source === "lead" ? "lead" : "customer",
          {
            text:
              location.state.opportunity?.client?.fullName ||
              location.state.opportunity?.lead?.name,
            objectId:
              location.state.opportunity?.client?.objectId ||
              location.state.opportunity?.lead?.objectId,
            className: "Lead",
            __type: "Pointer",
          }
        );
        rest.setValue("opportunity", {
          text: location.state.opportunity?.name,
          objectId: location.state.opportunity?.objectId,
          className: "Opportunity",
          __type: "Pointer",
        });
      }, 500);
    }
    fetchQuotationDetail();
  }, []);

  useEffect(() => {
    if (sourceSelected === "lead") {
      const includeCopie = { ...includeFunctions };
      delete includeCopie.lead;
      setIncludeFunctions({
        ...includeCopie,
        customer: {
          name: "lead",
          model: "Lead",
        },
      });
      rest.setValue("lead.text", "");
      return;
    }
    if (sourceSelected === "customer") {
      setIncludeFunctions(prev => ({
        typeCustomer: {
          onChange: e => {
            setSourceSelected(e.target.value);
          },
        },
        lead: {
          name: "customer",
          model: "Customer",
        },
      }));
      rest.setValue("customer.text", "");
      return;
    }
  }, [sourceSelected]);

  const fetchQuotationDetail = async () => {
    if (!id) return;
    try {
      const res = await httpService.get(
        `${GET_QUOTATIONS}/${id}?include=["customer", "lead", "opportunity", "createdBy"]`
      );
      if (res?.customer) setSourceSelected("customer");
      if (res?.lead) setSourceSelected("lead");
      setQuotationDetail(res);
      console.log("res", res);
      const { reset } = rest;
      reset({
        ...res,
        quotationDate: moment(res.quotationDate?.iso).format("YYYY-MM-DD"),
        quotationEndDate: moment(res.quotationEndDate?.iso).format(
          "YYYY-MM-DD"
        ),
        customer: res?.customer
          ? {
              text: res.customer?.fullName,
              objectId: res.customer.objectId,
              className: "Customer",
              __type: "Pointer",
            }
          : { text: "" },
        lead: res?.lead
          ? {
              text: res.lead?.name,
              objectId: res.lead.objectId,
              className: "Customer",
              __type: "Pointer",
            }
          : { text: "" },
        opportunity: res?.opportunity
          ? {
              text: res.opportunity?.name,
              objectId: res.opportunity.objectId,
              className: "Opportunity",
              __type: "Pointer",
            }
          : { text: "" },
        tb_order: res?.items || [],
        createdBy: res?.createdBy?.username,
      });
      const totalPrice = res?.items.reduce((total, item) => {
        total =
          total +
          Number(item.quantity || 0) *
            Number(item.price.replaceAll(".", "") || 0);

        return total;
      }, 0);

      setTotalPrice(totalPrice);
    } catch (error) {
      history.replace("/quote");
      toastrErrorAlert(language_vn.error);
      return;
    }
  };

  const onSubmit = async value => {
    const user = JSON.parse(localStorage.getItem("User"));
    const {
      createdAt,
      updatedAt,
      customer,
      lead,
      tb_order,
      opportunity,
      quotationEndDate,
      ...quote
    } = value;

    if (!value?.tb_order) {
      toastrErrorAlert("Vui lòng nhập hàng hoá!!!");
      return;
    }

    const tbOrderFilter = value.tb_order.filter(item => item.name !== "");

    if (!tbOrderFilter.length) {
      toastrErrorAlert("Thông tin hàng hoá không được để trống");
      return;
    }

    const newQuotaion = {
      ...quote,
      ...(sourceSelected == "customer" && {
        customer: {
          objectId: customer?.objectId || null,
          className: "Customer",
          __type: "Pointer",
        },
        lead: null,
      }),
      ...(sourceSelected === "lead" &&
        lead?.objectId && {
          customer: null,
          lead: {
            objectId: lead?.objectId || null,
            className: "Lead",
            __type: "Pointer",
          },
        }),
      ...(opportunity?.objectId && {
        opportunity: {
          objectId: opportunity?.objectId || null,
          className: "Opportunity",
          __type: "Pointer",
        },
      }),
      quoteId: await generateCode("Quotation", "quoteId"),
      quotationDate: {
        iso: new Date(value.quotationDate),
        __type: "Date",
      },
      ...(quotationEndDate && {
        quotationEndDate: {
          iso: new Date(value.quotationEndDate),
          __type: "Date",
        },
      }),
      items: tbOrderFilter,
      createdBy: {
        objectId: user?.objectId || null,
        className: "_User",
        __type: "Pointer",
      },
    };

    try {
      if (id) {
        const { quoteId, ...remaining } = newQuotaion;
        const res = await httpService.put(GET_QUOTATIONS + `/${id}`, remaining);
        if (res?.updatedAt) {
          toastrSuccessAlert("Cập nhật báo giá thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
        return;
      }
      const res = await httpService.post(GET_QUOTATIONS, newQuotaion);
      if (res?.createdAt) {
        toastrSuccessAlert("Tạo báo giá thành công!!");
        history.replace(`/quote/${res.objectId}`);
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
          <HeaderCreateItem title="Thêm / Sửa Báo Giá ">
            <div className="d-flex align-items-center mb-2">
              <CommonButton level={0}>{language_vn.save}</CommonButton>
            </div>
          </HeaderCreateItem>

          <Card body>
            <CommonText level={1} className="m-0">
              Thông tin báo giá
            </CommonText>
            {renderForm(excludeFields, includeFunctions)}
          </Card>

          <Card body>
            <CommonText level={1} className="mb-3 mt-0">
              Thông tin đơn hàng báo giá
            </CommonText>
            <Table
              headers={HEADERS_TABLE_ORDER}
              defaultRowValue={DEFAULT_ROW_VALUE}
              formProps={{
                errors,
                ...rest,
              }}
              name="tb_order"
            />
            <CommonText level={1} style={{ textAlign: "right" }}>
              Tổng tiền: {formatNumber(totalPrice)}
            </CommonText>
          </Card>
        </form>
      </Container>
    </div>
  );
}
