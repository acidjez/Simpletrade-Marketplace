/*
<<  Group 1-32  >>
Jeremy Giddings 103925859
Benjamin Williams 103619739
James Cockram 103999949
*/
import assets from "../assets/DummyData.json";
import { React} from 'react'
import ComplexGrid from "./ComplexGrid.jsx";

export default function Filter({ props, category }) {
    //create new array containing items from users chosen catagory
    const filteredData = assets.filter((el) => {
        //if catagory selected, return items from chosen catagory
        if (category !== "" && category !== "All") {
            return el.category.includes(category);
        }
        //if no catagory selected, return contents of original data set
        else {
            return el;
        }
    })

    //create new array from array filtered by catagory
    //filter new array by users search word
    const filteredData2 = filteredData.filter((el) => {
        if (props !== "") {
            return el.title.toLowerCase().includes(props);
        }
        else {
            return el;
        }
    })


    return (
        <div>
            {/* pass final filtered array to ComplexGrid */}
            <ComplexGrid assets={filteredData2} /> 
        </div>
    )
}