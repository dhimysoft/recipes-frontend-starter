import { useState, useEffect } from "react";
import "./App.css";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";

// This is your base URL for your API
const API_URL = "http://localhost:8080";

export default function App() {
  // `recipes` is just a local snapshot — a successful request below won't show up
  // on screen until you also call setRecipes. The server and this state don't auto-sync.
  // AGAIN, the frontend UI state and the server data don't auto-sync - you must do this manually!
  // WHAT DOES THAT MEAN: Just becuase you were able to modify the state/data in the server with the fetch calls, doesn't mean the UI will reflect that automatically.
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // TODO (Part 1): fetch `${API_URL}/api/recipes`, convert the response to JSON, and setRecipes with it

    const myRequest = new Request(`${API_URL}/api/recipes`);

    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Could not load recipes:", error);
      });
  }, []);

  //   useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`${API_URL}/api/recipes`);
  //     const data = await response.json();

  //     setRecipes(data);
  //   }

  //   fetchData();
  // }, []);

  function handleAddRecipe(newRecipe) {
    // TODO (Part 2): POST newRecipe to `${API_URL}/api/recipes`, then add the created recipe to `recipes`

    console.log("recipe in the handler>>", newRecipe);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    };

    fetch(API_URL + "/api/recipes", fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        setRecipes((currentRecipes) => [...currentRecipes, data]);
      })
      .catch((error) => {
        console.error("Could not add recipe:", error);
      });
  }

  function handleDeleteRecipe(id) {
    // TODO (Part 3): DELETE `${API_URL}/api/recipes/${id}`, then remove that recipe from `recipes`

    fetch(`${API_URL}/api/recipes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setRecipes((currentRecipes) =>
          currentRecipes.filter((recipe) => recipe.id !== id)
        );
      })
      .catch((error) => {
        console.error("Could not delete recipe:", error);
      });
  }

  function handleToggleVegetarian(id, recObj) {
    console.log(id, recObj);

    // TODO (Stretch): PATCH `${API_URL}/api/recipes/${id}` to flip `vegetarian`, then update `recipes`

    const isVegetarian = recObj.vegetarian;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vegetarian: !isVegetarian,
      }),
    };

    fetch(`${API_URL}/api/recipes/${id}`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        setRecipes((currentRecipes) =>
          currentRecipes.map((rec) => {
            if (rec.id === id) {
              return data;
            }

            return rec;
          })
        );
      })
      .catch((error) => {
        console.error("Could not update recipe:", error);
      });
  }

  return (
    <div id="app">
      <h1>Recipes</h1>
      <RecipeForm onAdd={handleAddRecipe} />
      <RecipeList
        recipes={recipes}
        onDelete={handleDeleteRecipe}
        onToggleVegetarian={handleToggleVegetarian}
      />
    </div>
  );
}
