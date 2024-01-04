import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";

const ModalAddEmailCampaign = props => {
  const history = useHistory();
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");
  const optionType = [
    { index: 1, name: "Lead", value: "lead" },
    { index: 2, name: "Contact", value: "contact" },
    { index: 3, name: "Email Group", value: "emailGroup" },
  ];

  const schema = yup
    .object({
      campaign: yup.string().required("Please enter campaign"),
      emailCampaignFor: yup.string().required("Please select email campaign"),
      recipient: yup.string().required("Please enter recipient"),
      startDate: yup.string().required("Please enter start date"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      campaign: "",
      emailCampaignFor: "",
      recipient: "",
      startDate: "",
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
              label="Campaign"
              register={register}
              required
              name="campaign"
              errors={errors}
            />
            <SelectField
              label="Email Campaign For"
              register={register}
              required
              name="emailCampaignFor"
              errors={errors}
              options={optionType}
            />
            <InputField
              label="Recipient"
              register={register}
              required
              name="recipient"
              errors={errors}
            />
            <InputField
              label="Start Date"
              register={register}
              required
              name="startDate"
              errors={errors}
            />
          </div>
          <div
            className="modal-footer"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <CommonButton
              onClick={() => history.push("/email-campaign/new-email-campaign")}
            >
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

ModalAddEmailCampaign.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};

export default ModalAddEmailCampaign;
