import React, { useState } from "react";
import "./RecipeComponent.css";


function RecipeComponent({ item, index, onClick }) {
  const imagePath = `/images/${index + 1}.jpg`;
  return (
    <>
      <div className="recipe_component_container" onClick={onClick}>
        <img className="recipe_image" src={imagePath} alt="" />
        <p className="ellipsis main-text">{item?._source?.title}</p>
        <p className="main-text">Rating : {item?._source?.rating}</p>
      </div>
    </>
  );
}

export default RecipeComponent;
