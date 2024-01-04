import { createSlice } from "@reduxjs/toolkit";

import {
  commonHandleHttpMethodMultipleDelete,
  commonHandleHttpMethodGet,
  commonHandleHttpMethodPost,
  commonHandleHttpMethodPutV2,
} from "helpers/erp_helper";
import { GET_CONTACTS } from "helpers/url_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_DELETE, TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const initialState = {
  contacts: [],
};

export const fetchContacts = commonHandleHttpMethodGet(
  "ContactSlice/fetchContacts",
  GET_CONTACTS
);

export const addContact = commonHandleHttpMethodPost(
  "ContactSlice/addContact",
  GET_CONTACTS
);

export const updateContact = commonHandleHttpMethodPutV2(
  "ContactSlice/updateContact",
  GET_CONTACTS
);

export const deleteContact = commonHandleHttpMethodMultipleDelete(
  "ContactSlice/deleteContact",
  GET_CONTACTS
);

const contactSlice = createSlice({
  name: "ContactSlice",
  initialState,
  extraReducers: {
    [fetchContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload;
    },
    [addContact.fulfilled]: (state, action) => {
      toastrCRUDSuccess("contact", TEXT_POST);
    },
    [updateContact.fulfilled]: (state, action) => {
      toastrCRUDSuccess("contact", TEXT_PUT);
    },
    [deleteContact.fulfilled]: (state, action) => {
      toastrCRUDSuccess("contact", TEXT_DELETE);
    },
  },
});

const { reducer } = contactSlice;
export default reducer;
