// import React from "react"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "font-awesome";
import "bootstrap/dist/css/bootstrap.min.css";

// const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon/";
// can update limit as required [1154]
const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154";

const Pokemon = () => {
  const [pokemonState, setPokemonState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("All");
  // const [filterGeneration, setFilterGeneration] = useState("All");

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
    // console.log(pokeURL);
    console.log(pokeURL, "PokeURL");
    console.log(
      pokeURL.includes("pokemon-species"),
      "pokemon-species included"
    );
    const id = pokeURL.match(/(?<=pokemon\/)\d[^\/]*/)[0]; // regex returns an array
    console.log("id", id, "id here");
    // to={`/pokemon/${p.url.match(/(?<=pokemon\/)\d[^\/]*/)[0]}`}
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
    console.log(generation, "generation");
    fetch(`https://pokeapi.co/api/v2/generation/${generation}`).then((res) => {
      res.json().then((data) => {
        console.log(data.id, "data.id");
        console.log(data.names, "data.names");
        console.log(data.pokemon_species, "data.pokemon_species");
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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemon?.map((p) => {
              return (
                <tr key={p.url}>
                  <td>{p.name}</td>
                  <td>{p.url}</td>
                  <td>Map generation here?</td>
                  <td>{/* <i className="fa-solid fa-heart"></i> */}</td>
                  <td>
                    {/* <button onClick={() => handlePokeSelected(p.url)}>
                      View
                    </button> */}

                    {/* LINK CAUSES GENERATION FILTER ERROR */}
                    <Link
                      onClick={() => {
                        handlePokeSelected(p.url);
                      }}
                      to={`/pokemon/${
                        p.url.includes("pokemon-species")
                          ? p.url.match(/(?<=pokemon-species\/)\d[^\/]*/)[0]
                          : p.url.match(/(?<=pokemon\/)\d[^\/]*/)[0]
                      }`}
                      className="btn btn-info"
                    >
                      View
                    </Link>
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
