import "./styles/TeamSearchbar.css";

const Searchbar = ({
  placeholder,
  searchChange,
  searchData,
  teamSearchValue,
  searchTeam,
}) => {
  //onclick for each dropdown row to return team.id

  return (
    <form className="searchbar">
      <input type="search" placeholder={placeholder} onChange={searchChange} />
      <div className="searchbar__dropdown">
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
export default Searchbar;
