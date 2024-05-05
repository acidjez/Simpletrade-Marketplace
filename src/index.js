/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams
James Cockram
*/
import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from './context/cart.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
          <App/>
      </CartProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
