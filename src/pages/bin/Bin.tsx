import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store"; // Adjust the path to your Redux store file
// import { addToCart, removeFromCart, setCount } from "@/redux/slice/cartSlice"; // Assuming cartSlice.ts is in this path

import { RootState } from "@/redux/store"; // Adjust the path to your Redux store file
import { addToCart, removeFromCart, setCount } from "@/redux/slice/cartSlice";
// Interface for product data within this component
import { useGetAllProductsQuery } from "@/redux/api/ecommerce/productApi"; // Adjust the path to your product API file
// interface Product {
//   id: number;
//   name: string; // Will be used as 'title' for the cart
//   description: string;
//   price: number;
// }
import { Product } from "@/types/ProductType";

// Interface for items in the cart, matching your Redux slice
interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

const Home = () => {
  const dispatch = useDispatch();
  const dataCount = useSelector((state: RootState) => state.cart.count);
  const cartItems = useSelector(
    (state: RootState) => state.cart.items as CartItem[]
  );

  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery();

  if (isProductsLoading) return <div>Loading...</div>;
  // const products: Product[] = [
  //   {
  //     id: 1,
  //     name: "Laptop Pro",
  //     description: "High-performance laptop for professionals.",
  //     price: 1200.0,
  //   },
  //   {
  //     id: 2,
  //     name: "Wireless Mouse",
  //     description: "Ergonomic wireless mouse with long battery life.",
  //     price: 25.5,
  //   },
  //   {
  //     id: 3,
  //     name: "Mechanical Keyboard",
  //     description: "RGB mechanical keyboard with tactile switches.",
  //     price: 75.0,
  //   },
  //   {
  //     id: 4,
  //     name: "4K Monitor",
  //     description: "27-inch 4K UHD monitor with vibrant colors.",
  //     price: 350.99,
  //   },
  // ];

  const handleIncrementCount = () => {
    // setCount reducer increments count by 1 and does not use payload
    dispatch(setCount(dataCount + 1)); // Increment the count by 1
  };

  const handleAddToCart = (product: Product) => {
    console.log("Adding product to cart:", product.name);
    // The addToCart reducer expects an object with productId, title, and price
    // It will handle the quantity internally.
    dispatch(
      addToCart({
        productId: product.id,
        title: product.name, // Using product.name as title
        price: product.price,
      })
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    console.log("Removing product with ID:", productId);
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          My E-Commerce Store
        </h1>
      </header>

      {/* Count Display and Action */}
      <div className="mb-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md text-center">
        <p className="text-2xl font-semibold text-gray-700 mb-2">
          Global Cart Action Count:{" "}
          <span className="text-indigo-600">{dataCount}</span>
        </p>
        <button
          onClick={handleIncrementCount}
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Trigger Global Count Increment
        </button>
        <p className="text-xs text-gray-500 mt-1">
          (Note: This count is separate from cart item quantities)
        </p>
      </div>

      {/* Products Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5">
                {/* Placeholder for product image - you can add an <img> tag here */}
                <div className="w-full h-48 bg-gray-200 mb-4 rounded-md flex items-center justify-center">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    fill="currentColor"
                    className="bi bi-image text-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                  </svg> */}
                  <img
                    src={product.imageUrl}
                    alt="product_img"
                    className="h-72 w-full object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold  backdrop-blur-sm  mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>

                <p className="text-lg font-bold text-green-600 mb-4">
                  {/* ${product.price.toFixed(2)} */}
                  Price haven't been added yet
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full p-3 bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Cart Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Shopping Cart
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6">
          {cartItems && cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                >
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium text-gray-700">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {/* Price: ${item.price.toFixed(2)} */}
                      This line is price
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity:{" "}
                      <span className="font-semibold">{item.quantity}</span>
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-gray-800 sm:text-right">
                    {/* Subtotal: ${(item.price * item.quantity).toFixed(2)} */}
                    total price price and quantity
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remove
                  </button>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t border-gray-300 text-right">
                <p className="text-xl font-bold text-gray-800">
                  Total: $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </li>
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              Your cart is empty. Start shopping!
            </p>
          )}
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} My E-Commerce Store. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;

// import { useGetAllProductsQuery } from "@/redux/api/ecommerce/productApi";
// import { Link } from "react-router-dom";
// import { Product } from "@/types/ProductType";

// // Skeleton loader component for loading state
// const SkeletonCard: React.FC = () => (
//   <div className="animate-pulse rounded-lg border bg-white p-4 shadow-sm">
//     <div className="mb-4 h-48 w-full rounded bg-gray-200"></div>
//     <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
//     <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
//     <div className="h-4 w-1/2 rounded bg-gray-200"></div>
//   </div>
// );

// const ProductList: React.FC = () => {
//   const {
//     data: products,
//     isLoading: isProductsLoading,
//     isError: isProductsError,
//   } = useGetAllProductsQuery();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {isProductsError ? (
//         <div className="flex h-64 items-center justify-center rounded-lg bg-red-50 p-6 text-center">
//           <p className="text-lg font-semibold text-red-600">
//             Oops! Something went wrong. Please try again later.
//           </p>
//         </div>
//       ) : isProductsLoading ? (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {[...Array(6)].map((_, index) => (
//             <SkeletonCard key={index} />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {products?.map((product: Product) => (
//             <div
//               key={product.id}
//               className="group rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
//             >
//               <div className="mb-4 overflow-hidden rounded">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="h-48 w-full object-cover transition-transform group-hover:scale-105"
//                 />
//               </div>
//               <h2 className="mb-2 text-xl font-semibold text-gray-800">
//                 {product.name}
//               </h2>
//               <p className="mb-4 line-clamp-2 text-gray-600">
//                 {product.description}
//               </p>
//               <div className="mb-4 text-sm text-gray-400">
//                 <p>
//                   Created: {new Date(product.createdAt).toLocaleDateString()}
//                 </p>
//                 <p>
//                   Updated: {new Date(product.updatedAt).toLocaleDateString()}
//                 </p>
//                 <p>Category ID: {product.categoryId}</p>
//                 <p>Status ID: {product.statusId}</p>
//               </div>
//               امتیاز دهید
//               <Link
//                 to={`/products/${product.id}`}
//                 className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
//               >
//                 View Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;
// // // store/cartSlice.ts
// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // // Define the shape of a cart item
// // interface CartItem {
// //   id: string;
// //   name: string;
// //   price: number;
// //   quantity: number;
// // }

// // // Define the cart state
// // interface CartState {
// //   items: CartItem[];
// // }

// // // Initial state
// // const initialState: CartState = {
// //   items: [],
// // };

// // // Create the cart slice
// // const cartSlice = createSlice({
// //   name: "cart",
// //   initialState,
// //   reducers: {
// //     addToCart: (state, action: PayloadAction<CartItem>) => {
// //       const existingItem = state.items.find(
// //         (item) => item.id === action.payload.id
// //       );
// //       if (existingItem) {
// //         existingItem.quantity += action.payload.quantity;
// //       } else {
// //         state.items.push(action.payload);
// //       }
// //     },
// //     clearCart: (state) => {
// //       state.items = [];
// //     },
// //   },
// // });

// // export const { addToCart, clearCart } = cartSlice.actions;
// // export default cartSlice.reducer;

// // // store/apiSlice.ts
// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // // Define the product type
// // interface Product {
// //   id: string;
// //   name: string;
// //   price: number;
// // }

// // // Create the RTK Query API slice
// // export const apiSlice = createApi({
// //   reducerPath: "api",
// //   baseQuery: fetchBaseQuery({ baseUrl: "https://api.example.com/" }), // Replace with your API URL
// //   endpoints: (builder) => ({
// //     getProduct: builder.query<Product, string>({
// //       query: (id) => `products/${id}`,
// //     }),
// //     syncCart: builder.mutation<void, CartItem[]>({
// //       query: (cartItems) => ({
// //         url: "cart/sync",
// //         method: "POST",
// //         body: cartItems,
// //       }),
// //     }),
// //   }),
// // });

// // // Export hooks for usage in components
// // export const { useGetProductQuery, useSyncCartMutation } = apiSlice;

// // // store/index.ts
// // import { configureStore } from "@reduxjs/toolkit";
// // import { persistStore, persistReducer } from "redux-persist";
// // import storage from "redux-persist/lib/storage";
// // import cartReducer from "./cartSlice";
// // import { apiSlice } from "./apiSlice";

// // // Persistence configuration
// // const persistConfig = {
// //   key: "root",
// //   storage,
// //   whitelist: ["cart"], // Only persist the cart reducer
// // };

// // // Wrap cart reducer with persistence
// // const persistedReducer = persistReducer(persistConfig, cartReducer);

// // // Configure the store
// // export const store = configureStore({
// //   reducer: {
// //     cart: persistedReducer,
// //     [apiSlice.reducerPath]: apiSlice.reducer,
// //   },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: {
// //         ignoredActions: ["persist/PERSIST"],
// //       },
// //     }).concat(apiSlice.middleware),
// // });

// // // Export store types for TypeScript
// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;

// // // Create persistor
// // export const persistor = persistStore(store);

// // // components/Cart.tsx
// // import React from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useGetProductQuery, useSyncCartMutation } from "../store/apiSlice";
// // import { addToCart, clearCart } from "../store/cartSlice";
// // import { RootState } from "../store";

// // // Cart component
// // const Cart: React.FC<{ productId: string }> = ({ productId }) => {
// //   const dispatch = useDispatch();
// //   const cartItems = useSelector((state: RootState) => state.cart.items);

// //   // Fetch product details using RTK Query
// //   const { data: product, isLoading } = useGetProductQuery(productId);

// //   // Mutation to sync cart with backend
// //   const [syncCart] = useSyncCartMutation();

// //   const handleAddToCart = () => {
// //     if (product) {
// //       const cartItem: CartItem = {
// //         id: product.id,
// //         name: product.name,
// //         price: product.price,
// //         quantity: 1,
// //       };
// //       dispatch(addToCart(cartItem));
// //       syncCart(cartItems); // Sync with backend
// //     }
// //   };

// //   const handleClearCart = () => {
// //     dispatch(clearCart());
// //     syncCart([]); // Sync empty cart with backend
// //   };

// //   if (isLoading) return <div>Loading...</div>;

// //   return (
// //     <div>
// //       <h2>Cart</h2>
// //       <button onClick={handleAddToCart} disabled={!product}>
// //         Add {product?.name} to Cart
// //       </button>
// //       <button onClick={handleClearCart}>Clear Cart</button>
// //       <ul>
// //         {cartItems.map((item) => (
// //           <li key={item.id}>
// //             {item.name} - ${item.price} x {item.quantity}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Cart;

// // // App.tsx
// // import React from "react";
// // import { Provider } from "react-redux";
// // import { PersistGate } from "redux-persist/integration/react";
// // import { store, persistor } from "./store";
// // import Cart from "./components/Cart";

// // const App: React.FC = () => {
// //   return (
// //     <Provider store={store}>
// //       <PersistGate loading={null} persistor={persistor}>
// //         <Cart productId="1" /> {/* Example product ID */}
// //       </PersistGate>
// //     </Provider>
// //   );
// // };

// // export default App;
