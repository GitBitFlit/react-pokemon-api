const Favourites = ({ favouritePokemon, onRemoveFromFavourites }) => {
  return (
    <>
      <div>Favourites</div>
      <div>
        enable click to view detail, remove button, show date added? <p />
        <br />
      </div>
      {favouritePokemon.map((poke) => {
        return (
          <div>
            <p key={poke.url}>{poke.name}</p>
            <button
              onClick={() => {
                onRemoveFromFavourites(poke);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Favourites;
