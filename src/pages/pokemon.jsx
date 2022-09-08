// import React from "react"
import { useState, useEffect } from "react";

const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon/";

const Pokemon = () => {
  const [pokemonState, setPokemonState] = useState([]);

  useEffect(() => {
    fetch(pokemonEndPoint).then((res) => {
      res.json().then((data) => {
        setPokemonState(data.results);
        console.log(data.results, "poke");
        console.log(data.results[0], "0");
      });
    });
  }, []);

  // when mapping use .?
  return (
    <>
      <div>
        {pokemonState.map((p) => {
          return <div>{p.name}</div>;
        })}
      </div>
    </>
  );
};

export default Pokemon;
