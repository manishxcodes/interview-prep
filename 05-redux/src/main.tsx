import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
//import { CartProvider } from "./context/cart-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <CartProvider> */}
    {/* <App /> */}
    {/* </CartProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
