import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import {
  ShoppingCart,
  CheckCircle,
  ImageNotSupported,
} from "@mui/icons-material";
import { type Product } from "../types";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { isInCart } = useCart();

  if (!product) return null;

  const inCart = isInCart(product.id);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: inCart ? "success.main" : "divider",
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Product Image */}
      {product.imageUrl ? (
        <CardMedia
          component="img"
          height="180"
          image={product.imageUrl}
          alt={product.name}
          sx={{
            objectFit: "cover",
            borderRadius: "12px 12px 0 0",
            padding: "10px",
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <ImageNotSupported sx={{ fontSize: 48, color: "text.disabled" }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography variant="h6" fontWeight={600} lineHeight={1.2}>
            {product.name}
          </Typography>
          {inCart && <CheckCircle fontSize="small" color="success" />}
        </Box>

        <Chip
          label={product.brand}
          size="small"
          sx={{ mb: 1.5, fontWeight: 500, fontSize: "0.7rem" }}
          variant="outlined"
          color="primary"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700} color="primary.main">
            ₹{product.price.toLocaleString("en-IN")}
          </Typography>
          <Chip
            label={`Stock: ${product.stock}`}
            size="small"
            color={product.stock > 0 ? "success" : "error"}
            variant="filled"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant={inCart ? "outlined" : "contained"}
          color={inCart ? "success" : "primary"}
          startIcon={inCart ? <CheckCircle /> : <ShoppingCart />}
          onClick={() => navigate("/shop")}
          disabled={product.stock === 0}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          {inCart ? "In Cart — View Shop" : "Go to Shop"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
