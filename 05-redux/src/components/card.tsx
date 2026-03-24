//import { useContext } from "react";
//import { CartContext } from "../context/cart-context";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/cart";

export const Card = ({ name, price }: { name: string; price: number }) => {
  //const { addToCart } = useContext(CartContext);

  const dispatch = useDispatch();

  return (
    <div className=" w-64 flex flex-col items-center bg-blue-200 rounded-lg m-2 py-2 px-4">
      <div className="w-30 h-30 bg-amber-100 rounded-md"></div>
      <div className="text-red-500 mt-2">{name}</div>
      <div className="flex justify-between items-center w-full mt-4">
        <div>{`Rs ${price}`}</div>
        <button
          className="text-xs bg-white px-4 py-2 rounded-lg"
          //onClick={() => addToCart({ name, price })}
          onClick={() => dispatch(addToCart({ name, price }))}
        >
          add to cart
        </button>
      </div>
    </div>
  );
};
