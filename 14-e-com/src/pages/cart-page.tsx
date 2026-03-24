import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { ShoppingCart, DeleteSweep, Store } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart-item-card";
import useCart from "../hooks/useCart";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, handleClearCart } = useCart();

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 4,
            p: 8,
            textAlign: "center",
          }}
        >
          <ShoppingCart sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.disabled" mb={3}>
            Head over to the shop to add some products.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Store />}
            onClick={() => navigate("/shop")}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Browse Shop
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Cart
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteSweep />}
          onClick={handleClearCart}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Clear Cart
        </Button>
      </Box>

      <Stack spacing={2} mb={3}>
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </Stack>

      {/* Order Summary */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={2}>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {items.map((item) => (
          <Box
            key={item.product.id}
            sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              {item.product.name} × {item.quantity}
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Total
          </Typography>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            ₹{totalPrice.toLocaleString("en-IN")}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CartPage;
