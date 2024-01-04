import React, { Fragment, useEffect, useState } from "react";
import { Container, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import httpService from "services/httpService";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { createLead, updateLead } from "redux-toolkit/slices/CRM/LeadSlice";
import Spacer from "components/Common/Spacing";
import _ from "lodash";
import { TEXT_POST } from "helpers/name_helper";
import VVSTable from "components/form-control/VVSTable";
import { language_vn } from "helpers/language_vn";
import axios from "axios";
import ViewableCommon from "components/Common/ViewableCommon";
import MediaButton from "../../../Customer/Button";
import ModalCommon from "components/Common/ModalCommon";
import { CommonText } from "components/Common/TextCommon";
import { getUserRole } from "helpers/erp_helper";

const NewLead = () => {
  const [leadDetail, setLeadDetail] = useState({});
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [modalCall, setModalCall] = useState(false);
  const [leadId, setLeadId] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const language = language_vn;
  const [roleUser, setRoleUser] = useState(null);

  useEffect(() => {
    getLeadDetail();
  }, [id]);

  useEffect(() => {
    setLeadId(leadDetail.salesTeam?.objectId);
  }, [leadDetail]);

  useEffect(async () => {
    const userRole = await getUserRole();
    setRoleUser(userRole);
  }, []);

  const schema = yup
    .object({
      name: yup.string().required("Vui lòng nhập tên!"),
      dob: yup
        .object()
        .shape({ __type: yup.string(), iso: yup.string() })
        .nullable()
        .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),
      identityDate: yup
        .object()
        .shape({ __type: yup.string(), iso: yup.string() })
        .nullable()
        .transform((_, val) => (val ? { __type: "Date", iso: val } : null)),
      invitedBy: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Customer",
                objectId: val.objectId,
              }
            : null
        ),
      salesStaff: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Employee",
                objectId: val.objectId,
              }
            : null
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
      status: "Mới",
      gender: "Nam",
    },
    resolver: yupResolver(schema),
  });

  const { renderForm, getAddress } = useGetFormSchema(
    "Lead",
    yup,
    rest,
    errors
  );
  const includeFunction = {
    source: {
      label: (
        <Fragment>
          Tiếp cận từ{" "}
          {(leadDetail.source?.toLowerCase() === "app" ||
            leadDetail.source?.toLowerCase() === "landing") && (
            <Link to={`/customer/${rest.getValues("customer.objectId")}`}>
              (chi tiết)
            </Link>
          )}
        </Fragment>
      ),
    },
    salesTeam: {
      onSelect: e => setLeadId(e.objectId),
    },
    salesStaff: {
      conditionField: {
        group: {
          __type: "Pointer",
          className: "EmployeeGroup",
          objectId: leadId,
        },
      },
    },
    invitedBy: {
      disabled: !roleUser?.includes("Admin"),
    },
  };
  const getLeadDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `/parse/classes/Lead/${id}?include=["invitedBy","salesStaff", "salesTeam"]`
    );
    if (!res) {
      history.replace("/lead");
      toastrErrorAlert("Lead not found!");
      return;
    }
    setLeadDetail(res);
    const { reset } = rest;
    reset({
      ...res,
      source: _.capitalize(res?.source) || "Khác",
      dob: res?.dob?.iso,
      identityDate: res?.identityDate?.iso,
      invitedBy: res?.invitedBy
        ? {
            text: res.invitedBy?.code,
            objectId: res.invitedBy.objectId,
            className: "Customer",
            __type: "Pointer",
          }
        : { text: "" },
      salesStaff: res?.salesStaff
        ? {
            text: res.salesStaff?.fullName,
            objectId: res.salesStaff.objectId,
            className: "Employee",
            __type: "Pointer",
          }
        : { text: "" },
      salesTeam: res?.salesTeam
        ? {
            text: res.salesTeam?.name,
            objectId: res.salesTeam.objectId,
            className: "EmployeeGroup",
            __type: "Pointer",
          }
        : { text: "" },
    });
    getAddress(res);
  };

  const onSubmit = async values => {
    const {
      createdAt,
      updatedAt,
      salesTeam,
      identityDate,
      dob,
      ...leadValues
    } = values;
    const lead = {
      ...leadValues,
      ...(identityDate?.iso !== undefined && {
        identityDate,
      }),
      ...(dob?.iso !== undefined && {
        dob,
      }),
      ...(values?.salesStaff?.objectId && {
        salesStaff: {
          objectId: values.salesStaff.objectId,
          className: "Employee",
          __type: "Pointer",
        },
      }),
      ...(values?.salesTeam?.objectId && {
        salesTeam: {
          objectId: values.salesTeam.objectId,
          className: "EmployeeGroup",
          __type: "Pointer",
        },
      }),
    };

    if (id) {
      dispatch(updateLead({ dataItem: lead, dataId: id }));
      return;
    }
    const res = await dispatch(createLead(lead));
    console.log("res.payload?.objectId", res.payload?.objectId);
    history.replace(`/lead/${res.payload?.objectId}`);
  };

  // const onCreateCustomer = async () => {
  //   const { getValues } = rest;
  //   const data = {
  //     address: getValues("address"),
  //     approachFrom: getValues("approachFrom"),
  //     dob: getValues("dob"),
  //     email: getValues("email"),
  //     gender: getValues("gender"),
  //     identity: getValues("identity"),
  //     name: getValues("name"),
  //     fullName: getValues("name"),
  //     phone: getValues("phone"),
  //     province: getValues("province"),
  //     ...(getValues("salesTeam")?.objectId && {
  //       salesTeam: {
  //         objectId: getValues("salesTeam").objectId,
  //         className: "EmployeeGroup",
  //         __type: "Pointer",
  //       },
  //     }),
  //     ...(getValues("salesStaff")?.objectId && {
  //       salesStaff: {
  //         objectId: getValues("salesStaff").objectId,
  //         className: "Employee",
  //         __type: "Pointer",
  //       },
  //     }),

  //     status: "converted",
  //     ward: getValues("ward"),
  //     username: getValues("phone"),
  //     password: "123456",
  //   };
  //   const excludeFields = ["createdAt", "updatedAt", "password", "username"];
  //   const customerValues = _.omit(data, excludeFields);
  //   const { province, district, ward, address, username, password } = data;
  //   const addressFull = { city: province, district, ward };
  //   const addressLine1 = JSON.stringify(addressFull);
  //   const addressLine2 = address;
  //   const customer = { ...customerValues, addressLine1, addressLine2 };
  //   const userInfo = {
  //     status: "inactive",
  //     fullName: customer.name,
  //     ...(customer.email && { email: customer.email }),
  //     username,
  //     password,
  //   };

  //   if (username && password) {
  //     try {
  //       const userResponse = await httpService.post("/parse/users", userInfo);
  //       const userObjectId = userResponse.objectId;
  //       const customerUrl = `/parse/classes/Customer?where={"user":{"__type":"Pointer","className":"_User","objectId":"${userObjectId}"}}`;
  //       const COI = (await httpService.get(customerUrl)).results[0].objectId;
  //       const updateCustomerUrl = `/parse/classes/Customer/${COI}`;
  //       try {
  //         const res = await httpService.put(updateCustomerUrl, customer);
  //         if (res.updatedAt) {
  //           toastrCRUDSuccess("Customer", TEXT_POST);
  //           history.push(`/customer/${COI}`);
  //         }
  //       } catch (error) {
  //         toastrErrorAlert("Đã xảy ra lỗi vui lòng thử lại sau");
  //       }
  //     } catch (errorRes) {
  //       if (errorRes?.response?.data?.error) {
  //         if (errorRes?.response?.data?.error) {
  //           if (errorRes?.response?.data.code === 203) {
  //             toastrErrorAlert(
  //               "Email đã được đăng ký, Vui lòng đăng ký Email khác!!"
  //             );
  //             return;
  //           }
  //           if (errorRes?.response?.data.code === 202) {
  //             toastrErrorAlert(
  //               "Số điện thoại đã được đăng ký, Vui lòng đăng ký số điện thoại khác!!"
  //             );
  //           }
  //         }
  //       }
  //     }
  //     return;
  //   }
  // };

  const handleCallLead = async () => {
    try {
      setIsCallLoading(true);
      const currUserUrl = "/parse/users/me";
      const { objectId: UOI } = await httpService.get(currUserUrl);
      const currEmployeeUrl = `/parse/classes/Employee?where={"user":{"__type":"Pointer","className":"_User","objectId":"${UOI}"}}`;
      const currEmployee = (await httpService.get(currEmployeeUrl)).results[0];
      const leadPhone = rest.getValues("phone");

      if (!currEmployee) {
        toastrErrorAlert("User không phải là nhân viên Sale!");
        return;
      }
      if (!currEmployee?.extension) {
        toastrErrorAlert("Nhân viên chưa có extension!");
        return;
      }
      if (!leadPhone) {
        toastrErrorAlert("Vui lòng cập nhật số điện thoại khách hàng!");
        return;
      }

      const callUrl = "https://api.cloudfone.vn/api/CloudFone/AutoCallV2";
      await axios.post(callUrl, {
        ServiceName: `${process.env.REACT_APP_CALL_CENTER_SERVICE_NAME}`,
        AuthUser: `${process.env.REACT_APP_AUTH_USER}`,
        AuthKey: `${process.env.REACT_APP_AUTH_KEY}`,
        Ext: currEmployee.extension,
        PhoneNumber: `${process.env.REACT_APP_PHONE_NUMBER}/${leadPhone}`,
      });

      setIsCallLoading(false);
      toastrSuccessAlert(
        "Cuộc gọi đã được thiết lập, vui lòng chú ý phần mềm tổng đài!"
      );
    } catch (errorRes) {
      console.log("errorRes", errorRes.response.data);
      setIsCallLoading(false);
    }
  };
  const handleNavigationChat = () => {
    if (!leadDetail?.zaloId) {
      toastrErrorAlert("Bạn chưa có tài khoản zalo!!!");
      return;
    }
    history.push("/chat-zalo", {
      lead: leadDetail,
    });
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem
            title={id ? "Chi tiết data tổng hợp" : "Thêm data tổng hợp"}
          >
            <div className="d-flex align-items-center mb-2">
              <div className="flex-grow-1"></div>
              <CommonButton
                level={0}
                type="button"
                onClick={() => {
                  history.push("/opportunity/new-opportunity", {
                    lead: leadDetail,
                  });
                }}
              >
                Tạo cơ hội
              </CommonButton>
              <Spacer size={12} />
              <CommonButton
                level={0}
                type="button"
                onClick={() => {
                  history.push("/quote/new-quote", { lead: leadDetail });
                }}
              >
                Tạo báo giá
              </CommonButton>
              {/* <Spacer size={12} />

              <CommonButton level={0} type="button" onClick={onCreateCustomer}>
                Tạo khách hàng
              </CommonButton> */}
              <ViewableCommon
                if={() => id}
                caseTrue={
                  <>
                    <Spacer size={12} />
                    <MediaButton icons="facebook" />
                    <Spacer size={12} />
                    <MediaButton
                      icons="zalo"
                      handleClick={handleNavigationChat}
                    />
                    {leadDetail?.phone && (
                      <>
                        <Spacer size={12} />
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleCallLead}
                          disabled={isCallLoading}
                        >
                          <i
                            className={`${
                              isCallLoading
                                ? "bx bx-loader bx-spin"
                                : "fas fa-phone-alt"
                            } font-size-16 align-middle`}
                          />
                        </button>
                      </>
                    )}
                  </>
                }
              />
              <Spacer size={12} />
              <CommonButton level={0} type="submit">
                Lưu
              </CommonButton>
            </div>
          </HeaderCreateItem>
          {renderForm(_, includeFunction)}

          <VVSTable
            name="HistoryImpact"
            title={language.historyImpact}
            disableDelete
            disableAdd
            disableSearch
            whereQuery={{
              class: "Lead",
              type: {
                $in: ["update"],
              },
              referenceId: leadDetail.objectId,
            }}
          />
          <VVSTable
            name="HistoryCallLog"
            title={language.historyCall}
            disableDelete
            disableAdd
            disableSearch
            whereQuery={{
              phone: leadDetail?.phone || 0,
            }}
          />
          <ViewableCommon
            if={() => id}
            caseTrue={
              <VVSTable
                name="Message"
                title="Lịch sử tin nhắn"
                disableAdd
                disableDelete
                disableSearch
                whereQuery={{
                  lead: {
                    __type: "Pointer",
                    className: "Lead",
                    objectId: leadDetail?.objectId,
                  },
                }}
              />
            }
          />
          <VVSTable
            title="Thông tin cơ hội"
            name="Opportunity"
            disableAdd
            disableDelete
            disableSearch
            whereQuery={{
              lead: {
                objectId: leadDetail?.objectId,
                className: "Lead",
                __type: "Pointer",
              },
            }}
          />
          <VVSTable
            name="Quote"
            title="Thông tin báo giá"
            disableAdd
            disableDelete
            disableSearch
            whereQuery={{
              lead: {
                objectId: leadDetail?.objectId,
                className: "Lead",
                __type: "Pointer",
              },
            }}
          />
        </form>
        <ModalCommon
          modalTitle="Thông báo"
          isShowModal={modalCall}
          onClose={() => {
            setModalCall(false);
          }}
        >
          <ModalBody>
            <Spacer size={20} />
            <CommonText
              style={{ fontSize: 16, fontWeight: "normal" }}
              level={0}
              mt={0}
            >
              Đang gọi đến số máy {rest.getValues("phone")}
            </CommonText>
            <Spacer size={20} />
          </ModalBody>
          <ModalFooter>
            <CommonButton
              level={0}
              onClick={() => {
                setModalCall(false);
              }}
            >
              Cancel
            </CommonButton>
          </ModalFooter>
        </ModalCommon>
      </Container>
    </div>
  );
};

export default NewLead;
