import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  Divider,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Save,
  ArrowBack,
  ImageOutlined,
  AddPhotoAlternate,
  DeleteOutline,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { type ProductFormData } from "../types";
import useProducts from "../hooks/useProducts";
import { BRANDS } from "../utils/brand-name";

const MAX_NAME = 70;
const MAX_DESC = 300;
const MAX_IMAGES = 5;

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleAddProduct, handleUpdateProduct, getProductById } =
    useProducts();

  const isNew = id === "new";
  const existingProduct = isNew ? null : id ? getProductById(id) : null;
  const isEdit = !isNew && existingProduct !== null;

  const [imageInput, setImageInput] = useState("");
  const [imageError, setImageError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      stock: 0,
      description: "",
      imageUrls: [],
      forSale: true,
    },
  });

  const watchedImageUrls = watch("imageUrls");
  const watchedName = watch("name");
  const watchedDesc = watch("description");
  const watchedForSale = watch("forSale");

  useEffect(() => {
    if (existingProduct) {
      reset({
        name: existingProduct.name,
        brand: existingProduct.brand,
        price: existingProduct.price,
        stock: existingProduct.stock,
        description: existingProduct.description,
        imageUrls: existingProduct.imageUrls ?? [],
        forSale: existingProduct.forSale ?? true,
      });
    }
  }, [existingProduct, reset]);

  const handleAddImage = () => {
    const url = imageInput.trim();
    if (!url) return;
    if (!url.startsWith("http")) {
      setImageError("Please enter a valid URL starting with http");
      return;
    }
    if (watchedImageUrls.length >= MAX_IMAGES) {
      setImageError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }
    if (watchedImageUrls.includes(url)) {
      setImageError("This image URL is already added");
      return;
    }
    setValue("imageUrls", [...watchedImageUrls, url], { shouldDirty: true });
    setImageInput("");
    setImageError("");
  };

  const handleRemoveImage = (index: number) => {
    setValue(
      "imageUrls",
      watchedImageUrls.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
  };

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
        {/* ── Header ── */}
        <Box
          sx={{
            px: 4,
            py: 3,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
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

          <FormControlLabel
            control={
              <Switch
                checked={watchedForSale}
                onChange={(e) =>
                  setValue("forSale", e.target.checked, { shouldDirty: true })
                }
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "white" },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: "rgba(255,255,255,0.5)",
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" color="white" fontWeight={600}>
                {watchedForSale ? "Listed for Sale" : "Not for Sale"}
              </Typography>
            }
            sx={{ mr: 0 }}
          />
        </Box>

        {!isNew && !isEdit && !existingProduct && (
          <Alert severity="info" sx={{ mx: 4, mt: 3 }}>
            No product found with this ID. You can create a new product below.
          </Alert>
        )}

        {/* ── Form ── */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
          <Box container spacing={3}>
            {/* ── Row 1: Images — full width ── */}
            <Box item xs={12}>
              <Typography variant="subtitle2" fontWeight={600} mb={1}>
                Product Images{" "}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  (up to {MAX_IMAGES}, first image is the cover)
                </Typography>
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  value={imageInput}
                  onChange={(e) => {
                    setImageInput(e.target.value);
                    setImageError("");
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddImage())
                  }
                  placeholder="https://example.com/image.jpg"
                  size="small"
                  fullWidth
                  error={!!imageError}
                  helperText={imageError || " "}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageOutlined fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddImage}
                  startIcon={<AddPhotoAlternate />}
                  disabled={watchedImageUrls.length >= MAX_IMAGES}
                  sx={{
                    flexShrink: 0,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    alignSelf: "flex-start",
                    mt: "2px",
                  }}
                >
                  Add
                </Button>
              </Box>

              {watchedImageUrls.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    flexWrap: "wrap",
                    paddingBottom: "16px",
                  }}
                >
                  {watchedImageUrls.map((url, i) => (
                    <Box
                      key={i}
                      sx={{
                        position: "relative",
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "2px solid",
                        borderColor: i === 0 ? "primary.main" : "divider",
                      }}
                    >
                      <Box
                        component="img"
                        src={url}
                        alt={`preview-${i}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement>,
                        ) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/80?text=Error";
                        }}
                      />
                      {i === 0 && (
                        <Chip
                          label="Cover"
                          size="small"
                          color="primary"
                          sx={{
                            position: "absolute",
                            bottom: 2,
                            left: 2,
                            fontSize: "0.55rem",
                            height: 16,
                            "& .MuiChip-label": { px: 0.5 },
                          }}
                        />
                      )}
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(i)}
                        sx={{
                          position: "absolute",
                          top: 1,
                          right: 1,
                          bgcolor: "rgba(0,0,0,0.5)",
                          color: "white",
                          p: 0.25,
                          "&:hover": { bgcolor: "error.main" },
                        }}
                      >
                        <DeleteOutline sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* ── Row 2: Product Name — full width ── */}
            <Box item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Product name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  maxLength: {
                    value: MAX_NAME,
                    message: `Maximum ${MAX_NAME} characters`,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={
                      errors.name?.message ??
                      `${watchedName.length}/${MAX_NAME}`
                    }
                    inputProps={{ maxLength: MAX_NAME }}
                  />
                )}
              />
            </Box>
            {/* ── Row 3: Brand | Price | Stock — equal thirds ── */}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box sx={{ width: { xs: "100%", sm: "33%" } }}>
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: "Brand is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Brand"
                      fullWidth
                      error={!!errors.brand}
                      helperText={errors.brand?.message || " "}
                      placeholder="Select brand"
                    >
                      {BRANDS.map((b) => (
                        <MenuItem key={b} value={b}>
                          {b}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>

              <Box item xs={12} sm={4}>
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
                      helperText={errors.price?.message || " "}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </Box>

              <Box item xs={12} sm={4}>
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
                      helperText={errors.stock?.message || " "}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* ── Row 4: Description — full width ── */}
            <Box item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  minLength: { value: 10, message: "Minimum 10 characters" },
                  maxLength: {
                    value: MAX_DESC,
                    message: `Maximum ${MAX_DESC} characters`,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={
                      errors.description?.message ??
                      `${watchedDesc.length}/${MAX_DESC}`
                    }
                    inputProps={{ maxLength: MAX_DESC }}
                  />
                )}
              />
            </Box>
          </Box>

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
