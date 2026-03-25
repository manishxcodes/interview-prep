import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  Button,
  Chip,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Add,
  Remove,
  ShoppingCart,
  CheckCircle,
  ImageNotSupported,
} from "@mui/icons-material";
import { type Product } from "../types";

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

const IMG_HEIGHT = 160;

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
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: inCart ? "success.light" : "divider",
        borderRadius: 3,
        display: "flex",
        width: 300,
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.25s ease",
        backgroundColor: "background.paper",

        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* Image */}
      {product.imageUrl ? (
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.name}
          sx={{
            height: 170,
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            height: IMG_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <ImageNotSupported sx={{ fontSize: 40, color: "text.disabled" }} />
        </Box>
      )}

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tooltip
            title={product.name}
            slotProps={{
              popper: {
                modifiers: [
                  { name: "preventOverflow", options: { boundary: "window" } },
                ],
              },
            }}
          >
            <Typography noWrap fontWeight={600}>
              {product.name}
            </Typography>
          </Tooltip>

          {inCart && <CheckCircle color="success" fontSize="small" />}
        </Box>

        <Chip
          label={product.brand}
          size="small"
          variant="outlined"
          sx={{ width: "fit-content", fontSize: "12px" }}
        />

        <Tooltip title={product.description}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </Typography>
        </Tooltip>

        <Box
          mt={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={700} color="primary.main">
            ₹{product.price.toLocaleString("en-IN")}
          </Typography>

          <Chip
            label={`${product.stock}`}
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
          pt: 0,
          display: "flex",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
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
          >
            <Remove fontSize="small" />
          </IconButton>

          <Typography sx={{ px: 1, minWidth: 24, textAlign: "center" }}>
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
          disabled={product.stock === 0}
        >
          {inCart ? "Added" : "Add"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
