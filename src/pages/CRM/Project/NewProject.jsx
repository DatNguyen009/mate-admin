import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Container } from "reactstrap";
import * as yup from "yup";
import "antd/dist/antd.css";

import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonText } from "components/Common/TextCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { GET_PROJECT, GET_EMPLOYEE } from "helpers/url_helper";
import httpService from "services/httpService";
import { language_vn } from "helpers/language_vn";
import { useDispatch } from "react-redux";
import { generateCode } from "helpers/erp_helper";
import moment from "moment";
import { Select } from "antd";

export default function NewProject() {
  const [membersFilter, setMembersFilter] = useState([]);
  const [membersSelectedFilter, setMembersSelectedFilter] = useState([]);
  const [showErrorMembers, setShowErrorMembers] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const excludeFields = id ? [] : ["createdAt", "updatedAt"];

  const schema = yup
    .object({
      projectName: yup.string().required("Vui lòng nhập tên"),
      department: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Department",
                objectId: val.objectId,
              }
            : null
        )
        .required("Vui lòng chọn phòng ban"),
      status: yup.string().required("Vui lòng chọn trạng thái"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Project", yup, rest, errors);

  useEffect(() => {
    fetchProjectDetail();
    getMembersFilter();
  }, []);

  const fetchProjectDetail = async () => {
    if (!id) return;
    try {
      const optional = {
        params: {
          include: "department",
        },
      };
      const res = await httpService.get(`${GET_PROJECT}/${id}`, optional);
      const { reset } = rest;
      reset({
        ...res,
        department: res.department
          ? {
              text: res.department?.name,
              objectId: res.department?.objectId,
              className: "Department",
              __type: "Pointer",
            }
          : { text: "" },
        startDate: res?.startDate
          ? moment(res?.startDate?.iso).utc().format("YYYY-MM-DD")
          : "",
        endDate: res?.endDate
          ? moment(res?.endDate?.iso).utc().format("YYYY-MM-DD")
          : "",
      });
      setMembersSelectedFilter(res.members?.map(m => m.objectId));
    } catch (error) {
      history.replace("/project");
      toastrErrorAlert(language_vn.error);
      return;
    }
  };

  const onSubmit = async values => {
    if (membersSelectedFilter.length === 0) {
      setShowErrorMembers(true);
      return;
    }

    const { createdAt, updatedAt, startDate, endDate, ...remaining } = values;

    const newProject = {
      ...remaining,
      isActive: true,
      name: await generateCode("Project", "name"),
      ...(values.startDate && {
        startDate: {
          iso: new Date(values.startDate),
          __type: "Date",
        },
      }),
      ...(values.endDate && {
        endDate: {
          iso: new Date(values.endDate),
          __type: "Date",
        },
      }),
      ...(membersSelectedFilter.length > 0 && {
        members: membersSelectedFilter.map(id => {
          return {
            __type: "Pointer",
            className: "Employee",
            objectId: id,
          };
        }),
      }),
    };

    try {
      if (id) {
        const { name, isActive, ...remaining } = newProject;
        const res = await httpService.put(GET_PROJECT + `/${id}`, remaining);
        if (res?.updatedAt) {
          toastrSuccessAlert("Cập nhật dự án thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
        return;
      }
      const res = await httpService.post(GET_PROJECT, newProject);
      if (res?.createdAt) {
        toastrSuccessAlert("Tạo dự án thành công!!");
        history.replace(`/project/${res.objectId}`);
        return;
      }
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    } catch (error) {
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    }
  };

  const getMembersFilter = async () => {
    const optional = {
      params: {
        where: {
          isActive: true,
        },
      },
    };
    const { results: employees } = await httpService.get(
      GET_EMPLOYEE,
      optional
    );

    if (!employees || employees.length === 0) {
      setMembersFilter([]);
      setMembersSelectedFilter([]); //reset
      return;
    }

    const members = employees.map(e => {
      return {
        label: `${e.fullName} (${e.employeeId})`,
        value: e.objectId,
      };
    });

    setMembersFilter(members);
  };

  const handleSearchMembers = value => {
    // setAssigneesSelectedFilter(value);
    // setShowErrorAssignees(false);
  };

  const handleOnchangeMembers = values => {
    const isCorrect = values
      .map(value => membersFilter.find(item => item.value === value))
      .filter(item => item)
      .map(item => item.value);

    setMembersSelectedFilter([...isCorrect]);
    setShowErrorMembers(false);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Thêm / Sửa Dự Án ">
            <div className="d-flex align-items-center mb-2">
              <CommonButton level={0}>{language_vn.save}</CommonButton>
            </div>
          </HeaderCreateItem>

          <Card body>
            <CommonText level={1} className="m-0">
              Thông tin dự án
            </CommonText>
            {renderForm(excludeFields)}
            <div
              style={{
                padding: "0 20px",
              }}
            >
              <h6
                style={{
                  fontWeight: "600",
                }}
              >
                Thành viên
              </h6>
              <Select
                mode="tags"
                defaultValue={membersSelectedFilter}
                value={membersSelectedFilter}
                style={{ width: "50%" }}
                onSearch={handleSearchMembers}
                onChange={handleOnchangeMembers}
                tokenSeparators={[","]}
                filterOption={(input, option) =>
                  option.props.label
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0 ||
                  option.props.value
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                options={membersFilter || []}
              />
              {showErrorMembers && (
                <h6
                  style={{
                    color: "red",
                    fontWeight: "500",
                  }}
                >
                  Vui lòng chọn thành viên!
                </h6>
              )}
            </div>
          </Card>
        </form>
      </Container>
    </div>
  );
}
