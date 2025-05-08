export type ProductList = Product[]; // not sure may be for product array . if you don't want to use Product[] like thsi you can you ProductList

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

export interface Category {
  id: number;
  name: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
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
// export interface Product {
//   id: number;
//   categoryId: number;
//   statusId: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  size: string;
}
