import "../Home/styles/Results.css";

const Results = ({ results, darkMode }) => {
  return (
    <div className="home__results">
      <h2>Latest Results</h2>
      {results.map((result, i) => {
        if (i < 5) {
          return (
            <div className="home__result" key={i}>
              <div
                className={`home__result__hometeam ${
                  result.teams.home.winner ? "winner" : null
                } ${darkMode ? "dark" : null}`}
              >
                <img src={result.teams.home.logo} alt="" width={"40px"} />
                <strong>{result.teams.home.name}</strong>
                <span>
                  <strong>{result.goals.home}</strong>
                </span>
              </div>
              <div
                className={`home__result__awayteam ${
                  result.teams.away.winner ? "winner" : null
                }`}
              >
                <img src={result.teams.away.logo} alt="" width={"40px"} />
                <strong>{result.teams.away.name}</strong>
                <span>
                  <strong>{result.goals.away}</strong>
                </span>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Results;
