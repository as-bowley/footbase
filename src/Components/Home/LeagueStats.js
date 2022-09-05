import "./styles/LeagueStats.css";

const LeagueStats = ({ topScorers, topAssists }) => {
  return (
    <div className="home__leaguestats">
      <div className="home__leaguestats__topscorers">
        <h2>Top Scorers</h2>
        {topScorers.map((scorer, i) => {
          if (i < 5) {
            return (
              <div key={i} className="home__leaguestats__topscorer">
                <img src={scorer.player.photo} alt="" height={"50px"} />
                <strong>{scorer.player.name}</strong>
                <span>
                  <strong>{scorer.statistics[0].goals.total}</strong>
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="home__leaguestats__assists">
        <h2>Top Assists</h2>
        {topAssists.map((assistee, i) => {
          if (i < 5) {
            return (
              <div key={i} className="home__leaguestats__assistee">
                <img src={assistee.player.photo} alt="" height={"50px"} />
                <strong>{assistee.player.name}</strong>
                <span>
                  <strong>{assistee.statistics[0].goals.assists}</strong>
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default LeagueStats;
