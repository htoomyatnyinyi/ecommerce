import { Product } from "@/types/DashboardType";
import { useRef } from "react";

interface EditFormProps {
  productToEdit: Product;
  onClose: () => void;
  // onSave: (updatedProductData: Partial<SelectedProduct>) => void;
}

const EditForm = ({ productToEdit, onClose }: EditFormProps) => {
  console.log(productToEdit, "check");

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryIdRef = useRef<HTMLSelectElement>(null);
  const statusIdRef = useRef<HTMLSelectElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nameRef.current ||
      !descriptionRef.current ||
      !categoryIdRef.current ||
      !statusIdRef.current ||
      !imageUrlRef.current
    )
      return;

    const updatedProduct: Product = {
      id: productToEdit.id,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      categoryId: parseInt(categoryIdRef.current.value, 10),
      statusId: parseInt(statusIdRef.current.value, 10),
      imageUrl: imageUrlRef.current.value,
    };
    console.log(updatedProduct, " check after update");
    // onSubmit(updatedProduct);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input defaultValue={productToEdit.name} ref={nameRef} />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            defaultValue={productToEdit.description}
            ref={descriptionRef}
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            defaultValue={productToEdit.categoryId.toString()}
            ref={categoryIdRef}
          >
            <option value="14">Men's Clothing</option>
            <option value="13">Women's Clothing</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select
            defaultValue={productToEdit.statusId.toString()}
            ref={statusIdRef}
          >
            <option value="15">15</option>
            <option value="14">14</option>
            <option value="13">13</option>
            {/* Add more statuses as needed */}
          </select>
        </div>

        <div>
          <label>Image URL:</label>
          <input
            defaultValue={productToEdit.imageUrl}
            ref={imageUrlRef}
            placeholder="update image here"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2  text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
