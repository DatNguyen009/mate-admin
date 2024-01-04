import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Col, Container, ModalBody, ModalFooter, Row } from "reactstrap";
import * as yup from "yup";
import { Steps } from "antd";
import "antd/dist/antd.css";

import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonText } from "components/Common/TextCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { GET_OPPORTUNITY, GET_SYSCFG } from "helpers/url_helper";
import httpService from "services/httpService";
import Spacer from "components/Common/Spacing";
import { language_vn } from "helpers/language_vn";
import InputField from "components/form-control/InputField";
import ViewableCommon from "components/Common/ViewableCommon";
import VVSTable from "components/form-control/VVSTable";
import ModalCommon from "components/Common/ModalCommon";
import VVSAddress2 from "components/Common/VVSAddress2";
import TextareaField from "components/form-control/Textarea";
import { useDispatch } from "react-redux";
import {
  addAppointmentV2,
  fetchAppointments,
} from "redux-toolkit/slices/CRM/AppointmentSlice";
import { formatNumber } from "helpers/erp_helper";

export default function NewOpportunity() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  const [stageOpportunity, setStageOpportunity] = useState([]);
  const [indexStage, setIndexStage] = useState(0);
  const [sourceSelected, setSourceSelected] = useState("");
  const [includeFunctions, setIncludeFunctions] = useState({
    source: {
      onChange: e => {
        setSourceSelected(e.target.value);
      },
    },
    type: {
      onChange: e => {
        const test = e.target.value;
      },
    },
    stage: {
      onChange: e => {
        const stageSelected = e.target.value;
        const index = stageOpportunity.findIndex(
          item => item.text === stageSelected
        );
        setIndexStage(index);
      },
    },
  });
  const [opportunityDetail, setOpportunityDetail] = useState({});
  const [isModalAppointment, setIsModalAppointment] = useState(false);
  const [address, setAddress] = useState({});
  const [
    reRenderAppointmentCustomerTable,
    setReRenderAppointmentCustomerTable,
  ] = useState(false);

  const schema = yup
    .object({
      name: yup.string().required("Trường này bắt buộc!"),
      client:
        (sourceSelected === "customer" || sourceSelected === "") &&
        yup
          .object()
          .nullable()
          .transform((_, val) =>
            val?.objectId
              ? {
                  __type: "Pointer",
                  className: "Customer",
                  objectId: val.objectId,
                }
              : undefined
          )
          .required("Trường này bắt buộc!"),

      lead:
        sourceSelected === "lead" &&
        yup
          .object()
          .nullable()
          .transform((_, val) =>
            val?.objectId
              ? {
                  __type: "Pointer",
                  className: "Lead",
                  objectId: val.objectId,
                }
              : undefined
          )
          .required("Trường này bắt buộc!"),

      stage: yup.string().required("Trường này bắt buộc!"),

      productCategory: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Product",
                objectId: val.objectId,
              }
            : undefined
        )
        .required("Trường này bắt buộc!"),

      price: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`DS bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),

      endDate: yup
        .object()
        .nullable()
        .required("Trường này bắt buộc")
        .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),

      successRate: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`DS bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),

      campaign: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Campaign",
                objectId: val.objectId,
              }
            : undefined
        )
        .required("Trường này bắt buộc!"),

      project: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Project",
                objectId: val.objectId,
              }
            : undefined
        )
        .required("Trường này bắt buộc!"),

      expectedSales: yup.lazy(value =>
        typeof value === "string"
          ? yup
              .string()
              .transform((_, val) => val && Number(val.replaceAll(".", "")))
              .required("Trường này bắt buộc")
          : yup
              .number()
              .typeError(`DS bắt buộc phải là số!`)
              .nullable()
              .moreThan(0, "Floor area cannot be negative")
      ),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      source: "customer",
      stage: "Mở đầu",
    },
  });

  const { renderForm } = useGetFormSchema("Opportunity", yup, rest, errors);
  useEffect(() => {
    if (location.state?.lead?.objectId) {
      rest.setValue("source", "lead");
      setSourceSelected("lead");
      setTimeout(() => {
        rest.setValue("lead", {
          text: location.state.lead?.name,
          objectId: location.state.lead.objectId,
          className: "Lead",
          __type: "Pointer",
        });
      }, 500);
    }
    getAPI();
  }, []);
  useEffect(() => {
    if (sourceSelected === "lead") {
      const includeCopie = { ...includeFunctions };
      delete includeCopie.lead;
      setIncludeFunctions({
        ...includeCopie,
        client: {
          name: "lead",
          model: "Lead",
        },
      });
      rest.setValue("lead.text", "");
      return;
    }
    if (sourceSelected === "customer") {
      setIncludeFunctions(prev => ({
        source: {
          onChange: e => {
            setSourceSelected(e.target.value);
          },
        },
        type: {
          onChange: e => {
            const test = e.target.value;
          },
        },
        stage: {
          onChange: e => {
            const stageSelected = e.target.value;
            const index = stageOpportunity.findIndex(
              item => item.text === stageSelected
            );
            setIndexStage(index);
          },
        },
        lead: {
          name: "client",
          model: "Customer",
        },
      }));
      rest.setValue("client.text", "");
      return;
    }
  }, [sourceSelected]);

  const getAPI = async () => {
    if (!id) return;
    try {
      const params = {
        where: {
          Code: "stageOpportunity",
        },
      };
      const res = await httpService.get(
        `${GET_OPPORTUNITY}/${id}?include=["productCategory", "client", "campaign", "project", "lead"]`
      );
      if (res?.client) setSourceSelected("customer");
      if (res?.lead) setSourceSelected("lead");
      setOpportunityDetail(res);
      const resSysCfg = await httpService.get(GET_SYSCFG, { params });
      setStageOpportunity(resSysCfg.results[0]?.Values);

      const { reset } = rest;

      resSysCfg.results[0]?.Values.forEach((item, index) => {
        if (item.text === res?.stage) {
          setIndexStage(index);
          return;
        }
      });

      reset({
        ...res,
        endDate: res.endDate?.iso ? moment(res.endDate?.iso) : "",
        price: formatNumber(res.price),
        expectedSales: formatNumber(res.expectedSales),
        productCategory: res?.productCategory
          ? {
              text: res.productCategory?.name,
              objectId: res.productCategory.objectId,
              className: "Product",
              __type: "Pointer",
            }
          : { text: "" },
        client: res?.client
          ? {
              text: res.client?.fullName,
              objectId: res.client.objectId,
              className: "Customer",
              __type: "Pointer",
            }
          : { text: "" },
        lead: res?.lead
          ? {
              text: res.lead?.name,
              objectId: res.lead.objectId,
              className: "Customer",
              __type: "Pointer",
            }
          : { text: "" },

        campaign: res?.campaign
          ? {
              text: res.campaign?.name,
              objectId: res.campaign.objectId,
              className: "Campaign",
              __type: "Pointer",
            }
          : { text: "" },

        project: res?.project
          ? {
              text: res.project?.name,
              objectId: res.project.objectId,
              className: "Project",
              __type: "Pointer",
            }
          : { text: "" },
      });
    } catch (error) {
      history.replace("/opportunity");
      toastrErrorAlert("Opportunity not found!");
      return;
    }
  };

  const openModalAppointment = () => {
    setIsModalAppointment(prev => !prev);
  };

  const onSubmit = async value => {
    const { createdAt, updatedAt, client, lead, tb_order, ...opportunity } =
      value;

    const newOpportunity = {
      ...opportunity,
      ...((sourceSelected === "" || sourceSelected === "customer") && {
        client,
        lead: null,
      }),
      ...(sourceSelected === "lead" && {
        client: null,
        lead,
      }),
    };

    if (id) {
      try {
        const res = await httpService.put(
          GET_OPPORTUNITY + `/${id}`,
          newOpportunity
        );
        if (res?.updatedAt) {
          toastrSuccessAlert("Cập nhật cơ hội thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      } catch (error) {
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      }
      return;
    }
    try {
      const res = await httpService.post(GET_OPPORTUNITY, newOpportunity);
      if (res?.createdAt) {
        toastrSuccessAlert("Tạo cơ hội thành công!!");
        history.replace(`/opportunity/${res.objectId}`);
        return;
      }
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    } catch (error) {
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    }
  };

  const handleCreateAppointment = async () => {
    const { getValues, setValue } = rest;
    const newAppointment = {
      scheduledTime: {
        iso: new Date(getValues("scheduledTime")),
        __type: "Date",
      },
      province: getValues("province"),
      district: getValues("district"),
      ward: getValues("ward"),
      address: getValues("address"),
      note: getValues("noteAppointment"),
      ...(opportunityDetail?.lead && {
        lead: {
          objectId: opportunityDetail.lead.objectId,
          className: "Lead",
          __type: "Pointer",
        },
      }),
      ...(opportunityDetail?.client && {
        client: {
          objectId: opportunityDetail.client.objectId,
          className: "Customer",
          __type: "Pointer",
        },
      }),
    };

    if (
      !getValues("scheduledTime") ||
      !getValues("province") ||
      !getValues("district") ||
      !getValues("ward") ||
      !getValues("address")
    ) {
      toastrErrorAlert(
        !getValues("scheduledTime")
          ? "Vui lòng nhập thời gian hẹn"
          : !getValues("province")
          ? "Vui lòng nhập tỉnh thành phố"
          : !getValues("district")
          ? "Vui lòng nhập quận huyện"
          : !getValues("ward")
          ? "Vui lòng nhập phường xã"
          : !getValues("address") && "Vui lòng nhập địa chỉ chi tiết"
      );
      return;
    }

    const res = await dispatch(
      addAppointmentV2({
        data: newAppointment,
        refresh: fetchAppointments,
      })
    );

    if (res.payload?.objectId) {
      setReRenderAppointmentCustomerTable(prev => !prev);
    }

    openModalAppointment();
    setValue("scheduledTime", "");
    setValue("province", "");
    setValue("district", "");
    setValue("ward", "");
    setValue("address", "");
    setValue("noteAppointment", "");
  };
  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / Sửa Cơ hội">
            <div className="d-flex align-items-center mb-2">
              <ViewableCommon
                if={() => id}
                caseTrue={
                  <>
                    <CommonButton
                      level={1}
                      type="button"
                      onClick={openModalAppointment}
                    >
                      {language_vn.makeAppointment}
                    </CommonButton>
                    <Spacer size={12} />
                    <CommonButton
                      level={0}
                      type="button"
                      onClick={() => {
                        history.push("/quote/new-quote", {
                          opportunity: opportunityDetail,
                        });
                      }}
                    >
                      Tạo báo giá
                    </CommonButton>
                  </>
                }
              />
              <Spacer size={12} />
              <CommonButton level={0}>{language_vn.save}</CommonButton>
            </div>
          </HeaderCreateItem>

          <Steps
            size="small"
            current={indexStage}
            labelPlacement="vertical"
            items={stageOpportunity.map(item => {
              return { title: item.text };
            })}
          />

          <Spacer size={20} />

          <Card body>
            <CommonText level={1} className="m-0">
              Thông tin cơ hội
            </CommonText>
            {renderForm(excludeFields, includeFunctions)}
          </Card>

          <Card body>
            <CommonText level={1} className="mb-0 mt-0">
              Thông tin đơn hàng báo giá
            </CommonText>
            <VVSTable
              name="OpportunityQuote"
              disableAdd
              disableSearch
              whereQuery={{
                opportunity: {
                  objectId: opportunityDetail?.objectId,
                  className: "Opportunity",
                  __type: "Pointer",
                },
              }}
            />
          </Card>
          <ViewableCommon
            if={() =>
              id && (opportunityDetail?.lead || opportunityDetail?.client)
            }
            caseTrue={
              <Card body>
                <CommonText level={1} className="m-0">
                  {language_vn.historyCall}
                </CommonText>
                <VVSTable
                  name="HistoryCallLog"
                  disableAdd
                  disableDelete
                  disableSearch
                  whereQuery={{
                    phone:
                      opportunityDetail?.lead?.phone ||
                      opportunityDetail?.client?.phone,
                  }}
                  className="m-0 p-0 shadow-none"
                />
              </Card>
            }
          />
          <ViewableCommon
            if={() =>
              id && (opportunityDetail?.lead || opportunityDetail?.client)
            }
            caseTrue={
              <Card body>
                <CommonText level={1} className="m-0">
                  {language_vn.appointmentList}
                </CommonText>
                <VVSTable
                  name="AppointmentCustomer"
                  disableAdd
                  disableSearch
                  whereQuery={{
                    ...(opportunityDetail?.lead && {
                      lead: {
                        objectId: opportunityDetail.lead.objectId,
                        className: "Lead",
                        __type: "Pointer",
                      },
                    }),
                    ...(opportunityDetail?.client && {
                      client: {
                        objectId: opportunityDetail.client.objectId,
                        className: "Customer",
                        __type: "Pointer",
                      },
                    }),
                  }}
                  className="m-0 p-0 shadow-none"
                  triggerRerender={reRenderAppointmentCustomerTable}
                />
              </Card>
            }
          />
          <ViewableCommon
            if={() => id}
            caseTrue={
              <Card body>
                <CommonText level={1} className="m-0">
                  {language_vn.messageList}
                </CommonText>
                <VVSTable
                  name="Message"
                  disableAdd
                  disableDelete
                  disableSearch
                  whereQuery={{
                    $or: [
                      {
                        lead: {
                          __type: "Pointer",
                          className: "Lead",
                          objectId: opportunityDetail?.lead?.objectId,
                        },
                      },
                      {
                        customer: {
                          __type: "Pointer",
                          className: "Customer",
                          objectId: opportunityDetail?.client?.objectId,
                        },
                      },
                    ],
                  }}
                  className="m-0 p-0 shadow-none"
                />
              </Card>
            }
          />
        </form>
        <ModalCommon
          modalTitle="Thêm lịch hẹn"
          isShowModal={isModalAppointment}
          onClose={openModalAppointment}
          size="lg"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <ModalBody className="px-2">
            <Row>
              <Col sm={6}>
                <InputField
                  label="Thời gian đặt lịch"
                  name="scheduledTime"
                  required
                  {...rest}
                  errors={errors}
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </Col>
              <Col sm={6}>
                <VVSAddress2
                  label="Địa điểm hẹn(Tỉnh / Thành phố)"
                  {...rest}
                  name="province"
                  required
                  addressType="province"
                  setAddress={setAddress}
                  address={address}
                  errors={errors}
                />
              </Col>
              <Col sm={6}>
                <VVSAddress2
                  label="Địa điểm hẹn(Quận / Huyện)"
                  {...rest}
                  name="district"
                  required
                  addressType="district"
                  setAddress={setAddress}
                  address={address}
                  errors={errors}
                />
              </Col>
              <Col sm={6}>
                <VVSAddress2
                  label="Địa điểm hẹn(Phường / Xã)"
                  {...rest}
                  name="ward"
                  required
                  setAddress={setAddress}
                  address={address}
                  addressType="ward"
                  errors={errors}
                />
              </Col>
              <Col sm={12}>
                <InputField
                  label="Địa điểm hẹn(chi tiết)"
                  name="address"
                  required
                  {...rest}
                  errors={errors}
                />
              </Col>
              <Col sm={12}>
                <TextareaField
                  label="Ghi chú"
                  name="noteAppointment"
                  {...rest}
                  rows={6}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <CommonButton
              level={0}
              onClick={openModalAppointment}
              type="button"
            >
              Hủy
            </CommonButton>
            <CommonButton level={3} onClick={handleCreateAppointment}>
              Xác nhận
            </CommonButton>
          </ModalFooter>
        </ModalCommon>
      </Container>
    </div>
  );
}
