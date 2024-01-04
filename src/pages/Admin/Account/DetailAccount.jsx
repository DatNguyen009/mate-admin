import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import CardCollapse from "components/Common/CardCollapse";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import useReuseData from "custom-hook/useReuseData";
import { useHistory, useParams } from "react-router-dom";
import { CommonText } from "components/Common/TextCommon";
import InputField from "components/form-control/InputField";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TableCommon from "components/Common/TableCommon";
import {
  fetchAccount,
  getAccountByParams,
  updateAccount,
} from "redux-toolkit/slices/Accounting/AccountSlice";
import useFormWithSaveChecked from "custom-hook/useFormWithSaveChecked";
import TagsBox from "components/Common/TagsBox";
import CheckBoxGroup from "components/form-control/CheckBoxGroup";
import moment from "moment";

const INITIAL_FORM_DATA = {
  code: "",
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
  status: "",
  createdAt: "",
  updatedAt: "",
};

function DetailAccount() {
  //assign common hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  //get fiscal year name
  const { id: code } = params;
  //setup form
  const schema = yup.object({
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    saved,
  } = useFormWithSaveChecked({
    mode: "onBlur",
    defaultValues: INITIAL_POSTS,
    resolver: yupResolver(schema),
  });

  //handle edit fiscal year
  const onSubmit = async values => {
    const bundledCompanies = companies.map(company => ({
      __type: "Pointer",
      className: "Company",
      objectId: companiesFetched.find(entry => entry.name === company.company)
        .objectId,
    }));
    const newAccount = {
      ...values,
      yearStartDate: {
        iso: new Date(values.yearStartDate),
        __type: "Date",
      },
      yearEndDate: {
        iso: new Date(values.yearEndDate),
        __type: "Date",
      },
      companies: bundledCompanies,
    };
    const { objectId, createdAt, updatedAt, ...newAccountMap } = newAccount;
    console.log("new", newAccount);
    dispatch(
      updateAccount({
        dataItem: newAccountMap,
        dataId: objectId,
        refresh: fetchAccount,
      })
    );
    return;
  };
  useEffect(async () => {
    //get selected fiscal year
    try {
      const response = await dispatch(getAccountByParams({ name })).unwrap();
      if (!response.length) {
        history.push("/pages-404");
        return;
      }
      const AccountSelected = response[0];
      //if found reset form  else move to 404 page
      reset({
        ...AccountSelected,
        yearStartDate: moment(AccountSelected.yearStartDate.iso).format(
          "yyyy-MM-DD"
        ),
        yearEndDate: moment(AccountSelected.yearEndDate.iso).format(
          "yyyy-MM-DD"
        ),
      });

      let tableId = 1;
      setCompanies(
        AccountSelected.companies.map(entry => ({
          id: tableId++,
          company: entry.name,
        }))
      );
    } catch (err) {
      // console.log(`${err.name}: ${err.message}`);
      console.log(`Error Code: ${err.code || "None"}. Message: ${err.error}`);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderCreateItem title="New Fiscal Year" saved={saved}>
              <CommonButton level={0} type="submit">
                Save
              </CommonButton>
            </HeaderCreateItem>

            <CardCollapse
              title="Connections"
              element={<TagsBox listData={TAGS_BOX} />}
            />
            <Card body>
              <Row>
                <Col>
                  <InputField
                    label="Year Name"
                    register={register}
                    required
                    name="name"
                    errors={errors}
                    helperText="For e.g. 2012, 2012-13"
                  />
                  <CheckBoxGroup
                    listData={CHECKBOX}
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Year Start Date"
                    type="date"
                    register={register}
                    required
                    name="yearStartDate"
                    errors={errors}
                  />
                  <InputField
                    label="Year End Date"
                    type="date"
                    register={register}
                    required
                    name="yearEndDate"
                    errors={errors}
                  />
                </Col>
                <Col />
              </Row>
              <Row>
                <Col>
                  <CommonText level={0} color="black" className="m-0">
                    Companies
                  </CommonText>
                  <TableCommon
                    dataTableCommon={companies}
                    columns={TABLE_COLUMNS}
                    onHandleChangeTable={setCompanies}
                  />
                </Col>
              </Row>
            </Card>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default DetailAccount;
