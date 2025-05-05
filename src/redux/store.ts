import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { postApi } from "./api/json/postApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postApi.middleware),
});

export default store;
