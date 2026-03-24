import type { Product, CartItem } from "../types";

const PRODUCTS_KEY = "products";
const CART_KEY = "cart";

export const getProductsFromStorage = (): Product[] => {
    try {
        const data = localStorage.getItem(PRODUCTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveProductToStorage = (products: Product[]) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
} 

export const getCartFromStorage = (): CartItem[] => {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export const saveCartToStorage = (items: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}
