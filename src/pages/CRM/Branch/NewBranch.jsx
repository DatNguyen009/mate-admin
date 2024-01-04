import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import httpService from "services/httpService";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const NewBranch = () => {
  const { id } = useParams();
  const history = useHistory();

  const excludeFields = id ? [] : ["wareHouse"];

  useEffect(() => {
    getBranchDetail();
  }, [id]);

  const schema = yup
    .object({
      name: yup.string().required("This field is required!"),
      wareHouse: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                objectId: val.objectId,
                __type: "Pointer",
                className: "WareHouse",
              }
            : null
        ),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      createdAt: moment().format("YYYY-MM-DD"),
      updatedAt: moment().format("YYYY-MM-DD"),
      address: "",
    },
    resolver: yupResolver(schema),
  });

  const { renderForm, uploadImg, getAddress } = useGetFormSchema(
    "Branch",
    yup,
    rest,
    errors
  );

  const getBranchDetail = async () => {
    try {
      if (!id) return;

      const getBranchUrl = `/parse/classes/Branch/${id}?include=["wareHouse","bank"]`;
      const res = await httpService.get(getBranchUrl);
      const { reset } = rest;
      reset({
        ...res,
        createdAt: moment(res.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(res.updatedAt).format("YYYY-MM-DD"),
        address: res?.address?.location?.split(",")[0],
        wareHouse: res?.wareHouse
          ? {
              text: res.wareHouse.name,
              __type: "Pointer",
              className: "WareHouse",
              objectId: res.wareHouse.objectId,
            }
          : { text: "" },
      });
      getAddress(res);
    } catch (errorRes) {
      if (errorRes?.response?.data?.code === 101) {
        toastrErrorAlert("Không tìm thấy chi nhánh!");
        history.replace("/branch");
      }
    }
  };

  const onSubmit = async values => {
    try {
      const { createdAt, updatedAt, warehouse, bank, ...branchValues } = values;
      const { address, province, district, ward } = branchValues;
      const thumbnail = await uploadImg(branchValues.thumbnail);

      const addressFull = _.join([address, ward, district, province], ", ");
      const branch = {
        ...branchValues,
        thumbnail,
        address: { location: addressFull },
        ...(bank?.Name !== "" && {
          bank: {
            __type: "Pointer",
            className: "SysCfg",
            objectId: bank.Name,
          },
        }),
      };

      if (id) {
        const findAccountUrl = `/parse/classes/Account?where={"branch":{"__type":"Pointer","className":"Branch","objectId":"${id}"}}`;
        const accountRes = (await httpService.get(findAccountUrl)).results[0];
        const accountPayload = {
          branch: {
            __type: "Pointer",
            className: "Branch",
            objectId: id,
          },
          name: branch.name,
          accountNumber: branch.accountNumber,
          type: "bank",
          bank: branch.bank,
        };

        if (!accountRes) {
          await httpService.post(`/parse/classes/Account`, accountPayload);
        } else {
          const updateAccountUrl = `/parse/classes/Account/${accountRes.objectId}`;
          await httpService.put(updateAccountUrl, accountPayload);
        }

        await httpService.put(`/parse/classes/Branch/${id}`, branch);
        toastrCRUDSuccess("Branch", TEXT_PUT);
        return;
      }

      const branchUrl = "/parse/classes/Branch";
      const { objectId: branchOI } = await httpService.post(branchUrl, branch);
      const warehousePayload = {
        branch: {
          __type: "Pointer",
          className: "Branch",
          objectId: branchOI,
        },
        city: province,
        name: branch.name,
        address: addressFull,
        isBranchDefault: true,
      };
      const accountPayload = {
        branch: {
          __type: "Pointer",
          className: "Branch",
          objectId: branchOI,
        },
        name: branch.name,
        accountNumber: branch.accountNumber,
        type: "bank",
        bank: branch.bank,
      };
      await httpService.post("/parse/classes/WareHouse", warehousePayload);
      await httpService.post("/parse/classes/Account", accountPayload);
      toastrCRUDSuccess("Branch", TEXT_POST);
      history.replace(`/branch/${branchOI}`);
    } catch (errorRes) {
      console.log("errorRes :>> ", errorRes);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem
            title={id ? "Chi tiết chi nhánh" : "Thêm chi nhánh"}
          >
            <CommonButton level={0}>Lưu</CommonButton>
          </HeaderCreateItem>
          {renderForm(excludeFields)}
        </form>
      </Container>
    </div>
  );
};

export default NewBranch;
