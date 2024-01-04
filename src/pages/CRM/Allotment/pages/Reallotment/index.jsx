import Table from "components/form-control/Table";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import { fetchEmployeeByGroup } from "pages/CRM/Lead/services/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from "reactstrap";
import {
  HEADERS_EMPLOYEE_ALLOTMENTLEAD,
  HEADERS_RECEIVERS,
  HEADERS_SENDERS,
} from "../../constants/columnTable";
import { CommonButton } from "components/Common/ButtonCommon";
import InputFieldNumber from "components/form-control/InputFieldNumber";
import InputField from "components/form-control/InputField";
import SelectConst from "components/form-control/SelectConst";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { message } from "antd";
import httpService from "services/httpService";
import { useHistory } from "react-router-dom";
import RangePicker from "components/Common/RangePicker";
import styled from "styled-components";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import moment from "moment";

const REALLOTMENT_URL = "/api/v1/reallotment";

function Reallotment() {
  const [senders, setSenders] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [selectSenders, setSelectSenders] = useState([]);
  const [selectReceivers, setSelectReceivers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [selectedNewEmployee, setSelectedNewEmployee] = useState({});

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const schema = yup
    .object({
      amount: yup.string(),
      status: yup.string(),
    })
    .required();

  const formProps = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      status: "Tất cả",
    },
  });

  const {
    reset,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = formProps;

  useEffect(async () => {
    const { res } = await fetchEmployeeByGroup(selectedEmployee);
    setSenders(res.results);
  }, [selectedEmployee]);

  useEffect(async () => {
    const { res } = await fetchEmployeeByGroup(selectedNewEmployee);
    setReceivers(res.results);
  }, [selectedNewEmployee]);

  useEffect(() => {
    const dataColumn = senders?.map(item => {
      return {
        name: item.fullName,
        objectId: item.objectId,
        groupId: item.group.objectId,
      };
    });

    reset({
      ...getValues(),
      senders: dataColumn,
    });
  }, [senders]);

  useEffect(() => {
    const dataColumn = receivers?.map(item => {
      return {
        name: item.fullName,
        objectId: item.objectId,
        groupId: item.group.objectId,
      };
    });

    reset({
      ...getValues(),
      receivers: dataColumn,
    });
  }, [receivers]);

  const onSubmit = async value => {
    const { objectId, selectedEmployee, selectedNewEmployee, ...data } = value;

    const nowDate = moment().format("YYYY-MM-DD");

    const newValues = {
      ...data,
      ...(+value.amount < 0 && { amount: value.amount }),
      ...(value.status.length < 0 && { amount: value.amount }),
      ...(dateFrom !== nowDate && { toDate: dateTo, fromDate: dateFrom }),
      senders: value.senders.filter((_, index) =>
        selectSenders.some(i => i === index)
      ),
      receivers: value.receivers.filter((_, index) =>
        selectReceivers.some(i => i === index)
      ),
    };
    if (!newValues.senders.length || !newValues.receivers.length) {
      message.error("Chọn nhân viên chuyển & nhận");
      return;
    }

    const params = {
      ...newValues,
      amount: +newValues.amount,
      senders: newValues.senders?.map(sender => sender.objectId),
      receivers: newValues.receivers?.map(receiver => ({
        salesTeam: receiver.groupId,
        salesStaff: receiver.objectId,
      })),
      status: newValues.status === "Tất cả" ? "" : newValues.status,
    };

    try {
      await httpService.post(REALLOTMENT_URL, params);
      message.success("Phân bổ thành công");
      reset({});
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container fluid>
        <Row>
          <Col sm={5}>
            <h4 className="mb-4">Bên Chuyển</h4>
            <VVSSelectModel
              className="mb-4"
              model="EmployeeGroup"
              name="selectedEmployee"
              placeholder="Chọn nhóm"
              errors={errors}
              onSelect={item => {
                setSelectedEmployee(item);
              }}
              {...formProps}
              conditionField={{
                isActive: true,
              }}
            />
            <Table
              headers={HEADERS_SENDERS}
              defaultRowValue={{}}
              formProps={{
                errors,
                ...formProps,
              }}
              disableAdd
              disableDelete
              onSelect={setSelectSenders}
              name="senders"
            />
          </Col>
          <Col sm={2} className="mt-5">
            <Row className="p-4 gap-4">
              <Col sm={12}>
                <CommonButton level={0} type="submit" className="m-auto">
                  Phân bổ
                </CommonButton>
              </Col>
              <Col sm={12}>
                <Row className="align-items-center">
                  <Col sm={7}>
                    <InputField
                      label="Số lượng"
                      type="number"
                      placeHolder="Tất cả"
                      name="amount"
                      {...formProps}
                      errors={errors}
                    />
                  </Col>
                  <Col sm={5}>
                    <ComponentCheckbox>
                      <input
                        type="checkbox"
                        name="isRenew"
                        {...formProps.register("isRenew")}
                      />
                      <CommonText style={{ marginLeft: 5, marginTop: 0 }}>
                        Tạo mới
                      </CommonText>
                    </ComponentCheckbox>
                  </Col>
                </Row>
              </Col>

              <Col sm={12}>
                <SelectConst
                  label="Trạng thái"
                  sysCfgName="leadStatus2"
                  name="status"
                  {...formProps}
                  errors={errors}
                />
              </Col>

              <ComponentCheckbox>
                <FieldsetBox>
                  <input
                    type="checkbox"
                    value={isSelectDate}
                    onChange={e => setIsSelectDate(e.target.checked)}
                  />
                  <CommonText style={{ marginLeft: 5, marginTop: 0 }}>
                    Chọn theo thời gian
                  </CommonText>
                </FieldsetBox>
              </ComponentCheckbox>
              <BoxDate sm={12} className="p-3" data-disabed={!isSelectDate}>
                <RangePicker
                  picker="date"
                  isDuration={false}
                  labelDateFrom="Đến tháng"
                  labelDateTo="Từ tháng"
                  isColumns={true}
                  onChange={date => {
                    setDateTo(date.endDate);
                    setDateFrom(date.startDate);
                  }}
                />
              </BoxDate>
            </Row>
          </Col>
          <Col sm={5}>
            <h4 className="mb-4">Bên nhận</h4>
            <VVSSelectModel
              className="mb-4"
              model="EmployeeGroup"
              name="selectedNewEmployee"
              placeholder="Chọn nhóm"
              errors={errors}
              onSelect={item => {
                setSelectedNewEmployee(item);
              }}
              {...formProps}
              conditionField={{
                isActive: true,
              }}
            />
            <Table
              headers={HEADERS_RECEIVERS}
              defaultRowValue={{}}
              formProps={{
                errors,
                ...formProps,
              }}
              onSelect={setSelectReceivers}
              disableAdd
              disableDelete
              name="receivers"
            />
          </Col>
        </Row>
      </Container>
    </form>
  );
}

const FieldsetBox = styled.span`
  position: relative;
  bottom: -35px;
  background: #f8f8fb;
  z-index: 1;
  padding: 0px 5px;
  border-radius: 12px;
`;

const BoxDate = styled(Col)`
  border: 1px solid silver;
  border-radius: 6px;

  &[data-disabed="true"] {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.5;
      background-color: white;
    }
  }
`;

export default Reallotment;
