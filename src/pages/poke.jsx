import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const pokeEndPoint = "https://pokeapi.co/api/v2/pokemon";
const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154";

const Poke = ({ formatName }) => {
  const { pokeId } = useParams();
  const [pokeState, setPokeState] = useState([]);
  const [secondPokeState, setSecondPokeState] = useState([]);
  const [pokemonState, setPokemonState] = useState([]);
  const [isComparisonState, setIsComparisonState] = useState(false);

  useEffect(() => {
    fetch(`${pokeEndPoint}/${pokeId}`).then((res) => {
      res.json().then((data) => {
        setPokeState(data);
        fetch(pokemonEndPoint).then((res) => {
          res.json().then((data) => {
            setPokemonState(data.results);
          });
        });
      });
    });
  }, [pokeId]);

  const handleComparePokemon = () => {
    setIsComparisonState(true);
  };

  const handleCancelComparison = () => {
    setIsComparisonState(false);
    setSecondPokeState([]);
  };

  const handleSecondPokemonSelected = (event) => {
    // console.log(secondPokeState, "2 poke selection");
    const secondPokeId = Number(event.currentTarget.value);
    if (!secondPokeId) {
      setSecondPokeState([]);
      return;
    }
    // console.log(secondPokeId, "second poke ID");
    fetch(`${pokeEndPoint}/${secondPokeId}`).then((res) => {
      res.json().then((data) => {
        setSecondPokeState(data);
        console.log(data, "secondPokeState data");
        console.log(secondPokeState, "secondPokeState");
      });
    });
  };

  const formatHeightOrWeight = (value) => {
    return (value / 10).toFixed(1);
  };

  if (isComparisonState) {
    return (
      <>
        <div>
          <button
            className="btn btn-danger m-3"
            onClick={handleCancelComparison}
          >
            Cancel
          </button>
        </div>
        <div className="d-flex flex-wrap pokemon-grid">
          Poke detail
          <div className="card m-3" style={{ width: 400 }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
              onError={(e) => {
                e.target.onError = null;
                e.target.src =
                  "https://cdn.pixabay.com/photo/2016/09/01/09/31/pokemon-1635610_1280.png";
              }}
              className="card-image-top"
              alt={pokeState.name} // to consider better alt text, image is uncessary
            ></img>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Height (m)</th>
                  <th>Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatName(pokeState.name)}</td>
                  <td>{formatHeightOrWeight(pokeState.height)}</td>
                  <td>{formatHeightOrWeight(pokeState.weight)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card m-3" style={{ width: 400 }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${secondPokeState.id}.png`}
              onError={(e) => {
                e.target.onError = null;
                e.target.src =
                  "https://cdn.pixabay.com/photo/2016/09/01/09/31/pokemon-1635610_1280.png";
              }}
              className="card-image-top"
              alt={secondPokeState.name} // to consider better alt text, stating 'image' is unnecessary
            ></img>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Height (m)</th>
                  <th>Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatName(secondPokeState.name)}</td>
                  <td>{formatHeightOrWeight(secondPokeState.height)}</td>
                  <td>{formatHeightOrWeight(secondPokeState.weight)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        Select a Pokemon to Compare
        <select className="m-3" onChange={handleSecondPokemonSelected}>
          {" "}
          <option>Pokemon</option>
          {pokemonState
            ?.filter((p) => p.name !== pokeState.name)
            .map((poke) => {
              return (
                <option
                  key={poke.url}
                  value={
                    poke.url.includes("pokemon-species")
                      ? poke.url.match(/(?<=pokemon-species\/)\d[^\/]*/)[0]
                      : poke.url.match(/(?<=pokemon\/)\d[^\/]*/)[0]
                  }
                >
                  {formatName(poke.name)}
                </option>
              );
            })}
          <option></option>
        </select>
      </div>

      <div>
        <button
          className="btn btn-info m-3"
          onClick={handleComparePokemon}
          disabled={secondPokeState.length < 1}
        >
          Compare
        </button>
      </div>
      <div>
        Poke detail
        <div>
          <div className="card m-3" style={{ width: 400 }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
              onError={(e) => {
                e.target.onError = null;
                e.target.src =
                  "https://cdn.pixabay.com/photo/2016/09/01/09/31/pokemon-1635610_1280.png";
              }}
              className="card-image-top"
              alt={pokeState.name} // to consider better alt text, stating 'image' is uncessary
            ></img>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Height (m)</th>
                  <th>Weight (kg)</th>
                  {/* <th>Other</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatName(pokeState.name)}</td>
                  <td>{formatHeightOrWeight(pokeState.height)}</td>
                  <td>{formatHeightOrWeight(pokeState.weight)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Poke;
