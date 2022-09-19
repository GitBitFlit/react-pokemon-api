import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const pokeEndPoint = "https://pokeapi.co/api/v2/pokemon";
const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154";

const Poke = () => {
  // ERROR: name needs to match index.js Route path param name
  const { pokeId } = useParams();
  const [pokeState, setPokeState] = useState([]);
  const [secondPokeState, setSecondPokeState] = useState([]);
  const [pokemonState, setPokemonState] = useState([]);
  const [isComparisonState, setIsComparisonState] = useState(false);

  useEffect(() => {
    console.log(`${pokeEndPoint}/${pokeId}`, "pokemon endpoint /id");
    fetch(`${pokeEndPoint}/${pokeId}`).then((res) => {
      // ERROR: .JSON()
      res.json().then((data) => {
        setPokeState(data);
        // console.log(data, "data");
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
    isComparisonState
      ? setIsComparisonState(false)
      : setIsComparisonState(true);
  };

  const handleSecondPokemonSelected = (event) => {
    const secondPokeId = event.currentTarget.value; // conver to numnber??
    console.log(secondPokeState); // ??? has it loaded
    console.log(event.currentTarget.value);

    console.log(`${pokeEndPoint}/${secondPokeId}`, "2nd pokemon url");
    fetch(`${pokeEndPoint}/${secondPokeState}`).then((res) => {
      // ERROR: .JSON()
      res.json().then((data) => {
        setSecondPokeState(data.results);
        // console.log(data, "data");
      });
    });
  };

  if (isComparisonState) {
    return (
      <>
        <div>
          Select a Pokemon to Compare
          <select onChange={handleSecondPokemonSelected}>
            {" "}
            <option>Pokemon</option>
            {pokemonState?.map((p) => {
              return (
                <option
                  key={p.url}
                  value={
                    p.url.includes("pokemon-species")
                      ? p.url.match(/(?<=pokemon-species\/)\d[^\/]*/)[0]
                      : p.url.match(/(?<=pokemon\/)\d[^\/]*/)[0]
                  }
                >
                  {p.name}
                </option>
              );
            })}
            <option></option>
          </select>
        </div>
        <div>
          <button className="btn btn-danger m-3" onClick={handleComparePokemon}>
            Cancel
          </button>
        </div>
        <div>
          Poke detail
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Height (unit)</th>
                <th>Weight (unit)</th>
                <th>Other</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pokeState.name}</td>
                <td>{pokeState.height}</td>
                <td>{pokeState.weight}</td>
              </tr>
              <tr>
                <td>{secondPokeState.name}</td>
                <td>{secondPokeState.height}</td>
                <td>{secondPokeState.weight}</td>
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
        <button className="btn btn-info m-3" onClick={handleComparePokemon}>
          Compare
        </button>
      </div>
      <div>
        Poke detail
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height (unit)</th>
              <th>Weight (unit)</th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pokeState.name}</td>
              <td>{pokeState.height}</td>
              <td>{pokeState.weight}</td>
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
            {PokeState.stats.map?.((ps) => {
              return <p> (ps.base_stat)</p>;
            })} */}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Poke;
