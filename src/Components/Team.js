import Teaminfo from "./Teaminfo";
import "./styles/Team.css";
import Searchbar from "./Searchbar";
import Fixtures from "./Fixtures";
import Squad from "./Squad";
import Standings from "./Standings";

const Team = ({
  teamdetails,
  venue,
  teamstatistics,
  fixtures,
  squad,
  standings,
}) => {
  return (
    <div className="team">
      <Searchbar />
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
      <Fixtures fixtures={fixtures} />
      <Squad squad={squad} />
      <Standings standings={standings} />
    </div>
  );
};

export default Team;
