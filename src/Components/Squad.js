import "./styles/Squad.css";

const Squad = ({ squad }) => {
  const getFirst10SquadMembers = () => {
    const players = [];
    for (let i = 0; players.length < 15; i++) {
      players.push(squad[i]);
    }
    return players;
  };
  const first10Players = getFirst10SquadMembers();

  return (
    <div className="team__squad">
      <h2>Squad</h2>
      <ul>
        {first10Players.map((player) => {
          return <li key={player.player.id}>{player.player.name}</li>;
        })}
      </ul>
      <button>See more</button>
    </div>
  );
};

export default Squad;
