import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Card, CardText, Col, Container, Label, Row } from "reactstrap";
import CardCollapse from "../../../components/Common/CardCollapse";
import ContainerVVSERPUser from "./Detail/container/ContainerVVSERPUser";
import ContainerJoiningDetails from "./Detail/container/ContainerJoiningDetails";
import ContainerDepartmentGrade from "./Detail/container/ContainerDepartmentGrade";
import ContainerAttendanceAndLeaveDetail from "./Detail/container/ContainerAttendanceAndLeaveDetail";
import ContainerSalaryDetail from "./Detail/container/ContainerSalaryDetail";
import ContainerHealthInsurance from "./Detail/container/ContainerHealthInsurance";
import ContainerContactDetail from "./Detail/container/ContainerContactDetail";
import ContainerPersonalBio from "./Detail/container/ContainerPersonalBio";
import ContainerPersonalDetail from "./Detail/container/ContainerPersonalDetail";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ContainerEmergencyContact from "./Detail/container/ContainerEmergencyContact";
import ContainerConnections from "./Detail/container/ContainerConnections";
import ContainerSidebar from "./Detail/container/ContainerSidebar";
import ContainerPersonalInfor from "./Detail/container/ContainerPersonalInfor";
import { CommonLabel } from "components/Common/inputCommon";
import {
  addEmployee,
  fetchEmployee,
  updateEmployee,
} from "redux-toolkit/slices/Employee/EmployeeSlice";
import { useDispatch } from "react-redux";
import TableCommon from "components/Common/TableCommon";
import { DATA_TABLE_COMMON } from "constants/dataHR";
import {
  checkExistItem,
  getLastItemInUrl,
  getSeries,
  initializationIndex,
  initialNewEmployee,
  newEmployee,
} from "helpers/erp_helper";
import { CommonButton } from "components/Common/ButtonCommon";
import useReuseData from "custom-hook/useReuseData";
import { fetchSysCfg } from "redux-toolkit/slices/SysCfgSlice/SysCfgSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-control/InputField";
import TextareaField from "components/form-control/Textarea";
import SelectField from "components/form-control/Select";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { fetchCompany } from "redux-toolkit/slices/Company/CompanySlide";
import { fetchJobApplicant } from "redux-toolkit/slices/Employee/JobApplicant/JobApplicantSlide";
import { fetchEmployeeGrade } from "redux-toolkit/slices/Employee/EmployeeGrade/EmployeeGradeSlide";
import { GET_CONTRACT, POST_CONTRACT } from "helpers/url_helper";
import useFormWithSaveChecked from "custom-hook/useFormWithSaveChecked";
import { isEmpty } from "lodash";

import httpService from "services/httpService";
import ContainerContract from "./Detail/container/ContainerContract";
import { fetchUsers } from "redux-toolkit/slices/Users/userSlice";
import { fetchContract } from "redux-toolkit/slices/Employee/ContractSlice";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_PUT } from "helpers/name_helper";

const LEAVE_ENCASHED_STATUS = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "Yes", value: "Yes" },
  { index: 2, name: "No", value: "No" },
];

export default function NewEmployee() {
  const [dataTableEQ, setDataTableEQ] = useState([]);
  const [dataTablePWE, setDataTablePWE] = useState([]);
  const [dataTableHIC, setDataTableHIC] = useState([]);
  const [tableContract, setTableContract] = useState([]);
  const [inforEmployeeById, setInforEmployeeById] = useState({});
  const [textEditor, setTextEditor] = useState("");
  const {
    branch,
    employmentType,
    department,
    designation,
    salutation,
    healthInsuranceProvider,
  } = useReuseData(fetchSysCfg, "SysCfgToolkit");
  const { companys } = useReuseData(fetchCompany, "Company");
  const { jobApplicants } = useReuseData(fetchJobApplicant, "JobApplicant");
  const { employeeGrades } = useReuseData(fetchEmployeeGrade, "EmployeeGrade");
  const { employees, fetched } = useReuseData(fetchEmployee, "Employee");
  const { users } = useReuseData(fetchUsers, "User");
  const history = useHistory();
  const dispatch = useDispatch();
  const employeeId = useParams();
  const location = useLocation();
  const title = getLastItemInUrl();
  const splitUrl = employeeId.id.split("-");
  const { objectId = "" } = location.state?.row || "";
  useEffect(() => {
    if (!employees.length || employeeId.id === "new-employee") {
      return;
    }

    if (objectId) {
      httpService
        .get(
          `/parse/classes/Employee?where={"series":"${employeeId.id}"}&include=company&include=contracts&include=contracts.company`
        )
        .then(json => {
          const res = json.results && json.results[0];

          if (!res) {
            /* Show 404 error message*/ return;
          }
          const {
            dob,
            doj,
            company,
            emergencyContact,
            departmentAndGrade,
            contactDetail,
            attendanceAndLeaveDetails,
            approvers,
            healthInsurance,
            joiningInfo,
            personalDetails,
            salary,
            personalBio,
            exit,
          } = res;

          reset({
            ...res,
            dateOfBirth: dob,
            dateOfJoin: doj,
            company: company?.name,
            emergencyContactName: emergencyContact?.name,
            emergencyContactPhone: emergencyContact?.phone,
            emergencyContactRelation: emergencyContact?.relation,
            jobApplicant: joiningInfo?.jobApplicant,
            confirmationDate: joiningInfo?.confirmationDate,
            offerDate: joiningInfo?.offerDate,
            date: joiningInfo?.date,
            contractEndDate: joiningInfo?.contractEndDate,
            notice: joiningInfo?.notice,
            dateOfRetirement: joiningInfo?.dateOfRetirement,

            department: departmentAndGrade?.department,
            grade: departmentAndGrade?.grade,
            designation: departmentAndGrade?.designation,
            branch: departmentAndGrade?.branch,
            reportsTo: departmentAndGrade?.reportsTo,

            expenseApprover: approvers?.expenseApprover,
            leaveApprover: approvers?.leaveApprover,
            shiftRequestApprover: approvers?.shiftRequestApprover,

            attendanceDeviceID: attendanceAndLeaveDetails?.attendanceDeviceID,
            holidayList: attendanceAndLeaveDetails?.holidayList,
            defaultShift: attendanceAndLeaveDetails?.defaultShift,

            model: salary?.mode,
            payrollCostCenter: salary?.payrollCostCenter,
            healthInsuranceProvider: healthInsurance?.healthInsuranceProvider,

            contactDetailPhone: contactDetail?.phone,
            contactDetailPrederedEmail: contactDetail?.preferedContactEmail,
            permanentAddress: contactDetail?.permanentAddress,
            currentAddress: contactDetail?.currentAddress,
            contactDetailPesonalEmail: contactDetail?.personalEmail,
            contactDetailPrederedContactEmail:
              contactDetail?.preferedContactEmail,
            contactDetailCompanyEmail: contactDetail?.companyEmail,
            contactDetailPermanentAddressIs: contactDetail?.permanentAddressIs,
            contactDetailCurrentAddressIs: contactDetail?.currentAddressIs,

            passportNumber: personalDetails?.passportNumber,
            doI: personalDetails?.doI,
            validUpto: personalDetails?.validUpto,
            poI: personalDetails?.poI,
            maritalStatus: personalDetails?.maritalStatus,
            bloodGroup: personalDetails?.bloodGroup,
            familyBackground: personalDetails?.familyBackground,
            healthDetails: personalDetails?.healthDetails,

            regignationLetterDate: exit?.regignationLetterDate,
            relievingDate: exit?.relievingDate,
            reasonForLeaving: exit?.reasonForLeaving,
            leaveEncashed: exit?.leaveEncashed,
            exitInterviewHeldOn: exit?.exitInterviewHeldOn,
            newWorkplace: exit?.newWorkplace,
            feedback: exit?.feedback,
          });
          setInforEmployeeById(res);
          setTextEditor(personalBio?.content);
        });
    }

    return () => {
      dispatch(fetchEmployee());
    };
  }, [objectId, JSON.stringify(employees)]);

  const schema = Yup.object({
    firstName: Yup.string().required("Please Enter Your First Name"),
    company: Yup.string()
      .required("Please Enter Your Company")
      .test("text", "Company is not exist", value => {
        return checkExistItem(companys, "name", value);
      }),
    salutation: Yup.string().test("text", "Salutation is not exist", value => {
      if (!value) return true;
      return checkExistItem(salutation, "salutation", value);
    }),
    employmentType: Yup.string().test(
      "text",
      "Employment Type is not exist",
      value => {
        if (!value) return true;
        return checkExistItem(employmentType, "name", value);
      }
    ),
    status: Yup.string().required("Please Enter Your Status"),
    gender: Yup.string().required("Please Enter Your Gender"),
    dateOfBirth: Yup.string().required("Please Enter Your Date Of Birth "),
    dateOfJoin: Yup.string().required("Please Enter Your Date Of Joining"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    saved,
  } = useFormWithSaveChecked({
    initialNewEmployee,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async values => {
    const localStoragedUser = JSON.parse(localStorage.getItem("User"));
    const series = getSeries(employees, "HR-EMP");
    const employee = newEmployee(
      values,
      splitUrl,
      textEditor,
      dataTableEQ,
      dataTablePWE,
      dataTableHIC,
      companys,
      series,
      objectId,
      employeeId
    );

    if (objectId) {
      const contractArray = [];
      for (const contract of tableContract) {
        const res = await dispatch(fetchContract());
        const companySelected = companys.find(
          company => company.name === contract?.company
        );
        const createdBy = users.find(
          user => user.username === localStoragedUser.username
        );
        const code = `CT-000-${initializationIndex(res.payload, "code")}`;
        const responsePost = await httpService.post(POST_CONTRACT, {
          requests: [
            {
              method: "POST",
              path: GET_CONTRACT,
              body: {
                ...(contract?.name && { name: contract?.name }),
                ...(createdBy?.objectId && {
                  user: {
                    objectId: createdBy?.objectId,
                    __type: "Pointer",
                    className: "_User",
                  },
                }),
                ...(objectId && {
                  employee: {
                    objectId: objectId,
                    __type: "Pointer",
                    className: "Employee",
                  },
                }),
                ...(companySelected?.objectId && {
                  company: {
                    objectId: companySelected?.objectId,
                    __type: "Pointer",
                    className: "Company",
                  },
                }),

                ...(contract?.startDate && {
                  startDate: {
                    iso: new Date(contract?.startDate),
                    __type: "Date",
                  },
                }),
                ...(contract?.endDate && {
                  endDate: {
                    iso: new Date(contract?.endDate),
                    __type: "Date",
                  },
                }),
                ...(contract?.attachment && {
                  attachment: {
                    name: contract?.attachment?.split("/")[6],
                    url: contract?.attachment,
                    __type: "File",
                  },
                }),
                ...(contract?.contractType && {
                  type: contract?.contractType,
                }),
                code,
              },
            },
          ],
        });
        if (responsePost[0].success?.objectId) {
          toastrCRUDSuccess("CONTRACT", TEXT_PUT);
          contractArray.push({
            __type: "Pointer",
            className: "Contract",
            objectId: responsePost[0].success?.objectId,
          });
        }
      }
      const contractReduce = employee.contracts.map(item => {
        const { objectId, className } = item;
        return {
          objectId,
          className,
          __type: "Pointer",
        };
      });
      dispatch(
        updateEmployee([
          {
            ...employee,
            ...(contractArray.length && {
              contracts: contractArray.length && [
                ...contractArray,
                ...contractReduce,
              ],
            }),
          },
          objectId,
        ])
      );
      setTableContract([]);
      contractArray.push([]);
      await dispatch(fetchEmployee());
      return;
    }

    const response = await dispatch(addEmployee(employee)).unwrap();
    history.push(`/employee/${series}`, {
      infor: response,
      from: "toCreate",
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderCreateItem title={title} saved={saved}>
              <CommonButton
                level={0}
                type="submit"
                disabled={isEmpty(errors) ? false : true}
              >
                Save
              </CommonButton>
            </HeaderCreateItem>
            <Row>
              <Col className="col-12">
                {!!objectId && (
                  <>
                    <ContainerSidebar inforEmployee={inforEmployeeById} />
                    <CardCollapse
                      title="Connections"
                      element={<ContainerConnections />}
                    />
                  </>
                )}

                <ContainerPersonalInfor
                  register={register}
                  errors={errors}
                  employmentType={employmentType}
                  salutation={salutation}
                  company={companys}
                  objectId={objectId}
                />
                <ContainerEmergencyContact register={register} />
                <CardCollapse
                  title="VVSERP User"
                  element={<ContainerVVSERPUser register={register} />}
                />
                <CardCollapse
                  title="Joining Details"
                  element={
                    <ContainerJoiningDetails
                      jobApplicant={jobApplicants}
                      register={register}
                    />
                  }
                />
                <CardCollapse
                  title="Department and Grade"
                  element={
                    <ContainerDepartmentGrade
                      register={register}
                      branch={branch}
                      department={department}
                      employees={employees}
                      designation={designation}
                      employeeGrade={employeeGrades}
                    />
                  }
                />
                <Card body>
                  <CardText>
                    <span
                      style={{
                        color: "black",
                        fontWeight: 600,
                        marginRight: "10px",
                        fontSize: 15,
                      }}
                    >
                      Approvers
                    </span>
                  </CardText>
                  <Row>
                    <Col>
                      <InputField
                        label="Expense Approver"
                        name="expenseApprover"
                        register={register}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Shift Request Approver"
                        name="shiftRequestApprover"
                        register={register}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField
                        label="Leave Approver"
                        name="leaveApprover"
                        register={register}
                      />
                    </Col>
                  </Row>
                </Card>
                <CardCollapse
                  title="Attendance and Leave Details"
                  element={
                    <ContainerAttendanceAndLeaveDetail
                      register={register}
                      employmentType={employmentType}
                    />
                  }
                />
                <CardCollapse
                  title="Salary Details"
                  element={<ContainerSalaryDetail register={register} />}
                />
                <CardCollapse
                  title="Health Insurance"
                  element={
                    <ContainerHealthInsurance
                      register={register}
                      healthInsuranceProvider={healthInsuranceProvider}
                    />
                  }
                />
                <CardCollapse
                  title="Contact Detail"
                  element={<ContainerContactDetail register={register} />}
                />
                <CardCollapse
                  title="Personal Bio"
                  element={
                    <ContainerPersonalBio
                      content={inforEmployeeById?.personalBio?.content}
                      onChangeTextEditor={setTextEditor}
                    />
                  }
                />
                <CardCollapse
                  title="Personal Details"
                  element={<ContainerPersonalDetail register={register} />}
                />
                {!!objectId && (
                  <ContainerContract
                    register={register}
                    errors={errors}
                    onChangeTable={setTableContract}
                    contracts={inforEmployeeById?.contracts}
                    employees={inforEmployeeById}
                  />
                )}
                <CardCollapse
                  title="Educational Qualification"
                  element={
                    <React.Fragment>
                      <CommonLabel>Education</CommonLabel>
                      <TableCommon
                        dataTableCommon={
                          inforEmployeeById?.educationalQualifications || []
                        }
                        columns={DATA_TABLE_COMMON[0].columns}
                        onHandleChangeTable={setDataTableEQ}
                      />
                    </React.Fragment>
                  }
                />
                <CardCollapse
                  title="Previous Work Experience"
                  element={
                    <React.Fragment>
                      <CommonLabel>External Work History</CommonLabel>
                      <TableCommon
                        dataTableCommon={
                          inforEmployeeById?.previousWorkExperience || []
                        }
                        columns={DATA_TABLE_COMMON[1].columns}
                        onHandleChangeTable={setDataTablePWE}
                      />
                    </React.Fragment>
                  }
                />
                <CardCollapse
                  title="History In Company"
                  element={
                    <React.Fragment>
                      <CommonLabel>Internal Work History</CommonLabel>
                      <TableCommon
                        dataTableCommon={
                          inforEmployeeById?.historyInCompany || []
                        }
                        columns={DATA_TABLE_COMMON[2].columns}
                        onHandleChangeTable={setDataTableHIC}
                      />
                    </React.Fragment>
                  }
                />
                <CardCollapse
                  title="Exit"
                  element={
                    <React.Fragment>
                      <Row>
                        <Col>
                          <InputField
                            type="date"
                            label="Resignation Letter Date"
                            name="regignationLetterDate"
                            register={register}
                          />

                          <InputField
                            type="date"
                            label="Relieving Date"
                            name="relievingDate"
                            register={register}
                          />
                          <TextareaField
                            label="Reason for Leaving"
                            name="reasonForLeaving"
                            register={register}
                            rows={7}
                          />
                          <SelectField
                            label="Leave Encashed?"
                            name="leaveEncashed"
                            register={register}
                            options={LEAVE_ENCASHED_STATUS}
                          />
                        </Col>
                        <Col>
                          <InputField
                            type="date"
                            label="Exit Interview Held On"
                            name="exitInterviewHeldOn"
                            register={register}
                          />
                          <InputField
                            label="New Workplace"
                            name="newWorkplace"
                            register={register}
                          />
                          <TextareaField
                            label="Feedback"
                            name="feedback"
                            register={register}
                            rows={7}
                          />
                        </Col>
                      </Row>
                    </React.Fragment>
                  }
                />
                {!!objectId && (
                  <Card body>
                    <CardText>
                      <span
                        style={{
                          color: "black",
                          fontWeight: 600,
                          marginRight: "10px",
                          fontSize: 15,
                        }}
                      >
                        Add a comment
                      </span>
                    </CardText>
                    <Row>
                      <Col>
                        <InputField name="comment" register={register} />
                        <Label className="form-label mt-0">
                          Ctrl+Enter to add comment
                        </Label>
                        <br />
                        <Button className="mt-2pcard" color="light" outline>
                          Comment
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                )}
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
}
