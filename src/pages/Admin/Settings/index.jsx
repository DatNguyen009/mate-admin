import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonInputt, CommonSelect } from "components/Common/inputCommon";
import { CommonText } from "components/Common/TextCommon";
import { debounce, omit } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import httpService from "services/httpService";
import { v4 as uuidv4 } from "uuid";

function SettingPage(props) {
  const [schemasLite, setschemas] = useState([]);
  const [schemasLiteSearch, setSchemasLiteSearch] = useState([]);

  const [roles, setRoles] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusSort, setStatusSort] = useState(true);
  const thead = [
    {
      field: "model",
      text: "Model",
      sort: true,
    },
    {
      field: "find",
      text: "Find",
      sort: true,
    },
    {
      field: "get",
      text: "Get",
      sort: true,
    },

    {
      field: "create",
      text: "Create",
      sort: true,
    },
    {
      field: "update",
      text: "Update",
      sort: true,
    },
    {
      field: "delete",
      text: "Delete",
      sort: true,
    },
    {
      field: "all",
      text: "All",
      sort: true,
    },
  ];

  useEffect(() => {
    const getSchema = async () => {
      const response = await httpService.get("parse/schemas", {
        headers: {
          "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
        },
      });
      const schemas = response.results;
      if (!schemas) return;
      let emptyArr = [];
      schemas.map(schema => {
        emptyArr.push(omit(schema, ["fields", "indexes"]));
      });
      setschemas(emptyArr);
      setSchemasLiteSearch(
        searchTerm
          ? emptyArr.filter(item => item.className.includes(searchTerm))
          : emptyArr
      );
    };
    getSchema();
  }, [JSON.stringify(schemasLite)]);

  useEffect(() => {
    const getRole = async () => {
      const response = await httpService.get("parse/classes/_Role");
      const role = response.results;
      if (!role) return;
      setRoles(role);
      setSelectedOption(roles[0]?.name);
    };
    getRole();
  }, [JSON.stringify(roles)]);

  const handleSetRole = async (item, name) => {
    if (name == "all") {
      const newItem = { ...item };

      if (
        Object.keys(newItem.classLevelPermissions.delete).includes(
          `role:${selectedOption}`
        ) &&
        Object.keys(newItem.classLevelPermissions.get).includes(
          `role:${selectedOption}`
        ) &&
        Object.keys(newItem.classLevelPermissions.update).includes(
          `role:${selectedOption}`
        ) &&
        Object.keys(newItem.classLevelPermissions.create).includes(
          `role:${selectedOption}`
        ) &&
        Object.keys(newItem.classLevelPermissions.find).includes(
          `role:${selectedOption}`
        )
      ) {
        delete newItem.classLevelPermissions.find[[`role:${selectedOption}`]];
        delete newItem.classLevelPermissions.get[[`role:${selectedOption}`]];
        delete newItem.classLevelPermissions.create[[`role:${selectedOption}`]];
        delete newItem.classLevelPermissions.update[[`role:${selectedOption}`]];
        delete newItem.classLevelPermissions.delete[[`role:${selectedOption}`]];

        const updateValues = {
          classLevelPermissions: {
            ...newItem.classLevelPermissions,
          },
        };
        const res = await httpService.put(
          `/parse/schemas/${newItem.className}`,
          updateValues,
          {
            headers: {
              "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
            },
          }
        );
        if (res?.classLevelPermissions) {
          let index = schemasLite.findIndex(
            item => item.className == res.className
          );
          let updateShema = [...schemasLite];
          updateShema[index].classLevelPermissions = res.classLevelPermissions;
          setschemas(updateShema);
        }
        return;
      }
      newItem.classLevelPermissions.find = {
        ...(Object.keys(item.classLevelPermissions.find).includes("*")
          ? { [`role:${selectedOption}`]: true }
          : {
              ...newItem.classLevelPermissions.find,
              [`role:${selectedOption}`]: true,
            }),
      };

      newItem.classLevelPermissions.get = {
        ...(Object.keys(item.classLevelPermissions.get).includes("*")
          ? { [`role:${selectedOption}`]: true }
          : {
              ...newItem.classLevelPermissions.get,
              [`role:${selectedOption}`]: true,
            }),
      };

      newItem.classLevelPermissions.create = {
        ...(Object.keys(item.classLevelPermissions.create).includes("*")
          ? { [`role:${selectedOption}`]: true }
          : {
              ...newItem.classLevelPermissions.create,
              [`role:${selectedOption}`]: true,
            }),
      };

      newItem.classLevelPermissions.update = {
        ...(Object.keys(item.classLevelPermissions.update).includes("*")
          ? { [`role:${selectedOption}`]: true }
          : {
              ...newItem.classLevelPermissions.update,
              [`role:${selectedOption}`]: true,
            }),
      };

      newItem.classLevelPermissions.delete = {
        ...(Object.keys(item.classLevelPermissions.delete).includes("*")
          ? { [`role:${selectedOption}`]: true }
          : {
              ...newItem.classLevelPermissions.delete,
              [`role:${selectedOption}`]: true,
            }),
      };

      const updateValues = {
        classLevelPermissions: {
          ...newItem.classLevelPermissions,
        },
      };
      const res = await httpService.put(
        `/parse/schemas/${newItem.className}`,
        updateValues,
        {
          headers: {
            "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
          },
        }
      );
      if (res?.classLevelPermissions) {
        let index = schemasLite.findIndex(
          item => item.className == res.className
        );
        let updateShema = [...schemasLite];
        updateShema[index].classLevelPermissions = res.classLevelPermissions;
        setschemas(updateShema);
      }
      return;
    }
    const newItem = { ...item };
    if (Object.keys(item.classLevelPermissions[name]).includes("*")) {
      delete newItem.classLevelPermissions[name]["*"];
      newItem.classLevelPermissions[name][`role:${selectedOption}`] = true;
    } else {
      if (
        Object.keys(item.classLevelPermissions[name]).includes(
          `role:${selectedOption}`
        )
      ) {
        delete newItem.classLevelPermissions[name][`role:${selectedOption}`];
      } else {
        newItem.classLevelPermissions[name][`role:${selectedOption}`] = true;
      }
    }
    const updateValues = {
      classLevelPermissions: {
        ...newItem.classLevelPermissions,
      },
    };
    const res = await httpService.put(
      `/parse/schemas/${newItem.className}`,
      updateValues,
      {
        headers: {
          "X-Parse-Master-Key": "LASDK106JKHR87SDFJSDHF0DFHASFDF",
        },
      }
    );
    if (res?.classLevelPermissions) {
      let index = schemasLite.findIndex(
        item => item.className == res.className
      );
      let updateShema = [...schemasLite];
      updateShema[index].classLevelPermissions = res.classLevelPermissions;
      setschemas(updateShema);
    }
  };
  const handleSearch = debounce(async e => {
    setSearchTerm(e.target.value);
    let result = schemasLite.filter(item =>
      item.className.includes(e.target.value)
    );
    setSchemasLiteSearch(result);
  }, 300);

  const dynamicSort = property => {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  const handleSort = async () => {
    setStatusSort(prev => !prev);
  };

  const afterSort = statusSort
    ? schemasLiteSearch.sort(dynamicSort("className"))
    : schemasLiteSearch.sort(dynamicSort("-className"));
  return (
    <React.Fragment>
      <div className="page-content">
        <div className=" d-flex align-items-center mb-4">
          <Container fluid>
            <HeaderCreateItem title={"Phân Quyền"} />
            <Row>
              <Col>
                <Col xs={3}>
                  <CommonText mt={0}>Phân Quyền</CommonText>
                </Col>
                <Col xs={9}>
                  <CommonSelect
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                  >
                    {roles.map(o => (
                      <option key={o.name} value={o.name}>
                        {o.name}
                      </option>
                    ))}
                  </CommonSelect>
                </Col>
              </Col>
              <Col>
                <Col xs={3}>
                  <CommonText mt={0}>Tìm Kiếm</CommonText>
                </Col>
                <Col xs={9}>
                  <CommonInputt
                    className="form-control"
                    onChange={e => handleSearch(e)}
                  />
                </Col>
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{ overflowY: "scroll", height: 400 }}>
          <table className=" table align-middle table-nowrap table-hover">
            <thead className="table-light">
              <tr>
                {thead.map((col, index) => (
                  <th key={index} tabIndex="0" style={{ textAlign: "center" }}>
                    {col.text == "Model" ? (
                      <span onClick={() => handleSort()}>
                        {col.text}
                        <span
                          style={{ display: "inline-block", paddingLeft: 10 }}
                        >
                          {(statusSort === true && (
                            <i className="fas fa-sort-alpha-down"></i>
                          )) ||
                            (statusSort === false && (
                              <i className="fas fa-sort-alpha-up-alt"></i>
                            ))}
                        </span>
                      </span>
                    ) : (
                      col.text
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {afterSort.map((dataa, indexx) => {
                return (
                  <tr key={indexx + 1}>
                    <td>{dataa.className}</td>
                    <td style={{ textAlign: "center" }}>
                      <input
                        key={indexx + uuidv4()}
                        type="checkbox"
                        onClick={() => handleSetRole(dataa, "find")}
                        defaultChecked={Object.keys(
                          dataa.classLevelPermissions.find
                        ).includes(`role:${selectedOption}`)}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <input
                        key={indexx + uuidv4()}
                        type="checkbox"
                        onClick={() => handleSetRole(dataa, "get")}
                        defaultChecked={Object.keys(
                          dataa.classLevelPermissions.get
                        ).includes(`role:${selectedOption}`)}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <input
                        key={indexx + uuidv4()}
                        type="checkbox"
                        onClick={() => handleSetRole(dataa, "create")}
                        defaultChecked={Object.keys(
                          dataa.classLevelPermissions.create
                        ).includes(`role:${selectedOption}`)}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <input
                        key={indexx + uuidv4()}
                        type="checkbox"
                        onClick={() => handleSetRole(dataa, "update")}
                        defaultChecked={Object.keys(
                          dataa.classLevelPermissions.update
                        ).includes(`role:${selectedOption}`)}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <input
                        key={indexx + uuidv4()}
                        type="checkbox"
                        onClick={() => handleSetRole(dataa, "delete")}
                        defaultChecked={Object.keys(
                          dataa.classLevelPermissions.delete
                        ).includes(`role:${selectedOption}`)}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <input
                        key={indexx + uuidv4()}
                        type="checkbox"
                        onClick={() => handleSetRole(dataa, "all")}
                        defaultChecked={
                          Object.keys(
                            dataa.classLevelPermissions.delete
                          ).includes(`role:${selectedOption}`) &&
                          Object.keys(dataa.classLevelPermissions.get).includes(
                            `role:${selectedOption}`
                          ) &&
                          Object.keys(
                            dataa.classLevelPermissions.update
                          ).includes(`role:${selectedOption}`) &&
                          Object.keys(
                            dataa.classLevelPermissions.create
                          ).includes(`role:${selectedOption}`) &&
                          Object.keys(
                            dataa.classLevelPermissions.find
                          ).includes(`role:${selectedOption}`)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SettingPage;
