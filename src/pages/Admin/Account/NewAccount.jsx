import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import InputField from "components/form-control/InputField";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  createFiscalYear,
  fetchFiscalYear,
} from "redux-toolkit/slices/Accounting/fiscalYearSlice";
import useFormWithSaveChecked from "custom-hook/useFormWithSaveChecked";
import SelectConst from "components/form-control/SelectConst";
import { isEmpty } from "lodash";
import VVSSelectModel from "components/form-control/VVSSelectModel";

const INITIAL_FORM_DATA = {
  code: "",
  fullName: "dssfadfs",
  phone: "",
  gender: "",
  email: "abc",
  role: {
    text: "",
    objectId: "",
    className: "_Role",
  },
  dayOfBirth: "",
  identityNumber: "",
  branch: {
    text: "",
    objectId: "",
    className: "Branch",
  },
  status: "active",
};
const schema = yup.object().shape({
  code: yup.string(),
  fullName: yup.string().required("This field is required"),
  phone: yup.string().required("This field is required"),
  gender: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
  role: yup.object().shape({
    text: yup.string().required("This field is required"),
    objectId: yup.string().required(),
  }),
  dayOfBirth: yup.string(),
  identityNumber: yup.string(),
  branch: yup.object().shape({
    text: yup.string(),
    objectId: yup.string(),
  }),
  status: yup.string(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
});
function NewAccount() {
  //assign common hooks

  const dispatch = useDispatch();
  const history = useHistory();
  //setup form
  const {
    handleSubmit,
    formState: { errors },
    saved,
    ...formRestProps
  } = useFormWithSaveChecked({
    mode: "onBlur",
    defaultValues: INITIAL_FORM_DATA,
    resolver: yupResolver(schema),
  });
  const getValues = formRestProps.getValues;
  console.log(getValues());
  //handle add new account
  const onSubmit = async values => {
    console.log("submit successfully:", values);
    return;
    const NewAccount = {
      ...values,
    };

    const response = await dispatch(createFiscalYear(NewAccount)).unwrap();
    await dispatch(fetchFiscalYear()).unwrap();
    history.push(`/fiscal-year/${values.name}`, {
      infor: response,
      from: "toCreate",
    });
    return 0;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderCreateItem title="Tạo Tài Khoản" saved={saved}>
              <CommonButton level={0} type="submit" disabled={!isEmpty(errors)}>
                Tạo
              </CommonButton>
            </HeaderCreateItem>
            <Card body>
              <Row>
                <Col>
                  <InputField
                    label="Họ tên"
                    name="fullName"
                    required
                    placeholder="Nhập đầy đủ họ tên"
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Số điện thoại"
                    name="phone"
                    required
                    placeholder="Nhập số điện thoại"
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <SelectConst
                    label="Giới tính"
                    name="gender"
                    required
                    sysCfgName="Gender"
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Email"
                    name="email"
                    required
                    placeholder="Nhập email"
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <VVSSelectModel
                    label="Nhóm quyền"
                    model="_Role"
                    name="role.text"
                    id="role.objectId"
                    required
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Ngày sinh"
                    name="dayOfBirth"
                    type="date"
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="CMND/CCCD"
                    name="identityNumber"
                    placeholder="Nhập số CMND/CCCD"
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <VVSSelectModel
                    label="Chi nhánh"
                    model="Branch"
                    name="branch.text"
                    id="branch.objectId"
                    {...formRestProps}
                    errors={errors}
                  />
                </Col>
                <Col />
              </Row>
            </Card>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
}
export default NewAccount;
