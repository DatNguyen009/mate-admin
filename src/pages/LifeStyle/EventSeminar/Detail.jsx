import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, Col, Container, Row } from "reactstrap";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import httpService from "services/httpService";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import {
  GET_CATEGORY,
  GET_DISTRICT,
  GET_PROVINCE,
  GET_SEMINAR,
  GET_WARD,
} from "helpers/url_helper";
import { message } from "antd";
import moment from "moment";
import InputField from "components/form-control/InputField";
import { CommonText } from "components/Common/TextCommon";
import VVSTable from "components/form-control/VVSTable";

const SeminarDetail = () => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getSeminarDetail();
  }, [id]);

  const schema = yup.object({}).required();
  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Seminar", yup, rest, errors, false);

  const getSeminarDetail = async () => {
    if (!id) return;

    const res = await httpService.get(`${GET_SEMINAR}/${id}?include="owner"`);

    if (!res) {
      history.replace("/event-seminar");
      toastrErrorAlert("Không tìm thấy sự kiện - tin tức!");
      return;
    }

    const { reset } = rest;

    const [
      { results: province },
      { results: district },
      { results: ward },
      { results: category },
    ] = await Promise.all([
      httpService.get(`${GET_PROVINCE}`, {
        params: {
          where: { ...(res?.provinceId && { provinceId: res?.provinceId }) },
        },
      }),
      httpService.get(`${GET_DISTRICT}`, {
        params: {
          where: {
            ...(res?.provinceId && { provinceId: res?.provinceId }),
            ...(res?.districtId && { districtId: res?.districtId }),
          },
        },
      }),
      httpService.get(`${GET_WARD}`, {
        params: {
          where: {
            ...(res?.districtId && { districtId: res?.districtId }),
            ...(res?.wardId && { wardId: res?.wardId }),
          },
        },
      }),
      httpService.get(`${GET_CATEGORY}`, {
        params: {
          where: {
            ...(res?.categoryId && {
              categoryId: res?.categoryId,
              type: "job",
            }),
          },
        },
      }),
    ]);

    reset({
      ...res,
      from: moment(res.from?.iso).format("YYYY-MM-DD HH:mm"),
      to: moment(res.to?.iso).format("YYYY-MM-DD HH:mm"),
      owner: res?.owner
        ? {
            text: res.owner.fullName,
            objectId: res.owner.objectId,
            className: "UserInfo",
            __type: "Pointer",
          }
        : { text: "" },
      address: `${res?.address} ${ward?.length && ward[0]?.name} ${
        district?.length && district[0]?.name
      } ${province?.length && province[0]?.name}`,
      categoryId: category?.length && category[0]?.subject,
    });
  };

  const onSubmit = async values => {
    if (id) {
      try {
        await httpService.put(GET_SEMINAR + `/${id}`, {
          approvalStatus: values?.approvalStatus,
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
          <HeaderCreateItem title={"Sự kiện - Hội thảo"}>
            <div className="d-flex" style={{ gap: 8 }}>
              <CommonButton level={0}>Lưu</CommonButton>
            </div>
          </HeaderCreateItem>
          <Card body>
            <Row>{renderForm()}</Row>
          </Card>
          <Card body>
            <Row>
              <Col sm={12}>
                <InputField
                  label="Địa chỉ"
                  name="address"
                  {...rest}
                  disabled={true}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <CommonText level={1} className="mt-4">
                  Danh sách người tham gia{" "}
                </CommonText>
                <VVSTable
                  name="SeminarRegistration"
                  disableAdd
                  disableDelete
                  disableSearch
                  whereQuery={{
                    seminar: {
                      objectId: id,
                      className: "Seminar",
                      __type: "Pointer",
                    },
                  }}
                  className="m-0 p-0 shadow-none"
                />
              </Col>
            </Row>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default SeminarDetail;
