import React, { useEffect } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { useDispatch, useSelector } from "react-redux";
import { setStatusCallReport } from "redux-toolkit/slices/CallReport";

const CallReport = () => {
  const { status, ext, date } = useSelector(state => state.CallReport);
  const dispatch = useDispatch();
  useEffect(() => {
    getFilterData(status, ext, date);
    return () => {
      dispatch(
        setStatusCallReport({
          query: "",
          extension: "",
          date: "",
        })
      );
    };
  }, [status, ext, date]);

  const getFilterData = (status, ext, date) => {
    if (status === "tiềm năng") {
      return {
        status,
        ext,
        createdAt: {
          $gte: {
            __type: "Date",
            iso: date?.startOfMonth,
          },
          $lte: {
            __type: "Date",
            iso: date?.endOfMonth,
          },
        },
      };
    }
    if (status === "quan tâm") {
      return {
        status,
        ext,
        createdAt: {
          $gte: {
            __type: "Date",
            iso: date?.startOfMonth,
          },
          $lte: {
            __type: "Date",
            iso: date?.endOfMonth,
          },
        },
      };
    }
    return {};
  };
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="HistoryCallLog"
          title="Lịch sử cuộc gọi"
          disableAdd
          disableDelete={localStorage.getItem("role") !== "Admin"}
          whereQuery={getFilterData(status, ext, date)}
        />
      </Container>
    </div>
  );
};

export default CallReport;
