import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodGet,
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_NOTIFICATIONS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  notifications: [],
};

export const fetchNotifications = commonHandleHttpMethodGet(
  "NotificationSlice/fetchNotifications",
  GET_NOTIFICATIONS
);
export const addNotification = commonHandleHttpMethodPost(
  "NotificationSlice/addNotification",
  GET_NOTIFICATIONS
);
export const updateNotification = commonHandleHttpMethodPutV2(
  "NotificationSlice/updateNotification",
  GET_NOTIFICATIONS
);
export const deleteNotification = commonHandleHttpMethodMultipleDelete(
  "NotificationSlice/deleteNotification",
  GET_NOTIFICATIONS
);

const notificationSlice = createSlice({
  name: "NotificationSlice",
  initialState,
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload;
    },
    [addNotification.fulfilled]: (state, action) => {
      toastrCRUDSuccess("notification", TEXT_POST);
    },
    [updateNotification.fulfilled]: (state, action) => {
      toastrCRUDSuccess("notification", TEXT_PUT);
    },
    [deleteNotification.fulfilled]: (state, action) => {
      toastrCRUDSuccess("notification", TEXT_DELETE);
    },
  },
});

const { reducer } = notificationSlice;
export default reducer;
