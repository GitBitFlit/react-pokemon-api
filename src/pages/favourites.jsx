const Favourites = ({ favouritePokemon, onRemoveFromFavourites }) => {
  return (
    <>
      <div>Favourites</div>
      <div>
        enable click to view detail, remove button, show date added? <p />
        <br />
      </div>
<table>
  <thead><tr><th></th></tr></thead>
  <tbody>{favouritePokemon.map((poke) => {
        return (
          <tr>
            <td key={poke.url}>{poke.name}</td>
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
      })}</tbody>
</table>

      
    </>
  );
};

export default Favourites;
