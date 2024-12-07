import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "@components/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Player from "./components/Player/Player";
import Favourites from "./components/Favourites/Favourites";
import Team from "./components/Team/Team";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { AnimatePresence } from "framer-motion";

const API_KEY = import.meta.env.REACT_APP_API_KEY;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": `${API_KEY}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
};

const darkMode = {
  backgroundColor: "#303030",
  color: "#fff",
  boxShadow: "rgb(255 255 255 / 10%)",
};
const darkBG = {
  backgroundColor: "#000",
};

const App = () => {
  //darkmode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  //home page data

  //team page data
  const [teamDetails, setTeamDetails] = useState({});
  const [venueInfo, setVenueInfo] = useState({});
  const [teamStatistics, setTeamStatistics] = useState({});
  const [fixtures, setFixtures] = useState([]);
  const [squad, setSquad] = useState([]);
  const [standings, setStandings] = useState([]);
  const [teamSearchValue, setTeamSearchValue] = useState("");
  const [teamSearchData, setTeamSearchData] = useState([]);

  const fetchStandings = () => {
    fetch(
      "https://v3.football.api-sports.io/standings?league=39&season=2022",
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setStandings(response.response[0].league.standings[0])
      )
      .catch((err) => console.error(err));
  };

  const fetchTeamStats = (teamid) => {
    fetch(
      `https://v3.football.api-sports.io/teams/statistics?league=39&season=2022&team=${teamid}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setTeamStatistics(response.response))
      .catch((err) => console.error(err));
  };

  const fetchTeamDetails = (teamid) => {
    fetch(`https://v3.football.api-sports.io/teams?id=${teamid}`, options)
      .then((response) => response.json())
      .then((response) => {
        setTeamDetails(response.response[0].team);
        setVenueInfo(response.response[0].venue);
      })
      .catch((err) => console.error(err));
  };

  const fetchFixtures = (teamid) => {
    fetch(
      `https://v3.football.api-sports.io/fixtures?league=39&team=${teamid}&next=3`,
      options
    )
      .then((response) => response.json())
      .then((response) => setFixtures(response.response))
      .catch((err) => console.error(err));
  };

  const fetchSquad = (teamid) => {
    fetch(
      `https://v3.football.api-sports.io/players?team=${teamid}&season=2022`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSquad(response.response))
      .catch((err) => console.error(err));
  };

  const fetchTeamSearchData = () => {
    fetch(
      "https://v3.football.api-sports.io/teams?league=39&season=2022",
      options
    )
      .then((response) => response.json())
      .then((response) => setTeamSearchData(response.response))
      .catch((err) => console.error(err));
  };

  const fetchTeam = (id) => {
    fetchTeamStats(id);
    fetchTeamDetails(id);
    fetchFixtures(id);
    fetchSquad(id);
    setTeamSearchValue("");
  };

  useEffect(() => {
    fetchTeamSearchData();
    fetchStandings();
    fetchTeam(33);
  }, []);

  //player page data
  const [playerStats, setPlayerStats] = useState({});
  const [playerSeasonStats, setPlayerSeasonStats] = useState({});
  const [playerSearchValue, setPlayerSearchValue] = useState("");
  const [playerSearchData, setPlayerSearchData] = useState([]);

  const fetchFavePlayerData = (id) => {
    fetch(
      `https://v3.football.api-sports.io/players?id=${id}&league=39&season=2022`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPlayerSearchData(response.response);
        setPlayerSeasonStats(response.response[0]);
        setPlayerStats(response.response[0]);
      })
      .catch((err) => console.error(err));
  };

  const searchPlayer = (id) => {
    playerSearchData.filter((data) => {
      if (data.player.id === id) {
        setPlayerSeasonStats(data);
        setPlayerStats(data);
        setPlayerSearchValue("");
      }
      return null;
    });
  };

  const fetchPlayerSearchData = (searchValue) => {
    fetch(
      `https://v3.football.api-sports.io/players?league=39&search=${searchValue}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setPlayerSearchData(response.response))
      .catch((err) => console.error(err));
  };

  const handlePlayerSearchChange = (event) => {
    setPlayerSearchValue(event.target.value);
    if (
      playerSearchValue.split("").length === 4 ||
      playerSearchValue.split("").length === 6
    ) {
      fetchPlayerSearchData(playerSearchValue);
    }
  };

  useEffect(() => {
    fetchFavePlayerData(742);
  }, []);

  //login page data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  return (
    <div className="App" style={isDarkMode ? darkBG : null}>
      {isLoggedIn ? (
        <>
          <Navbar
            username={user?.email}
            signOut={logout}
            style={isDarkMode ? darkMode : null}
            toggleDarkMode={toggleDarkMode}
            darkMode={isDarkMode}
          />
          <AnimatePresence mode="wait">
            <Routes key={location.pathname} location={location}>
              <Route
                index
                path="/"
                element={
                  <Home
                    leaguetable={standings}
                    style={isDarkMode ? darkMode : null}
                    darkMode={isDarkMode}
                  />
                }
              />
              <Route
                path="/team"
                element={
                  <Team
                    teamdetails={teamDetails}
                    venue={venueInfo}
                    teamstatistics={teamStatistics}
                    fixtures={fixtures}
                    squad={squad}
                    standings={standings}
                    fetchStandings={fetchStandings}
                    team={teamDetails.name}
                    teamSearchData={teamSearchData}
                    teamSearchValue={teamSearchValue}
                    setTeamSearchValue={setTeamSearchValue}
                    fetchTeam={fetchTeam}
                    user={user.uid}
                    style={isDarkMode ? darkMode : null}
                    darkMode={isDarkMode}
                  />
                }
              />
              <Route
                path="/player"
                element={
                  <Player
                    stats={playerStats}
                    seasonStats={playerSeasonStats}
                    playerSearchChange={handlePlayerSearchChange}
                    playerSearchData={playerSearchData}
                    playerSearchValue={playerSearchValue}
                    searchPlayer={searchPlayer}
                    user={user.uid}
                    style={isDarkMode ? darkMode : null}
                  />
                }
              />
              <Route
                path="/favourites"
                element={
                  <Favourites
                    user={user.uid}
                    searchTeam={fetchTeam}
                    searchPlayer={fetchFavePlayerData}
                    style={isDarkMode ? darkMode : null}
                    darkMode={isDarkMode}
                  />
                }
              />
            </Routes>
          </AnimatePresence>
        </>
      ) : (
        <LoginPage
          logout={logout}
          isLoggedIn={setIsLoggedIn}
          setUser={setUser}
          style={isDarkMode ? darkMode : null}
        />
      )}
    </div>
  );
};

export default App;
