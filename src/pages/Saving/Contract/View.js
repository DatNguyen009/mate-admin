import SelectField from "components/form-control/Select";
import VVSTable from "components/form-control/VVSTable";
import {
  CANCELED,
  COMPLETED,
  DATEDUED,
  EARLY_SETTLED,
  EFFECTIVE,
  EXPIRATIONSOON,
  EXPIRED,
  FILTER_CONTRACT_OPTIONS,
  OVERDUED,
} from "constants/optionFilterContract";
import { useRoles } from "hooks/useRoles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from "reactstrap";

const OPTION_DATEDUED = [
  {
    key: 0,
    value: 0,
    name: "Chọn ngày",
  },
  {
    key: 1,
    value: 15,
    name: "15 ngày",
  },
  {
    key: 2,
    value: 30,
    name: "30 ngày",
  },
  {
    key: 3,
    value: 45,
    name: "45 ngày",
  },
];

export default function Contract() {
  const [filter, setFilter] = useState("");
  const { register } = useForm({});
  const [filterDate, setFilterDate] = useState(null);
  const { roles } = useRoles();

  const getFilterData = type => {
    switch (type) {
      case EXPIRATIONSOON: {
        return {
          endDate: {
            $gte: {
              __type: "Date",
              iso: moment(new Date(), "DD-MM-YYYY"),
            },
            $lte: {
              __type: "Date",
              iso: moment(new Date(), "DD-MM-YYYY").add(14, "days"),
            },
          },
        };
      }

      case EXPIRED: {
        return {
          endDate: {
            $lte: {
              __type: "Date",
              iso: moment(new Date(), "DD-MM-YYYY"),
            },
          },
        };
      }

      case COMPLETED: {
        return {
          status: "completed",
        };
      }

      case EFFECTIVE: {
        return {
          status: "effective",
        };
      }

      case EARLY_SETTLED: {
        return {
          status: "early-settled",
        };
      }

      case OVERDUED: {
        return {
          isLate: {
            $gte: true,
          },
          status: {
            $ne: "canceled",
          },
        };
      }

      case CANCELED: {
        return {
          status: "canceled",
        };
      }

      case DATEDUED: {
        if (!filterDate) return {};

        return {
          endDate: {
            $gte: {
              __type: "Date",
              iso: moment().format("YYYY-MM-DD"),
            },
            $lte: {
              __type: "Date",
              iso: filterDate,
            },
          },
        };
      }
    }
  };

  useEffect(() => {
    if (filter?.target?.value) {
      getFilterData(filter?.target?.value);
    }
    setFilterDate(null);
  }, [filter?.target?.value]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row
            style={{
              position: "relative",
              marginBottom: "-35px",
              zIndex: 99,
              width: "max-content",
            }}
          >
            <h4 className="my-0 font-size-18 text-capitalize mb-2">
              Hợp đồng tích luỹ
            </h4>
            <Row>
              <Col sm={8}>
                <SelectField
                  name="filter"
                  options={FILTER_CONTRACT_OPTIONS}
                  register={register}
                  onChange={e => {
                    setFilter(e);
                  }}
                />
              </Col>
              <Col sm={4}>
                {filter?.target?.value === DATEDUED && (
                  <SelectField
                    name="filter_date"
                    options={OPTION_DATEDUED}
                    register={register}
                    onChange={e => {
                      if (e.target.value == 0) {
                        setFilterDate(null);
                        return;
                      }
                      setFilterDate(
                        moment().add("d", e.target.value).format("YYYY-MM-DD")
                      );
                    }}
                  />
                )}
              </Col>
            </Row>
          </Row>
          <VVSTable
            name={`${
              roles?.includes("Accountant") ? "Contract_Accountant" : "Contract"
            }`}
            disableAdd
            whereQuery={getFilterData(filter?.target?.value)}
            showExportExcel
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
