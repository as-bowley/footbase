import React from "react";
import homeicon from "@img/home.png";
import faveicon from "@img/fav.png";
import playericon from "@img/player.png";
import teamicon from "@img/team.png";
import logouticon from "@img/logout.png";
import darkIcon from "@img/dark.png";
import lightIcon from "@img/light.png";
import "./styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ username, signOut, style, toggleDarkMode, darkMode }) => {
  return (
    <div className="navbar" style={style}>
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
      <div className="navbar__menu">
        <ul>
          <li>
            <NavLink to="/" style={darkMode ? { color: "#fff" } : null}>
              <img
                src={homeicon}
                alt="home"
                style={darkMode ? { filter: "invert(100%)" } : null}
                width={"30px"}
              />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./favourites"
              style={darkMode ? { color: "#fff" } : null}
            >
              <img
                src={faveicon}
                alt="favourite"
                style={darkMode ? { filter: "invert(100%)" } : null}
                width={"30px"}
              />
              <span>Favourites</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="./player" style={darkMode ? { color: "#fff" } : null}>
              <img
                src={playericon}
                alt="playericon"
                style={darkMode ? { filter: "invert(100%)" } : null}
                width={"30px"}
              />
              <span>Players</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="./team" style={darkMode ? { color: "#fff" } : null}>
              <img
                src={teamicon}
                alt="teamicon"
                width="30px"
                style={darkMode ? { filter: "invert(100%)" } : null}
              />
              <span>Teams</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <div className="navbar__darkMode">
          <motion.button
            onClick={toggleDarkMode}
            className="navbar__darkMode__button"
            whileTap={{ scale: 0.95 }}
          >
            {<img src={darkMode ? lightIcon : darkIcon} alt="" />}
          </motion.button>
        </div>
        <div className="navbar__userInfo">
          <h2>{username}</h2>
        </div>
        <div className="navbar__signout">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={signOut}
            style={
              darkMode
                ? { backgroundColor: "transparent", color: "#fff" }
                : null
            }
          >
            <img
              src={logouticon}
              alt=""
              width={"25px"}
              style={darkMode ? { filter: "invert(100%)" } : null}
            />
            <p>Sign Out</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
