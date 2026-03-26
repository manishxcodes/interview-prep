import React from "react";
import {
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Typography,
  Tooltip,
  IconButton,
  CardActions,
} from "@mui/material";
import {
  Add,
  Remove,
  ShoppingCart,
  CheckCircle,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { type Product } from "../types";
import { ImageCarousel } from "./image-carousel";

type Props = {
  product: Product;
  inCart: boolean;
  cartQty: number;
  localQty: number;
  onAdd: (product: Product) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  setQty: (id: string, val: number, max: number) => void;
};

const ProductCard: React.FC<Props> = ({
  product,
  inCart,
  cartQty,
  localQty,
  onAdd,
  onIncrease,
  onDecrease,
  setQty,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: inCart ? "success.light" : "divider",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.25s ease",
        backgroundColor: "background.paper",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transform: "translateY(-3px)",
        },
        width: "320px",
      }}
    >
      {/* Carousel */}
      <ImageCarousel imageUrls={product.imageUrls ?? []} name={product.name} />

      {/* forSale badge */}
      {!product.forSale && (
        <Box sx={{ px: 2, pt: 1 }}>
          <Chip
            label="Not for Sale"
            size="small"
            color="warning"
            variant="outlined"
            sx={{ fontSize: "0.65rem" }}
          />
        </Box>
      )}

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          pb: 1,
          flexGrow: 1,
        }}
      >
        {/* Name */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tooltip title={product.name}>
            <Typography
              fontWeight={600}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
                mr: 1,
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>
          {inCart && (
            <CheckCircle
              color="success"
              fontSize="small"
              sx={{ flexShrink: 0 }}
            />
          )}
        </Box>

        {/* Brand */}
        <Chip
          label={product.brand}
          size="small"
          variant="outlined"
          color="primary"
          sx={{
            width: "fit-content",
            fontSize: "0.7rem",
            "& .MuiChip-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 120,
            },
          }}
        />

        {/* Description */}
        <Tooltip title={product.description}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
              minHeight: "3em",
            }}
          >
            {product.description}
          </Typography>
        </Tooltip>

        {/* Price + Stock */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="auto"
        >
          <Typography fontWeight={700} color="primary.main" variant="h6">
            ₹{product.price.toLocaleString("en-IN")}
          </Typography>
          <Chip
            label={
              product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"
            }
            size="small"
            color={product.stock > 0 ? "success" : "error"}
          />
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Qty stepper + Add to cart */}
        <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            <IconButton
              size="small"
              onClick={() =>
                inCart
                  ? onDecrease(product.id)
                  : setQty(product.id, localQty - 1, product.stock)
              }
              disabled={inCart ? cartQty <= 1 : localQty <= 1}
              sx={{ borderRadius: 0 }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography
              sx={{ px: 1, minWidth: 24, textAlign: "center", fontWeight: 700 }}
            >
              {inCart ? cartQty : localQty}
            </Typography>
            <IconButton
              size="small"
              onClick={() =>
                inCart
                  ? onIncrease(product.id)
                  : setQty(product.id, localQty + 1, product.stock)
              }
              disabled={
                inCart ? cartQty >= product.stock : localQty >= product.stock
              }
              sx={{ borderRadius: 0 }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>

          <Button
            fullWidth
            variant={inCart ? "outlined" : "contained"}
            color={inCart ? "success" : "primary"}
            startIcon={inCart ? <CheckCircle /> : <ShoppingCart />}
            onClick={() => onAdd(product)}
            disabled={product.stock === 0 || !product.forSale}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            {inCart ? "In Cart" : "Add to Cart"}
          </Button>
        </Box>

        {/* View Details button */}
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<Visibility />}
          onClick={() => navigate(`/product-details/${product.id}`)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            color: "text.secondary",
            borderColor: "divider",
            "&:hover": { borderColor: "primary.main", color: "primary.main" },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
