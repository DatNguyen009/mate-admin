import React from "react";

import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import { CommonField, CommonLabel } from "components/Common/inputCommon";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { CommonButton } from "components/Common/ButtonCommon";

export default function ModalAddEmployeeHealthInsurance(props) {
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
            name: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Please Enter Designation"),
          })}
          // onSubmit={values => handleEmployee(values)}
        >
          {({ errors, status, touched }) => (
            <Form>
              <div className="modal-body">
                <CommonLabel className="form-label star-red-required">
                  Health Insurance Name
                </CommonLabel>
                <CommonField
                  name="name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="name"
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

ModalAddEmployeeHealthInsurance.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
