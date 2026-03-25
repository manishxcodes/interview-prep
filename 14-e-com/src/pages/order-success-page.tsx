import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { CheckCircle, Home, Inventory } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c - 1), 1000);
    const timeout = setTimeout(() => navigate("/"), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          textAlign: "center",
        }}
      >
        {/* Success icon */}
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            bgcolor: "success.light",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <CheckCircle sx={{ fontSize: 56, color: "success.main" }} />
        </Box>

        <Typography variant="h4" fontWeight={700} gutterBottom>
          Order Placed!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={1}>
          Thank you for your purchase. Your order has been confirmed.
        </Typography>
        <Typography variant="body2" color="text.disabled" mb={4}>
          Stock has been updated. Redirecting to home in {count}s...
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Inventory />}
            onClick={() => navigate("/my-products")}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            My Products
          </Button>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccessPage;
