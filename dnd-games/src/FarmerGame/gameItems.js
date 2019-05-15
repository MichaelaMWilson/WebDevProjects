import img1 from "./assets/fox.png";
import img2 from "./assets/chicken.png";
import img3 from "./assets/grain.png";
import React from "react";

const gameItems = {
    items:
    [
     {id: 'fox', content: <img alt={"fox"} src={img1} style={{width:'90px', height:'90px'}}/> },
     {id: 'chicken', content: <img alt={"chicken"} src={img2} style={{width:'90px', height:'90px'}}/> },
     {id: 'grain', content: <img alt={"grain"} src={img3} style={{width:'90px', height:'90px'}}/> },
    ],
    selected: [],
};

export default gameItems
