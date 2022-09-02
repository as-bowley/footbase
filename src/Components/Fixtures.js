import "./styles/Fixtures.css";

const Fixtures = ({ fixtures, style }) => {
  const getNextThreeFixtures = () => {
    const games = [];
    for (let i = 0; games.length < 3; i++) {
      if (fixtures[i].goals.home === null) {
        games.push(fixtures[i]);
      }
    }
    return games;
  };

  const games = getNextThreeFixtures();

  const mappedFixtures = games.map((game) => {
    return (
      <div className="fixture">
        <h4>{game.teams.home}</h4>
        <h4>{game.teams.away}</h4>
      </div>
    );
  });

  return (
    <div className="team__fixtures" style={style}>
      <h2>Upcoming Fixtures</h2>
      <div className="text__fixtures__container">
        {games.map((game, index) => {
          return (
            <div className="fixture" key={index}>
              <div className="fixture__home">
                <img src={game.teams.home.logo} width="45px" alt="club logo" />
                <h4>{game.teams.home.name}</h4>
              </div>
              <div className="fixture__details">
                <h5>
                  {new Date(game.fixture.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h5>
                <p>
                  {new Date(game.fixture.date).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                </p>
                <img src={game.league.logo} alt="league logo" height="40px" />
              </div>

              <div className="fixture__away">
                <h4>{game.teams.away.name}</h4>
                <img src={game.teams.away.logo} width="45px" alt="club logo" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fixtures;
