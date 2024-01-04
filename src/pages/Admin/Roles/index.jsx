import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import VVSSelectModel from "components/form-control/VVSSelectModel";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import Table from "components/form-control/Table";
import CheckBox from "components/form-control/CheckBox";
import httpService from "services/httpService";
import InputField from "components/form-control/InputField";
import { CommonButton } from "components/Common/ButtonCommon";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_POST } from "helpers/name_helper";

const handleSelectPermission = async (e, formValue, indexOfRow) => {
  const { getValues } = formValue;
  const { classes, role } = getValues();
  const action = e.target.name.split(".")[2];
  const checked = e.target.checked;
  const { class: className } = classes[indexOfRow];
  const classSchemaUrl = `/parse/schemas/${className}`;
  const prevClassSchema = await httpService.get(classSchemaUrl);
  const { classLevelPermissions } = prevClassSchema;

  if (checked) {
    classLevelPermissions[action][`role:${role.text}`] = true;
  } else {
    delete classLevelPermissions[action][`role:${role.text}`];
  }

  const updateSchemaUrl = `/parse/schemas/${prevClassSchema.className}`;
  httpService.put(updateSchemaUrl, { classLevelPermissions });
};

const handleSelectAllPermission = async (e, formValue, indexOfRow) => {
  const { setValue, getValues } = formValue;
  const checked = e.target.checked;

  setValue(`classes.${indexOfRow}.find`, checked);
  setValue(`classes.${indexOfRow}.get`, checked);
  setValue(`classes.${indexOfRow}.create`, checked);
  setValue(`classes.${indexOfRow}.update`, checked);
  setValue(`classes.${indexOfRow}.delete`, checked);

  const role = getValues("role").text;
  const classes = getValues("classes");
  const { class: className } = classes[indexOfRow];
  const classSchemaUrl = `/parse/schemas/${className}`;
  const prevClassSchema = await httpService.get(classSchemaUrl);
  const { classLevelPermissions } = prevClassSchema;

  if (checked) {
    classLevelPermissions.find[`role:${role}`] = true;
    classLevelPermissions.get[`role:${role}`] = true;
    classLevelPermissions.create[`role:${role}`] = true;
    classLevelPermissions.update[`role:${role}`] = true;
    classLevelPermissions.delete[`role:${role}`] = true;
  } else {
    delete classLevelPermissions.find[`role:${role}`];
    delete classLevelPermissions.get[`role:${role}`];
    delete classLevelPermissions.create[`role:${role}`];
    delete classLevelPermissions.update[`role:${role}`];
    delete classLevelPermissions.delete[`role:${role}`];
  }

  const updateSchemaUrl = `/parse/schemas/${prevClassSchema.className}`;
  httpService.put(updateSchemaUrl, { classLevelPermissions });
};

const HEADERS = [
  {
    text: "Bảng",
    field: "class",
  },
  {
    text: "Xem danh sách",
    CellComponent: CheckBox,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `classes.${indexOfRow}.find`,
      onChange: e => handleSelectPermission(e, formValue, indexOfRow),
    }),
  },
  {
    text: "Xem chi tiết",
    CellComponent: CheckBox,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `classes.${indexOfRow}.get`,
      onChange: e => handleSelectPermission(e, formValue, indexOfRow),
    }),
  },
  {
    text: "Tạo mới",
    CellComponent: CheckBox,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `classes.${indexOfRow}.create`,
      onChange: e => handleSelectPermission(e, formValue, indexOfRow),
    }),
  },
  {
    text: "Cập nhật",
    CellComponent: CheckBox,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `classes.${indexOfRow}.update`,
      onChange: e => handleSelectPermission(e, formValue, indexOfRow),
    }),
  },
  {
    text: "Xoá",
    CellComponent: CheckBox,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `classes.${indexOfRow}.delete`,
      onChange: e => handleSelectPermission(e, formValue, indexOfRow),
    }),
  },
  {
    text: "Tất cả",
    CellComponent: CheckBox,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `classes.${indexOfRow}.all`,
      onChange: e => handleSelectAllPermission(e, formValue, indexOfRow),
    }),
  },
];

const Roles = () => {
  const [classList, setClassList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const newRoleRef = useRef(null);

  const schema = yup.object({}).required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleRoleChange = async () => {
    const { reset } = rest;

    if (!selectedRole) return reset({ classes: [] });

    const res = await httpService.get("/parse/schemas");
    const classesReset = _.orderBy(
      _.map(res.results, r => ({
        class: r.className,
        find: false,
        get: false,
        create: false,
        update: false,
        delete: false,
        all: false,
      })),
      ["class"],
      ["asc"]
    );
    const classes = _.orderBy(
      _.map(res.results, c => {
        const { name } = selectedRole;
        const find = c.classLevelPermissions.find[`role:${name}`];
        const get = c.classLevelPermissions.get[`role:${name}`];
        const create = c.classLevelPermissions.create[`role:${name}`];
        const update = c.classLevelPermissions.update[`role:${name}`];
        const deletePermission = c.classLevelPermissions.delete[`role:${name}`];
        const all = find && get && create && update && deletePermission;
        return {
          class: c.className,
          find,
          get,
          create,
          update,
          delete: deletePermission,
          all,
        };
      }),
      ["class"],
      ["asc"]
    );
    reset({ classes: classesReset });
    reset({ classes });
    setClassList(classes);
  };

  const handleSearchClass = _.debounce(async e => {
    if (!selectedRole) return;

    const searchValue = e.target.value.toLowerCase();
    const { reset } = rest;

    if (selectedRole && !searchValue) {
      return reset({ classes: classList });
    }

    const searchClasses = classList.filter(c =>
      c.class.toLowerCase().includes(searchValue)
    );
    reset({ classes: searchClasses });
  }, 500);

  const handleCreateRole = async e => {
    const roleName = newRoleRef.current.value;

    if (!roleName) return;

    const newRoleData = {
      name: roleName,
      ACL: {
        "*": {
          read: true,
        },
      },
    };
    await httpService.post(`/parse/roles`, newRoleData);
    toastrCRUDSuccess("role", TEXT_POST);
    newRoleRef.current.value = "";
  };

  useEffect(async () => {
    handleRoleChange();
  }, [selectedRole]);

  return (
    <div className="page-content">
      <Container fluid>
        <HeaderCreateItem title="Phân Quyền" />
        <Card body>
          <Row className="mb-4">
            <Col xs={4}>
              <VVSSelectModel
                model="_Role"
                name="role.text"
                placeholder="Select role"
                {...rest}
                errors={errors}
                onSelect={role => setSelectedRole(role)}
              />
            </Col>
            <Col xs={4}>
              <InputField
                name="search"
                placeHolder="Search class"
                errors={errors}
                {...rest}
                onChange={handleSearchClass}
              />
            </Col>
            {/* <Col xs={4}>
              <div className="d-flex" style={{ gap: 6 }}>
                <InputField
                  name="newRole"
                  placeHolder="Enter role name"
                  errors={errors}
                  {...rest}
                  componentRef={newRoleRef}
                />
                <CommonButton
                  type="button"
                  level={0}
                  style={{ transform: "translateY(-5%)" }}
                  onClick={handleCreateRole}
                >
                  Create
                </CommonButton>
              </div>
            </Col> */}
          </Row>
          <Table
            headers={HEADERS}
            disableDelete
            disableAdd
            formProps={{
              errors,
              ...rest,
            }}
            name="classes"
          />
        </Card>
      </Container>
    </div>
  );
};

export default Roles;
