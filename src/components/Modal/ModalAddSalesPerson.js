import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CommonLabel,
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";

const ModalAddSalesPerson = props => {
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");

  const schema = yup
    .object({
      salesPersonName: yup.string().required("Please enter sales person name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      salesPersonName: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    reset();
    toggle();
  };

  return (
    <ModalCommon isShowModal={isOpen} modalTitle={modalTitle} onClose={toggle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <InputField
            label="New Sales Person Name"
            register={register}
            required
            name="salesPersonName"
            errors={errors}
          />
          <InputField
            label="Employee"
            register={register}
            name="employee"
            errors={errors}
          />
          <div style={{ marginTop: -16 }}>
            <ComponentCheckbox className="form-label">
              <input type="checkbox" id="group-node-checkbox" />
              <LabelCheckbox className="form-label" for="group-node-checkbox">
                Group Node
              </LabelCheckbox>
            </ComponentCheckbox>
          </div>
          <div style={{ marginTop: -8 }}>
            <CommonLabel>
              Further nodes can be only created under &#39;Group&#39; type nodes
            </CommonLabel>
          </div>
        </div>
        <div className="modal-footer">
          <CommonButton type="submit" level={0}>
            Create New
          </CommonButton>
        </div>
      </form>
    </ModalCommon>
  );
};

ModalAddSalesPerson.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};

export default ModalAddSalesPerson;
