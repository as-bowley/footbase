import profpic from "./img/userprofpic.png";
import faveicon from "./img/fav.png";
import playericon from "./img/player.png";
import teamicon from "./img/team.png";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1>
          Foot<strong>base</strong>
        </h1>
      </div>
      <div className="navbar__userInfo">
        <img src={profpic} alt="profile" />
        <h2>Alex Bowley</h2>
      </div>
      <div className="navbar__menu">
        <ul>
          <li>
            <img src={faveicon} alt="favourite" />
            Favourites
          </li>
          <li>
            <img src={playericon} alt="playericon" />
            <Link to="./player">Players</Link>
          </li>
          <li>
            <img src={teamicon} alt="teamicon" width="30px" />
            <Link to="/">Teams</Link>
          </li>
        </ul>
      </div>
      <div className="navbar__signout">
        <button>Sign Out</button>
      </div>
    </div>
  );
};

export default Navbar;
