import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the path to your Redux store file
import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
import { useGetAllProductsQuery } from "@/redux/api/ecommerce/productApi"; // Adjust the path to your product API file

import { Product, CartItem } from "@/types/ProductType";

// // Interface for items in the cart, matching your Redux slice
// interface CartItem {
//   productId: number;
//   title: string;
//   price: number;
//   quantity: number;
//   size: string;
// }

const ProductLists = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items as CartItem[]
  );

  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery();

  if (isProductsLoading) return <div>Loading...</div>;

  // console.log("Products data:", products);

  const handleAddToCart = (product: Product) => {
    console.log("Adding product to cart:", product.name);
    // The addToCart reducer expects an object with productId, title, and price
    // It will handle the quantity internally.
    dispatch(
      addToCart({
        productId: product.id,
        title: product.name, // Using product.name as title
        // price: product.price,
        price: product.stock[0].price,
        size: product.stock[0].size,
      })
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    console.log("Removing product with ID:", productId);
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="p-6 font-sans  min-h-screen">
      {/* Products Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-6">Products</h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
        backdrop-blur-sm shadow-2xl
        "
        >
          {products?.map((product) => (
            <div
              key={product.id}
              className=" shadow-lg overflow-hidden flex flex-col justify-between"
            >
              <div className="p-2">
                {/* Placeholder for product image - you can add an <img> tag here */}
                <div className="w-full h-72 mb-4 rounded-md flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt="product_img"
                    className="h-72 w-full object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold  backdrop-blur-sm  mb-2">
                  {product.name}
                </h3>
                <p className="text-sm mb-3">{product.description}</p>

                {/* <p className="text-lg font-bold text-green-600 mb-4">
                  ${product.price.toFixed(2)}
                  Price haven't been added yet
                </p> */}
                <div>
                  {product.stock && product.stock.length > 0 ? (
                    <p className="text-lg font-bold text-green-600 mt-2">
                      $ {product.stock[0].price.toFixed(2)}
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
                        <select id={`sku-select-${product.id}`} name="sku">
                          {product.stock.map((stockItem, index) => (
                            <option key={stockItem.sku || index} value={index}>
                              {stockItem.sku}
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
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold 
                hover:bg-blue-900 dark:hover:bg-blue-900 dark:hover:text-white transition-colors focus:outline-none 
                focus:ring-2 focus:ring-green-500"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Cart Section */}
      <section>
        <h2 className="text-3xl font-semibold  mb-6">Shopping Cart</h2>
        <div className=" backdrop-blur-sm rounded-lg shadow-xl p-6">
          {cartItems && cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                >
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium ">{item.title}</h4>
                    <p className="text-sm ">
                      Price: ${item.price.toFixed(2)}
                      {/* {console.log(item, "cart")} */}
                    </p>
                    <p>Size ${item.size}</p>
                    <p className="text-sm ">
                      Quantity:
                      <span className="font-semibold">{item.quantity}</span>
                    </p>
                  </div>
                  <div className="text-lg font-semibold  sm:text-right">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
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
                <p className="text-xl font-bold ">
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
            <p className=" italic">Your cart is empty. Start shopping!</p>
          )}
        </div>
      </section>

      <footer className="mt-12 text-center text-sm ">
        <p>
          &copy; {new Date().getFullYear()} Ecommerce Store DevelopBy Than Htike
          Zaw & Htoo Myat Nyi Nyi reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProductLists;
