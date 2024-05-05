/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import {
  Typography,
} from "@mui/material";
import BasicGrid from "../components/BasicGrid.jsx";


export default function App() {

  return (
    <>
        <Typography
          variant="h4"
          align="center"
          marginTop={2}
          marginBottom={1}
          sx={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
          }}
        >
          Welcome to SimpleTrade.
        </Typography>
        <BasicGrid />
    </>
  );
}
