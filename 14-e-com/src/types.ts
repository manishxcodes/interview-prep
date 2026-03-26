export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrls: string[];
  stock: number;
  description: string;
  createdAt: string;
  forSale: boolean
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
  imageUrls :string[];
  forSale: boolean;
}

export interface ProductsState {
  products: Product[];
}

export interface CartState {
  items: CartItem[];
}

export interface CouponState {
  code: string;
  discountPercent: number;
}

export interface CartSliceState {
  items: CartItem[];
  coupon: CouponState | null;
}