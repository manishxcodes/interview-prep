import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { store } from "./store";
import theme from "./theme";
import Navbar from "./components/navbar";
import HomePage from "./pages/home-page";
import ProductFormPage from "./pages/product-form-page";
import CartPage from "./pages/cart-page";
import MyProductsPage from "./pages/my-product-page";
import ShopPage from "./pages/shop-page";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductFormPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/my-products" element={<MyProductsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
