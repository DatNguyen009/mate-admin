import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTitle: null,
  isConfirm: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.currentTitle = action.payload;
    },
    openModalConfirm: (state, action) => {
      state.currentTitle = "modal-confirm";
    },
    setIsConfirm: (state, action) => {
      state.isConfirm = action.payload;
    },
    closeModal: () => initialState,
  },
});

const { actions, reducer } = modalSlice;
export default reducer;
export const { openModal, closeModal, openModalConfirm, setIsConfirm } =
  actions;
