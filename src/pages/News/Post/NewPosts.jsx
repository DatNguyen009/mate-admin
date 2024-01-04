import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import { addPosts, updatePosts } from "redux-toolkit/slices/CMS/PostsSlice";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { CommonText } from "components/Common/TextCommon";

const NewPosts = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getPostDetail();
  }, []);

  const schema = yup
    .object({
      title: yup.string().required("This field is required!"),
      category: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val ? { __type: "Pointer", className: "SysCfg", objectId: val } : null
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
      status: "Draft",
    },
    resolver: yupResolver(schema),
  });

  const { renderForm, content, getContent, uploadImg } = useGetFormSchema(
    "Post",
    yup,
    rest,
    errors
  );

  const getPostDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `/parse/classes/Post/${id}?include=["category"]`
    );

    if (!res) {
      history.replace("/post");
      toastrErrorAlert("Post not found!");
      return;
    }

    const { reset, setValue } = rest;
    reset({ ...res });
    setTimeout(
      () => setValue("category", res?.category ? res.category.objectId : ""),
      100
    );
    getContent(res);
  };

  const onSubmit = async values => {
    const { createdAt, updatedAt, ...postValues } = values;
    const thumbnail = await uploadImg(postValues.thumbnail);

    const { objectId } = await httpService.get("/parse/users/me");
    const post = {
      ...postValues,
      content,
      thumbnail,
      createdBy: { __type: "Pointer", className: "_User", objectId },
    };

    if (id) {
      dispatch(updatePosts({ dataItem: post, dataId: post.objectId }));
      return;
    }

    const res = await dispatch(addPosts(post));
    history.replace(`/post/${res.payload.objectId}`);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / chỉnh sửa bài viết">
            <CommonButton level={0} type="submit">
              Lưu
            </CommonButton>
          </HeaderCreateItem>
          {renderForm()}
          <Row>
            <CommonText className="text-danger">Chú ý:</CommonText>
            <CommonText>
              Hiển thị bài viết trong trang chủ: có thể chọn nhiều bài viết
            </CommonText>
            <CommonText>Bài viết nổi bật: chọn 1 bài viết duy nhất</CommonText>
            <CommonText>
              Hiển thị popup ở trang chủ: chọn 1 bài viết duy nhất
            </CommonText>
          </Row>
        </form>
      </Container>
    </div>
  );
};

export default NewPosts;
