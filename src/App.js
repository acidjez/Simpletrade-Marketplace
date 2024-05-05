/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams
James Cockram
*/
import React from "react";
import Router from "./components/Router";
import NavBar from "./components/navbar.jsx";
import theme from "./themes.js";
import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline>
         <ThemeProvider theme={theme}>
        <NavBar />
        <Router />
        </ThemeProvider>
        </CssBaseline>
      </div>
    );
  }
}

export default App;
