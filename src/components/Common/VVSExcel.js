import React, { useState } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { CommonButton } from "./ButtonCommon";
import ModalCommon from "./ModalCommon";
import { ModalBody, ModalFooter } from "reactstrap";
import Spacer from "./Spacing";
import httpService from "services/httpService";
import { toastrCRUDSuccess, toastrError } from "./AlertToastr";
import { TEXT_POST } from "helpers/name_helper";
import moment from "moment";
import "moment/locale/es";
import { language_vn } from "helpers/language_vn";

VVSExcel.propTypes = {
  modelName: PropTypes.string,
  onChange: PropTypes.func,
  onOutputExcels: PropTypes.func,
  template: PropTypes.array,
};

export default function VVSExcel({ modelName, onOutputExcels, template }) {
  const [column, setColumn] = useState([]);
  const [excels, setExcels] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const language = language_vn;

  const handleFilesUploaded = async e => {
    setExcels([]);
    setColumn([]);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workBook = XLSX.readFile(data, {
      cellText: false,
      cellDates: true,
    });

    const workSheet = workBook.Sheets[workBook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json(workSheet, {
      defval: "",
      dateNF: "dd-mm-yyyy",
      cellDates: true,
      raw: false,
    });

    Object.entries(jsonData[0]).forEach(([key]) => {
      setColumn(prev => [...prev, key]);
    });
    setExcels(jsonData);
    onOutputExcels(jsonData);
    setOpenModalImport(false);
  };

  const toggleModal = () => {
    setOpenModal(prev => !prev);
  };

  const onDownloadTemplete = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(template);
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `Template${modelName}.xlsx`);
    setOpenModalImport(false);
  };

  return (
    <React.Fragment>
      <CommonButton
        onClick={() => {
          setOpenModalImport(true);
        }}
        type="button"
      >
        <i className="bx bx-export"></i>
      </CommonButton>

      <ModalCommon
        modalTitle="Preview"
        isShowModal={openModal}
        onClose={toggleModal}
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <ModalBody>
          <Spacer size={20} />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">STT</th>
                {column?.map((row, i) => (
                  <th key={i} scope="col">
                    {!row.search("__EMPTY") ? "" : row}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excels.map((row, i) => {
                const renderColumn = Object.entries(row).map(
                  ([key, value], index) => {
                    return (
                      <td key={index + "row"}>
                        {typeof value !== "object"
                          ? value
                          : moment(value).format("hh:mm, D/MM/YYYY")}
                      </td>
                    );
                  }
                );

                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    {renderColumn}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={toggleModal} type="button">
            Done
          </CommonButton>
        </ModalFooter>
      </ModalCommon>

      <ModalCommon
        modalTitle={language.import_excel}
        isShowModal={openModalImport}
        onClose={() => {
          setOpenModalImport(false);
        }}
      >
        <ModalBody>
          <Spacer size={20} />
          <div className="d-flex gap-2 justify-content-center">
            <CommonButton type="button" onClick={onDownloadTemplete}>
              {language.download_template}
            </CommonButton>
            <label
              htmlFor="file-upload"
              className="custom-file-upload"
              style={{
                display: "flex",
                border: "1px solid rgb(216 210 210)",
                display: "inline-block",
                padding: "7px 13px",
                cursor: "pointer",
                borderRadius: "6px",
                height: "38px",
                marginBottom: "0px",
                alignItems: "center",
                marginRight: "5px",
                backgroundColor: "white",
              }}
            >
              <i className="bx bx-export" style={{ fontSize: "16px" }}></i>
              {""} Import
            </label>

            <input
              id="file-upload"
              type="file"
              onChange={e => handleFilesUploaded(e)}
              style={{ display: "none" }}
            />
          </div>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={2}
            onClick={() => {
              setOpenModalImport(false);
            }}
            type="button"
          >
            {language.close}
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </React.Fragment>
  );
}
