// import React from "react"
import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from 'font-awesome'
import "bootstrap/dist/css/bootstrap.min.css";

const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon/";

const Pokemon = () => {
  const [pokemonState, setPokemonState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGeneration, setFilterGeneration] = useState("All");

  useEffect(() => {
    fetch(pokemonEndPoint).then((res) => {
      res.json().then((data) => {
        setPokemonState(data.results);
        // console.log(data.results, "poke");
        // console.log(data.results[0], "0");
      });
    });
  }, []);

  let filteredPokemon = pokemonState;
  if (searchQuery) {
    filteredPokemon = pokemonState.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handlePokeSelected = (pokeURL) => {
    console.log(pokeURL);
  };

  // when mapping use .?
  return (
    <>
      <div>
        <input
          type="text"
          name="search-pokemon"
          id="search-pokemon"
          placeholder="Search Pokemon..."
          className="search-input"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.currentTarget.value);
          }}
        ></input>
        {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
        {/* add a clear / cross button */}
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Pokemon</th>
              <th>URL</th>
              <th>Generation</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemon?.map((p) => {
              return (
                <tr key={p.url}>
                  <td>{p.name}</td>
                  <td>{p.url}</td>
                  <td>Map generation here?</td>
                  <td>
                    <button
                      onClick={() => {
                        handlePokeSelected(p.url);
                      }}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Pokemon;
