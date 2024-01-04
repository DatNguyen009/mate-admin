import { yupResolver } from "@hookform/resolvers/yup";
import {
  toastrErrorAlert,
  toastrCRUDSuccess,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import UploadImage from "components/Common/UploadImage";
import InputField from "components/form-control/InputField";
import { checkExistItem, uploadImg } from "helpers/erp_helper";
import { GET_SYSCFG } from "helpers/url_helper";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "reactstrap";
import httpService from "services/httpService";
import * as yup from "yup";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import { GET_HOLIDAY_LIST } from "helpers/url_helper";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "components/Common/Spacing";
import Table from "components/form-control/Table";
import moment from "moment";
import useGetFormSchemaVer2 from "custom-hook/useGetFormSchemaVer2";
import IDatePicker from "components/Common/DatePicker";
import { DATA_HOLIDAY_LIST } from "constants/dataHolidays";
import { sortBy } from "lodash";

const HEADER = [
  {
    text: "Ngày bắt đầu",
    CellComponent: IDatePicker,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `holiday_table.${indexOfRow}.dateFrom`,
      formatDate: "DD/MM/YYYY",
      allowClear: false,
      onChange: value => {
        const { setValue } = formValue;
        const dayValue = moment(value);
        setValue(`holiday_table.${indexOfRow}.dateFrom`, dayValue);
      },
    }),
  },
  {
    text: "Ngày kết thúc",
    CellComponent: IDatePicker,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `holiday_table.${indexOfRow}.dateTo`,
      formatDate: "DD/MM/YYYY",
      allowClear: false,
      onChange: value => {
        const { setValue } = formValue;
        const dayValue = moment(value);
        setValue(`holiday_table.${indexOfRow}.dateTo`, dayValue);
      },
    }),
  },
  {
    text: "Mô tả",
    CellComponent: InputField,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `holiday_table.${indexOfRow}.description`,
    }),
  },
];

export default function NewHoliday() {
  const { id } = useParams();
  const history = useHistory();
  const [renderTable, setRenderTable] = useState(false);

  const { renderForm, handleSubmit, rest, errors } = useGetFormSchemaVer2(
    "HolidayList",
    yup
  );

  const onSubmit = async values => {
    const { createdAt, updatedAt, ...holidayValues } = values;

    const holiday = {
      year: holidayValues.year,
      holidays: holidayValues.holiday_table.map((item, index) => {
        return {
          id: index,
          dateFrom: moment(item.dateFrom).format("YYYY-MM-DD"),
          dateTo: moment(item.dateTo).format("YYYY-MM-DD"),
          description: item.description,
        };
      }),
    };

    try {
      if (id) {
        const res = await httpService.put(GET_HOLIDAY_LIST + `/${id}`, holiday);
        if (res?.updatedAt) {
          toastrCRUDSuccess("Holiday", TEXT_PUT);
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
        return;
      }

      const res = await httpService.post(GET_HOLIDAY_LIST, holiday);

      if (res?.createdAt) {
        toastrCRUDSuccess("Holiday", TEXT_POST);
        history.replace(`/holiday/${res?.objectId}`);
        return;
      }
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    } catch (error) {
      toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
    }
  };

  const includeFunctions = {
    year: {
      onChange: e => {
        //const { setValue } = rest;
        //const fromDateValue = moment(e);
        //setValue("toDate", fromDateValue.endOf("year"));
        bindDataHolidayList(e.target.value);
      },
    },
  };

  useEffect(() => {
    getHolidayList();
    if (!id) {
      bindDataHolidayList();
    }
  }, []);

  const getHolidayList = async () => {
    if (!id) return;

    const res = await httpService.get(`${GET_HOLIDAY_LIST}/${id}`);

    if (!res) {
      history.replace("/holiday");
      toastrErrorAlert("Holiday not found!");
      return;
    }

    const { reset } = rest;

    reset({
      ...res,

      year: res?.year,
      holiday_table:
        res?.holidays &&
        res?.holidays.map(item => {
          return {
            dateFrom: item.dateFrom,
            dateTo: item.dateTo,
            description: item.description,
          };
        }),
    });
  };

  const bindDataHolidayList = year => {
    const { setValue } = rest;
    const yearValue = year ? year : moment().year().toString();

    const holidays = DATA_HOLIDAY_LIST.map(item => {
      const dateSring = yearValue + "-" + item.date;

      return {
        date: dateSring,
        description: item.description,
      };
    });

    const subHolidays = [];
    const holidayWithSubDay = holidays.map(item => {
      const subDay = handleAddSubHoliday(item.date);
      if (!subDay) return { ...item };

      const hasInHolidayList = !!holidays.find(item => item.date === subDay);
      const subDayChecked =
        hasInHolidayList || subHolidays.find(item => item.date === subDay)
          ? moment(subDay).add(1, "d").format("YYYY-MM-DD")
          : subDay;

      subHolidays.push(subDayChecked);

      return {
        ...item,
        subDay: subDayChecked,
      };
    });

    const holidayTable = holidayWithSubDay.map(item => {
      const dateSplit = item.date.split("-");
      const month = dateSplit[1];
      const date = dateSplit[2];

      if (`${month}-${date}` === "04-30") {
        const dayOf01_05 = holidays.find(item => item.date?.endsWith("05-01"));

        return {
          dateFrom: item.date,
          dateTo: dayOf01_05?.subDay
            ? dayOf01_05?.subDay
            : item.subDay
            ? item.subDay
            : dayOf01_05?.date
            ? dayOf01_05?.date
            : item.date,
          description: `${item.description}, ${dayOf01_05?.description}`,
        };
      }

      if (`${month}-${date}` === "05-01") {
        return null;
      }

      return {
        dateFrom: item.date,
        dateTo: item.subDay ? item.subDay : item.date,
        description: item.description,
      };
    });

    console.log(
      "holidayTable: ",
      holidayTable
        .filter(item => item)
        .sort((a, b) => moment(b?.dateFrom) - moment(a?.dateFrom))
    );

    setValue(
      "holiday_table",
      holidayTable
        .filter(item => item)
        .sort((a, b) => moment(b?.dateFrom) - moment(a?.dateFrom))
        .map((item, index) => {
          return {
            id: index,
            dateFrom: item.dateFrom,
            dateTo: item.dateTo,
            description: item.description,
          };
        })
    );
    setRenderTable(pre => !pre);
  };

  const handleAddSubHoliday = date => {
    if (!date) return;

    const holiday = moment(date);

    let subDay;
    const dayOfWeek = holiday.lang("en").format("dddd");
    if (dayOfWeek === "Saturday") {
      subDay = holiday.add(2, "d").format("YYYY-MM-DD");
    }

    if (dayOfWeek === "Sunday") {
      subDay = holiday.add(1, "d").format("YYYY-MM-DD");
    }

    return subDay;
  };

  return (
    <div>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderCreateItem title={`Chi tiết ngày nghỉ lễ`}>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-grow-1"></div>
                <CommonButton level={0} type="submit">
                  Lưu
                </CommonButton>
              </div>
            </HeaderCreateItem>
            <Card
              style={{
                position: "relative",
              }}
              body
            >
              <CommonText level={1} className="m-0">
                Thông tin
              </CommonText>
              <Col xs={12}>{renderForm([], includeFunctions)}</Col>
              <Col xs={12}>
                <div>
                  <div className="d-flex flex-column justify-content-start align-items-start">
                    <CommonText
                      className="text-nowrap my-0"
                      level={1}
                      style={{ minWidth: "8rem" }}
                    >
                      Ngày nghỉ lễ
                    </CommonText>
                  </div>
                  <Spacer size={20} />
                  <Table
                    key={renderTable}
                    headers={HEADER}
                    formProps={{
                      errors,
                      ...rest,
                    }}
                    name="holiday_table"
                  />
                </div>
              </Col>
            </Card>
          </form>
        </Container>
      </div>
    </div>
  );
}
