import { useEffect } from "react";
import { Link } from "react-router-dom";

const Favourites = ({ favouritePokemon, onRemoveFromFavourites }) => {
  // useEffect(() => {
  //   localStorage.getItem("favouritePokemon", JSON.stringify(favouritePokemon));
  // }, [favouritePokemon]);

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (favouritePokemon.length === 0) {
    return (
      <div>
        <h1>Favourites</h1>
        <br />
        Oh dear! <br /> You haven't selected any favourite pokemon. <br />
        Quick... <Link to="/">look here</Link> to select your favourites!
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>Favourites</h1>
      </div>
      <div>
        <p />
        <br />
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {favouritePokemon.map((poke) => {
            return (
              <tr key={poke.url}>
                <td>{formatName(poke.name)}</td>
                <td>
                  <button
                    onClick={() => {
                      onRemoveFromFavourites(poke);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Favourites;
