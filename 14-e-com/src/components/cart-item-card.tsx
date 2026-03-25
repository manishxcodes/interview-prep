import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import { type CartItem as CartItemType } from "../types";
import useCart from "../hooks/useCart";

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { handleIncrease, handleDecrease } = useCart();
  const { product, quantity } = item;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      {/* Color dot */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 50,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={item.product.imageUrl}
          alt={item.product.name}
          sx={{ width: 40, height: 40 }}
        />
      </Box>

      {/* Product Info */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Tooltip title={product.name}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </Typography>
        </Tooltip>
        <Tooltip title={product.brand}>
          <Chip
            label={product.brand}
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              mt: 0.5,
              fontSize: "0.7rem",
              maxWidth: "100%",
              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
        </Tooltip>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", sm: "block" } }}
      />

      {/* Quantity Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={() => handleDecrease(product.id)}
          disabled={quantity <= 1}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
          }}
        >
          <Remove fontSize="small" />
        </IconButton>
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{ minWidth: 32, textAlign: "center" }}
        >
          {quantity}
        </Typography>
        <IconButton
          size="small"
          onClick={() => handleIncrease(product.id)}
          disabled={quantity >= product.stock}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", sm: "block" } }}
      />

      {/* Price */}
      <Box sx={{ textAlign: "right", minWidth: 90 }}>
        <Typography variant="h6" fontWeight={700} color="primary.main">
          ₹{(product.price * quantity).toLocaleString("en-IN")}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ₹{product.price.toLocaleString("en-IN")} × {quantity}
        </Typography>
      </Box>

      {/* Delete */}
      <IconButton
        onClick={() => onRemove(product.id)}
        color="error"
        size="small"
        sx={{ flexShrink: 0 }}
      >
        <DeleteOutline />
      </IconButton>
    </Paper>
  );
};

export default CartItem;
