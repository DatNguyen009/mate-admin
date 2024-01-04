import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import SelectConst from "components/form-control/SelectConst";
import InputField from "components/form-control/InputField";
import moment from "moment";
import ViewableCommon from "components/Common/ViewableCommon";
import CheckBox from "components/form-control/CheckBox";
import httpService from "services/httpService";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
} from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "components/Common/Spacing";
import Table from "components/form-control/Table";
import SelectField from "components/form-control/Select";
import { formatNumber, getUserRole } from "helpers/erp_helper";
import IDatePicker from "components/Common/DatePicker";
import HeaderCreateItemGoBack from "components/Common/HeaderCreateItemGoBack";

const ASSESS = [
  { index: 1, name: "Không đạt", value: "bad" },
  { index: 2, name: "Đạt", value: "good" },
  { index: 3, name: "Xuất sắc", value: "excellent" },
  { index: 4, name: "Sa thải", value: "fired" },
  { index: 5, name: "Thử việc thêm 1 tháng", value: "probation+1month" },
];

const ATTRIBUTES_NAME = [
  { index: 1, name: "Doanh số", value: "revenue" },
  { index: 2, name: "Số cuộc gọi tiềm năng", value: "noPotentialCall" },
  { index: 3, name: "Số cuộc gọi quan tâm", value: "noInterestedCall" },
  { index: 4, name: "Số tin nhắn tiềm năng", value: "noPotentialMessage" },
  { index: 5, name: "Số tin nhắn quan tâm", value: "noInterestedMessage" },
];
const HEADERS1 = [
  {
    text: "Tên tham số",
    CellComponent: SelectField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.attributeName`,
      options: ATTRIBUTES_NAME,
      disabled: true,
    }),
  },
  {
    text: "Mức đạt doanh số từ (%)",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.rangeFrom`,
      disabled: true,
    }),
  },
  {
    text: "Mức đạt doanh số đến (%)",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.rangeTo`,
      disabled: true,
    }),
  },
  {
    text: "Đánh giá",
    CellComponent: SelectField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.assess`,
      options: ASSESS,
      disabled: true,
    }),
  },
  {
    text: "% Hoa hồng (%) ",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.commissionPercent`,
      type: "text",
      disabled: true,
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
      disabled: true,
    }),
  },
];

const NewKPIEmployee = () => {
  const [target, setTarget] = useState("employee");
  const [dataAttributes, setDataAttributes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isSeleted, setIsSeleted] = useState(true);

  const { id } = useParams();
  const history = useHistory();
  const schema = yup
    .object({
      kpi: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Kpi",
                objectId: val.objectId,
              }
            : undefined
        )
        .required("Vui lòng chọn KPI!"),
      employee:
        target === "employee" &&
        yup
          .object()
          .nullable()
          .transform((_, val) =>
            val?.objectId
              ? {
                  __type: "Pointer",
                  className: "Employee",
                  objectId: val.objectId,
                }
              : undefined
          )
          .required("Vui lòng chọn nhân viên!"),
      // from: yup
      //   .object()
      //   .nullable()
      //   .shape({
      //     __type: yup.string(),
      //     iso: yup.string(),
      //   })
      //   .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),
      // to: yup
      //   .object()
      //   .nullable()
      //   .shape({
      //     __type: yup.string(),
      //     iso: yup.string(),
      //   })
      //   .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),
      // target: yup.string().required("This field is required!"),
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

  const { renderForm } = useGetFormSchema("KPIAssignment", yup, rest, errors);

  const onSubmit = async values => {
    try {
      const {
        createdAt,
        updatedAt,
        target,
        kpi_table,
        bonus,
        commission,
        saleTotal,
        noPotentialCall,
        noInterestedCall,
        noPotentialMessage,
        noInterestedMessage,
        kpi_revenue,
        kpi_noPotentialCall,
        kpi_noInterestedCall,
        kpi_noPotentialMessage,
        kpi_noInterestedMessage,
        ...kpiAssignmentValues
      } = values;
      const kpiAssignmentUrl = "/parse/classes/KPIAssignment";

      const kpiAssignment = {
        ...kpiAssignmentValues,
        // bonus:
        //   typeof kpiAssignmentValues?.bonus === "string" &&
        //   kpiAssignmentValues?.bonus.includes(".")
        //     ? Number(kpiAssignmentValues?.bonus.replaceAll(".", ""))
        //     : Number(kpiAssignmentValues?.bonus),
        // commission:
        //   typeof kpiAssignmentValues?.commission === "string" &&
        //   kpiAssignmentValues?.commission.includes(".")
        //     ? Number(kpiAssignmentValues?.commission.replaceAll(".", ""))
        //     : Number(kpiAssignmentValues?.commission),
        // saleTotal:
        //   typeof kpiAssignmentValues?.saleTotal === "string" &&
        //   kpiAssignmentValues?.saleTotal.includes(".")
        //     ? Number(kpiAssignmentValues?.saleTotal.replaceAll(".", ""))
        //     : Number(kpiAssignmentValues?.saleTotal),
        kpiOfMonth: {
          iso: moment(values.kpiOfMonth).startOf("month"),
          __type: "Date",
        },
      };
      if (id) {
        await httpService.put(kpiAssignmentUrl + `/${id}`, kpiAssignment);
        toastrCRUDSuccess("KPI Employee", TEXT_PUT);
        return;
      }

      const { objectId } = await httpService.post(kpiAssignmentUrl, {
        ...kpiAssignment,
        contracts: [],
      });
      toastrCRUDSuccess("KPI Employee", TEXT_POST);
      history.replace(`/kpi-employee/${objectId}`);
    } catch (errorRes) {
      if (errorRes?.response?.data?.error) {
        toastrErrorAlert(errorRes.response.data.error);
      }
    }
  };

  const getKpiEmployee = async () => {
    try {
      if (!id) return;
      const kpiUrl = `/parse/classes/KPIAssignment/${id}?include=["employee","kpi"]`;
      const kpiAssignment = await httpService.get(kpiUrl);
      setDataAttributes(kpiAssignment);

      const requiredSalesFrom =
        kpiAssignment?.kpi && JSON.parse(kpiAssignment?.kpi?.requiredSalesFrom);

      rest.reset({
        ...kpiAssignment,
        ...(kpiAssignment?.employee && { target: "employee" }),
        bonus: formatNumber(kpiAssignment?.bonus) || 0,
        commission: formatNumber(kpiAssignment?.commission) || 0,
        saleTotal: formatNumber(kpiAssignment?.saleTotal) || 0,
        noPotentialCall: formatNumber(kpiAssignment?.noPotentialCall) || 0,
        noInterestedCall: formatNumber(kpiAssignment?.noInterestedCall) || 0,
        noPotentialMessage:
          formatNumber(kpiAssignment?.noPotentialMessage) || 0,
        noInterestedMessage:
          formatNumber(kpiAssignment?.noInterestedMessage) || 0,
        kpi_revenue: formatNumber(requiredSalesFrom?.revenue),
        kpi_noPotentialCall: formatNumber(requiredSalesFrom?.noPotentialCall),
        kpi_noInterestedCall: formatNumber(requiredSalesFrom?.noInterestedCall),
        kpi_noPotentialMessage: formatNumber(
          requiredSalesFrom?.noPotentialMessage
        ),
        kpi_noInterestedMessage: formatNumber(
          requiredSalesFrom?.noInterestedMessage
        ),
        kpi_table:
          kpiAssignment?.kpi?.attributes &&
          kpiAssignment?.kpi?.attributes.map((item, index) => {
            return {
              attributeName: item.attributeName,
              rangeFrom: item.rangeFrom,
              rangeTo: item.rangeTo,
              commissionPercent: item.commissionPercent,
              kpiBonus: formatNumber(item.kpiBonus),
              assess: item.assess,
            };
          }),
        kpi: kpiAssignment?.kpi
          ? {
              text: kpiAssignment.kpi.name,
              objectId: kpiAssignment.kpi.objectId,
              className: "KPI",
              __type: "Pointer",
            }
          : null,
        employee: kpiAssignment?.employee
          ? {
              text: kpiAssignment.employee.fullName,
              objectId: kpiAssignment.employee.objectId,
              className: "Employee",
              __type: "Pointer",
            }
          : null,
        // from: moment(kpiAssignment?.from?.iso),
        // to: moment(kpiAssignment?.to?.iso),
        kpiOfMonth: kpiAssignment?.kpiOfMonth?.iso,
      });
      const target = (kpiAssignment?.employee && "employee") || null;
      setTarget(target);
    } catch (errorRes) {
      if (errorRes?.response?.data?.error) {
        toastrErrorAlert(errorRes.response.data.error);
      }
    }
  };

  useEffect(async () => {
    const roles = await getUserRole();
    setRoles(roles);
    getKpiEmployee();
  }, [id]);

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ViewableCommon
            if={() => roles.includes("Admin")}
            caseTrue={
              <HeaderCreateItem title="Thêm / Sửa Chỉ Tiêu Cho Nhân Viên">
                <CommonButton level={0}>Lưu</CommonButton>
              </HeaderCreateItem>
            }
            caseFalse={
              <HeaderCreateItemGoBack title="Thêm / Sửa Chỉ Tiêu Cho Nhân Viên">
                <CommonButton level={0} type="submit">
                  Lưu
                </CommonButton>
              </HeaderCreateItemGoBack>
            }
          />
          <Card body>
            <Row>
              <Col hidden>
                <div style={{ minHeight: 89 }}>
                  <SelectConst
                    label="Chọn mục tiêu"
                    name="target"
                    errors={errors}
                    {...rest}
                    options={[{ text: "Nhân viên", value: "employee" }]}
                    disableEmptyOption
                  />
                </div>
              </Col>
              <Col xs={4}>
                <VVSSelectModel
                  label="Nhân viên"
                  name="employee.text"
                  model="Employee"
                  conditionField={{
                    isActive: true,
                  }}
                  errors={errors}
                  {...rest}
                />
              </Col>

              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  <VVSSelectModel
                    label="KPI"
                    name="kpi.text"
                    model="Kpi"
                    conditionField={{
                      isActive: true,
                      type: "personal",
                    }}
                    errors={errors}
                    {...rest}
                    onSelect={kpi => {
                      setIsSeleted(false);
                      setDataAttributes(kpi);
                      if (!kpi) return;

                      const requiredSalesFrom =
                        kpi?.requiredSalesFrom &&
                        JSON.parse(kpi?.requiredSalesFrom);

                      // rest.setValue("from", moment());
                      // rest.setValue(
                      //   "to",
                      //   moment().add(kpi.duration, kpi?.typeDuration)
                      // );
                      rest.setValue("type", kpi.type);
                      rest.setValue(
                        "kpi_table",
                        kpi?.attributes &&
                          kpi?.attributes.map((item, index) => {
                            return {
                              attributeName: item.attributeName,
                              rangeFrom: item.rangeFrom,
                              rangeTo: item.rangeTo,
                              commissionPercent: item.commissionPercent,
                              kpiBonus: item.kpiBonus,
                              assess: item.assess,
                            };
                          })
                      );
                      rest.setValue("kpiOfMonth", kpi?.kpiOfMonth?.iso);
                      rest.setValue(
                        "kpi_revenue",
                        formatNumber(requiredSalesFrom?.revenue)
                      );
                      rest.setValue(
                        "kpi_noPotentialCall",
                        formatNumber(requiredSalesFrom?.noPotentialCall)
                      );
                      rest.setValue(
                        "kpi_noInterestedCall",
                        formatNumber(requiredSalesFrom?.noInterestedCall)
                      );
                      rest.setValue(
                        "kpi_noPotentialMessage",
                        formatNumber(requiredSalesFrom?.noPotentialMessage)
                      );
                      rest.setValue(
                        "kpi_noInterestedMessage",
                        formatNumber(requiredSalesFrom?.noInterestedMessage)
                      );
                    }}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  <IDatePicker
                    label="Tháng"
                    name="kpiOfMonth"
                    errors={errors}
                    formatDate={"MM/YYYY"}
                    picker="month"
                    disabled={true}
                    allowClear={false}
                    {...rest}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label={"Doanh số bắt buộc (VNĐ):"}
                    name="kpi_revenue"
                    disabled={true}
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label={"Số cuộc gọi tiềm năng:"}
                    name="kpi_noPotentialCall"
                    disabled={true}
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label={"Số cuộc gọi quan tâm:"}
                    name="kpi_noInterestedCall"
                    disabled={true}
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                xs={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CheckBox
                  label="Hoạt động"
                  name="isActive"
                  errors={errors}
                  {...rest}
                />
              </Col>
              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label={"Số tin nhắn tiềm năng:"}
                    name="kpi_noPotentialMessage"
                    disabled={true}
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label={"Số tin nhắn quan tâm:"}
                    name="kpi_noInterestedMessage"
                    disabled={true}
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <div style={{ minHeight: 89 }}>
                  <IDatePicker
                    label="Từ ngày"
                    name="from"
                    disabled={isSeleted}
                    onChange={kpi => {
                      rest.setValue("from", moment(kpi));
                      rest.setValue(
                        "to",
                        moment(rest.getValues().from).add(
                          dataAttributes?.duration,
                          dataAttributes?.typeDuration
                        )
                      );
                    }}
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
              <Col>
                <div style={{ minHeight: 89 }}>
                  <IDatePicker
                    label="Đến ngày"
                    name="to"
                    disabled
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CheckBox
                  label="Hoạt động"
                  name="isActive"
                  errors={errors}
                  {...rest}
                />
              </Col>
            </Row> */}
          </Card>
          {renderForm([])}
        </form>
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
              disableAdd
              disableDelete
              headers={HEADERS1}
              formProps={{
                errors,
                ...rest,
              }}
              name="kpi_table"
            />
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default NewKPIEmployee;
