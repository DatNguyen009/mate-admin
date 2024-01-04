import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import {
  ADD_NEW_TERRITORY,
  DELETE_TERRITORY,
  GET_TERRITORY,
  UPDATE_TERRITORY,
} from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  territories: [],
};

export const fetchTerritories = commonHandleHttpMethodGet(
  "territorySlice/fetchTerritories",
  GET_TERRITORY
);
export const addTerritory = commonHandleHttpMethodPost(
  "territorySlice/addTerritory",
  ADD_NEW_TERRITORY
);
export const updateTerritory = commonHandleHttpMethodPutV2(
  "territorySlice/updateTerritory",
  UPDATE_TERRITORY
);
export const deleteTerritory = commonHandleHttpMethodDelete(
  "territorySlice/deleteTerritory",
  DELETE_TERRITORY
);

const territorySlice = createSlice({
  name: "Territory",
  initialState,
  extraReducers: {
    [fetchTerritories.fulfilled]: (state, action) => {
      state.territories = action.payload;
    },
    [addTerritory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("territory", TEXT_POST);
    },
    [updateTerritory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("territory", TEXT_PUT);
    },
    [deleteTerritory.fulfilled]: (state, action) => {
      toastrCRUDSuccess("territory", TEXT_DELETE);
    },
  },
});

const { actions, reducer } = territorySlice;
export default reducer;
export const {} = actions;
