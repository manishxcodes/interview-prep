import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Paper,
  IconButton,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  ShoppingCart,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ImageNotSupported,
  Add,
  Remove,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { handleAddToCart, handleIncrease, handleDecrease, isInCart, items } =
    useCart();

  const product = id ? getProductById(id) : null;

  const [currentImg, setCurrentImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({});

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="error">Product not found.</Alert>
        <Button onClick={() => navigate("/")}>Back</Button>
      </Container>
    );
  }

  const inCart = isInCart(product.id);
  const cartQty = items.find((i) => i.product.id === product.id)?.quantity ?? 0;

  const images = product.imageUrls ?? [];
  const hasMultiple = images.length > 1;

  // Swipe support
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentImg((c) => (c + 1) % images.length),
    onSwipedRight: () =>
      setCurrentImg((c) => (c - 1 + images.length) % images.length),
    trackMouse: true,
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* ✅ FLEX LAYOUT (FIXED) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* ───────── LEFT: IMAGES ───────── */}
        <Box sx={{ flex: 1 }}>
          <Paper
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            {/* Main Image */}
            <Box
              {...handlers}
              sx={{
                position: "relative",
                height: 420,
                bgcolor: "#f8f9fc",
                overflow: "hidden",
              }}
              onMouseMove={(e) => {
                const { left, top, width, height } =
                  e.currentTarget.getBoundingClientRect();

                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;

                setZoomStyle({
                  transformOrigin: `${x}% ${y}%`,
                  transform: "scale(2)",
                });
              }}
              onMouseLeave={() =>
                setZoomStyle({
                  transform: "scale(1)",
                  transformOrigin: "center",
                })
              }
            >
              {images.length > 0 ? (
                <Box
                  component="img"
                  src={images[currentImg]}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "transform 0.2s",
                    ...zoomStyle,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageNotSupported sx={{ fontSize: 60 }} />
                </Box>
              )}

              {hasMultiple && (
                <>
                  <IconButton
                    onClick={() =>
                      setCurrentImg(
                        (c) => (c - 1 + images.length) % images.length,
                      )
                    }
                    sx={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      bgcolor: "white",
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>

                  <IconButton
                    onClick={() =>
                      setCurrentImg((c) => (c + 1) % images.length)
                    }
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      bgcolor: "white",
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Thumbnails */}
            {hasMultiple && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  p: 1.5,
                  overflowX: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {images.map((url, i) => (
                  <Box
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    sx={{
                      width: 64,
                      height: 64,
                      flexShrink: 0,
                      border: "2px solid",
                      borderColor:
                        i === currentImg ? "primary.main" : "divider",
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component="img"
                      src={url}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Box>

        {/* ───────── RIGHT: DETAILS ───────── */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" fontWeight={700}>
            {product.name}
          </Typography>

          <Typography variant="h4" color="primary.main" fontWeight={800}>
            ₹{product.price.toLocaleString("en-IN")}
          </Typography>

          <Divider />

          <Typography color="text.secondary">{product.description}</Typography>

          <Divider />

          {/* Cart Controls */}
          {product.forSale && product.stock > 0 && (
            <Box display="flex" gap={2} alignItems="center">
              {!inCart ? (
                <>
                  <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <Remove />
                  </IconButton>

                  <Typography>{qty}</Typography>

                  <IconButton
                    onClick={() =>
                      setQty((q) => Math.min(product.stock, q + 1))
                    }
                  >
                    <Add />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => handleDecrease(product.id)}>
                    <Remove />
                  </IconButton>

                  <Typography>{cartQty}</Typography>

                  <IconButton onClick={() => handleIncrease(product.id)}>
                    <Add />
                  </IconButton>
                </>
              )}

              <Button
                variant="contained"
                startIcon={inCart ? <CheckCircle /> : <ShoppingCart />}
                onClick={() => handleAddToCart(product, qty)}
              >
                {inCart ? "In Cart" : "Add to Cart"}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailsPage;
