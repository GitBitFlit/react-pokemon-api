// import React from "react"
import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from 'font-awesome'
import "bootstrap/dist/css/bootstrap.min.css";

// const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon/";
// can update limit as required [1154]
const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154";

const Pokemon = () => {
  const [pokemonState, setPokemonState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("All");
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

  const handlePokeSelected = (pokeURL) => {
    console.log(pokeURL);
  };

  let filteredPokemon = pokemonState;
  if (searchQuery) {
    filteredPokemon = pokemonState.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // filter by generation w/ number as id
  // https://pokeapi.co/api/v2/generation/2

  const handleGenerationSelected = (g) => {
    const generation = Number(g);
    console.log(generation);
    fetch(`https://pokeapi.co/api/v2/generation/${generation}`).then((res) => {
      res.json().then((data) => {
        console.log(data.id);
        console.log(data.names);
        console.log(data.pokemon_species);
        setPokemonState(data.pokemon_species);
        // filteredPokemon = data.pokemon_species;
        console.log(filteredPokemon, "filtered pokemon after g selection");
        setSelectedGeneration(g);
      });
    });
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
        <p>Showing generation {selectedGeneration}</p>
        <button
          onClick={() => handleGenerationSelected(1)}
          className="btn btn-dark"
        >
          Generation 1
        </button>
        <button className="btn btn-dark">Generation 2</button>
        {/* map buttons from BED? and set selected state / display somewhere */}
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
