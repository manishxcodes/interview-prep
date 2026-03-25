import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  ShoppingCart,
  DeleteSweep,
  Store,
  ShoppingBag,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart-item-card";
import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProducts";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    totalItems,
    totalPrice,
    handleClearCart,
    handleRemoveFromCart,
  } = useCart();
  const { handleUpdateProduct, getProductById } = useProduct();

  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);

  const handleConfirmClear = () => {
    handleClearCart();
    setClearDialogOpen(false);
  };

  const handleConfirmRemoveItem = () => {
    if (removeId) {
      handleRemoveFromCart(removeId);
      setRemoveId(null);
    }
  };

  const handleBuy = () => {
    items.forEach((item) => {
      const product = getProductById(item.product.id);
      if (product) {
        handleUpdateProduct(product.id, {
          name: product.name,
          brand: product.brand,
          price: product.price,
          description: product.description,
          stock: Math.max(0, product.stock - item.quantity),
          imageUrl: product.imageUrl,
        });
      }
    });

    handleClearCart();
    setBuyDialogOpen(false);
    navigate("/order-success");
  };

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
          onClick={() => setClearDialogOpen(true)}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Clear Cart
        </Button>
      </Box>

      <Stack spacing={2} mb={3}>
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onRemove={(id) => setRemoveId(id)}
          />
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
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<ShoppingBag />}
          onClick={() => setBuyDialogOpen(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          Buy - ₹{totalPrice.toLocaleString("en-IN")}
        </Button>
      </Paper>

      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Clear Cart?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All {totalItems} item{totalItems !== 1 ? "s" : ""} will be removed
            from your cart. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setClearDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmClear}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(removeId)}
        onClose={() => setRemoveId(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Remove Item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setRemoveId(null)}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmRemoveItem}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Confirm Purchase?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're about to place an order for {totalItems} item
            {totalItems !== 1 ? "s" : ""} totalling ₹
            {totalPrice.toLocaleString("en-IN")}. Proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setBuyDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBuy}
            variant="contained"
            color="success"
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Confirm & Buy
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
