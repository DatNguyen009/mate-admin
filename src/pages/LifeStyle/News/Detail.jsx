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
import { GET_CATEGORY, GET_NEWS } from "helpers/url_helper";
import { message } from "antd";
import moment from "moment";
import VVSSelect from "components/form-control/VVSSelect";

const NewsDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const [categorySelected, setCategorySelected] = useState({});

  useEffect(() => {
    getNewsDetail();
  }, [id]);

  const schema = yup
    .object({
      url: yup.string().required("Vui lòng không để trống!"),
      title: yup.string().required("Vui lòng không để trống!"),
      thumbnailUrl: yup.string().required("Vui lòng không để trống!"),
      publishDate: yup.string().required("Vui lòng không để trống!"),
      groupId: yup.string().required("Vui lòng không để trống!"),
    })
    .required();
  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("News", yup, rest, errors, false);

  const getNewsDetail = async () => {
    if (!id) return;

    const res = await httpService.get(`${GET_NEWS}/${id}`);

    if (!res) {
      history.replace("/news");
      toastrErrorAlert("Không tìm thấy tin tức!");
      return;
    }

    const category = await httpService.get(`${GET_CATEGORY}`, {
      params: {
        where: {
          ...(res?.groupId && {
            categoryId: res?.groupId,
            type: "news",
          }),
        },
      },
    });

    const { reset } = rest;
    setCategorySelected(category?.results?.length && category?.results[0]);
    reset({
      ...res,
      publishDate: res?.publishDate?.iso
        ? moment(res?.publishDate?.iso || "").format("YYYY-MM-DD")
        : "",
      groupId:
        (category?.results?.length && category?.results[0]?.subject) || "",
    });
  };

  const handleCategorySelected = item => {
    setCategorySelected(item);
  };

  const onSubmit = async values => {
    const { createdAt, updatedAt, objectId, ...newsValues } = values;

    const body = {
      ...newsValues,
      publishDate: {
        iso: values?.publishDate,
        __type: "Date",
      },
      groupId: categorySelected?.categoryId,
    };

    if (id && id !== "new-news") {
      try {
        await httpService.put(GET_NEWS + `/${id}`, body);
        message.success("Cập nhật tin tức thành công!!");
        return;
      } catch (error) {
        message.error(
          "Cập nhật tin tức không thành công. Vui lòng thử lại sau!"
        );
      }

      return;
    }

    try {
      const res = await httpService.post(GET_NEWS, body);
      message.success("Tạo tin tức thành công!!");
      history.replace(`/news/${res.objectId}`);
    } catch (error) {
      message.error("Tạo tin tức không thành công. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={"Tin tức"}>
            <div className="d-flex" style={{ gap: 8 }}>
              <CommonButton level={0}>Lưu</CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>
              <Col>{renderForm()}</Col>
            </Row>
            <Row>
              <VVSSelect
                label="Chọn loại tin tức"
                name="groupId"
                required
                errors={errors}
                model="Category"
                searchField="subject"
                fieldView={["subject"]}
                conditionField={{
                  type: "news",
                }}
                onSelect={handleCategorySelected}
                {...rest}
                style={{ padding: 0, margin: 0 }}
              />
            </Row>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default NewsDetail;
