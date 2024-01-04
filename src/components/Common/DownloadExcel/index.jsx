import * as XLSX from "xlsx";
import React, { useState } from "react";
import { CommonButton } from "../ButtonCommon";
import PropTypes from "prop-types";

function DownloadExcel({ data }) {
  const keys = Object.keys(data);
  const handleDownload = () => {
    var wb = XLSX.utils.book_new();
    for (let index = 0; index < keys.length; index++) {
      var ws = XLSX.utils.json_to_sheet(data[keys[index]]);
      XLSX.utils.book_append_sheet(wb, ws, `${keys[index]}`);
    }
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  return (
    <div>
      <CommonButton style={{ fontSize: 14 }} onClick={handleDownload}>
        <i className="bx bx-import me-2"></i>
        <span> Tải Excel</span>
      </CommonButton>
    </div>
  );
}
DownloadExcel.propTypes = {
  data: PropTypes.array,
};
export default DownloadExcel;
