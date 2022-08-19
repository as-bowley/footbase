import "./styles/Standings.css";

const Standings = ({ standings }) => {
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
          {standings.map((team) => {
            return (
              <tr key={team.rank}>
                <td>{team.rank}</td>
                <td>{team.team.name}</td>
                <td>{team.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
