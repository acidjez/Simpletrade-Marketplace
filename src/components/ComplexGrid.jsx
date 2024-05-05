/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/cart.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const notifyAddedToCart = (item) =>
  toast.success(`${item.title} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#fff",
      color: "#000",
    },
  });

export default function ComplexGrid({ assets }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 1500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >

      <Box sx={{ flexGrow: 10 }}>
        <Grid container spacing={5}>
          {assets.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Item elevation={8}>
                <ImageListItem>
                  <Link to={"/assets/" + item.id}>
                    <img
                      src={`${item.img}`}
                      srcSet={`${item.img}`}
                      alt={item.title}
                      style={{ borderRadius: "5px" }}
                      loading="lazy"
                    />{" "}
                  </Link>
                  <ImageListItemBar
                    title={item.title}
                    subtitle={
                      <Typography variant="body2">{item.price}: ETH</Typography>
                    }
                    style={{ borderRadius: "5px" }}
                    actionIcon={
                      <div>
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${item.title}`}
                        >
                          <AddShoppingCartIcon
                            onClick={() => {
                              addToCart(item);
                              notifyAddedToCart(item);
                            }}
                          />
                        </IconButton>
                      </div>
                    }
                  />
                </ImageListItem>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
