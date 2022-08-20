import "./styles/Standings.css";

const Standings = ({ standings, team }) => {
  return (
    <div className="team__standings">
      <h2>Table</h2>
      <table>
        <tbody>
          <tr>
            <th>Pos.</th>
            <th>Team</th>
            <th>Pts</th>
          </tr>
          {standings.map((position) => {
            return (
              <tr key={position.rank}>
                <td>{position.rank}</td>
                <td
                  className={position.team.name === team ? `selectedTeam` : ""}
                >
                  {position.team.name}
                </td>
                <td>{position.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
