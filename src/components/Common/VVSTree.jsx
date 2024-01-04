import React, { useEffect, useState } from "react";
import httpService from "services/httpService";
import { v4 as uuidv4 } from "uuid";
import { CommonButton } from "./ButtonCommon";
import PropTypes from "prop-types";
import ModalAddChartOfAccount from "components/Modal/ModalAddChartOfAccount";
import ModalNewDepartment from "components/Hr/Employee/Modal/ModalNewDepartment/ModalNewDepartment";

VVSTree.propTypes = {
  modelName: PropTypes.string,
  conditionField: PropTypes.object,
  company: PropTypes.object,
  include: PropTypes.array,
};

export default function VVSTree(props) {
  const { modelName, conditionField, company, include } = props;
  const [dataOfModel, setDataOfModel] = useState([]);
  const [param, setParam] = useState(include);
  const [strChildTemp, setStrChildTemp] = useState("");
  const [count, setCount] = useState(1);
  const [paramTemp, setParamTemp] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [nodeParentSelected, setNodeParentSelected] = useState({});
  const [isBtnChild, setIsBtnChild] = useState(false);

  const params = {
    params: {
      include: param.concat(paramTemp),
      where: {
        ...conditionField,
      },
    },
  };

  useEffect(async () => {
    const res = await httpService.get(`/parse/classes/${modelName}`, params);
    setDataOfModel(res.results);
    createStrChildTemp(count);
    setCount(prev => prev + 1);
  }, [JSON.stringify(param)]);

  useEffect(() => {
    createStrChildTemp(count);
  }, [count]);

  useEffect(() => {
    if (
      strChildTemp &&
      strChildTemp !== undefined &&
      strChildTemp.slice(0, 1) === "."
    ) {
      setStrChildTemp(strChildTemp.slice(1, strChildTemp.length));
      setParam(prev => [...prev, strChildTemp.slice(1, strChildTemp.length)]);
      return;
    }

    if (strChildTemp && strChildTemp !== undefined) {
      setParamTemp(prev => [...prev, strChildTemp]);
      return;
    }
  }, [JSON.stringify(strChildTemp)]);

  useEffect(async () => {
    const res = await httpService.get(`/parse/classes/${modelName}`, params);
    setDataOfModel(res.results);
  }, [
    JSON.stringify(paramTemp),
    JSON.stringify(dataOfModel),
    JSON.stringify(company),
  ]);

  const createStrChildTemp = v => {
    for (let i = 1; i <= v; i++) {
      setStrChildTemp(prev => prev.concat(".nodeChild"));
    }
  };

  const handleOpenCloseFolder = (parentId, iconId, btn, id) => {
    const nodeParentSelected = document.getElementById(`${parentId}`);
    const tagISelected = document.getElementById(`${iconId}`);
    const btnSelected = document.getElementsByClassName(`${btn}`);
    const btnChildSelected = document.getElementById(`${id}`);

    for (let i = 0; i < btnSelected.length; i++) {
      btnSelected[i].classList.remove("d-block");
      btnSelected[i].classList.add("d-none");
    }
    btnChildSelected.classList.remove("d-none");
    btnChildSelected.classList.add("d-block");
    setIsBtnChild(true);

    if (!nodeParentSelected) return;
    const openAtr = nodeParentSelected.getAttribute("open");

    if (openAtr === null) {
      nodeParentSelected.classList.remove("d-none");
      nodeParentSelected.classList.add("d-block");
      nodeParentSelected.setAttribute("open", "");

      tagISelected.classList.remove("mdi-folder-outline");
      tagISelected.classList.add("mdi-folder-open-outline");
      return;
    }
    nodeParentSelected.classList.remove("d-block");
    nodeParentSelected.classList.add("d-none");
    nodeParentSelected.removeAttribute("open", "");

    tagISelected.classList.remove("mdi-folder-open-outline");
    tagISelected.classList.add("mdi-folder-outline");
  };

  const handleShowModal = (nodeParent, type) => {
    !isShow && nodeParent && setNodeParentSelected(nodeParent);
    type === "nodeParent" && setNodeParentSelected(null);
    setIsShow(prev => !prev);
  };

  const handleOpenFolderParent = () => {
    const btnSelected = document.getElementsByClassName("btn-group-child");
    setIsBtnChild(false);

    for (let i = 0; i < btnSelected.length; i++) {
      btnSelected[i].classList.remove("d-block");
      btnSelected[i].classList.add("d-none");
    }
  };

  const renderChild = (nodeChild, className) => {
    return (
      <div id={className} className="d-none">
        {nodeChild?.map((item, index) => {
          const id = uuidv4();
          const iconId = uuidv4();
          const btnId = uuidv4();
          return (
            <div
              key={index + item.objectId}
              style={{ marginLeft: 40, marginBottom: 10 }}
            >
              <div className="node">
                <i
                  id={`icon-${iconId}`}
                  className={`${
                    item.isGroup
                      ? "mdi mdi-folder-outline"
                      : "mdi mdi-checkbox-blank-circle-outline"
                  }`}
                  onClick={() =>
                    handleOpenCloseFolder(
                      `node-child-${id}`,
                      `icon-${iconId}`,
                      `btn-group-child`,
                      btnId
                    )
                  }
                ></i>
                <p
                  onClick={() =>
                    handleOpenCloseFolder(
                      `node-child-${id}`,
                      `icon-${iconId}`,
                      `btn-group-child`,
                      btnId
                    )
                  }
                >
                  {item?.name}
                </p>
                <div id={btnId} className="btn-group d-none btn-group-child">
                  <div className="d-flex">
                    <CommonButton className="btn-border-top-bottom-right-0">
                      Edit
                    </CommonButton>
                    <CommonButton
                      className={!item?.isGroup ? "btn-border" : "btn-border-1"}
                    >
                      Delete
                    </CommonButton>
                    {item?.isGroup && (
                      <CommonButton
                        className="btn-border-top-bottom-left-0"
                        onClick={() => handleShowModal(item)}
                      >
                        Add Child
                      </CommonButton>
                    )}
                  </div>
                </div>
              </div>
              {item?.nodeChild &&
                renderChild(item?.nodeChild, `node-child-${id}`)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {company?.name && (
        <div className="d-flex justify-content-start align-items-center gap-3 mt-3 mb-3">
          <i
            className="mdi mdi-folder-outline"
            style={{ fontSize: "20px" }}
          ></i>
          <span
            style={{ fontWeight: 700, cursor: "pointer", fontSize: "18px" }}
            onClick={handleOpenFolderParent}
          >
            {company?.name}
          </span>
          {!isBtnChild && (
            <CommonButton onClick={() => handleShowModal(null, "nodeParent")}>
              Add Child
            </CommonButton>
          )}
        </div>
      )}
      {dataOfModel.map((item, index) => {
        const id = uuidv4();
        const iconId = uuidv4();
        const btnId = uuidv4();
        return (
          <div className="node-parent" key={index + item.objectId}>
            <div className="node">
              <i
                id={`icon-${iconId}`}
                className={`${
                  item.isGroup
                    ? "mdi mdi-folder-outline"
                    : "mdi mdi-checkbox-blank-circle-outline"
                }`}
                onClick={() =>
                  handleOpenCloseFolder(
                    `node-${id}`,
                    `icon-${iconId}`,
                    `btn-group-child`,
                    btnId
                  )
                }
              ></i>
              <p
                onClick={() =>
                  handleOpenCloseFolder(
                    `node-${id}`,
                    `icon-${iconId}`,
                    `btn-group-child`,
                    btnId
                  )
                }
              >
                {item.name}
              </p>
              <div id={btnId} className="btn-group d-none btn-group-child">
                <div className="d-flex">
                  <CommonButton className="btn-border-top-bottom-right-0">
                    Edit
                  </CommonButton>
                  <CommonButton
                    className={!item?.isGroup ? "btn-border" : "btn-border-1"}
                  >
                    Delete
                  </CommonButton>
                  {item.isGroup && (
                    <CommonButton
                      className="btn-border-top-bottom-left-0"
                      onClick={() => handleShowModal(item)}
                    >
                      Add Child
                    </CommonButton>
                  )}
                </div>
              </div>
            </div>
            {item?.nodeChild && renderChild(item?.nodeChild, `node-${id}`)}
          </div>
        );
      })}
      {modelName === "Account" && (
        <ModalAddChartOfAccount
          isOpen={isShow}
          title={modelName}
          toggle={handleShowModal}
          size="lg"
          company={company}
          nodeParent={nodeParentSelected}
          onChange={setDataOfModel}
        />
      )}

      {modelName === "Department" && (
        <ModalNewDepartment
          isOpen={isShow}
          title={modelName}
          toggle={handleShowModal}
          company={company}
          nodeParent={nodeParentSelected}
          onChange={setDataOfModel}
        />
      )}
    </div>
  );
}
