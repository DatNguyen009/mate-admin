import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";

import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import httpService from "services/httpService";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { createLead, updateLead } from "redux-toolkit/slices/CRM/LeadSlice";
import Spacer from "components/Common/Spacing";
import _ from "lodash";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import VVSTable from "components/form-control/VVSTable";
import { language_vn } from "helpers/language_vn";
import axios from "axios";
import ViewableCommon from "components/Common/ViewableCommon";
import { GET_SMS_TEMPLATE } from "helpers/url_helper";

const NewSMSTemplate = () => {
  const [smsDetail, setSMSDetail] = useState({});
  const [isCallLoading, setIsCallLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const language = language_vn;

  useEffect(() => {
    getSMSDetail();
  }, [id]);

  const schema = yup.object({
    title: yup.string().required("Vui lòng nhập chủ đề!"),
    name: yup.string().required("Vui lòng nhập tên sự kiện!"),
    smsContent: yup.string().required("Vui lòng nhập nội dung tin nhắn!"),
  });

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    // defaultValues: {
    //     gender: "Male",
    // },
    resolver: yupResolver(schema),
  });

  const { renderForm, getAddress } = useGetFormSchema(
    "NotificationTemplate",
    yup,
    rest,
    errors
  );

  const getSMSDetail = async () => {
    if (!id) return;

    const res = await httpService.get(`${GET_SMS_TEMPLATE}/${id}`);
    if (!res) {
      history.replace("/sms-template");
      toastrErrorAlert("SMS Templatead not found!");
      return;
    }
    // getSMSDetail(res);
    const { reset } = rest;
    reset({
      ...res,
    });
  };

  const onSubmit = async values => {
    const { createdAt, updatedAt, ...smsValue } = values;
    const sms = {
      ...smsValue,
    };
    try {
      if (id) {
        const res = await httpService.put(`${GET_SMS_TEMPLATE}/${id}`, sms);
        toastrSuccessAlert("Cập nhật thành công!");
        return;
      }
      const res = await httpService.post(GET_SMS_TEMPLATE, {
        title: values.title,
        name: values.name,
        smsContent: values.smsContent,
        notificationContent: values.notificationContent,
      });
      toastrSuccessAlert("Tạo thành công!");
      console.log("res", res);
      history.replace(`/sms-template/${res.objectId}`);
    } catch (error) {
      console.log(error);
      toastrErrorAlert(language_vn.error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem
            title={id ? "Chi tiết mẫu tin nhắn" : "Thêm thông tin mẫu tin nhắn"}
          >
            <div className="d-flex align-items-center mb-2">
              <div className="flex-grow-1"></div>
              <Spacer size={12} />
              <CommonButton level={0} type="submit">
                Lưu
              </CommonButton>
            </div>
          </HeaderCreateItem>
          {renderForm()}
        </form>
      </Container>
    </div>
  );
};

export default NewSMSTemplate;
