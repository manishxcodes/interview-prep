import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Stack,
  TextField,
  Chip,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  ShoppingCart,
  DeleteSweep,
  Store,
  ShoppingBag,
  LocalOffer,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart-item-card";
import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProducts";
import { ConfirmDialog } from "../components/ui/dialog-box";
import { coupons } from "../utils/coupons";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { applyCoupon, removeCoupon } from "../store/slices/cart-slice";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    items,
    totalItems,
    totalPrice,
    handleClearCart,
    handleRemoveFromCart,
  } = useCart();
  const { handleUpdateProduct, getProductById } = useProduct();

  // Read coupon from Redux (already rehydrated from localStorage on slice init)
  const appliedCoupon = useAppSelector((s) => s.cart.coupon);

  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const discountAmount = appliedCoupon
    ? Math.round((totalPrice * appliedCoupon.discountPercent) / 100)
    : 0;
  const finalPrice = totalPrice - discountAmount;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    if (coupons[code]) {
      dispatch(applyCoupon({ code, discountPercent: coupons[code] }));
      setCouponInput("");
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try SAVE10, SAVE20, or FLAT50.");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponInput("");
    setCouponError("");
  };

  const handleConfirmClear = () => {
    handleClearCart();
    dispatch(removeCoupon());
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
    dispatch(removeCoupon());
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
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Browse Shop
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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

      {/* Two column layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 360px" },
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        {/* Left — cart items */}
        <Stack spacing={2}>
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onRemove={(id) => setRemoveId(id)}
            />
          ))}
        </Stack>

        {/* Right — order summary */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Coupon card */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 2.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocalOffer fontSize="small" color="primary" />
              <Typography variant="subtitle1" fontWeight={700}>
                Coupon Code
              </Typography>
            </Box>

            {appliedCoupon ? (
              /* Applied state */
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "success.50",
                  border: "1px solid",
                  borderColor: "success.main",
                  borderRadius: 2,
                  px: 2,
                  py: 1.25,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircle fontSize="small" color="success" />
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="success.dark"
                    >
                      {appliedCoupon.code}
                    </Typography>
                    <Typography variant="caption" color="success.dark">
                      {appliedCoupon.discountPercent}% off · You save ₹
                      {discountAmount.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Cancel fontSize="small" />}
                  onClick={handleRemoveCoupon}
                  sx={{ textTransform: "none", fontWeight: 600, minWidth: 0 }}
                >
                  Remove
                </Button>
              </Box>
            ) : (
              /* Input state */
              <Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    placeholder="e.g. SAVE10"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    size="small"
                    fullWidth
                    error={!!couponError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOffer
                            fontSize="small"
                            sx={{ color: "text.disabled" }}
                          />
                        </InputAdornment>
                      ),
                      sx: { fontFamily: "monospace", letterSpacing: 1 },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleApplyCoupon}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      px: 2.5,
                      flexShrink: 0,
                    }}
                  >
                    Apply
                  </Button>
                </Box>
                {couponError && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.75, display: "block" }}
                  >
                    {couponError}
                  </Typography>
                )}
                {/* <Box
                  sx={{ display: "flex", gap: 0.75, mt: 1.5, flexWrap: "wrap" }}
                >
                  {Object.keys(coupons).map((code) => (
                    <Chip
                      key={code}
                      label={code}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setCouponInput(code);
                        setCouponError("");
                      }}
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.7rem",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "primary.50",
                          borderColor: "primary.main",
                        },
                      }}
                    />
                  ))}
                </Box> */}
              </Box>
            )}
          </Paper>

          {/* Order summary card */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 2.5,
              position: { md: "sticky" },
              top: { md: 80 },
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Line items */}
            <Stack spacing={1} mb={2}>
              {items.map((item) => (
                <Box
                  key={item.product.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 180,
                    }}
                  >
                    {item.product.name}{" "}
                    <Box component="span" sx={{ opacity: 0.55 }}>
                      × {item.quantity}
                    </Box>
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ₹
                    {(item.product.price * item.quantity).toLocaleString(
                      "en-IN",
                    )}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Subtotal */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₹{totalPrice.toLocaleString("en-IN")}
              </Typography>
            </Box>

            {/* Discount row — only show if applied */}
            {appliedCoupon && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" color="success.main">
                    Discount
                  </Typography>
                  <Chip
                    label={appliedCoupon.code}
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{
                      fontSize: "0.6rem",
                      height: 18,
                      fontFamily: "monospace",
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="success.main"
                >
                  − ₹{discountAmount.toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Total
              </Typography>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  color="primary.main"
                  lineHeight={1}
                >
                  ₹{finalPrice.toLocaleString("en-IN")}
                </Typography>
                {appliedCoupon && (
                  <Typography
                    variant="caption"
                    color="success.main"
                    fontWeight={600}
                  >
                    You saved ₹{discountAmount.toLocaleString("en-IN")}
                  </Typography>
                )}
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShoppingBag />}
              onClick={() => setBuyDialogOpen(true)}
              sx={{
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                py: 1.5,
                fontSize: "1rem",
                boxShadow: "0 4px 14px rgba(41,98,255,0.3)",
                "&:hover": { boxShadow: "0 6px 20px rgba(41,98,255,0.45)" },
              }}
            >
              Buy · ₹{finalPrice.toLocaleString("en-IN")}
            </Button>
          </Paper>
        </Box>
      </Box>

      <ConfirmDialog
        open={clearDialogOpen}
        title="Clear Cart?"
        description={`All ${totalItems} item${totalItems !== 1 ? "s" : ""} will be removed. This cannot be undone.`}
        confirmLabel="Clear Cart"
        confirmColor="error"
        onConfirm={handleConfirmClear}
        onCancel={() => setClearDialogOpen(false)}
      />

      <ConfirmDialog
        open={Boolean(removeId)}
        title="Remove Item?"
        description="Are you sure you want to remove this item from your cart?"
        confirmLabel="Remove"
        confirmColor="error"
        onConfirm={handleConfirmRemoveItem}
        onCancel={() => setRemoveId(null)}
      />

      <ConfirmDialog
        open={buyDialogOpen}
        title="Confirm Purchase?"
        description={`Placing an order for ${totalItems} item${totalItems !== 1 ? "s" : ""} · ₹${finalPrice.toLocaleString("en-IN")}. Proceed?`}
        confirmLabel="Confirm & Buy"
        confirmColor="success"
        onConfirm={handleBuy}
        onCancel={() => setBuyDialogOpen(false)}
      />
    </Container>
  );
};

export default CartPage;
