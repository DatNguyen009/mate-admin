import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, Row } from "reactstrap";
import * as yup from "yup";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "components/form-control/InputField";
import { useDispatch } from "react-redux";
import { createShiftType } from "redux-toolkit/slices/Employee/ShiftManages/ShiftType";
import { reset } from "redux-form";
import { useHistory } from "react-router-dom";

const INITIAL_SHIFT_TYPE = {
  name: "",
  startTime: "",
  endTime: "",
};
export default function ModalAddShiftType(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      name: yup.string().required("Please Enter Your Shift Type Name"),
      startTime: yup.string().required("Please Enter Your Start Time"),
      endTime: yup.string().required("Please Enter Your End Time"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    INITIAL_SHIFT_TYPE,
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(createShiftType(data));
    reset();
    onCloseModal();
  };

  const editFullPage = () => {
    history.push("/shift-type/new-shift-type");
  };

  return (
    <ModalCommon
      modalTitle={modalTitle}
      isShowModal={isShowModal}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col>
              <InputField
                label="Shift Type Name"
                name="name"
                register={register}
                required
                errors={errors}
              />
              <InputField
                type="time"
                label="Start Time"
                name="startTime"
                register={register}
                required
                errors={errors}
              />
              <InputField
                type="time"
                label="End Time"
                name="endTime"
                register={register}
                required
                errors={errors}
              />
            </Col>
          </Row>
        </ModalBody>
        <div
          className="modal-footer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <CommonButton type="button" onClick={editFullPage}>
            <i className="bx bx-pencil"></i>
            Edit in full page
          </CommonButton>
          <CommonButton level={0} type="submit">
            Save
          </CommonButton>
        </div>
      </form>
    </ModalCommon>
  );
}

ModalAddShiftType.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
