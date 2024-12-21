import Teaminfo from "@/components/Team/Teaminfo";
import "@/components/Team/styles/Team.css";
import TeamSearchbar from "@/components/Team/TeamSearchbar";
import Fixtures from "@/components/Team/Fixtures";
import Squad from "@/components/Team/Squad";
import Standings from "@/components/Team/Standings";
import SeasonStats from "@/components/Team/SeasonStats";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import favIcon from "@img/favfilled.png";
import unfavIcon from "@img/unfav.png";

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
  fetchTeam,
  user,
  setTeamSearchValue,
  style,
  darkMode,
}) => {
  const [isTeamFavourited, setIsTeamFavourited] = useState(false);

  useEffect(() => {
    checkTeamIsFavourited(teamdetails.id);
  }, [teamdetails.id]);

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
          searchTeam={fetchTeam}
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
        <h2 style={style}>Teams</h2>
        {isTeamFavourited ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            // onClick={removeFromFavourites}
            style={style}
          >
            <img src={unfavIcon} alt="" /> <p>Unfavourite</p>
          </motion.button>
        ) : (
          <motion.button
            style={style}
            whileTap={{ scale: 0.95 }}
            // onClick={() => {
            //   addTeamToFavourites(
            //     teamdetails.name,
            //     teamdetails.id,
            //     teamdetails.logo
            //   );
            // }}
          >
            <img src={favIcon} alt="" />
            <p>Favourite</p>
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
          name={teamdetails?.name}
          logo={teamdetails?.logo}
          country={teamdetails?.country}
          founded={teamdetails?.founded}
          stadium={venue?.name}
          capacity={venue?.capacity}
          address={venue?.address}
          league={teamstatistics?.league?.name}
          leagueLogo={teamstatistics?.league?.logo}
          form={teamstatistics?.form}
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
        <Squad squad={squad} style={style} darkMode={darkMode} />
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
