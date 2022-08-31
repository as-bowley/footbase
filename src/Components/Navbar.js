import profpic from "./img/userprofpic.png";
import faveicon from "./img/fav.png";
import playericon from "./img/player.png";
import teamicon from "./img/team.png";
import logouticon from "./img/logout.png";
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
      <div className="navbar__logo__responsive">
        <h1>
          F<strong>b</strong>
        </h1>
      </div>
      <div className="navbar__userInfo">
        <img src={profpic} alt="profile" />
        <h2>{username}</h2>
      </div>
      <div className="navbar__menu">
        <ul>
          <li>
            <NavLink to="./favourites">
              <img src={faveicon} alt="favourite" />
              <strong>Favourites</strong>
            </NavLink>
          </li>
          <li>
            <NavLink to="./player">
              <img src={playericon} alt="playericon" />
              <strong>Players</strong>
            </NavLink>
          </li>
          <li>
            <NavLink to="./team">
              <img src={teamicon} alt="teamicon" width="30px" />
              <strong>Teams</strong>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar__signout">
        <motion.button whileTap={{ scale: 0.95 }} onClick={signOut}>
          <img src={logouticon} alt="" width={"25px"} />
          <p>Sign Out</p>
        </motion.button>
      </div>
    </div>
  );
};

export default Navbar;
