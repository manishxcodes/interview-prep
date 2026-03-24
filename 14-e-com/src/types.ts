export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  stock: number;
  description: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  brand: string;
  price: number;
  stock: number;
  description: string;
  imageUrl :string;
}

export interface ProductsState {
  products: Product[];
}

export interface CartState {
  items: CartItem[];
}