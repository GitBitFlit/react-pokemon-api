import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const pokeEndPoint = "https://pokeapi.co/api/v2/pokemon";

const Poke = () => {
  // ERROR: name needs to match index.js Route path param name
  const { pokeId } = useParams();
  const [PokeState, setPokeState] = useState([]);

  useEffect(() => {
    console.log(`${pokeEndPoint}/${pokeId}`, "pokemon endpoint /id");
    fetch(`${pokeEndPoint}/${pokeId}`).then((res) => {
      // ERROR: .JSON()
      res.json().then((data) => {
        setPokeState(data);
        console.log(data, "data");
      });
    });
  }, [pokeId]);

  return (
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
            <td>{PokeState.name}</td>
            <td>{PokeState.height}</td>
            <td>{PokeState.weight}</td>
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
  );
};

export default Poke;
