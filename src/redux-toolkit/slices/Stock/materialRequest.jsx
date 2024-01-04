import { createSlice } from "@reduxjs/toolkit";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  GET_MATERIAL_REQUEST,
  GET_MATERIAL_REQUEST_QUERY,
} from "helpers/url_helper";
import {
  MATERIAL_REQUEST,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";
import { createUrlParams } from "helpers/parseUrl";

export const fetchMaterialRequest = commonHandleHttpMethodGet(
  "MaterialRequest/fetchMaterialRequest",
  `${GET_MATERIAL_REQUEST}?${createUrlParams(GET_MATERIAL_REQUEST_QUERY)}`
);

export const getMaterialRequestByID = commonHandleHttpMethodGet(
  "MaterialRequest/getMaterialRequestByID",
  GET_MATERIAL_REQUEST
);

export const createMaterialRequest = commonHandleHttpMethodPost(
  "MaterialRequest/postMaterialRequest",
  GET_MATERIAL_REQUEST
);

export const updateMaterialRequest = commonHandleHttpMethodPutV2(
  "MaterialRequest/updateMaterialRequest",
  GET_MATERIAL_REQUEST
);

export const deleteMaterialRequest = commonHandleHttpMethodMultipleDelete(
  "MaterialRequest/updateMaterialRequest",
  GET_MATERIAL_REQUEST
);
const initialState = {
  fetched: false,
  materialRequestList: [],
  MaterialRequestDetail: {},
};

const MaterialRequest = createSlice({
  name: "MaterialRequest",
  initialState,
  extraReducers: {
    [fetchMaterialRequest.fulfilled]: (state, action) => {
      state.fetched = true;
      state.materialRequestList = action.payload;
    },
    [fetchMaterialRequest.rejected]: (state, action) => {
      state.fetched = false;
    },
    [getMaterialRequestByID.fulfilled]: (state, action) => {
      state.MaterialRequestDetail = action.payload;
      state.fetched = false;
    },
    [createMaterialRequest.fulfilled]: (state, action) => {
      toastrCRUDSuccess(MATERIAL_REQUEST, TEXT_POST);
      return {
        ...state,
        fetched: false,
      };
    },
    [createMaterialRequest.rejected]: (state, action) => {
      toastrError();
    },
    [updateMaterialRequest.fulfilled]: (state, action) => {
      toastrCRUDSuccess(MATERIAL_REQUEST, TEXT_PUT);
      return {
        ...state,
        fetched: false,
      };
    },
    [updateMaterialRequest.rejected]: (state, action) => {
      toastrError();
    },

    [deleteMaterialRequest.fulfilled]: (state, action) => {
      toastrCRUDSuccess(MATERIAL_REQUEST, TEXT_DELETE);
    },
  },
});

const { actions, reducer } = MaterialRequest;
export default reducer;
export const {} = actions;
