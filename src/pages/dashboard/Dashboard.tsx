import { useState } from "react";
import {
  useFetchAllProductsQuery,
  useFetchAllCategoryQuery,
} from "@/redux/api/ecommerce/dashboardApi";
import ProductTable from "./component/ProductTable";
import CategoryTable from "./component/CategoryTable";
import StatsCard from "./component/StatsCard";
import ProductForm from "@/components/dashboard/ProductForm";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("products");
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState<boolean>(false);

  const { data: products = [], isLoading: productsLoading } =
    useFetchAllProductsQuery();

  const { data: categories = [], isLoading: categoriesLoading } =
    useFetchAllCategoryQuery();

  // Calculate statistics
  const totalProducts = products.length;
  const totalCategories = categories.length;

  const totalStock = products.reduce((sum, product) => {
    // console.log(sum, product, " check at areduct dash");
    return (
      sum + product.stock.reduce((stockSum, item) => stockSum + item.stock, 0)
    );
  }, 0);

  // for ProductForm props
  const handleCreatePanel = () => {
    setIsCreatePanelOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* // main view */}
      {isCreatePanelOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
          onClick={() => setIsCreatePanelOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 mt-20 right-0 h-full w-[700px]
           border-l border-t z-10 backdrop-blur-xl transform ${
             isCreatePanelOpen ? "translate-x-0" : "translate-x-full"
           } `}
      >
        <div className=" p-2  overflow-auto">
          <ProductForm onClose={handleCreatePanel} />
        </div>
      </div>

      {/* // */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold ">E-Commerce Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Products" value={totalProducts} icon="📦" />
        <StatsCard title="Total Categories" value={totalCategories} icon="🏷️" />
        <StatsCard title="Total Stock" value={totalStock} icon="📊" />
      </div>

      <div className="flex justify-between w-full">
        <div className="h-full w-full  ">
          <button
            onClick={() => setIsCreatePanelOpen((prev) => !prev)}
            className=" p-2 m-1 bg-sky-900 text-end"
          >
            Creaet New Product
          </button>
        </div>
      </div>
      <div className=" rounded-lg shadow overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "categories"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Categories
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "products" ? (
            <ProductTable products={products} loading={productsLoading} />
          ) : (
            <CategoryTable
              categories={categories}
              loading={categoriesLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
