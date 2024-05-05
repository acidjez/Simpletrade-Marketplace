/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import assets from "../assets/DummyData.json";
import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function HotItem() {
  const filteredData = assets.filter((el) => {
    return el.isFeatured.includes("true");
  });
  return (
    <Grid container spacing={2}>
      <Typography
        variant="h6"
        align="center"
        marginTop={1}
        marginBottom={1}
        color="black"
        sx={{
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
        }}
      >
        Featured presidents
      </Typography>
      {filteredData.map((item) => (
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
          <Link to={"/assets/" + item.id}>
          <Grid container>
            <Grid item xs={6} sm={6} md={6}>
              <ImageList>
                <ImageListItem>
                  <img
                    src={`${item.img}`}
                    srcSet={`${item.img}`}
                    alt={item.title}
                    style={{ borderRadius: "5px", marginLeft: "20px" }}
                    loading="lazy"
                  />
                </ImageListItem>
              </ImageList>
            </Grid>
            <Grid item xs={6} md={5} sm={5}>
              
              <Typography variant="h6" marginTop={2} align="center">
                {item.title}
              </Typography>
              <Typography variant="body2">${item.price}</Typography>
            </Grid>
            
          </Grid>
          </Link>
        </Paper>
      ))}
    </Grid>
    // </Box>
  );
}
