import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Tabs } from "antd";

const WarehouseManagement = () => {
  const history = useHistory();
  const handleNavigateWarehouse = row => {
    switch (row.type) {
      case "import":
        history.push("/import", { dataTranfer: row });
        break;

      case "export":
        history.push("/export", { dataTranfer: row });
        break;

      default:
        break;
    }
  };

  const items = [
    {
      key: "1",
      label: `Nhập/xuất kho`,
      children: (
        <VVSTable
          name="StockChangeSession"
          title=""
          disableAdd
          onRowDoubleClick={handleNavigateWarehouse}
        />
      ),
    },
    {
      key: "2",
      label: `Kiểm kho`,
      children: (
        <VVSTable
          name="StockCountSession"
          title=""
          disableAdd
          onRowDoubleClick={row => {
            history.push(`/inventory/${row.objectId}`, { dataTranfer: row });
          }}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Tabs defaultActiveKey="1" items={items} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WarehouseManagement;
