import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Edit, Delete, AddBox, Search, Inventory } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";

const MyProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, handleDeleteProduct } = useProducts();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()),
  );

  const confirmDelete = () => {
    if (deleteId) {
      handleDeleteProduct(deleteId);
      setDeleteId(null);
    }
  };

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
            My Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your listed products
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
          <Inventory sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products listed
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddBox />}
            onClick={() => navigate("/product/new")}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              mt: 1,
            }}
          >
            Add Your First Product
          </Button>
        </Paper>
      ) : (
        <>
          <TextField
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ mb: 3, maxWidth: 360, width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{ "& th": { fontWeight: 700, bgcolor: "action.hover" } }}
                >
                  <TableCell>Product</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((product) => (
                  <TableRow
                    key={product.id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography fontWeight={600}>{product.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.brand}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600} color="primary.main">
                        ₹{product.price.toLocaleString("en-IN")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={product.stock}
                        size="small"
                        color={product.stock > 0 ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.description}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteId(product.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Delete Product?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. The product will be permanently
            removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setDeleteId(null)}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyProductsPage;
