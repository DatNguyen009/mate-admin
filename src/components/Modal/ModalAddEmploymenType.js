import React from "react";

import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import { CommonField, CommonLabel } from "components/Common/inputCommon";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { CommonButton } from "components/Common/ButtonCommon";

export default function ModalAddEmploymentType(props) {
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
            type: "",
          }}
          validationSchema={Yup.object().shape({
            type: Yup.string().required("Please Enter Employment Type"),
          })}
          // onSubmit={values => handleEmployee(values)}
        >
          {({ errors, status, touched }) => (
            <Form>
              <div className="modal-body">
                <CommonLabel className="form-label star-red-required">
                  Employment Type
                </CommonLabel>
                <CommonField
                  name="type"
                  type="text"
                  className={
                    "form-control" +
                    (errors.type && touched.type ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="type"
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

ModalAddEmploymentType.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
