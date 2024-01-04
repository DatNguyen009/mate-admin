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
import UploadImage from "components/Common/UploadImage";

const INITIAL_FORM_DATA = {
  employeeCode: {
    text: "",
    objectId: "",
  },
  fullName: "",
  phone: "",
  gender: "",
  email: "",
  role: {
    text: "",
    objectId: "",
  },
  dayOfBirth: "",
  identityNumber: "",
  branch: {
    text: "",
    objectId: "",
  },
  status: "active",
};
const schema = yup.object().shape({
  employeeCode: yup.object().shape({
    text: yup.string(),
    objectId: yup.string(),
  }),
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
                Gửi
              </CommonButton>
            </HeaderCreateItem>
            <Card body>
              <Row>
                <Col xs={4}>
                  <UploadImage />
                </Col>
                <Col xs={8}>xyz</Col>
              </Row>
            </Card>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
}
export default NewAccount;
