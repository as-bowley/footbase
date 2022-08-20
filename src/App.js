import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Team from "./Components/Team";
const data = require("./Components/data.json");

const App = () => {
  const [teamDetails, setTeamDetails] = useState(data[0].response[0].team);
  const [venueInfo, setVenueInfo] = useState(data[0].response[0].venue);
  const [teamStatistics, setTeamStatistics] = useState(data[1].response);
  const [fixtures, setFixtures] = useState(data[2].response);
  const [squad, setSquad] = useState(data[3].response);
  const [standings, setstandings] = useState(
    data[4].response[0].league.standings[0]
  );

  return (
    <div className="App">
      <Navbar />
      <Team
        teamdetails={teamDetails}
        venue={venueInfo}
        teamstatistics={teamStatistics}
        fixtures={fixtures}
        squad={squad}
        standings={standings}
        team={teamDetails.name}
      />
    </div>
  );
};

export default App;
