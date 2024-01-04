import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Col, Container, ModalBody, ModalFooter, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import useGetFormSchema from "custom-hook/useGetFormSchema";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import httpService from "services/httpService";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import VVSTable from "components/form-control/VVSTable";
import ViewableCommon from "components/Common/ViewableCommon";
import RemoveMemberButton from "components/Common/RemoveMemberButton";
import { language_vn } from "helpers/language_vn";
import { GET_EMPLOYEE, GET_KPI_ASSIGNMENT } from "helpers/url_helper";
import { CommonInputt, CommonLabel } from "components/Common/inputCommon";
import IDatePicker from "components/Common/DatePicker";
import { CommonText } from "components/Common/TextCommon";
import { formatNumber, getUserRole } from "helpers/erp_helper";
import {
  setStatusCallReport,
  setStatusPhoneMessage,
} from "redux-toolkit/slices/CallReport";
import BagdeStatus from "components/Common/BagdeStatus";
import ModalCommon from "components/Common/ModalCommon";
import HeaderCreateItemGoBack from "components/Common/HeaderCreateItemGoBack";

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
const NewEmployeeGroup = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [toggleModalContract, setToggleModalContract] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [kpiAssignment, setKpiAssignment] = useState([]);
  const [kpiOfMonth, setKpiOfMonth] = useState({
    startOfMonth: moment().startOf("month"),
    endOfMonth: moment().endOf("month"),
  });
  const [roles, setRoles] = useState([]);
  const schema = yup
    .object({
      name: yup.string().required("This field is required!"),
      branch: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Branch",
                objectId: val.objectId,
              }
            : null
        )
        .required("This field is required!"),
      leader: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Employee",
                objectId: val.objectId,
              }
            : null
        )
        .required("This field is required!"),
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
        )
        .required("This field is required!"),
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

  const { renderForm } = useGetFormSchema("EmployeeGroup", yup, rest, errors);

  useEffect(() => {
    getEmployeeGroup();
    getEmployee();
    sessionStorage.setItem("groupId", id);
  }, []);

  const onSubmit = async values => {
    try {
      const { createdAt, updatedAt, ...employeeGroupValues } = values;
      const employeeGroup = { ...employeeGroupValues };

      if (id) {
        const employeeGroupUrl = `/parse/classes/EmployeeGroup/${id}`;
        await httpService.put(employeeGroupUrl, employeeGroup);
        toastrSuccessAlert("Cập nhật đội nhóm thành công!!");
        return;
      }

      const employeeGroupUrl = "/parse/classes/EmployeeGroup";
      const res = await httpService.post(employeeGroupUrl, employeeGroup);
      toastrSuccessAlert("Tạo đội nhóm thành công!!");
      history.replace(`/employee-group/${res.objectId}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getEmployeeGroup = async () => {
    try {
      if (!id) return;

      const { reset } = rest;
      const employeeGroupUrl = `/parse/classes/EmployeeGroup/${id}?include=["branch","department","leader"]`;
      const employeeGroup = await httpService.get(employeeGroupUrl);
      reset({
        ...employeeGroup,
        createdAt: moment(employeeGroup.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(employeeGroup.updatedAt).format("YYYY-MM-DD"),
        branch: employeeGroup?.branch
          ? {
              text: employeeGroup.branch.name,
              objectId: employeeGroup.branch.objectId,
              className: "Branch",
              __type: "Pointer",
            }
          : { text: "" },
        leader: employeeGroup?.leader
          ? {
              text: employeeGroup.leader.fullName,
              objectId: employeeGroup.leader.objectId,
              className: "Employee",
              __type: "Pointer",
            }
          : { text: "" },
        department: employeeGroup?.department
          ? {
              text: employeeGroup.department.name,
              objectId: employeeGroup.department.objectId,
              className: "Department",
              __type: "Pointer",
            }
          : { text: "" },
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const getEmployee = async () => {
    try {
      if (!id) return;

      const params = {
        params: {
          include: ["kpi", "contracts", "contracts.customer"],
          where: {
            team: {
              objectId: id,
              className: "EmployeeGroup",
              __type: "Pointer",
            },
            kpiOfMonth: {
              __type: "Date",
              iso: moment().startOf("month"),
            },
          },
        },
      };
      const resRoles = await getUserRole();
      const resKpi = await httpService.get(GET_KPI_ASSIGNMENT, params);
      setKpiAssignment(resKpi.results);
      setRoles(resRoles);
      const employee = await httpService.get(GET_EMPLOYEE, {
        params: {
          where: {
            groups: {
              $in: [
                {
                  __type: "Pointer",
                  className: "EmployeeGroup",
                  objectId: id,
                },
              ],
            },
          },
        },
      });
      setEmployee(employee.results);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const onKpiFilterDate = async value => {
    const startOfMonth = moment(value).startOf("month");
    const endOfMonth = moment(value).endOf("month");
    const params = {
      params: {
        include: ["kpi", "contracts", "contracts.customer"],
        where: {
          team: {
            objectId: id,
            className: "EmployeeGroup",
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
    setKpiAssignment(resKpi.results);
    setKpiOfMonth({
      startOfMonth,
      endOfMonth,
    });
  };

  const onDirectCallReport = item => {
    if (item.type === "call") {
      dispatch(
        setStatusCallReport({
          query: item.query,
          extension: {
            $in: employee.map(item => item?.extension),
          },
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
        objectIdMass: employee?.map(item => {
          return {
            objectId: item.objectId,
            className: "Employee",
            __type: "Pointer",
          };
        }),
      })
    );
    history.push("/message-history", { type: "group" });
  };

  const beforeSaveInlineEdit = async row => {
    try {
      const rowCopie = row?.groups ? [...row?.groups] : [];
      const findEmployee = rowCopie.find(item => item.objectId === id);
      if (findEmployee) {
        toastrErrorAlert(
          "Không thể thêm nhân viên vào nhóm. Nhân viên đã tồn tại trong group!!"
        );
        return;
      }
      const updateEmployeeUrl = `/parse/classes/Employee/${row.objectId}`;
      const updateEmployeeBody = {
        groups: [
          ...rowCopie,
          { __type: "Pointer", className: "EmployeeGroup", objectId: id },
        ],
      };
      const res = await httpService.put(updateEmployeeUrl, updateEmployeeBody);
      if (res?.updatedAt) {
        toastrSuccessAlert("Thêm nhân viên vào nhóm thành công!!!");
        return;
      }
      toastrErrorAlert(language_vn.error);
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };

  const includeProps = {
    leader: {
      conditionField: {
        isActive: true,
      },
    },
    department: {
      conditionField: {
        isActive: true,
      },
    },
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ViewableCommon
            if={() => roles.includes("Admin")}
            caseTrue={
              <HeaderCreateItem
                title={id ? "Chi tiết nhóm nhân viên" : "Thêm nhóm nhân viên"}
              >
                <CommonButton level={0} type="submit">
                  Lưu
                </CommonButton>
              </HeaderCreateItem>
            }
            caseFalse={
              <HeaderCreateItemGoBack
                title={id ? "Chi tiết nhóm nhân viên" : "Thêm nhóm nhân viên"}
              >
                <CommonButton level={0} type="submit">
                  Lưu
                </CommonButton>
              </HeaderCreateItemGoBack>
            }
          />
          {renderForm([], includeProps)}
          {roles.includes("Master") && (
            <>
              <ViewableCommon
                if={() => id}
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
                          {kpiAssignment[0]?.objectId &&
                            kpiAssignment[0]?.results && (
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
                                  )[0]?.progress || 0
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
                                JSON.parse(
                                  kpiAssignment[0]?.kpi?.requiredSalesFrom
                                )?.revenue
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
                          kpiAssignment[0]?.results.filter(
                            i => i?.attributeName === item.value
                          );
                        return (
                          <Col key={item.index}>
                            <div className="d-flex justify-content-between">
                              <CommonLabel>{item.label}</CommonLabel>
                              {kpiAssignment[0]?.objectId &&
                                kpiAssignment[0]?.results && (
                                  <CommonLabel
                                    style={{
                                      color: "#2490ef",
                                      cursor: "pointer",
                                    }}
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
                if={() => id}
                caseTrue={
                  <Card body>
                    <VVSTable
                      title="Danh sách KPI nhân viên tháng trước"
                      name="KPIAssignment2"
                      disableAdd
                      disableDelete
                      className="m-0 p-0"
                      whereQuery={{
                        employee: {
                          $in: employee.map(item => {
                            return {
                              __type: "Pointer",
                              className: "Employee",
                              objectId: item.objectId,
                            };
                          }),
                        },
                        kpiOfMonth: {
                          __type: "Date",
                          iso: moment().subtract(1, "month").startOf("month"),
                        },
                      }}
                    />
                  </Card>
                }
              />
            </>
          )}
          <ViewableCommon
            if={() => id}
            caseTrue={
              <Card body>
                <VVSTable
                  title="Danh sách thành viên trong nhóm"
                  name="EmployeeGroupMembers"
                  enableInlineEdit
                  disableDelete
                  className="m-0 p-0"
                  beforeSaveInlineEdit={beforeSaveInlineEdit}
                  helperButtons={[
                    {
                      component: RemoveMemberButton,
                      onlyInEditMode: true,
                      componentProps: {
                        removeField: "groups",
                        id: id,
                        isGroup: true,
                        name: "Employee",
                        model: "Employee",
                      },
                    },
                  ]}
                  whereQuery={{
                    groups: {
                      $in: [
                        {
                          __type: "Pointer",
                          className: "EmployeeGroup",
                          objectId: id,
                        },
                      ],
                    },
                  }}
                />
              </Card>
            }
          />
        </form>
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

export default NewEmployeeGroup;
