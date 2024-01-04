import React, { useEffect, useState } from "react";
import { CommonLabel } from "components/Common/inputCommon";
import ModalUploadFile from "components/Modal/ModalUploadFile";
import { CommonButton } from "components/Common/ButtonCommon";
import PropTypes from "prop-types";
import Spacer from "components/Common/Spacing";
import AttachmentReviewer from "./AttachmentReviewer";
import { Row } from "reactstrap";
import { deleteFileApi } from "apis/file";
import ViewableCommon from "components/Common/ViewableCommon";

const isVisibleButton = (filesUploaded, maxFiles) => {
  if (!maxFiles) return true;
  return filesUploaded?.length < maxFiles;
};
function Attachments({
  attachments,
  title,
  button,
  maxFiles,
  onChange = () => {},
  onUpdate = () => {},
}) {
  const [toggleUploadModal, setToggleUploadModal] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(attachments);

  useEffect(() => {
    setFilesUploaded(attachments || []);
  }, [attachments]);

  const toggleModal = () => {
    setToggleUploadModal(prev => !prev);
  };

  const handleFilesUploaded = files => {
    setToggleUploadModal(false);
    const attachments = [...filesUploaded, ...files];
    setFilesUploaded(attachments);
    onChange(attachments);
    onUpdate(attachments[0]?.url);
  };

  const hanleClearFile = selectedFile => {
    deleteFileApi(selectedFile);

    const attachmentFiles = filesUploaded.filter(
      file => file.name !== selectedFile.name
    );
    setFilesUploaded(attachmentFiles);
    onChange(attachmentFiles);
  };

  return (
    <React.Fragment>
      <ViewableCommon
        if={() => isVisibleButton(filesUploaded, maxFiles)}
        caseTrue={
          button ? (
            <div type="button" onClick={toggleModal}>
              {button}
            </div>
          ) : (
            <React.Fragment>
              <CommonLabel>{title || "Attachments"}</CommonLabel>
              <CommonButton
                style={{ marginLeft: 0 }}
                className="text-capitalize"
                type="button"
                onClick={toggleModal}
              >
                Attach
              </CommonButton>
            </React.Fragment>
          )
        }
      />

      <Spacer size={10} />
      <Row style={{ gap: 10 }}>
        {filesUploaded?.map(file => (
          <React.Fragment key={file.name}>
            <AttachmentReviewer file={file} onDelete={hanleClearFile} />
          </React.Fragment>
        ))}
      </Row>

      <ModalUploadFile
        isOpen={toggleUploadModal}
        toggle={toggleModal}
        onUploaded={handleFilesUploaded}
        maxFiles={maxFiles}
      />
    </React.Fragment>
  );
}

Attachments.propTypes = {
  attachments: PropTypes.array,
  onChange: PropTypes.func,
  title: PropTypes.string,
  button: PropTypes.node,
  maxFiles: PropTypes.number,
  onUpdate: PropTypes.func,
};

export default Attachments;
