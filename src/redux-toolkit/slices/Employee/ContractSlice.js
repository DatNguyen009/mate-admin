import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  CONTRACT,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_CONTRACT, GET_CONTRACT_INCLUDE } from "helpers/url_helper";

export const fetchContract = commonHandleHttpMethodGet(
  "ContractSlide/fetchContract",
  GET_CONTRACT + GET_CONTRACT_INCLUDE
);

export const getContractByParams = commonHandleHttpMethodGetByParams(
  "ContractSlide/getContractByParams",
  GET_CONTRACT + GET_CONTRACT_INCLUDE
);

export const addContract = commonHandleHttpMethodPost(
  "ContractSlide/addContract",
  GET_CONTRACT
);

export const updateContract = commonHandleHttpMethodPutV2(
  "ContractSlide/updateContract",
  GET_CONTRACT
);

export const deleteContract = commonHandleHttpMethodMultipleDelete(
  "ContractSlide/deleteContract",
  GET_CONTRACT
);

const initialState = {
  loading: false,
  fetched: false,
  contracts: [],
  contractByParam: [],
};

const ContractSlide = createSlice({
  name: "ContractSlide",
  initialState,
  extraReducers: {
    [fetchContract.pending]: state => {
      state.loading = false;
    },
    [fetchContract.fulfilled]: (state, action) => {
      state.loading = true;
      state.fetched = true;
      state.contracts = action.payload;
    },
    [fetchContract.rejected]: state => {
      state.loading = false;
    },
    [getContractByParams.fulfilled]: (state, action) => {
      state.loading = true;
      state.contractByParam = action.payload;
    },
    [addContract.fulfilled]: (state, action) => {
      toastrCRUDSuccess(CONTRACT, TEXT_POST);
    },
    [updateContract.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(CONTRACT, TEXT_PUT);
      }
    },
    [updateContract.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deleteContract.fulfilled]: () => {
      toastrCRUDSuccess(CONTRACT, TEXT_DELETE);
    },
    [deleteContract.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = ContractSlide;
export default reducer;
