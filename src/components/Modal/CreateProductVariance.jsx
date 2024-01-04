import React, { useRef, useEffect } from "react";
import {
  Col,
  Row,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from "reactstrap";
import { CommonButton } from "components/Common/ButtonCommon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-control/InputField";
import httpService from "services/httpService";
import toastr from "toastr";
const validateSchema = yup.object().shape({});
export default function CreateProductVarianceModal({
  rowName,
  getValues: getValuesParent,
  setRefresh,
}) {
  const [toggle, setToggle] = useState(false);
  const product = getValuesParent(`${rowName}.product`);
  const formProps = useForm({
    mode: "onBlur",
    defaultValues: {
      color: "",
      size: "",
      totalWeight: "",
      goldWeight: "",
      stoneWeight: "",
    },
    resolver: yupResolver(validateSchema),
  });
  const { reset, handleSubmit, getValues, setValue } = formProps;
  const handleCreateProductVariance = async values => {
    const url = "/parse/classes/ProductVariance";
    const newProductVariance = {
      ...values,
      product: {
        __type: "Pointer",
        className: "Product",
        objectId: product.objectId,
      },
    };
    try {
      await httpService.post(url, newProductVariance);
      setToggle(false);
      toastr.success("Tạo biến thể thành công");
      setRefresh(prev => !prev);
      reset();
    } catch (err) {
      console.error(err);
    }
  };
  const handleGetWeight = async name => {
    if (getValues(name)) return;
    const url = "/parse/classes/GoldWeight";
    const response = await httpService.get(url);
    const weightData = response.results[0];
    const updatedAt = new Date(weightData.updatedAt);
    const diffMs = Date.now() - updatedAt;
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffMins < 10) {
      setValue(name, Number(weightData.value) * 10);
    }
  };
  if (!product?.objectId)
    return (
      <div className="w-100 fw-bold text-muted">
        {`Hãy chọn sản phẩm trước`}
      </div>
    );
  return (
    <React.Fragment>
      <div
        className="w-100 fw-bold text-primary"
        onClick={() => {
          setToggle(true);
        }}
      >
        {`+ Tạo biến thể mới`}
      </div>
      <Modal size="xl" isOpen={toggle} centered={true}>
        <ModalHeader style={{ textTransform: "capitalize" }}>
          {`Tạo biến thể cho ${product.name}`}
        </ModalHeader>
        <ModalBody className="px-2">
          <Row>
            <Col>
              <InputField
                label={<span className="fw-bold">Màu sắc</span>}
                name="color"
                {...formProps}
                errors={formProps.formState.errors}
              />
            </Col>
            <Col>
              <InputField
                name="size"
                label={<span className="fw-bold">Kích cỡ</span>}
                {...formProps}
                errors={formProps.formState.errors}
              />
            </Col>
            <Col>
              <InputField
                label={
                  <span className="fw-bold">{`Khối lượng vàng(chỉ)`}</span>
                }
                name="goldWeight"
                {...formProps}
                errors={formProps.formState.errors}
                onFocus={() => handleGetWeight("goldWeight")}
              />
            </Col>
            <Col>
              <InputField
                label={<span className="fw-bold">{`Khối lượng đá(chỉ)`}</span>}
                name="stoneWeight"
                {...formProps}
                errors={formProps.formState.errors}
                onFocus={() => handleGetWeight("stoneWeight")}
              />
            </Col>
            <Col>
              <InputField
                label={
                  <span className="fw-bold">{`Khối lượng tổng(chỉ)`}</span>
                }
                name="totalWeight"
                {...formProps}
                errors={formProps.formState.errors}
                onFocus={() => handleGetWeight("totalWeight")}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => setToggle(false)}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={handleSubmit(handleCreateProductVariance)}
            type="button"
          >
            Hoàn tất
          </CommonButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
CreateProductVarianceModal.propTypes = {
  conditionField: PropTypes.object,
  rowName: PropTypes.string,
  getValues: PropTypes.func,
  setRefresh: PropTypes.func,
};
