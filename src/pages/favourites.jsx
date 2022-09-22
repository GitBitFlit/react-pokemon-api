const Favourites = ({ favouritePokemon }) => {
  return (
    <>
      <div>favourites</div>
      <div>
        map favourited pokemon, enable click to view detail, remove button, show
        date added?
      </div>
      {favouritePokemon.map((poke) => {
        return <div>{poke.name}</div>;
      })}
    </>
  );
};

export default Favourites;
