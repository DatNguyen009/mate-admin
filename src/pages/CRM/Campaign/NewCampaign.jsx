import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Container } from "reactstrap";
import * as yup from "yup";
import "antd/dist/antd.css";

import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonText } from "components/Common/TextCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { GET_CAMPAIGN } from "helpers/url_helper";
import httpService from "services/httpService";
import { language_vn } from "helpers/language_vn";
import { useDispatch } from "react-redux";
import { generateCode } from "helpers/erp_helper";
import moment from "moment";

export default function NewCampaign() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  const schema = yup
    .object({
      name: yup.string().required("Vui lòng nhập tên"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Campaign", yup, rest, errors);

  useEffect(() => {
    fetchCampaignDetail();
  }, []);

  const fetchCampaignDetail = async () => {
    if (!id) return;
    try {
      const res = await httpService.get(`${GET_CAMPAIGN}/${id}`);
      const { reset } = rest;
      reset({
        ...res,
        startDate: res?.startDate
          ? moment(res?.startDate?.iso).utc().format("YYYY-MM-DD")
          : "",
        endDate: res?.endDate
          ? moment(res?.endDate?.iso).utc().format("YYYY-MM-DD")
          : "",
      });
    } catch (error) {
      history.replace("/campaign");
      toastrErrorAlert(language_vn.error);
      return;
    }
  };

  const onSubmit = async value => {
    const { createdAt, updatedAt, startDate, endDate, ...remaining } = value;

    const newCampaign = {
      ...remaining,
      campaignId: await generateCode("Campaign", "campaignId"),
      ...(value.startDate && {
        startDate: {
          iso: new Date(value.startDate),
          __type: "Date",
        },
      }),
      ...(value.endDate && {
        endDate: {
          iso: new Date(value.endDate),
          __type: "Date",
        },
      }),
    };

    try {
      if (id) {
        const { campaignId, ...remaining } = newCampaign;
        const res = await httpService.put(GET_CAMPAIGN + `/${id}`, remaining);
        if (res?.updatedAt) {
          toastrSuccessAlert("Cập nhật chiến dịch thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
        return;
      }
      const res = await httpService.post(GET_CAMPAIGN, newCampaign);
      if (res?.createdAt) {
        toastrSuccessAlert("Tạo chiến dịch thành công!!");
        history.replace(`/campaign/${res.objectId}`);
        return;
      }
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    } catch (error) {
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / Sửa Chiến Dịch ">
            <div className="d-flex align-items-center mb-2">
              <CommonButton level={0}>{language_vn.save}</CommonButton>
            </div>
          </HeaderCreateItem>

          <Card body>
            <CommonText level={1} className="m-0">
              Thông tin chiến dịch
            </CommonText>
            {renderForm(excludeFields)}
          </Card>
        </form>
      </Container>
    </div>
  );
}
