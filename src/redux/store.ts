import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { productApi } from "./api/ecommerce/productApi";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";

import { dashboardApi } from "./api/ecommerce/dashboardApi";
const store = configureStore({
  reducer: {
    // reducer
    cart: cartReducer,
    product: productReducer,

    // rtk_qurey
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(dashboardApi.middleware),
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
