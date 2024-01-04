import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SelectField from "components/form-control/Select";

const VVSAddress2 = props => {
  const {
    addressType,
    name,
    label,
    address,
    disabled,
    setAddress,
    errors,
    ...rest
  } = props;
  const { setValue } = rest;
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [districtList2, setDistrictList2] = useState([]);
  const [wardList2, setWardList2] = useState([]);

  useEffect(async () => {
    let url = `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json`;
    const res = await axios.get(url);
    const provinceMap = Object.entries(res.data).map(([name, value], index) => {
      return {
        index,
        name,
        value: name,
        code: value.code,
      };
    });

    setProvinceList([{ name: "", value: "" }, ...provinceMap]);

    if (address?.province) {
      const provinceSelected = provinceMap.find(
        p => p.value === address.province
      );

      if (!provinceSelected) return;

      let url = `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${provinceSelected.code}.json`;
      const res = await axios.get(url);
      const districtMap = res.data.district.map((d, index) => ({
        index,
        name: d.name,
        value: d.name,
        ward: d.ward,
      }));
      if (
        (address?.type === "addressLine1" && address?.district !== "") ||
        !address?.type
      ) {
        setDistrictList([{ name: "", value: "" }, ...districtMap]);
      }
      if (address?.type === "addressLine2" && address?.district !== "") {
        setDistrictList2([{ name: "", value: "" }, ...districtMap]);
      }
    }
    if (address?.district) {
      const provinceSelected = provinceMap.find(
        p => p.value === address.province
      );

      if (!provinceSelected) return;

      let url = `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${provinceSelected.code}.json`;
      const res = await axios.get(url);
      const districtSelected = res.data.district.find(
        d => d.name === address.district
      );

      if (!districtSelected) return;

      const wardMap = districtSelected.ward.map((w, index) => ({
        index,
        name: w.name,
        value: w.name,
      }));
      if (
        (address?.type === "addressLine1" && address?.ward !== "") ||
        !address?.type
      ) {
        setWardList([{ name: "", value: "" }, ...wardMap]);
      }
      if (address?.type === "addressLine2" && address?.ward !== "") {
        setWardList2([{ name: "", value: "" }, ...wardMap]);
      }
    }
    if (address?.type === "addressLine1") {
      setTimeout(() => {
        setValue("province1", address.province);
        setValue("district1", address.district);
        setValue("ward1", address.ward);
      }, 500);

      return;
    }
    if (address?.type === "addressLine2") {
      setTimeout(() => {
        setValue("province2", address.province);
        setValue("district2", address.district);
        setValue("ward2", address.ward);
      }, 500);
      return;
    }
    setValue("province", address.province);
    setValue("district", address.district);
    setValue("ward", address.ward);
  }, [address]);

  const handleAddressChange = e => {
    //address line 1
    switch (name) {
      case "province1":
        setAddress({
          ...address,
          province: e.target.value,
          type: "addressLine1",
        });
        setValue("district1", "");
        setValue("ward1", "");
        return;
      case "district1":
        setAddress({
          ...address,
          district: e.target.value,
          type: "addressLine1",
        });
        setValue("ward1", "");
        return;
      case "ward1":
        setAddress({ ...address, ward: e.target.value, type: "addressLine1" });
        return;
      case "province2":
        setAddress({
          ...address,
          province: e.target.value,
          type: "addressLine2",
        });
        setValue("district2", "");
        setValue("ward2", "");
        return;
      case "district2":
        setAddress({
          ...address,
          district: e.target.value,
          type: "addressLine2",
        });
        setValue("ward2", "");
        return;
      case "ward2":
        setAddress({ ...address, ward: e.target.value, type: "addressLine2" });
        return;
      case "province":
        setAddress({ ...address, province: e.target.value });
        setValue("district", "");
        setValue("ward", "");
        return;
      case "district":
        setAddress({ ...address, district: e.target.value });
        setValue("ward", "");
        return;
      case "ward":
        setAddress({ ...address, ward: e.target.value });
        return;
      default:
        break;
    }
  };

  return (
    <SelectField
      label={label}
      name={name}
      errors={errors}
      {...rest}
      options={
        name === "province1" || name === "province" || name === "province2"
          ? provinceList
          : name === "district1" || name === "district"
          ? districtList
          : name === "ward1" || name === "ward"
          ? wardList
          : name === "district2"
          ? districtList2
          : name === "ward2" && wardList2
      }
      onChange={handleAddressChange}
      disabled={disabled}
    />
  );
};

VVSAddress2.propTypes = {
  addressType: PropTypes.string,
  address: PropTypes.object,
  register: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.object,
  setAddress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default VVSAddress2;
