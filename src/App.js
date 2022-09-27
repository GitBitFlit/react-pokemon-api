import React, { useState, useEffect } from "react";
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

function App() {
  const storedPokemon =
    JSON.parse(localStorage.getItem("favouritePokemon")) || [];
  const [favouritePokemon, setFavouritePokemon] = useState(storedPokemon);

  useEffect(() => {
    const data = window.localStorage.getItem("favouritePokemon");
    console.log(data, "get data"); // why is it empty?
    // setFavouritePokemon(JSON.parse(data));

    if (data !== null) {
      //   localStorage.getItem(
      //     "favouritePokemon",
      //     JSON.stringify(favouritePokemon)
      //   );
      setFavouritePokemon(JSON.parse(data));
      console.log(favouritePokemon, "load persist storage");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "favouritePokemon",
      JSON.stringify([...favouritePokemon])
    );
    //   }, [favouritePokemon]);
    console.log(favouritePokemon, "useEffect set Fave Pokemon");
  }, [favouritePokemon]);

  //   var retrievedObject = localStorage.getItem("favouritePokemon");
  //   console.log("retrievedObject: ", JSON.parse(retrievedObject));
  let handleFavouriteClass = "clickable fa fa-heart";

  const handleAddToFavourites = (poke) => {
    // console.log(favouritePokemon, "fave poke");
    const findPoke = favouritePokemon.find((p) => p.name === poke.name);
    if (!findPoke) {
      // const favePokemon = { ...favouritePokemon };
      // console.log(favePokemon);
      // favePokemon.push(poke);
      console.log("fave icon");
      setFavouritePokemon((favouritePokemon) => [poke, ...favouritePokemon]);
      handleFavouriteClass += "-o";
      console.log(handleFavouriteClass, "heart icon");
      // setFavouritePokemon(...favouritePokemon, poke);
    }

    if (findPoke) {
      // remove from list
      const favouritedPokemon = [...favouritePokemon];
      const index = favouritedPokemon.findIndex((p) => p.url === poke.url);
      // splice
      const removedPokemon = favouritedPokemon.splice(index, 1);
      console.log(removedPokemon, "removed pokemon");
      // update state
      setFavouritePokemon(favouritedPokemon);
    }

    // console.log(findPoke, "poke found?");
    // console.log(poke, "poke to add to favourites");
  };

  const handleRemoveFromFavourites = (poke) => {
    console.log(poke, "poke to remove from favourites");
    // const index = favouritePokemon.findIndex((p) => p.url === poke.url);
    // console.log(index, "index to remove");
    // favouritePokemon.splice(index, 1);
    // setFavouritePokemon(favouritePokemon);

    let filteredFavouriteList = favouritePokemon.filter(
      (p) => p.url !== poke.url
    );
    setFavouritePokemon(filteredFavouriteList);
  };

  const onFavouriteClass = (name) => {
    const findPoke = favouritePokemon.find((p) => p.name === name);
    // if (!findPoke) {
    return findPoke ? "clickable fa fa-heart" : "clickable fa fa-heart-o";
    // return "fa fa-heart";
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

      {/* <div>
        {favouritePokemon.map((poke) => {
          return (
            <div>
              <p key={poke.url}>{poke.name}</p>
            </div>
          );
        })}
      </div> */}

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
