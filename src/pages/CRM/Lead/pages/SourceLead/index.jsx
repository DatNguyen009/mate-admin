import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import httpService from "services/httpService";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";

import _ from "lodash";
import Table from "components/form-control/Table";
import InputField from "components/form-control/InputField";
import { GET_SYSCFG } from "helpers/url_helper";
import { isUniqueArr } from "helpers/erp_helper";
import { language_vn } from "helpers/language_vn";

const HEADERS = [
  {
    text: "Tên",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `tb_source.${indexOfRow}.text`,
      model: "EmployeeGroup",
    }),
  },
];
const DEFAULT_ROW_VALUE = {};

const SourceLead = () => {
  const [sysCfg, setSysCfg] = useState({});
  const { id } = useParams();
  const language = language_vn;
  useEffect(() => {
    getSourceLead();
  }, [id]);

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
  });

  const getSourceLead = async () => {
    const params = {
      where: {
        Code: "leadApproachFrom",
      },
    };
    const res = await httpService.get(GET_SYSCFG, { params });

    setSysCfg(res.results[0]);
    const { reset } = rest;
    reset({
      tb_source: res.results[0].Values,
    });
  };

  const onSubmit = async values => {
    const checkUnique = isUniqueArr(values.tb_source, "text");
    if (checkUnique?.text) {
      toastrErrorAlert(
        `${checkUnique.text} đã bị trùng, Nguồn phải là duy nhất.`
      );
      return;
    }

    const sourceMap = values.tb_source.map(item => {
      return {
        text: item.text,
        value: item.text.replaceAll(" ", ""),
      };
    });
    try {
      const res = await httpService.put(GET_SYSCFG + `/${sysCfg.objectId}`, {
        Values: sourceMap,
      });
      if (res.updatedAt) {
        toastrSuccessAlert(language.success_source_lead);
        return;
      }

      toastrErrorAlert(language.error);
    } catch (error) {
      toastrErrorAlert(language.error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={language.source_lead}>
            <div className="d-flex align-items-center mb-2">
              <div className="flex-grow-1"></div>
              <CommonButton level={0} type="submit">
                {language.save}
              </CommonButton>
            </div>
          </HeaderCreateItem>
          <Table
            headers={HEADERS}
            defaultRowValue={DEFAULT_ROW_VALUE}
            formProps={{
              errors,
              ...rest,
            }}
            name="tb_source"
            isSysCfg
            idSysCfg={sysCfg.objectId}
          />
        </form>
      </Container>
    </div>
  );
};

export default SourceLead;
