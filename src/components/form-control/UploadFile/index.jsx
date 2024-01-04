import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import uploadImg from "assets/images/upload-files.svg";
import { toastrErrorAlert } from "components/Common/AlertToastr";
import { CommonText } from "components/Common/TextCommon";

import FileAttachments from "components/Common/FileAttachments";
function UploadFIle({ name, label, setValue, watch, setError, errors }) {
  const attachments = watch(name);
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleUploadFile = async e => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });
    if (file.size >= 1000000) {
      toastrErrorAlert("Maximum size is 1 MB!");
      setError(name, {
        type: "overMaximumFileSize",
        message: "Dung lượng file vượt quá 1 MB",
      });
      return;
    }

    setValue(name, [...attachments, file]);
  };

  return (
    <React.Fragment>
      {label && <CommonText>{label}</CommonText>}
      <div className="position-relative mb-2">
        <img src={uploadImg} className="rounded w-100 cursor-pointer" />
        <input
          type="file"
          className="upload-input"
          onChange={handleUploadFile}
        />
      </div>
      <FileAttachments
        attachments={attachments}
        onChange={value => setValue(name, value)}
      />
      <CommonText level={0} color={"red"} style={{ margin: 0 }}>
        {_.get(errors, name)?.message}
      </CommonText>
    </React.Fragment>
  );
}
UploadFIle.propTypes = {
  label: PropTypes.string,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  name: PropTypes.string,
  setError: PropTypes.func,
  errors: PropTypes.object,
};
export default UploadFIle;
