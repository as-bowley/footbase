import "../Home/styles/LeagueTable.css";

const LeagueTable = ({ leaguetable }) => {
  return (
    <>
      {leaguetable && (
        <div className="home__leaguetable">
          <h2>Table</h2>
          <table>
            <tbody>
              <tr>
                <th>Pos.</th>
                <th>Team</th>
                <th>Pts</th>
              </tr>
              {leaguetable.length > 0 &&
                leaguetable.map((position) => {
                  return (
                    <tr key={position.rank}>
                      <td>{position.rank}</td>
                      <td>{position.team.name}</td>
                      <td>{position.points}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default LeagueTable;
