import Teaminfo from "./Teaminfo";
import "./styles/Team.css";
import Searchbar from "./Searchbar";
import Fixtures from "./Fixtures";
import Squad from "./Squad";
import Standings from "./Standings";
import SeasonStats from "./SeasonStats";
import { motion } from "framer-motion";

const Team = ({
  teamdetails,
  venue,
  teamstatistics,
  fixtures,
  squad,
  standings,
  team,
}) => {
  return (
    <div className="team">
      <motion.div
        initial={{ y: -600 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
      >
        <Searchbar />
      </motion.div>
      <motion.div
        className="teaminfo__container"
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
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
        />
      </motion.div>
      <motion.div
        className="fixtures__container"
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <Fixtures fixtures={fixtures} />
      </motion.div>
      <motion.div
        className="squad__container"
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <Squad squad={squad} />
      </motion.div>
      <motion.div
        className="standings__container"
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <Standings standings={standings} team={team} />
      </motion.div>
      <motion.div
        className="seasonstats__container"
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <SeasonStats statistics={teamstatistics} />
      </motion.div>
    </div>
  );
};

export default Team;
