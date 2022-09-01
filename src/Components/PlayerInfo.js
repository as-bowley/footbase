import "./styles/PlayerInfo.css";

const Playerstats = ({ stats, style }) => {
  return (
    <div className="player__info">
      <div className="player__stats" style={style}>
        <h2 className="player__name">{`${stats.player.firstname} ${stats.player.lastname}`}</h2>
        <div className="player__stats__img">
          <img src={stats.player.photo} width={"180px"} alt="player" />
        </div>
        <div className="player__stats__info">
          <ul>
            <li>
              <strong>Date of birth:</strong> {stats.player.birth.date}
            </li>
            <li>
              <strong>Country:</strong> {stats.player.birth.country}
            </li>
            <li>
              <strong>Place:</strong> {stats.player.birth.place}
            </li>
            <li>
              <strong>Age:</strong> {stats.player.age}
            </li>
            <li>
              <strong>Height:</strong> {stats.player.height}
            </li>
            <li>
              <strong>Weight:</strong> {stats.player.weight}
            </li>
          </ul>
        </div>
      </div>
      <div className="player__team" style={style}>
        <img
          src={stats.statistics[0].team.logo}
          width={"width: 150px"}
          alt="club badge"
        />
      </div>
    </div>
  );
};

export default Playerstats;
