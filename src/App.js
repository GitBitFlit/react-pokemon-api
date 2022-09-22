import React from "react";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import "src/styles/index.css";
import NavBar from "./components/navbar";
import Pokemon from "./pages/pokemon";
import Poke from "./pages/poke";
// import App from "./App";
import Favourites from "./pages/favourites";
// import reportWebVitals from "./reportWebVitals";
import "font-awesome/css/font-awesome.css";
import { useState } from "react";

function App() {
  const [favouritePokemon, setFavouritePokemon] = useState([]);

  const handleAddToFavourites = (poke) => {
    console.log(poke, "poke to add to favourites");
  };
  const handleRemoveFromFavourites = (poke) => {
    console.log(poke, "poke to remove from favourites");
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/pokemon/:pokeId" element={<Poke />} />
        <Route
          path="/"
          element={
            <Pokemon
              onAddToFavourites={(poke) => handleAddToFavourites(poke)}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favouritePokemon}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
