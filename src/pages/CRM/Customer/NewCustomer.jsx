import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import moment from "moment";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import httpService from "services/httpService";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import {
  addCustomer,
  updateCustomer,
} from "redux-toolkit/slices/CRM/CustomerSlice";
import ViewableCommon from "components/Common/ViewableCommon";
import AccountInformation from "./AccountInformation";
import WalletInformation from "./WalletInformation";
import TransactionTable from "./TransactionTable";
import ContractTable from "./ContractTable";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import InputField from "components/form-control/InputField";
import { CommonText } from "components/Common/TextCommon";
import {
  checkIsJSON,
  formatNumber,
  generateCode,
  getUserRole,
} from "helpers/erp_helper";
import { CommonButton } from "components/Common/ButtonCommon";
import VVSTable from "components/form-control/VVSTable";
import axios from "axios";
import { GET_REFERRAL_BONUS } from "helpers/url_helper";
import MediaButton from "./Button";

const NewCustomer = () => {
  const [customerAccount, setCustomerAccount] = useState(null);
  const [transactionQuery, setTransactionQuery] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [roleUser, setRoleUser] = useState(null);

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const excludeFields = id ? ["password"] : [];

  useEffect(() => {
    getCustomerDetail();
  }, [id]);

  useEffect(async () => {
    const userRole = await getUserRole();
    setRoleUser(userRole);
  }, []);

  const schema = yup
    .object({
      fullName: yup.string().required("This field is required!"),
      email: yup.string().email("Email is invalid!"),
      gender: yup.string(),
      phone: !id && yup.string().required("This field is required!"),
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
            : undefined
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
            : undefined
        ),
      salesTeam: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "EmployeeGroup",
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
      status1: "Mới",
      gender: "Nam",
    },
    resolver: yupResolver(schema),
  });

  const { renderForm, getAddress } = useGetFormSchema(
    "Customer",
    yup,
    rest,
    errors
  );

  const getCustomerDetail = async () => {
    if (!id) return;

    const customerUrl = `/parse/classes/Customer/${id}?include=["invitedBy","salesStaff","user", "salesTeam"]`;
    const res = await httpService.get(customerUrl);
    const kycInformationUrl = `/parse/classes/KycInformation?where={"customer":{"__type":"Pointer", "className":"Customer", "objectId":"${id}"}}`;
    const kycInfoResponse = (await httpService.get(kycInformationUrl))
      .results[0];
    const accountsUrl = `/parse/classes/Account?where={"customer":{"__type": "Pointer", "className": "Customer", "objectId": "${id}"}}&include=["bank"]`;
    const accountsResponse = await httpService.get(accountsUrl);
    const resReferralBonus = await httpService.get(GET_REFERRAL_BONUS, {
      params: {
        where: {
          customer: {
            __type: "Pointer",
            className: "Customer",
            objectId: id,
          },
        },
      },
    });
    const isJSON = checkIsJSON(res?.addressLine1);
    const addressParseObj = isJSON ? JSON.parse(res.addressLine1) : null;

    const isJSON2 = checkIsJSON(res?.addressLine2);
    const addressParseObj2 = isJSON2 ? JSON.parse(res.addressLine2) : null;
    const { reset } = rest;
    console.log(res);
    reset({
      ...res,
      birthday: res?.birthday?.iso,
      CCCDNumber: kycInfoResponse?.CCCDNumber || "",
      CCCDIssueDate: kycInfoResponse?.CCCDIssueDate.iso,
      CCCDIssuePlace: kycInfoResponse?.CCCDIssuePlace,
      CCCDFront: kycInfoResponse?.CCCDFront,
      CCCDBack: kycInfoResponse?.CCCDBack,
      createdAt: moment(res.createdAt).format("YYYY-MM-DD"),
      invitedBy: res?.invitedBy
        ? {
            text: res.invitedBy.code,
            objectId: res.invitedBy.objectId,
            className: "Customer",
            __type: "Pointer",
          }
        : { text: "" },
      salesStaff: res?.salesStaff
        ? {
            text: res.salesStaff.fullName,
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

      isActive: ["active", "verifying", "verified"].includes(res?.user?.status),
      // isVerified: res?.user?.status === "verified", isVerified
      isVerified: res?.isVerified,
      address: addressParseObj?.addr || "",
      address2: addressParseObj2?.addr || "",
      referralBonus: formatNumber(resReferralBonus.results[0]?.balance),
    });

    getAddress({
      ...res,
      province: addressParseObj?.city || "",
      district: addressParseObj?.district || "",
      ward: addressParseObj?.ward || "",
      type: "addressLine1",
    });
    getAddress({
      ...res,
      province: addressParseObj2?.city || "",
      district: addressParseObj2?.district || "",
      ward: addressParseObj2?.ward || "",
      type: "addressLine2",
    });

    setUserDetail(res.user);
    if (!accountsResponse.results.length) return;
    setCustomerAccount(accountsResponse.results);
    const query = accountsResponse.results.map(item => {
      return [
        {
          target: {
            __type: "Pointer",
            className: "Account",
            objectId: item.objectId,
          },
        },
        {
          source: {
            __type: "Pointer",
            className: "Account",
            objectId: item.objectId,
          },
        },
      ];
    });
    setTransactionQuery(_.flatten(query));
  };

  const onSubmit = async values => {
    const {
      createdAt,
      updatedAt,
      CCCDIssueDate,
      CCCDIssuePlace,
      CCCDNumber,
      user,
      password,
      username,
      ...customerValues
    } = values;

    const {
      province1,
      district1,
      ward1,
      address,
      address2,
      province2,
      ward2,
      district2,
    } = customerValues;
    const addressFull = {
      city: province1,
      district: district1,
      ward: ward1,
      addr: address,
    };
    const addressLine1 = JSON.stringify(addressFull);
    const addressLine2 = JSON.stringify({
      city: province2,
      district: district2,
      ward: ward2,
      addr: address2,
    });

    const customerCode = await generateCode("Customer", "code");
    const customer = {
      ...(!id && { code: customerCode }),
      ...customerValues,
      addressLine1,
      addressLine2,
      birthday: customerValues?.birthday
        ? { __type: "Date", iso: customerValues?.birthday }
        : null,
    };

    const userInfo = {
      status: "inactive",
      fullName: customer.fullName,
      ...(customer.email && { email: customer.email }),
      phone: customer.phone,
      username,
      password,
    };

    if (id) {
      await dispatch(updateCustomer({ dataItem: customer, dataId: id }));
      return;
    }

    if (username && password) {
      try {
        const userResponse = await httpService.post("/parse/users", userInfo);
        const userObjectId = userResponse.objectId;
        const customerUrl = `/parse/classes/Customer?where={"user":{"__type":"Pointer","className":"_User","objectId":"${userObjectId}"}}`;
        const COI = (await httpService.get(customerUrl)).results[0].objectId;
        const updateCustomerUrl = `/parse/classes/Customer/${COI}`;
        await httpService.put(updateCustomerUrl, customer);
        toastrSuccessAlert("Tạo khách hàng thành công");
        history.replace(`/customer/${COI}`);
        return;
      } catch (errorRes) {
        if (errorRes?.response?.data?.error) {
          toastrErrorAlert(errorRes.response?.data.error);
        }
        return;
      }
    }

    const { objectId: COI } = await dispatch(addCustomer(customer)).unwrap();
    history.replace(`/customer/${COI}`);
  };

  const handleCallCustomer = async () => {
    try {
      setIsCallLoading(true);
      const currUserUrl = "/parse/users/me";
      const { objectId: UOI } = await httpService.get(currUserUrl);
      const currEmployeeUrl = `/parse/classes/Employee?where={"user":{"__type":"Pointer","className":"_User","objectId":"${UOI}"}}`;
      const currEmployee = (await httpService.get(currEmployeeUrl)).results[0];
      const customerPhone = rest.getValues("phone");

      if (!currEmployee) {
        toastrErrorAlert("User không phải là nhân viên Sale!");
        return;
      }
      if (!currEmployee?.extension) {
        toastrErrorAlert("Nhân viên chưa có extension!");
        return;
      }
      if (!customerPhone) {
        toastrErrorAlert("Vui lòng cập nhật số điện thoại khách hàng!");
        return;
      }

      const callUrl = "https://api.cloudfone.vn/api/CloudFone/AutoCallV2";
      await axios.post(callUrl, {
        ServiceName: `${process.env.REACT_APP_CALL_CENTER_SERVICE_NAME}`,
        AuthUser: `${process.env.REACT_APP_AUTH_USER}`,
        AuthKey: `${process.env.REACT_APP_AUTH_KEY}`,
        Ext: currEmployee.extension,
        PhoneNumber: `${process.env.REACT_APP_PHONE_NUMBER}/${customerPhone}`,
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

  const includeProps = {
    invitedBy: {
      disabled: !roleUser?.includes("Admin"),
    },
    phone: {
      style: {
        display: roleUser?.includes("Accountant"),
      },
    },
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / Chi Tiết Khách Hàng">
            <div className="d-flex mb-2" style={{ gap: 12 }}>
              <CommonButton
                level={0}
                type="button"
                onClick={() => {
                  // history.push("/opportunity/new-opportunity", {
                  //   lead: leadDetail,
                  // });
                }}
              >
                Tạo cơ hội
              </CommonButton>
              <CommonButton
                level={0}
                type="button"
                onClick={() => {
                  // history.push(
                  //   "/quote/new-quote",
                  //   { lead: leadDetail }
                  // );
                }}
              >
                Tạo báo giá
              </CommonButton>
              {/* <CommonButton level={0} type="button">
                Tạo khách hàng
              </CommonButton> */}
              <ViewableCommon
                if={() => id}
                caseTrue={
                  <>
                    <MediaButton icons="facebook" />
                    <MediaButton icons="zalo" />
                    <>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleCallCustomer}
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
                  </>
                }
              />
              <CommonButton level={0}>Lưu</CommonButton>
            </div>
          </HeaderCreateItem>
          {renderForm(excludeFields, includeProps)}
        </form>

        <ViewableCommon
          if={() => !id}
          caseTrue={
            <Card body>
              <CommonText level={1} className="m-0">
                Thông tin tài khoản
              </CommonText>
              <Row>
                <Col>
                  <InputField
                    label="Tên đăng nhập"
                    name="username"
                    errors={errors}
                    {...rest}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Mật khẩu"
                    name="password"
                    errors={errors}
                    {...rest}
                  />
                </Col>
              </Row>
            </Card>
          }
        />
        <ViewableCommon
          if={() => id && userDetail}
          caseTrue={<AccountInformation userDetail={userDetail} />}
        />
        <ViewableCommon
          if={() => id && customerAccount}
          caseTrue={
            <WalletInformation
              customerAccount={customerAccount}
              customerId={id}
            />
          }
        />
        <ViewableCommon if={() => id} caseTrue={<ContractTable id={id} />} />
        <ViewableCommon
          if={() => id}
          caseTrue={
            <Card body>
              <VVSTable
                title={
                  <CommonText level={1} className="m-0">
                    Danh sách mua vàng
                  </CommonText>
                }
                name="CustomerOrder"
                whereQuery={{
                  customer: {
                    __type: "Pointer",
                    className: "Customer",
                    objectId: id,
                  },
                  paymentMethod: { $ne: "saving" },
                }}
                disableAdd
                disableDelete
                className="m-0 p-0 shadow-none"
              />
            </Card>
          }
        />
        <ViewableCommon
          if={() => id && transactionQuery}
          caseTrue={<TransactionTable transactionQuery={transactionQuery} />}
        />
        <ViewableCommon
          if={() => id}
          caseTrue={
            <Card body>
              <CommonText level={1} className="m-0">
                Lịch hẹn nhận vàng, bán vàng
              </CommonText>
              <VVSTable
                name="AppointmentCustomer"
                whereQuery={{
                  customer: {
                    __type: "Pointer",
                    className: "Customer",
                    objectId: id,
                  },
                }}
                disableAdd
                disableDelete
                disableSearch
                className="m-0 p-0 shadow-none"
              />
            </Card>
          }
        />
      </Container>
    </div>
  );
};

export default NewCustomer;
