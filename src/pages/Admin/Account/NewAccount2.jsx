import React, { useEffect, useState } from "react";
import { Container, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import Spacing from "components/Common/Spacing";
import { language_vn } from "helpers/language_vn";

import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import httpService from "services/httpService";
import {
  checkAdmin,
  createOrUpdateRowInModel,
  generateCode,
  splitFullName,
} from "helpers/erp_helper";
import {
  toastrCRUDSuccess,
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_EMPLOYEE, GET_USERS1 } from "helpers/url_helper";
import ModalCommon from "components/Common/ModalCommon";
import { CommonInputt, CommonLabel } from "components/Common/inputCommon";

const NewAccount2 = () => {
  const [toggle, setToggle] = useState(false);
  const [previousRoles, setPreviousRoles] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [pass, setPass] = useState({
    pass: "",
    retypePass: "",
  });
  const { id } = useParams();
  const history = useHistory();

  // const excludeFields = id ? ["password"] : [];

  useEffect(() => {
    getDetail();
  }, [id]);

  const schema = yup
    .object({
      username: yup.string().required("This field is required!"),
      password: !id && yup.string().required("This field is required!"),
      email: yup.string().nullable().email("Email is invalid!"),
      roles: yup.array().nullable(),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      status: "inactive",
    },
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("_User", yup, rest, errors);

  const getDetail = async () => {
    if (!id) return;

    const roleResponse = await httpService.get(
      `/parse/classes/_Role?where={"users": {"__type":"Pointer", "className": "_User", "objectId": "${id}"}}`
    );
    const userResponse = await httpService.get(`/parse/classes/_User/${id}`);

    const { reset } = rest;
    const roles = roleResponse.results.map(role => ({
      __type: "Pointer",
      className: "_Role",
      objectId: role.objectId,
    }));
    setPreviousRoles(roles);
    const { firstName = "", lastName = "" } = userResponse;
    reset({
      ...userResponse,
      roles,
      fullName: firstName + " " + lastName,
      isActive: userResponse?.isActive === false ? false : true,
    });
    setUserDetail(userResponse);
  };

  const onSubmit = async values => {
    values.username = values.username.trim();
    try {
      const { createdAt, updatedAt, roles, email, ...accountValues } = values;
      const { firstName, lastName } = splitFullName(
        accountValues.fullName ?? ""
      );
      const account = {
        ...accountValues,
        ...(email && { email }),
        firstName,
        lastName,
      };

      if (id) {
        const clearRequests = previousRoles.map(role => ({
          method: "PUT",
          path: `/parse/classes/_Role/${role.objectId}`,
          body: {
            users: {
              __op: "RemoveRelation",
              objects: [
                { __type: "Pointer", className: "_User", objectId: id },
              ],
            },
          },
        }));
        const updateRequests = roles.map(role => ({
          method: "PUT",
          path: `/parse/classes/_Role/${role.objectId}`,
          body: {
            users: {
              __op: "AddRelation",
              objects: [
                { __type: "Pointer", className: "_User", objectId: id },
              ],
            },
          },
        }));

        const isAdmin = await checkAdmin();

        if (isAdmin) {
          await httpService.post("/parse/batch", {
            requests: previousRoles.length ? clearRequests : [],
          });
          await httpService.post("/parse/batch", {
            requests: roles.length ? updateRequests : [],
          });
          await httpService.put(`/parse/users/${id}`, account, {
            headers: {
              "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
            },
          });
          toastrSuccessAlert("Cập nhật tài khoản thành công!!!");
        } else {
          toastrErrorAlert("Cập nhật tài khoản không thành công!");
        }
        return;
      }

      const userUrl = "/parse/users";

      const { objectId: objId } = await httpService.post(userUrl, {
        ...account,
        // userType: "employee",
      });
      if (roles !== undefined) {
        const employeeCode = await generateCode("Employee", "employeeId");
        const newEmployee = {
          employeeId: employeeCode,
          fullName: values.username,
          isActive: true,
          user: {
            __type: "Pointer",
            className: "_User",
            objectId: objId,
          },
        };
        const requests = roles?.map(role => ({
          method: "PUT",
          path: `/parse/classes/_Role/${role.objectId}`,
          body: {
            users: {
              __op: "AddRelation",
              objects: [
                { __type: "Pointer", className: "_User", objectId: objId },
              ],
            },
          },
        }));
        await httpService.post("/parse/batch", { requests });
        await createOrUpdateRowInModel(GET_EMPLOYEE, "", newEmployee, "create");
        history.replace(`/account/${objId}`);
      }

      toastrSuccessAlert("Tạo tài khoản thành công!!!");
      history.replace(`/account/${objId}`);
    } catch (errorRes) {
      if (errorRes.response?.data.code === 203) {
        toastrErrorAlert("Email đã được sử dụng!");
      }
      if (errorRes.response?.data.code === 202) {
        toastrErrorAlert("Tên đăng nhập đã được sử dụng!");
      }
    }
  };

  const includeProps = {
    password: {
      disabled: Boolean(id),
    },
    status: {
      disabled: Boolean(!id),
    },
  };
  const onResetPassword = async () => {
    try {
      if (!pass.pass || !pass.retypePass) {
        toastrErrorAlert(
          !pass.pass ? "Vui lòng nhập mật khẩu" : "Vui lòng nhập lại mật khẩu"
        );
        return;
      }

      if (pass.pass !== pass.retypePass) {
        toastrErrorAlert("Mật khẩu mới và nhập lại mật khẩu phải giống nhau!");
        return;
      }
      const res = await httpService.put(
        GET_USERS1 + `/${userDetail?.objectId}`,
        {
          objectId: userDetail?.objectId,
          password: pass.pass,
        },
        {
          headers: {
            "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFSY",
          },
        }
      );
      setToggle(false);
      if (res?.updatedAt) {
        toastrSuccessAlert("Đặt lại mật khẩu thành công!!");
        return;
      }
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / Chi Tiết Tài Khoản">
            <div className="flex-grow-1"></div>
            <CommonButton
              level={1}
              type="button"
              onClick={() => {
                setToggle(true);
              }}
            >
              Đặt lại mật khẩu
            </CommonButton>
            <Spacing size={12} />
            <CommonButton level={0}>Lưu</CommonButton>
          </HeaderCreateItem>
          {renderForm(_, includeProps)}
        </form>
      </Container>
      <ModalCommon
        modalTitle="Đặt lại mật khẩu"
        isShowModal={toggle}
        onClose={() => {
          setToggle(prev => !prev);
        }}
      >
        <ModalBody>
          <div style={{ margin: "0 12px" }}>
            <CommonLabel>Nhập mật khẩu mới</CommonLabel>
            <CommonInputt
              className="form-control"
              type="password"
              onChange={e => {
                setPass({
                  ...pass,
                  pass: e.target.value,
                });
              }}
            />
            <CommonLabel>Nhập lại mật khẩu mới</CommonLabel>
            <CommonInputt
              className="form-control"
              type="password"
              onChange={e => {
                setPass({
                  ...pass,
                  retypePass: e.target.value,
                });
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => {
              setToggle(prev => !prev);
            }}
          >
            Huỷ
          </CommonButton>
          <CommonButton level={3} onClick={onResetPassword}>
            Đồng ý
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </div>
  );
};

export default NewAccount2;
