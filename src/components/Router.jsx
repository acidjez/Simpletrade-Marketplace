/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Assets from "../routes/Assets";
import Transactions from "../routes/Transactions";
import AssetPage from "../routes/AssetPage";
import Cart from "../components/Cart";
import { CartContext } from "../context/cart.jsx";
import { useContext } from "react";

import Checkout from "../checkout/Checkout"
 
export default function Router() {
  const { toggle, showModal } = useContext(CartContext);
  return (
    <div>
<Routes>
<Route path='/' element={<Home/>} />
<Route path='/assets' element={<Assets/>} />
<Route path='/assets/:asset_id' element={<AssetPage/>} />
<Route path='/transactions' element={<Transactions/>} />
<Route path='/checkout' element={<Checkout/>} />
</Routes>
      <Cart showModal={showModal} toggle={toggle} />
    </div>
  );
}
