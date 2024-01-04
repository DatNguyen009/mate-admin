import React, { useState, useEffect } from "react";
import { Card, Col, Container, ModalBody, ModalFooter, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import httpService from "services/httpService";
import {
  addEmployee,
  updateEmployee,
} from "redux-toolkit/slices/Employee/EmployeeSlice";
import ViewableCommon from "components/Common/ViewableCommon";
import { CommonText } from "components/Common/TextCommon";
import { CommonInputt, CommonLabel } from "components/Common/inputCommon";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import InputField from "components/form-control/InputField";
import VVSSelectRelation from "components/Common/VVSSelectRelation";
import moment from "moment";
import useFormWithSaveChecked from "custom-hook/useFormWithSaveChecked";
import { generateCode, getUserRole } from "helpers/erp_helper";
import { language_vn } from "helpers/language_vn";
import VVSTable from "components/form-control/VVSTable";
import { formatNumber } from "../../../helpers/erp_helper";
import {
  setStatusCallReport,
  setStatusPhoneMessage,
} from "redux-toolkit/slices/CallReport";
import {
  GET_CALL_LOG,
  GET_MESSAGE,
  GET_KPI_ASSIGNMENT,
} from "helpers/url_helper";
import IDatePicker from "components/Common/DatePicker";
import Spacing from "components/Common/Spacing";
import ModalCommon from "components/Common/ModalCommon";
import { GET_USERS1 } from "helpers/url_helper";
import BagdeStatus from "components/Common/BagdeStatus";
import HeaderCreateItemGoBack from "components/Common/HeaderCreateItemGoBack";
import { Spin } from "antd";
import Table from "components/form-control/Table";

const kpis = [
  {
    index: 1,
    label: "Số cuộc gọi tiềm năng",
    value: "noPotentialCall",
    query: "tiềm năng",
    type: "call",
  },
  {
    index: 2,
    label: "Số cuộc gọi quan tâm",
    value: "noInterestedCall",
    query: "quan tâm",
    type: "call",
  },
  {
    index: 3,
    label: "Số tin nhắn tiềm năng",
    value: "noPotentialMessage",
    query: "tiềm năng",
    type: "message",
  },
  {
    index: 4,
    label: "Số tin nhắn quan tâm",
    value: "noInterestedMessage",
    query: "quan tâm",
    type: "message",
  },
];

const configCol = [
  {
    name: "STT",
  },
  {
    name: "Mã HĐ",
  },
  {
    name: "Trạng thái HĐ",
  },
  {
    name: "Giá trị HĐ",
  },
  {
    name: "Số kỳ",
  },
  {
    name: "Nơi đầu tư",
  },
  {
    name: "Ngày hết hạn HĐ",
  },
  {
    name: "Họ và tên",
  },
  {
    name: "SDT",
  },
];

const NewEmployee = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [userRole, setUserRole] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleModalContract, setToggleModalContract] = useState(false);
  const [pass, setPass] = useState({
    pass: "",
    retypePass: "",
  });
  const [groupId, setGroupId] = useState("");
  const [kpiAssignment, setKpiAssignment] = useState([]);
  const [callLogFilter, setCallLogFilter] = useState([]);
  const [messFilter, setMessFilter] = useState([]);
  const [kpiOfMonth, setKpiOfMonth] = useState({
    startOfMonth: moment().startOf("month"),
    endOfMonth: moment().endOf("month"),
  });
  const [invitedCount, setInvitedCount] = useState({
    totalInvited: 0,
    totalActived: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  useEffect(() => {
    const groupId = sessionStorage.getItem("groupId");
    setGroupId(groupId || "");
    getEmployee(groupId);
  }, [id]);

  useEffect(() => {
    handleGetCounterInvitedCode();
  }, [employeeDetail]);

  const schema = yup
    .object({
      fullName: yup.string().required("Vui lòng nhập Họ tên!"),
      phone: yup.string().required("Vui lòng nhập Số điện thoại!"),
      email: yup.string().email("Email không đúng định dạng!"),
      password: yup.string().required("Vui lòng nhập mật khẩu!"),
      username: yup.string().required("Vui lòng nhập tên tài khoản!"),
      birthday: yup
        .object()
        .shape({ __type: yup.string(), iso: yup.string() })
        .nullable()
        .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),
      branch: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val.text
            ? { __type: "Pointer", className: "Branch", objectId: val.objectId }
            : null
        ),
      department: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Department",
                objectId: val.objectId,
              }
            : null
        ),
      group: yup
        .object()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "EmployeeGroup",
                objectId: val.objectId,
              }
            : null
        )
        .nullable()
        .required("Vui lòng chọn nhóm!"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    saved,
    ...rest
  } = useFormWithSaveChecked({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { renderForm, getAddress } = useGetFormSchema(
    "Employee",
    yup,
    rest,
    errors
  );

  const handleGetCounterInvitedCode = async () => {
    setIsLoading(true);
    if (!employeeDetail || !employeeDetail.phone) return;

    try {
      const param = { customerPhone: employeeDetail?.phone };
      const res = await httpService.post(
        "parse/functions/invited-summary",
        param
      );
      if (res && res.result.data) {
        const { result } = res;
        const { setValue } = rest;
        setValue("tb_invited", result?.data?.invitedCustomer);
        setInvitedCount(result.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error :>> ", error);
    }
  };

  const getEmployee = async groupId => {
    if (!id) return;
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");
    const roles = await getUserRole();
    const res = await httpService.get(
      `/parse/classes/Employee/${id}?include=["branch","department","user","group","grade", "groups"]`
    );

    const params = {
      params: {
        include: ["kpi", "contracts", "contracts.customer"],
        where: {
          employee: {
            objectId: id,
            className: "Employee",
            __type: "Pointer",
          },
          kpiOfMonth: {
            __type: "Date",
            iso: moment().startOf("month"),
          },
        },
      },
    };

    const resKpi = await httpService.get(GET_KPI_ASSIGNMENT, params);

    const resCallLog = await httpService.get(GET_CALL_LOG, {
      params: {
        where: {
          status: {
            $in: ["quan tâm", "tiềm năng"],
          },
          ext: res?.extension,
          createdAt: {
            $gte: {
              __type: "Date",
              iso: startOfMonth,
            },
            $lte: {
              __type: "Date",
              iso: endOfMonth,
            },
          },
        },
      },
    });
    const resMess = await httpService.get(GET_MESSAGE, {
      params: {
        where: {
          status: {
            $in: ["quan tâm", "tiềm năng"],
          },
          employee: {
            __type: "Pointer",
            className: "Employee",
            objectId: res?.objectId,
          },
          createdAt: {
            $gte: {
              __type: "Date",
              iso: startOfMonth,
            },
            $lte: {
              __type: "Date",
              iso: endOfMonth,
            },
          },
        },
      },
    });
    setCallLogFilter(resCallLog.results);
    setMessFilter(resMess.results);
    setKpiAssignment(resKpi.results);

    const { reset } = rest;
    reset({
      ...res,
      birthday: res?.birthday?.iso
        ? moment(res?.birthday?.iso || "").format("YYYY-MM-DD")
        : "",
      branch: res?.branch
        ? {
            text: res.branch.name,
            objectId: res.branch.objectId,
            className: "Branch",
            __type: "Pointer",
          }
        : { text: "" },
      group: res?.group
        ? {
            text: res.group.name,
            objectId: res.group.objectId,
            className: "EmployeeGroup",
            __type: "Pointer",
          }
        : { text: "" },
      department: res?.department
        ? {
            text: res.department.name,
            objectId: res.department.objectId,
            className: "Department",
            __type: "Pointer",
          }
        : { text: "" },
      grade: res?.grade
        ? {
            text: res.grade.name,
            objectId: res.grade.objectId,
            className: "EmployeeGrade",
            __type: "Pointer",
          }
        : { text: "" },
      createdAt: moment(res.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(res.updatedAt).format("YYYY-MM-DD"),
      username: res?.user?.username,
      password: "qqqqqq",
    });
    getAddress(res);
    setUserDetail(res?.user);
    setEmployeeDetail(res);
    setUserRole(roles);
  };

  const onSubmit = async values => {
    const {
      createdAt,
      updatedAt,
      username,
      password,
      user,
      grade,
      roles,
      birthday,
      groups,
      ...employeeValues
    } = values;

    const employeeCopie = {
      ...employeeValues,
      ...(grade.text !== "" && {
        grade: {
          __type: "Pointer",
          className: "EmployeeGrade",
          objectId: grade.objectId,
        },
      }),
      ...(values.group
        ? {
            groups: [values.group],
          }
        : {
            groups: {
              __op: "Delete",
            },
          }),
      ...(birthday?.iso && { birthday: birthday }),
    };
    const employeeCode = await generateCode("Employee", "employeeId");

    const employee = { ...employeeCopie, employeeId: employeeCode };

    const userInfo = {
      status: employee.isActive ? "active" : "inactive",
      fullName: employee.fullName,
      ...(employee.email && { email: employee.email }),
      phone: employee.phone,
      username,
      password,
      userType: "employee",
    };

    if (id) {
      const { employeeId, ...updatedEmployee } = employee;
      dispatch(updateEmployee({ dataItem: updatedEmployee, dataId: id }));
      return;
    }

    if (username && password) {
      try {
        if (!roles?.length) {
          toastrErrorAlert("Vui lòng chọn nhóm quyền để có thể tạo tài khoản!");
          return;
        }
        userInfo.dob = userInfo.dob
          ? { __type: "Date", iso: userInfo.dob }
          : null;

        const userResponse = await httpService.post("/parse/users", userInfo);

        const userObjectId = userResponse.objectId;

        const requests = roles?.map(role => ({
          method: "PUT",
          path: `/parse/classes/_Role/${role.objectId}`,
          body: {
            users: {
              __op: "AddRelation",
              objects: [
                {
                  __type: "Pointer",
                  className: "_User",
                  objectId: userObjectId,
                },
              ],
            },
          },
        }));

        await httpService.post("/parse/batch", { requests });
        const employeeWithUser = {
          ...employee,
          user: {
            __type: "Pointer",
            className: "_User",
            objectId: userObjectId,
          },
        };
        const employeeObjectId = (await dispatch(addEmployee(employeeWithUser)))
          .payload.objectId;
        history.replace(`/employee/${employeeObjectId}`);
        return;
      } catch (errorRes) {
        if (errorRes?.response?.data?.error) {
          toastrErrorAlert(errorRes.response?.data.error);
        }
        return;
      }
    }
  };

  const onResetPassword = async () => {
    try {
      if (!pass.pass || !pass.retypePass) {
        toastrErrorAlert(
          !pass.pass ? "Vui lòng nhập mật khẩu" : "Vui lòng nhập lại mật khẩu"
        );
        return;
      }

      if (pass.pass !== pass.retypePass) {
        toastrErrorAlert("Mật khẩu mới và nhập lại mật khẩu phải giống nhau!");
        return;
      }
      const res = await httpService.put(
        GET_USERS1 + `/${userDetail?.objectId}`,
        {
          objectId: userDetail?.objectId,
          password: pass.pass,
        },
        {
          headers: {
            "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
          },
        }
      );
      setToggle(false);
      if (res?.updatedAt) {
        toastrSuccessAlert("Đặt lại mật khẩu thành công!!");
        return;
      }
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };

  const includeProps = {
    department: {
      conditionField: {
        isActive: true,
      },
    },
    grade: {
      conditionField: {
        isActive: true,
      },
    },
    group: {
      conditionField: {
        isActive: true,
      },
    },
  };

  const onDirectCallReport = item => {
    if (item.type === "call") {
      dispatch(
        setStatusCallReport({
          query: item.query,
          extension: employeeDetail?.extension,
          date: kpiOfMonth,
        })
      );
      history.push("/call-history");
      return;
    }
    dispatch(
      setStatusPhoneMessage({
        status: item.query,
        date: kpiOfMonth,
        objectIdMass: employeeDetail?.objectId,
      })
    );
    history.push("/message-history");
  };

  const onKpiFilterDate = async value => {
    const startOfMonth = moment(value).startOf("month");
    const endOfMonth = moment(value).endOf("month");
    const params = {
      params: {
        include: ["kpi", "contracts", "contracts.customer"],
        where: {
          employee: {
            objectId: id,
            className: "Employee",
            __type: "Pointer",
          },
          kpiOfMonth: {
            iso: moment(value).startOf("month"),
            __type: "Date",
          },
        },
      },
    };

    const resKpi = await httpService.get(GET_KPI_ASSIGNMENT, params);

    const resCallLog = await httpService.get(GET_CALL_LOG, {
      params: {
        where: {
          status: {
            $in: ["quan tâm", "tiềm năng"],
          },
          ext: employeeDetail?.extension,
          createdAt: {
            $gte: {
              __type: "Date",
              iso: startOfMonth,
            },
            $lte: {
              __type: "Date",
              iso: endOfMonth,
            },
          },
        },
      },
    });
    const resMess = await httpService.get(GET_MESSAGE, {
      params: {
        where: {
          status: {
            $in: ["quan tâm", "tiềm năng"],
          },
          employee: {
            __type: "Pointer",
            className: "Employee",
            objectId: employeeDetail?.objectId,
          },
          createdAt: {
            $gte: {
              __type: "Date",
              iso: startOfMonth,
            },
            $lte: {
              __type: "Date",
              iso: endOfMonth,
            },
          },
        },
      },
    });

    setCallLogFilter(resCallLog.results);
    setMessFilter(resMess.results);
    setKpiAssignment(resKpi.results);
    setKpiOfMonth({
      startOfMonth,
      endOfMonth,
    });
  };
  const HEADERS = [
    {
      text: "Code",
      field: "code",
      formatter: cell => (
        <div className="fw-lighter d-flex align-items-center h-100">{cell}</div>
      ),
    },
    {
      text: "Họ và tên",
      field: "fullName",
      formatter: cell => (
        <div className="fw-lighter d-flex align-items-center h-100">{cell}</div>
      ),
    },
    {
      text: "Số điện thoại",
      field: "phone",
      formatter: cell => (
        <div className="fw-lighter d-flex align-items-center h-100">{cell}</div>
      ),
    },
    {
      text: "Trạng thái",
      field: "user.status",
      formatter: cell => (
        <div className="fw-lighter d-flex align-items-center h-100">{cell}</div>
      ),
    },
  ];
  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ViewableCommon
            if={() => userRole.includes("Admin")}
            caseTrue={
              <HeaderCreateItem title="Thêm / Chi Tiết Nhân Viên" saved={saved}>
                <div className="flex-grow-1"></div>

                {userRole.includes("Admin") && (
                  <CommonButton
                    level={1}
                    type="button"
                    onClick={() => {
                      setToggle(true);
                    }}
                  >
                    Đặt lại mật khẩu
                  </CommonButton>
                )}
                <Spacing size={12} />
                <CommonButton level={0}>Lưu</CommonButton>
              </HeaderCreateItem>
            }
            caseFalse={
              <HeaderCreateItemGoBack
                title={id ? "Chi tiết nhân viên" : "Thêm nhân viên"}
              >
                <div className="flex-grow-1"></div>

                {userRole.includes("Admin") && (
                  <CommonButton
                    level={1}
                    type="button"
                    onClick={() => {
                      setToggle(true);
                    }}
                  >
                    Đặt lại mật khẩu
                  </CommonButton>
                )}
                <Spacing size={12} />
                <CommonButton level={0}>Lưu</CommonButton>
              </HeaderCreateItemGoBack>
            }
          />
          {employeeDetail && (
            <div className="mb-3 d-flex gap-2 justify-content-end">
              <div>
                <span>Số lần dùng mã mời : </span>
                <a
                  href="#table_code"
                  className="py-1 px-2 border border-2 border-secondary"
                >
                  {isLoading ? (
                    <Spin size="small" />
                  ) : (
                    <a href="#table_code">{invitedCount.totalInvited}</a>
                  )}
                </a>
              </div>

              <div>
                <span>Số mã mời đã hoạt động : </span>
                <a
                  href="#table_code"
                  className="py-1 px-2 border border-2 border-secondary"
                >
                  {isLoading ? (
                    <Spin size="small" />
                  ) : (
                    <a href="#table_code">{invitedCount.totalActived}</a>
                  )}
                </a>
              </div>
            </div>
          )}

          {renderForm(excludeFields, includeProps)}
          <ViewableCommon
            if={() => !id}
            caseTrue={
              <Card body>
                <CommonText className="m-0" level={1}>
                  Thông tin tài khoản
                </CommonText>
                <Row>
                  <Col>
                    <InputField
                      label="Tên đăng nhập"
                      name="username"
                      errors={errors}
                      {...rest}
                    />
                  </Col>
                  <Col>
                    <InputField
                      label="Mật khẩu"
                      name="password"
                      errors={errors}
                      {...rest}
                    />
                  </Col>
                  <Col>
                    <VVSSelectRelation
                      label="Nhóm quyền"
                      name="roles"
                      model="_Role"
                      errors={errors}
                      {...rest}
                    />
                  </Col>
                </Row>
              </Card>
            }
          />
          <ViewableCommon
            if={() => id && userDetail}
            caseTrue={
              <Card body>
                <CommonText level={1} className="m-0">
                  <span>Thông tin tài khoản </span>
                  <Link
                    className="link-detail"
                    to={`/account/${userDetail?.objectId}`}
                  >
                    (chi tiết)
                  </Link>
                </CommonText>
                <Row>
                  <Col>
                    <CommonLabel>Username</CommonLabel>
                    <CommonInputt
                      className="form-control"
                      value={userDetail?.username || ""}
                      readOnly
                      onChange={() => {}}
                    />
                  </Col>
                  <Col>
                    <CommonLabel>Họ tên</CommonLabel>
                    <CommonInputt
                      className="form-control"
                      value={userDetail?.fullName || ""}
                      readOnly
                      onChange={() => {}}
                    />
                  </Col>
                  <Col>
                    <CommonLabel>Email</CommonLabel>
                    <CommonInputt
                      className="form-control"
                      value={userDetail?.email || ""}
                      readOnly
                      onChange={() => {}}
                    />
                  </Col>
                </Row>
              </Card>
            }
          />
          <ViewableCommon
            if={() => id && userDetail}
            caseTrue={
              <Card body>
                <div className="d-flex align-items-center justify-content-between">
                  <CommonText level={1} className="m-0">
                    <span>{language_vn.kpi}</span>
                  </CommonText>
                  <div className="d-flex gap-2 align-items-center">
                    <CommonText mt={0} color={"#495057"}>
                      Tháng
                    </CommonText>
                    <IDatePicker
                      picker="month"
                      value={`${moment().format("YYYY/MM")}`}
                      formatDate="MM/YYYY"
                      onChange={e => {
                        onKpiFilterDate(e);
                      }}
                    />
                  </div>
                </div>
                <Row>
                  <Col sm={4}>
                    <div className="d-flex justify-content-between">
                      <CommonLabel>Doanh số (VND):</CommonLabel>
                      {kpiAssignment[0]?.objectId && kpiAssignment[0]?.results && (
                        <CommonLabel
                          style={{ color: "#2490ef", cursor: "pointer" }}
                          onClick={() => {
                            setToggleModalContract(prev => !prev);
                          }}
                        >
                          Đạt{" "}
                          {Math.ceil(
                            kpiAssignment[0]?.results.filter(
                              i => i?.attributeName === "revenue"
                            )[0]?.progress
                          )}
                          %
                        </CommonLabel>
                      )}
                    </div>

                    <CommonInputt
                      className="form-control"
                      value={
                        (kpiAssignment[0]?.objectId &&
                          formatNumber(
                            JSON.parse(kpiAssignment[0]?.kpi?.requiredSalesFrom)
                              ?.revenue
                          )) ||
                        ""
                      }
                      readOnly
                      onChange={() => {}}
                      style={{ opacity: 0.6, cursor: "not-allowed" }}
                    />
                  </Col>
                </Row>
                <Row>
                  {kpis.map(item => {
                    const selectedKpiAssignment =
                      kpiAssignment[0]?.results?.filter(
                        i => i?.attributeName === item.value
                      );
                    return (
                      <Col key={item.index}>
                        <div className="d-flex justify-content-between">
                          <CommonLabel>{item.label}</CommonLabel>
                          {kpiAssignment[0]?.objectId &&
                            kpiAssignment[0]?.results && (
                              <CommonLabel
                                style={{ color: "#2490ef", cursor: "pointer" }}
                                onClick={() => onDirectCallReport(item)}
                              >
                                Đạt{" "}
                                {selectedKpiAssignment.length &&
                                  selectedKpiAssignment[0]?.progress}
                                %
                              </CommonLabel>
                            )}
                        </div>
                        <CommonInputt
                          className="form-control"
                          value={
                            (kpiAssignment[0]?.objectId &&
                              `${
                                JSON.parse(
                                  kpiAssignment[0]?.kpi?.requiredSalesFrom
                                )[item.value]
                              }`) ||
                            ""
                          }
                          readOnly
                          onChange={() => {}}
                          style={{ opacity: 0.6, cursor: "not-allowed" }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Card>
            }
          />
          <ViewableCommon
            if={() => id && userDetail}
            caseTrue={
              <Card body>
                <Row
                  style={{
                    position: "relative",
                    marginBottom: "-35px",
                    zIndex: 99,
                    width: "max-content",
                  }}
                >
                  <CommonText level={1} className="m-0">
                    Data tổng hợp
                  </CommonText>
                </Row>
                <VVSTable
                  name="LeadReport"
                  disableAdd
                  disableSearch
                  showExportExcel
                  pointer="Employee"
                  whereQuery={{
                    salesStaff: {
                      objectId: id,
                      className: "Employee",
                      __type: "Pointer",
                    },
                  }}
                />
                <div id="table_code" className="mt-3">
                  <Row className="mb-4">
                    <CommonText level={1} className="m-0">
                      Danh sách KH đã mời
                    </CommonText>
                  </Row>
                  <Row>
                    <Table
                      disableAdd
                      disableDelete
                      disableSelect
                      name="tb_invited"
                      headers={HEADERS}
                      onItemClick={value =>
                        history.push(`/customer/${value.objectId}`)
                      }
                      formProps={{
                        errors,
                        ...rest,
                      }}
                    />
                  </Row>
                </div>
              </Card>
            }
          />
        </form>
        <ModalCommon
          modalTitle="Đặt lại mật khẩu"
          isShowModal={toggle}
          onClose={() => {
            setToggle(prev => !prev);
          }}
        >
          <ModalBody>
            <div style={{ margin: "0 12px" }}>
              <CommonLabel>Nhập mật khẩu mới</CommonLabel>
              <CommonInputt
                className="form-control"
                type="password"
                onChange={e => {
                  setPass({
                    ...pass,
                    pass: e.target.value,
                  });
                }}
              />
              <CommonLabel>Nhập lại mật khẩu mới</CommonLabel>
              <CommonInputt
                className="form-control"
                type="password"
                onChange={e => {
                  setPass({
                    ...pass,
                    retypePass: e.target.value,
                  });
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <CommonButton
              level={0}
              onClick={() => {
                setToggle(prev => !prev);
              }}
            >
              Huỷ
            </CommonButton>
            <CommonButton level={3} onClick={onResetPassword}>
              Đồng ý
            </CommonButton>
          </ModalFooter>
        </ModalCommon>

        {/* modal contract  */}
        <ModalCommon
          modalTitle="Hợp đồng"
          isShowModal={toggleModalContract}
          onClose={() => {
            setToggleModalContract(prev => !prev);
          }}
          style={{ maxWidth: "70%", width: "100%" }}
        >
          <ModalBody>
            <div style={{ margin: "0 12px" }}>
              <table className="table align-middle table-nowrap table-hover">
                <thead className="table-dark">
                  <tr>
                    {configCol.map((item, index) => (
                      <th key={index}>{item.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kpiAssignment[0]?.contracts?.map((item, index) => (
                    <tr key={index}>
                      <td> {index + 1}</td>
                      <td>{item?.code}</td>

                      <td>
                        <BagdeStatus
                          titleBadge={
                            item?.status === "effective"
                              ? "Đang hiệu lực"
                              : item?.status === "completed"
                              ? "Đã thanh lý"
                              : item?.status === "early-settled"
                              ? "Đã tất toán sớm"
                              : item?.status === "pending"
                              ? "Đang xử lý"
                              : item?.status === "canceled"
                              ? "Đã huỷ"
                              : ""
                          }
                          typeBadge={item?.status}
                        />
                      </td>

                      <td>{item?.noPeriods} tháng</td>
                      <td>{item?.investment}</td>
                      <td>{moment(item?.endDate?.iso).format("DD/MM/YYYY")}</td>
                      <td>{item?.customer?.fullName}</td>
                      <td>{item?.customer?.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <CommonButton
              level={0}
              onClick={() => {
                setToggleModalContract(prev => !prev);
              }}
            >
              Đóng
            </CommonButton>
          </ModalFooter>
        </ModalCommon>
      </Container>
    </div>
  );
};

export default NewEmployee;
