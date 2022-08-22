import "./styles/PlayerInfo.css";

const Playerstats = ({ stats }) => {
  return (
    <div className="player__info">
      <div className="player__stats">
        <h2 className="player__name">{`${stats.player.firstname} ${stats.player.lastname}`}</h2>
        <div className="player__stats__img">
          <img src={stats.player.photo} width={"150px"} alt="player" />
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
      <div className="player__team">
        <img
          src={stats.statistics[0].team.logo}
          width={"width: 100px"}
          alt="club badge"
        />
      </div>
    </div>
  );
};

export default Playerstats;
