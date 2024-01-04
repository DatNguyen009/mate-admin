import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  status: "",
  ext: "",
  groupId: "",
  phone: "",
  date: "",
  objectIdMass: "",
};

const CallReportSlice = createSlice({
  name: "CallReportSlice",
  initialState,
  reducers: {
    setStatusCallReport: (state, action) => {
      state.status = action.payload.query;
      state.ext = action.payload.extension;
      state.date = action.payload.date;
    },
    setGroupIdAction: (state, action) => {
      state.groupId = action.payload.groupId;
    },
    setStatusPhoneMessage: (state, action) => {
      state.status = action.payload.status;
      state.date = action.payload.date;
      state.objectIdMass = action.payload.objectIdMass;
    },
  },
});

const { actions, reducer } = CallReportSlice;
export default reducer;
export const { setStatusCallReport, setGroupIdAction, setStatusPhoneMessage } =
  actions;
