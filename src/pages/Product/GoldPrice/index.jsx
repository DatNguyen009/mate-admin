import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Col, Container, Row } from "reactstrap";

import { CommonButton } from "components/Common/ButtonCommon";
// import HeaderCreateItem from "components/Common/HeaderCreateItem";
import httpService from "services/httpService";
// import InputField from "components/form-control/InputField";
import { formatNumber } from "helpers/erp_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_PUT } from "helpers/name_helper";
import Table from "components/form-control/Table";
import InputField from "components/form-control/InputField";
import VVSSelectRelation from "components/Common/VVSSelectRelation";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import _ from "lodash";

const HEADERS = [
  {
    text: "Loại vàng",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `goldPrice.${indexOfRow}.goldType`,
      disabled: true,
    }),
  },
  {
    text: "Giá nhập (VNĐ)",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `goldPrice.${indexOfRow}.buying`,
      onChange: _.debounce(e => {
        const { setValue, getValues } = formValue;
        const profit = getValues(`goldPrice.${indexOfRow}.profit`);
        const buying = Number(e.target.value.replaceAll(".", ""));
        const total = buying + buying * profit;

        setValue(`goldPrice.${indexOfRow}.buying`, formatNumber(buying));
        setValue(`goldPrice.${indexOfRow}.total`, formatNumber(total));
      }, 1000),
    }),
  },
  {
    text: "Lợi nhuận",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `goldPrice.${indexOfRow}.profit`,
      onChange: _.debounce(e => {
        const { setValue, getValues } = formValue;
        const profit = Number(e.target.value);
        const buying = Number(
          getValues(`goldPrice.${indexOfRow}.buying`).replaceAll(".", "")
        );
        const total = buying + buying * profit;

        setValue(`goldPrice.${indexOfRow}.total`, formatNumber(total));
        setValue(`goldPrice.${indexOfRow}.profit`, Number(e.target.value));
      }, 1000),
    }),
  },
  {
    text: "Đơn giá (VNĐ)",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `goldPrice.${indexOfRow}.total`,
      disabled: true,
    }),
  },
];

const GoldPrice = () => {
  const [goldPos, setGoldPos] = useState({});

  const schema = yup.object({}).required();
  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getGoldType();
  }, []);

  const getGoldType = async () => {
    const res = await httpService.get(
      '/parse/classes/SysCfg?where={"name":"gold-pos-final"}'
    );
    const goldPos = res.results[0]?.valueObj;
    setGoldPos({ ...goldPos, objectId: res.results[0]?.objectId });
    const goldPosList =
      goldPos &&
      Object.entries(goldPos)
        .filter(([key, value]) => key !== "profit" && key !== "999")
        .map(items => ({
          ...items[1],
          goldType: items[0],
          profit: goldPos.profit[items[0]] || 0,
        }));

    const { reset } = rest;
    reset({
      goldPrice:
        goldPosList &&
        goldPosList.map(g => ({
          ...g,
          buying: formatNumber(g.buying),
          total: formatNumber(g.buying + g.buying * g.profit),
        })),
    });
  };

  const onSubmit = async values => {
    const objectId = goldPos.objectId;
    const previousGoldPos = _.omit(goldPos, ["objectId"]);
    values.goldPrice.map(value => {
      previousGoldPos[value.goldType].buying = Number(
        value.buying.split(".").join("")
      );
      if (value.goldType === "610" || value.goldType === "Italy") {
        previousGoldPos.profit[value.goldType] = Number(value.profit);
      }
    });
    httpService
      .put(`/parse/classes/SysCfg/${objectId}`, {
        valueObj: previousGoldPos,
      })
      .then(() => toastrCRUDSuccess("Gold Price", TEXT_PUT));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Add / Edit Gold Price">
            <CommonButton level={0} type="submit">
              Save
            </CommonButton>
          </HeaderCreateItem>
          <Card body>
            <Table
              headers={HEADERS}
              disableDelete
              formProps={{
                errors,
                ...rest,
              }}
              name="goldPrice"
            />
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default GoldPrice;
