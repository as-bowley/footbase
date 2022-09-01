import { useEffect, useState } from "react";
import "./styles/Squad.css";

const Squad = ({ squad, style }) => {
  const [squadModalIsOpen, setSquadModalIsOpen] = useState(false);
  const [isGKHidden, setIsGKHidden] = useState(false);
  const [isDefenderHidden, setIsDefenderHidden] = useState(false);
  const [isMidfielderHidden, setIsMidfielderHidden] = useState(false);
  const [isAttackerHidden, setIsAttackerHidden] = useState(false);

  const getFirst10SquadMembers = () => {
    const players = [];
    for (let i = 0; players.length < 17; i++) {
      players.push(squad[i]);
    }
    return players;
  };

  const first10Players = getFirst10SquadMembers();

  const sortSquad = () => {
    const goalkeepers = squad.filter(
      (player) => player.statistics[0].games.position === "Goalkeeper"
    );
    const defenders = squad.filter(
      (player) => player.statistics[0].games.position === "Defender"
    );
    const midfielders = squad.filter(
      (player) => player.statistics[0].games.position === "Midfielder"
    );
    const attackers = squad.filter(
      (player) => player.statistics[0].games.position === "Attacker"
    );
    return [goalkeepers, defenders, midfielders, attackers];
  };

  const organisedSquad = sortSquad();

  const handleModal = () => {
    setSquadModalIsOpen((prev) => !prev);
  };

  const handleGKDisplay = () => {
    setIsGKHidden((prev) => !prev);
  };

  const handleDefenderDisplay = () => {
    setIsDefenderHidden((prev) => !prev);
  };

  const handleMidfielderDisplay = () => {
    setIsMidfielderHidden((prev) => !prev);
  };

  const handleAttackerDisplay = () => {
    setIsAttackerHidden((prev) => !prev);
  };

  return (
    <div
      className={`team__squad ${squadModalIsOpen ? `open` : ""}`}
      style={style}
    >
      <h2>Squad</h2>
      {!squadModalIsOpen ? (
        <ul>
          {first10Players.map((player) => {
            return <li key={player.player.id}>{player.player.name}</li>;
          })}
        </ul>
      ) : (
        <div className="squad__detailed">
          <div className="squad__detailed--goalkeepers">
            <h3 onClick={handleGKDisplay}>Goalkeepers</h3>
            {organisedSquad[0].map((player, i) => {
              return (
                <div
                  className={`squad__detailed--row ${
                    isGKHidden ? "hidden" : ""
                  }`}
                  key={i}
                >
                  <img
                    src={player.player.photo}
                    width={"40px"}
                    alt="player img"
                  />
                  <span>{player.player.name}</span>
                </div>
              );
            })}
          </div>
          <div className="squad__detailed--defenders">
            <h3 onClick={handleDefenderDisplay}>Defenders</h3>
            {organisedSquad[1].map((player, i) => {
              return (
                <div
                  className={`squad__detailed--row ${
                    isDefenderHidden ? "hidden" : ""
                  }`}
                  key={i}
                >
                  <img
                    src={player.player.photo}
                    width={"40px"}
                    alt="player img"
                  />
                  <span>{player.player.name}</span>
                </div>
              );
            })}
          </div>
          <div className="squad__detailed--midfielders">
            <h3 onClick={handleMidfielderDisplay}>Midfielders</h3>
            {organisedSquad[2].map((player, i) => {
              return (
                <div
                  className={`squad__detailed--row ${
                    isMidfielderHidden ? "hidden" : ""
                  }`}
                  key={i}
                >
                  <img
                    src={player.player.photo}
                    width={"40px"}
                    alt="player img"
                  />
                  <span>{player.player.name}</span>
                </div>
              );
            })}
          </div>
          <div className="squad__detailed--attackers">
            <h3 onClick={handleAttackerDisplay}>Attackers</h3>
            {organisedSquad[3].map((player, i) => {
              return (
                <div
                  className={`squad__detailed--row ${
                    isAttackerHidden ? "hidden" : ""
                  }`}
                  key={i}
                >
                  <img
                    src={player.player.photo}
                    width={"40px"}
                    alt="player img"
                  />
                  <span>{player.player.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <button onClick={handleModal} style={style}>
        {squadModalIsOpen ? "See Less" : "See more"}
      </button>
    </div>
  );
};

export default Squad;
