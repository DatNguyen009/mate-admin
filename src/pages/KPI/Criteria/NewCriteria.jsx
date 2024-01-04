import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "reactstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import _, { toString } from "lodash";
import { CommonText } from "components/Common/TextCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { GET_KPI_CRITERIA } from "helpers/url_helper";
import httpService from "services/httpService";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
} from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import InputField from "components/form-control/InputField";
import InputFieldNumber from "components/form-control/InputFieldNumber";
import Spacer from "components/Common/Spacing";
import Table from "components/form-control/Table";
import SelectField from "components/form-control/Select";
import { formatNumber, getUserRole, parseNumber } from "helpers/erp_helper";
import IDatePicker from "components/Common/DatePicker";
import moment from "moment";
import ViewableCommon from "components/Common/ViewableCommon";
import HeaderCreateItemGoBack from "components/Common/HeaderCreateItemGoBack";

const ASSESS = [
  { index: 1, name: "Không đạt", value: "bad" },
  { index: 2, name: "Đạt", value: "good" },
  { index: 3, name: "Xuất sắc", value: "excellent" },
  { index: 4, name: "Sa thải", value: "fired" },
  { index: 5, name: "Thử việc thêm 1 tháng", value: "probation+1month" },
];

const ATTRIBUTES_NAME = [
  { index: 1, name: "Doanh số", value: "revenue", disabled: false },
  {
    index: 2,
    name: "Số cuộc gọi tiềm năng",
    value: "noPotentialCall",
    disabled: true,
  },
  {
    index: 3,
    name: "Số cuộc gọi quan tâm",
    value: "noInterestedCall",
    disabled: true,
  },
  {
    index: 4,
    name: "Số tin nhắn tiềm năng",
    value: "noPotentialMessage",
    disabled: true,
  },
  {
    index: 5,
    name: "Số tin nhắn quan tâm",
    value: "noInterestedMessage",
    disabled: true,
  },
];

const HEADER = [
  {
    text: "Tên tham số",
    CellComponent: SelectField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.attributeName`,
      options: ATTRIBUTES_NAME,
      onChange: event => {
        const { setValue } = formValue;

        const elementColCommission = document.getElementsByName(
          `kpi_table.${indexOfRow}.commissionPercent`
        )[0];

        const elementColKpiBonus = document.getElementsByName(
          `kpi_table.${indexOfRow}.kpiBonus`
        )[0];

        const selectedAttName = ATTRIBUTES_NAME.find(
          item => item.value === event?.target?.value
        );

        if (
          !event ||
          !elementColCommission ||
          !elementColKpiBonus ||
          !selectedAttName
        )
          return;

        if (selectedAttName?.disabled) {
          elementColCommission.setAttribute(
            "disabled",
            selectedAttName?.disabled
          );

          elementColKpiBonus.setAttribute(
            "disabled",
            selectedAttName?.disabled
          );
          setValue(`kpi_table.${indexOfRow}.commissionPercent`, 0);
          setValue(`kpi_table.${indexOfRow}.kpiBonus`, "");
        } else {
          elementColCommission.removeAttribute("disabled");
          elementColKpiBonus.removeAttribute("disabled");
        }
      },
    }),
  },
  {
    text: "Mức đạt doanh số từ (%)",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.rangeFrom`,
    }),
  },
  {
    text: "Mức đạt doanh số đến (%)",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.rangeTo`,
    }),
  },
  {
    text: "Đánh giá",
    CellComponent: SelectField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.assess`,
      options: ASSESS,
    }),
  },
  {
    text: "% Hoa hồng (%) ",
    CellComponent: InputFieldNumber,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.commissionPercent`,
      max: 100,
      min: 0,
      onChange: value => {
        const { setValue } = formValue;
        setValue(
          `kpi_table.${indexOfRow}.commissionPercent`,
          formatNumber(value)
        );
      },
    }),
  },
  {
    text: "Thưởng Bonus (VNĐ)",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.kpiBonus`,
      type: "text",
      onChange: e => {
        const { setValue } = formValue;
        setValue(
          `kpi_table.${indexOfRow}.kpiBonus`,
          formatNumber(e.target.value)
        );
      },
    }),
  },
];

const NewCriteria = () => {
  const { id } = useParams();
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);

  useEffect(() => {
    (async () => {
      const roles = await getUserRole();
      setRoles(roles);
    })();
    getKpi();
  }, [id]);

  const schema = yup
    .object({
      name: yup.string().required("Trường này bắt buộc"),

      // requiredSalesFrom: yup.lazy(value =>
      //   typeof value === "string"
      //     ? yup
      //         .string()
      //         .transform((_, val) => val && Number(val.replaceAll(".", "")))
      //         .required("Trường này bắt buộc")
      //     : yup
      //         .number()
      //         .typeError(`DS bắt buộc phải là số!`)
      //         .nullable()
      //         .moreThan(0, "Floor area cannot be negative")
      // ),
      // requiredSalesTo: yup.lazy(value =>
      //   typeof value === "string"
      //     ? yup
      //         .string()
      //         .transform((_, val) => val && Number(val.replaceAll(".", "")))
      //         .required("Trường này bắt buộc")
      //     : yup
      //         .number()
      //         .typeError(`DS bắt buộc phải là số!`)
      //         .nullable()
      //         .moreThan(0, "Floor area cannot be negative")
      // ),
      revenue: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`DS bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
      noPotentialCall: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`Số cuộc gọi bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
      noInterestedCall: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`Số cuộc gọi bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
      noPotentialMessage: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`Số tin nhắn bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
      noInterestedMessage: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`Số tin nhắn bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
      // duration: yup.lazy(value =>
      //   typeof value === "string"
      //     ? yup
      //         .string()
      //         .transform((_, val) => val && Number(val.replaceAll(".", "")))
      //         .required("Trường này bắt buộc")
      //     : yup
      //         .number()
      //         .typeError(`Thời gian áp dụng phải là số!`)
      //         .nullable()
      //         .moreThan(0, "Floor area cannot be negative")
      // ),
      pluralFrom: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`Mức đạt DS phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
      pluralTo: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`Mức đạt DS phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),

      commissionPercent: yup.string().typeError(`% Hoa hồng phải là số!`),

      kpiBonus: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
          : yup
              .number()
              .typeError(`Thưởng KPI là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
      kpiOfMonth: yup.string().required("Vui lòng chọn tháng!"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      typeDuration: "month",
      ...(roles.includes("Master") && { type: "team" }),
    },
    resolver: yupResolver(schema),
  });
  const { setValue } = rest;
  useEffect(() => {
    if (!id) {
      setValue("type", roles.includes("Master") ? "team" : "personal");
    }
  }, [roles]);

  const { renderForm } = useGetFormSchema("Kpi", yup, rest, errors);

  const getKpi = async () => {
    if (!id) return;

    const res = await httpService.get(
      `${GET_KPI_CRITERIA}/${id}?include=["employeeGrade"]`
    );

    if (!res) {
      history.replace("/kpi");
      toastrErrorAlert("KPI not found!");
      return;
    }

    const requiredSalesFromValue = res?.requiredSalesFrom
      ? JSON.parse(res?.requiredSalesFrom)
      : null;

    const { reset } = rest;

    reset({
      ...res,

      kpi_table:
        res?.attributes &&
        res?.attributes.map((item, index) => {
          return {
            attributeName: item.attributeName,
            rangeFrom: item.rangeFrom,
            rangeTo: item.rangeTo,
            commissionPercent: item.commissionPercent,
            kpiBonus: formatNumber(item.kpiBonus),
            assess: item.assess,
          };
        }),
      employeeGrade: res?.employeeGrade
        ? {
            text: res.employeeGrade?.name,
            objectId: res.employeeGrade.objectId,
            className: "EmployeeGrade",
            __type: "Pointer",
          }
        : { text: "" },
      revenue: formatNumber(requiredSalesFromValue?.revenue),
      noPotentialCall: formatNumber(requiredSalesFromValue?.noPotentialCall),
      noInterestedCall: formatNumber(requiredSalesFromValue?.noInterestedCall),
      noPotentialMessage: formatNumber(
        requiredSalesFromValue?.noPotentialMessage
      ),
      noInterestedMessage: formatNumber(
        requiredSalesFromValue?.noInterestedMessage
      ),
      // requiredSalesFrom: formatNumber(res?.requiredSalesFrom),
      // requiredSalesTo: formatNumber(res?.requiredSalesTo),
      kpiBonus: formatNumber(res?.kpiBonus),
      kpiOfMonth: res?.kpiOfMonth?.iso,
    });

    disableKPITableRules(res?.attributes || []);
    setAttributeValues(res?.attributes);
  };

  const disableKPITableRules = table_values => {
    if (Array.isArray(table_values) && table_values.length === 0) return;

    table_values.map((row, index) => {
      const selectedAttName = ATTRIBUTES_NAME.find(
        att => att.value === row?.attributeName
      );
      if (!selectedAttName) return;

      if (selectedAttName.disabled) {
        const elementColCommission = document.getElementsByName(
          `kpi_table.${index}.commissionPercent`
        )[0];
        const elementColKpiBonus = document.getElementsByName(
          `kpi_table.${index}.kpiBonus`
        )[0];
        if (!elementColCommission || !elementColKpiBonus) return;

        elementColCommission.setAttribute(
          "disabled",
          selectedAttName?.disabled
        );

        elementColKpiBonus.setAttribute("disabled", selectedAttName?.disabled);
        return;
      }
    });
  };

  const onSubmit = async values => {
    const { setValue } = rest;

    const requiredSalesFrom = {
      revenue: String(values.revenue) || "0",
      noPotentialCall: String(values.noPotentialCall) || "0",
      noInterestedCall: String(values.noInterestedCall) || "0",
      noPotentialMessage: String(values.noPotentialMessage) || "0",
      noInterestedMessage: String(values.noInterestedMessage) || "0",
    };

    const kpi = {
      name: values.name,
      // requiredSalesFrom: Number(values.requiredSalesFrom),
      // requiredSalesTo: Number(values.requiredSalesTo),
      requiredSalesFrom: JSON.stringify(requiredSalesFrom),
      employeeGrade: {
        objectId: values?.employeeGrade?.objectId,
        className: "EmployeeGrade",
        __type: "Pointer",
      },
      type: values.type,
      // duration: Number(values.duration),
      // typeDuration: values.typeDuration,
      isActive: values.isActive,
      attributes: values.kpi_table.map(item => ({
        ...item,
        attributeName: toString(item.attributeName),
        rangeFrom: Number(item.rangeFrom),
        rangeTo: Number(item.rangeTo),
        commissionPercent: Number(item.commissionPercent),
        kpiBonus: parseNumber(item.kpiBonus),
        assess: toString(item.assess),
      })),
      kpiOfMonth: {
        iso: moment(values.kpiOfMonth).startOf("month"),
        __type: "Date",
      },
    };

    if (id) {
      try {
        const res = await httpService.put(GET_KPI_CRITERIA + `/${id}`, kpi);
        if (res?.updatedAt) {
          toastrCRUDSuccess("Kpi", TEXT_PUT);
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      } catch (error) {
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      }
      return;
    }
    try {
      const res = await httpService.post(GET_KPI_CRITERIA, kpi);

      if (res?.createdAt) {
        toastrCRUDSuccess("Kpi", TEXT_POST);
        history.replace(`/kpi/${res?.objectId}`);
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
          <ViewableCommon
            if={() => roles.includes("Admin")}
            caseTrue={
              <HeaderCreateItem title="Thêm / Sửa Chỉ Tiêu KPI">
                <CommonButton level={0} type="submit">
                  Lưu
                </CommonButton>
              </HeaderCreateItem>
            }
            caseFalse={
              <HeaderCreateItemGoBack title="Thêm / Sửa Chỉ Tiêu KPI">
                <CommonButton level={0} type="submit">
                  Lưu
                </CommonButton>
              </HeaderCreateItemGoBack>
            }
          />

          <Card
            style={{
              position: "relative",
            }}
            body
          >
            <CommonText level={1} className="m-0">
              Thông tin mục tiêu
            </CommonText>
            {renderForm([], {
              kpiOfMonth: {
                formatDate: "MM/YYYY",
                picker: "month",
                allowClear: false,
              },
              type: {
                ...(roles.some(
                  item => item === "Sale Leader" || item === "Master"
                ) && {
                  disabled: true,
                }),
              },
            })}
            {/* <Col
              style={{
                position: "absolute",
                right: "40px",
                top: "331px",
                maxWidth: "781px",
              }}
              xs={6}
            >
              <div style={{ minHeight: 89, paddingLeft: "23px" }}>
                <IDatePicker
                  label="Tháng"
                  name="kpiOfMonth"
                  errors={errors}
                  formatDate={"MM/YYYY"}
                  picker="month"
                  allowClear={false}
                  {...rest}
                />
              </div>
            </Col> */}
            <Col xs={12}>
              <div>
                <div className="d-flex flex-column justify-content-start align-items-start">
                  <CommonText
                    className="text-nowrap my-0"
                    level={1}
                    style={{ minWidth: "8rem" }}
                  >
                    Tham số
                  </CommonText>
                </div>
                <Spacer size={20} />

                <Table
                  headers={HEADER}
                  formProps={{
                    errors,
                    ...rest,
                  }}
                  onChangePaging={() => disableKPITableRules(attributeValues)}
                  name="kpi_table"
                />
              </div>
            </Col>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default NewCriteria;
