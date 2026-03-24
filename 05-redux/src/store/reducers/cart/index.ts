import type { CartAction, CartState } from "../../constants/cart";

const initialState: CartState = {
    cart: {}
}

function cartReducer (
    state: CartState = initialState,
    action: CartAction
): CartState {
    switch(action.type) {
        case "ADD_TO_CART": {
            const movie = action.payload;
            const existing = state.cart[movie.name];

            if(existing) {
                return {
                    ...state,                               // preserve top level state
                    cart: {
                        ...state.cart,                      // preserve all other cart items
                        [movie.name]: {
                            ...existing,                    // preserves name, price
                            quantity: existing.quantity + 1 // increase quantity
                        }
                    }
                }
            }

            return {
                ...state, 
                cart: {
                    ...state.cart,
                    [movie.name]: { ...movie, quantity: 1 }
                }
            }
        };

        case "REMOVE_ITEM": {
            const name = action.payload;

            const { [name]: _, ...rest } = state.cart;

            return {
                ...state, cart: rest
            }
        }

        case "INCREASE_QUANTITY": {
            const name = action.payload;
            const item = state.cart[name];

            return {
                ...state,
                cart: {
                    ...state.cart,
                    [name]: {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
            }
        }

        case "DECREASE_QUANTITY": {
            const name = action.payload;
            const item = state.cart[name];

            if (item.quantity == 1) {
                const { [name]: _, ...rest } = state.cart;
                return {
                    ...state,
                    cart: rest
                }
            }

            return {
                ...state,
                cart: {
                    ...state.cart,
                    [name]: {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
            }
        }
    }

    return state;
}

export default cartReducer;