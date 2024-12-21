import Playerstats from "@/components/Player/PlayerInfo";
import PlayerSeason from "@/components/Player/PlayerSeason";
import "@/components/Player/styles/Player.css";
import PlayerPosition from "@/components/Player/PlayerPosition";
import { motion } from "framer-motion";
import PlayerSearchbar from "@/components/Player/PlayerSearchbar";
import React, { useEffect, useState } from "react";
import favIcon from "@img/favfilled.png";
import unfavIcon from "@img/unfav.png";

const Player = ({
  stats,
  seasonStats,
  playerSearchChange,
  playerSearchData,
  playerSearchValue,
  searchPlayer,
  user,
  style,
}) => {
  const [playerIsFavourited, setPlayerIsFavourited] = useState(false);

  // useEffect(() => {
  //   checkPlayerIsFavourited(stats.player.id);
  // }, [stats.player.id]);

  return (
    <div className="player">
      <motion.div
        className="player__search__container"
        initial={{ y: -5, opacity: 0 }}
        exit={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <PlayerSearchbar
          placeholder="Search player here..."
          onPlayerSearchChange={playerSearchChange}
          playerSearchData={playerSearchData}
          playerSearchValue={playerSearchValue}
          searchPlayer={searchPlayer}
          style={style}
        />
      </motion.div>
      <motion.div
        className="player__faveButton__container"
        initial={{ y: -5, opacity: 0 }}
        exit={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <h4 style={style}>Player</h4>
        {playerIsFavourited ? (
          <motion.button
            // onClick={removeFromFavourites}
            whileTap={{ scale: 0.95 }}
            style={style}
          >
            <img src={unfavIcon} alt="" />
            <p>Unfavourite</p>
          </motion.button>
        ) : (
          <motion.button
            style={style}
            whileTap={{ scale: 0.95 }}
            // onClick={() =>
            //   addTeamToFavourites(
            //     stats.player.firstname + " " + stats.player.lastname,
            //     stats.player.id,
            //     stats.player.photo
            //   )
            // }
          >
            <img src={favIcon} alt="" />
            <p>Favourite</p>
          </motion.button>
        )}
      </motion.div>
      <motion.div
        className="player__playerstats__container"
        initial={{ y: -5, opacity: 0 }}
        exit={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <Playerstats stats={stats} style={style} />
      </motion.div>
      <motion.div
        className="player__seasonstats__container"
        initial={{ y: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <PlayerSeason seasonStats={seasonStats} style={style} />
      </motion.div>
      <motion.div
        className="player__position__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <PlayerPosition
          position={seasonStats.statistics[0].games.position}
          style={style}
        />
      </motion.div>
    </div>
  );
};

export default Player;
