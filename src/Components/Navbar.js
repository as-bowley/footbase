import profpic from "./img/userprofpic.png";
import faveicon from "./img/fav.png";
import playericon from "./img/player.png";
import teamicon from "./img/team.png";
import "./styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ username, signOut }) => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1>
          Foot<strong>base</strong>
        </h1>
      </div>
      <div className="navbar__userInfo">
        <img src={profpic} alt="profile" />
        <h2>{username}</h2>
      </div>
      <div className="navbar__menu">
        <ul>
          <li>
            <img src={faveicon} alt="favourite" />
            <NavLink to="./favourites">Favourites</NavLink>
          </li>
          <li>
            <img src={playericon} alt="playericon" />
            <NavLink to="./player">Players</NavLink>
          </li>
          <li>
            <img src={teamicon} alt="teamicon" width="30px" />
            <NavLink to="./team">Teams</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar__signout">
        <motion.button whileTap={{ scale: 0.95 }} onClick={signOut}>
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

export default Navbar;
