import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/api/ecommerce/productApi";

import { Product, CartItem } from "@/types/ProductType";
import { setSelectId } from "@/redux/slice/productSlice";

const ProductLists = () => {
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.product.selectId);
  // console.log(id, "by porduct");

  const cartItems = useSelector(
    (state: RootState) => state.cart.items as CartItem[]
  );

  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery();

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useGetProductByIdQuery(id!, { skip: !id });
  // console.log(productDetails, "check by id info");

  // State to track selected SKU index for each product
  const [selectedSkus, setSelectedSkus] = useState<{ [key: number]: number }>(
    {}
  );

  const [open, setOpen] = useState<boolean>(false);

  // if (isProductDetailsLoading) return <p>Product Details Loading</p>;

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

    // Get the selected stock index for this product (default to 0 if not selected)
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

  // new route for cart section
  const handleRemoveFromCart = (productId: number, sku: string) => {
    console.log("Removing product with ID:", productId, "and ", sku);
    dispatch(removeFromCart({ productId, sku }));
  };

  const handleProductDetails = (priductDetailsId: number) => {
    dispatch(setSelectId(priductDetailsId));
    // setOpen(true);
    setOpen((prev) => !prev);
  };

  // const handleCloseDetails = () => {
  //   setOpen(false);
  // };

  return (
    <div className="p-6 font-sans min-h-screen">
      {/* <button
        // onClick={() => setOpen((prev) => !prev)}
        className="bg-green-500 hover:bg-amber-300 p-2 m-1"
      >
        Chek OPen or Not
      </button> */}
      {/* <button
        onClick={() => handleProductDetails()}
        // onClick={() => dispatch(setSelectId(2))}
        className="bg-green-500 hover:bg-amber-300 p-2 m-1"
      >
        Chek OPen or Not
      </button> */}

      <div>
        {open ? (
          <div className="bg-green-500 absolute left-10 z-5">
            {isProductDetailsLoading ? (
              <> Product Details Loading</>
            ) : (
              <div>
                <button
                  // onClick={handleCloseDetails}
                  onClick={() => setOpen(false)}
                  className="p-2 m-1 bg-red-500"
                >
                  Close Here
                </button>
                <h1>heaker</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  mollitia ipsam delectus totam, maiores in cum officia minima a
                  velit iure. Dolor alias quo deserunt pariatur expedita ex quam
                  fuga.
                </p>
                <p>{productDetails?.name}</p>
                <p>{productDetails?.description}</p>
                <p>{productDetails?.createdAt}</p>
                <img src={productDetails?.imageUrl} alt="details" />
                <input
                  type="text"
                  placeholder="type here"
                  className="p-2 m-1 border"
                />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

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
                  className="bg-blue-900 p-2 m-1"
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
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold
                  hover:bg-blue-900 dark:hover:bg-blue-900 dark:hover:text-white transition-colors focus:outline-none
                  focus:ring-2 focus:ring-green-500"
                  disabled={!product.stock || product.stock.length === 0}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Shopping Cart Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
        <div className="backdrop-blur-sm rounded-lg shadow-xl p-6">
          {cartItems && cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                >
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-sm">Category: {item.category}</p>
                    <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
                    <div className="flex space-x-8">
                      <p className="text-sm">Size: {item.size}</p>
                      <p className="text-sm">SKU: {item.sku}</p>
                      <p className="text-sm">
                        Quantity:{" "}
                        <span className="font-semibold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold sm:text-right">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() =>
                      handleRemoveFromCart(item.productId, item.sku)
                    }
                    className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remove
                  </button>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t border-gray-300 text-right">
                <p className="text-xl font-bold">
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
            <p className="italic">Your cart is empty. Start shopping!</p>
          )}
        </div>
      </section>

      <footer className="mt-12 text-center text-sm">
        <p>
          © {new Date().getFullYear()} Ecommerce Store Developed by Than Htike
          Zaw & Htoo Myat Nyi Nyi. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProductLists;
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
// import {
//   useGetAllProductsQuery,
//   useGetProductByIdQuery,
// } from "@/redux/api/ecommerce/productApi";

// import { Product, CartItem } from "@/types/ProductType";
// import { setSelectId } from "@/redux/slice/productSlice";

// const ProductLists = () => {
//   const dispatch = useDispatch();

//   const id = useSelector((state: RootState) => state.product.selectId);
//   // console.log(id, "by porduct");

//   const cartItems = useSelector(
//     (state: RootState) => state.cart.items as CartItem[]
//   );

//   const { data: products, isLoading: isProductsLoading } =
//     useGetAllProductsQuery();

//   const { data: productDetails, isLoading: isProductDetailsLoading } =
//     useGetProductByIdQuery(id!, { skip: !id });
//   // console.log(productDetails, "check by id info");

//   // State to track selected SKU index for each product
//   const [selectedSkus, setSelectedSkus] = useState<{ [key: number]: number }>(
//     {}
//   );

//   const [open, setOpen] = useState<boolean>(false);

//   // if (isProductDetailsLoading) return <p>Product Details Loading</p>;

//   const handleChange = (
//     productId: number,
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const selectedIndex = Number(event.target.value);
//     setSelectedSkus((prev) => ({ ...prev, [productId]: selectedIndex }));

//     const product = products?.find((p) => p.id === productId);
//     if (product) {
//       const selectedStockItem = product.stock[selectedIndex];
//       // check info
//       console.log("Selected SKU:", selectedStockItem.sku);
//       console.log("Selected Stock Item:", selectedStockItem);
//     }
//   };

//   const handleAddToCart = (product: Product) => {
//     console.log("Adding product to cart:", product);

//     // Get the selected stock index for this product (default to 0 if not selected)
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

//   // new route for cart section
//   const handleRemoveFromCart = (productId: number, sku: string) => {
//     console.log("Removing product with ID:", productId, "and ", sku);
//     dispatch(removeFromCart({ productId, sku }));
//   };

//   const handleProductDetails = (priductDetailsId: number) => {
//     dispatch(setSelectId(priductDetailsId));
//     setOpen(true);
//     // setOpen((prev) => !prev);
//   };

//   const handleCloseDetails = () => {
//     setOpen(false);
//   };
//   return (
//     <div className="p-6 font-sans min-h-screen relative">
//       {" "}
//       {/* Added relative for potential absolute positioning of modal */}
//       {/* Product Details Modal/Dropdown Section */}
//       {open && ( // Only render this section if 'open' is true
//         <div
//           // Basic Modal Styling:
//           // You'll want to enhance this for a better modal experience
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={handleCloseDetails} // Close when clicking the overlay (optional)
//         >
//           <div
//             className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
//           >
//             {isProductDetailsLoading ? (
//               <p>Loading product details...</p>
//             ) : productDetails ? (
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-2xl font-bold">{productDetails.name}</h2>
//                   <button
//                     onClick={handleCloseDetails}
//                     className="text-gray-500 hover:text-gray-700 text-2xl"
//                   >
//                     &times; {/* A simple 'X' close button */}
//                   </button>
//                 </div>
//                 <img
//                   src={productDetails.imageUrl}
//                   alt={productDetails.name}
//                   className="w-full h-64 object-contain rounded-md mb-4"
//                 />
//                 <p className="text-gray-700 mb-2">
//                   {productDetails.description}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Category: {productDetails.category.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Date Added:{" "}
//                   {new Date(productDetails.createdAt).toLocaleDateString()}
//                 </p>
//                 {/* You can add more details like price, stock variants for the detail view if needed */}
//                 {/* Example: Displaying stock details if available */}
//                 {productDetails.stock && productDetails.stock.length > 0 && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold">Available Variants:</h4>
//                     <ul className="list-disc pl-5">
//                       {productDetails.stock.map((stockItem) => (
//                         <li key={stockItem.sku} className="text-sm">
//                           SKU: {stockItem.sku}, Size: {stockItem.size}, Price: $
//                           {stockItem.price.toFixed(2)}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 <input
//                   type="text"
//                   placeholder="This is just a placeholder"
//                   className="p-2 m-1 border mt-4 w-full"
//                 />
//               </div>
//             ) : (
//               <p>Product details not found.</p> // Handle case where details are not found
//             )}
//           </div>
//         </div>
//       )}
//       {/* Products Section */}
//       <section className="mb-10">
//         <h2 className="text-3xl font-semibold mb-6">Products</h2>
//         {isProductsLoading ? (
//           <div className="flex justify-center items-center h-64">
//             {" "}
//             {/* Centered loading */}
//             <p className="text-xl">Loading Products...</p>{" "}
//             {/* Improved loading message */}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {" "}
//             {/* Removed backdrop-blur and shadow for clarity here */}
//             {products?.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
//               >
//                 {/* Make the entire card clickable for details, or keep a specific button */}
//                 <div
//                   onClick={() => handleProductDetails(product.id)} // Or keep your button if preferred
//                   className="cursor-pointer"
//                 >
//                   <div className="p-4">
//                     {" "}
//                     {/* Consistent padding */}
//                     <div className="w-full h-56 mb-4 rounded-md flex items-center justify-center overflow-hidden">
//                       {" "}
//                       {/* Adjusted height */}
//                       <img
//                         src={product.imageUrl}
//                         alt={product.name} // Use product name for alt text
//                         className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//                       />
//                     </div>
//                     <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 truncate">
//                       {" "}
//                       {/* Truncate long names */}
//                       {product.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 h-10 overflow-hidden">
//                       {" "}
//                       {/* Fixed height for description */}
//                       {product.description}
//                     </p>
//                     <div>
//                       {product.stock && product.stock.length > 0 ? (
//                         <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
//                           $
//                           {product.stock[
//                             selectedSkus[product.id] ?? 0
//                           ].price.toFixed(2)}
//                         </p>
//                       ) : (
//                         <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
//                           Price not available
//                         </p>
//                       )}
//                     </div>
//                     <div className="mt-2">
//                       {" "}
//                       {/* Margin top for spacing */}
//                       <div className="flex items-center justify-between mb-3">
//                         <p className="text-sm text-gray-500 dark:text-gray-300">
//                           {product.category.name}
//                         </p>
//                         <img
//                           src={product.category.iconUrl}
//                           alt={`${product.category.name} icon`}
//                           className="h-8 w-8" // Slightly smaller icon
//                         />
//                       </div>
//                       <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded">
//                         {product.stock && product.stock.length > 0 ? (
//                           <div className="mb-2">
//                             {" "}
//                             {/* Adjusted margin */}
//                             <label
//                               htmlFor={`sku-select-${product.id}`}
//                               className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
//                             >
//                               Select Variant:
//                             </label>
//                             <select
//                               id={`sku-select-${product.id}`}
//                               name="sku"
//                               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-600 dark:text-white"
//                               value={selectedSkus[product.id] ?? 0}
//                               onChange={(e) => handleChange(product.id, e)}
//                               onClick={(e) => e.stopPropagation()} // Prevent card click when interacting with select
//                             >
//                               {product.stock.map((stockItem, index) => (
//                                 <option
//                                   key={stockItem.sku || index}
//                                   value={index}
//                                 >
//                                   {stockItem.size} ($
//                                   {stockItem.price.toFixed(2)}){" "}
//                                   {/* Simplified display */}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         ) : (
//                           <p className="text-sm text-red-500 dark:text-red-400 mt-2 mb-2 font-semibold">
//                             Out of Stock
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click if button is inside the clickable area
//                     handleAddToCart(product);
//                   }}
//                   className="w-full p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold
//                    transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
//                   disabled={!product.stock || product.stock.length === 0}
//                 >
//                   Add To Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//       {/* Shopping Cart Section */}
//       <section>
//         <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
//         <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6">
//           {cartItems && cartItems.length > 0 ? (
//             <ul className="space-y-4">
//               {cartItems.map((item) => (
//                 <li
//                   key={`${item.productId}-${item.sku}`} // More unique key for cart items
//                   className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
//                 >
//                   <div className="flex-grow">
//                     <h4 className="text-lg font-medium text-slate-900 dark:text-white">
//                       {item.title}
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Category: {item.category}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Price: ${item.price.toFixed(2)}
//                     </p>
//                     <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
//                       {" "}
//                       {/* Adjusted spacing */}
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
//                     className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
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
//           © {new Date().getFullYear()} Ecommerce Store. Developed by Than Htike
//           Zaw & Htoo Myat Nyi Nyi. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
//   // return (
//   //   <div className="p-6 font-sans min-h-screen">
//   //     {/* <button
//   //       // onClick={() => setOpen((prev) => !prev)}
//   //       className="bg-green-500 hover:bg-amber-300 p-2 m-1"
//   //     >
//   //       Chek OPen or Not
//   //     </button> */}
//   //     {/* <button
//   //       onClick={() => handleProductDetails()}
//   //       // onClick={() => dispatch(setSelectId(2))}
//   //       className="bg-green-500 hover:bg-amber-300 p-2 m-1"
//   //     >
//   //       Chek OPen or Not
//   //     </button> */}

//   //     <div>
//   //       {open ? (
//   //         <div className="bg-green-500 absolute left-10 z-5">
//   //           {isProductDetailsLoading ? (
//   //             <> Product Details Loading</>
//   //           ) : (
//   //             <div>
//   //               <h1>heaker</h1>
//   //               <p>
//   //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
//   //                 mollitia ipsam delectus totam, maiores in cum officia minima a
//   //                 velit iure. Dolor alias quo deserunt pariatur expedita ex quam
//   //                 fuga.
//   //               </p>
//   //               <p>{productDetails?.name}</p>
//   //               <p>{productDetails?.description}</p>
//   //               <p>{productDetails?.createdAt}</p>
//   //               <img src={productDetails?.imageUrl} alt="details" />
//   //               <input
//   //                 type="text"
//   //                 placeholder="type here"
//   //                 className="p-2 m-1 border"
//   //               />
//   //             </div>
//   //           )}
//   //         </div>
//   //       ) : (
//   //         <></>
//   //       )}
//   //     </div>

//   //     {/* Products Section */}
//   //     <section className="mb-10">
//   //       <h2 className="text-3xl font-semibold mb-6">Products</h2>
//   //       {isProductsLoading ? (
//   //         <div className="h-screen bg-amber-500">Loading ... Products</div>
//   //       ) : (
//   //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 backdrop-blur-sm shadow-2xl">
//   //           {products?.map((product) => (
//   //             <div
//   //               key={product.id}
//   //               className="shadow-lg overflow-hidden flex flex-col justify-between"
//   //             >
//   //               <button
//   //                 onClick={() => handleProductDetails(product.id)}
//   //                 className="bg-blue-900 p-2 m-1"
//   //               >
//   //                 <div className="p-2">
//   //                   <div className="w-full h-72 mb-4 rounded-md flex items-center justify-center">
//   //                     <img
//   //                       src={product.imageUrl}
//   //                       alt="product_img"
//   //                       className="h-72 w-full object-cover rounded-md"
//   //                     />
//   //                   </div>
//   //                   <h3 className="text-xl font-semibold backdrop-blur-sm mb-2">
//   //                     {product.name}
//   //                   </h3>
//   //                   <p className="text-sm mb-3">{product.description}</p>

//   //                   {/* Display price of the selected variant */}
//   //                   <div>
//   //                     {product.stock && product.stock.length > 0 ? (
//   //                       <p className="text-lg font-bold text-green-600 mt-2">
//   //                         $
//   //                         {product.stock[
//   //                           selectedSkus[product.id] ?? 0
//   //                         ].price.toFixed(2)}
//   //                       </p>
//   //                     ) : (
//   //                       <p className="text-gray-500 mt-2 text-sm">
//   //                         Price not available for selected variant.
//   //                       </p>
//   //                     )}
//   //                   </div>

//   //                   <div>
//   //                     <div className="flex items-center justify-between mb-3">
//   //                       <p>{product.category.name}</p>
//   //                       <img
//   //                         src={product.category.iconUrl}
//   //                         alt="product icon"
//   //                         className="h-10 w-10"
//   //                       />
//   //                     </div>
//   //                     <div className="backdrop-blur-sm shadow-2xl p-2">
//   //                       {product.stock && product.stock.length > 0 ? (
//   //                         <div className="mb-4">
//   //                           <label
//   //                             htmlFor={`sku-select-${product.id}`}
//   //                             className="block text-sm font-medium mb-1"
//   //                           >
//   //                             Select Variant:
//   //                           </label>
//   //                           <select
//   //                             id={`sku-select-${product.id}`}
//   //                             name="sku"
//   //                             value={selectedSkus[product.id] ?? 0}
//   //                             onChange={(e) => handleChange(product.id, e)}
//   //                           >
//   //                             {product.stock.map((stockItem, index) => (
//   //                               <option
//   //                                 key={stockItem.sku || index}
//   //                                 value={index}
//   //                               >
//   //                                 {stockItem.sku} - {stockItem.size} ($
//   //                                 {stockItem.price.toFixed(2)})
//   //                               </option>
//   //                             ))}
//   //                           </select>
//   //                         </div>
//   //                       ) : (
//   //                         <p className="text-sm text-red-500 mt-2 mb-4 font-semibold">
//   //                           Out of Stock
//   //                         </p>
//   //                       )}
//   //                     </div>
//   //                   </div>
//   //                 </div>
//   //               </button>
//   //               <button
//   //                 onClick={() => handleAddToCart(product)}
//   //                 className="w-full p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold
//   //                 hover:bg-blue-900 dark:hover:bg-blue-900 dark:hover:text-white transition-colors focus:outline-none
//   //                 focus:ring-2 focus:ring-green-500"
//   //                 disabled={!product.stock || product.stock.length === 0}
//   //               >
//   //                 Add To Cart
//   //               </button>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       )}
//   //     </section>

//   //     {/* Shopping Cart Section */}
//   //     <section>
//   //       <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
//   //       <div className="backdrop-blur-sm rounded-lg shadow-xl p-6">
//   //         {cartItems && cartItems.length > 0 ? (
//   //           <ul className="space-y-4">
//   //             {cartItems.map((item) => (
//   //               <li
//   //                 key={item.productId}
//   //                 className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
//   //               >
//   //                 <div className="flex-grow">
//   //                   <h4 className="text-lg font-medium">{item.title}</h4>
//   //                   <p className="text-sm">Category: {item.category}</p>
//   //                   <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
//   //                   <div className="flex space-x-8">
//   //                     <p className="text-sm">Size: {item.size}</p>
//   //                     <p className="text-sm">SKU: {item.sku}</p>
//   //                     <p className="text-sm">
//   //                       Quantity:{" "}
//   //                       <span className="font-semibold">{item.quantity}</span>
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //                 <div className="text-lg font-semibold sm:text-right">
//   //                   Subtotal: ${(item.price * item.quantity).toFixed(2)}
//   //                 </div>
//   //                 <button
//   //                   onClick={() =>
//   //                     handleRemoveFromCart(item.productId, item.sku)
//   //                   }
//   //                   className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
//   //                 >
//   //                   Remove
//   //                 </button>
//   //               </li>
//   //             ))}
//   //             <li className="pt-4 mt-4 border-t border-gray-300 text-right">
//   //               <p className="text-xl font-bold">
//   //                 Total: $
//   //                 {cartItems
//   //                   .reduce(
//   //                     (total, item) => total + item.price * item.quantity,
//   //                     0
//   //                   )
//   //                   .toFixed(2)}
//   //               </p>
//   //             </li>
//   //           </ul>
//   //         ) : (
//   //           <p className="italic">Your cart is empty. Start shopping!</p>
//   //         )}
//   //       </div>
//   //     </section>

//   //     <footer className="mt-12 text-center text-sm">
//   //       <p>
//   //         © {new Date().getFullYear()} Ecommerce Store Developed by Than Htike
//   //         Zaw & Htoo Myat Nyi Nyi. All rights reserved.
//   //       </p>
//   //     </footer>
//   //   </div>
//   // );
// };

// export default ProductLists;
