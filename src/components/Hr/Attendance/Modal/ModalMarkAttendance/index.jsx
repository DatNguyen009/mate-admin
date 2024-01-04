import React, { useEffect, useState } from "react";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, Row, ModalFooter } from "reactstrap";
import * as yup from "yup";
import Spacing from "components/Common/Spacing";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectField from "components/form-control/Select";
import useReuseData from "custom-hook/useReuseData";
import { fetchSysCfg } from "redux-toolkit/slices/SysCfgSlice/SysCfgSlice";
import VVSSelect from "components/form-control/VVSSelect";
import { ComponentCheckbox } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "components/Common/Spacing";
import { fetchAttendance } from "redux-toolkit/slices/Attendance/Attendance";
import { GET_ATTENDANCE } from "helpers/url_helper";
import { ATTENDANCE, TEXT_POST } from "helpers/name_helper";
import {
  toastrCRUDSuccess,
  toastrError,
  toastrErrorAlert,
} from "components/Common/AlertToastr";
import { useDispatch } from "react-redux";
import { getSeries } from "helpers/erp_helper";
import httpService from "services/httpService";

const STATUS_OPTIONS = [
  { index: 1, name: "Present", value: "present" },
  { index: 2, name: "Absent", value: "absent" },
  { index: 3, name: "On Leave", value: "onLeave" },
  { index: 4, name: "Haft Day", value: "haftDay" },
  { index: 5, name: "Work From Home", value: "workFromHome" },
];

export default function ModalMarkAttendance(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;
  const { month } = useReuseData(fetchSysCfg, "SysCfgToolkit");
  const { attendances } = useReuseData(fetchAttendance, "Attendance");
  const [months, setMonths] = useState();
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [daySelected, setDaySelected] = useState([]);
  const [employeeSelected, setEmployeeSelected] = useState([]);
  const dispatch = useDispatch();

  const schema = yup
    .object({
      employee: yup.string().required("Please Enter Your For Employee"),
      month: yup.string().required("Please Enter Your Month"),
    })
    .required();
  const initialMarkAttendance = {
    employee: "",
    month: "",
    status: "",
  };

  useEffect(() => {
    if (employeeSelected?.objectId && months) {
      const date = new Date();
      const daysInMonth = getDaysInMonth(date.getFullYear(), months);
      const dates = [];
      attendances.forEach(attendance => {
        if (attendance?.employee?.objectId === employeeSelected?.objectId) {
          const date = attendance?.date.iso.slice(0, 10).split("-");
          const dateFormat = `${date[2]}-${date[1]}-${date[0]}`;
          dates.push(dateFormat);
          return;
        }
      });
      const daysInMonthFilter = daysInMonth.filter(day => !dates.includes(day));
      setDaysInMonth(daysInMonthFilter);
      setDaySelected(daysInMonthFilter);
    }
  }, [months, JSON.stringify(employeeSelected)]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    initialMarkAttendance,
    resolver: yupResolver(schema),
  });

  const getDaysInMonth = (year, month) => {
    const monthIndex = month - 1;
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() === monthIndex) {
      if (date.getDay() !== 6 && date.getDay() !== 0) {
        result.push(
          `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${
            month < 10 ? `0${month}` : month
          }-${date.getFullYear()}`
        );
      }
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  const handleChangeDay = (e, day) => {
    if (!e.target.checked) {
      const daysInMonthFilter = daySelected.filter(d => d !== day);
      setDaySelected(daysInMonthFilter);
      return;
    }
    setDaySelected(prev => [...prev, day]);
  };

  const onSubmit = async values => {
    if (!daySelected.length) {
      toastrErrorAlert("Please choose your date!!!");
      return;
    }
    for (const day of daySelected) {
      const dateFormat = day.split("-");
      const res = await dispatch(fetchAttendance());
      const series = getSeries(res.payload, "HR-ATT");
      try {
        await httpService.post(GET_ATTENDANCE, {
          series,
          employee: {
            objectId: employeeSelected?.objectId,
            __type: "Pointer",
            className: "Employee",
          },
          status: values.status,
          date: {
            iso: new Date(`${dateFormat[2]}-${dateFormat[1]}-${dateFormat[0]}`),
            __type: "Date",
          },
        });
      } catch (error) {
        toastrError();
        return;
      }
    }
    await dispatch(fetchAttendance());
    toastrCRUDSuccess(ATTENDANCE, TEXT_POST);
    onCloseModal();
  };

  return (
    <ModalCommon
      modalTitle={modalTitle}
      isShowModal={isShowModal}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col className="col-12">
              <VVSSelect
                label="For Employee"
                name="employee"
                register={register}
                required
                errors={errors}
                model="Employee"
                searchField="series"
                fieldView={["series", "fullName"]}
                reset={reset}
                setValue={setValue}
                onSelect={setEmployeeSelected}
              />
              <SelectField
                label="For Month"
                name="month"
                options={month}
                register={register}
                required
                errors={errors}
                onChange={e => setMonths(e.target.value)}
              />

              {months && employeeSelected?.objectId && (
                <>
                  <SelectField
                    label="Status"
                    name="status"
                    options={STATUS_OPTIONS}
                    register={register}
                    required
                    errors={errors}
                    helperText="Unmarked Attendance for days"
                  />
                  <Spacer size={20} />
                  <div
                    className="grid-container"
                    style={{
                      display: "grid",
                      gap: "20px",
                      gridTemplateColumns: "auto auto auto",
                      justifyContent: "space-between",
                    }}
                  >
                    {daysInMonth?.map((day, index) => (
                      <ComponentCheckbox key={index}>
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          onChange={e => handleChangeDay(e, day)}
                        />
                        <CommonText style={{ marginLeft: 5, marginTop: 0 }}>
                          {day}
                        </CommonText>
                      </ComponentCheckbox>
                    ))}
                  </div>
                </>
              )}

              <Spacing size={16}></Spacing>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} className=" text-capitalize" type="submit">
            Save
          </CommonButton>
        </ModalFooter>
      </form>
    </ModalCommon>
  );
}

ModalMarkAttendance.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
