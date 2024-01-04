import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toastr from "toastr";
import { Col, Label, Row } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";

import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import { options } from "helpers/erp_helper";
import {
  CommonLabel,
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import ModalUploadFile from "./ModalUploadFile";
import SelectField from "components/form-control/Select";

const ModalAddCommunication = props => {
  const { isOpen, toggle, title } = props;
  const [showOption, setShowOption] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const modalTitle = "New " + title.replaceAll("-", " ");

  const schema = yup
    .object({
      subject: yup.string().required("Please enter subject"),
    })
    .required();

  toastr.options = options;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subject: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    reset();
    toggle();
  };
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle={modalTitle}
        onClose={toggle}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <InputField
                  label="To"
                  register={register}
                  name="to"
                  errors={errors}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <CommonButton onClick={() => setShowOption(!showOption)}>
                  <i
                    className={
                      showOption ? "bx bx-chevron-up" : "bx bx-chevron-down"
                    }
                  ></i>
                </CommonButton>
              </div>
            </div>

            <div style={showOption ? {} : { display: "none" }}>
              <InputField
                label="CC"
                register={register}
                name="cc"
                errors={errors}
              />
              <InputField
                label="BCC"
                register={register}
                name="bcc"
                errors={errors}
              />
              <InputField
                label="Email Template"
                register={register}
                name="emailTemplate"
                errors={errors}
              />
            </div>

            <InputField
              label="Subject"
              register={register}
              required
              name="subject"
              errors={errors}
            />

            <Label className="form-label">Message</Label>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            />

            <Row>
              <Col>
                <ComponentCheckbox className="form-label">
                  <input type="checkbox" id="save-copy-checkbox" />
                  <LabelCheckbox
                    className="form-label"
                    for="save-copy-checkbox"
                  >
                    Send me a copy
                  </LabelCheckbox>
                </ComponentCheckbox>
                <ComponentCheckbox className="form-label">
                  <input type="checkbox" id="send-read-receipt-checkbox" />
                  <LabelCheckbox
                    className="form-label"
                    for="send-read-receipt-checkbox"
                  >
                    Send Read Receipt
                  </LabelCheckbox>
                </ComponentCheckbox>
              </Col>
              <Col>
                <CommonLabel>Select Attachments</CommonLabel>
                <div style={{ marginLeft: -8 }}>
                  <CommonButton
                    type="button"
                    onClick={() => setShowModalUpload(true)}
                  >
                    <i className="bx bx-plus"></i> Add Attachment
                  </CommonButton>
                </div>
                <ModalUploadFile
                  isOpen={showModalUpload}
                  toggle={() => setShowModalUpload(false)}
                />
              </Col>
            </Row>
            <Col xs={6}>
              <SelectField
                label="Select Languages"
                register={register}
                name="language"
                errors={errors}
                options={[]}
              />
            </Col>
          </div>
          <div className="modal-footer">
            <CommonButton type="reset">Discard</CommonButton>
            <CommonButton type="submit" level={0}>
              Send
            </CommonButton>
          </div>
        </form>
      </ModalCommon>
    </React.Fragment>
  );
};

ModalAddCommunication.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};

export default ModalAddCommunication;
