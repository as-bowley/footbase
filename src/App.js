import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import Team from "./Components/Team";
const data = require("./Components/data.json");

const API_KEY = process.env.REACT_APP_API_KEY;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${API_KEY}`,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

const App = () => {
  //for each new team
  const [teamDetails, setTeamDetails] = useState(data[0].response[0].team);
  const [venueInfo, setVenueInfo] = useState(data[0].response[0].venue);
  const [teamStatistics, setTeamStatistics] = useState(data[1].response);
  const [fixtures, setFixtures] = useState(data[2].response);
  const [squad, setSquad] = useState(data[3].response);

  //for all teams can use the same
  const [standings, setstandings] = useState(
    data[4].response[0].league.standings[0]
  );

  const [playerStats, setPlayerStats] = useState(data[5].response[0]);
  const [playerSeasonStats, setPlayerSeasonStats] = useState(
    data[6].response[0]
  );
  const [searchValue, setTeamSearchValue] = useState("");
  const [searchData, setSearchData] = useState(data[7].response);

  const fetchTeamStats = (teamid) => {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=2022&team=${teamid}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setTeamStatistics(response.response))
      .catch((err) => console.error(err));
  };

  const fetchTeamDetails = (teamid) => {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamid}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTeamDetails(response.response[0].team);
        setVenueInfo(response.response[0].venue);
      })
      .catch((err) => console.error(err));
  };

  const fetchFixtures = (teamid) => {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&team=${teamid}&next=3`,
      options
    )
      .then((response) => response.json())
      .then((response) => setFixtures(response.response))
      .catch((err) => console.error(err));
  };

  const fetchSquad = (teamid) => {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamid}&season=2022`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSquad(response.response))
      .catch((err) => console.error(err));
  };

  const onTeamSearchChange = (event) => {
    setTeamSearchValue(event.target.value);
  };

  const searchTeam = (id) => {
    console.log(id);
    fetchTeamStats(id);
    fetchTeamDetails(id);
    fetchFixtures(id);
    fetchSquad(id);
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
