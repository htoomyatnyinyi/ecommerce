import { useCreateNewProductMutation } from "@/redux/api/ecommerce/dashboardApi";
import React, { useRef } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  statusId: number;
  imageUrl: string;
};

const ProductForm = ({ onClose }: { onClose: () => void }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryIdRef = useRef<HTMLSelectElement>(null);
  const statusIdRef = useRef<HTMLSelectElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const [
    createNewProduct,
    {
      isLoading: isCreateNewProductLoading,
      isError: isCreateNewProductError,
      isSuccess: isCreateNewProductSuccess,
    },
  ] = useCreateNewProductMutation();

  if (isCreateNewProductLoading) return <p>Loading</p>;
  if (isCreateNewProductError) return <p>Error</p>;
  if (isCreateNewProductSuccess) return <p>Success</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nameRef.current ||
      !descriptionRef.current ||
      !categoryIdRef.current ||
      !statusIdRef.current ||
      !imageUrlRef.current
    ) {
      return;
    }

    const file = imageUrlRef.current.files?.[0];

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("categoryId", categoryIdRef.current.value);
    formData.append("statusId", statusIdRef.current.value);

    if (file) {
      formData.append("image", file); // backend must expect 'image' key
    }

    // If you still want an object version:
    const createNewProductData: Omit<Product, "id"> = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      categoryId: parseInt(categoryIdRef.current.value, 10),
      statusId: parseInt(statusIdRef.current.value, 10),
      imageUrl: file ? file.name : "", // Placeholder name
    };

    console.log(createNewProductData, " check after update");
    const a = await createNewProduct(createNewProductData);
    console.log(a, "check return ");
    // onSubmit(formData); <-- if sending via FormData
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input placeholder="Product name" ref={nameRef} />
        </div>

        <div>
          <label>Description:</label>
          <textarea placeholder="Description" ref={descriptionRef} />
        </div>

        <div>
          <label>Category:</label>
          <select defaultValue="14" ref={categoryIdRef}>
            <option value="14">Men's Clothing</option>
            <option value="13">Women's Clothing</option>
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select defaultValue="15" ref={statusIdRef}>
            <option value="14">Active14</option>
            <option value="15">Inactive15</option>
          </select>
        </div>

        <div>
          <label>Image:</label>
          <input type="file" ref={imageUrlRef} />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="px-4 py-2 border rounded">
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
// import React, { useRef } from "react";

// // import { Product } from "@/types/DashboardType";

// interface NewProduct {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   categoryId: number;
//   statusId: number;
// }

// const ProductForm = ({ onClose }: { onClose: () => void }) => {
//   const nameRef = useRef<HTMLInputElement>(null);
//   const descriptionRef = useRef<HTMLTextAreaElement>(null);
//   const categoryIdRef = useRef<HTMLSelectElement>(null);
//   const statusIdRef = useRef<HTMLSelectElement>(null);
//   const imageUrlRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//       !nameRef.current ||
//       !descriptionRef.current ||
//       !categoryIdRef.current ||
//       !statusIdRef.current ||
//       !imageUrlRef.current
//     )
//       return;

//     // console.log(
//     //   nameRef.current.value,
//     //   descriptionRef.current.value,
//     //   categoryIdRef.current.value,
//     //   statusIdRef.current.value,
//     //   imageUrlRef.current.value,
//     //   "check for submitted"
//     // );

//     // const formData = new FormData();
//     // formData.append = nameRef.current.value;
//     // formData.append = descriptionRef.current.value;
//     // formData.append = categoryIdRef.current.value;
//     // formData.append = statusIdRef.current.value;
//     // formData.append = imageUrlRef.current.value;

//     const updatedProduct: Omit<Product, "id"> = {
//       name: nameRef.current.value,
//       description: descriptionRef.current.value,
//       categoryId: parseInt(categoryIdRef.current.value, 10),
//       statusId: parseInt(statusIdRef.current.value, 10),
//       imageUrl: imageUrlRef.current.value,
//     };

//     console.log(updatedProduct, "chec kbefore submit");

//     // console.log(updatedProduct, " check after update");
//     // // onSubmit(updatedProduct);
//   };
//   return (
//     <div>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Name:</label>
//             <input placeholder="product nameR" ref={nameRef} />
//           </div>

//           <div>
//             <label>Description:</label>
//             <textarea placeholder="descriptions" ref={descriptionRef} />
//           </div>

//           <div>
//             <label>Category:</label>
//             <select
//               defaultValue={14}
//               // defaultValue={productToEdit.categoryId.toString()}
//               ref={categoryIdRef}
//             >
//               <option value="14">Men's Clothing</option>
//               <option value="13">Women's Clothing</option>
//               {/* Add more categories as needed */}
//             </select>
//           </div>

//           <div>
//             <label>Status:</label>
//             <select
//               defaultValue={15}
//               // defaultValue={productToEdit.statusId.toString()}
//               ref={statusIdRef}
//             >
//               <option value="15">15</option>
//               <option value="14">14</option>
//               <option value="13">13</option>
//               {/* Add more statuses as needed */}
//             </select>
//           </div>

//           <div>
//             <label>Image URL:</label>
//             <input
//               type="file"
//               ref={imageUrlRef}
//               placeholder="update image here"
//             />
//           </div>

//           <div className="flex justify-between w-full ">
//             <button
//               type="submit"
//               className="px-4 py-2  text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;
