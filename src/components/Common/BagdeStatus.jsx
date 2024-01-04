import React from "react";
import PropTypes from "prop-types";

const SUCCESS = [
  "active",
  "completed",
  "resolved",
  "approved",
  "present",
  "workfromhome",
  "success",
  "close",
  "accepted",
  "quotation",
  "enabled",
  "available",
];
const PRIMARY = ["confirmed", "mới"];
const DARK = ["left", "inprocess", "invalid", "dark", "open", "lost", "low"];
const DANGER = [
  "inactive",
  "delay",
  "draft",
  "open",
  "rejected",
  "cancelled",
  "canceled",
  "absent",
  "hold",
  "hight",
  "urgent",
  "disabled",
  "unverified",
  "bought",
];
const WARNING = [
  "suspended",
  "pending",
  "investigated",
  "haftday",
  "replied",
  "working",
  "medium",
  "early-settled",
  "not support",
  "requested",
  "unconfirmed",
  "tiềm năng",
];
const INFO = ["submitted", "info", "effective", "quan tâm"];

const SECONDARY = ["không quan tâm", "không nghe máy", "gọi không được"];

export default function BagdeStatus(props) {
  const { typeBadge, titleBadge, count } = props;
  const selectType = type => {
    if (SUCCESS.includes(type)) {
      return "badge badge-soft-success cardShortcut__status--success";
    }

    if (DARK.includes(type)) {
      return "badge badge-soft-dark cardShortcut__status--dark";
    }
    if (PRIMARY.includes(type)) {
      return "badge badge-soft-primary cardShortcut__status--primary";
    }
    if (DANGER.includes(type)) {
      return "badge badge-soft-danger cardShortcut__status--danger";
    }

    if (WARNING.includes(type)) {
      return "badge badge-soft-warning cardShortcut__status--warning";
    }

    if (INFO.includes(type)) {
      return "badge badge-soft-info cardShortcut__status--info";
    }
    if (SECONDARY.includes(type)) {
      return "badge badge-soft-secondary cardShortcut__status--info";
    }
    return "badge badge-soft-success cardShortcut__status--success";
  };

  return (
    <React.Fragment>
      <span
        className={`cardShortcut__status ${selectType(
          typeBadge?.toLowerCase()
        )} d-inline-block p-2 text-capitalize`}
      >
        {count && `${count} `}
        {titleBadge}
      </span>
    </React.Fragment>
  );
}

BagdeStatus.propTypes = {
  typeBadge: PropTypes.string,
  titleBadge: PropTypes.string,
  count: PropTypes.any,
};
