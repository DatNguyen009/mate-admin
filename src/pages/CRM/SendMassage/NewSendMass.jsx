import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";

import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import httpService from "services/httpService";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import Spacer from "components/Common/Spacing";
import _ from "lodash";
import { language_vn } from "helpers/language_vn";
import { GET_SEND_MASS } from "helpers/url_helper";
import InputField from "components/form-control/InputField";
import TextareaField from "components/form-control/Textarea";
import { CommonText } from "components/Common/TextCommon";
import Table from "components/form-control/Table";

const HEADERS_TABLE_SEND_OPTION = [
  {
    text: "Số điện thoại",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `tb_SendOption.${indexOfRow}.phoneNumber`,
      type: "string",
    }),
  },
];

const DEFAULT_ROW_VALUE = {};

const NewSendMass = () => {
  const [templateSelected, setTemplateSelected] = useState({});
  const [typeSelected, setTypeSelected] = useState("sendBulk");
  const { id } = useParams();
  const history = useHistory();
  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  useEffect(() => {
    getSendMassDetail();
  }, [id]);

  const schema = yup
    .object({
      scheduledSendAt: yup
        .date()
        .min(new Date(), "Vui lòng nhập ngày giờ lớn hơn hiện tại"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      scheduledSendAt: moment().add("minute", 1).format("YYYY-MM-DD HH:mm"),
      status: "scheduled",
      type: "sendBulk",
    },
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("SendMass", yup, rest, errors);

  const includeFunctions = {
    template: {
      onSelect: e => {
        if (!e) {
          return;
        }
        const { setValue } = rest;
        setTemplateSelected(e);
        setValue("name", e.title);
        setValue("templateSms", e.smsContent);
      },
    },
    type: {
      onChange: e => {
        setTypeSelected(e.target.value);
      },
    },
  };

  const getSendMassDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `${GET_SEND_MASS}/${id}?include=["template"]`
    );
    if (!res) {
      history.replace("/send-mass");
      toastrErrorAlert("Chi tiết hẹn ngày đặt lịch không tìm thấy!");
      return;
    }
    const { reset } = rest;
    setTemplateSelected(res?.template);
    setTypeSelected(res?.type);

    reset({
      ...res,
      smsTemplate: res?.template
        ? {
            text: res.template.title,
            objectId: res.template.objectId,
            className: "NotificationTemplate",
            __type: "Pointer",
          }
        : { text: "" },
      template: res?.template
        ? {
            text: res.template.title,
            objectId: res.template.objectId,
            className: "NotificationTemplate",
            __type: "Pointer",
          }
        : { text: "" },
      scheduledSendAt: moment(res.scheduledSendAt?.iso).format(
        "YYYY-MM-DD HH:mm"
      ),
      name: res?.template?.title,
      templateSms: res?.template?.smsContent,
    });

    rest.setValue(
      "tb_SendOption",
      res?.phoneNumbers?.map(item => {
        return {
          phoneNumber: item,
        };
      }) || []
    );
  };

  const onSubmit = async values => {
    const {
      createdAt,
      updatedAt,
      name,
      templateSms,
      smsTemplate,
      tb_SendOption,
      ...leadValues
    } = values;
    if (rest.getValues("scheduledSendAt"))
      if (typeSelected === "sendOption") {
        if (!values?.tb_SendOption.length) {
          toastrErrorAlert("Vui lòng nhập số điện thoại!!!");
          return;
        }

        const tbSendOptionFilter = values?.tb_SendOption.filter(
          item => item.phoneNumber !== ""
        );

        if (!tbSendOptionFilter.length) {
          toastrErrorAlert("Thông tin số điện thoại không được để trống");
          return;
        }
      }

    const newSendMass = {
      ...leadValues,
      template: {
        objectId: values?.smsTemplate?.objectId,
        className: "NotificationTemplate",
        __type: "Pointer",
      },
      scheduledSendAt: {
        iso: values.scheduledSendAt,
        __type: "Date",
      },
      ...(values.type === "sendOption" && {
        phoneNumbers: tb_SendOption?.map(item => item?.phoneNumber),
      }),
    };

    try {
      if (id) {
        const response = await httpService.put(
          GET_SEND_MASS + `/${id}`,
          newSendMass
        );

        if (response?.updatedAt) {
          toastrSuccessAlert("Cập nhật thành công!!");
          return;
        }
        toastrErrorAlert(language_vn.error);
        return;
      }
      const response = await httpService.post(GET_SEND_MASS, newSendMass);
      if (response?.createdAt) {
        toastrSuccessAlert("Tạo hẹn ngày gửi tin nhắn thành công!!");
        history.replace(`/send-mass/${response.objectId}`);
        return;
      }
      toastrErrorAlert(language_vn.error);
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem
            title={id ? "Chi tiết gửi tin nhắn" : "Thêm gửi tin nhắn"}
          >
            <div className="d-flex align-items-center mb-2">
              <Spacer size={12} />
              <CommonButton level={0} type="submit">
                Lưu
              </CommonButton>
            </div>
          </HeaderCreateItem>
          {renderForm(excludeFields, includeFunctions)}
        </form>
        {typeSelected === "sendOption" && (
          <Card body>
            <Row>
              <Col sm={12}>
                <Table
                  headers={HEADERS_TABLE_SEND_OPTION}
                  defaultRowValue={DEFAULT_ROW_VALUE}
                  formProps={{
                    errors,
                    ...rest,
                  }}
                  name="tb_SendOption"
                />
              </Col>
            </Row>
          </Card>
        )}
        {templateSelected?.objectId && (
          <Card body>
            <CommonText level={1}>Chi tiết mẫu tin nhắn</CommonText>
            <Row>
              <Col>
                <InputField label="Tên chủ đề" {...rest} readOnly name="name" />
              </Col>
              <Col>
                <TextareaField
                  label="Mẫu tin nhắn"
                  {...rest}
                  readOnly
                  name="templateSms"
                />
              </Col>
            </Row>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default NewSendMass;
