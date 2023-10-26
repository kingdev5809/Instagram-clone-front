import { configureStore } from "@reduxjs/toolkit";
import TheSlice from "./TheSlice";

const store = configureStore({
  reducer: {
    Slice: TheSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
