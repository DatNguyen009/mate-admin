import React from "react";

import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import { CommonField, CommonLabel } from "components/Common/inputCommon";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { CommonButton } from "components/Common/ButtonCommon";

export default function ModalAddDesignation(props) {
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle={modalTitle}
        onClose={toggle}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            designation: "",
          }}
          validationSchema={Yup.object().shape({
            designation: Yup.string().required("Please Enter Designation"),
          })}
          // onSubmit={values => handleEmployee(values)}
        >
          {({ errors, status, touched }) => (
            <Form>
              <div className="modal-body">
                <CommonLabel className="form-label star-red-required">
                  Designation
                </CommonLabel>
                <CommonField
                  name="designation"
                  type="text"
                  className={
                    "form-control" +
                    (errors.designation && touched.designation
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="modal-footer">
                <CommonButton level={0}>Save</CommonButton>
              </div>
            </Form>
          )}
        </Formik>
      </ModalCommon>
    </React.Fragment>
  );
}

ModalAddDesignation.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
