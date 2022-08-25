import "./styles/TeamSearchbar.css";

const PlayerSearchbar = ({
  onPlayerSearchChange,
  playerSearchData,
  playerSearchValue,
  searchPlayer,
}) => {
  //onclick for each dropdown row to return team.id

  //while searchvalue is < 5 characters, do nothing and then after, fetch api and then filter/map those results and show them. Need to stop the fetch re-firing after each new character typed

  return (
    <form className="searchbar">
      <input
        type="search"
        placeholder="Search player here..."
        onChange={onPlayerSearchChange}
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
