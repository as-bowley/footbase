import "./styles/TeamSearchbar.css";

const TeamSearchbar = ({
  placeholder,
  searchData,
  teamSearchValue,
  searchTeam,
  setTeamSearchValue,
  style,
}) => {
  const onTeamSearchChange = (event) => {
    setTeamSearchValue(event.target.value);
  };

  return (
    <form className="searchbar">
      <input
        type="search"
        placeholder={placeholder}
        onChange={onTeamSearchChange}
        value={teamSearchValue}
        style={style}
      />
      <div className="searchbar__dropdown" style={style}>
        {searchData
          .filter((data) => {
            const searchWord = teamSearchValue.toLowerCase();
            const teamName = data.team.name.toLowerCase();
            return searchWord && teamName.startsWith(searchWord);
          })
          .map((data, i) => {
            return (
              <div
                className="searchbar__dropdown--row"
                key={i}
                onClick={() => searchTeam(data.team.id)}
              >
                <img src={data.team.logo} width={"50px"} alt="team badge" />
                <span>{data.team.name}</span>
              </div>
            );
          })}
      </div>
    </form>
  );
};
export default TeamSearchbar;
