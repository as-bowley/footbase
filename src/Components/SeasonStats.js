import "./styles/SeasonStats.css";

const SeasonStats = ({ statistics }) => {
  return (
    <div className="team__seasonStats">
      <h2>Season Stats</h2>
      <table>
        <tbody>
          <tr>
            <th>Games Played</th>
          </tr>
          <tr>
            <td>Total</td>
            <td>{statistics.fixtures.played.total}</td>
          </tr>
          <tr>
            <th>Results</th>
          </tr>
          <tr>
            <td>Wins</td>
            <td>{statistics.fixtures.wins.total}</td>
          </tr>
          <tr>
            <td>Losses</td>
            <td>{statistics.fixtures.loses.total}</td>
          </tr>
          <tr>
            <th>Goals</th>
          </tr>
          <tr>
            <td>For</td>
            <td>{statistics.goals.for.total.total}</td>
          </tr>
          <tr>
            <td>Against</td>
            <td>{statistics.goals.against.total.total}</td>
          </tr>
          <tr>
            <th>Formations Used</th>
          </tr>
          {statistics.lineups.map((lineup) => {
            return (
              <tr key={lineup.formation}>
                <td>{lineup.formation}</td>
                <td>{lineup.played}</td>
              </tr>
            );
          })}
          <tr>
            <th>Misc</th>
          </tr>
          <tr>
            <td>Clean Sheets</td>
            <td>{statistics.clean_sheet.total}</td>
          </tr>
          <tr>
            <td>Penalties</td>
            <td>{statistics.penalty.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SeasonStats;
