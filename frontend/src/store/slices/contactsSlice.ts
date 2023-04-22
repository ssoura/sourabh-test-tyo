import { createSlice } from "@reduxjs/toolkit";

import {
  fetchContacts,
  deleteContact,
  createContact,
  editContact,
} from "../thunks/contactsThunks";

interface ContactType {
  _id: string;
  firstname: string;
  lastname: string;
  status: string;
}

interface ContactsState {
  contacts: ContactType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  status: "idle",
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload
        );
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const updatedContact = action.payload;
        const existingContactIndex = state.contacts.findIndex(
          (contact) => contact._id === updatedContact._id
        );
        if (existingContactIndex !== -1) {
          state.contacts[existingContactIndex] = updatedContact;
        }
      });
  },
});

export default contactsSlice.reducer;
