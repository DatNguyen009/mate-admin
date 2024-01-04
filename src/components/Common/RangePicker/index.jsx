import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import IDatePicker from "../DatePicker";
import moment from "moment";
import SelectConst from "components/form-control/SelectConst";

const optionsPicker = [
  {
    text: "Tháng",
    value: "month",
  },
  {
    text: "Năm",
    value: "year",
  },
];
const optionDuration = [
  {
    text: "1 - Ngày",
    value: [1, "d"],
  },
  {
    text: "3 - Ngày",
    value: [3, "d"],
  },
  {
    text: "1 - Tuần",
    value: [1, "week"],
  },
  {
    text: "3 - Tuần",
    value: [3, "week"],
  },
  {
    text: "6 - Tuần",
    value: [6, "week"],
  },
  {
    text: "9 - Tuần",
    value: [9, "week"],
  },
  {
    text: "1 - Tháng",
    value: [1, "month"],
  },
  {
    text: "3 - Tháng",
    value: [3, "month"],
  },
  {
    text: "6 - Tháng",
    value: [6, "month"],
  },
  {
    text: "9 - Tháng",
    value: [9, "month"],
  },
  {
    text: "1 - Năm",
    value: [1, "year"],
  },
  {
    text: "3 - Năm",
    value: [3, "year"],
  },
];

const addDate = picker =>
  picker === "date" ? "d" : picker === "month" ? "month" : "year";
const typeDate = picker =>
  picker === "date" ? "DD/MM/YYYY" : picker === "month" ? "MM/YYYY" : "YYYY";

export default function RangePicker({
  onChange,
  dateTo,
  dateFrom,
  isColumns,
  isDuration,
  labelDateTo,
  labelDateFrom,
  picker: typePicker,
}) {
  const [picker, setPicker] = useState(typePicker);
  const [date, setDate] = useState({
    startDate: !!dateFrom ? dateFrom : moment().format("YYYY-MM-DD"),
    endDate: !!dateTo ? dateTo : moment().format("YYYY-MM-DD"),
  });

  const handleDateTo = date => {
    setDate({
      startDate: moment(date).format("YYYY-MM-DD"),
      endDate: moment(date).add(1, addDate(picker)).format("YYYY-MM-DD"),
    });
  };

  const handleDateFrom = date => {
    setDate(prev => ({
      ...prev,
      endDate: moment(date).format("YYYY-MM-DD"),
    }));
  };
  const handleDateDuration = event => {
    const [duration, date] = event.target.value.split(",");
    setDate(prev => ({
      ...prev,
      endDate: moment(prev.startDate).add(duration, date).format("YYYY-MM-DD"),
    }));
  };

  const handleDisabledDate = current => {
    return current && current < moment(date.startDate);
  };

  useEffect(() => {
    onChange?.(date);
  }, [date]);

  return (
    <Row>
      <Col xs={12} className={`d-flex gap-4 ${isColumns && "flex-column"}`}>
        <div style={{ minHeight: 60 }}>
          <IDatePicker
            picker={picker}
            label={labelDateTo}
            value={date.startDate}
            formatDate={typeDate(picker)}
            onChange={handleDateTo}
          />
        </div>
        <div style={{ minHeight: 60 }}>
          <IDatePicker
            picker={picker}
            value={date.endDate}
            label={labelDateFrom}
            formatDate={typeDate(picker)}
            onChange={handleDateFrom}
            disabledDate={handleDisabledDate}
          />
        </div>
        {isDuration && (
          <div style={{ minHeight: 60 }}>
            <SelectConst
              emptyOption="Chọn thời gian"
              label="Khoảng thời gian"
              options={optionDuration}
              onChange={handleDateDuration}
            />
          </div>
        )}

        {!typePicker && (
          <div style={{ minHeight: 60 }}>
            <SelectConst
              label="Loại thời gian"
              emptyOption="Ngày"
              options={optionsPicker}
              onChange={event => {
                const value = event.target.value;
                if (!!value) {
                  setPicker(value);
                } else {
                  setPicker("date");
                }
              }}
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

RangePicker.propTypes = {
  picker: PropTypes.string,
  dateTo: PropTypes.string,
  onChange: PropTypes.func,
  isColumns: PropTypes.bool,
  isDuration: PropTypes.bool,
  dateFrom: PropTypes.string,
  labelDateTo: PropTypes.string,
  labelDateFrom: PropTypes.string,
};
RangePicker.defaultProps = {
  picker: "",
  dateTo: "",
  dateFrom: "",
  labelDateTo: "",
  isColumns: false,
  isDuration: true,
  labelDateFrom: "",
  onChange: () => {},
};
