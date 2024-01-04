import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, Row, ModalFooter } from "reactstrap";
import * as yup from "yup";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "components/form-control/InputField";

export default function ModalAddShiftType(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;
  const initialShiftType = {
    shiftTypeName: "",
    startTime: "",
    endTime: "",
  };
  const schema = yup
    .object({
      shiftTypeName: yup.string().required("Please Enter Your Shift Type Name"),
      startTime: yup.string().required("Please Enter Your Start Time"),
      endTime: yup.string().required("Please Enter Your End Time"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    initialShiftType,
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {};
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
                name="shiftTypeName"
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
        <ModalFooter>
          <CommonButton level={0} type="submit">
            Save
          </CommonButton>
        </ModalFooter>
      </form>
    </ModalCommon>
  );
}

ModalAddShiftType.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
