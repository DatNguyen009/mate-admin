import { yupResolver } from "@hookform/resolvers/yup";
import Attachments from "components/attachments";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import InputField from "components/form-control/InputField";
import useFormWithSaveChecked from "custom-hook/useFormWithSaveChecked";
import useReuseData from "custom-hook/useReuseData";
import { getLastItemInUrl } from "helpers/erp_helper";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "reactstrap";
import * as yup from "yup";
import { fetchCompany } from "redux-toolkit/slices/Company/CompanySlide";
import {
  fetchContract,
  getContractByParams,
  updateContract,
} from "redux-toolkit/slices/Employee/ContractSlice";
import { fetchUsers } from "redux-toolkit/slices/Users/userSlice";

export default function ContractDetail() {
  const [attachments, setAttachments] = useState([]);
  const { companys } = useReuseData(fetchCompany, "Company");
  const { contracts } = useReuseData(fetchContract, "Contract");
  const { users } = useReuseData(fetchUsers, "User");
  const contractId = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [title, setTitlte] = useState(getLastItemInUrl());
  const { objectId = "" } = location.state?.infor || "";

  const schema = yup
    .object({
      name: yup.string().required("Please enter your Name"),
      type: yup.string().required("Please enter your Type"),
      company: yup.string().required("Please enter your Type"),
      startDate: yup.string().required("Please enter your Type"),
      endDate: yup.string().required("Please enter your Type"),
    })
    .required();

  const {
    handleSubmit,
    saved,
    register,
    reset,
    formState: { errors },
  } = useFormWithSaveChecked({ resolver: yupResolver(schema) });

  useEffect(async () => {
    if (contractId.id) {
      const res = await dispatch(
        getContractByParams(objectId ? { objectId } : { code: contractId.id })
      );
      reset({
        ...res.payload[0],
        company: res.payload[0]?.company?.name,
        startDate: res.payload[0]?.startDate?.iso.slice(0, 10),
        endDate: res.payload[0]?.endDate?.iso.slice(0, 10),
      });
      setTitlte(res.payload[0]?.name);
      res.payload[0]?.attachment &&
        setAttachments([
          {
            name: res.payload[0]?.attachment?.name,
            originName: res.payload[0]?.attachment?.name,
            size: "",
            type: "image/jpeg",
            url: res.payload[0]?.attachment?.url,
          },
        ]);
    }
  }, [contractId.id, contracts]);

  const onSubmit = async values => {
    const localStoragedUser = JSON.parse(localStorage.getItem("User"));
    const companySelected = companys.find(
      company => company.name === values?.company
    );
    const createdBy = users.find(
      user => user.username === localStoragedUser.username
    );
    const newContract = {
      ...(values?.name && { name: values?.name }),
      ...(createdBy?.objectId && {
        user: {
          objectId: createdBy?.objectId,
          __type: "Pointer",
          className: "_User",
        },
      }),
      ...(objectId && {
        employee: {
          objectId: objectId,
          __type: "Pointer",
          className: "Employee",
        },
      }),
      ...(companySelected?.objectId && {
        company: {
          objectId: companySelected?.objectId,
          __type: "Pointer",
          className: "Company",
        },
      }),

      ...(values.startDate && {
        startDate: {
          iso: new Date(values?.startDate),
          __type: "Date",
        },
      }),
      ...(values.endDate && {
        endDate: {
          iso: new Date(values?.endDate),
          __type: "Date",
        },
      }),
      ...(values?.attachment && {
        attachment: {
          name: attachments[0].name,
          url: attachments[0].url,
          __type: "File",
        },
      }),
      ...(values?.contractType && {
        type: values?.contractType,
      }),
    };
    await dispatch(updateContract({ dataItem: newContract, dataId: objectId }));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={title} saved={saved}>
            <CommonButton level={0} type="submit">
              Save
            </CommonButton>
          </HeaderCreateItem>

          <Card body>
            <Row>
              <Col sm={6}>
                <InputField
                  required
                  errors={errors}
                  label="Name"
                  name="name"
                  register={register}
                />
                <InputField
                  label="Type"
                  name="type"
                  register={register}
                  required
                  errors={errors}
                />
                <InputField
                  label="Company"
                  name="company"
                  register={register}
                  required
                  errors={errors}
                />
              </Col>
              <Col sm={6}>
                <InputField
                  type="date"
                  label="Start Date"
                  name="startDate"
                  register={register}
                  required
                  errors={errors}
                />
                <InputField
                  type="date"
                  label="End Date"
                  name="endDate"
                  register={register}
                  required
                  errors={errors}
                />
                <Attachments
                  attachments={attachments}
                  onChange={setAttachments}
                  maxFiles={1}
                  button={
                    <Button
                      style={{ width: "fit-content", marginTop: "32px" }}
                      type="button"
                    >
                      <div className="d-flex">
                        <i
                          className="bx bx-message-x"
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                          }}
                        ></i>
                        <p style={{ marginBottom: 0 }}>Attachments</p>
                      </div>
                    </Button>
                  }
                />
              </Col>
            </Row>
          </Card>
        </form>
      </Container>
    </div>
  );
}
