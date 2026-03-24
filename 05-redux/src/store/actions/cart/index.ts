import type { CartAction, Movie } from "../../constants/cart"

export const addToCart = (movie: Movie): CartAction => {
    return {
        type: "ADD_TO_CART",
        payload: movie
    }
}

export const increaseQuantity = (name: string): CartAction => {
    return {
        type: "INCREASE_QUANTITY",
        payload: name,
    }
}

export const decreaseQuantity = (name: string): CartAction => {
    return {
        type: "DECREASE_QUANTITY",
        payload: name
    }
}

export const removeItem = (name: string): CartAction => {
  return {
    type: "REMOVE_ITEM",
    payload: name,
  };
};