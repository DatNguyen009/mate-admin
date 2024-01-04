import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";

const ModalAddCampaign = props => {
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");

  const schema = yup
    .object({
      campaignName: yup.string().required("Please enter campaign name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      campaignName: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    reset();
    toggle();
  };
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle={modalTitle}
        onClose={toggle}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <InputField
              label="Campaign Name"
              register={register}
              required
              name="campaignName"
              errors={errors}
            />
          </div>
          <div
            className="modal-footer"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <CommonButton type="button">
              <i className="bx bx-pencil"></i>
              Edit in full page
            </CommonButton>
            <CommonButton type="submit" level={0}>
              Save
            </CommonButton>
          </div>
        </form>
      </ModalCommon>
    </React.Fragment>
  );
};

ModalAddCampaign.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};

export default ModalAddCampaign;
