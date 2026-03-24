import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ShoppingCart,
  Inventory,
  AddBox,
  Store,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navLinks = [
    { label: "Home", path: "/", icon: <Store fontSize="small" /> },
    {
      label: "Add Product",
      path: "/product/new",
      icon: <AddBox fontSize="small" />,
    },
    {
      label: "My Products",
      path: "/my-products",
      icon: <Inventory fontSize="small" />,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleNav = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Store sx={{ fontSize: 28, color: "secondary.main" }} />
          <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
            ShopManager
          </Typography>
        </Box>

        {/* Desktop Nav */}
        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                startIcon={link.icon}
                onClick={() => navigate(link.path)}
                variant={isActive(link.path) ? "contained" : "text"}
                color={isActive(link.path) ? "secondary" : "inherit"}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
              >
                {link.label}
              </Button>
            ))}
            <IconButton
              onClick={() => navigate("/cart")}
              color={isActive("/cart") ? "secondary" : "inherit"}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        ) : (
          /* Mobile Nav */
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={() => navigate("/cart")} color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ elevation: 2, sx: { mt: 1, minWidth: 160 } }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  selected={isActive(link.path)}
                  sx={{ gap: 1 }}
                >
                  {link.icon}
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
