import { useGetAllProductsQuery } from "@/redux/api/ecommerce/productApi";
import { Link } from "react-router-dom";
import { Product } from "@/types/ProductType";

// Skeleton loader component for loading state
const SkeletonCard: React.FC = () => (
  <div className="animate-pulse rounded-lg border bg-white p-4 shadow-sm">
    <div className="mb-4 h-48 w-full rounded bg-gray-200"></div>
    <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
    <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
  </div>
);

const ProductList: React.FC = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetAllProductsQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      {isProductsError ? (
        <div className="flex h-64 items-center justify-center rounded-lg bg-red-50 p-6 text-center">
          <p className="text-lg font-semibold text-red-600">
            Oops! Something went wrong. Please try again later.
          </p>
        </div>
      ) : isProductsLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product: Product) => (
            <div
              key={product.id}
              className="group rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 overflow-hidden rounded">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="mb-4 line-clamp-2 text-gray-600">
                {product.description}
              </p>
              <div className="mb-4 text-sm text-gray-400">
                <p>
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated: {new Date(product.updatedAt).toLocaleDateString()}
                </p>
                <p>Category ID: {product.categoryId}</p>
                <p>Status ID: {product.statusId}</p>
              </div>
              امتیاز دهید
              <Link
                to={`/products/${product.id}`}
                className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
// // store/cartSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the shape of a cart item
// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// // Define the cart state
// interface CartState {
//   items: CartItem[];
// }

// // Initial state
// const initialState: CartState = {
//   items: [],
// };

// // Create the cart slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// // store/apiSlice.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Define the product type
// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// // Create the RTK Query API slice
// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://api.example.com/" }), // Replace with your API URL
//   endpoints: (builder) => ({
//     getProduct: builder.query<Product, string>({
//       query: (id) => `products/${id}`,
//     }),
//     syncCart: builder.mutation<void, CartItem[]>({
//       query: (cartItems) => ({
//         url: "cart/sync",
//         method: "POST",
//         body: cartItems,
//       }),
//     }),
//   }),
// });

// // Export hooks for usage in components
// export const { useGetProductQuery, useSyncCartMutation } = apiSlice;

// // store/index.ts
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import cartReducer from "./cartSlice";
// import { apiSlice } from "./apiSlice";

// // Persistence configuration
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"], // Only persist the cart reducer
// };

// // Wrap cart reducer with persistence
// const persistedReducer = persistReducer(persistConfig, cartReducer);

// // Configure the store
// export const store = configureStore({
//   reducer: {
//     cart: persistedReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST"],
//       },
//     }).concat(apiSlice.middleware),
// });

// // Export store types for TypeScript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Create persistor
// export const persistor = persistStore(store);

// // components/Cart.tsx
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetProductQuery, useSyncCartMutation } from "../store/apiSlice";
// import { addToCart, clearCart } from "../store/cartSlice";
// import { RootState } from "../store";

// // Cart component
// const Cart: React.FC<{ productId: string }> = ({ productId }) => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   // Fetch product details using RTK Query
//   const { data: product, isLoading } = useGetProductQuery(productId);

//   // Mutation to sync cart with backend
//   const [syncCart] = useSyncCartMutation();

//   const handleAddToCart = () => {
//     if (product) {
//       const cartItem: CartItem = {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//       };
//       dispatch(addToCart(cartItem));
//       syncCart(cartItems); // Sync with backend
//     }
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//     syncCart([]); // Sync empty cart with backend
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Cart</h2>
//       <button onClick={handleAddToCart} disabled={!product}>
//         Add {product?.name} to Cart
//       </button>
//       <button onClick={handleClearCart}>Clear Cart</button>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>
//             {item.name} - ${item.price} x {item.quantity}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Cart;

// // App.tsx
// import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store";
// import Cart from "./components/Cart";

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Cart productId="1" /> {/* Example product ID */}
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;
