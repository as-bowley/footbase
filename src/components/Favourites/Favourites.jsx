import { motion } from "framer-motion";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Favourites.css";

const Favourites = ({ user, searchTeam, searchPlayer, style, darkMode }) => {
  const [favTeams, setFavTeams] = useState([]);
  const [favPlayers, setFavPlayers] = useState([]);

  const docRef = doc(db, "users", user);

  useEffect(() => {
    const teams = async () => {
      const docSnap = await getDoc(docRef);
      setFavTeams(docSnap.data().favourites.teams);
    };
    const players = async () => {
      const docSnap = await getDoc(docRef);
      setFavPlayers(docSnap.data().favourites.players);
    };
    teams();
    players();
  }, []);

  return (
    <div
      className="favourites"
      style={darkMode ? { backgroundColor: "#000" } : null}
    >
      <motion.div
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={darkMode ? { color: "#fff" } : null}
      >
        <div className="favourites__title">
          <h1>Favourites</h1>
        </div>
      </motion.div>
      <motion.div
        className="favourites__teams"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={style}
      >
        <div>
          <h2
            className="favourites__teams__title"
            style={darkMode ? { color: "#fff" } : null}
          >
            Teams
          </h2>
          {favTeams.map((data, i) => {
            return (
              <Link
                className="favourites__teams--row"
                key={i}
                to="../team"
                onClick={() => searchTeam(data.id)}
                style={darkMode ? { color: "#fff" } : null}
              >
                <img src={data.logo} width={"80px"} alt="team badge" />
                <span>{data.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        className="favourites__players"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={style}
      >
        <div>
          <h2 className="favourites__players__title">Players</h2>
          {favPlayers.map((data, i) => {
            return (
              <Link
                className="favourites__players--row"
                key={i}
                to="../player"
                onClick={() => searchPlayer(data.id)}
                style={darkMode ? { color: "#fff" } : null}
              >
                <img src={data.photo} width={"80px"} alt="team badge" />
                <span>{data.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Favourites;
