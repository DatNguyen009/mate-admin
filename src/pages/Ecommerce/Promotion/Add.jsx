import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, CardTitle, CardText } from "reactstrap";
import CardCollapse from "components/Common/CardCollapse";
import { Link, useHistory, useParams } from "react-router-dom";
import InputField from "components/form-control/InputField";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
import { useForm } from "react-hook-form";
import SelectConst from "components/form-control/SelectConst";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table from "components/form-control/Table";
import VVSSelectRelation from "components/Common/VVSSelectRelation";
import httpService from "services/httpService";
import TextareaField from "components/form-control/Textarea";
import toastr from "toastr";
import { formatNumber, parseNumber } from "helpers/erp_helper";
import { ComponentCheckbox } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
const validationSchema = yup.object().shape({
  series: yup.string().required("Trường này bắt buộc"),
  name: yup.string().required("Trường này bắt buộc"),
  type: yup.string().required("Trường này bắt buộc"),
  decreasedValue: yup.string().required("Trường này bắt buộc"),
  budget: yup.string().required("Trường này bắt buộc"),
});
const defaultValues = {
  series: "",
  name: "",
  type: "",
  description: "",
  decreasedValue: 0,
  budget: 0,
  policy: [],
  startDate: moment().format("yyyy-MM-DD"),
  endDate: moment().format("yyyy-MM-DD"),
  description: "",
};
const HEADERS = [
  {
    text: "Nhãn hiệu",
    CellComponent: VVSSelectRelation,
    cellComponentProps: (watch, indexOfRow) => ({
      name: `policy.${indexOfRow}.brands`,
      model: "Brand",
    }),
  },
  {
    text: "Loại sản phẩm",
    CellComponent: VVSSelectRelation,
    cellComponentProps: (watch, indexOfRow) => ({
      name: `policy.${indexOfRow}.categories`,
      model: "Category",
    }),
  },
  {
    text: "Sản phẩm",
    CellComponent: VVSSelectRelation,
    cellComponentProps: (watch, indexOfRow) => ({
      name: `policy.${indexOfRow}.products`,
      model: "Product",
    }),
  },
];
const DEFAULT_ROW_VALUE = {
  brands: [],
  categories: [],
  products: [],
};
export default function NewPromotion() {
  const [promotionTypeSelected, setPromotionTypeSelected] = useState("");
  const history = useHistory();
  const formProps = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const {
    formState: { errors, isDirty },
    handleSubmit,
  } = formProps;
  const handleAddPromotion = async values => {
    const { decreasedValue, ...postPromotion } = {
      ...values,
      [values.type]: parseNumber(values.decreasedValue),
      budget: parseNumber(values.budget),
      startDate: {
        iso: new Date(values.startDate),
        __type: "Date",
      },
      endDate: {
        iso: new Date(values.endDate),
        __type: "Date",
      },
      isActive: false,
    };
    console.log("postPromotion :>> ", postPromotion);
    const url = "/parse/classes/Promotion";
    try {
      const response = await httpService.post(url, postPromotion);
      toastr.success("Tạo khuyến mãi thành công");
      history.push(`/promotion/${values.series}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <form>
          <HeaderCreateItem title={`Thêm khuyến mãi`} saved={!isDirty}>
            <div className="d-flex align-items-center">
              <CommonButton
                level={0}
                onClick={handleSubmit(handleAddPromotion)}
              >
                Tạo
              </CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>
              <Col xs={4}>
                <InputField
                  label="Mã giảm giá"
                  name="series"
                  errors={errors}
                  {...formProps}
                  required
                />
              </Col>
              <Col xs={4}>
                <InputField
                  label="Tên"
                  name="name"
                  errors={errors}
                  {...formProps}
                  required
                />
              </Col>

              <Col xs={4}>
                <SelectConst
                  label="Loại giảm giá"
                  name="type"
                  errors={errors}
                  {...formProps}
                  sysCfgName="promotionType"
                  required
                  onChange={e => {
                    setPromotionTypeSelected(e.target.value);
                  }}
                />
              </Col>
              <Col xs={4}>
                <InputField
                  label={`Giá trị giảm ${
                    promotionTypeSelected === "fixed"
                      ? "(VND)"
                      : promotionTypeSelected === "percent"
                      ? "(%)"
                      : ""
                  }`}
                  name="decreasedValue"
                  errors={errors}
                  {...formProps}
                  required
                  onChange={_.debounce(e => {
                    const { setValue } = formProps;
                    setValue("decreasedValue", formatNumber(e.target.value));
                  }, 1000)}
                />
              </Col>
              <Col xs={4}>
                <InputField
                  label="Ngân sách"
                  name="budget"
                  errors={errors}
                  {...formProps}
                  required
                  onChange={_.debounce(e => {
                    const { setValue } = formProps;
                    setValue("budget", formatNumber(e.target.value));
                  }, 1000)}
                />
              </Col>
              <Col xs={4}>
                <InputField
                  label="Ngày bắt đầu"
                  name="startDate"
                  errors={errors}
                  {...formProps}
                  type="date"
                  required
                />
              </Col>
              <Col xs={4}>
                <InputField
                  label="Ngày kết thúc"
                  name="endDate"
                  errors={errors}
                  {...formProps}
                  type="date"
                  required
                />
              </Col>
              <Col xs={8}>
                <TextareaField
                  label="Mô tả"
                  name="description"
                  errors={errors}
                  {...formProps}
                  rows={4}
                />
              </Col>
              <Col>
                <ComponentCheckbox>
                  <input
                    type="checkbox"
                    name="isActive"
                    {...formProps.register("isActive")}
                  />
                  <CommonText style={{ marginLeft: 5, marginTop: 0 }}>
                    isActive
                  </CommonText>
                </ComponentCheckbox>
              </Col>
            </Row>
          </Card>
          <Card body>
            <Table
              headers={HEADERS}
              defaultRowValue={DEFAULT_ROW_VALUE}
              formProps={{
                errors,
                ...formProps,
              }}
              name="policy"
            />
          </Card>
        </form>
      </Container>
    </div>
  );
}
