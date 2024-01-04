import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, Row, Label, ModalFooter } from "reactstrap";
import {
  CommonButton,
  CommonField,
  CommonLabel,
} from "components/Common/inputCommon";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import Spacing from "components/Common/Spacing";
import PropTypes from "prop-types";

export default function ModalNewDepartment(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;
  return (
    <ModalCommon
      modalTitle={modalTitle}
      isShowModal={isShowModal}
      onClose={onCloseModal}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          department: "",
          company: "",
        }}
        validationSchema={Yup.object().shape({
          department: Yup.string().required("Please Enter Your Department"),
          company: Yup.string().required("Please Enter Your Company"),
        })}
      >
        {({ errors, status, touched }) => (
          <Form>
            <ModalBody>
              <Row>
                <Col className="col-12">
                  <div className="d-flex gap-1">
                    <input
                      type="checkbox"
                      className="form-check-input input-mini"
                      id="group-node"
                      value="checked"
                    />
                    <Label
                      className="form-check-label mt-0"
                      htmlFor="group-node"
                    >
                      Group Node
                    </Label>
                  </div>
                  <Label className="form-check-label mt-2 text-secondary">
                    Further nodes can be only created under Group type nodes
                  </Label>
                  <br></br>
                  <CommonLabel className="form-label star-red-required">
                    Department
                  </CommonLabel>
                  <CommonField
                    name="department"
                    type="text"
                    className={
                      "form-control" +
                      (errors.department && touched.department
                        ? " is-invalid"
                        : "")
                    }
                  ></CommonField>
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="invalid-feedback"
                  />

                  <CommonLabel className="form-label star-red-required">
                    Default Salary Structure
                  </CommonLabel>
                  <CommonField
                    name="company"
                    type="text"
                    className={
                      "form-control" +
                      (errors.company && touched.company ? " is-invalid" : "")
                    }
                  ></CommonField>
                  <ErrorMessage
                    name="defaultSalaryStruct"
                    component="div"
                    className="invalid-feedback"
                  />
                  <Spacing size={16}></Spacing>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <CommonButton primary className=" text-capitalize" type="button">
                Create New
              </CommonButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </ModalCommon>
  );
}

ModalNewDepartment.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
