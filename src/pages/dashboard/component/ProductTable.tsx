import { useState } from "react";
import { Product } from "@/types/DashboardType";
// import { Product } from "@/types/ProductType";
import EditForm from "./EditForm";
interface ProductTableProps {
  products: Product[];
  loading: boolean;
}

const ProductTable = ({ products, loading }: ProductTableProps) => {
  const [isEditPanelOpen, setIsEditPanelOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loading)
    return <div className="text-center py-8">Loading products...</div>;
  if (products.length === 0)
    return <div className="text-center py-8">No products found</div>;

  // hand over props to edit component
  const handleEditClick = (product: Product) => {
    // Handle the edit button click
    // console.log("Edit product:", product);
    setSelectedProduct(product);
    setIsEditPanelOpen(true);
  };

  // hand over props to edit component
  const handleCloseEditPanel = () => {
    setIsEditPanelOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
          {/* status bar */}
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium ">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {product.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={product.category.iconUrl}
                      alt={product.category.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium ">
                      {product.category.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">
                  {product.stock.reduce((sum, item) => sum + item.stock, 0)}
                </div>
                <div className="text-sm text-green-500">
                  {product.stock.map((item) => item.size).join(", ")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">
                  ${product.stock[0]?.price.toFixed(2) || "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEditClick(product)}
                  // onClick={() => setIsEditPanelOpen(true)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => alert("Press delete")}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* sideview edit */}
      {isEditPanelOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
          onClick={() => setIsEditPanelOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 mt-20 right-0 h-full w-[700px]
           border-l border-t z-10 backdrop-blur-xl transform ${
             isEditPanelOpen ? "translate-x-0" : "translate-x-full"
           } `}
      >
        <div className=" p-2  overflow-auto">
          {selectedProduct && (
            <EditForm
              productToEdit={selectedProduct}
              onClose={handleCloseEditPanel}
            />
          )}
          {/* <EditForm value={products} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;

// const EditForm = ({ value }: { value: any }) => {
//   console.log(value, value.id, "at edit");
//   // const;
//   return (
//     <div>
//       <h1 className="text-3xl font-semibold m-3">Edit Product Form</h1>
//       <div>
//         <label>name</label>
//         <input type="text" name="" id="" className="p-2 m-1 border" />
//         <label>descrption</label>
//         <input type="text" name="" id="" className="p-2 m-1 border" />
//         <label>categoryId</label>
//         <input type="text" name="" id="" className="p-2 m-1 border" />
//         <label>statusId</label>
//         <input type="text" name="" id="" className="p-2 m-1 border" />
//         <input type="text" name="" id="" className="p-2 m-1 border" />
//         <input type="text" name="" id="" className="p-2 m-1 border" />
//       </div>
//     </div>
//   );
// };
