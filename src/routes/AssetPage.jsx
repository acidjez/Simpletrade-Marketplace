/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import assets from "../assets/DummyData.json";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import { CartContext } from "../context/cart.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export default function AssetPage() {
  //set asset_id to the parameters included in the URL
  const { asset_id } = useParams();
  //set asset variable to the object found in the dummy data list
  const asset = assets.find((item) => item.id === asset_id);
  const { addToCart } = useContext(CartContext);
  return (
    <div>
      <br />
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
          <Grid container spacing={2}>
            <Grid item>
              <Item>
                <ImageListItem>
                  <img //this image will take from the parameters given to display correct image
                    src={`${asset.img}`}
                    srcSet={`${asset.img}`}
                    alt={`${asset.author}`}
                    style={{
                      borderRadius: "5px",
                      maxHeight: 400,
                      maxWidth: 500,
                    }}
                    loading="lazy"
                    margin="auto"
                  />
                </ImageListItem>
                <br></br>
                <Item className="grid items-center">
                  <button
                    className="px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {  //add item to cart when clicked
                      addToCart(asset);
                      notifyAddedToCart(asset);
                    }}
                  >
                    Add to cart
                  </button>
                  <br></br>
                </Item>
              </Item>
            </Grid>

            <Grid item xs={12} sm container>
              {/* Each of these typography will take from the parameters given to display to correct data*/}
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography display={"inline"} variant="h4">
                  <strong>{asset.title}</strong> {/* ${parameter.title}*/}
                </Typography>
                <Typography
                  display={"inline"}
                  variant="h5"
                  color="text.secondary"
                >
                  by {asset.author}
                </Typography>
                <Typography variant="h6">
                  <strong>Price:</strong> ${asset.price}{" "}
                </Typography>
                <Typography variant="h6">
                  <strong>Category:</strong> {asset.category}{" "}
                </Typography>
                <Divider></Divider>
                <Typography
                  color="text.secondary"
                  display={`inline`}
                  variant="body"
                >
                  {" "}
                  {/* Lorem ipsum as there is no description */}
                  <strong>Description:</strong> {asset.description} Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Ut et placerat
                  mauris, non pretium risus. Aliquam vestibulum nunc nulla, nec
                  vehicula ipsum aliquam eget. Vestibulum nec pharetra quam.
                  Cras quis lacinia mauris. Integer at mollis tellus, eget
                  condimentum augue. Integer feugiat, tortor et efficitur
                  volutpat, leo nibh scelerisque odio, ut vestibulum lacus
                  turpis sed justo. Aenean porta, velit bibendum convallis
                  fringilla, tellus elit lacinia libero, rhoncus rhoncus justo
                  nulla vehicula augue. Ut ac sapien scelerisque, porttitor
                  lectus sit amet, mollis tortor. Donec commodo vestibulum
                  ligula, id finibus dolor pharetra a. Cras malesuada nunc erat,
                  et viverra ante egestas sed. Aenean diam purus, mattis non
                  volutpat rutrum, dictum quis mauris.{" "}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
