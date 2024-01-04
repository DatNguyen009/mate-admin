import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toastr from "toastr";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import { options } from "helpers/erp_helper";
import SelectField from "components/form-control/Select";
import { addAppointment } from "redux-toolkit/slices/CRM/AppointmentSlice";
import TextareaField from "components/form-control/Textarea";
import CardCollapse from "components/Common/CardCollapse";

const STATUS_OPTIONS = [
  { index: 1, name: "Open", value: "open" },
  { index: 2, name: "Unverified", value: "unverified" },
  { index: 3, name: "Closed", value: "closed" },
];

const ModalAddAppointment = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");

  const schema = yup
    .object({
      scheduledTime: yup.string().required("Please choose scheduled time"),
      status: yup.string().required("Please select status"),
      name: yup.string().required("Please enter name"),
      email: yup.string().required("Please enter email"),
    })
    .required();

  toastr.options = options;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      scheduledTime: "",
      status: "",
      name: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(addAppointment(data));
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
              label="Scheduled Time"
              register={register}
              required
              name="scheduledTime"
              errors={errors}
              type="date"
            />
            <SelectField
              label="Status"
              register={register}
              required
              name="status"
              errors={errors}
              options={STATUS_OPTIONS}
            />
            <InputField
              label="Name"
              register={register}
              required
              name="name"
              errors={errors}
            />
            <InputField
              label="Email"
              register={register}
              required
              name="email"
              errors={errors}
            />
            <CardCollapse
              title="More Information"
              isModal
              element={
                <>
                  <InputField
                    label="Phone No"
                    register={register}
                    name="phoneNo"
                    errors={errors}
                  />
                  <TextareaField
                    label="Details"
                    register={register}
                    name="details"
                    errors={errors}
                    rows={10}
                  />
                </>
              }
            />
          </div>
          <div
            className="modal-footer"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <CommonButton
              type="button"
              onClick={() => history.push("/appointment/new-appointment")}
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

ModalAddAppointment.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};

export default ModalAddAppointment;
