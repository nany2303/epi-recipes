import React, { useState } from "react";
import Header from "./Header";
import RecipeComponent from "./RecipeComponent";
import "./RecipeContainer.css";
import { Button } from "@mui/material";
import { RecipePopUp } from "./RecipePopUp";

export const RecipeContainer = ({
  title,
  search,
  setTitle,
  recipes,
  previousButton,
  nextButton,
  previousPage,
  nextPage,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (recipe, imagePath) => {
    setSelectedRecipe(recipe);
    setImagePath(imagePath);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  return (
    <div className="recipe_container">
      <div className="recipe_main_container">
        {recipes.map((item, index) => {
          const imagePath = `/images/${index+1}.jpg`
          return (
            <>
              <RecipeComponent
                key={index}
                item={item}
                index={index}
                onClick={()=>handleOpen(item, imagePath)}
              />
            </>
          );
        })}
      </div>
      <div className="button-container">
        {previousButton && (
          <Button
            onClick={() => previousPage()}
            variant="contained"
            style={{
              fontWeight: "600",
              backgroundColor: "#3D52A0",
              borderRadius: 5,
            }}
          >
            Previous
          </Button>
        )}
        <div style={{ width: 30 }}></div>
        {nextButton && (
          <Button
            onClick={() => nextPage()}
            variant="contained"
            style={{
              fontWeight: "600",
              backgroundColor: "#3D52A0",
              borderRadius: 5,
            }}
          >
            Next
          </Button>
        )}
      </div>
      <RecipePopUp item={selectedRecipe} open={open} handleClose={handleClose} imagePath={imagePath} />
    </div>
  );
};
