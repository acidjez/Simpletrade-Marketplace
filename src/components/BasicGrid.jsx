/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import React from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from '@mui/material/ImageList';
import HotItem from './HotItem';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// layout for homepage
export default function BasicGrid() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    {/* header image */}
                    <Item>   
                        <ImageList cols={1} rowHeight= {200}><ImageListItem>
                    <img
                      src="https://www.wallpaperup.com/uploads/wallpapers/2013/09/28/152556/555bcbbeb3129d9ffe3bda83340e8d88.jpg"            
                      loading="lazy"
                    /></ImageListItem></ImageList>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography
            variant="h5"
            align="center"
            marginTop={1}
            marginBottom={1}
           
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            For all your presidental needs
            </Typography>
        
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Item>
                        <HotItem></HotItem>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Item><Typography
            variant="h5"
            color="black"
            align="center"
            marginTop={1}
            marginBottom={1}
           
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            About Us.
          </Typography>
          <Typography
            variant="p"
            align="center"
            marginTop={1}
            marginBottom={1}
           
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
            }}
          >
            Founded in 2023, we are the quickly becoming the no.1 online store for all your presidental needs.  Powered by blockchain technology, you can be sure your payments are fast and secure.
          </Typography>
          </Item>
                </Grid>
            </Grid>
        </Box>
    )
};
