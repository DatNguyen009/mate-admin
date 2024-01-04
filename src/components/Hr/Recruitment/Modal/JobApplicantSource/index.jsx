import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, Row, ModalFooter } from "reactstrap";
import * as yup from "yup";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "components/form-control/InputField";
import { useDispatch } from "react-redux";
import {
  createJobApplicantSource,
  fetchJobApplicantSource,
} from "redux-toolkit/slices/Employee/JobApplicantSource/JobApplicantSourceSlice";

const INITIAL_JOB_APPLICANT_SOURCE = {
  name: "",
};

export default function ModalAddJobApplicantSource(props) {
  const dispatch = useDispatch();
  const { isShowModal, modalTitle, onCloseModal } = props;
  const schema = yup
    .object({
      name: yup.string().required("Please Enter Your Name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    INITIAL_JOB_APPLICANT_SOURCE,
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {
    dispatch(createJobApplicantSource(values)).then(() => {
      dispatch(fetchJobApplicantSource());
    });
    reset();
    onCloseModal();
  };
  return (
    <ModalCommon
      modalTitle={`New ${modalTitle}`}
      isShowModal={isShowModal}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col>
              <InputField
                label="Source Name"
                name="name"
                register={register}
                required
                errors={errors}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} type="submit">
            Save
          </CommonButton>
        </ModalFooter>
      </form>
    </ModalCommon>
  );
}

ModalAddJobApplicantSource.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
