import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GRIEVANCE_TYPE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { GET_GRIEVANCE_TYPE } from "helpers/url_helper";

export const fetchGrievanceType = commonHandleHttpMethodGet(
  "GrievanceTypeSlide/fetchGrievanceType",
  GET_GRIEVANCE_TYPE
);

export const getGrievanceTypeById = commonHandleHttpMethodGet(
  "GrievanceTypeSlide/getGrievanceTypeById",
  GET_GRIEVANCE_TYPE
);

export const createGrievanceType = commonHandleHttpMethodPost(
  "GrievanceTypeSlide/createGrievanceType",
  GET_GRIEVANCE_TYPE
);

export const updateGrievanceType = commonHandleHttpMethodPutV2(
  "GrievanceTypeSlide/updateGrievanceType",
  GET_GRIEVANCE_TYPE
);

export const deleteGrievanceType = commonHandleHttpMethodMultipleDelete(
  "GrievanceTypeSlide/deleteGrievanceType",
  GET_GRIEVANCE_TYPE
);
const initialState = {
  loading: false,
  fetched: false,
  grievanceTypes: [],
  grievanceTypeDetail: [],
};

const GrievanceTypeSlide = createSlice({
  name: "GrievanceTypeSlide",
  initialState,
  extraReducers: {
    [fetchGrievanceType.pending]: state => {
      state.loading = false;
    },
    [fetchGrievanceType.fulfilled]: (state, action) => {
      state.loading = true;
      state.grievanceTypes = action.payload;
      state.fetched = true;
    },
    [fetchGrievanceType.rejected]: state => {
      state.loading = false;
    },
    [createGrievanceType.pending]: state => {
      state.loading = false;
    },
    [createGrievanceType.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload?.objectId) {
        toastrCRUDSuccess(GRIEVANCE_TYPE, TEXT_POST);
      }
    },
    [createGrievanceType.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [getGrievanceTypeById.fulfilled]: (state, action) => {
      state.loading = true;
      state.grievanceTypeDetail = action.payload;
    },

    [updateGrievanceType.pending]: state => {
      state.loading = false;
    },
    [updateGrievanceType.fulfilled]: (state, action) => {
      state.loading = true;
      if (action.payload.updatedAt) {
        toastrCRUDSuccess(GRIEVANCE_TYPE, TEXT_PUT);
      }
    },
    [updateGrievanceType.rejected]: state => {
      state.loading = false;
      toastrError();
    },

    [deleteGrievanceType.fulfilled]: () => {
      toastrCRUDSuccess(GRIEVANCE_TYPE, TEXT_DELETE);
    },
    [deleteGrievanceType.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = GrievanceTypeSlide;
export default reducer;
