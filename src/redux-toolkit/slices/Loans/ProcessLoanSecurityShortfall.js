import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  PROCESS_LOAN_SECURITY_SHORTFALL,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_PROCESS_LOAN_SECURITY_SHORTFALL,
} from "helpers/url_helper";

export const fetchProcessLoanSecurityShortfall = commonHandleHttpMethodGet(
  "ProcessLoanSecurityShortfallSlice/fetchProcessLoanSecurityShortfall",
  GET_PROCESS_LOAN_SECURITY_SHORTFALL
);

export const getLastestProcessLoanSecurityShortfall = commonHandleHttpMethodGet(
  "ProcessLoanSecurityShortfallSlice/getLastestProcessLoanSecurityShortfall",
  `${GET_PROCESS_LOAN_SECURITY_SHORTFALL}?${GET_ITEM_LASTEST_AND}`
);

export const getItemProcessLoanSecurityShortfallDetail =
  commonHandleHttpMethodGet(
    "ProcessLoanSecurityShortfallSlice/getItemProcessLoanSecurityShortfallDetail",
    GET_PROCESS_LOAN_SECURITY_SHORTFALL
  );

export const createProcessLoanSecurityShortfall = commonHandleHttpMethodPost(
  "ProcessLoanSecurityShortfallSlice/createProcessLoanSecurityShortfall",
  GET_PROCESS_LOAN_SECURITY_SHORTFALL
);

export const getProcessLoanSecurityShortfallByParams =
  commonHandleHttpMethodGetByParams(
    "ProcessLoanSecurityShortfallSlice/getProcessLoanSecurityShortfallByParams",
    GET_PROCESS_LOAN_SECURITY_SHORTFALL
  );

export const updateProcessLoanSecurityShortfall = commonHandleHttpMethodPutV2(
  "ProcessLoanSecurityShortfallSlice/updateProcessLoanSecurityShortfall",
  GET_PROCESS_LOAN_SECURITY_SHORTFALL
);

const initialState = {
  loading: false,
  ProcessLoanSecurityShortfalls: [],
  ProcessLoanSecurityShortfallLastest: {},
  ProcessLoanSecurityShortfallDetail: {},
};

const ProcessLoanSecurityShortfallSlice = createSlice({
  name: "ProcessLoanSecurityShortfallSlice",
  initialState,
  extraReducers: {
    [getItemProcessLoanSecurityShortfallDetail.fulfilled]: (state, action) => {
      state.ProcessLoanSecurityShortfallDetail = action.payload;
    },
    [fetchProcessLoanSecurityShortfall.fulfilled]: (state, action) => {
      state.loading = true;

      state.ProcessLoanSecurityShortfalls = action.payload;
    },
    [fetchProcessLoanSecurityShortfall.pending]: state => {
      state.loading = false;
    },
    [getLastestProcessLoanSecurityShortfall.fulfilled]: (state, action) => {
      state.ProcessLoanSecurityShortfallLastest = action.payload;
    },
    [fetchProcessLoanSecurityShortfall.rejected]: state => {
      state.loading = false;
    },

    [createProcessLoanSecurityShortfall.fulfilled]: (state, action) => {
      if (action.payload?.objectId) {
        toastrCRUDSuccess(PROCESS_LOAN_SECURITY_SHORTFALL, TEXT_POST);
      }
    },

    [updateProcessLoanSecurityShortfall.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(PROCESS_LOAN_SECURITY_SHORTFALL, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = ProcessLoanSecurityShortfallSlice;
export default reducer;
