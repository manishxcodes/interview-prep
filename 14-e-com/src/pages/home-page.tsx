import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, AddBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { type Product } from "../types";
import ProductCard from "../components/product-card";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { handleAddToCart, handleIncrease, handleDecrease, isInCart, items } =
    useCart();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; name: string }>({
    open: false,
    name: "",
  });

  const getQty = (id: string) => quantities[id] ?? 1;
  const setQty = (id: string, val: number, max: number) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(max, val)),
    }));

  const getCartQty = (id: string) =>
    items.find((i) => i.product.id === id)?.quantity ?? 0;

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
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Product Catalog
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {products.length} product{products.length !== 1 ? "s" : ""} listed
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ width: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddBox />}
            onClick={() => navigate("/product/new")}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* Empty states */}
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
          <AddBox sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products yet
          </Typography>
          <Typography variant="body2" color="text.disabled" mb={3}>
            Start by adding your first product.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddBox />}
            onClick={() => navigate("/product/new")}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Add Your First Product
          </Button>
        </Paper>
      ) : filtered.length === 0 ? (
        <Typography color="text.secondary" mt={4} textAlign="center">
          No products match "{search}"
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((product) => {
            const inCart = isInCart(product.id);
            const cartQty = getCartQty(product.id);
            const localQty = getQty(product.id);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard
                  product={product}
                  inCart={inCart}
                  cartQty={cartQty}
                  localQty={localQty}
                  onAdd={handleAdd}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  setQty={setQty}
                />
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

export default HomePage;
