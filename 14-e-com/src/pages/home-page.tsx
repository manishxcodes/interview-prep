import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { AddBox, Store } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/product-card";
import useProducts from "../hooks/useProducts";
import Grid from "@mui/material/Grid";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

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

      {/* Products Grid */}
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
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products yet
          </Typography>
          <Typography variant="body2" color="text.disabled" mb={3}>
            Start by adding your first product to the catalog.
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
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
