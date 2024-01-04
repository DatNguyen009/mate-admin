import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  PROMOTION,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_PROMOTION, GET_PROMOTION_QUERY } from "helpers/url_helper";

export const fetchPromotion = commonHandleHttpMethodGet(
  "PromotionSlice/fetchPromotion",
  GET_PROMOTION + GET_PROMOTION_QUERY
);

export const getPromotionByID = commonHandleHttpMethodGet(
  "PromotionSlice/getPromotionByID",
  GET_PROMOTION
);

export const addPromotion = commonHandleHttpMethodPost(
  "PromotionSlice/addPromotion",
  GET_PROMOTION
);

export const updatePromotion = commonHandleHttpMethodPutV2(
  "PromotionSlice/updatePromotion",
  GET_PROMOTION
);

export const deletePromotion = commonHandleHttpMethodMultipleDelete(
  "PromotionSlice/deletePromotion",
  GET_PROMOTION
);

const initialState = {
  loading: false,
  fetched: false,
  promotions: [],
  promotionDetail: [],
};

const PromotionSlice = createSlice({
  name: "PromotionSlice",
  initialState,
  reducers: {
    setPromotionDetail: (state, action) => {
      state.promotionDetail = action.payload;
    },
  },
  extraReducers: {
    [fetchPromotion.pending]: state => {
      state.loading = false;
    },
    [fetchPromotion.fulfilled]: (state, action) => {
      state.loading = true;
      state.promotions = action.payload;
      state.fetched = true;
    },
    [fetchPromotion.rejected]: state => {
      state.loading = false;
    },

    [getPromotionByID.fulfilled]: (state, action) => {
      state.promotionDetail = action.payload;
      state.fetched = true;
    },
    [addPromotion.pending]: state => {
      state.loading = false;
    },
    [addPromotion.fulfilled]: state => {
      state.loading = true;
      toastrCRUDSuccess(PROMOTION, TEXT_POST);
    },
    [addPromotion.rejected]: state => {
      state.loading = false;
      toastrError();
    },
    [deletePromotion.fulfilled]: () => {
      toastrCRUDSuccess(PROMOTION, TEXT_DELETE);
    },
    [deletePromotion.rejected]: () => {
      toastrError();
    },

    [updatePromotion.fulfilled]: () => {
      toastrCRUDSuccess(PROMOTION, TEXT_PUT);
    },
    [updatePromotion.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = PromotionSlice;
export default reducer;
export const { setPromotionDetail } = actions;
