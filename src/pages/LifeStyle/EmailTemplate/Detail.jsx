import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Col, Container, Row } from "reactstrap";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import { GET_EMAIL_TEMPLATE } from "helpers/url_helper";
import { Tabs, message } from "antd";
import TextareaField from "components/form-control/Textarea";
import Notes from "components/Projects/CardCollapse/Notes";
import { CommonText } from "components/Common/TextCommon";

const items = [
  {
    key: "vi",
    label: "VI",
    children: null,
  },
  {
    key: "en",
    label: "EN",
    children: null,
  },
  {
    key: "zh",
    label: "ZH",
    children: null,
  },
];

const EmailTemplateDetail = () => {
  const history = useHistory();
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [defaultTab, setDefaultTab] = useState("vi");

  useEffect(() => {
    getEmailTemplateDetail();
  }, [id, defaultTab]);

  const schema = yup.object({}).required();
  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getEmailTemplateDetail = async () => {
    if (!id) return;

    const res = await httpService.get(`${GET_EMAIL_TEMPLATE}/${id}`);

    if (!res) {
      history.replace("/email-template");
      toastrErrorAlert("Không tìm thấy email template!");
      return;
    }

    const { reset } = rest;

    reset({
      ...res,
      subjects: res?.subject[defaultTab] || "",
    });
    setContent(res?.text[defaultTab] || "");
  };

  const onSubmit = async () => {
    const { subjects, subject, text } = rest.getValues();

    if (id && id !== "new-email-template") {
      try {
        await httpService.put(GET_EMAIL_TEMPLATE + `/${id}`, {
          subject: { ...subject, [defaultTab]: subjects },
          text,
        });
        message.success("Cập nhật email template thành công!!");
        return;
      } catch (error) {
        message.error(
          "Cập nhật email template không thành công. Vui lòng thử lại sau!"
        );
      }

      return;
    }
  };

  const onChange = key => {
    setDefaultTab(key);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={"Email template"}>
            <div className="d-flex" style={{ gap: 8 }}>
              <CommonButton level={0}>Lưu</CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <CommonText level={1}>{rest.getValues("description")}</CommonText>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <Row>
              <Col sm={12}>
                <TextareaField
                  label="Tiêu đề"
                  name="subjects"
                  {...rest}
                  rows={1}
                />
              </Col>
              <Col sm={12}>
                {content && (
                  <Notes
                    label={"Nội dung"}
                    onChangeTextEditor={value => {
                      rest.setValue("text", {
                        ...rest.getValues("text"),
                        [defaultTab]: value(),
                      });
                    }}
                    content={content}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "remove",
                        "history",
                      ],
                    }}
                  />
                )}
              </Col>
            </Row>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default EmailTemplateDetail;
