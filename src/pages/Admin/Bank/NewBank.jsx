import { yupResolver } from "@hookform/resolvers/yup";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import UploadImage from "components/Common/UploadImage";
import InputField from "components/form-control/InputField";
import { checkExistItem, uploadImg } from "helpers/erp_helper";
import { GET_SYSCFG } from "helpers/url_helper";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "reactstrap";
import httpService from "services/httpService";
import * as yup from "yup";

export default function NewBank() {
  const history = useHistory();
  const [image, setImage] = useState([]);
  const [bankDetail, setBankDetail] = useState([]);
  const [banks, setBanks] = useState([]);

  const code = useParams();

  const schema = yup
    .object({
      Name: yup
        .string()
        .required("Vui lòng nhập tên")
        .test("text", "Tên ngân hàng này đã tồn tại", value => {
          if (bankDetail?.Name !== value) {
            return !checkExistItem(banks, "Name", value);
          }
          return true;
        }),
    })
    .required();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(async () => {
    try {
      const params = {
        where: {
          objectId: code.id,
        },
        limit: 1,
      };
      const response = await httpService.get(GET_SYSCFG, { params });
      const resBanks = await httpService.get(GET_SYSCFG, {
        where: {
          Category: "bank",
        },
      });

      if (!response.results.length && code.id !== "new-bank-account") {
        history.push("/pages-404");
        return;
      }
      setBanks(resBanks.results);
      const bankDetail = response.results[0];
      reset({
        ...bankDetail,
      });
      setBankDetail(bankDetail);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSubmit = async value => {
    let thumbnail = [];
    if (image.length !== 0 && !image?.isRemove) {
      const res = await uploadImg(image);
      thumbnail.push(res);
    }
    const newBank = {
      Name: value.Name,
      bankCode: value.bankCode,
      vn_name: value.vn_name,
      en_name: value.en_name,
      napasSupported: value.isNapasSupported,
      Category: "bank",
      ...(thumbnail.length !== 0 && { thumbnail: { ...thumbnail[0] } }),
    };

    if (code.id !== "new-bank-account") {
      try {
        const res = await httpService.put(GET_SYSCFG + `/${code.id}`, newBank);
        if (res?.updatedAt) {
          toastrSuccessAlert("Cập nhật ngân hàng thành công!");
          return;
        }
        toastrErrorAlert("Cập nhật ngân hàng thất bại!");
      } catch (error) {
        toastrErrorAlert("Cập nhật ngân hàng thất bại!");
      }

      return;
    }

    try {
      const res = await httpService.post(GET_SYSCFG, newBank);
      if (res?.createdAt) {
        toastrSuccessAlert("Thêm ngân hàng thành công!");
        history.push(`/bank-account/${res.objectId}`);
        return;
      }
      toastrErrorAlert("Thêm ngân hàng thất bại!");
    } catch (error) {
      toastrErrorAlert("Thêm ngân hàng thất bại!");
    }
  };
  return (
    <div>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderCreateItem title={`Chi tiết ngân hàng `}>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-grow-1"></div>
                <CommonButton level={0} type="submit">
                  Lưu
                </CommonButton>
              </div>
            </HeaderCreateItem>
            <Card body>
              <Row>
                <Col sm={3}>
                  <UploadImage
                    onUploaded={setImage}
                    imgFile={bankDetail?.thumbnail}
                  />
                </Col>
                <Col sm={9}>
                  <Row>
                    <Col>
                      <InputField
                        required
                        label="Tên viết tắt"
                        register={register}
                        errors={errors}
                        name="Name"
                      />
                    </Col>
                    {/* <Col>
                      <InputField
                        label="Bank code"
                        register={register}
                        name="bankCode"
                      />
                    </Col> */}
                  </Row>

                  <Row>
                    <Col>
                      <InputField
                        label="Tên ngân hàng(vn)"
                        register={register}
                        name="vn_name"
                      />
                    </Col>

                    <Col>
                      <InputField
                        label="Tên ngân hàng(en)"
                        register={register}
                        name="en_name"
                      />
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col>
                      <ComponentCheckbox style={{ marginTop: 20 }}>
                        <input
                          type="checkbox"
                          label="subscribed"
                          name="isNapasSupported"
                          id="subscribed"
                          {...register("isNapasSupported")}
                        />
                        <LabelCheckbox
                          for="ubsubscribed"
                          style={{ marginLeft: 5 }}
                        >
                          Is Napas Supported
                        </LabelCheckbox>
                      </ComponentCheckbox>
                    </Col>
                  </Row> */}
                </Col>
              </Row>
            </Card>
          </form>
        </Container>
      </div>
    </div>
  );
}
