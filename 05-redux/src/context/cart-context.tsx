import { createContext, useState } from "react";

type Movie = {
  name: string;
  price: number;
};

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (movie: Movie) => void;
  removeFromCart: (name: string) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(movie: Movie) {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === movie.name);

      if (existing) {
        return prev.map((item) =>
          item.name === movie.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...movie, quantity: 1 }];
    });
  }

  function removeFromCart(name: string) {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === name);

      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter((item) => item.name !== name);
      }

      return prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// type Movie = {
//     name: string;
//     price: number;
// }

// type CartItem = Movie & { quantity: number };

// type CartState = Record<string, CartItem>;

// type CartContextType = {
//     cart: CartState;
//     addToCart: (movie: Movie) => void;
//     increaseQuantity: (name: string) => void;
//     decreaseQuantity: (name: string) => void;
//     removeItem: (name: string) => void;
//     cartTotal: number;
//     cartCount: number;
// }

// export const CartContext = createContext<CartContextType>({
//     cart: {},
//     addToCart: () => {},
//     increaseQuantity: () => {},
//     decreaseQuantity: () => {},
//     removeItem: () => {},
//     cartTotal: 0,
//     cartCount: 0
// });

// export function CartProvider ({ children }: {children: React.ReactNode}) {
//     const [cart, setCart] = useState<CartState>({});

//     function addToCart(movie: Movie) {
//         setCart((prev) => {
//             if(prev[movie.name]) {

//             }
//         })
//     }
// }
