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
    setOpen(true);
    // setOpen((prev) => !prev);
  };

  const handleCloseDetails = () => {
    setOpen(false);
  };
  return (
    <div className="p-6 font-sans min-h-screen relative">
      {/* Added relative for potential absolute positioning of modal */}
      {/* Product Details Modal/Dropdown Section */}
      {open && ( // Only render this section if 'open' is true
        <div
          // Basic Modal Styling:
          // You'll want to enhance this for a better modal experience
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseDetails} // Close when clicking the overlay (optional)
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
          >
            {isProductDetailsLoading ? (
              <p>Loading product details...</p>
            ) : productDetails ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{productDetails.name}</h2>
                  <button
                    onClick={handleCloseDetails}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    &times; {/* A simple 'X' close button */}
                  </button>
                </div>
                <img
                  src={productDetails.imageUrl}
                  alt={productDetails.name}
                  className="w-full h-64 object-contain rounded-md mb-4"
                />
                <p className="text-gray-700 mb-2">
                  {productDetails.description}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {productDetails.category.name}
                </p>
                <p className="text-sm text-gray-500">
                  Date Added:{" "}
                  {new Date(productDetails.createdAt).toLocaleDateString()}
                </p>
                {/* You can add more details like price, stock variants for the detail view if needed */}
                {/* Example: Displaying stock details if available */}
                {productDetails.stock && productDetails.stock.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Available Variants:</h4>
                    <ul className="list-disc pl-5">
                      {productDetails.stock.map((stockItem) => (
                        <li key={stockItem.sku} className="text-sm">
                          SKU: {stockItem.sku}, Size: {stockItem.size}, Price: $
                          {stockItem.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="This is just a placeholder"
                  className="p-2 m-1 border mt-4 w-full"
                />
              </div>
            ) : (
              <p>Product details not found.</p> // Handle case where details are not found
            )}
          </div>
        </div>
      )}
      {/* Products Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-6">Products</h2>
        {isProductsLoading ? (
          <div className="flex justify-center items-center h-64">
            {" "}
            {/* Centered loading */}
            <p className="text-xl">Loading Products...</p>{" "}
            {/* Improved loading message */}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {" "}
            {/* Removed backdrop-blur and shadow for clarity here */}
            {products?.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
              >
                {/* Make the entire card clickable for details, or keep a specific button */}
                <div
                  onClick={() => handleProductDetails(product.id)} // Or keep your button if preferred
                  className="cursor-pointer"
                >
                  <div className="p-4">
                    {" "}
                    {/* Consistent padding */}
                    <div className="w-full h-56 mb-4 rounded-md flex items-center justify-center overflow-hidden">
                      {" "}
                      {/* Adjusted height */}
                      <img
                        src={product.imageUrl}
                        alt={product.name} // Use product name for alt text
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 truncate">
                      {" "}
                      {/* Truncate long names */}
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 h-10 overflow-hidden">
                      {" "}
                      {/* Fixed height for description */}
                      {product.description}
                    </p>
                    <div>
                      {product.stock && product.stock.length > 0 ? (
                        <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
                          $
                          {product.stock[
                            selectedSkus[product.id] ?? 0
                          ].price.toFixed(2)}
                        </p>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                          Price not available
                        </p>
                      )}
                    </div>
                    <div className="mt-2">
                      {" "}
                      {/* Margin top for spacing */}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {product.category.name}
                        </p>
                        <img
                          src={product.category.iconUrl}
                          alt={`${product.category.name} icon`}
                          className="h-8 w-8" // Slightly smaller icon
                        />
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded">
                        {product.stock && product.stock.length > 0 ? (
                          <div className="mb-2">
                            {" "}
                            {/* Adjusted margin */}
                            <label
                              htmlFor={`sku-select-${product.id}`}
                              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                            >
                              Select Variant:
                            </label>
                            <select
                              id={`sku-select-${product.id}`}
                              name="sku"
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-600 dark:text-white"
                              value={selectedSkus[product.id] ?? 0}
                              onChange={(e) => handleChange(product.id, e)}
                              onClick={(e) => e.stopPropagation()} // Prevent card click when interacting with select
                            >
                              {product.stock.map((stockItem, index) => (
                                <option
                                  key={stockItem.sku || index}
                                  value={index}
                                >
                                  {stockItem.size} ($
                                  {stockItem.price.toFixed(2)}){" "}
                                  {/* Simplified display */}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <p className="text-sm text-red-500 dark:text-red-400 mt-2 mb-2 font-semibold">
                            Out of Stock
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click if button is inside the clickable area
                    handleAddToCart(product);
                  }}
                  className="w-full p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold
                   transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
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
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6">
          {cartItems && cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={`${item.productId}-${item.sku}`} // More unique key for cart items
                  className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                >
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Category: {item.category}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      {" "}
                      {/* Adjusted spacing */}
                      <p>Size: {item.size}</p>
                      <p>SKU: {item.sku}</p>
                      <p>
                        Quantity:{" "}
                        <span className="font-semibold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white sm:text-right">
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
              <li className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-700 text-right">
                <p className="text-xl font-bold text-slate-900 dark:text-white">
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
            <p className="italic text-gray-600 dark:text-gray-400">
              Your cart is empty. Start shopping!
            </p>
          )}
        </div>
      </section>
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} Ecommerce Store. Developed by Than Htike
          Zaw & Htoo Myat Nyi Nyi. All rights reserved.
        </p>
      </footer>
    </div>
  );
  // return (
  //   <div className="p-6 font-sans min-h-screen">
  //     {/* <button
  //       // onClick={() => setOpen((prev) => !prev)}
  //       className="bg-green-500 hover:bg-amber-300 p-2 m-1"
  //     >
  //       Chek OPen or Not
  //     </button> */}
  //     {/* <button
  //       onClick={() => handleProductDetails()}
  //       // onClick={() => dispatch(setSelectId(2))}
  //       className="bg-green-500 hover:bg-amber-300 p-2 m-1"
  //     >
  //       Chek OPen or Not
  //     </button> */}

  //     <div>
  //       {open ? (
  //         <div className="bg-green-500 absolute left-10 z-5">
  //           {isProductDetailsLoading ? (
  //             <> Product Details Loading</>
  //           ) : (
  //             <div>
  //               <h1>heaker</h1>
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
  //                 mollitia ipsam delectus totam, maiores in cum officia minima a
  //                 velit iure. Dolor alias quo deserunt pariatur expedita ex quam
  //                 fuga.
  //               </p>
  //               <p>{productDetails?.name}</p>
  //               <p>{productDetails?.description}</p>
  //               <p>{productDetails?.createdAt}</p>
  //               <img src={productDetails?.imageUrl} alt="details" />
  //               <input
  //                 type="text"
  //                 placeholder="type here"
  //                 className="p-2 m-1 border"
  //               />
  //             </div>
  //           )}
  //         </div>
  //       ) : (
  //         <></>
  //       )}
  //     </div>

  //     {/* Products Section */}
  //     <section className="mb-10">
  //       <h2 className="text-3xl font-semibold mb-6">Products</h2>
  //       {isProductsLoading ? (
  //         <div className="h-screen bg-amber-500">Loading ... Products</div>
  //       ) : (
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 backdrop-blur-sm shadow-2xl">
  //           {products?.map((product) => (
  //             <div
  //               key={product.id}
  //               className="shadow-lg overflow-hidden flex flex-col justify-between"
  //             >
  //               <button
  //                 onClick={() => handleProductDetails(product.id)}
  //                 className="bg-blue-900 p-2 m-1"
  //               >
  //                 <div className="p-2">
  //                   <div className="w-full h-72 mb-4 rounded-md flex items-center justify-center">
  //                     <img
  //                       src={product.imageUrl}
  //                       alt="product_img"
  //                       className="h-72 w-full object-cover rounded-md"
  //                     />
  //                   </div>
  //                   <h3 className="text-xl font-semibold backdrop-blur-sm mb-2">
  //                     {product.name}
  //                   </h3>
  //                   <p className="text-sm mb-3">{product.description}</p>

  //                   {/* Display price of the selected variant */}
  //                   <div>
  //                     {product.stock && product.stock.length > 0 ? (
  //                       <p className="text-lg font-bold text-green-600 mt-2">
  //                         $
  //                         {product.stock[
  //                           selectedSkus[product.id] ?? 0
  //                         ].price.toFixed(2)}
  //                       </p>
  //                     ) : (
  //                       <p className="text-gray-500 mt-2 text-sm">
  //                         Price not available for selected variant.
  //                       </p>
  //                     )}
  //                   </div>

  //                   <div>
  //                     <div className="flex items-center justify-between mb-3">
  //                       <p>{product.category.name}</p>
  //                       <img
  //                         src={product.category.iconUrl}
  //                         alt="product icon"
  //                         className="h-10 w-10"
  //                       />
  //                     </div>
  //                     <div className="backdrop-blur-sm shadow-2xl p-2">
  //                       {product.stock && product.stock.length > 0 ? (
  //                         <div className="mb-4">
  //                           <label
  //                             htmlFor={`sku-select-${product.id}`}
  //                             className="block text-sm font-medium mb-1"
  //                           >
  //                             Select Variant:
  //                           </label>
  //                           <select
  //                             id={`sku-select-${product.id}`}
  //                             name="sku"
  //                             value={selectedSkus[product.id] ?? 0}
  //                             onChange={(e) => handleChange(product.id, e)}
  //                           >
  //                             {product.stock.map((stockItem, index) => (
  //                               <option
  //                                 key={stockItem.sku || index}
  //                                 value={index}
  //                               >
  //                                 {stockItem.sku} - {stockItem.size} ($
  //                                 {stockItem.price.toFixed(2)})
  //                               </option>
  //                             ))}
  //                           </select>
  //                         </div>
  //                       ) : (
  //                         <p className="text-sm text-red-500 mt-2 mb-4 font-semibold">
  //                           Out of Stock
  //                         </p>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </button>
  //               <button
  //                 onClick={() => handleAddToCart(product)}
  //                 className="w-full p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold
  //                 hover:bg-blue-900 dark:hover:bg-blue-900 dark:hover:text-white transition-colors focus:outline-none
  //                 focus:ring-2 focus:ring-green-500"
  //                 disabled={!product.stock || product.stock.length === 0}
  //               >
  //                 Add To Cart
  //               </button>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </section>

  //     {/* Shopping Cart Section */}
  //     <section>
  //       <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
  //       <div className="backdrop-blur-sm rounded-lg shadow-xl p-6">
  //         {cartItems && cartItems.length > 0 ? (
  //           <ul className="space-y-4">
  //             {cartItems.map((item) => (
  //               <li
  //                 key={item.productId}
  //                 className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
  //               >
  //                 <div className="flex-grow">
  //                   <h4 className="text-lg font-medium">{item.title}</h4>
  //                   <p className="text-sm">Category: {item.category}</p>
  //                   <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
  //                   <div className="flex space-x-8">
  //                     <p className="text-sm">Size: {item.size}</p>
  //                     <p className="text-sm">SKU: {item.sku}</p>
  //                     <p className="text-sm">
  //                       Quantity:{" "}
  //                       <span className="font-semibold">{item.quantity}</span>
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div className="text-lg font-semibold sm:text-right">
  //                   Subtotal: ${(item.price * item.quantity).toFixed(2)}
  //                 </div>
  //                 <button
  //                   onClick={() =>
  //                     handleRemoveFromCart(item.productId, item.sku)
  //                   }
  //                   className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
  //                 >
  //                   Remove
  //                 </button>
  //               </li>
  //             ))}
  //             <li className="pt-4 mt-4 border-t border-gray-300 text-right">
  //               <p className="text-xl font-bold">
  //                 Total: $
  //                 {cartItems
  //                   .reduce(
  //                     (total, item) => total + item.price * item.quantity,
  //                     0
  //                   )
  //                   .toFixed(2)}
  //               </p>
  //             </li>
  //           </ul>
  //         ) : (
  //           <p className="italic">Your cart is empty. Start shopping!</p>
  //         )}
  //       </div>
  //     </section>

  //     <footer className="mt-12 text-center text-sm">
  //       <p>
  //         © {new Date().getFullYear()} Ecommerce Store Developed by Than Htike
  //         Zaw & Htoo Myat Nyi Nyi. All rights reserved.
  //       </p>
  //     </footer>
  //   </div>
  // );
};

// // ... other imports ...
// // import { setSelectId } from "@/redux/slice/productSlice"; // Already there

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

//   const [open, setOpen] = useState<boolean>(false);
//   const [selectedSkus, setSelectedSkus] = useState<{ [key: number]: number }>(
//     {}
//   );

//   // ... (handleChange, handleAddToCart, handleRemoveFromCart remain the same) ...

//   const handleChange = (
//     productId: number,
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const selectedIndex = Number(event.target.value);
//     setSelectedSkus((prev) => ({ ...prev, [productId]: selectedIndex }));

//     const product = products?.find((p) => p.id === productId);
//     if (product) {
//       const selectedStockItem = product.stock[selectedIndex];
//       console.log("Selected SKU:", selectedStockItem.sku);
//       console.log("Selected Stock Item:", selectedStockItem);
//     }
//   };

//   const handleAddToCart = (product: Product) => {
//     console.log("Adding product to cart:", product);
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
//     console.log("Removing product with ID:", productId, "and ", sku);
//     dispatch(removeFromCart({ productId, sku }));
//   };

//   // MODIFIED: This function will now always open the details view
//   // and set the selected product's ID.
//   const handleProductDetails = (priductDetailsId: number) => {
//     dispatch(setSelectId(priductDetailsId)); // Set the ID in Redux
//     setOpen(true); // Always set open to true to show the details
//   };

//   // NEW: Function to close the product details view.
//   const handleCloseDetails = () => {
//     setOpen(false);
//     // Optional: You might want to clear the selectedId in Redux when closing
//     // dispatch(setSelectId(null)); // or some other initial/default value
//   };

//   // Conditional rendering for the details loading message
//   // Moved this to avoid early return if 'open' is false
//   // if (isProductDetailsLoading && open) return <p>Product Details Loading</p>;

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
// };

// export default ProductLists;
// // // deepseek vertsion this one much more functioning
// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { RootState } from "@/redux/store";
// // import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
// // import {
// //   useGetAllProductsQuery,
// //   useGetProductByIdQuery,
// // } from "@/redux/api/ecommerce/productApi";
// // import { Product, CartItem } from "@/types/ProductType";
// // import { setSelectId } from "@/redux/slice/productSlice";

// // const ProductLists = () => {
// //   const dispatch = useDispatch();
// //   const id = useSelector((state: RootState) => state.product.selectId);
// //   const cartItems = useSelector(
// //     (state: RootState) => state.cart.items as CartItem[]
// //   );

// //   // Data fetching
// //   const { data: products, isLoading: isProductsLoading } =
// //     useGetAllProductsQuery();
// //   const { data: productDetails, isLoading: isProductDetailsLoading } =
// //     useGetProductByIdQuery(id!, { skip: !id });

// //   // UI state
// //   const [open, setOpen] = useState<boolean>(false);
// //   const [selectedSkus, setSelectedSkus] = useState<{ [key: number]: number }>(
// //     {}
// //   );

// //   // Handlers
// //   const handleChange = (
// //     productId: number,
// //     event: React.ChangeEvent<HTMLSelectElement>
// //   ) => {
// //     const selectedIndex = Number(event.target.value);
// //     setSelectedSkus((prev) => ({ ...prev, [productId]: selectedIndex }));
// //   };

// //   const handleAddToCart = (product: Product) => {
// //     const selectedIndex = selectedSkus[product.id] ?? 0;
// //     if (product.stock.length > 0) {
// //       const stockItem = product.stock[selectedIndex];
// //       dispatch(
// //         addToCart({
// //           productId: product.id,
// //           title: product.name,
// //           price: stockItem.price,
// //           size: stockItem.size,
// //           sku: stockItem.sku,
// //           category: product.category.name,
// //         })
// //       );
// //     }
// //   };

// //   const handleRemoveFromCart = (productId: number, sku: string) => {
// //     dispatch(removeFromCart({ productId, sku }));
// //   };

// //   const handleProductDetails = (productId: number) => {
// //     dispatch(setSelectId(productId));
// //     setOpen(true);
// //   };

// //   if (isProductsLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8 font-sans min-h-screen">
// //       {/* Product Details Modal */}
// //       {open && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="p-6">
// //               <div className="flex justify-between items-start mb-4">
// //                 <h2 className="text-2xl font-bold">{productDetails?.name}</h2>
// //                 <button
// //                   onClick={() => setOpen(false)}
// //                   className="text-gray-500 hover:text-gray-700"
// //                 >
// //                   ✕
// //                 </button>
// //               </div>

// //               <div className="grid md:grid-cols-2 gap-6">
// //                 <div className="bg-gray-100 rounded-lg overflow-hidden">
// //                   <img
// //                     src={productDetails?.imageUrl}
// //                     alt={productDetails?.name}
// //                     className="w-full h-64 object-cover"
// //                   />
// //                 </div>

// //                 <div>
// //                   <p className="text-gray-700 mb-4">
// //                     {productDetails?.description}
// //                   </p>

// //                   <div className="mb-4">
// //                     <h3 className="font-semibold">Category:</h3>
// //                     <div className="flex items-center mt-1">
// //                       <img
// //                         src={productDetails?.category.iconUrl}
// //                         alt={productDetails?.category.name}
// //                         className="h-6 w-6 mr-2"
// //                       />
// //                       <span>{productDetails?.category.name}</span>
// //                     </div>
// //                   </div>

// //                   <div className="space-y-2">
// //                     {productDetails?.stock.map((stockItem, index) => (
// //                       <div key={index} className="p-3 border rounded-lg">
// //                         <p className="font-medium">Variant #{index + 1}</p>
// //                         <p>SKU: {stockItem.sku}</p>
// //                         <p>Size: {stockItem.size}</p>
// //                         <p className="text-lg font-bold text-green-600">
// //                           ${stockItem.price.toFixed(2)}
// //                         </p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Products Section */}
// //       <section className="mb-12">
// //         <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h2>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //           {products?.map((product) => (
// //             <div
// //               key={product.id}
// //               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
// //             >
// //               <div className="relative">
// //                 <img
// //                   src={product.imageUrl}
// //                   alt={product.name}
// //                   className="w-full h-48 object-cover cursor-pointer"
// //                   onClick={() => handleProductDetails(product.id)}
// //                 />
// //                 <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
// //                   <img
// //                     src={product.category.iconUrl}
// //                     alt={product.category.name}
// //                     className="h-6 w-6"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="p-4">
// //                 <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
// //                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">
// //                   {product.description}
// //                 </p>

// //                 {product.stock && product.stock.length > 0 ? (
// //                   <>
// //                     <div className="mb-3">
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// //                         Variant
// //                       </label>
// //                       <select
// //                         value={selectedSkus[product.id] ?? 0}
// //                         onChange={(e) => handleChange(product.id, e)}
// //                         className="w-full p-2 border rounded-md text-sm"
// //                       >
// //                         {product.stock.map((stockItem, index) => (
// //                           <option key={index} value={index}>
// //                             {stockItem.size} - ${stockItem.price.toFixed(2)}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <button
// //                       onClick={() => handleAddToCart(product)}
// //                       className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
// //                     >
// //                       Add to Cart
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <div className="text-center py-3">
// //                     <p className="text-red-500 font-medium">Out of Stock</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Shopping Cart Section */}
// //       <section className="mb-12">
// //         <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>

// //         <div className="bg-white rounded-lg shadow-md overflow-hidden">
// //           {cartItems.length > 0 ? (
// //             <>
// //               <div className="divide-y divide-gray-200">
// //                 {cartItems.map((item) => (
// //                   <div
// //                     key={`${item.productId}-${item.sku}`}
// //                     className="p-4 flex flex-col sm:flex-row"
// //                   >
// //                     <div className="flex-grow">
// //                       <div className="flex items-start">
// //                         <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
// //                           {/* You might want to add product image here */}
// //                         </div>
// //                         <div className="ml-4">
// //                           <h4 className="text-lg font-medium">{item.title}</h4>
// //                           <p className="text-sm text-gray-500">
// //                             {item.category}
// //                           </p>
// //                           <div className="mt-1 flex space-x-4 text-sm">
// //                             <p>Size: {item.size}</p>
// //                             <p>SKU: {item.sku}</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:items-end">
// //                       <p className="text-lg font-semibold">
// //                         ${item.price.toFixed(2)}
// //                       </p>
// //                       <p className="text-sm text-gray-500">
// //                         Qty: {item.quantity}
// //                       </p>
// //                       <button
// //                         onClick={() =>
// //                           handleRemoveFromCart(item.productId, item.sku)
// //                         }
// //                         className="mt-2 px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
// //                       >
// //                         Remove
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="border-t border-gray-200 p-4 bg-gray-50">
// //                 <div className="flex justify-between items-center">
// //                   <span className="font-medium">Total</span>
// //                   <span className="text-xl font-bold">
// //                     $
// //                     {cartItems
// //                       .reduce(
// //                         (total, item) => total + item.price * item.quantity,
// //                         0
// //                       )
// //                       .toFixed(2)}
// //                   </span>
// //                 </div>
// //                 <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
// //                   Proceed to Checkout
// //                 </button>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="p-8 text-center">
// //               <svg
// //                 className="mx-auto h-12 w-12 text-gray-400"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={1}
// //                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
// //                 />
// //               </svg>
// //               <h3 className="mt-2 text-lg font-medium text-gray-900">
// //                 Your cart is empty
// //               </h3>
// //               <p className="mt-1 text-gray-500">
// //                 Start adding some products to your cart
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       <footer className="mt-12 py-6 border-t border-gray-200 text-center">
// //         <p className="text-gray-600">
// //           © {new Date().getFullYear()} Ecommerce Store. All rights reserved.
// //         </p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default ProductLists;

// // // //grock version
// // // import { useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { RootState } from "@/redux/store";
// // // import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
// // // import {
// // //   useGetAllProductsQuery,
// // //   useGetProductByIdQuery,
// // // } from "@/redux/api/ecommerce/productApi";
// // // import { Product, CartItem } from "@/types/ProductType";
// // // import { setSelectId } from "@/redux/slice/productSlice";

// // // const ProductLists = () => {
// // //   const dispatch = useDispatch();
// // //   const id = useSelector((state: RootState) => state.product.selectId);
// // //   const cartItems = useSelector(
// // //     (state: RootState) => state.cart.items as CartItem[]
// // //   );
// // //   const { data: products, isLoading: isProductsLoading } =
// // //     useGetAllProductsQuery();
// // //   const { data: productDetails, isLoading: isProductDetailsLoading } =
// // //     useGetProductByIdQuery(id!, { skip: !id });

// // //   const [open, setOpen] = useState<boolean>(false);
// // //   const [selectedSkus, setSelectedSkus] = useState<{ [key: number]: number }>(
// // //     {}
// // //   );

// // //   const handleChange = (
// // //     productId: number,
// // //     event: React.ChangeEvent<HTMLSelectElement>
// // //   ) => {
// // //     const selectedIndex = Number(event.target.value);
// // //     setSelectedSkus((prev) => ({ ...prev, [productId]: selectedIndex }));
// // //     const product = products?.find((p) => p.id === productId);
// // //     if (product) {
// // //       const selectedStockItem = product.stock[selectedIndex];
// // //       console.log("Selected SKU:", selectedStockItem.sku);
// // //       console.log("Selected Stock Item:", selectedStockItem);
// // //     }
// // //   };

// // //   const handleAddToCart = (product: Product) => {
// // //     console.log("Adding product to cart:", product);
// // //     const selectedIndex = selectedSkus[product.id] ?? 0;
// // //     if (product.stock.length > 0) {
// // //       const stockItem = product.stock[selectedIndex];
// // //       dispatch(
// // //         addToCart({
// // //           productId: product.id,
// // //           title: product.name,
// // //           price: stockItem.price,
// // //           size: stockItem.size,
// // //           sku: stockItem.sku,
// // //           category: product.category.name,
// // //         })
// // //       );
// // //     } else {
// // //       console.warn("No stock available for product:", product.name);
// // //     }
// // //   };

// // //   const handleRemoveFromCart = (productId: number, sku: string) => {
// // //     console.log("Removing product with ID:", productId, "and ", sku);
// // //     dispatch(removeFromCart({ productId, sku }));
// // //   };

// // //   const handleProductDetails = (productDetailsId: number) => {
// // //     dispatch(setSelectId(productDetailsId));
// // //     setOpen(true);
// // //   };

// // //   const closeModal = () => {
// // //     setOpen(false);
// // //     dispatch(setSelectId(null));
// // //   };

// // //   return (
// // //     <div className="p-6 font-sans min-h-screen bg-gray-100">
// // //       {/* Product Details Modal */}
// // //       {open && productDetails && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// // //           <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full m-4 p-6 relative transform transition-all animate-fadeIn">
// // //             <button
// // //               onClick={closeModal}
// // //               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
// // //               aria-label="Close modal"
// // //             >
// // //               <svg
// // //                 className="w-6 h-6"
// // //                 fill="none"
// // //                 stroke="currentColor"
// // //                 viewBox="0 0 24 24"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth="2"
// // //                   d="M6 18L18 6M6 6l12 12"
// // //                 />
// // //               </svg>
// // //             </button>
// // //             <div className="flex flex-col md:flex-row gap-6">
// // //               <div className="flex-shrink-0">
// // //                 <img
// // //                   src={productDetails.imageUrl}
// // //                   alt={productDetails.name}
// // //                   className="w-full md:w-64 h-64 object-cover rounded-md"
// // //                 />
// // //               </div>
// // //               <div className="flex-1">
// // //                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
// // //                   {productDetails.name}
// // //                 </h2>
// // //                 <p className="text-gray-600 mb-4">
// // //                   {productDetails.description}
// // //                 </p>
// // //                 <p className="text-sm text-gray-500 mb-2">
// // //                   Category: {productDetails.category.name}
// // //                 </p>
// // //                 <p className="text-sm text-gray-500 mb-4">
// // //                   Created:{" "}
// // //                   {new Date(productDetails.createdAt).toLocaleDateString()}
// // //                 </p>
// // //                 {productDetails.stock && productDetails.stock.length > 0 ? (
// // //                   <>
// // //                     <div className="mb-4">
// // //                       <label
// // //                         htmlFor={`sku-select-modal-${productDetails.id}`}
// // //                         className="block text-sm font-medium text-gray-700 mb-1"
// // //                       >
// // //                         Select Variant:
// // //                       </label>
// // //                       <select
// // //                         id={`sku-select-modal-${productDetails.id}`}
// // //                         value={selectedSkus[productDetails.id] ?? 0}
// // //                         onChange={(e) => handleChange(productDetails.id, e)}
// // //                         className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
// // //                       >
// // //                         {productDetails.stock.map((stockItem, index) => (
// // //                           <option key={stockItem.sku || index} value={index}>
// // //                             {stockItem.sku} - {stockItem.size} ($
// // //                             {stockItem.price.toFixed(2)})
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                     <p className="text-lg font-bold text-green-600 mb-4">
// // //                       $
// // //                       {productDetails.stock[
// // //                         selectedSkus[productDetails.id] ?? 0
// // //                       ].price.toFixed(2)}
// // //                     </p>
// // //                     <button
// // //                       onClick={() => handleAddToCart(productDetails)}
// // //                       className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                       disabled={
// // //                         !productDetails.stock ||
// // //                         productDetails.stock.length === 0
// // //                       }
// // //                     >
// // //                       Add to Cart
// // //                     </button>
// // //                   </>
// // //                 ) : (
// // //                   <p className="text-sm text-red-500 mb-4 font-semibold">
// // //                     Out of Stock
// // //                   </p>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Products Section */}
// // //       <section className="mb-10">
// // //         <h2 className="text-3xl font-semibold mb-6 text-gray-800">Products</h2>
// // //         {isProductsLoading ? (
// // //           <div className="h-screen bg-amber-500 flex items-center justify-center text-white text-xl">
// // //             Loading ... Products
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // //             {products?.map((product) => (
// // //               <div
// // //                 key={product.id}
// // //                 className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105"
// // //               >
// // //                 <button
// // //                   onClick={() => handleProductDetails(product.id)}
// // //                   className="flex flex-col flex-1"
// // //                 >
// // //                   <div className="p-4">
// // //                     <div className="w-full h-72 mb-4 rounded-md overflow-hidden">
// // //                       <img
// // //                         src={product.imageUrl}
// // //                         alt={product.name}
// // //                         className="w-full h-full object-cover"
// // //                       />
// // //                     </div>
// // //                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
// // //                       {product.name}
// // //                     </h3>
// // //                     <p className="text-sm text-gray-600 mb-3 line-clamp-2">
// // //                       {product.description}
// // //                     </p>
// // //                     <div className="flex items-center justify-between mb-3">
// // //                       <p className="text-sm text-gray-500">
// // //                         {product.category.name}
// // //                       </p>
// // //                       <img
// // //                         src={product.category.iconUrl}
// // //                         alt="category icon"
// // //                         className="h-8 w-8"
// // //                       />
// // //                     </div>
// // //                     {product.stock && product.stock.length > 0 ? (
// // //                       <p className="text-lg font-bold text-green-600 mb-4">
// // //                         $
// // //                         {product.stock[
// // //                           selectedSkus[product.id] ?? 0
// // //                         ].price.toFixed(2)}
// // //                       </p>
// // //                     ) : (
// // //                       <p className="text-sm text-gray-500 mb-4">
// // //                         Price not available
// // //                       </p>
// // //                     )}
// // //                   </div>
// // //                 </button>
// // //                 {product.stock && product.stock.length > 0 && (
// // //                   <div className="p-4 border-t">
// // //                     <label
// // //                       htmlFor={`sku-select-${product.id}`}
// // //                       className="block text-sm font-medium text-gray-700 mb-1"
// // //                     >
// // //                       Select Variant:
// // //                     </label>
// // //                     <select
// // //                       id={`sku-select-${product.id}`}
// // //                       name="sku"
// // //                       value={selectedSkus[product.id] ?? 0}
// // //                       onChange={(e) => handleChange(product.id, e)}
// // //                       className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
// // //                     >
// // //                       {product.stock.map((stockItem, index) => (
// // //                         <option key={stockItem.sku || index} value={index}>
// // //                           {stockItem.sku} - {stockItem.size} ($
// // //                           {stockItem.price.toFixed(2)})
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                     <button
// // //                       onClick={() => handleAddToCart(product)}
// // //                       className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                       disabled={!product.stock || product.stock.length === 0}
// // //                     >
// // //                       Add to Cart
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </section>

// // //       {/* Shopping Cart Section */}
// // //       <section>
// // //         <h2 className="text-3xl font-semibold mb-6 text-gray-800">
// // //           Shopping Cart
// // //         </h2>
// // //         <div className="bg-white rounded-lg shadow-xl p-6">
// // //           {cartItems && cartItems.length > 0 ? (
// // //             <ul className="space-y-4">
// // //               {cartItems.map((item) => (
// // //                 <li
// // //                   key={`${item.productId}-${item.sku}`}
// // //                   className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
// // //                 >
// // //                   <div className="flex-grow">
// // //                     <h4 className="text-lg font-medium text-gray-800">
// // //                       {item.title}
// // //                     </h4>
// // //                     <p className="text-sm text-gray-600">
// // //                       Category: {item.category}
// // //                     </p>
// // //                     <p className="text-sm text-gray-600">
// // //                       Price: ${item.price.toFixed(2)}
// // //                     </p>
// // //                     <div className="flex space-x-8">
// // //                       <p className="text-sm text-gray-600">Size: {item.size}</p>
// // //                       <p className="text-sm text-gray-600">SKU: {item.sku}</p>
// // //                       <p className="text-sm text-gray-600">
// // //                         Quantity:{" "}
// // //                         <span className="font-semibold">{item.quantity}</span>
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="text-lg font-semibold text-gray-800 sm:text-right">
// // //                     Subtotal: ${(item.price * item.quantity).toFixed(2)}
// // //                   </div>
// // //                   <button
// // //                     onClick={() =>
// // //                       handleRemoveFromCart(item.productId, item.sku)
// // //                     }
// // //                     className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
// // //                   >
// // //                     Remove
// // //                   </button>
// // //                 </li>
// // //               ))}
// // //               <li className="pt-4 mt-4 border-t border-gray-300 text-right">
// // //                 <p className="text-xl font-bold text-gray-800">
// // //                   Total: $
// // //                   {cartItems
// // //                     .reduce(
// // //                       (total, item) => total + item.price * item.quantity,
// // //                       0
// // //                     )
// // //                     .toFixed(2)}
// // //                 </p>
// // //               </li>
// // //             </ul>
// // //           ) : (
// // //             <p className="italic text-gray-600">
// // //               Your cart is empty. Start shopping!
// // //             </p>
// // //           )}
// // //         </div>
// // //       </section>

// // //       <footer className="mt-12 text-center text-sm text-gray-600">
// // //         <p>
// // //           © {new Date().getFullYear()} Ecommerce Store Developed by Than Htike
// // //           Zaw & Htoo Myat Nyi Nyi. All rights reserved.
// // //         </p>
// // //       </footer>

// // //       <style jsx>{`
// // //         @keyframes fadeIn {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateY(10px);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0);
// // //           }
// // //         }
// // //         .animate-fadeIn {
// // //           animation: fadeIn 0.3s ease-out;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default ProductLists;
