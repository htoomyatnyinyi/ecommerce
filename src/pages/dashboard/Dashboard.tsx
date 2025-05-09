import { useState } from "react";
import {
  useFetchAllProductsQuery,
  useFetchAllCategoryQuery,
} from "@/redux/api/ecommerce/dashboardApi";
import ProductTable from "./component/ProductTable";
import CategoryTable from "./component/CategoryTable";
import StatsCard from "./component/StatsCard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { data: products = [], isLoading: productsLoading } =
    useFetchAllProductsQuery();
  const { data: categories = [], isLoading: categoriesLoading } =
    useFetchAllCategoryQuery();

  // Calculate statistics
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalStock = products.reduce((sum, product) => {
    return (
      sum + product.stock.reduce((stockSum, item) => stockSum + item.stock, 0)
    );
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          E-Commerce Dashboard
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Products" value={totalProducts} icon="📦" />
        <StatsCard title="Total Categories" value={totalCategories} icon="🏷️" />
        <StatsCard title="Total Stock" value={totalStock} icon="📊" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
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
