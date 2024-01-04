import VVSSelectModel from "components/form-control/VVSSelectModel";

export const HEADERS_SENDERS = [
  {
    text: "Tên nhân viên",
    CellComponent: VVSSelectModel,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `senders.${indexOfRow}.name`,
      disabled: true,
    }),
  },
];

export const HEADERS_RECEIVERS = [
  {
    text: "Tên nhân viên",
    CellComponent: VVSSelectModel,
    cellComponentProps: (formValue, indexOfRow) => ({
      name: `receivers.${indexOfRow}.name`,
      disabled: true,
    }),
  },
];
