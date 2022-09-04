import "./styles/PlayerSearchbar.css";

const PlayerSearchbar = ({
  onPlayerSearchChange,
  playerSearchData,
  playerSearchValue,
  searchPlayer,
  style,
}) => {
  return (
    <form className="player__searchbar">
      <input
        type="search"
        placeholder="Search player here..."
        onChange={onPlayerSearchChange}
        value={playerSearchValue}
        style={style}
      />
      <div className="searchbar__dropdown">
        {playerSearchData &&
          playerSearchData
            .filter((data) => {
              const searchWord = playerSearchValue.toLowerCase();
              const playerName =
                data.player.lastname.toLowerCase() +
                data.player.firstname.toLowerCase();
              return searchWord && playerName.includes(searchWord);
            })
            .map((data, i) => {
              return (
                <div
                  className="searchbar__dropdown--row"
                  key={i}
                  onClick={() => searchPlayer(data.player.id)}
                >
                  <img src={data.player.photo} width={"50px"} alt="player" />
                  <span>{data.player.name}</span>
                </div>
              );
            })}
      </div>
    </form>
  );
};
export default PlayerSearchbar;
