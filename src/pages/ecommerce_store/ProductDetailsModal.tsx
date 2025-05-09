// components/ProductDetailsModal.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import { Product } from "@/types/ProductType";

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  productDetails: Product | undefined;
  isLoading: boolean;
  selectedIndex: number;
  onSkuChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  open,
  onClose,
  productDetails,
  isLoading,
  selectedIndex,
  onSkuChange,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (
      !productDetails ||
      !productDetails.stock ||
      productDetails.stock.length === 0
    )
      return;

    const selectedStockItem = productDetails.stock[selectedIndex];
    if (!selectedStockItem) return;

    dispatch(
      addToCart({
        productId: productDetails.id,
        title: productDetails.name,
        price: selectedStockItem.price,
        size: selectedStockItem.size,
        sku: selectedStockItem.sku,
        category: productDetails.category.name,
      })
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-10 p-4"
      onClick={onClose}
    >
      <div
        className=" p-6 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <p className="text-center text-lg">Loading Product Details...</p>
        ) : productDetails ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {productDetails.name}
              </h2>
              <button
                onClick={onClose}
                className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={productDetails.imageUrl}
                  alt={productDetails.name}
                  className="w-full h-auto object-contain rounded-md mb-4 border dark:border-slate-700"
                />
              </div>

              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {productDetails.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Category: {productDetails.category.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Added:{" "}
                  {new Date(productDetails.createdAt).toLocaleDateString()}
                </p>

                {productDetails.stock?.length > 0 ? (
                  <>
                    <label
                      htmlFor="modal-sku-select"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                    >
                      Select Variant:
                    </label>
                    <select
                      id="modal-sku-select"
                      value={selectedIndex}
                      onChange={onSkuChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 dark:text-white"
                    >
                      {productDetails.stock.map((stockItem, index) => (
                        <option key={stockItem.sku} value={index}>
                          {stockItem.size || "Default"} - $
                          {stockItem.price.toFixed(2)} (SKU: {stockItem.sku})
                        </option>
                      ))}
                    </select>

                    <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
                      Price: $
                      {productDetails.stock[selectedIndex]?.price.toFixed(2)}
                    </p>

                    <button
                      onClick={handleAddToCart}
                      className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md"
                    >
                      Add To Cart
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-red-500 dark:text-red-400 font-semibold mb-4">
                    Out of Stock
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-lg">Product details not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModal;
