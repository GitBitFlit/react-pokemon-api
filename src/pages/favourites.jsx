import { useEffect } from "react";
import { Link } from "react-router-dom";

const Favourites = ({
  favouritePokemon,
  onRemoveFromFavourites,
  formatName,
}) => {
  // useEffect(() => {
  //   localStorage.getItem("favouritePokemon", JSON.stringify(favouritePokemon));
  // }, [favouritePokemon]);

  // const formatName = (name) => {
  //   return name.charAt(0).toUpperCase() + name.slice(1);
  // };

  if (favouritePokemon.length === 0) {
    return (
      <div>
        <h1>Favourites</h1>
        <br />
        Oh dear! <br /> You haven't favourited any pokemon. <br />
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
          {favouritePokemon?.map((poke) => {
            return (
              <tr key={poke.url}>
                <td>
                  <Link
                    to={`/pokemon/${
                      poke.url.includes("pokemon-species")
                        ? poke.url.match(/(?<=pokemon-species\/)\d[^]*/)[0]
                        : poke.url.match(/(?<=pokemon\/)\d[^]*/)[0]
                    }`}
                    className="btn btn-link m-3"
                  >
                    {formatName(poke.name)}
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      onRemoveFromFavourites(poke);
                    }}
                    className="btn btn-danger"
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
