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
