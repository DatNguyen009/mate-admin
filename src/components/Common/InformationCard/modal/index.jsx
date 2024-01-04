import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import { CommonButton } from "components/Common/ButtonCommon";
import SelectConst from "components/form-control/SelectConst";
import { Col, ModalBody, ModalFooter, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import { APISchema } from "../services";
import { optionChart, parseName } from "../constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const handleFilterOption = (col, key) => {
  const groupBy = Object.entries(col.length && col[0].fields)
    .map(([key, value]) => ({
      name: key,
      type: value.type,
    }))
    .filter(item =>
      key.some(key => item.type === key && item.name !== "objectId")
    )
    .map(item => ({ name: item.name, value: item.name }));
  return groupBy;
};

function ModalFilter({ isOk, title, isOpen, handleOpen }) {
  const [modal, setModal] = useState("");
  const [option, setOption] = useState({
    col: [],
    modal: [],
    groupBy: [],
  });

  const schema = yup
    .object({
      modal: yup.string().required("Xin vui lòng chọn bảng"),
      type: yup.string().required("Xin vui lòng chọn loại"),
    })
    .required();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onChange = e => {
    const el = e.target;
    if (el.name === "modal") setModal(el.value);
  };
  const onSubmit = data => {
    isOk?.(data);
    handleOpen();
  };

  useEffect(async () => {
    const shema = await APISchema();
    const option = shema.map(item => ({
      name: item.className,
      value: item.className,
      fields: item.fields,
    }));
    setOption({ modal: option });
  }, []);

  useEffect(() => {
    const colFilter = option.modal.filter(item => item.name === modal);
    const col = handleFilterOption(colFilter, ["Number"]);
    const groupBy = handleFilterOption(colFilter, ["String"]);
    setOption(pre => ({ ...pre, col, groupBy }));
  }, [modal]);

  return (
    <ModalCommon
      modalTitle={title}
      isShowModal={isOpen}
      onClose={() => handleOpen()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody className="px-2 pt-0">
          <Row>
            <Col xs={6}>
              <SelectConst
                name="modal"
                options={option.modal}
                register={register}
                errors={errors}
                label="Chọn bảng: "
                emptyOption="Chọn bảng: "
                onChange={onChange}
              />
            </Col>
            <Col xs={6}>
              <SelectConst
                name="type"
                options={optionChart}
                register={register}
                errors={errors}
                label="Chọn loại: "
                emptyOption="Chọn loại"
                onChange={onChange}
              />
            </Col>
            <Col xs={6}>
              <SelectConst
                name="groupBy"
                options={option.groupBy}
                errors={errors}
                disableEmptyOption={!modal.length}
                register={register}
                label="Gọp theo cột: "
                emptyOption="Chọn cột"
                onChange={onChange}
              />
            </Col>
            <Col xs={6}>
              <SelectConst
                name="data"
                options={option.col}
                errors={errors}
                register={register}
                disableEmptyOption={!option.col?.length}
                label="Chọn cột dữ liệu: "
                emptyOption="Chọn cột"
                onChange={onChange}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <CommonButton level={2} onClick={() => handleOpen()} type="button">
            Hủy
          </CommonButton>
          <CommonButton level={0} type="submit">
            Xác nhận
          </CommonButton>
        </ModalFooter>
      </form>
    </ModalCommon>
  );
}

ModalFilter.propTypes = {
  isOk: PropTypes.func,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  handleOpen: PropTypes.func,
};
ModalFilter.defaultProps = {
  isOk: () => {},
};
export default ModalFilter;
