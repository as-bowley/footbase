import Playerstats from "./PlayerInfo";
// import Searchbar from "./TeamSearchbar";
import PlayerSeason from "./PlayerSeason";
import "./styles/Player.css";
import PlayerPosition from "./PlayerPosition";
import { motion } from "framer-motion";
import PlayerSearchbar from "./PlayerSearchbar";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import favIcon from "./img/favfilled.png";
import unfavIcon from "./img/unfav.png";

const Player = ({
  stats,
  seasonStats,
  playerSearchChange,
  playerSearchData,
  playerSearchValue,
  searchPlayer,
  user,
}) => {
  const [playerIsFavourited, setPlayerIsFavourited] = useState(false);

  useEffect(() => {
    checkPlayerIsFavourited(stats.player.id);
  }, [stats]);

  const checkFireStoreDocExists = async () => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const checkPlayerIsFavourited = async (team) => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data()?.favourites?.players.some((el) => el.id === team)) {
        setPlayerIsFavourited(true);
      }
    } else {
      setPlayerIsFavourited(false);
    }
  };

  const addTeamToFavourites = async (name, id, photo) => {
    const docExists = await checkFireStoreDocExists();
    if (docExists === true) {
      const docRef = doc(db, "users", user);
      await updateDoc(docRef, {
        "favourites.players": arrayUnion({
          name: name,
          id: id,
          photo: photo,
        }),
      });
    } else {
      const userFaves = {
        favourites: {
          teams: [
            {
              name: name,
              id: id,
              photo: photo,
            },
          ],
          players: [],
        },
      };
      await setDoc(doc(db, "users", user), userFaves);
    }
    setPlayerIsFavourited(true);
  };

  const removeFromFavourites = async () => {
    const playerToRemove = {
      name: stats.player.firstname + stats.player.lastname,
      id: stats.player.id,
      photo: stats.player.photo,
    };
    const docRef = doc(db, "users", user);

    await updateDoc(docRef, {
      "favourites.players": arrayRemove(playerToRemove),
    });
    setPlayerIsFavourited(false);
  };

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
        />
      </motion.div>
      <motion.div
        className="player__faveButton__container"
        initial={{ y: -5, opacity: 0 }}
        exit={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        {playerIsFavourited ? (
          <motion.button
            onClick={removeFromFavourites}
            whileTap={{ scale: 0.95 }}
          >
            <img src={unfavIcon} alt="" />
            Remove from Favourites
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              addTeamToFavourites(
                stats.player.firstname + " " + stats.player.lastname,
                stats.player.id,
                stats.player.photo
              )
            }
          >
            <img src={favIcon} alt="" />
            Add to Favourites
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
        <Playerstats stats={stats} />
      </motion.div>
      <motion.div
        className="player__seasonstats__container"
        initial={{ y: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <PlayerSeason seasonStats={seasonStats} />
      </motion.div>
      <motion.div
        className="player__position__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <PlayerPosition position={seasonStats.statistics[0].games.position} />
      </motion.div>
    </div>
  );
};

export default Player;
