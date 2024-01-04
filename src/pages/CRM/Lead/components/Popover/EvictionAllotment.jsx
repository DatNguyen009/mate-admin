import { Radio } from "antd";
import { toastrSuccessAlert } from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import { CommonInput, CommonSelect } from "components/Common/inputCommon";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import httpService from "services/httpService";
import {
  createAllotmentData,
  fetchEvicAllot,
  fetchSysCfgAllotment,
} from "../../services/api";

const RadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
  & .title {
    width: 40px;
  }
`;

export default function EvictionAllotment({
  option,
  teamId,
  handleOpen,
  updateList,
}) {
  const [selected, setSelected] = useState();
  const [optionSelect, setOptionSelect] = useState(option);
  useEffect(() => {
    setOptionSelect(prev => [
      { fullName: "Chọn nhân viên", objectId: "" },
      ...prev,
    ]);
  }, []);

  const [field, setField] = useState({
    oldEmployeeId: "",
    newEmployeeId: "",
    teamId,
  });
  const ref = useRef(field);

  const onSelected = e => {
    setSelected(e.target.value);
  };
  const handleOnChange = e => {
    setSelected(1);
    setField(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async () => {
    handleOpen(false);
    setOptionSelect(optionSelect);
    setField(ref.current);
    await fetchEvicAllot(selected, field, teamId);
  };

  const optionNewEmployee = useMemo(
    () =>
      optionSelect.filter(
        (item, index) => item.objectId !== field.oldEmployeeId
      ),
    [field]
  );
  const isSelected = useMemo(() => field.oldEmployeeId.length === 0, [field]);

  useEffect(() => {
    if (selected !== 1)
      setField(prev => ({ ...ref.current, oldEmployeeId: prev.oldEmployeeId }));
  }, [selected]);

  return (
    <>
      <div className="d-flex  flex-column my-2">
        <label htmlFor="oldEmployeeId" className="title">
          Chọn nhân viên thu hồi :
        </label>
        <div>
          <CommonSelect
            style={{ width: 250 }}
            name="oldEmployeeId"
            id="oldEmployeeId"
            placeholder="Chọn nhân viên"
            onChange={handleOnChange}
          >
            {optionSelect.map((item, index) => {
              return (
                <option key={index} value={item.objectId}>
                  {index !== 0
                    ? `${item?.fullName} ( ${item?.employeeId} )`
                    : `${item?.fullName}`}
                </option>
              );
            })}
          </CommonSelect>
        </div>
      </div>
      <RadioGroup onChange={onSelected} value={selected}>
        <Radio value={1} disabled={isSelected}>
          <div>Thu hồi và phân bổ chỉ định :</div>
          <div className="d-flex align-items-center">
            <div className="title">Đến :</div>
            <div>
              <CommonSelect
                style={{ width: 200 }}
                disabled={selected !== 1 || isSelected}
                name="newEmployeeId"
                id="newEmployeeId"
                placeholder="Nhân viên mới"
                onChange={handleOnChange}
              >
                {field.oldEmployeeId &&
                  optionNewEmployee.map((item, index) => {
                    return (
                      <option key={item.objectId} value={item.objectId}>
                        {index !== 0
                          ? `${item?.fullName} ( ${item?.employeeId} )`
                          : `${item?.fullName}`}
                      </option>
                    );
                  })}
              </CommonSelect>
            </div>
          </div>
        </Radio>
        <Radio value={2} disabled={isSelected}>
          Thu hồi và phân bổ điều cho nhóm{" "}
        </Radio>
        {/* <Radio value={3} disabled={isSelected}> */}
        <Radio value={3} disabled>
          Thu hồi và không phân bổ
        </Radio>
      </RadioGroup>
      <CommonButton
        level={0}
        className="ms-auto"
        type="button"
        disabled={isSelected}
        onClick={onSubmit}
      >
        Thu hồi
      </CommonButton>
    </>
  );
}

EvictionAllotment.propTypes = {
  option: PropTypes.array,
  handleOpen: PropTypes.func,
  updateList: PropTypes.func,
  teamId: PropTypes.string.isRequired,
};
EvictionAllotment.defaultProps = {
  option: [],
  hanldeOpen: () => {},
  updateList: () => {},
};
