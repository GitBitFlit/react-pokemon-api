import { useEffect } from "react";

const Favourites = ({ favouritePokemon, onRemoveFromFavourites }) => {
  // useEffect(() => {
  //   localStorage.getItem("favouritePokemon", JSON.stringify(favouritePokemon));
  // }, [favouritePokemon]);

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };


  return (
    <>
      <div>Favourites</div>
      <div>
        enable click to view detail, remove button, show date added? <p />
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
