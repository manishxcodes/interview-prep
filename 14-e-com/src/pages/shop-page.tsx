import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ShoppingCart,
  Search,
  Store,
  CheckCircle,
  ImageNotSupported,
} from "@mui/icons-material";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { type Product } from "../types";

const ShopPage: React.FC = () => {
  const { products } = useProducts();
  const { handleAddToCart, isInCart } = useCart();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; name: string }>({
    open: false,
    name: "",
  });

  const getQty = (id: string) => quantities[id] ?? 1;
  const setQty = (id: string, val: number) =>
    setQuantities((prev) => ({ ...prev, [id]: val }));

  const handleAdd = (product: Product) => {
    handleAddToCart(product, getQty(product.id));
    setSnackbar({ open: true, name: product.name });
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Shop
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Browse products and add them to your cart
        </Typography>
        <TextField
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ maxWidth: 360, width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {products.length === 0 ? (
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
          <Store sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No products available
          </Typography>
        </Paper>
      ) : filtered.length === 0 ? (
        <Typography color="text.secondary" mt={4} textAlign="center">
          No products match "{search}"
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((product) => {
            const qty = getQty(product.id);
            const inCart = isInCart(product.id);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: inCart ? "success.main" : "divider",
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s",
                    "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
                  }}
                >
                  {/* Image */}
                  {product.imageUrl ? (
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.imageUrl}
                      alt={product.name}
                      sx={{ objectFit: "cover" }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 160,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "action.hover",
                      }}
                    >
                      <ImageNotSupported
                        sx={{ fontSize: 40, color: "text.disabled" }}
                      />
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {product.name}
                      </Typography>
                      {inCart && (
                        <CheckCircle color="success" fontSize="small" />
                      )}
                    </Box>
                    <Chip
                      label={product.brand}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ mb: 1.5 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, minHeight: 40 }}
                    >
                      {product.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        color="primary.main"
                      >
                        ₹{product.price.toLocaleString("en-IN")}
                      </Typography>
                      <Chip
                        label={`Stock: ${product.stock}`}
                        size="small"
                        color={product.stock > 0 ? "success" : "error"}
                      />
                    </Box>
                  </CardContent>

                  <CardActions
                    sx={{ px: 2, pb: 2, flexDirection: "column", gap: 1 }}
                  >
                    <TextField
                      label="Quantity"
                      type="number"
                      size="small"
                      fullWidth
                      value={qty}
                      disabled={product.stock === 0}
                      inputProps={{ min: 1, max: product.stock }}
                      onChange={(e) =>
                        setQty(
                          product.id,
                          Math.max(
                            1,
                            Math.min(product.stock, Number(e.target.value)),
                          ),
                        )
                      }
                    />
                    <Button
                      fullWidth
                      variant={inCart ? "outlined" : "contained"}
                      color={inCart ? "success" : "primary"}
                      startIcon={inCart ? <CheckCircle /> : <ShoppingCart />}
                      onClick={() => handleAdd(product)}
                      disabled={product.stock === 0}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      {inCart ? "Add More to Cart" : "Add to Cart"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ open: false, name: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbar({ open: false, name: "" })}
        >
          "{snackbar.name}" added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ShopPage;
