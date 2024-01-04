import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";

import ModalCommon from "components/Common/ModalCommon";
import { CommonButton } from "components/Common/ButtonCommon";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";
import {
  addCustomer,
  fetchCustomers,
} from "redux-toolkit/slices/CRM/CustomerSlice";
import CardCollapse from "components/Common/CardCollapse";
import useReuseData from "custom-hook/useReuseData";
import { fetchCustomerGroups } from "redux-toolkit/slices/CRM/CustomerGroupSlice";
import { fetchTerritories } from "redux-toolkit/slices/CRM/TerritorySlice";

const ModalAddCustomer = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen, toggle, title } = props;
  const { customerGroups } = useReuseData(fetchCustomerGroups, "CustomerGroup");
  const { territories } = useReuseData(fetchTerritories, "Territory");
  const modalTitle = "New " + title.replaceAll("-", " ");
  const optionTypes = [
    { index: 1, name: "Company", value: "company" },
    { index: 2, name: "Individual", value: "individual" },
  ];

  const schema = yup
    .object({
      name: yup.string().required("Please enter full name"),
      type: yup.string().required("Please choose type"),
      customerGroup: yup.string().required("Please enter customer group"),
      territory: yup.string().required("Please enter territory"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    const customerGroupSelected = customerGroups.find(
      item => item.customerGroupName === data.customerGroup
    );
    const territorySelected = territories.find(
      item => item.territoryName === data.territory
    );
    const customerData = {
      ...data,
      customerGroup: {
        objectId: customerGroupSelected.objectId,
        __type: "Pointer",
        className: "CustomerGroup",
      },
      territory: {
        objectId: territorySelected.objectId,
        __type: "Pointer",
        className: "Territory",
      },
    };

    dispatch(addCustomer(customerData)).then(() => {
      dispatch(fetchCustomers());
    });
    reset();
    toggle();
  };

  return (
    <ModalCommon isShowModal={isOpen} modalTitle={modalTitle} onClose={toggle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <InputField
            label="Full Name"
            register={register}
            required
            name="name"
            errors={errors}
          />
          <SelectField
            label="Type"
            register={register}
            required
            name="type"
            errors={errors}
            options={optionTypes}
          />
          <InputField
            label="Customer Group"
            register={register}
            required
            name="customerGroup"
            errors={errors}
            list="customerGroups"
            listData={customerGroups}
            titleSelect="customerGroupName"
          />
          <InputField
            label="Territory"
            register={register}
            required
            name="territory"
            errors={errors}
            list="territories"
            listData={territories}
            titleSelect="territoryName"
          />
          <CardCollapse
            title="Primary Contact Details"
            isModal
            element={
              <Row>
                <Col>
                  <InputField
                    label="Email Id"
                    register={register}
                    name="emailId"
                    errors={errors}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Mobile No"
                    register={register}
                    name="mobileNo"
                    errors={errors}
                  />
                </Col>
              </Row>
            }
          />
          <CardCollapse
            title="Primary Address Details"
            isModal
            element={
              <Row>
                <Col>
                  <InputField
                    label="Address Line 1"
                    register={register}
                    name="addressLine1"
                    errors={errors}
                  />
                  <InputField
                    label="Address Line 2"
                    register={register}
                    name="addressLine2"
                    errors={errors}
                  />
                  <InputField
                    label="ZIP Code"
                    register={register}
                    name="zipCode"
                    errors={errors}
                  />
                </Col>
                <Col>
                  <InputField
                    label="City"
                    register={register}
                    name="city"
                    errors={errors}
                  />
                  <InputField
                    label="State"
                    register={register}
                    name="state"
                    errors={errors}
                  />
                  <InputField
                    label="Country"
                    register={register}
                    name="country"
                    errors={errors}
                  />
                </Col>
              </Row>
            }
          />
        </div>
        <div
          className="modal-footer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <CommonButton
            type="button"
            onClick={() => history.push("/customer/new-customer")}
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
  );
};

ModalAddCustomer.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};

export default ModalAddCustomer;
