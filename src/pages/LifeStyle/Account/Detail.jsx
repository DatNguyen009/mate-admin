import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Col, Container, Row } from "reactstrap";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import {
  GET_DISTRICT,
  GET_PROVINCE,
  GET_USER_INFO,
  GET_WARD,
} from "helpers/url_helper";
import { message } from "antd";
import VVSSelect from "components/form-control/VVSSelect";
import InputField from "components/form-control/InputField";
import { getTextByRole } from "helpers/lifestyle_helper";
import moment from "moment";
import ButtonWithChangeRole from "./ChangeRole";
import { CommonText } from "components/Common/TextCommon";

const AccountDetail = () => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getAccountDetail();
  }, [id]);

  const schema = yup.object({}).required();
  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Userinfo", yup, rest, errors, false);

  const getAccountDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `${GET_USER_INFO}/${id}?include=["superiorId"]`
    );

    if (!res) {
      history.replace("/account");
      toastrErrorAlert("Không tìm thấy tài khoản!");
      return;
    }

    const [{ results: province }, { results: district }, { results: ward }] =
      await Promise.all([
        httpService.get(`${GET_PROVINCE}`, {
          params: {
            where: { ...(res?.provinceId && { provinceId: res?.provinceId }) },
          },
        }),
        httpService.get(`${GET_DISTRICT}`, {
          params: {
            where: {
              ...(res?.provinceId && { provinceId: res?.provinceId }),
              ...(res?.districtId && { districtId: res?.districtId }),
            },
          },
        }),
        httpService.get(`${GET_WARD}`, {
          params: {
            where: {
              ...(res?.districtId && { districtId: res?.districtId }),
              ...(res?.wardId && { wardId: res?.wardId }),
            },
          },
        }),
      ]);

    const { reset } = rest;

    reset({
      ...res,
      provinceName: province?.length && res?.provinceId && province[0]?.name,
      districtName: district?.length && res?.districtId && district[0]?.name,
      wardName: ward?.length && res?.wardId && ward[0]?.name,
      role: getTextByRole(res?.role, res?.userType).title,
      dob: res?.dob?.iso ? moment(res?.dob.iso).format("YYYY-MM-DD") : null,
      isActive: res?.isActive === undefined || res?.isActive ? true : false,
      superiorId: res?.superiorId?.fullName,
      superiorId: res?.superiorId?.objectId
        ? {
            text: res?.superiorId?.fullName,
            objectId: res?.superiorId?.objectId,
            className: "UserInfo",
            __type: "Pointer",
          }
        : { text: "" },
    });
  };

  const onSubmit = async values => {
    const {
      createdAt,
      updatedAt,
      objectId,
      path,
      provinceName,
      districtName,
      wardName,
      provinceId,
      districtId,
      wardId,
      role,
      superiorId,
      ...newsValues
    } = values;
    const body = {
      ...newsValues,
      dob: {
        iso: moment(values?.dob),
        __type: "Date",
      },
      ...(provinceId && { provinceId }),
      ...(districtId && { districtId }),
      ...(wardId && { wardId }),
      fullAddress: [values?.address, wardName, districtName, provinceName]
        .filter(item => item)
        .join(", "),
    };

    if (id) {
      try {
        await httpService.put(GET_USER_INFO + `/${id}`, body);
        message.success("Cập nhật tài khoản thành công!!");
        return;
      } catch (error) {
        message.error(
          "Cập nhật tài khoản không thành công. Vui lòng thử lại sau!"
        );
      }

      return;
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={"Tài khoản"}>
            <div className="d-flex" style={{ gap: 8 }}>
              <ButtonWithChangeRole
                userId={id}
                refetchUserInfo={getAccountDetail}
                defaultRole={rest.getValues("role")}
              />
              <CommonButton level={0}>Lưu</CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>{renderForm()}</Row>
            <CommonText level={1} mt={0}>
              Địa chỉ
            </CommonText>
            <Row>
              <Col sm={4}>
                <VVSSelect
                  label="Tỉnh / Thành phố"
                  name="provinceName"
                  required
                  errors={errors}
                  model="Province"
                  searchField="name"
                  fieldView={["name"]}
                  onSelect={e => {
                    rest.setValue("provinceId", e.provinceId);
                    rest.setValue("districtName", "");
                    rest.setValue("wardName", "");
                    rest.setValue("districtId", null);
                    rest.setValue("wardId", null);
                  }}
                  {...rest}
                />
              </Col>
              <Col sm={4}>
                <VVSSelect
                  label="Quận / Huyện"
                  name="districtName"
                  required
                  errors={errors}
                  model="District"
                  searchField="name"
                  fieldView={["name"]}
                  conditionField={{
                    provinceId: rest.getValues("provinceId"),
                  }}
                  onSelect={e => {
                    rest.setValue("districtId", e.districtId);
                    rest.setValue("wardName", "");
                    rest.setValue("wardId", null);
                  }}
                  disabled={rest.getValues("provinceId") ? false : true}
                  {...rest}
                />
              </Col>
              <Col sm={4}>
                <VVSSelect
                  label="Phường / Xã"
                  name="wardName"
                  required
                  errors={errors}
                  model="Ward"
                  searchField="name"
                  fieldView={["name"]}
                  conditionField={{
                    districtId: rest.getValues("districtId"),
                  }}
                  onSelect={e => {
                    rest.setValue("wardId", e.wardId);
                  }}
                  disabled={rest.getValues("districtId") ? false : true}
                  {...rest}
                />
              </Col>
              <Col sm={12}>
                <InputField label="Số nhà / đường" name="address" {...rest} />
              </Col>
            </Row>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default AccountDetail;
