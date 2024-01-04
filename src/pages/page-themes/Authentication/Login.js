import React, { Component } from "react";
import PropTypes from "prop-types";

import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";
import toastr from "toastr";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import { apiError, loginUser, socialLogin } from "../../../store/actions";
import { login } from "apis/user";
// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/img_app.png";
import httpService from "services/httpService";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { GET_USER_INFO } from "helpers/url_helper";
import { roles } from "helpers/lifestyle_helper";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidenPass: true,
    };
  }

  componentDidMount() {
    this.props.apiError("");
  }

  handleSubmit = async values => {
    try {
      const response = await login({
        username: values.email,
        password: values.password,
      });

      if (!response.sessionToken) {
        throw new Error();
      }
      const user = {
        email: values.email,
        username: response.username,
        objectId: response.objectId,
      };

      localStorage.setItem("authUser", JSON.stringify(response.sessionToken));
      localStorage.setItem("User", JSON.stringify(user));

      const { results: userDetail } = await httpService.get(GET_USER_INFO, {
        params: {
          where: {
            user: {
              objectId: response.objectId,
              className: "_User",
              __type: "Pointer",
            },
          },
        },
      });

      if (!userDetail?.length || userDetail[0]?.role !== roles.SUPERVISOR) {
        toastrErrorAlert(
          "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại!"
        );
        localStorage.removeItem("authUser");
        localStorage.removeItem("User");
        return;
      }

      toastrSuccessAlert("Đăng nhập thành công!!!");
      this.props.history.push("/account");
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data.code === 141) {
        toastrErrorAlert("Tài khoản chưa được kích hoạt!");
        return;
      }
      toastrErrorAlert(
        "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại!"
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p>Sign in to continue to Life Style</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img src={logo} alt="" className="rounded-circle" />
                          </span>
                        </div>
                      </Link>
                      <Link to="/" className="auth-logo-dark">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              width={50}
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      {this.props.error && this.props.error ? (
                        <Alert color="danger">{this.props.error}</Alert>
                      ) : null}
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          email: "",
                          password: "",
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().required(
                            "Please Enter Your Email"
                          ),
                          password: Yup.string().required(
                            "Please Enter Valid Password"
                          ),
                        })}
                        onSubmit={this.handleSubmit}
                      >
                        {({ errors, status, touched }) => (
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="email" className="form-label">
                                Email
                              </Label>
                              <Field
                                name="email"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.email && touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label for="password" className="form-label">
                                Password
                              </Label>
                              <div className="input-group auth-pass-inputgroup">
                                <Field
                                  name="password"
                                  type={
                                    this.state.isHidenPass ? "password" : "text"
                                  }
                                  autoComplete="true"
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <button
                                  className="btn btn-light "
                                  type="button"
                                  id="password-addon"
                                  onClick={() => {
                                    this.setState({
                                      isHidenPass: !this.state.isHidenPass,
                                    });
                                  }}
                                >
                                  <i
                                    className={
                                      this.state.isHidenPass
                                        ? "mdi mdi-eye-off-outline"
                                        : "mdi mdi-eye-outline"
                                    }
                                  ></i>
                                </button>
                              </div>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};

const mapStateToProps = state => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
);
