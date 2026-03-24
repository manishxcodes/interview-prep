import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";
// import { useContext } from "react";
// import { CartContext } from "./context/cart-context";
import { Cart } from "./pages/cart";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

function App() {
  // testFn();
  // const { cart } = useContext(CartContext);
  // console.log("cart: ", cart);

  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = Object.values(cart);
  console.log(cartItems);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
