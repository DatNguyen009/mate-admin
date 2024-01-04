import React, { useState } from "react";
import * as yup from "yup";
import { Col, ModalBody, Row } from "reactstrap";
import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import InputField from "components/form-control/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import SelectField from "components/form-control/Select";
import { useHistory } from "react-router-dom";
import { fetchItemGroup } from "redux-toolkit/slices/Stock/ItemsAndPricing/ItemGroupSlice";
import useReuseData from "custom-hook/useReuseData";
import { useDispatch } from "react-redux";
import {
  addItem,
  fetchItem,
} from "redux-toolkit/slices/Stock/ItemsAndPricing/ItemSlice";
import { checkExistItem } from "helpers/erp_helper";

const INITIAL_ITEM = {
  itemCode: "",
  itemName: "",
  itemGroup: "",
};

const SELECT_DEFAULT_UNIT = [
  { index: 0, name: "Unit", value: "unit" },
  { index: 1, name: "Box", value: "box" },
  { index: 2, name: "Nos", value: "nos" },
  { index: 3, name: "Pair", value: "pair" },
  { index: 4, name: "Set", value: "set" },
  { index: 5, name: "Meter", value: "meter" },
  { index: 6, name: "Barleycorn", value: "barleycorn" },
  { index: 7, name: "Calibre", value: "calibre" },
  { index: 8, name: "Cable Length (UK)", value: "cableLengthUk" },
  { index: 9, name: "Cable Length (US)", value: "cableLengthUs" },
  { index: 10, name: "Cable Length", value: "CableLength" },
  { index: 11, name: "Centimeter", value: "centimeter" },
  { index: 12, name: "Chain", value: "chain" },
  { index: 13, name: "Decimeter", value: "decimeter" },
  { index: 14, name: "Ells (UK)", value: "ellsUk" },
  { index: 15, name: "Ems(Pica)", value: "emsPica" },
  { index: 16, name: "Fathom", value: "fathom" },
  { index: 17, name: "Foot", value: "foot" },
  { index: 18, name: "Furlong", value: "furlong" },
  { index: 19, name: "Hand", value: "hand" },
];

export default function ModalAddItem(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;

  const [showInputField, setShowInputField] = useState({
    openingStock: true,
    createVariant: true,
  });

  const { itemGroup } = useReuseData(fetchItemGroup, "ItemGroup");
  const { items } = useReuseData(fetchItem, "Item");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleShowInputField = () => {
    setShowInputField(prev => ({ ...prev, openingStock: !prev.openingStock }));
  };

  const handleCreateVariant = () => {
    setShowInputField(prev => ({
      ...prev,
      createVariant: !prev.createVariant,
    }));
  };
  const schema = yup
    .object({
      itemCode: yup
        .string()
        .required("Please Enter Your Item Code")
        .test(
          "text",
          "Item Code have been existed",
          value => !checkExistItem(items, "itemCode", value)
        ),
      itemName: yup.string().required("Please Enter Your Item Name"),
      itemGroup: yup
        .string()
        .required("Please Enter Your Item Group")
        .test("text", "Item Group is not exist", value =>
          checkExistItem(itemGroup, "name", value)
        ),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    INITIAL_ITEM,
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    const itemGroupSelected = itemGroup.find(
      item => item.name === data.itemGroup
    );

    const payload = {
      ...data,
      itemGroup: {
        objectId: itemGroupSelected?.objectId,
        __type: "Pointer",
        className: "ItemGroup",
      },
    };
    const response = await dispatch(addItem(payload));

    if (response.payload.objectId) {
      await dispatch(fetchItem());
      history.push(`/item/${response.payload.objectId}`);
    }
  };

  const editFullPage = () => {
    history.push("item/new-item");
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
              <ComponentCheckbox style={{ marginTop: 20 }}>
                <input
                  type="checkbox"
                  label="subscribed"
                  name="subscribed"
                  id="subscribed"
                  onClick={handleCreateVariant}
                />
                <LabelCheckbox for="ubsubscribed" style={{ marginLeft: 5 }}>
                  Create Variant
                </LabelCheckbox>
              </ComponentCheckbox>
              {showInputField.createVariant ? (
                <div>
                  <InputField
                    name="itemCode"
                    label="Item Code"
                    register={register}
                    errors={errors}
                    required
                  />
                  <InputField
                    name="itemName"
                    label="Item Name"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    name="itemGroup"
                    label="Item Group"
                    register={register}
                    errors={errors}
                    required
                    listData={itemGroup}
                    list="itemGroup"
                    titleSelect="name"
                  />
                  <SelectField
                    label="Default Unit of Measure"
                    register={register}
                    required
                    name="defaultUnitOfMeasure"
                    options={SELECT_DEFAULT_UNIT}
                  />
                </div>
              ) : (
                <InputField
                  name="itemTemplate"
                  label="Item Template"
                  register={register}
                  errors={errors}
                  required
                />
              )}

              <ComponentCheckbox style={{ marginTop: 20 }}>
                <input
                  type="checkbox"
                  label="subscribed"
                  name="subscribed"
                  id="subscribed"
                  onClick={handleShowInputField}
                />
                <LabelCheckbox for="ubsubscribed" style={{ marginLeft: 5 }}>
                  Maintain Stock
                </LabelCheckbox>
              </ComponentCheckbox>

              {!showInputField.openingStock && (
                <InputField
                  name="openingStock"
                  label="Opening Stock"
                  register={register}
                  errors={errors}
                />
              )}

              <InputField
                name="standardSellingRate"
                label="Standard Selling Rate"
                register={register}
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
ModalAddItem.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
