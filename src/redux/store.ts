import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { productApi } from "./api/ecommerce/productApi";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    // reducer
    cart: cartReducer,

    // rtk_qurey
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware),
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
