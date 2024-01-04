import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_ENERGY_POINT_RULE } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import {
  ENERGY_POINT_RULE,
  TEXT_DELETE,
  TEXT_POST,
  TEXT_PUT,
} from "helpers/name_helper";

const initialState = {
  energyPointRule: [],
};

export const fetchEnergyPointRule = commonHandleHttpMethodGet(
  "EnergyPointRule/fetchEnergyPointRule",
  GET_ENERGY_POINT_RULE
);
export const addEnergyPointRule = commonHandleHttpMethodPost(
  "EnergyPointRule/addEnergyPointRule",
  GET_ENERGY_POINT_RULE
);
export const updateEnergyPointRule = commonHandleHttpMethodPutV2(
  "EnergyPointRule/updateEnergyPointRule",
  GET_ENERGY_POINT_RULE
);
export const deleteEnergyPointRule = commonHandleHttpMethodDelete(
  "EnergyPointRule/deleteEnergyPointRule",
  GET_ENERGY_POINT_RULE
);

export const deleteEnergyPointRuleMultiple =
  commonHandleHttpMethodMultipleDelete(
    "EnergyPointRule/deleteEnergyPointRuleMultiple",
    GET_ENERGY_POINT_RULE
  );

const EnergyPointRule = createSlice({
  name: "EnergyPointRule",
  initialState,
  extraReducers: {
    [fetchEnergyPointRule.fulfilled]: (state, action) => {
      state.energyPointRule = action.payload;
    },
    [addEnergyPointRule.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ENERGY_POINT_RULE, TEXT_POST);
    },
    [updateEnergyPointRule.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ENERGY_POINT_RULE, TEXT_PUT);
    },
    [deleteEnergyPointRule.fulfilled]: (state, action) => {
      toastrCRUDSuccess(ENERGY_POINT_RULE, TEXT_DELETE);
    },

    [deleteEnergyPointRuleMultiple.fulfilled]: () => {
      toastrCRUDSuccess(ENERGY_POINT_RULE, TEXT_DELETE);
    },
    [deleteEnergyPointRuleMultiple.rejected]: () => {
      toastrError();
    },
  },
});

const { actions, reducer } = EnergyPointRule;
export default reducer;
export const {} = actions;
