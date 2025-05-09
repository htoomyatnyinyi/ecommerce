import { useEffect, useState } from "react";

const ProductFilters = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    onFilter({ searchTerm, categoryFilter });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        className="px-4 py-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="px-4 py-2 border rounded"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {/* Map through categories */}
      </select>
    </div>
  );
};

export default ProductFilters;
