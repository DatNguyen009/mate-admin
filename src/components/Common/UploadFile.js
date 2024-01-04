import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import uploadImg from "assets/images/upload-img.svg";
import { CommonButton } from "./ButtonCommon";

const UploadFile = ({ onUploaded, propsFile, disabled, readOnly }) => {
  // const [file, setFile] = useState(null);
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

    // setFile(file);
    onUploaded(file);
  };

  // const handleDeleteFile = () => {
  //   if (disabled || readOnly) return;
  //   onUploaded({ ...propsFile, isRemove: true });
  //   setFile(null);
  // };

  // useEffect(() => {
  //   if (propsFile?.isRemove) return setFile(null);
  //   setFile(propsFile);
  // }, [propsFile]);

  return (
    <React.Fragment>
      <div className="btn-upload-file">
        Thêm tệp đính kèm
        <input
          type="file"
          className="upload-file-input"
          onChange={handleUploadFile}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
    </React.Fragment>
  );
};
UploadFile.propTypes = {
  propsFile: PropTypes.object,
  onUploaded: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};
export default UploadFile;
