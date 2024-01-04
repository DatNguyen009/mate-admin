import React from "react";
import { Button, Card, CardText, Col, Container, Label, Row } from "reactstrap";
import { useLocation } from "react-router-dom";
import ContainerSidebar from "./container/ContainerSidebar";
import ContainerOverview from "./container/ContainerOverview";
import ContainerConnections from "./container/ContainerConnections";
import ContainerPersonalInfor from "./container/ContainerPersonalInfor";
import ContainerERPNextUser from "./container/ContainerERPNextUser";
import ContainerJoiningDetails from "./container/ContainerJoiningDetails";
import ContainerDepartmentGrade from "./container/ContainerDepartmentGrade";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import CardCollapse from "../../../../components/Common/CardCollapse";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ContainerAttendanceAndLeaveDetail from "./container/ContainerAttendanceAndLeaveDetail";
import ContainerSalaryDetail from "./container/ContainerSalaryDetail";
import ContainerHealthInsurance from "./container/ContainerHealthInsurance";
import ContainerContactDetail from "./container/ContainerContactDetail";
import ContainerPersonalBio from "./container/ContainerPersonalBio";
import ContainerPersonalDetail from "./container/ContainerPersonalDetail";

export default function EmployeeDetail() {
  const location = useLocation();
  const inforEmployee = location.state.inforE;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="VVS" breadcrumbItem="Employee Detail" />
          <Row>
            <Col lg={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  series: "HR-EMP-",
                  company: "Vastbit",
                  firstName: inforEmployee.firstName || "",
                  middleName: "",
                  lastName: "",
                  status: "Active",
                  gender: inforEmployee.gender || "",
                  name: "",
                  dateOfBirth: inforEmployee.dateOfBirth || "",
                  dateOfJoin: inforEmployee.dateOfJoin || "",
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required(
                    "Please Enter Your First Name"
                  ),
                  gender: Yup.string().required("Please Enter Your Gender"),
                  dateOfBirth: Yup.string().required(
                    "Please Enter Your Date Of Birth "
                  ),
                  dateOfJoin: Yup.string().required(
                    "Please Enter Your Date Of Joining"
                  ),
                })}
                onSubmit={values => console.log(values)}
              >
                {({ errors, status, touched }) => (
                  <>
                    <Form>
                      <ContainerSidebar inforEmployee={inforEmployee} />
                      <ContainerOverview />
                      <CardCollapse
                        title="Connections"
                        element={<ContainerConnections />}
                      />
                      <ContainerPersonalInfor inforEmployee={inforEmployee} />
                      <CardCollapse
                        title="ERPNext User"
                        element={<ContainerERPNextUser />}
                      />
                      <CardCollapse
                        title="Joining Details"
                        element={<ContainerJoiningDetails />}
                      />
                      <CardCollapse
                        title="Department and Grade"
                        element={<ContainerDepartmentGrade />}
                      />
                      <CardCollapse
                        title="Attendance and Leave Details"
                        element={<ContainerAttendanceAndLeaveDetail />}
                      />
                      <CardCollapse
                        title="Salary Details"
                        element={<ContainerSalaryDetail />}
                      />
                      <CardCollapse
                        title="Health Insurance"
                        element={<ContainerHealthInsurance />}
                      />
                      <CardCollapse
                        title="Contact Detail"
                        element={<ContainerContactDetail />}
                      />
                      <CardCollapse
                        title="Personal Bio"
                        element={<ContainerPersonalBio />}
                      />
                      <CardCollapse
                        title="Personal Details"
                        element={<ContainerPersonalDetail />}
                      />
                      <CardCollapse title="Educational Qualification" />
                      <CardCollapse title="Previous Work Experience" />
                      <CardCollapse title="History In Company" />
                      <CardCollapse title="Exit" />
                      <Card body>
                        <CardText>
                          <span
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginRight: "10px",
                            }}
                          >
                            Add a comment
                          </span>
                        </CardText>
                        <Row>
                          <Col>
                            <Field
                              name="fullName"
                              as="textarea"
                              className={"form-control"}
                            />
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
                      <Row>
                        <Col>
                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn btn-success save-user"
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
