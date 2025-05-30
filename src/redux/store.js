import { configureStore } from "@reduxjs/toolkit";
import manageReducer from "./slices/manageSlice";

export const store = configureStore({
  reducer: {
    manage: manageReducer,
  },
});