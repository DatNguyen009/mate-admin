import React, { useState } from "react";

import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import { CommonButton } from "components/Common/ButtonCommon";
import { Card, Col, Row, Form } from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { CommonText } from "components/Common/TextCommon";
import { uploadFilesApi } from "apis/file";

const isAbleUploadFileNumber = (selectedFiles, maxFiles) => {
  if (!maxFiles) return true;

  return selectedFiles.length <= maxFiles;
};
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const FileReviewer = ({ file, onRemove }) => {
  return (
    <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
      <div className="p-2">
        <Row className="align-items-center">
          <Col className="col-auto">
            <img
              data-dz-thumbnail=""
              height="80"
              className="avatar-sm rounded bg-light"
              alt={file.name}
              src={file.preview}
            />
          </Col>
          <Col>
            <Link to="#" className="text-muted font-weight-bold">
              {file.name}
            </Link>
            <p className="mb-0">
              <strong>{file.formattedSize}</strong>
            </p>
          </Col>
          <Col xs={1}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                onRemove(file);
              }}
              className="d-flex align-items-center"
            >
              <i className="bx bx-x" />
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default function ModalUploadFile(props) {
  const { isOpen, toggle, onUploaded, maxFiles = 0, onlyImage = false } = props;

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleOnClose = () => {
    toggle();
    setSelectedFiles([]);
  };

  const handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    if (!selectedFiles.length) {
      setSelectedFiles(files);
      return;
    }

    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = removeFile => {
    const files = selectedFiles.filter(file => file.name !== removeFile.name);
    setSelectedFiles(files);
  };

  const uploadFiles = async () => {
    if (
      !selectedFiles.length ||
      !isAbleUploadFileNumber(selectedFiles, maxFiles)
    )
      return;

    const results = await uploadFilesApi(selectedFiles);
    onUploaded(results);
    setSelectedFiles([]);
  };

  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle="Upload"
        onClose={handleOnClose}
      >
        <div className="modal-body">
          {Boolean(maxFiles) && (
            <CommonText
              color={
                isAbleUploadFileNumber(selectedFiles, maxFiles) ? "" : "red"
              }
            >
              Maximum number of files: {maxFiles}
            </CommonText>
          )}
          <Form>
            <Dropzone
              onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone">
                  <div className="dz-message needsclick" {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      accept={onlyImage ? "image/*" : ""}
                    />
                    <div className="mb-3">
                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                    </div>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className="dropzone-previews mt-3" id="file-previews">
              {selectedFiles.map((f, i) => (
                <FileReviewer key={i} file={f} onRemove={handleRemoveFile} />
              ))}
            </div>
          </Form>
        </div>

        <div className="modal-footer">
          <CommonButton level={1}>Set all private</CommonButton>
          <CommonButton
            level={0}
            onClick={uploadFiles}
            disabled={!isAbleUploadFileNumber(selectedFiles, maxFiles)}
          >
            Save
          </CommonButton>
        </div>
      </ModalCommon>
    </React.Fragment>
  );
}

FileReviewer.propTypes = {
  file: PropTypes.object,
  onRemove: PropTypes.func,
};

ModalUploadFile.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onUploaded: PropTypes.func,
  maxFiles: PropTypes.number,
  onlyImage: PropTypes.bool,
};
