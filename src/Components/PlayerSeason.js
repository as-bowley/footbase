import "./styles/PlayerSeason.css";

const PlayerSeason = ({ seasonStats }) => {
  return (
    <div className="player__seasonStats">
      <h2>Current Season Stats</h2>
      <div className="player__stats__table">
        <div className="player__stats__table--left">
          <table>
            <tbody>
              <tr>
                <th>Games</th>
              </tr>
              <tr>
                <td>Appearances</td>
                <td>{seasonStats.statistics[0].games.appearences}</td>
              </tr>
              <tr>
                <td>Minutes</td>
                <td>{seasonStats.statistics[0].games.minutes}</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>
                  {(
                    (seasonStats.statistics[0].games.rating * 100) /
                    100
                  ).toFixed(1)}
                </td>
              </tr>
              <tr>
                <th>Contribution</th>
              </tr>
              <tr>
                <td>Goals</td>
                <td>{seasonStats.statistics[0].goals.total}</td>
              </tr>
              <tr>
                <td>Assists</td>
                <td>
                  {seasonStats.statistics[0].goals.assists !== null
                    ? seasonStats.statistics[0].goals.assists
                    : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="player__stats__table--left">
          <table>
            <tbody>
              <tr>
                <th>Cards</th>
              </tr>
              <tr>
                <td>Yellow</td>
                <td>{seasonStats.statistics[0].cards.yellow}</td>
              </tr>
              <tr>
                <td>Yellow/Red</td>
                <td>{seasonStats.statistics[0].cards.yellowred}</td>
              </tr>
              <tr>
                <td>Red</td>
                <td>{seasonStats.statistics[0].cards.red}</td>
              </tr>
              <tr>
                <th>Fouls</th>
              </tr>
              <tr>
                <td>Commited</td>
                <td>
                  {seasonStats.statistics[0].fouls.committed !== null
                    ? seasonStats.statistics[0].fouls.committed
                    : 0}
                </td>
              </tr>
              <tr>
                <td>Drawn</td>
                <td>
                  {seasonStats.statistics[0].fouls.drawn !== null
                    ? seasonStats.statistics[0].fouls.drawn
                    : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerSeason;
