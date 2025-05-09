import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/slice/cartSlice";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/api/ecommerce/productApi";
import { Product } from "@/types/ProductType";
import { setSelectId } from "@/redux/slice/productSlice";

import ProductDetailsModal from "./ProductDetailsModal";

const ProductStore = () => {
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.product.selectId);

  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery();

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useGetProductByIdQuery(id!, { skip: !id });

  const [selectedSkus, setSelectedSkus] = useState<{ [key: number]: number }>(
    {}
  );

  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (
    productId: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedIndex = Number(event.target.value);
    setSelectedSkus((prev) => ({ ...prev, [productId]: selectedIndex }));

    const product = products?.find((p) => p.id === productId);
    if (product) {
      const selectedStockItem = product.stock[selectedIndex];
      // check info
      console.log("Selected SKU:", selectedStockItem.sku);
      console.log("Selected Stock Item:", selectedStockItem);
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log("Adding product to cart:", product);

    const selectedIndex = selectedSkus[product.id] ?? 0;

    if (product.stock.length > 0) {
      const stockItem = product.stock[selectedIndex];
      dispatch(
        addToCart({
          productId: product.id,
          title: product.name,
          price: stockItem.price,
          size: stockItem.size,
          sku: stockItem.sku,
          category: product.category.name,
        })
      );
    } else {
      console.warn("No stock available for product:", product.name);
    }
  };

  const handleProductDetails = (priductDetailsId: number) => {
    dispatch(setSelectId(priductDetailsId));
    // setOpen(true);
    setOpen((prev) => !prev);

    setTimeout(() => {
      setOpen(false);
    }, 1000 * 60);
  };

  const handleCloseDetails = () => {
    setOpen(false);
  };

  ///
  // Handler for SKU change within the modal
  // State for the selected SKU index *within the modal*
  const [modalSelectedSkuIndex, setModalSelectedSkuIndex] = useState<number>(0);
  const handleModalSkuChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setModalSelectedSkuIndex(Number(event.target.value));
  };
  ///

  return (
    <div className="p-2 min-h-screen ">
      {/* <div>
        {open && (
          <div className="  fixed insert-0 backdrop-blur-sm z-5">
            {isProductDetailsLoading ? (
              <> Product Details Loading</>
            ) : (
              <div
                // onClick={handleCloseDetails}
                className="flex p-2"
              >
                <div className=" font-bold p-2 overflow-hidden shadow-2xl">
                  <img
                    width={100}
                    height={200}
                    src={productDetails?.imageUrl}
                    alt={productDetails?.name}
                    className="w-200 h-200 object-cover p-2  rounded-lg"
                  />
                  <div className="flex p-2 bg-slate-900 text-white">
                    <p>{productDetails?.description}</p>
                  </div>
                </div>
                <div className="p-2 m-1">
                  <div className="grid grid-cols-2">
                    <p>{productDetails?.name}</p>
                    <button
                      onClick={() => handleCloseDetails()}
                      className="w-full p-2 m-1 bg-sky-900 "
                    >
                      Close
                    </button>
                    <p>{productDetails?.description}</p>
                    <p>{productDetails?.createdAt}</p>
                  </div>
                  <div className="bg-slate-900 text-white">
                    {productDetails?.stock &&
                      productDetails?.stock.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold">Available Variants:</h4>
                          <ul className="list-disc pl-5">
                            {productDetails?.stock.map((stockItem) => (
                              <li key={stockItem.sku} className="text-sm">
                                SKU: {stockItem.sku}, Size: {stockItem.size},
                                Price: ${stockItem.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    <h1>Also Put Add to cart here too.</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div> */}

      {/* Products Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-6">Products</h2>
        {isProductsLoading ? (
          <div className="h-screen bg-amber-500">Loading ... Products</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 backdrop-blur-sm shadow-2xl">
            {products?.map((product) => (
              <div
                key={product.id}
                className="shadow-lg overflow-hidden flex flex-col justify-between"
              >
                <div
                  onClick={() => handleProductDetails(product.id)}
                  className="p-2 m-1"
                >
                  <div className="p-2">
                    <div className="w-full h-72 mb-4 rounded-md flex items-center justify-center">
                      <img
                        src={product.imageUrl}
                        alt="product_img"
                        className="h-72 w-full object-cover rounded-md"
                      />
                    </div>
                    <h3 className="text-xl font-semibold backdrop-blur-sm mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm mb-3">{product.description}</p>

                    {/* Display price of the selected variant */}
                    <div>
                      {product.stock && product.stock.length > 0 ? (
                        <p className="text-lg font-bold text-green-600 mt-2">
                          $
                          {product.stock[
                            selectedSkus[product.id] ?? 0
                          ].price.toFixed(2)}
                        </p>
                      ) : (
                        <p className="text-gray-500 mt-2 text-sm">
                          Price not available for selected variant.
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p>{product.category.name}</p>
                        <img
                          src={product.category.iconUrl}
                          alt="product icon"
                          className="h-10 w-10"
                        />
                      </div>
                      <div className="backdrop-blur-sm shadow-2xl p-2">
                        {product.stock && product.stock.length > 0 ? (
                          <div className="mb-4">
                            <label
                              htmlFor={`sku-select-${product.id}`}
                              className="block text-sm font-medium mb-1"
                            >
                              Select Variant:
                            </label>
                            <select
                              id={`sku-select-${product.id}`}
                              name="sku"
                              value={selectedSkus[product.id] ?? 0}
                              onChange={(e) => handleChange(product.id, e)}
                            >
                              {product.stock.map((stockItem, index) => (
                                <option
                                  key={stockItem.sku || index}
                                  value={index}
                                >
                                  {stockItem.sku} - {stockItem.size} ($
                                  {stockItem.price.toFixed(2)})
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className=" p-3 dark:bg-white dark:text-cyan-900 bg-slate-900 text-white"
                              disabled={
                                !product.stock || product.stock.length === 0
                              }
                            >
                              Add To Cart
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm text-red-500 mt-2 mb-4 font-semibold">
                            Out of Stock
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <ProductDetailsModal
        open={open}
        onClose={handleCloseDetails}
        productDetails={productDetails}
        isLoading={isProductDetailsLoading}
        selectedIndex={modalSelectedSkuIndex}
        onSkuChange={handleModalSkuChange}
      />
    </div>
  );
};

export default ProductStore;

// /////////
// import { useState, useEffect } from "react"; // Added useEffect
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
// import {
//   useGetAllProductsQuery,
//   useGetProductByIdQuery,
// } from "@/redux/api/ecommerce/productApi";

// import { Product, CartItem, Stock } from "@/types/ProductType"; // Assuming Stock is also in ProductType
// import { setSelectId } from "@/redux/slice/productSlice";

// const ProductLists = () => {
//   const dispatch = useDispatch();
//   const id = useSelector((state: RootState) => state.product.selectId);
//   const cartItems = useSelector(
//     (state: RootState) => state.cart.items as CartItem[]
//   );

//   const { data: products, isLoading: isProductsLoading } =
//     useGetAllProductsQuery();
//   const { data: productDetails, isLoading: isProductDetailsLoading } =
//     useGetProductByIdQuery(id!, { skip: !id });

//   // State for selected SKUs in the main product list
//   const [selectedSkus, setSelectedSkus] = useState<{ [key: number]: number }>(
//     {}
//   );
//   // State for modal visibility
//   const [open, setOpen] = useState<boolean>(false);
//   // State for the selected SKU index *within the modal*
//   const [modalSelectedSkuIndex, setModalSelectedSkuIndex] = useState<number>(0);

//   // Effect to reset modal SKU selection when productDetails changes and modal is open
//   useEffect(() => {
//     if (
//       open &&
//       productDetails &&
//       productDetails.stock &&
//       productDetails.stock.length > 0
//     ) {
//       setModalSelectedSkuIndex(0); // Reset to the first variant
//     }
//   }, [productDetails, open]);

//   const handleChange = (
//     productId: number,
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const selectedIndex = Number(event.target.value);
//     setSelectedSkus((prev) => ({ ...prev, [productId]: selectedIndex }));
//     // console.log for main list remains the same
//   };

//   const handleAddToCart = (product: Product) => {
//     const selectedIndex = selectedSkus[product.id] ?? 0;
//     if (product.stock.length > 0) {
//       const stockItem = product.stock[selectedIndex];
//       dispatch(
//         addToCart({
//           productId: product.id,
//           title: product.name,
//           price: stockItem.price,
//           size: stockItem.size,
//           sku: stockItem.sku,
//           category: product.category.name,
//         })
//       );
//     } else {
//       console.warn("No stock available for product:", product.name);
//     }
//   };

//   const handleRemoveFromCart = (productId: number, sku: string) => {
//     dispatch(removeFromCart({ productId, sku }));
//   };

//   const handleProductDetails = (productIdToDetail: number) => {
//     dispatch(setSelectId(productIdToDetail));
//     // If you want the modal to always open/refresh to the new product:
//     // setOpen(true);
//     // If you want to maintain the toggle behavior:
//     setOpen((prev) => !prev);
//     // Resetting SKU index is now handled by useEffect when productDetails changes
//   };

//   const handleCloseDetails = () => {
//     setOpen(false);
//   };

//   // Handler for SKU change within the modal
//   const handleModalSkuChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setModalSelectedSkuIndex(Number(event.target.value));
//   };

//   // Handler for "Add to Cart" from the modal
//   const handleAddToCartFromModal = () => {
//     if (
//       !productDetails ||
//       !productDetails.stock ||
//       productDetails.stock.length === 0
//     ) {
//       console.warn("Product details or stock not available.");
//       return;
//     }
//     const selectedStockItem = productDetails.stock[modalSelectedSkuIndex];
//     if (selectedStockItem) {
//       dispatch(
//         addToCart({
//           productId: productDetails.id,
//           title: productDetails.name,
//           price: selectedStockItem.price,
//           size: selectedStockItem.size,
//           sku: selectedStockItem.sku,
//           category: productDetails.category.name, // Ensure category is part of Product type
//         })
//       );
//       // Optionally close the modal after adding to cart
//       // setOpen(false);
//     } else {
//       console.warn("Selected stock item not found.");
//     }
//   };

//   return (
//     <div className="p-2 min-h-screen relative">
//       {" "}
//       {/* Added relative for modal positioning context */}
//       {/* Product Details Modal */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={handleCloseDetails} // Click on overlay closes the modal
//         >
//           <div
//             className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
//           >
//             {isProductDetailsLoading ? (
//               <p className="text-center text-lg">Loading Product Details...</p>
//             ) : productDetails ? (
//               <div>
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//                     {productDetails.name}
//                   </h2>
//                   <button
//                     onClick={handleCloseDetails}
//                     className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                     aria-label="Close product details"
//                   >
//                     &times;
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <img
//                       src={productDetails.imageUrl}
//                       alt={productDetails.name}
//                       className="w-full h-auto object-contain rounded-md mb-4 border dark:border-slate-700"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-gray-700 dark:text-gray-300 mb-4">
//                       {productDetails.description}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                       Category: {productDetails.category.name}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                       Added:{" "}
//                       {new Date(productDetails.createdAt).toLocaleDateString()}
//                     </p>

//                     {/* SKU Selection for Modal */}
//                     {productDetails.stock && productDetails.stock.length > 0 ? (
//                       <div className="mb-4">
//                         <label
//                           htmlFor="modal-sku-select"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
//                         >
//                           Select Variant:
//                         </label>
//                         <select
//                           id="modal-sku-select"
//                           name="modal-sku"
//                           value={modalSelectedSkuIndex}
//                           onChange={handleModalSkuChange}
//                           className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
//                         >
//                           {productDetails.stock.map((stockItem, index) => (
//                             <option key={stockItem.sku || index} value={index}>
//                               {stockItem.size || "Default"} - $
//                               {stockItem.price.toFixed(2)} (SKU: {stockItem.sku}
//                               )
//                             </option>
//                           ))}
//                         </select>
//                         {/* Display price of selected variant in modal */}
//                         <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
//                           Price: $
//                           {productDetails.stock[
//                             modalSelectedSkuIndex
//                           ]?.price.toFixed(2)}
//                         </p>
//                       </div>
//                     ) : (
//                       <p className="text-sm text-red-500 dark:text-red-400 font-semibold mb-4">
//                         Out of Stock
//                       </p>
//                     )}

//                     {/* Add to Cart Button in Modal */}
//                     <button
//                       onClick={handleAddToCartFromModal}
//                       className="w-full p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
//                       disabled={
//                         !productDetails.stock ||
//                         productDetails.stock.length === 0
//                       }
//                     >
//                       Add To Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-center text-lg">Product details not found.</p>
//             )}
//           </div>
//         </div>
//       )}
//       {/* Products Section (remains largely the same as your last version) */}
//       <section className="mb-10">
//         <h2 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-white">
//           Products
//         </h2>
//         {isProductsLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-xl text-slate-600 dark:text-slate-400">
//               Loading Products...
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products?.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-xl"
//               >
//                 <div
//                   onClick={() => handleProductDetails(product.id)}
//                   className="p-4 cursor-pointer flex-grow"
//                 >
//                   <div className="w-full h-56 mb-4 rounded-md flex items-center justify-center overflow-hidden">
//                     <img
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                   </div>
//                   <h3
//                     className="text-xl font-semibold text-slate-900 dark:text-white mb-1 truncate"
//                     title={product.name}
//                   >
//                     {product.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden">
//                     {product.description}
//                   </p>

//                   {product.stock && product.stock.length > 0 ? (
//                     <p className="text-lg font-bold text-green-600 dark:text-green-400">
//                       $
//                       {product.stock[
//                         selectedSkus[product.id] ?? 0
//                       ].price.toFixed(2)}
//                     </p>
//                   ) : (
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Price not available
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     {product.category.name}
//                   </p>

//                   {/* SKU selection for product card - simplified if details are in modal */}
//                   {product.stock &&
//                     product.stock.length > 0 &&
//                     product.stock.length > 1 && (
//                       <div className="mt-2">
//                         <label
//                           htmlFor={`sku-select-card-${product.id}`}
//                           className="text-xs font-medium text-gray-700 dark:text-gray-200 sr-only" // Screen reader only if visual cue is price change
//                         >
//                           Select Variant for {product.name}:
//                         </label>
//                         <select
//                           id={`sku-select-card-${product.id}`}
//                           name="sku-card"
//                           value={selectedSkus[product.id] ?? 0}
//                           onChange={(e) => {
//                             e.stopPropagation(); // Prevent modal from opening
//                             handleChange(product.id, e);
//                           }}
//                           onClick={(e) => e.stopPropagation()} // Prevent modal from opening
//                           className="w-full p-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 dark:text-white"
//                         >
//                           {product.stock.map((stockItem, index) => (
//                             <option key={stockItem.sku || index} value={index}>
//                               {stockItem.size || "Variant"} ($
//                               {stockItem.price.toFixed(2)})
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}
//                   {product.stock && product.stock.length === 0 && (
//                     <p className="text-xs text-red-500 dark:text-red-400 mt-2 font-semibold">
//                       Out of Stock
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent modal from opening
//                     handleAddToCart(product);
//                   }}
//                   className="w-full p-3 bg-slate-700 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-semibold transition-colors focus:outline-none"
//                   disabled={!product.stock || product.stock.length === 0}
//                 >
//                   Add To Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//       {/* Shopping Cart Section (remains largely the same) */}
//       <section className="mt-10">
//         <h2 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-white">
//           Shopping Cart
//         </h2>
//         <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6">
//           {cartItems && cartItems.length > 0 ? (
//             <ul className="space-y-4">
//               {cartItems.map((item) => (
//                 <li
//                   key={`${item.productId}-${item.sku}`} // Unique key for cart items
//                   className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
//                 >
//                   <div className="flex-grow">
//                     <h4 className="text-lg font-medium text-slate-900 dark:text-white">
//                       {item.title}
//                     </h4>
//                     {/* ... other cart item details ... */}
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Category: {item.category}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Price: ${item.price.toFixed(2)}
//                     </p>
//                     <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
//                       <p>Size: {item.size}</p>
//                       <p>SKU: {item.sku}</p>
//                       <p>
//                         Quantity:{" "}
//                         <span className="font-semibold">{item.quantity}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-lg font-semibold text-slate-900 dark:text-white sm:text-right">
//                     Subtotal: ${(item.price * item.quantity).toFixed(2)}
//                   </div>
//                   <button
//                     onClick={() =>
//                       handleRemoveFromCart(item.productId, item.sku)
//                     }
//                     className="mt-2 sm:mt-0 sm:ml-4 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//               <li className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-700 text-right">
//                 <p className="text-xl font-bold text-slate-900 dark:text-white">
//                   Total: $
//                   {cartItems
//                     .reduce(
//                       (total, item) => total + item.price * item.quantity,
//                       0
//                     )
//                     .toFixed(2)}
//                 </p>
//               </li>
//             </ul>
//           ) : (
//             <p className="italic text-gray-600 dark:text-gray-400">
//               Your cart is empty. Start shopping!
//             </p>
//           )}
//         </div>
//       </section>
//       <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
//         <p>
//           © {new Date().getFullYear()} Ecommerce Store. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default ProductLists;
// ////.////
