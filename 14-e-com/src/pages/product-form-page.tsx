import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  InputAdornment,
  Divider,
  Avatar,
} from "@mui/material";
import { Save, ArrowBack, ImageOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { type ProductFormData } from "../types";
import useProducts from "../hooks/useProducts";

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleAddProduct, handleUpdateProduct, getProductById } =
    useProducts();

  const isNew = id === "new";
  const existingProduct = isNew ? null : id ? getProductById(id) : null;
  const isEdit = !isNew && existingProduct !== null;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      stock: 0,
      description: "",
      imageUrl: "",
    },
  });

  const watchedImageUrl = watch("imageUrl");

  useEffect(() => {
    if (existingProduct) {
      reset({
        name: existingProduct.name,
        brand: existingProduct.brand,
        price: existingProduct.price,
        stock: existingProduct.stock,
        description: existingProduct.description,
        imageUrl: existingProduct.imageUrl ?? "",
      });
    }
  }, [existingProduct, reset]);

  const onSubmit = (data: ProductFormData) => {
    if (isEdit && id) {
      handleUpdateProduct(id, data);
    } else {
      handleAddProduct(data);
    }
    navigate("/my-products");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, textTransform: "none" }}
      >
        Back
      </Button>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Header Strip */}
        <Box
          sx={{
            px: 4,
            py: 3,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          <Typography variant="h5" fontWeight={700} color="white">
            {isNew
              ? "Add New Product"
              : isEdit
                ? "Edit Product"
                : "Product Not Found"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}
          >
            {isNew
              ? "Fill in the details to list a new product"
              : isEdit
                ? "Update the product information below"
                : "This product ID does not exist"}
          </Typography>
        </Box>

        {!isNew && !isEdit && !existingProduct && (
          <Alert severity="info" sx={{ mx: 4, mt: 3 }}>
            No product found with this ID. You can create a new product below.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {/* Image URL field + live preview */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Avatar
                  src={watchedImageUrl}
                  variant="rounded"
                  sx={{
                    width: 80,
                    height: 80,
                    border: "1px solid",
                    borderColor: "divider",
                    flexShrink: 0,
                  }}
                >
                  <ImageOutlined sx={{ color: "text.disabled" }} />
                </Avatar>
                <Controller
                  name="imageUrl"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Image URL"
                      fullWidth
                      placeholder="https://example.com/image.jpg"
                      helperText="Paste a public image URL — preview shown on the left"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ImageOutlined fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Product name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="brand"
                control={control}
                rules={{ required: "Brand is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Brand"
                    fullWidth
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least ₹1" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="stock"
                control={control}
                rules={{
                  required: "Stock is required",
                  min: { value: 0, message: "Stock cannot be negative" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Stock"
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">units</InputAdornment>
                      ),
                    }}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  minLength: { value: 10, message: "Minimum 10 characters" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={isSubmitting || (!isNew && !isDirty)}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 4,
              }}
            >
              {isNew || (!isEdit && !existingProduct)
                ? "Add Product"
                : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductFormPage;
