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

  const handleCloseDetails = () => {
    setOpen(false);
  };

  return (
    <div className="p-2 min-h-screen relative ">
      <div>
        {open && (
          // <div className="bg-green-500 absolute left-10 z-5">
          <div className="  fixed insert-0 shadow-lg shadow-black/5 backdrop-saturate-200 backdrop-blur-lg z-5">
            {isProductDetailsLoading ? (
              <> Product Details Loading</>
            ) : (
              <div
                onClick={handleCloseDetails}
                className="flex justify-center items-center p-2"
              >
                <div className=" font-bold p-2 overflow-hidden shadow-2xl">
                  <img
                    width={100}
                    height={200}
                    src={productDetails?.imageUrl}
                    alt={productDetails?.name}
                    className="w-200 h-200 object-cover p-2  rounded-lg"
                  />
                  <div className="  backdrop-blur-sm p-2  text-white">
                    {/* <p>{productDetails?.name}</p> */}
                    <p>{productDetails?.description}</p>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2">
                    {/* You can add more details like price, stock variants for the detail view if needed */}
                    {/* Example: Displaying stock details if available */}
                    <p>{productDetails?.name}</p>
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
                  </div>
                  <h1>Also Put Add to cart here too.</h1>
                </div>
              </div>
            )}
          </div>
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
