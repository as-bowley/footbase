import Teaminfo from "./Teaminfo";
import "./styles/Team.css";
import TeamSearchbar from "./TeamSearchbar";
import Fixtures from "./Fixtures";
import Squad from "./Squad";
import Standings from "./Standings";
import SeasonStats from "./SeasonStats";
import { motion } from "framer-motion";
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

const Team = ({
  teamdetails,
  venue,
  teamstatistics,
  fixtures,
  squad,
  standings,
  team,
  searchChange,
  teamSearchData,
  teamSearchValue,
  searchTeam,
  user,
  setTeamSearchValue,
  style,
}) => {
  const [isTeamFavourited, setIsTeamFavourited] = useState(false);

  useEffect(() => {
    checkTeamIsFavourited(teamdetails.id);
  }, [teamdetails]);

  const checkFireStoreDocExists = async () => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const checkTeamIsFavourited = async (team) => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data()?.favourites?.teams.some((el) => el.id === team)) {
        setIsTeamFavourited(true);
      }
    } else {
      setIsTeamFavourited(false);
    }
  };

  const addTeamToFavourites = async (name, id, logo) => {
    const docExists = await checkFireStoreDocExists();
    if (docExists === true) {
      const docRef = doc(db, "users", user);
      await updateDoc(docRef, {
        "favourites.teams": arrayUnion({ name: name, id: id, logo: logo }),
      });
    } else {
      const userFaves = {
        favourites: {
          teams: [{ name: name, id: id, logo: logo }],
          players: [],
        },
      };
      await setDoc(doc(db, "users", user), userFaves);
    }
    setIsTeamFavourited(true);
  };

  const removeFromFavourites = async () => {
    const teamToRemove = {
      name: teamdetails.name,
      id: teamdetails.id,
      logo: teamdetails.logo,
    };
    const docRef = doc(db, "users", user);

    await updateDoc(docRef, {
      "favourites.teams": arrayRemove(teamToRemove),
    });
    setIsTeamFavourited(false);
  };

  return (
    <div className="team">
      <motion.div
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="team__searchbar__container"
      >
        <TeamSearchbar
          placeholder="Search team here..."
          searchData={teamSearchData}
          searchChange={searchChange}
          teamSearchValue={teamSearchValue}
          searchTeam={searchTeam}
          setTeamSearchValue={setTeamSearchValue}
          style={style}
        />
      </motion.div>
      <motion.div
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="team__favebutton"
      >
        <h2>Teams</h2>
        {isTeamFavourited ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={removeFromFavourites}
            style={style}
          >
            <img src={unfavIcon} alt="" /> <p>Remove from favourites</p>
          </motion.button>
        ) : (
          <motion.button
            style={style}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              addTeamToFavourites(
                teamdetails.name,
                teamdetails.id,
                teamdetails.logo
              );
            }}
          >
            <img src={favIcon} alt="" />
            <p>Add to favourites</p>
          </motion.button>
        )}
      </motion.div>
      <motion.div
        className="teaminfo__container"
        initial={{ y: -5, opacity: 0 }}
        exit={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <Teaminfo
          name={teamdetails.name}
          logo={teamdetails.logo}
          country={teamdetails.country}
          founded={teamdetails.founded}
          stadium={venue.name}
          capacity={venue.capacity}
          address={venue.address}
          league={teamstatistics.league.name}
          leagueLogo={teamstatistics.league.logo}
          form={teamstatistics.form}
          style={style}
        />
      </motion.div>
      <motion.div
        className="fixtures__container"
        initial={{ y: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "easeIn", duration: 0.5 }}
      >
        <Fixtures fixtures={fixtures} style={style} />
      </motion.div>
      <motion.div
        className="squad__container"
        initial={{ y: -5, opacity: 0 }}
        exit={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <Squad squad={squad} style={style} />
      </motion.div>
      <motion.div
        className="standings__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <Standings standings={standings} team={team} style={style} />
      </motion.div>
      <motion.div
        className="seasonstats__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <SeasonStats statistics={teamstatistics} style={style} />
      </motion.div>
    </div>
  );
};

export default Team;
