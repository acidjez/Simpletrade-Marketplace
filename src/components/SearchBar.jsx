/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import Filter from "./Filter";
import Select from "react-select";
import categories from "../assets/DataCategories.json";

function SearchBar() {
  const [inputText, setInputText] = useState(""); //stores userinout in search bar
  const [category, setCategory] = useState(""); //stores catagory selection
  let inputHandler = (e) => {
    //convert input text to lower case and stores in inutText
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <div className="search">
        <TextField //  searchbar
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
        <Select //catagory bar
          options={categories}
          onChange={(opt) => setCategory(opt.value)}
        />
      </div>
      {/* pass search input and catagory selection to Filter */}
      <Filter props={inputText} category={category} />
    </div>
  );
}
export default SearchBar;
