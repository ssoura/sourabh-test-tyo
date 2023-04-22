import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// This function uses the createAsyncThunk to create a thunk to fetch contacts from the API.
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get<ContactType[]>(
      `${process.env.REACT_APP_API_URL}/contacts`
    );
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id: string) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/contacts/${id}`);
    return id;
  }
);

// Creates a new contact by sending a POST request to the API.
// It returns the contact data once the API responds.
export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contact: ContactFormData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/contacts`,
      contact
    );
    return response.data;
  }
);

// Edit a contact
// @param contact: ContactType
// @return response.data: ContactType
export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (contact: ContactType) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/contacts/${contact._id}`,
      contact
    );
    return response.data;
  }
);
