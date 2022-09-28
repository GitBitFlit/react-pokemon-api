import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "src/styles/index.css";
import NavBar from "./components/navbar";
import Pokemon from "./pages/pokemon";
import Poke from "./pages/poke";
import Favourites from "./pages/favourites";
import "font-awesome/css/font-awesome.css";

function App() {
  const storedPokemon =
    JSON.parse(localStorage.getItem("favouritePokemon")) || [];
  const [favouritePokemon, setFavouritePokemon] = useState(storedPokemon);

  useEffect(() => {
    const data = window.localStorage.getItem("favouritePokemon");

    if (data !== null) {
      setFavouritePokemon(JSON.parse(data));
      console.log(favouritePokemon, "load persist storage");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "favouritePokemon",
      JSON.stringify([...favouritePokemon])
    );
    console.log(favouritePokemon, "useEffect set Fave Pokemon");
  }, [favouritePokemon]);

  let handleFavouriteClass = "clickable fa fa-heart";

  const handleAddToFavourites = (poke) => {
    const findPoke = favouritePokemon.find((p) => p.name === poke.name);
    if (!findPoke) {
      console.log("fave icon");
      setFavouritePokemon((favouritePokemon) => [poke, ...favouritePokemon]);
      handleFavouriteClass += "-o";
      console.log(handleFavouriteClass, "heart icon");
    }

    if (findPoke) {
      const favouritedPokemon = [...favouritePokemon];
      const index = favouritedPokemon.findIndex((p) => p.url === poke.url);
      const removedPokemon = favouritedPokemon.splice(index, 1);
      console.log(removedPokemon, "removed pokemon");
      setFavouritePokemon(favouritedPokemon);
    }
  };

  const handleRemoveFromFavourites = (poke) => {
    console.log(poke, "poke to remove from favourites");
    let filteredFavouriteList = favouritePokemon.filter(
      (p) => p.url !== poke.url
    );
    setFavouritePokemon(filteredFavouriteList);
  };

  const onFavouriteClass = (name) => {
    const findPoke = favouritePokemon.find((p) => p.name === name);
    return findPoke ? "clickable fa fa-heart" : "clickable fa fa-heart-o";
  };

  const formatName = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : name;
  };

  const pokeSlug = (pokeUrl) => {
    return `/pokemon/${
      pokeUrl.includes("pokemon-species")
        ? pokeUrl.match(/(?<=pokemon-species\/)\d[^]*/)[0]
        : pokeUrl.match(/(?<=pokemon\/)\d[^]*/)[0]
    }`;
  };

  const pokeId = (pokeUrl) => {
    return pokeUrl.includes("pokemon-species")
      ? pokeUrl.match(/(?<=pokemon-species\/)\d[^\/]*/)[0]
      : pokeUrl.match(/(?<=pokemon\/)\d[^\/]*/)[0];
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/pokemon/:pokeId"
          element={<Poke formatName={(name) => formatName(name)} />}
        />
        <Route
          path="/"
          element={
            <Pokemon
              onAddToFavourites={(poke) => handleAddToFavourites(poke)}
              onFavouriteClass={(poke) => onFavouriteClass(poke)}
              formatName={(name) => formatName(name)}
              pokeId={(pokeUrl) => pokeId(pokeUrl)}
              pokeSlug={(pokeUrl) => pokeSlug(pokeUrl)}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              favouritePokemon={favouritePokemon}
              onRemoveFromFavourites={handleRemoveFromFavourites}
              formatName={(name) => formatName(name)}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
