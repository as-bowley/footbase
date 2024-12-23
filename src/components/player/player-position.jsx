import pitch from "@img/positionpitch.png";

const PlayerPosition = ({ position, style }) => {
  return (
    <div className="player__position" style={style}>
      <div
        className={`player__position__img gk ${
          position === "Goalkeeper" && "show"
        }`}
      >
        GK
      </div>
      <div
        className={`player__position__img cb1 ${
          position === "Defender" && "show"
        }`}
      >
        CB
      </div>
      <div
        className={`player__position__img cb2 ${
          position === "Defender" && "show"
        }`}
      >
        CB
      </div>
      <div
        className={`player__position__img lb ${
          position === "Defender" && "show"
        }`}
      >
        LB
      </div>
      <div
        className={`player__position__img rb ${
          position === "Defender" && "show"
        }`}
      >
        RB
      </div>
      <div
        className={`player__position__img cdm ${
          position === "Midfielder" && "show"
        }`}
      >
        CDM
      </div>
      <div
        className={`player__position__img cam ${
          position === "Midfielder" && "show"
        }`}
      >
        CAM
      </div>
      <div
        className={`player__position__img cm1 ${
          position === "Midfielder" && "show"
        }`}
      >
        CM
      </div>
      <div
        className={`player__position__img cm2 ${
          position === "Midfielder" && "show"
        }`}
      >
        CM
      </div>
      <div
        className={`player__position__img lw ${
          position === "Attacker" && "show"
        }`}
      >
        LW
      </div>
      <div
        className={`player__position__img rw ${
          position === "Attacker" && "show"
        }`}
      >
        RW
      </div>
      <div
        className={`player__position__img st ${
          position === "Attacker" && "show"
        }`}
      >
        ST
      </div>

      <h2>Position</h2>
      <img src={pitch} alt="position pitch" />
    </div>
  );
};

export default PlayerPosition;
