import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodGetByParams,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  PROCESS_LOAN_INTEREST_ACCRUAL,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import {
  GET_ITEM_LASTEST_AND,
  GET_PROCESS_LOAN_INTEREST_ACCRUAL,
} from "helpers/url_helper";

export const fetchProcessLoanInterestAccrual = commonHandleHttpMethodGet(
  "ProcessLoanInterestAccrualSlice/fetchProcessLoanInterestAccrual",
  GET_PROCESS_LOAN_INTEREST_ACCRUAL
);

export const getLastestProcessLoanInterestAccrual = commonHandleHttpMethodGet(
  "ProcessLoanInterestAccrualSlice/getLastestProcessLoanInterestAccrual",
  `${GET_PROCESS_LOAN_INTEREST_ACCRUAL}?${GET_ITEM_LASTEST_AND}`
);

export const getItemProcessLoanInterestAccrualDetail =
  commonHandleHttpMethodGet(
    "ProcessLoanInterestAccrualSlice/getItemProcessLoanInterestAccrualDetail",
    GET_PROCESS_LOAN_INTEREST_ACCRUAL
  );

export const createProcessLoanInterestAccrual = commonHandleHttpMethodPost(
  "ProcessLoanInterestAccrualSlice/createProcessLoanInterestAccrual",
  GET_PROCESS_LOAN_INTEREST_ACCRUAL
);

export const getProcessLoanInterestAccrualByParams =
  commonHandleHttpMethodGetByParams(
    "ProcessLoanInterestAccrualSlice/getProcessLoanInterestAccrualByParams",
    GET_PROCESS_LOAN_INTEREST_ACCRUAL
  );

export const updateProcessLoanInterestAccrual = commonHandleHttpMethodPutV2(
  "ProcessLoanInterestAccrualSlice/updateProcessLoanInterestAccrual",
  GET_PROCESS_LOAN_INTEREST_ACCRUAL
);

const initialState = {
  loading: false,
  ProcessLoanInterestAccruals: [],
  ProcessLoanInterestAccrualLastest: {},
  ProcessLoanInterestAccrualDetail: {},
};

const ProcessLoanInterestAccrualSlice = createSlice({
  name: "ProcessLoanInterestAccrualSlice",
  initialState,
  extraReducers: {
    [getItemProcessLoanInterestAccrualDetail.fulfilled]: (state, action) => {
      state.ProcessLoanInterestAccrualDetail = action.payload;
    },
    [fetchProcessLoanInterestAccrual.fulfilled]: (state, action) => {
      state.loading = true;

      state.ProcessLoanInterestAccruals = action.payload;
    },
    [fetchProcessLoanInterestAccrual.pending]: state => {
      state.loading = false;
    },
    [getLastestProcessLoanInterestAccrual.fulfilled]: (state, action) => {
      state.ProcessLoanInterestAccrualLastest = action.payload;
    },
    [fetchProcessLoanInterestAccrual.rejected]: state => {
      state.loading = false;
    },

    [createProcessLoanInterestAccrual.fulfilled]: (state, action) => {
      if (action.payload?.objectId) {
        toastrCRUDSuccess(PROCESS_LOAN_INTEREST_ACCRUAL, TEXT_POST);
      }
    },

    [updateProcessLoanInterestAccrual.fulfilled]: (state, action) => {
      if (action.payload?.updatedAt) {
        toastrCRUDSuccess(PROCESS_LOAN_INTEREST_ACCRUAL, TEXT_PUT);
      }
    },
  },
});

const { actions, reducer } = ProcessLoanInterestAccrualSlice;
export default reducer;
