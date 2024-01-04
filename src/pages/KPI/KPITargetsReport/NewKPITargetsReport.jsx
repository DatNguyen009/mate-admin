import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import HeaderCreateItemGoBack from "components/Common/HeaderCreateItemGoBack";
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
import { formatNumber } from "helpers/erp_helper";
import { GET_KPI_ASSIGNMENT } from "helpers/url_helper";
import IDatePicker from "components/Common/DatePicker";
import { getUserRole } from "helpers/erp_helper";

const ASSESS = [
  { index: 1, name: "Không đạt", value: "bad" },
  { index: 2, name: "Đạt", value: "good" },
  { index: 3, name: "Xuất sắc", value: "excellent" },
];
const HEADERS1 = [
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
    text: "% Hoa hồng (%) ",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `kpi_table.${indexOfRow}.commissionPercent`,
      type: "text",
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
    text: "Thưởng KPI (VNĐ)",
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

const NewKPITargetsReport = () => {
  const [target, setTarget] = useState("team");
  const [dataAttributes, setDataAttributes] = useState([]);
  const [isSeleted, setIsSeleted] = useState(true);
  const [acceptedUserRole, setAcceptedUserRole] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    const roles = await getUserRole();
    const accessRole = roles?.filter(
      role =>
        String(role).toUpperCase() === "MASTER" ||
        String(role).toUpperCase() === "SALE LEADER"
    );

    const finalRole =
      accessRole.length <= 0
        ? ""
        : accessRole?.find(role => String(role).toUpperCase() === "MASTER") ||
          accessRole[0];

    setAcceptedUserRole(finalRole);
    console.log("11111", finalRole);
  }, []);

  const isAdministratorsRole = useMemo(() => {
    console.log("22222", acceptedUserRole);
    return acceptedUserRole.toUpperCase() === "MASTER";
  }, [acceptedUserRole]);

  const schema = yup
    .object({
      team:
        isAdministratorsRole &&
        yup
          .object()
          .nullable()
          .transform((_, val) =>
            val?.objectId
              ? {
                  __type: "Pointer",
                  className: "EmployeeGroup",
                  objectId: val.objectId,
                }
              : undefined
          )
          .required("Vui lòng chọn nhóm!"),
      employee:
        !isAdministratorsRole &&
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
      revenueTotal: yup
        .number()
        .transform((val, originVal) => {
          if (!originVal) return null;
          if (originVal.length > 11) return "";
          return val;
        })
        .nullable()
        .typeError("Chỉ nhận số tối đa 11 số"),
      potentialCallNumber: yup
        .number()
        .transform((val, originVal) => {
          if (!originVal) return null;
          if (originVal.length > 11) return "";
          return val;
        })
        .nullable()
        .typeError("Chỉ nhận số tối đa 11 số"),
      interestedCallNumber: yup
        .number()
        .transform((val, originVal) => {
          if (!originVal) return null;
          if (originVal.length > 11) return "";
          return val;
        })
        .nullable()
        .typeError("Chỉ nhận số tối đa 11 số"),
      potentialMessageNumber: yup
        .number()
        .transform((val, originVal) => {
          if (!originVal) return null;
          if (originVal.length > 11) return "";
          return val;
        })
        .nullable()
        .typeError("Chỉ nhận số tối đa 11 số"),
      interestedMessageNumber: yup
        .number()
        .transform((val, originVal) => {
          if (!originVal) return null;
          if (originVal.length > 11) return "";
          return val;
        })
        .nullable()
        .typeError("Chỉ nhận số tối đa 11 số"),
      kpiOfMonth: yup.object().nullable().required("Vui lòng chọn tháng!"),
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

  const onSubmit = async values => {
    try {
      const {
        createdAt,
        updatedAt,
        saleTotal,
        contracts,
        kpiOfMonth,
        kpi_table,

        ...kpiAssignmentValues
      } = values;

      const kpiOfMonthFormat = kpiOfMonth
        ? moment(kpiOfMonth).format("MM/YYYY")
        : "";

      console.log("kpiAssignmentValues", kpiAssignmentValues, kpiOfMonthFormat);
      return;
      if (id) {
        await httpService.put(GET_KPI_ASSIGNMENT + `/${id}`, {
          ...kpiAssignmentValues,
          kpiOfMonth: kpiOfMonthFormat,
        });
        toastrCRUDSuccess("KPI Group", TEXT_PUT);
        return;
      }

      const { objectId } = await httpService.post(GET_KPI_ASSIGNMENT, {
        ...kpiAssignmentValues,
        contracts: [],
        kpi: {
          objectId: "lVhTUNd0N0",
          className: "Kpi",
          __type: "Pointer",
        },
        kpi_table: [],
        kpiOfMonth: kpiOfMonthFormat,
        type: "team",
      });
      toastrCRUDSuccess("KPI Group", TEXT_POST);
      history.replace(`/kpi-targets-report/${objectId}`);
    } catch (errorRes) {
      if (errorRes?.response?.data?.error) {
        toastrErrorAlert(errorRes.response.data.error);
      }
    }
  };

  const getKpiTargetsReport = async () => {
    try {
      if (!id || !acceptedUserRole) return;
      console.log("33333", isAdministratorsRole);
      const params = {
        include: isAdministratorsRole ? "team" : "employee",
      };

      const kpiAssignment = await httpService.get(
        GET_KPI_ASSIGNMENT + `/${id}`,
        {
          params,
        }
      );

      const kpiOfMonthFormat = kpiAssignment?.kpiOfMonth
        ? kpiAssignment?.kpiOfMonth
            .split("/")
            .sort((a, b) => b - a)
            .join("/")
        : "";

      rest.reset({
        // team: kpiAssignment?.team
        //   ? {
        //       text: kpiAssignment.team.name,
        //       objectId: kpiAssignment.team.objectId,
        //       className: "EmployeeGroup",
        //       __type: "Pointer",
        //     }
        //   : null,
        ...(isAdministratorsRole
          ? {
              team: kpiAssignment?.team
                ? {
                    text: kpiAssignment.team.name,
                    objectId: kpiAssignment.team.objectId,
                    className: "EmployeeGroup",
                    __type: "Pointer",
                  }
                : null,
            }
          : {
              employee: kpiAssignment?.employee
                ? {
                    text: kpiAssignment.employee.fullName,
                    objectId: kpiAssignment.employee.objectId,
                    className: "Employee",
                    __type: "Pointer",
                  }
                : null,
            }),
        revenueTotal: kpiAssignment?.revenueTotal || 0,
        potentialCallNumber: kpiAssignment?.potentialCallNumber || 0,
        interestedCallNumber: kpiAssignment?.interestedCallNumber || 0,
        potentialMessageNumber: kpiAssignment?.potentialMessageNumber || 0,
        interestedMessageNumber: kpiAssignment?.interestedMessageNumber || 0,
        isActive: kpiAssignment?.isActive,
        kpiOfMonth: kpiOfMonthFormat,
      });
    } catch (errorRes) {
      if (errorRes?.response?.data?.error) {
        toastrErrorAlert(errorRes.response.data.error);
      }
    }
  };

  useEffect(() => {
    getKpiTargetsReport();
  }, [id, acceptedUserRole]);

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItemGoBack title="Thêm / Sửa Chỉ Tiêu Cho Nhóm">
            <CommonButton level={0}>Lưu</CommonButton>
          </HeaderCreateItemGoBack>
          <Card body>
            <Row>
              <Col xs={4}>
                {isAdministratorsRole ? (
                  <VVSSelectModel
                    label="Đội nhóm"
                    name="team.text"
                    model="EmployeeGroup"
                    // disabled={true}
                    conditionField={{
                      isActive: true,
                    }}
                    errors={errors}
                    {...rest}
                  />
                ) : (
                  <VVSSelectModel
                    label="Nhân viên"
                    name="employee.fullName"
                    model="Employee"
                    conditionField={{
                      isActive: true,
                    }}
                    errors={errors}
                    {...rest}
                  />
                )}
              </Col>
              <Col xs={4}>
                <div style={{ minHeight: 89 }}>
                  {/* <CommonText className="form-label">Tháng</CommonText> */}
                  <div>
                    {/* <input
                      type="month"
                      style={{
                        border: "1px solid rgb(206, 212, 218)",
                        borderRadius: "5px",
                        color: "rgb(73, 80, 87)",
                        background: "#f4f5f6",
                        display: "block",
                        width: "100%",
                        padding: "0.375rem 0.75rem",
                        fontSize: "0.875rem",
                        fontWeight: "400",
                        lineHeight: "1.5",
                        backgroundClip: "padding-box",
                        boxShadow: "none",
                        height: "calc(1.5em + 0.75rem + 2px)",
                      }}
                      name="kpiOfMonth"
                      min="2022-01"
                      onChange={e => {
                        rest.setValue(e.target.name, e.target.value);
                      }}
                    /> */}
                    <IDatePicker
                      label="Tháng"
                      name="kpiOfMonth"
                      errors={errors}
                      formatDate={"MM/YYYY"}
                      picker="month"
                      // disabled={true}
                      {...rest}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={4}>
                <div
                  style={{
                    minHeight: 89,
                    gap: 6,
                    paddingTop: "18px",
                    marginTop: "1.5rem",
                  }}
                >
                  <CheckBox
                    label="Hoạt động"
                    name="isActive"
                    errors={errors}
                    {...rest}
                  />
                </div>
              </Col>
            </Row>
          </Card>
          <Card body>
            <Row>
              <Col xs={3}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label="Doanh số (VNĐ)"
                    name="revenueTotal"
                    errors={errors}
                    type="text"
                    onChange={_.debounce(e => {
                      rest.setValue(e.target.name, e.target.value);
                    }, 1000)}
                    {...rest}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label="Số cuộc gọi tiềm năng"
                    name="potentialCallNumber"
                    errors={errors}
                    type="text"
                    onChange={_.debounce(e => {
                      rest.setValue(e.target.name, e.target.value);
                    }, 1000)}
                    {...rest}
                  />
                </div>
              </Col>
              <Col xs={3}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label="Số cuộc gọi quan tâm"
                    name="interestedCallNumber"
                    errors={errors}
                    type="text"
                    onChange={_.debounce(e => {
                      rest.setValue(e.target.name, e.target.value);
                    }, 1000)}
                    {...rest}
                  />
                </div>
              </Col>
              <Col xs={3}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label="Số tin nhắn tiềm năng"
                    name="potentialMessageNumber"
                    errors={errors}
                    type="text"
                    onChange={_.debounce(e => {
                      rest.setValue(e.target.name, e.target.value);
                    }, 1000)}
                    {...rest}
                  />
                </div>
              </Col>
              <Col xs={3}>
                <div style={{ minHeight: 89 }}>
                  <InputField
                    label="Số tin nhắn quan tâm"
                    name="interestedMessageNumber"
                    errors={errors}
                    type="text"
                    onChange={_.debounce(e => {
                      rest.setValue(e.target.name, e.target.value);
                    }, 1000)}
                    {...rest}
                  />
                </div>
              </Col>
            </Row>
          </Card>
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

export default NewKPITargetsReport;
