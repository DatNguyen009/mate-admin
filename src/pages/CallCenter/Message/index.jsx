import React, { useEffect } from "react";
import { Container } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import { useDispatch, useSelector } from "react-redux";
import { setStatusPhoneMessage } from "redux-toolkit/slices/CallReport";
import { useLocation } from "react-router-dom";

const Message = () => {
  const { status, date, objectIdMass } = useSelector(state => state.CallReport);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    getFilterData(status, date, objectIdMass);
    return () => {
      dispatch(
        setStatusPhoneMessage({
          status: "",
          date: "",
          objectIdMass: "",
        })
      );
    };
  }, [status, date, objectIdMass]);

  const getFilterData = (status, date, objectIdMass) => {
    if (status === "tiềm năng") {
      return {
        status,
        employee:
          location?.state?.type === "group"
            ? {
                $in: objectIdMass,
              }
            : {
                objectId: objectIdMass,
                className: "Employee",
                __type: "Pointer",
              },
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
        employee: {
          objectId: objectIdMass,
          className: "Employee",
          __type: "Pointer",
        },
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
          name="Message"
          title="Lịch sử tin nhắn"
          disableAdd
          disableDelete={localStorage.getItem("role") !== "Admin"}
          whereQuery={getFilterData(status, date, objectIdMass)}
        />
      </Container>
    </div>
  );
};

export default Message;
