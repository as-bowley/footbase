import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
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
  const [playerStats, setPlayerStats] = useState(data[5].response[0]);
  const [playerSeasonStats, setPlayerSeasonStats] = useState(
    data[6].response[0]
  );
  const [searchValue, setTeamSearchValue] = useState("");
  const [searchData, setSearchData] = useState(data[7].response);

  const onTeamSearchChange = (event) => {
    setTeamSearchValue(event.target.value);
  };

  const searchTeam = (id) => {
    console.log(id);
    setTeamSearchValue("");
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <Team
              teamdetails={teamDetails}
              venue={venueInfo}
              teamstatistics={teamStatistics}
              fixtures={fixtures}
              squad={squad}
              standings={standings}
              team={teamDetails.name}
              searchChange={onTeamSearchChange}
              teamSearchData={searchData}
              teamSearchValue={searchValue}
              searchTeam={searchTeam}
            />
          }
        />
        <Route
          path="/player"
          element={
            <Player stats={playerStats} seasonStats={playerSeasonStats} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
