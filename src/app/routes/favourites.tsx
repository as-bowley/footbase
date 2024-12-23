const Favourites = () => {
  return (
    <div className="favourites">
      <div>
        <div className="favourites__title">
          <h1>Favourites</h1>
        </div>
      </div>
      <div className="favourites__teams">
        <div>
          <h2 className="favourites__teams__title">Teams</h2>
          {/*{favTeams.map((data, i) => {*/}
          {/*  return (*/}
          {/*    <Link*/}
          {/*      className="favourites__teams--row"*/}
          {/*      key={i}*/}
          {/*      to="../team"*/}
          {/*      // onClick={() => searchTeam(data.id)}*/}
          {/*      style={darkMode ? { color: "#fff" } : null}*/}
          {/*    >*/}
          {/*      <img src={data.logo} width={"80px"} alt="team badge" />*/}
          {/*      <span>{data.name}</span>*/}
          {/*    </Link>*/}
          {/*  );*/}
          {/*})}*/}
        </div>
      </div>
      <div className="favourites__players">
        <div>
          <h2 className="favourites__players__title">Players</h2>
          {/*{favPlayers ? favPlayers.map((data, i) => {*/}
          {/*  return (*/}
          {/*    <Link*/}
          {/*      className="favourites__players--row"*/}
          {/*      key={i}*/}
          {/*      to="../player"*/}
          {/*      // onClick={() => searchPlayer(data.id)}*/}
          {/*      style={darkMode ? { color: "#fff" } : null}*/}
          {/*    >*/}
          {/*      <img src={data.photo} width={"80px"} alt="team badge" />*/}
          {/*      <span>{data.name}</span>*/}
          {/*    </Link>*/}
          {/*  );*/}
          {/*}) : null}*/}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
