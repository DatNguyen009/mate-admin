import React, { useState } from "react";
import { Card, Container } from "reactstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import { openModal } from "redux-toolkit/slices/Modal/ModalSlice";
import {
  DATA_TABLE_COMMON,
  FREQUENCY_OPTIONS,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
  USER_ALLOW_MODULES,
  USER_ROLE,
  USER_TYPE_OPTIONS,
} from "constants/dataUsers";
import { fetchUsers, updateUser } from "redux-toolkit/slices/Users/userSlice";
import useReuseData from "custom-hook/useReuseData";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import BasicInfoCard from "./basicInfoCard";
import RoleCard from "./roleCard";
import MoreInformationCard from "./moreInformationCard";
import ChangePasswordCard from "./changePasswordCard";
import DocumentFollowCard from "./documentFollowCard";
import EmailCard from "./emailCard";
import AllowModulesCard from "./allowModulesCard";
import SecuritySettingsCard from "./securitySettingsCard";
import ThirdPartyAuthenticationCard from "./thirdPartyAuthenticationCard";
import ApiAccessCard from "./apiAccessCard";
import HeaderMenu from "./headerMenu";

const NewUser = () => {
  const [roles, setRoles] = useState([]);
  const [allowModules, setAllowModules] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
  const [socialLogins, setSocialLogins] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      firstName: yup.string().required("Please enter first name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      sendWelcomeEmail: true,
      enabled: true,
      isLogout: true,
      firstName: "",
      middleName: "",
      lastName: "",
    },
    resolver: yupResolver(schema),
  });

  const { username = "", fullName = "" } = getValues();

  const getUserDetail = users => {
    if (!id) return;

    const userSelected = users.find(u => u.username === id);

    if (!userSelected) {
      toastrErrorAlert("User not found!");
      history.push("/user");
      return;
    }

    reset({ ...userSelected });
    setRoles(userSelected.roles);
    setAllowModules(userSelected.allowModules);
    setUserEmails(userSelected.userEmails);
    setSocialLogins(userSelected.socialLogins);
    setAvatar(userSelected.avatar || "");
  };

  useReuseData(fetchUsers, "User", getUserDetail);

  const onSubmit = async values => {
    const { createdAt, updatedAt, ACL, ...filteredValues } = values;

    const fullName = (
      filteredValues.firstName +
      " " +
      filteredValues.middleName +
      " " +
      filteredValues.lastName
    )
      .replaceAll("  ", " ")
      .trim();

    const user = {
      ...filteredValues,
      email: filteredValues.username,
      avatar,
      fullName,
      roles,
      allowModules,
      userEmails,
      socialLogins,
    };

    if (id) {
      dispatch(updateUser({ dataItem: user, dataId: user.objectId }));
      return;
    }
  };

  const handleOpenUploadModal = () => {
    dispatch(openModal("upload-file"));
  };

  const handleSelectRole = role => {
    const isRoleExists = _.some(roles, role);

    if (!isRoleExists) {
      setRoles([...roles, role]);
    } else {
      setRoles(_.filter(roles, r => r.id !== role.id));
    }
  };

  const handleSelectAllowModule = allowModule => {
    const isAllowModuleExists = _.some(allowModules, allowModule);

    if (!isAllowModuleExists) {
      setAllowModules([...allowModules, allowModule]);
    } else {
      setAllowModules(_.filter(allowModules, a => a.id !== allowModule.id));
    }
  };

  const handleSelectAllRole = () => {
    setRoles(USER_ROLE);
  };

  const handleUnselectAllRole = () => {
    setRoles([]);
  };

  const handleEnabledChange = e => {
    if (e.target.checked) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  const handleUploaded = results => {
    setAvatar(results[0].url);
    toggleUploadModal();
  };

  const toggleUploadModal = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderCreateItem title={id ? id : "New User"}>
              <CommonButton level={0}>Save</CommonButton>
            </HeaderCreateItem>
            <HeaderMenu
              avatar={avatar}
              onUploaded={handleUploaded}
              isOpen={isOpen}
              toggleUploadModal={toggleUploadModal}
            />
            <Card body>
              <ComponentCheckbox className="form-label m-0">
                <input
                  type="checkbox"
                  {...register("enabled")}
                  id="enabled-checkbox"
                  onChange={handleEnabledChange}
                />
                <LabelCheckbox className="form-label" for="enabled-checkbox">
                  Enabled
                </LabelCheckbox>
              </ComponentCheckbox>
            </Card>
            {isEnabled && (
              <>
                <BasicInfoCard
                  username={username}
                  errors={errors}
                  register={register}
                  LANGUAGE_OPTIONS={LANGUAGE_OPTIONS}
                  fullName={fullName}
                />
                <RoleCard
                  handleSelectAllRole={handleSelectAllRole}
                  handleUnselectAllRole={handleUnselectAllRole}
                  USER_ROLE={USER_ROLE}
                  roles={roles}
                  handleSelectRole={handleSelectRole}
                />
                <MoreInformationCard
                  register={register}
                  errors={errors}
                  GENDER_OPTIONS={GENDER_OPTIONS}
                  handleOpenUploadModal={handleOpenUploadModal}
                  THEME_OPTIONS={THEME_OPTIONS}
                />
                <ChangePasswordCard register={register} errors={errors} />
              </>
            )}
            <DocumentFollowCard
              register={register}
              errors={errors}
              FREQUENCY_OPTIONS={FREQUENCY_OPTIONS}
            />
            {isEnabled && (
              <>
                <EmailCard
                  register={register}
                  errors={errors}
                  userEmails={userEmails}
                  DATA_TABLE_COMMON={DATA_TABLE_COMMON}
                  setUserEmails={setUserEmails}
                  id={id}
                />
                <AllowModulesCard
                  register={register}
                  errors={errors}
                  USER_ALLOW_MODULES={USER_ALLOW_MODULES}
                  allowModules={allowModules}
                  handleSelectAllowModule={handleSelectAllowModule}
                />
                <SecuritySettingsCard
                  register={register}
                  errors={errors}
                  USER_TYPE_OPTIONS={USER_TYPE_OPTIONS}
                />
                <ThirdPartyAuthenticationCard
                  socialLogins={socialLogins}
                  DATA_TABLE_COMMON={DATA_TABLE_COMMON}
                  setSocialLogins={setSocialLogins}
                  id={id}
                />
              </>
            )}
            <ApiAccessCard />
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NewUser;
