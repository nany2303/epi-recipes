import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import RecipeComponent from "./components/RecipeComponent";
import Header from "./components/Header";
import { RecipeContainer } from "./components/RecipeContainer";
import { SideFilterBar } from "./components/SideFilterBar";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [nextButton, setNextButton] = useState(true);
  const [previousButton, setPreviousButton] = useState(false);
  const [data, setData] = useState({ page: 1 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = [
    "Sandwich",
    "Bean",
    "Fruit",
    "Tomato",
    "turkey",
    "Vegetable",
    "Kid-Friendly",
    "Apple",
    "Lentil",
    "Lettuce",
    "Cookie",
  ];
  const sort_by_values = ["protein", "calories", "sodium", "fat", "rating"];

  const getRecipes = async () => {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:5000/search_recipes",
      data
    );
    setRecipes(response.data?.hits);
    if (response.data?.hits?.length === 0) {
      setNextButton(false);
    } else {
      if (nextButton === false) {
        setNextButton(true);
      }
    }
    if (data["page"] === 1) {
      setPreviousButton(false);
    } else {
      if (previousButton === false) {
        setPreviousButton(true);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const nextPage = () => {
    data["page"] = page + 1;
    setPage(page + 1);
    getRecipes();
  };

  const previousPage = () => {
    data["page"] = page - 1;
    setPage(page - 1);
    getRecipes();
  };

  const search = (title) => {
    data["title"] = title;
    getRecipes();
  };

  const apply = () => {
    getRecipes();
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="container">
      <Header search={search} setTitle={setTitle} title={title} />
      <div className="sub_container">
        <SideFilterBar
          data={data}
          apply={apply}
          setData={setData}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          sort_by_values={sort_by_values}
        />
        {loading === true ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? <CircularProgress /> : <div>Data Loaded</div>}
          </Box>
        ) : (
          <RecipeContainer
            title={title}
            search={search}
            setTitle={setTitle}
            recipes={recipes}
            previousButton={previousButton}
            nextButton={nextButton}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
