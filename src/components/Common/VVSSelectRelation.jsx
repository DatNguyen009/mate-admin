import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

import httpService from "services/httpService";
import { CommonInputt } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import DEFAULT_CONFIG from "components/form-control/VVSSelectModel/config";
import { ROLES } from "constants/dataRoles";

const VVSSelectRelation = props => {
  const { model, label, required, name, errors, setValue, getValues } = props;
  const [onFocus, setOnFocus] = useState(false);
  const [modelList, setModelList] = useState([]);
  const [selectedList, setSelectedList] = useState(getValues(name) || []);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOnFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const getModelList = async () => {
    const res = (await httpService.get(`/parse/classes/${model}`)).results;
    setModelList(res);

    const listSelected = getValues(name);
    if (listSelected?.length) {
      const newSelectedList = listSelected
        .filter(item =>
          res.find(modelItem => modelItem.objectId === item.objectId)
        )
        .map(item =>
          res.find(modelItem => modelItem.objectId === item.objectId)
        );
      setSelectedList(newSelectedList);
    } else {
      setSelectedList([]);
    }
  };

  const handleSelect = item => {
    if (_.some(selectedList, ["objectId", item.objectId])) return;
    const newSelectedList = [...selectedList, item];
    setSelectedList(newSelectedList);
    setValue(
      name,
      newSelectedList.map(item => ({
        objectId: item.objectId,
        className: model,
        __type: "Pointer",
      }))
    );
  };

  const handleDeselect = objectId => {
    const newSelectedList = [...selectedList].filter(
      item => item.objectId !== objectId
    );
    setSelectedList(newSelectedList);
    setValue(
      name,
      newSelectedList.map(item => ({
        objectId: item.objectId,
        className: model,
        __type: "Pointer",
      }))
    );
  };

  useEffect(() => {
    getModelList();
  }, [JSON.stringify(getValues(name))]);
  return (
    <div ref={containerRef} className="w-100">
      {label && (
        <CommonText
          className={`mt-0 mb-1 form-label ${required && "star-red-required"}`}
        >
          {label}
        </CommonText>
      )}
      <div className="select-wrapper" onClick={() => setOnFocus(true)}>
        <div className="selected-list">
          {selectedList.length
            ? selectedList.map(s => {
                const role = ROLES[s[DEFAULT_CONFIG[model]?.fieldView[0]]];

                return (
                  <span
                    key={s.objectId}
                    className="cardShortcut__status badge badge-soft-success cardShortcut__status--success selected-item"
                  >
                    <span>
                      {!role ? s[DEFAULT_CONFIG[model]?.fieldView[0]] : role}
                    </span>
                    <i
                      className="fas fa-times text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeselect(s.objectId)}
                    />
                  </span>
                );
              })
            : null}
        </div>
      </div>
      {onFocus && (
        <ul className="awesomplete pointer-list">
          {modelList.map(m => {
            const role = ROLES[m[DEFAULT_CONFIG[model]?.fieldView[0]]];
            return (
              <li key={m.objectId} onClick={() => handleSelect(m)}>
                <strong className="text-wrap">
                  {!role ? m[DEFAULT_CONFIG[model]?.fieldView[0]] : role}
                </strong>
                <br />
                <span className="text-wrap">
                  {m[DEFAULT_CONFIG[model]?.fieldView[1]]}
                </span>
              </li>
            );
          })}
          <li>
            <Link
              to={"#"}
              className="d-flex align-items-center"
              style={{ gap: 12 }}
            >
              <i className="bx bx-plus"></i>
              <span>{`Create a new ${label}`}</span>
            </Link>
          </li>

          <li>
            <i className="bx bx-search-alt"></i>
            <span>Advanced Search</span>
          </li>
        </ul>
      )}
      {errors && (
        <CommonText level={0} color="red" style={{ margin: 0 }}>
          {_.get(errors, name) && _.get(errors, name).message}
        </CommonText>
      )}
    </div>
  );
};

VVSSelectRelation.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  model: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object,
  setValue: PropTypes.func,
  getValues: PropTypes.func,
};

export default VVSSelectRelation;
