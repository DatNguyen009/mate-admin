import React, { useEffect, useState } from "react";
import KPIReport from "../pages/KPIReport";
import KPITargetsReport from "pages/KPI/KPITargetsReport";
import DashboardReport from "../pages/Dashboard";
import ReportTotal from "../pages/Report/ReportTotal";
import FunnelReportAll from "../pages/Report/FunnelReport";
import LeadReport from "../pages/LeadReport";
import Hr from "../pages/Hr/index";
import { getUserRole } from "helpers/erp_helper";
import VVSTable from "components/form-control/VVSTable";

export const MENU = () => {
  const [roles, setRoles] = useState();

  useEffect(() => {
    const getRole = async () => {
      const roles = await getUserRole();
      setRoles(roles);
    };
    getRole();
  }, []);

  return [
    {
      label: "Tổng quát",
      key: 1,
      children: <DashboardReport />,
    },
    {
      label: "Báo cáo tổng",
      key: 2,
      children: <ReportTotal />,
    },
    {
      label: "Báo cáo dữ liệu",
      key: 3,
      children: <LeadReport />,
    },
    {
      label: "Báo cáo phễu",
      key: 4,
      children: <FunnelReportAll />,
    },
    {
      label: "Báo cáo KPI",
      key: 5,
      children: <KPIReport />,
    },
    {
      label: "Thiết lập KPI",
      key: 6,
      children: (
        <VVSTable
          title="Thiết lập KPI"
          name="KpiReport"
          routingPath="/kpi/new-kpi"
          whereQuery={{
            type: roles?.includes("Master") ? "team" : "personal",
          }}
        />
      ),
    },
    {
      label: "Giao Chỉ Tiêu KPI",
      key: 7,
      children: <KPITargetsReport />,
    },
    {
      label: "Nhân sự",
      key: 8,
      children: <Hr />,
    },
  ];
};
