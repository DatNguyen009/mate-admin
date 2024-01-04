import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "toastr/build/toastr.min.css";
import { useDispatch } from "react-redux";
import { CommonText } from "components/Common/TextCommon";
import { ComponentCheckbox } from "components/Common/inputCommon";
import SelectField from "components/form-control/Select";
import useReuseData from "custom-hook/useReuseData";
import { fetchSysCfg } from "redux-toolkit/slices/SysCfgSlice/SysCfgSlice";
import {
  createAccount,
  fetchAccount,
  updateAccount,
} from "redux-toolkit/slices/Accounting/AccountSlice";
const INITIAL_CHART_OF_ACCOUNT = {
  name: "",
  accountNumber: 0,
  isGroup: false,
  rootType: "",
  type: "",
  currency: "",
};

export default function ModalAddChartOfAccount(props) {
  const { isOpen, toggle, title, size, company, nodeParent, onChange } = props;
  const { currency, accountType, rootType } = useReuseData(
    fetchSysCfg,
    "SysCfgToolkit"
  );
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const modalTitle = "New " + title.replaceAll("-", " ");
  const schema = yup
    .object({
      name: yup.string().required("Please enter Name"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    INITIAL_CHART_OF_ACCOUNT,
    resolver: yupResolver(schema),
  });
  const onSubmit = async values => {
    const newChartofAccount = {
      ...values,
      company: {
        objectId: company?.objectId,
        __type: "Pointer",
        className: "Company",
      },
      ...(nodeParent && {
        nodeParent: [
          {
            objectId: nodeParent?.objectId,
            __type: "Pointer",
            className: "Account",
          },
        ],
      }),
    };
    const res = await dispatch(createAccount(newChartofAccount));
    if (!nodeParent?.nodeChild) {
      await dispatch(
        updateAccount({
          dataItem: {
            nodeChild: [
              {
                objectId: res?.payload?.objectId,
                __type: "Pointer",
                className: "Account",
              },
            ],
          },
          dataId: nodeParent?.objectId,
        })
      );
      const accounts = await dispatch(fetchAccount());
      onChange(accounts?.payload);
      toggle();
      return;
    }

    if (nodeParent?.nodeChild) {
      const nodeChildMap = nodeParent.nodeChild.map(item => {
        return {
          objectId: item.objectId,
          __type: "Pointer",
          className: "Account",
        };
      });
      nodeChildMap.push({
        objectId: res?.payload?.objectId,
        __type: "Pointer",
        className: "Account",
      });
      await dispatch(
        updateAccount({
          dataItem: {
            nodeChild: nodeChildMap,
          },
          dataId: nodeParent?.objectId,
        })
      );
      const accounts = await dispatch(fetchAccount());
      onChange(accounts?.payload);
      toggle();

      return;
    }
  };

  const handleCheckIsGroup = e => {
    setIsGroup(e.target.checked);
  };
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle={modalTitle}
        onClose={toggle}
        size={size}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <InputField
              label="New Account Name"
              register={register}
              required
              name="name"
              errors={errors}
              helperText="Name of new Account. Note: Please don't create accounts for Customers and Suppliers"
            />
            <InputField
              type="number"
              label="Account Number"
              register={register}
              name="accountNumber"
              errors={errors}
              helperText="Number of new Account, it will be included in the account name as a Prefix"
            />
            <ComponentCheckbox className="mt-2">
              <input
                type="checkbox"
                {...register("isGroup")}
                onChange={e => handleCheckIsGroup(e)}
              />
              <CommonText style={{ marginLeft: 5, marginTop: 0 }}>
                Is Group
              </CommonText>
            </ComponentCheckbox>
            <CommonText color="gray">
              Further accounts can be made under Groups, but entries can be made
              against non-Groups
            </CommonText>

            {isGroup && (
              <SelectField
                label="Root Type"
                name="rootType"
                options={rootType}
                register={register}
              />
            )}
            <SelectField
              label="Account Type"
              name="type"
              options={accountType}
              register={register}
              helperText="Setting Account Type helps in selecting this Account in transactions."
            />

            <InputField
              label="Currency"
              register={register}
              name="currency"
              titleSelect="currency"
              list="currencyList"
              listData={currency}
            />
          </div>
          <div className="modal-footer">
            <CommonButton type="submit" level={0}>
              Save
            </CommonButton>
          </div>
        </form>
      </ModalCommon>
    </React.Fragment>
  );
}

ModalAddChartOfAccount.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
  company: PropTypes.object,
  nodeParent: PropTypes.any,
  onChange: PropTypes.func,
};
