import React, { useEffect } from "react";
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
import { toastrErrorAlert } from "components/Common/AlertToastr";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import {
  addCategory,
  updateCategory,
} from "redux-toolkit/slices/CMS/CategorySlice";

const NewProductCategory = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductCategoryDetail();
  }, [id]);

  const schema = yup
    .object({
      name: yup.string().required("This field is required!"),
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
      name: "",
    },
    resolver: yupResolver(schema),
  });

  const { renderForm, uploadImg } = useGetFormSchema(
    "Category",
    yup,
    rest,
    errors
  );

  const getProductCategoryDetail = async () => {
    if (!id) return;

    const res = await httpService.get(`/parse/classes/Category/${id}`);

    if (!res) {
      history.replace("/product-category");
      toastrErrorAlert("Product Category not found!");
      return;
    }

    const { reset } = rest;
    reset({
      ...res,
      createdAt: moment(res.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(res.updatedAt).format("YYYY-MM-DD"),
    });
  };

  const onSubmit = async values => {
    const { createdAt, updatedAt, ...productCategoryValues } = values;
    const image = await uploadImg(productCategoryValues.image);
    const productCategory = { ...productCategoryValues, image };

    if (id) {
      dispatch(updateCategory({ dataItem: productCategory, dataId: id }));
      return;
    }

    const res = await dispatch(addCategory(productCategory));
    history.replace(`/product-category/${res.payload.objectId}`);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Add / Edit Product Category">
            <CommonButton level={0} type="submit">
              Save
            </CommonButton>
          </HeaderCreateItem>
          {renderForm()}
        </form>
      </Container>
    </div>
  );
};

export default NewProductCategory;
