/**
 * This file sets up the Redux store for use in the application.
 */

import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "./slices/contactsSlice";

// Configure store with contacts reducer, which is the only reducer in our store for now
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// contains the thunks that are used to dispatch actions to the store.
export * from "./thunks/contactsThunks";
