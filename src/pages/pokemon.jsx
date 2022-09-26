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
                  alt={poke.name} // to consider better alt text, stating 'image' is uncessary
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
