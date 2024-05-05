/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useContext } from "react";
import { CartContext } from "../context/cart.jsx";


const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA']; //dummy address data


export default function Review({formData, accounts}) {
    const { cartItems, getCartTotal } = useContext(CartContext);

// order summary component

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.quantity} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {getCartTotal()} ETH                     
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item ={12} >
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{formData.firstName} {formData.lastName}</Typography>
          <Typography gutterBottom>{formData.address1}</Typography>
          <Typography gutterBottom>{formData.address2} </Typography>
          <Typography gutterBottom>{formData.city} {formData.state} {formData.zip} </Typography>
          <Typography gutterBottom>{formData.country} </Typography>
          <Typography gutterBottom>{formData.email} </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
          <Grid item xs={6}>
            Address:
             </Grid>
             <Grid item = {6}>
             <Typography variant= "body2" gutterBottom>
              {accounts}
              </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}