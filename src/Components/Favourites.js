import { motion } from "framer-motion";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./styles/Favourites.css";

const Favourites = ({ user }) => {
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
    <div className="favourites">
      <motion.div>
        <div>
          <h1>Favourites</h1>
        </div>
      </motion.div>
      <motion.div className="favourites__teams">
        <div>
          <h2>Teams</h2>
          {favTeams.map((data, i) => {
            return (
              <div className="favourites__teams--row" key={i}>
                <img src={data.logo} width={"80px"} alt="team badge" />
                <span>{data.name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div className="favourites__players">
        <div>
          <h2>Players</h2>
          {favPlayers.map((data, i) => {
            return (
              <div className="favourites__players--row" key={i}>
                <img src={data.photo} width={"80px"} alt="team badge" />
                <span>{data.name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Favourites;
