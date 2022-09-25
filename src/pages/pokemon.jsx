// import React from "react"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "font-awesome";
import "bootstrap/dist/css/bootstrap.min.css";

// const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon/";
// can update limit as required [1154]
const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154";

// or (props) and then props.onAddToFavourites below
const Pokemon = ({ onAddToFavourites, onFavouriteClass, formatName }) => {
  const [pokemonState, setPokemonState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("All");
  // should you always use state terminology https://reactjs.org/docs/hooks-rules.html#explanation
  // const [favouriteState, setFavouriteState] = useState([]);
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

  // const handlePokeSelected = (pokeURL) => {
  //   // console.log(pokeURL);
  //   console.log(pokeURL, "PokeURL");
  //   console.log(
  //     pokeURL.includes("pokemon-species"),
  //     "pokemon-species included"
  //   );
  //   const id = pokeURL.match(/(?<=pokemon\/)\d[^\/]*/)[0]; // regex returns an array
  //   console.log("id", id, "id here");
  //   // to={`/pokemon/${p.url.match(/(?<=pokemon\/)\d[^\/]*/)[0]}`}
  // };

  let filteredPokemon = pokemonState;
  if (searchQuery) {
    filteredPokemon = pokemonState.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // filter by generation w/ number as id
  // https://pokeapi.co/api/v2/generation/2

  const displayGenerationStatement = () => {
    if (selectedGeneration === "All") {
      return "Showing all Generations";
    } else {
      return `Showing Generation ${selectedGeneration}`;
    }
  };

  const handleGenerationSelected = (g) => {
    // console.log(generation, "g here");
    console.log(selectedGeneration, "g here");
    if (selectedGeneration === g) {
      // want to de-select and unformat selected button
      fetch(pokemonEndPoint).then((res) => {
        res.json().then((data) => {
          setPokemonState(data.results);
          setSelectedGeneration("All");
        });
      });
      console.log("do nothing");
      return;
    }
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

  // const handleFavourite = (poke) => {
  //   // pass up to app.js
  // };

  // when do you call it handle... https://javascript.plainenglish.io/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364

  // const faveClass = (poke) => {
  //   // console.log("faveclass for pokemon");
  //   return "fa fa-heart";
  // };

  // const faveClass = (name) => {
  //   return name === "ivysaur" ? "fa fa-heart" : "fa fa-heart-o";
  // };

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
        <p>{displayGenerationStatement()}</p>
        <button
          onClick={() => handleGenerationSelected(1)}
          className="btn btn-dark m-2"
        >
          Generation 1
        </button>
        <button
          onClick={() => handleGenerationSelected(2)}
          className="btn btn-dark m-2"
        >
          Generation 2
        </button>
        <button
          onClick={() => handleGenerationSelected(3)}
          className="btn btn-dark m-2"
        >
          Generation 3
        </button>
        <button
          onClick={() => handleGenerationSelected(4)}
          className="btn btn-dark m-2"
        >
          Generation 4
        </button>
        <button
          onClick={() => handleGenerationSelected(5)}
          className="btn btn-dark m-2"
        >
          Generation 5
        </button>
        <button
          onClick={() => handleGenerationSelected(6)}
          className="btn btn-dark m-2"
        >
          Generation 6
        </button>
        <button
          onClick={() => handleGenerationSelected(7)}
          className="btn btn-dark m-2"
        >
          Generation 7
        </button>
        <button
          onClick={() => handleGenerationSelected(8)}
          className="btn btn-dark m-2"
        >
          Generation 8
        </button>
        {/* map buttons from BED? and set selected state / display somewhere */}
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Pokemon</th>
              {/* <th>URL</th> */}
              {/* <th>Generation</th> */}
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemon?.map((poke) => {
              return (
                <tr key={poke.url}>
                  <td>{formatName(poke.name)}</td>
                  {/* <td>{poke.url}</td> */}
                  {/* <td>Map generation here?</td> */}
                  <td>{/* <i className="fa-solid fa-heart"></i> */}</td>
                  {/* <td>
                    <button
                      onClick={() => onAddToFavourites(poke)}
                      className="btn btn-danger m-3"
                    >
                      Favourite
                    </button>
                  </td> */}
                  <td>
                    <i
                      onClick={() => onAddToFavourites(poke)}
                      // className={onFavouriteClass}
                      // className={faveClass}
                      className={onFavouriteClass(poke.name)}
                    ></i>
                  </td>
                  <td>
                    {/* <button onClick={() => handlePokeSelected(p.url)}>
                      View
                    </button> */}
                    <Link
                      to={`/pokemon/${
                        poke.url.includes("pokemon-species")
                          ? poke.url.match(/(?<=pokemon-species\/)\d[^]*/)[0]
                          : poke.url.match(/(?<=pokemon\/)\d[^]*/)[0]
                      }`}
                      className="btn btn-info m-3"
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
