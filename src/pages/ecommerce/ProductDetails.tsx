import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "@/redux/slice/cartSlice";
import { useGetProductByIdQuery } from "@/redux/api/ecommerce/productApi";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading } = useGetProductByIdQuery(productId);
  const dispatch = useDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p className="text-green-600">${product.price}</p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              productId: product.id,
              title: product.title,
              price: product.price,
            })
          )
        }
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};
export default ProductDetails;
