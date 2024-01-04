import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Col, Container, Row } from "reactstrap";
import _ from "lodash";
import moment from "moment";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import UploadImage from "components/Common/UploadImage";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import {
  addProduct,
  updateProduct,
} from "redux-toolkit/slices/Stock/productSlice";
import ViewableCommon from "components/Common/ViewableCommon";
import { formatNumber } from "helpers/erp_helper";
import {
  PRODUCT_PAYMENT_DELIVERY,
  PRODUCT_WARRANTY,
} from "constants/dataStock";

const NewProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [productVariant, setProductVariant] = useState([]);

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  useEffect(() => {
    getProductDetail();
  }, [id]);

  const schema = yup
    .object({
      name: yup.string().required("Vui lòng nhập tên sản phẩm!"),
      sellingPrice: yup
        .number()
        .typeError(`Giá bán phải là số!`)
        .nullable()
        .moreThan(0, "Floor area cannot be negative")
        .transform((_, val) =>
          Boolean(val) ? Number(val.replaceAll(".", "")) : null
        )
        .required("Yêu cầu nhập giá bán!"),
      buyingPrice: yup
        .number()
        .typeError(`Giá mua phải là số!`)
        .nullable()
        .moreThan(0, "Floor area cannot be negative")
        .transform((_, val) =>
          Boolean(val) ? Number(val.replaceAll(".", "")) : null
        ),
      otherFee: yup
        .number()
        .typeError(`Phí khác phải là số!`)
        .nullable()
        .moreThan(0, "Floor area cannot be negative")
        .transform((_, val) =>
          Boolean(val) ? Number(val.replaceAll(".", "")) : null
        ),
      serviceFee: yup
        .number()
        .typeError(`Tiền công phải là số!`)
        .nullable()
        .transform((_, val) =>
          Boolean(val) ? Number(val.replaceAll(".", "")) : null
        ),
      brand: yup.lazy(value =>
        typeof value === "object"
          ? yup
              .object()
              .nullable()
              .transform((_, val) =>
                val?.text
                  ? {
                      ...val,
                      __type: "Pointer",
                      className: "Brand",
                    }
                  : null
              )
          : yup.string()
      ),
      category: yup.lazy(value =>
        typeof value === "object"
          ? yup
              .object()
              .nullable()
              .transform((_, val) =>
                val?.text
                  ? {
                      ...val,
                      __type: "Pointer",
                      className: "Category",
                    }
                  : null
              )
              .required("Vui lòng chọn danh mục!")
          : yup.string().required("Vui lòng chọn danh mục!")
      ),
      vendor: yup.lazy(value =>
        typeof value === "object"
          ? yup
              .object()
              .nullable()
              .transform((_, val) =>
                val?.text
                  ? {
                      ...val,
                      __type: "Pointer",
                      className: "Vendor",
                    }
                  : null
              )
          : yup.string()
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
      isAllowedSaving: false,
    },
    resolver: yupResolver(schema),
  });

  const { renderForm, uploadImg } = useGetFormSchema(
    "Product",
    yup,
    rest,
    errors,
    false
  );

  const getProductDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `/parse/classes/Product/${id}?include=["brand","category","vendor"]`
    );
    const productVariant = await httpService.get(
      `/parse/classes/ProductProductVariance?where={"product": {"__type":"Pointer", "className": "Product","objectId": "${id}"}}`
    );
    setProductVariant(productVariant.results.map(item => item.objectId));

    if (!res) {
      history.replace("/product");
      toastrErrorAlert("Product not found!");
      return;
    }

    const { reset } = rest;
    setImage(res.image);
    setProductDetail(res);
    reset({
      ...res,
      createdAt: moment(res.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(res.updatedAt).format("YYYY-MM-DD"),
      sellingPrice: res?.sellingPrice ? formatNumber(res.sellingPrice) : "",
      buyingPrice: res?.buyingPrice ? formatNumber(res.buyingPrice) : "",
      otherFee: res?.otherFee ? formatNumber(res.otherFee) : "",
      serviceFee: res?.serviceFee ? formatNumber(res.serviceFee) : "",
      brand: res?.brand
        ? {
            text: res.brand.name,
            objectId: res.brand.objectId,
            className: "Brand",
            __type: "Pointer",
          }
        : { text: "" },
      vendor: res?.vendor
        ? {
            text: res.vendor.name,
            objectId: res.vendor.objectId,
            className: "Vendor",
            __type: "Pointer",
          }
        : { text: "" },
      category: res?.category
        ? {
            text: res.category.name,
            objectId: res.category.objectId,
            className: "Category",
            __type: "Pointer",
          }
        : { text: "" },
      color:
        (res?.attributes?.length && res?.attributes[0]?.color) ||
        res.color ||
        "",
    });
  };

  const onSubmit = async values => {
    const { createdAt, updatedAt, barcode, ...productValues } = values;
    const image = await uploadImg(productValues.image);

    let attributes = [];

    if (productValues?.color) {
      attributes.push({ color: productValues.color });
    }
    if (productValues?.brand?.text) {
      attributes.push({
        brand: productValues.brand.text,
      });
    }
    if (
      productValues?.goldWeight !== null &&
      productValues?.goldWeight !== undefined
    ) {
      attributes.push({
        goldWeight: productValues.goldWeight + "g",
      });
    }

    const product = {
      ...productValues,
      warranty: PRODUCT_WARRANTY,
      paymentDelivery: PRODUCT_PAYMENT_DELIVERY,
      image,
      description: productValues?.description || undefined,
      attributes: attributes.length ? attributes : undefined,
      totalWeight: Number(productValues.totalWeight),
      goldWeight: Number(productValues.goldWeight),
      stoneWeight: Number(productValues.stoneWeight),
    };

    if (id) {
      dispatch(updateProduct({ dataItem: product, dataId: id }));
      return;
    }

    const res = await dispatch(addProduct(product));
    history.replace(`/product/${res.payload.objectId}`);
  };

  const handlePrintBarcode = async () => {
    httpService.post(`/parse/functions/print-barcode`, {
      products: [id],
      variances: productVariant,
    });
  };

  const includeFunctions = {
    totalWeight: {
      onFocus: async () => {
        const { setValue, getValues } = rest;

        if (getValues("totalWeight")) return;

        const url = "/parse/classes/GoldWeight";
        const response = await httpService.get(url);
        const weightData = response.results[0];
        const updatedAt = new Date(weightData.updatedAt);
        const diffMs = Date.now() - updatedAt;
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        if (diffMins < 10) {
          setValue("totalWeight", (weightData.value * 10).toFixed(3));
        }
      },
      onChange: _.debounce(e => {
        const { getValues, setValue } = rest;
        const totalWeight = e.target.value;
        const stoneWeight = getValues("stoneWeight") || 0;
        const goldWeight = (totalWeight - stoneWeight).toFixed(3);
        setValue("goldWeight", goldWeight && Number(goldWeight));
        setValue("totalWeight", totalWeight && Number(totalWeight));
      }, 1000),
    },
    stoneWeight: {
      onChange: _.debounce(e => {
        const { getValues, setValue } = rest;
        const stoneWeight = Number(e.target.value);
        const totalWeight = Number(getValues("totalWeight")) || 0;

        if (stoneWeight > totalWeight) {
          setValue("stoneWeight", 0);
          setValue("goldWeight", 0);
          return;
        }

        const goldWeight = (totalWeight - stoneWeight).toFixed(3);
        setValue("goldWeight", goldWeight);
        setValue("stoneWeight", stoneWeight);
      }, 1000),
    },
    goldType: {
      onChange: async e => {
        const { setValue } = rest;
        const goldType = e.target.value;
        const res = await httpService.get(
          '/parse/classes/SysCfg?where={"name": "gold-pos-final"}'
        );
        const goldPosValue = res.results[0].valueObj;
        const otherFee = goldPosValue[goldType].otherFee;
        const buyingPrice = goldPosValue[goldType].buying;
        const profit = goldPosValue.profit[goldType] || 0;
        const sellingPrice = buyingPrice + buyingPrice * profit;
        setValue("sellingPrice", formatNumber(sellingPrice));
        setValue("buyingPrice", formatNumber(buyingPrice));
        setValue("otherFee", otherFee > 0 ? formatNumber(otherFee) : 0);
      },
    },
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem
            title={productDetail ? productDetail?.productId : "Thêm Sản Phẩm"}
          >
            <div className="d-flex" style={{ gap: 8 }}>
              <ViewableCommon
                if={() => id}
                caseTrue={
                  <CommonButton
                    level={1}
                    type="button"
                    onClick={handlePrintBarcode}
                  >
                    In Barcode
                  </CommonButton>
                }
              />
              <CommonButton level={0}>Save</CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>
              <Col xs={4}>
                <UploadImage
                  onUploaded={file => {
                    rest.setValue("image", file);
                    setImage(file);
                  }}
                  imgFile={image}
                />
              </Col>
              <Col xs={8}>{renderForm(excludeFields, includeFunctions)}</Col>
            </Row>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default NewProduct;
