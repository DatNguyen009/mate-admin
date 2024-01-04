import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { CommonInputt } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";

VVSAddress.propTypes = {
  register: PropTypes.func,
  setError: PropTypes.func,
  getValues: PropTypes.func,
  reset: PropTypes.func,
  errors: PropTypes.object,
  clearErrors: PropTypes.func,
  getAddress: PropTypes.func,
};

const ADDRESS_OPTION = {
  province: "province",
  district: "district",
  ward: "ward",
  street: "street",
};

export default function VVSAddress(props) {
  const { register, errors, reset, setError, clearErrors, getAddress } = props;
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [street, setStreet] = useState([]);
  const [address, setAddress] = useState({
    province: "",
    district: "",
    ward: "",
    street: "",
    building: "",
    floor: "",
    number: "",
  });

  const [responseApi, setResponseApi] = useState([]);
  const [filterTemp, setFilterTemp] = useState([]);
  const [displayInput, setDisplayInput] = useState(false);
  const [displayDistrict, setDisplayDistrict] = useState(false);
  const [districtFilterTemp, setDistrictFilterTemp] = useState([]);
  const [displayWard, setDisplayWard] = useState(false);
  const [wardFilterTemp, setWardFilterTemp] = useState([]);
  const [displayStreet, setDisplayStreet] = useState(false);
  const [streetFilterTemp, setStreetFilterTemp] = useState([]);

  useEffect(async () => {
    const url = `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json`;
    const res = await axios.get(url);
    const provinceMap = Object.entries(res.data).map((item, index) => {
      return {
        index,
        name: item[0],
        value: item[1].code,
      };
    });
    setResponseApi(provinceMap);
    setFilterTemp(provinceMap);
  }, []);

  useEffect(() => {
    getAddress(address);
  }, [address]);

  const setErrorVVSSelect = (
    fieldName,
    value,
    listFilterOnChange,
    listFindOnChange
  ) => {
    if (!listFilterOnChange.length || listFindOnChange === undefined) {
      setError(
        fieldName,
        { type: "string", message: `This ${value} is not exist!` },
        { shouldFocus: true }
      );
      return;
    }
    clearErrors(fieldName);
  };

  const handleOnChangeProvince = async e => {
    if (!e.target.value) {
      setFilterTemp(responseApi);
      setError(
        ADDRESS_OPTION.province,
        { type: "string", message: `Please Enter Your Province!` },
        { shouldFocus: true }
      );
      return;
    }
    const provinceFilter = responseApi.filter(
      item =>
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    const validatedProvince = provinceFilter.find(
      p => p.name === e.target.value
    );
    setFilterTemp(provinceFilter);
    setAddress(prev => ({ ...prev, province: e.target.value }));
    setErrorVVSSelect(
      ADDRESS_OPTION.province,
      e.target.value,
      provinceFilter,
      validatedProvince
    );
  };

  const handleOnChangeDistrict = e => {
    if (!e.target.value) {
      setDistrictFilterTemp(district);
      setError(
        ADDRESS_OPTION.district,
        { type: "string", message: `Please Enter Your District!` },
        { shouldFocus: true }
      );
      return;
    }
    const districtFilter = district.filter(
      item =>
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    const validatedDistrict = districtFilter.find(
      p => p.name === e.target.value
    );
    setDistrictFilterTemp(districtFilter);
    setAddress(prev => ({ ...prev, district: e.target.value }));
    if (!districtFilter.length || validatedDistrict === undefined) {
      reset({
        [ADDRESS_OPTION.ward]: "",
        [ADDRESS_OPTION.street]: "",
      });
      setError(
        ADDRESS_OPTION.district,
        { type: "string", message: `This ${e.target.value} is not exist!` },
        { shouldFocus: true }
      );
      return;
    }
    clearErrors(ADDRESS_OPTION.district);
  };
  const handleOnChangeWard = e => {
    if (!e.target.value) {
      setWardFilterTemp(ward);
      setError(
        ADDRESS_OPTION.ward,
        { type: "string", message: `Please Enter Your ward!` },
        { shouldFocus: true }
      );
      return;
    }
    const wardFilter = ward.filter(
      item =>
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    const wardFind = wardFilter.find(p => p.name === e.target.value);
    setWardFilterTemp(wardFilter);
    setAddress(prev => ({ ...prev, ward: e.target.value }));
    setErrorVVSSelect(
      ADDRESS_OPTION.ward,
      e.target.value,
      wardFilter,
      wardFind
    );
  };

  const handleOnChangeStreet = e => {
    if (!e.target.value) {
      setStreetFilterTemp(street);
      setError(
        ADDRESS_OPTION.street,
        { type: "string", message: `Please Enter Your Street!` },
        { shouldFocus: true }
      );
      return;
    }
    const streetFilter = street.filter(
      item =>
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    const streetFind = streetFilter.find(p => p.name === e.target.value);
    setStreetFilterTemp(streetFilter);
    setAddress(prev => ({ ...prev, street: e.target.value }));
    setErrorVVSSelect(
      ADDRESS_OPTION.street,
      e.target.value,
      streetFilter,
      streetFind
    );
  };

  const handleItemSelected = async (item, filed, reset) => {
    const res = await axios.get(
      `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${item.value}.json`
    );

    const districtMap = Object.entries(res.data.district).map((item, index) => {
      return {
        index,
        name: item[1].name,
        value: item[1].name,
        ward: item[1].ward.map((w, index) => {
          return {
            index,
            name: w.name,
            value: w.name,
          };
        }),
        street: item[1].street.map((name, index) => {
          return {
            index,
            name: name,
            value: name,
          };
        }),
      };
    });

    reset({
      [filed]: item.name,
      [ADDRESS_OPTION.district]: "",
      [ADDRESS_OPTION.ward]: "",
      [ADDRESS_OPTION.street]: "",
    });

    setAddress(prev => ({ ...prev, province: item.name }));
    setDistrict(districtMap);
    setDistrictFilterTemp(districtMap);
    setDisplayInput(false);
  };

  const handleItemSelectedDistrict = (item, filed, reset) => {
    const districtSelected = district.find(d => d.value === item.value);
    reset({
      [filed]: item.name,
      [ADDRESS_OPTION.ward]: "",
      [ADDRESS_OPTION.street]: "",
    });
    setAddress(prev => ({ ...prev, district: item.name }));
    setWardFilterTemp(districtSelected?.ward);
    setStreetFilterTemp(districtSelected?.street);
    setWard(districtSelected?.ward);
    setStreet(districtSelected?.street);
    setDisplayDistrict(false);
  };

  const handleItemSelectedWardStreet = (item, filed, reset) => {
    reset({
      [filed]: item.name,
    });
    if (filed === ADDRESS_OPTION.ward) {
      setDisplayWard(false);
      setAddress(prev => ({ ...prev, ward: item.name }));
      return;
    }
    setAddress(prev => ({ ...prev, street: item.name }));
    setDisplayStreet(false);
  };

  const handleOnClickV2 = async v => {
    if (v === ADDRESS_OPTION.province) {
      setDisplayInput(true);
      return;
    }

    if (v === ADDRESS_OPTION.district) {
      setDisplayDistrict(true);
      return;
    }

    if (v === ADDRESS_OPTION.ward) {
      setDisplayWard(true);
      return;
    }

    setDisplayStreet(true);
  };

  const onBlurInput = v => {
    if (v === ADDRESS_OPTION.province) {
      setTimeout(() => {
        setDisplayInput(false);
      }, 150);
      return;
    }

    if (v === ADDRESS_OPTION.district) {
      setTimeout(() => {
        setDisplayDistrict(false);
      }, 150);
      return;
    }

    if (v === ADDRESS_OPTION.ward) {
      setTimeout(() => {
        setDisplayWard(false);
      }, 150);
      return;
    }

    setTimeout(() => {
      setDisplayStreet(false);
    }, 150);
  };

  const onBlurBFN = (e, v) => {
    if (v === "building") {
      setAddress(prev => ({ ...prev, building: e.target.value }));
      return;
    }
    if (v === "floor") {
      setAddress(prev => ({ ...prev, floor: e.target.value }));
      return;
    }
    setAddress(prev => ({ ...prev, street: e.target.value }));
  };
  return (
    <>
      <Row>
        <Col sm={6}>
          <CommonText className={"form-label star-red-required"}>
            Province/City
          </CommonText>
          <CommonInputt
            className="form-control"
            {...register("province")}
            onChange={event => handleOnChangeProvince(event)}
            autoComplete="off"
            onClick={() => handleOnClickV2("province")}
            onBlur={() => onBlurInput("province")}
            errors={errors}
          />
          {!!filterTemp.length && (
            <ul
              className="awesomplete"
              style={{ display: displayInput ? "block" : "none" }}
            >
              {filterTemp?.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleItemSelected(item, "province", reset)}
                  >
                    <strong>{item.name}</strong>
                  </li>
                );
              })}
            </ul>
          )}
          {errors && (
            <CommonText level={0} color={"red"} style={{ margin: 0 }}>
              {errors["province"]?.message}
            </CommonText>
          )}
          <br />

          {!!district.length && (
            <>
              <CommonText className={"form-label star-red-required"}>
                District
              </CommonText>
              <CommonInputt
                className="form-control"
                {...register("district")}
                onChange={event => handleOnChangeDistrict(event)}
                autoComplete="off"
                onClick={() => handleOnClickV2("district")}
                onBlur={() => onBlurInput("district")}
                errors={errors}
              />
              {!!districtFilterTemp.length && (
                <ul
                  className="awesomplete"
                  style={{ display: displayDistrict ? "block" : "none" }}
                >
                  {districtFilterTemp?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() =>
                          handleItemSelectedDistrict(item, "district", reset)
                        }
                      >
                        <strong>{item.name}</strong>
                      </li>
                    );
                  })}
                </ul>
              )}
              {errors && (
                <CommonText level={0} color={"red"} style={{ margin: 0 }}>
                  {errors["district"]?.message}
                </CommonText>
              )}
            </>
          )}
        </Col>
        <Col sm={6}>
          {!!ward.length && (
            <>
              <CommonText className={"form-label star-red-required"}>
                Ward
              </CommonText>
              <CommonInputt
                className="form-control"
                {...register("ward")}
                onChange={event => handleOnChangeWard(event)}
                autoComplete="off"
                onClick={() => handleOnClickV2("ward")}
                onBlur={() => onBlurInput("ward")}
                errors={errors}
              />
              {!!wardFilterTemp.length && (
                <ul
                  className="awesomplete"
                  style={{ display: displayWard ? "block" : "none" }}
                >
                  {wardFilterTemp?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() =>
                          handleItemSelectedWardStreet(item, "ward", reset)
                        }
                      >
                        <strong>{item.name}</strong>
                      </li>
                    );
                  })}
                </ul>
              )}
              {errors && (
                <CommonText level={0} color={"red"} style={{ margin: 0 }}>
                  {errors["ward"]?.message}
                </CommonText>
              )}
            </>
          )}
          <br />
          {!!street.length && (
            <>
              <CommonText className={"form-label star-red-required"}>
                Street
              </CommonText>
              <CommonInputt
                className="form-control"
                {...register("street")}
                onChange={event => handleOnChangeStreet(event)}
                autoComplete="off"
                onClick={() => handleOnClickV2("street")}
                onBlur={() => onBlurInput("street")}
                errors={errors}
              />
              {!!streetFilterTemp.length && (
                <ul
                  className="awesomplete"
                  style={{ display: displayStreet ? "block" : "none" }}
                >
                  {streetFilterTemp?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() =>
                          handleItemSelectedWardStreet(item, "street", reset)
                        }
                      >
                        <strong>{item.name}</strong>
                      </li>
                    );
                  })}
                </ul>
              )}
              {errors && (
                <CommonText level={0} color={"red"} style={{ margin: 0 }}>
                  {errors["street"]?.message}
                </CommonText>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row>
        {!!street.length && (
          <>
            <Col sm={4}>
              <CommonText className={"form-label star-red-required"}>
                Building
              </CommonText>
              <CommonInputt
                className="form-control"
                name="building"
                label="Building"
                required
                register={register}
                errors={errors}
                onBlur={e => onBlurBFN(e, "building")}
              />
            </Col>
            <Col sm={4}>
              <CommonText className={"form-label star-red-required"}>
                Floor
              </CommonText>
              <CommonInputt
                className="form-control"
                name="floor"
                label="Floor"
                required
                register={register}
                errors={errors}
                onBlur={e => onBlurBFN(e, "floor")}
              />
            </Col>
            <Col sm={4}>
              <CommonText className={"form-label star-red-required"}>
                Number
              </CommonText>
              <CommonInputt
                className="form-control"
                name="number"
                label="Number"
                required
                register={register}
                errors={errors}
                onBlur={e => onBlurBFN(e, "number")}
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
}
