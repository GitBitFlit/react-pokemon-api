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

  const handleAddToFavourites = (poke) => {
    // console.log(favouritePokemon, "fave poke");
    const findPoke = favouritePokemon.find((p) => p.name === poke.name);
    if (!findPoke) {
      // const favePokemon = { ...favouritePokemon };
      // console.log(favePokemon);
      // favePokemon.push(poke);

      setFavouritePokemon((favouritePokemon) => [poke, ...favouritePokemon]);
      // setFavouritePokemon(...favouritePokemon, poke);
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
