import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, Container, Row } from "reactstrap";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import { GET_TWEETS } from "helpers/url_helper";
import { message } from "antd";
import moment from "moment";

const TweetsDetail = () => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getTweetsDetail();
  }, [id]);

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
  });

  const { renderForm } = useGetFormSchema("Tweet", yup, rest, errors, false);

  const getTweetsDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `${GET_TWEETS}/${id}?include=["userInfo"]`
    );

    if (!res) {
      history.replace("/tweet");
      toastrErrorAlert("Không tìm thấy bài đăng!");
      return;
    }

    const { reset } = rest;
    reset({
      ...res,
      userInfo: res?.userInfo
        ? {
            text: res.userInfo.fullName,
            objectId: res.userInfo.objectId,
            className: "UserInfo",
            __type: "Pointer",
          }
        : { text: "" },
    });
  };

  const onSubmit = async data => {
    if (id && id !== "new-tweets") {
      try {
        await httpService.put(GET_TWEETS + `/${id}`, {
          isBlocked: data?.isBlocked,
        });
        message.success("Cập nhật thành công!!");
        return;
      } catch (error) {
        message.error("Cập nhật không thành công. Vui lòng thử lại sau!");
      }

      return;
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={"Chi tiết bài đăng"}>
            <div className="d-flex" style={{ gap: 8 }}>
              <CommonButton level={0}>Block</CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>{renderForm()}</Row>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default TweetsDetail;
