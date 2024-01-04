import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "reactstrap";

import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import Spacer from "components/Common/Spacing";
import InputField from "components/form-control/InputField";
import { language_vn } from "helpers/language_vn";
import { GET_SYSCFG } from "helpers/url_helper";
import httpService from "services/httpService";

const configCol = [
  {
    name: "STT",
  },
  {
    name: "Tên giai đoạn",
  },
  {
    name: "Thành công",
  },
  {
    name: "Thất bại",
  },
  {
    name: "Hành động",
  },
];

export default function SalePipeline() {
  const [stageOpportunity, setStageOpportunity] = useState([]);
  const [sysCfg, setSysCfg] = useState({});

  const { handleSubmit, ...rest } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    getStageOpportunity();
  }, []);

  const getStageOpportunity = async () => {
    const params = {
      where: {
        Code: "stageOpportunity",
      },
    };
    try {
      const res = await httpService.get(GET_SYSCFG, { params });
      setStageOpportunity(res.results[0]?.Values);
      setSysCfg(res.results[0]);
      res.results[0]?.Values.forEach((item, index) => {
        if (item?.isSuccess) {
          rest.setValue(`isSuccess${index}`, item.isSuccess);
        }
        if (item?.isFailure) {
          rest.setValue(`isFailure${index}`, item.isFailure);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const array_move = (arr, old_index, new_index) => {
    const { setValue } = rest;
    if (new_index >= arr.length || new_index < 0) {
      return arr;
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    arr.forEach((item, index) => {
      setValue(`stageOpportunity${index}`, item.text);
    });
    toastrSuccessAlert(
      `Di chuyển ${arr[new_index].text} đến vị trí thứ ${
        new_index + 1
      } thành công!!`
    );
  };

  const handleAddStageOpportunity = () => {
    setStageOpportunity(prev => [...prev, { text: "", value: "" }]);
  };

  const handleOnChangeInput = (e, index) => {
    let newArr = [...stageOpportunity];
    newArr[index].text = e.target.value;
    newArr[index].value = e.target.value;
    setStageOpportunity(newArr);
  };

  const handleOnDelete = index => {
    const { setValue } = rest;
    const stageOpportunityNotSelected = stageOpportunity.filter(
      (item, id) => id !== index
    );
    setStageOpportunity(stageOpportunityNotSelected);
    stageOpportunityNotSelected.forEach((item, index) => {
      setValue(`stageOpportunity${index}`, item.text);
      setValue(`isSuccess${index}`, item?.isSuccess);
      setValue(`isFailure${index}`, item?.isFailure);
    });
  };

  const onSubmit = async values => {
    const stageOpportunityMap = stageOpportunity.map((item, index) => {
      return {
        text: item.text,
        value: item.value,
        ...(values[`isSuccess${index}`] && { isSuccess: true }),
        ...(values[`isFailure${index}`] && { isFailure: true }),
      };
    });
    try {
      const res = await httpService.put(GET_SYSCFG + `/${sysCfg.objectId}`, {
        Values: stageOpportunityMap,
      });
      if (res.updatedAt) {
        toastrSuccessAlert(language_vn.success_sales_pipeline);
        return;
      }

      toastrErrorAlert(language_vn.error);
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title="Sale Pipeline">
            <div className="d-flex align-items-center mb-2">
              <CommonButton
                level={0}
                type="button"
                onClick={handleAddStageOpportunity}
              >
                {language_vn.add}
              </CommonButton>
              <Spacer size={12} />
              <CommonButton level={0} type="submit">
                {language_vn.save}
              </CommonButton>
            </div>
          </HeaderCreateItem>
          <table className="table align-middle table-nowrap table-hover">
            <thead className="table-dark">
              <tr>
                {configCol.map((item, index) => (
                  <th key={index}>{item.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stageOpportunity?.map((item, index) => (
                <tr key={index}>
                  <td> {index + 1}</td>

                  <td>
                    <InputField
                      name={`stageOpportunity${index}`}
                      {...rest}
                      defaultValue={item.text}
                      onChange={e => handleOnChangeInput(e, index)}
                    />
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      {...rest.register(`isSuccess${index}`)}
                    />
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      {...rest.register(`isFailure${index}`)}
                    />
                  </td>

                  <td className="d-flex d-flex align-items-center gap-2">
                    <i
                      className="bx bxs-caret-up-circle"
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        array_move(stageOpportunity, index, index - 1)
                      }
                    ></i>
                    <i
                      className="bx bxs-caret-down-circle"
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        array_move(stageOpportunity, index, index + 1)
                      }
                    ></i>
                    <CommonButton
                      level={2}
                      onClick={() => handleOnDelete(index)}
                      className="text-capitalize"
                      type="button"
                    >
                      <i className="dripicons-trash"></i>
                    </CommonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </Container>
    </div>
  );
}
