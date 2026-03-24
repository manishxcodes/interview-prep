// import { useContext } from "react";
// import { CartContext } from "../context/cart-context";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../store/actions/cart";

export function Cart() {
  //const { cart, removeFromCart } = useContext(CartContext);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = Object.values(cart);

  return (
    <div className="flex flex-col p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Cart</h1>

      {cartItems.length === 0 && <p>No items in cart</p>}

      {cartItems.map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center rounded-2xl border p-2 mb-2 "
        >
          <div className="flex items-center gap-4">
            <div>{item.name}</div>
            <div className="bg-yellow-200 p-1 rounded-md">Rs {item.price}</div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-gray-200 px-3 py-1 rounded-2xl"
              onClick={() => dispatch(decreaseQuantity(item.name))}
            >
              -
            </button>
            <div>{item.quantity}</div>
            <button
              className="bg-gray-200 px-3 py-1 rounded-2xl"
              onClick={() => dispatch(increaseQuantity(item.name))}
            >
              +
            </button>
            <button
              className="bg-red-300 px-4 py-2 rounded-2xl"
              onClick={() => dispatch(removeItem(item.name))}
            >
              remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
