export type Movie = { name: string, price: number };

export type CartItem = Movie & { quantity: number };

export type CartState = {
    cart: Record<string, CartItem>
}

export type CartAction =
    { type: "ADD_TO_CART";        payload: Movie  }  // adds a Movie
  | { type: "INCREASE_QUANTITY";  payload: string }  // just the name
  | { type: "DECREASE_QUANTITY";  payload: string }  // just the name
  | { type: "REMOVE_ITEM";        payload: string }  // just the name