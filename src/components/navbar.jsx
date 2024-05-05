/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Storefront } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CartContext } from '../context/cart.jsx'
import { useContext } from 'react'
import { ToastContainer} from 'react-toastify';




//Navigation Links
const pages = [
  { text: "Assets", href: "/assets" },
  { text: "Transaction History", href: "/transactions" },
  { text: "Checkout", href: "/checkout" },
];

//Avatar Links
//const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
 
  const { cartItems, toggle, showModal} = useContext(CartContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Storefront sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
         
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SimpleTrade
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link to={page.href} style={{ textDecoration: "none" }}>
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color="black">
                      {page.text}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Storefront sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          > 
            SimpleTrade
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.href} style={{ textDecoration: "none" }}>
                <Button
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <ToastContainer />
            
            <div className="flex justify-between items-center px-200 py-5">
        {!showModal && <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
          onClick={toggle}
        >Cart ({cartItems.length})</button>}
        </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
