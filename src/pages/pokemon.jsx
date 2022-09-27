import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// can update limit as required [1154]
const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154";

const Pokemon = ({ onAddToFavourites, onFavouriteClass, formatName }) => {
  const [pokemonState, setPokemonState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("All");

  useEffect(() => {
    fetch(pokemonEndPoint).then((res) => {
      res.json().then((data) => {
        setPokemonState(data.results);
      });
    });
  }, []);

  let filteredPokemon = pokemonState;
  if (searchQuery) {
    // setSelectedGeneration("All");
    filteredPokemon = pokemonState.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const displayGenerationStatement = () => {
    if (selectedGeneration === "All") {
      return "Showing all Generations";
    } else {
      return `Showing Generation ${selectedGeneration}`;
    }
  };

  const handleGenerationSelected = (g) => {
    if (selectedGeneration === g) {
      fetch(pokemonEndPoint).then((res) => {
        res.json().then((data) => {
          setPokemonState(data.results);
          setSelectedGeneration("All");
        });
      });
      return;
    }
    const generation = Number(g);
    fetch(`https://pokeapi.co/api/v2/generation/${generation}`).then((res) => {
      res.json().then((data) => {
        setPokemonState(data.pokemon_species);
        setSelectedGeneration(g);
      });
    });
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

  var generations = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <div>
        <input
          type="text"
          name="search-pokemon"
          id="search-pokemon"
          placeholder="Search Pokemon..."
          className="search-input m-3"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.currentTarget.value);
          }}
        ></input>
      </div>

      <div>{displayGenerationStatement()}</div>

      <div>
        {generations.map((g) => {
          return (
            <button
              key={g}
              onClick={() => handleGenerationSelected(g)}
              className="btn btn-info m-2"
            >
              Generation {g}
            </button>
          );
        })}
      </div>

      <div className="d-flex flex-wrap pokemon-grid">
        {filteredPokemon?.map((poke) => {
          return (
            <div key={poke.url}>
              {" "}
              <div className="card m-3" style={{ width: 200 }}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId(
                    poke.url
                  )}.png`}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src =
                      "https://cdn.pixabay.com/photo/2016/09/01/09/31/pokemon-1635610_1280.png";
                  }}
                  className="card-image-top"
                  alt={poke.name} // to consider better alt text, stating 'image' is unnecessary
                ></img>
                <div>
                  <Link to={pokeSlug(poke.url)} className="btn btn-link m-3">
                    {formatName(poke.name)}
                  </Link>

                  <i
                    onClick={() => onAddToFavourites(poke)}
                    className={onFavouriteClass(poke.name)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Pokemon;
