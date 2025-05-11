// Define TypeScript interfaces for Product and Category

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  statusId: number;
  category: Category;
  stock: Stock[];
}

export interface Stock {
  id: number;
  productId: number;
  sku: string;
  stock: number;
  price: number;
  size: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
}

// add on
// Assumed structure for @/types/ProductType
// You should replace this with your actual ProductType definition
export interface StockItem {
  size: string;
  stock: number;
  price: number;
}

export interface ProductCategory {
  id: string; // Assuming category has an ID
  name: string;
  iconUrl: string;
}

export interface SelectedProduct {
  id: string | number;
  name: string;
  description: string;
  imageUrl: string;
  category: ProductCategory; // This is an object
  categoryId?: string; // For the form, if you store category ID separately or derive it
  stock: StockItem[];
  statusId?: string; // As per your EditForm
  // Add any other relevant product fields
}
