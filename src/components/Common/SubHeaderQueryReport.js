import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import ModalAddCard from "components/Modal/ModalAddCard";
import ModalCreateCard from "components/Modal/ModalCreateCard";
import ModalSetChart from "components/Modal/ModalSetChart";
import Spacing from "./Spacing";
import { CommonButton } from "./ButtonCommon";

export default function SubHeader(props) {
  const { createCard, setChart, addChart } = props;
  let location = useLocation();
  const pathName = location.pathname;
  const nameList = pathName.split("/");
  const [modalCreateCard, setModalCreateCard] = useState(false);
  const [modalAddCard, setModalAddCard] = useState(false);
  const [modalSetChart, setModalSetChart] = useState(false);

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const toggleCreateCard = () => {
    setModalCreateCard(prev => !prev);
    removeBodyCss();
  };

  const toggleAddCard = () => {
    setModalAddCard(prev => !prev);
    removeBodyCss();
  };

  const toggleSetChart = () => {
    setModalSetChart(prev => !prev);
    removeBodyCss();
  };

  return (
    <React.Fragment>
      <div className="subHeaderQueryReports d-flex justify-content-between align-items-center">
        <h1>{nameList[nameList.length - 1].replaceAll("-", " ")}</h1>
        <div className="d-flex justify-content-between align-items-center">
          {createCard && (
            <>
              <CommonButton
                type="button"
                data-toggle="modal"
                data-target="#myModal"
                onClick={toggleCreateCard}
              >
                Create Card
              </CommonButton>
              <ModalCreateCard
                isOpen={modalCreateCard}
                toggle={toggleCreateCard}
              />
            </>
          )}
          {setChart && (
            <>
              <CommonButton
                type="button"
                data-toggle="modall"
                data-target="#myModall"
                onClick={toggleSetChart}
              >
                Set chart
              </CommonButton>
              <ModalSetChart isOpen={modalSetChart} toggle={toggleSetChart} />
            </>
          )}
          {addChart && (
            <>
              <CommonButton
                type="button"
                data-toggle="modall"
                data-target="#myModal"
                onClick={toggleAddCard}
              >
                Add Chart to Dashboard
              </CommonButton>
              <ModalAddCard isOpen={modalAddCard} toggle={toggleAddCard} />
            </>
          )}
          <div className="d-flex">
            <CommonButton>
              <i className="bx bx-reset"></i>
            </CommonButton>

            <CommonButton>
              <i className="bx bx-dots-horizontal-rounded"></i>
            </CommonButton>
          </div>
        </div>
      </div>
      <Spacing size={10}></Spacing>
    </React.Fragment>
  );
}

SubHeader.propTypes = {
  createCard: PropTypes.bool,
  setChart: PropTypes.bool,
  addChart: PropTypes.bool,
};
