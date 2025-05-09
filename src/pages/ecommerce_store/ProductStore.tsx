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
