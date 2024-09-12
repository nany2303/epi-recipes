import React, { useState } from "react";
import "./SideFilterBar.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const SideFilterBar = ({
  data,
  apply,
  setData,
  categories,
  selectedCategories,
  setSelectedCategories,
  sort_by_values,
}) => {
  const [selectedSortByValue, setSelectedSortByValue] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("");
  const handleCheckboxChange = (event) => {
    const category = event.target.name;
    const getNewCategories = () => {
      if (selectedCategories.includes(category)) {
        return selectedCategories.filter((c) => c !== category);
      } else {
        return [...selectedCategories, category];
      }
    };
    const new_categories = getNewCategories();
    setSelectedCategories(new_categories);
    data["categories"] = new_categories;
    setData(data);
  };
  const handleDropDownChange = (event) => {
    const sort_by_value = event.target.value;
    data["sort_by"] = sort_by_value;
    setData(data);
    setSelectedSortByValue(sort_by_value);
  };

  const handleSortOrderChange = (event) => {
    const sortOrder = event.target.value;
    data["sort_order"] = sortOrder;
    setData(data);
    setSelectedSortOrder(sortOrder);
  }
  return (
    <div className="side_bar_main_container">
      <div className="categories_container">
        <FormControl fullWidth>
          <InputLabel id="filter-select-label" style={{ fontWeight: "600" }}>
            Filter
          </InputLabel>
          <Select
            style={{ width: 200 }}
            labelId="filter-select-label"
            id="filter-select"
            value={selectedSortByValue}
            onChange={handleDropDownChange}
            label="Filter"
          >
            <MenuItem value="rating" name="rating">
              Rating
            </MenuItem>
            <MenuItem value="protein">Protein</MenuItem>
            <MenuItem value="calories">Calories</MenuItem>
            <MenuItem value="fat">Fat</MenuItem>
            <MenuItem value="sodium">Sodium</MenuItem>
          </Select>
        </FormControl>
        <div style={{height:20}}></div>
        <FormControl fullWidth>
          <InputLabel id="filter-select-order" style={{ fontWeight: "600" }}>
            Sort
          </InputLabel>
          <Select
            style={{ width: 200 }}
            labelId="filter-select-order"
            id="filter-order"
            value={selectedSortOrder}
            onChange={handleSortOrderChange}
            label="Sort"
          >
            <MenuItem value="desc">High</MenuItem>
            <MenuItem value="asc">Low</MenuItem>
          </Select>
        </FormControl>
        <Typography
          variant="h6"
          component="p"
          fontWeight={"600"}
          gutterBottom
          style={{ marginTop: 20 }}
        >
          Categories
        </Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  // checked={selectedCategories.includes(category)}
                  onChange={handleCheckboxChange}
                  name={category}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </div>
      <Button
        onClick={() => apply()}
        variant="contained"
        style={{ backgroundColor: "#3D52A0" }}
      >
        Apply
      </Button>
    </div>
  );
};
