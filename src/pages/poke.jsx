import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const pokeEndPoint = "https://pokeapi.co/api/v2/pokemon";
const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154";

const Poke = ({ formatName }) => {
  // ERROR: name needs to match index.js Route path param name
  const { pokeId } = useParams();
  const [pokeState, setPokeState] = useState([]);
  // const [secondPokeId, setSecondPokeId] = useState("");
  const [secondPokeState, setSecondPokeState] = useState([]);
  const [pokemonState, setPokemonState] = useState([]);
  const [isComparisonState, setIsComparisonState] = useState(false);

  useEffect(() => {
    console.log(`${pokeEndPoint}/${pokeId}`, "pokemon endpoint /id");
    fetch(`${pokeEndPoint}/${pokeId}`).then((res) => {
      // ERROR: .JSON()
      res.json().then((data) => {
        setPokeState(data);
        console.log(data, "poke data");
        fetch(pokemonEndPoint).then((res) => {
          res.json().then((data) => {
            // console.log(data, "pokemon state");

            setPokemonState(data.results);
          });
        });
      });
    });
  }, [pokeId]);

  const handleComparePokemon = () => {
    // isComparisonState
    //   ? setIsComparisonState(false)
    //   : setIsComparisonState(true);

    setIsComparisonState(true);
  };

  const handleCancelComparison = () => {
    setIsComparisonState(false);
    setSecondPokeState([]);
  };

  const handleSecondPokemonSelected = (event) => {
    const secondPokeId = Number(event.currentTarget.value); // convert to numnber??
    console.log(typeof secondPokeId, "second poke id"); // ??? has it loaded
    console.log(event.currentTarget.value);

    console.log(`${pokeEndPoint}/${secondPokeId}`, "2nd pokemon url");
    fetch(`${pokeEndPoint}/${secondPokeId}`).then((res) => {
      // ERROR: .JSON()
      res.json().then((data) => {
        console.log(data, "data");
        setSecondPokeState(data);
        console.log(secondPokeState, "second poke state");
        // displayComparison();
        // console.log(data, "data");
      });
    });
  };

  const formatHeightOrWeight = (value) => {
    return (value / 10).toFixed(1);
  };

  // const pokeId = (pokeUrl) => {
  //   return pokeUrl.includes("pokemon-species")
  //     ? pokeUrl.match(/(?<=pokemon-species\/)\d[^\/]*/)[0]
  //     : pokeUrl.match(/(?<=pokemon\/)\d[^\/]*/)[0];
  // };

  //   const displayComparison = () => {
  //     <div>
  //       <td>{secondPokeState.name}</td>
  //       <td>{secondPokeState.height}</td>
  //       <td>{secondPokeState.weight}</td>
  //     </div>;
  //   };

  // const formatName = (name) => {
  //   return name ? name.charAt(0).toUpperCase() + name.slice(1) : name;
  //   // waits to render?
  // };

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
        <div>
          Poke detail
          {/* <div>
            <img
              src={
                // secondPokeState.sprites.other.official - artwork.front_default
              }
            ></img>
          </div> */}
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Height (m)</th>
                <th>Weight (kg)</th>
                <th>Other</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatName(pokeState.name)}</td>
                <td>{formatHeightOrWeight(pokeState.height)}</td>
                <td>{formatHeightOrWeight(pokeState.weight)}</td>
              </tr>
              <tr>
                {/* {displayComparison()} */}
                <td>{formatName(secondPokeState.name)}</td>
                <td>{formatHeightOrWeight(secondPokeState.height)}</td>
                <td>{formatHeightOrWeight(secondPokeState.weight)}</td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>map through </td>
            {pokeState.stats.map?.((ps) => {
              return <p> (ps.base_stat)</p>;
            })} */}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        Select a Pokemon to Compare
        <select onChange={handleSecondPokemonSelected}>
          {" "}
          <option>Pokemon</option>
          {pokemonState?.map((poke) => {
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
        <button className="btn btn-info m-3" onClick={handleComparePokemon}>
          Compare
        </button>
      </div>
      {/* <div>
        display{" "}
        {Object.keys(pokeState).map((key, index) => {
          return (
            <div key={index}>
              <h2>
                {key}:{pokeState[key]}
              </h2>
            </div>
          );
        })}
      </div> */}
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
              alt={pokeState.name} // to consider better alt text, image is uncessary
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

          <img src={pokeState.picFront}></img>
        </div>
      </div>
    </>
  );
};

export default Poke;
