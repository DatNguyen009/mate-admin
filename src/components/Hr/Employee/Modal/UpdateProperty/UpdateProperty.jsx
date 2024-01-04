import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import InputField from "components/form-control/InputField";
import { useForm } from "react-hook-form";
import { CommonButton } from "components/Common/ButtonCommon";
import SelectField from "components/form-control/Select";

export default function UpdateProperty(props) {
  const { isShowModal, modalTitle, onCloseModal, onHandleChangeTable } = props;
  const selectProperty = [
    { index: 0, name: "", value: "default" },
    { index: 1, name: "Salutation", value: "salutation" },
    { index: 2, name: "Employment Type", value: "employmentType" },
    { index: 3, name: "UserID", value: "useId" },
    { index: 4, name: "Notice (days)", value: "notice" },
    { index: 5, name: "Department", value: "department" },
    { index: 6, name: "Designation", value: "designation" },
    { index: 7, name: "Reports to", value: "reportsTo" },
    { index: 8, name: "Grade", value: "grade" },
    { index: 9, name: "Branch", value: "branch" },
    { index: 10, name: "Holiday List", value: "holidayList" },
    { index: 11, name: "Company Email", value: "companyEmail" },
  ];
  const initialValues = {
    property: "",
    current: "",
    new: "",
  };

  const { register, handleSubmit, reset } = useForm(initialValues);
  const onSubmit = data => {
    reset({
      property: "",
      current: "",
      new: "",
    });
  };
  return (
    <ModalCommon
      modalTitle={modalTitle}
      isShowModal={isShowModal}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <SelectField
            label="Select Property"
            register={register}
            required
            name="property"
            options={selectProperty}
          />
          <InputField label="Current" register={register} name="current" />
          <InputField label="New" register={register} name="new" />
        </ModalBody>
        <ModalFooter>
          <CommonButton type="submit" level={0} onClick={onCloseModal}>
            Add to Details
          </CommonButton>
        </ModalFooter>
      </form>
    </ModalCommon>
  );
}

UpdateProperty.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
  onHandleChangeTable: PropTypes.func,
};
