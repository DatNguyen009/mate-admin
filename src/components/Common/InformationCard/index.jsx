import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, Col, ModalBody, ModalFooter, Row } from "reactstrap";
import styles from "./InformationCard.module.scss";
import { CommonText } from "../TextCommon";
import VVSTable from "components/form-control/VVSTable";
import IChart from "../Charts";
import { renderType } from "./renderType";
import ModalCommon from "../ModalCommon";
import { CommonButton } from "../ButtonCommon";
import SelectConst from "components/form-control/SelectConst";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import useFormWithSaveChecked from "custom-hook/useFormWithSaveChecked";
import ModalFilter from "./modal";
import httpService from "services/httpService";
import { fieldChart, fieldTask, types } from "./constants";
import { APISchema } from "./services";
import _ from "lodash";

function InformationCard({
  type,
  title,
  children,
  dataChart,
  containStyle,
  ...props
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModalFilter, setIsShowModalFilter] = useState(false);
  const [filter, setFilter] = useState({
    type: "",
    modal: "",
    data: [],
    groupBy: [],
  });

  const handleEdit = () => {
    setIsShowModalFilter(true);
  };

  const handleSetting = () => {};

  const handleSubmitFilter = data => {
    setFilter(pre => ({
      ...pre,
      ...data,
    }));
  };

  useEffect(async () => {
    const { modal } = filter;
    setIsLoading(true);

    try {
      if (modal) {
        const res = await httpService.get(`parse/classes/${modal}`);
        const data = res.results
          .filter(item => item.hasOwnProperty(filter?.groupBy))
          .map(item => ({
            [filter.groupBy]: item[filter.groupBy],
            ...(filter.data && { [filter.data]: item[filter.data] }),
          }));
        const groupBydata = _.groupBy(data, filter.groupBy);
        const keys = Object.keys(groupBydata);
        const filterData = keys.map(item => {
          return {
            name: item,
            value: filter.data
              ? _.sumBy(groupBydata[item], filter.data)
              : groupBydata[item].length,
          };
        });
        setData(filterData);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [filter, type]);
  return (
    <>
      <Card
        {...props}
        className={styles.InformationCard}
        style={{ maxHeight: type === "table" && 230 }}
      >
        <div className="bg-dark text-white">
          <CommonText
            level={1}
            className="p-2 mt-0 d-flex justify-content-between algin-item-center"
          >
            <span>{title}</span>
            <div>
              <i className="mdi mdi-square-edit-outline" onClick={handleEdit} />
              <i className="mdi mdi-tools" onClick={handleSetting}></i>
            </div>
          </CommonText>
        </div>

        {isLoading ? (
          <div className={styles.loading}>
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : !data?.length ? (
          <div className={styles.nodata}>
            <i className="fas fa-database" />
            <span>No data</span>
          </div>
        ) : (
          <div
            className={`${styles.content} p-0 ${
              type === types.CHART && styles.containerChart
            } ${containStyle} `}
            style={typeof containStyle === "object" ? containStyle : undefined}
          >
            {filter.type === "table" ? (
              <span>table</span>
            ) : (
              <IChart type={filter?.type} dataChart={data} />
            )}
          </div>
        )}
      </Card>

      {type === types.CHART && (
        <ModalFilter
          title="chọn loại biểu đồ"
          isOk={handleSubmitFilter}
          isOpen={isShowModalFilter}
          handleOpen={setIsShowModalFilter}
        />
      )}
    </>
  );
}

InformationCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array,
  dataChart: PropTypes.array || PropTypes.object,
  containStyle: PropTypes.string | PropTypes.object,
  type: PropTypes.oneOf(["task", "chart"]).isRequired,
};
InformationCard.defaultProps = {
  containStyle: "",
};

export default InformationCard;
