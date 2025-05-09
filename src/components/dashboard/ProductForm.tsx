import { useCreateNewProductMutation } from "@/redux/api/ecommerce/dashboardApi";

import { useState } from "react";

useCreateNewProductMutation;
const ProductForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [
    createProduct,
    {
      isLoading: isCreateProductLoading,
      isError: isCreateProductError,
      error: isError,
    },
  ] = useCreateNewProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    categoryId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(formData).unwrap();
      onSuccess();
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <input type="text" placeholder="name" />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Product
      </button>
    </form>
  );
};
export default ProductForm;
