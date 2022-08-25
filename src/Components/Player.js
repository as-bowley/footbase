import Playerstats from "./PlayerInfo";
// import Searchbar from "./TeamSearchbar";
import PlayerSeason from "./PlayerSeason";
import "./styles/Player.css";
import PlayerPosition from "./PlayerPosition";
import { motion } from "framer-motion";
import PlayerSearchbar from "./PlayerSearchbar";

const Player = ({
  stats,
  seasonStats,
  playerSearchChange,
  playerSearchData,
  playerSearchValue,
  searchPlayer,
}) => {
  return (
    <div className="player">
      <motion.div
        className="player__search__container"
        initial={{ y: -600 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
      >
        <PlayerSearchbar
          placeholder="Search player here..."
          onPlayerSearchChange={playerSearchChange}
          playerSearchData={playerSearchData}
          playerSearchValue={playerSearchValue}
          searchPlayer={searchPlayer}
        />
      </motion.div>
      <motion.div
        className="player__playerstats__container"
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <Playerstats stats={stats} />
      </motion.div>
      <motion.div
        className="player__seasonstats__container"
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <PlayerSeason seasonStats={seasonStats} />
      </motion.div>
      <motion.div
        className="player__position__container"
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <PlayerPosition position={seasonStats.statistics[0].games.position} />
      </motion.div>
    </div>
  );
};

export default Player;
