import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_QUALITY_INSPECTION } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  qualityInspections: [],
};

export const fetchQualityInspections = commonHandleHttpMethodGet(
  "QualityInspectionSlice/fetchQualityInspections",
  GET_QUALITY_INSPECTION
);

export const addQualityInspection = commonHandleHttpMethodPost(
  "QualityInspectionSlice/addQualityInspection",
  GET_QUALITY_INSPECTION
);

export const updateQualityInspection = commonHandleHttpMethodPutV2(
  "QualityInspectionSlice/updateQualityInspection",
  GET_QUALITY_INSPECTION
);

export const deleteQualityInspection = commonHandleHttpMethodMultipleDelete(
  "QualityInspectionSlice/deleteQualityInspection",
  GET_QUALITY_INSPECTION
);

const qualityInspectionSlice = createSlice({
  name: "QualityInspectionSlice",
  initialState,
  extraReducers: {
    [fetchQualityInspections.fulfilled]: (state, action) => {
      state.qualityInspections = action.payload;
    },
    [addQualityInspection.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Quality Inspection", TEXT_POST);
    },
    [updateQualityInspection.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Quality Inspection", TEXT_PUT);
    },
    [deleteQualityInspection.fulfilled]: (state, action) => {
      toastrCRUDSuccess("Quality Inspection", TEXT_DELETE);
    },
  },
});

const { reducer } = qualityInspectionSlice;
export default reducer;
