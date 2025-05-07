import React from "react";

const ProductLists: React.FC = () => {
  return <div>ProductLists</div>;
};

export default ProductLists;

// import { useState } from "react";
// import { useGetAllProductsQuery } from "@/redux/api/ecommerce/productApi";
// import { Product } from "@/types/ProductType";

// const ProductList: React.FC = () => {
//   const {
//     data: products,
//     isLoading: isProductsLoading,
//     isError: isProductsError,
//   } = useGetAllProductsQuery();

//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const handleOpenSidebar = (product: Product) => {
//     setSelectedProduct(product);
//   };

//   const handleCloseSidebar = () => {
//     setSelectedProduct(null);
//   };

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
//               <button
//                 onClick={() => handleOpenSidebar(product)}
//                 className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <ProductDetailsSidebar
//         product={selectedProduct}
//         onClose={handleCloseSidebar}
//       />
//     </div>
//   );
// };

// // Skeleton loader component for loading state
// const SkeletonCard: React.FC = () => (
//   <div className="animate-pulse rounded-lg border bg-white p-4 shadow-sm">
//     <div className="mb-4 h-48 w-full rounded bg-gray-200"></div>
//     <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
//     <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
//     <div className="h-4 w-1/2 rounded bg-gray-200"></div>
//   </div>
// );

// // Product details sidebar component
// const ProductDetailsSidebar: React.FC<{
//   product: Product | null;
//   onClose: () => void;
// }> = ({ product, onClose }) => (
//   <div
//     className={`fixed inset-y-0 right-0 w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-96 ${
//       product ? "translate-x-0" : "translate-x-full"
//     }`}
//   >
//     {product && (
//       <div className="flex h-full flex-col">
//         <div className="flex items-center justify-between border-b p-4">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Product Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="rounded p-2 text-gray-600 hover:bg-gray-100"
//             aria-label="Close sidebar"
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="mb-4 h-64 w-full rounded object-cover"
//           />
//           <h3 className="mb-2 text-lg font-medium text-gray-800">
//             {product.name}{" "}
//           </h3>
//           <p className="mb-4 text-gray-600">{product.description}</p>
//           <div className="text-sm text-gray-400">
//             <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
//             <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
//             <p>Category ID: {product.categoryId}</p>
//             <p>Status ID: {product.statusId}</p>
//           </div>
//         </div>
//         <div className="border-t p-4">
//           <button
//             onClick={onClose}
//             className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default ProductList;

// // import { useGetAllProductsQuery } from "@/redux/api/ecommerce/productApi";
// // import { Link } from "react-router-dom";
// // import { Product } from "@/types/ProductType";

// // // Skeleton loader component for loading state
// // const SkeletonCard: React.FC = () => (
// //   <div className="animate-pulse rounded-lg border bg-white p-4 shadow-sm">
// //     <div className="mb-4 h-48 w-full rounded bg-gray-200"></div>
// //     <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
// //     <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
// //     <div className="h-4 w-1/2 rounded bg-gray-200"></div>
// //   </div>
// // );

// // const ProductList: React.FC = () => {
// //   const {
// //     data: products,
// //     isLoading: isProductsLoading,
// //     isError: isProductsError,
// //   } = useGetAllProductsQuery();

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       {isProductsError ? (
// //         <div className="flex h-64 items-center justify-center rounded-lg bg-red-50 p-6 text-center">
// //           <p className="text-lg font-semibold text-red-600">
// //             Oops! Something went wrong. Please try again later.
// //           </p>
// //         </div>
// //       ) : isProductsLoading ? (
// //         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //           {[...Array(6)].map((_, index) => (
// //             <SkeletonCard key={index} />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //           {products?.map((product: Product) => (
// //             <div
// //               key={product.id}
// //               className="group rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
// //             >
// //               <div className="mb-4 overflow-hidden rounded">
// //                 <img
// //                   src={product.imageUrl}
// //                   alt={product.name}
// //                   className="h-48 w-full object-cover transition-transform group-hover:scale-105"
// //                 />
// //               </div>
// //               <h2 className="mb-2 text-xl font-semibold text-gray-800">
// //                 {product.name}
// //               </h2>
// //               <p className="mb-4 line-clamp-2 text-gray-600">
// //                 {product.description}
// //               </p>
// //               <div className="mb-4 flex space-x-4 text-sm text-gray-400">
// //                 <p>
// //                   Created: {new Date(product.createdAt).toLocaleDateString()}
// //                 </p>
// //                 <p>
// //                   Updated: {new Date(product.updatedAt).toLocaleDateString()}
// //                 </p>
// //                 <p>Category ID: {product.categoryId}</p>
// //                 <p>Status ID: {product.statusId}</p>
// //               </div>
// //               <Link
// //                 to={`/products/${product.id}`}
// //                 className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
// //               >
// //                 View Details
// //               </Link>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductList;

// // // import { useGetAllProductsQuery } from "@/redux/api/ecommerce/productApi";

// // // import { Link } from "react-router-dom";

// // // import { Product } from "@/types/ProductType";

// // // const ProductList: React.FC = () => {
// // //   const {
// // //     data: products,
// // //     isLoading: isProductsLoading,
// // //     isError: isProductsError,
// // //   } = useGetAllProductsQuery();

// // //   return (
// // //     <div className="">
// // //       {isProductsError ? (
// // //         <div>
// // //           <p className="">Opp! There is an error. </p>
// // //         </div>
// // //       ) : (
// // //         <div className="">
// // //           {isProductsLoading ? (
// // //             <div className="">
// // //               <p>Product is Loading ....</p>
// // //             </div>
// // //           ) : (
// // //             <div className="backdrop-blur-sm shadow-2xl  ">
// // //               {products?.map((product: Product) => (
// // //                 <div key={product.id} className="border p-4">
// // //                   <img src={product.imageUrl} alt="img" />
// // //                   <h2>{product.name}</h2>
// // //                   <p>{product.description}</p>
// // //                   <div className="text-sm opacity-15">
// // //                     <p>Create At: {product.createdAt}</p>
// // //                     <p>Update At: {product.updatedAt}</p>
// // //                     <p>Categroy Id: {product.categoryId}</p>
// // //                     <p>Status Id: {product.statusId}</p>
// // //                   </div>
// // //                   <Link
// // //                     to={`/products/${product.id}`}
// // //                     className="text-blue-500"
// // //                   >
// // //                     View
// // //                   </Link>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ProductList;

// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import {
// //   useGetAllProductsQuery,
// //   // useSyncCartMutation,
// // } from "@/redux/api/ecommerce/productApi";
// // import { addToCart } from "@/redux/slice/cartSlice";
// // import { Product } from "@/types/ProductType";

// // // Define cart item type (from cart artifact)
// // interface CartItem {
// //   id: string;
// //   name: string;
// //   price: number;
// //   quantity: number;
// // }

// // // Skeleton loader component for loading state
// // const SkeletonCard: React.FC = () => (
// //   <div className="animate-pulse rounded-lg border bg-white p-4 shadow-sm">
// //     <div className="mb-4 h-48 w-full rounded bg-gray-200"></div>
// //     <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
// //     <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
// //     <div className="h-4 w-1/2 rounded bg-gray-200"></div>
// //   </div>
// // );

// // // Add to Cart sidebar component
// // const CartSidebar: React.FC<{
// //   product: Product | null;
// //   onClose: () => void;
// // }> = ({ product, onClose }) => {
// //   const dispatch = useDispatch();
// //   // const [syncCart] = useSyncCartMutation();
// //   const [quantity, setQuantity] = useState(1);

// //   const handleAddToCart = () => {
// //     if (product) {
// //       const cartItem: CartItem = {
// //         id: product.id,
// //         name: product.name,
// //         price: product.price || 0, // Assume price is part of Product type
// //         quantity,
// //       };
// //       dispatch(addToCart(cartItem));
// //       // syncCart([cartItem]); // Sync with backend
// //       onClose();
// //     }
// //   };

// //   return (
// //     <div
// //       className={`fixed inset-y-0 right-0 w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-96 ${
// //         product ? "translate-x-0" : "translate-x-full"
// //       }`}
// //     >
// //       {product && (
// //         <div className="flex h-full flex-col">
// //           <div className="flex items-center justify-between border-b p-4">
// //             <h2 className="text-xl font-semibold text-gray-800">Add to Cart</h2>
// //             <button
// //               onClick={onClose}
// //               className="rounded p-2 text-gray-600 hover:bg-gray-100"
// //               aria-label="Close sidebar"
// //             >
// //               <svg
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   d="M6 18L18 6M6 6l12 12"
// //                 />
// //               </svg>
// //             </button>
// //           </div>
// //           <div className="flex-1 overflow-y-auto p-4">
// //             <img
// //               src={product.imageUrl}
// //               alt={product.name}
// //               className="mb-4 h-64 w-full rounded object-cover"
// //             />
// //             <h3 className="mb-2 text-lg font-medium text-gray-800">
// //               {product.name}
// //             </h3>
// //             <p className="mb-4 text-gray-600">{product.description}</p>
// //             <div className="mb-4">
// //               <label
// //                 htmlFor="quantity"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Quantity
// //               </label>
// //               <input
// //                 type="number"
// //                 id="quantity"
// //                 min="1"
// //                 value={quantity}
// //                 onChange={(e) => setQuantity(Number(e.target.value))}
// //                 className="mt-1 w-20 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
// //               />
// //             </div>
// //           </div>
// //           <div className="border-t p-4">
// //             <button
// //               onClick={handleAddToCart}
// //               className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
// //             >
// //               Add to Cart
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const ProductList: React.FC = () => {
// //   const {
// //     data: products,
// //     isLoading: isProductsLoading,
// //     isError: isProductsError,
// //   } = useGetAllProductsQuery();
// //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// //   const [expandedProductId, setExpandedProductId] = useState<string | null>(
// //     null
// //   );

// //   const handleOpenSidebar = (product: Product) => {
// //     setSelectedProduct(product);
// //   };

// //   const handleCloseSidebar = () => {
// //     setSelectedProduct(null);
// //   };

// //   const toggleDetails = (productId: string) => {
// //     setExpandedProductId(expandedProductId === productId ? null : productId);
// //   };

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       {isProductsError ? (
// //         <div className="flex h-64 items-center justify-center rounded-lg bg-red-50 p-6 text-center">
// //           <p className="text-lg font-semibold text-red-600">
// //             Oops! Something went wrong. Please try again later.
// //           </p>
// //         </div>
// //       ) : isProductsLoading ? (
// //         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //           {[...Array(6)].map((_, index) => (
// //             <SkeletonCard key={index} />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //           {products?.map((product: Product) => (
// //             <div
// //               key={product.id}
// //               className="group rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
// //             >
// //               <div className="mb-4 overflow-hidden rounded">
// //                 <img
// //                   src={product.imageUrl}
// //                   alt={product.name}
// //                   className="h-48 w-full object-cover transition-transform group-hover:scale-105"
// //                 />
// //               </div>
// //               <h2 className="mb-2 text-xl font-semibold text-gray-800">
// //                 {product.name}
// //               </h2>
// //               <button
// //                 onClick={() => toggleDetails(product.id)}
// //                 className="mb-2 text-blue-600 hover:underline focus:outline-none"
// //               >
// //                 {expandedProductId === product.id
// //                   ? "Hide Details"
// //                   : "Show Details"}
// //               </button>
// //               {expandedProductId === product.id && (
// //                 <div className="mb-4 animate-fade-in">
// //                   <p className="text-gray-600">{product.description}</p>
// //                   <div className="mt-2 text-sm text-gray-400">
// //                     <p>
// //                       Created:{" "}
// //                       {new Date(product.createdAt).toLocaleDateString()}
// //                     </p>
// //                     <p>
// //                       Updated:{" "}
// //                       {new Date(product.updatedAt).toLocaleDateString()}
// //                     </p>
// //                     <p>Category ID: {product.categoryId}</p>
// //                     <p>Status ID: {product.statusId}</p>
// //                   </div>
// //                 </div>
// //               )}
// //               <button
// //                 onClick={() => handleOpenSidebar(product)}
// //                 className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
// //               >
// //                 Add to Cart
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //       <CartSidebar product={selectedProduct} onClose={handleCloseSidebar} />
// //     </div>
// //   );
// // };

// // export default ProductList;
