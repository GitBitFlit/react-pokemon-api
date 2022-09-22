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
    console.log(favouritePokemon, "fave poke");
    const findPoke = favouritePokemon.find((p) => p.name === poke.name);
    if (!findPoke) {
      // const favePokemon = { ...favouritePokemon };
      // console.log(favePokemon);
      // favePokemon.push(poke);

      setFavouritePokemon((favouritePokemon) => [poke, ...favouritePokemon]);
      // setFavouritePokemon(...favouritePokemon, poke);
    }

    // console.log(findPoke, "poke found?");
    console.log(poke, "poke to add to favourites");
  };

  const handleRemoveFromFavourites = (poke) => {
    console.log(poke, "poke to remove from favourites");
  };

  return (
    <>
      <NavBar />
      <div>
        hello
        {favouritePokemon?.map((p) => {
          return <p>{p.name}</p>;
        })}
        {/* {favouritePokemon.name}
        {favouritePokemon[0].name}
        {favouritePokemon[1].name} */}
      </div>
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
              favouritePokemon={favouritePokemon}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
