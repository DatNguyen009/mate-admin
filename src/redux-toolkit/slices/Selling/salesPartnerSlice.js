import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_SALES_PARTNERS, SALES_PARTNER_PARAMS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  salesPartners: [],
};

export const fetchSalesPartners = commonHandleHttpMethodGet(
  "SalesPartnerSlice/fetchSalesPartners",
  GET_SALES_PARTNERS + SALES_PARTNER_PARAMS
);
export const addSalesPartner = commonHandleHttpMethodPost(
  "SalesPartnerSlice/addSalesPartner",
  GET_SALES_PARTNERS
);
export const updateSalesPartner = commonHandleHttpMethodPutV2(
  "SalesPartnerSlice/updateSalesPartner",
  GET_SALES_PARTNERS
);
export const deleteSalesPartner = commonHandleHttpMethodMultipleDelete(
  "SalesPartnerSlice/deleteSalesPartner",
  GET_SALES_PARTNERS
);

const salesPartnerSlice = createSlice({
  name: "SalesPartnerSlice",
  initialState,
  extraReducers: {
    [fetchSalesPartners.fulfilled]: (state, action) => {
      state.salesPartners = action.payload;
    },
    [addSalesPartner.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Sales Partner", TEXT_POST);
    },
    [updateSalesPartner.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Sales Partner", TEXT_PUT);
    },
    [deleteSalesPartner.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Sales Partner", TEXT_DELETE);
    },
  },
});

const { reducer } = salesPartnerSlice;
export default reducer;
