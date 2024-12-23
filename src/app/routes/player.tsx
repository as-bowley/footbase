// import Playerstats from "@/components/player/PlayerInfo";
// import PlayerSeason from "@/components/player/PlayerSeason";
// import PlayerPosition from "@/components/player/PlayerPosition";
// import { motion } from "framer-motion";
// import PlayerSearchbar from "@/components/player/PlayerSearchbar";
// import { useEffect, useState } from "react";
// import favIcon from "@img/favfilled.png";
// import unfavIcon from "@img/unfav.png";

const Player = () => {
  // const [playerIsFavourited, setPlayerIsFavourited] = useState(false);

  // useEffect(() => {
  //   checkPlayerIsFavourited(stats.player.id);
  // }, [stats.player.id]);

  return (
    <div className="player">
      <div className="player__search__container">
        {/*<PlayerSearchbar*/}
        {/*  placeholder="Search player here..."*/}
        {/*  onPlayerSearchChange={playerSearchChange}*/}
        {/*  playerSearchData={playerSearchData}*/}
        {/*  playerSearchValue={playerSearchValue}*/}
        {/*  searchPlayer={searchPlayer}*/}
        {/*  style={style}*/}
        {/*/>*/}
      </div>
      <div className="player__faveButton__container">
        <h4>Player</h4>
        {/*{playerIsFavourited ? (*/}
        {/*  <button*/}
        {/*    // onClick={removeFromFavourites}*/}
        {/*    whileTap={{ scale: 0.95 }}*/}
        {/*  >*/}
        {/*    <img src={unfavIcon} alt="" />*/}
        {/*    <p>Unfavourite</p>*/}
        {/*  </button>*/}
        {/*) : (*/}
        {/*  <button*/}
        {/*    whileTap={{ scale: 0.95 }}*/}
        {/*    // onClick={() =>*/}
        {/*    //   addTeamToFavourites(*/}
        {/*    //     stats.player.firstname + " " + stats.player.lastname,*/}
        {/*    //     stats.player.id,*/}
        {/*    //     stats.player.photo*/}
        {/*    //   )*/}
        {/*    // }*/}
        {/*  >*/}
        {/*    <img src={favIcon} alt="" />*/}
        {/*    <p>Favourite</p>*/}
        {/*  </button>*/}
        {/*)}*/}
      </div>
      <div className="player__playerstats__container">
        {/*<Playerstats stats={stats} style={style} />*/}
      </div>
      <div className="player__seasonstats__container">
        {/*<PlayerSeason seasonStats={seasonStats} style={style} />*/}
      </div>
      <div className="player__position__container">
        {/*<PlayerPosition*/}
        {/*  position={seasonStats.statistics[0].games.position}*/}
        {/*  style={style}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default Player;
