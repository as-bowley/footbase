import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import Team from "./Components/Team";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../src/firebase-config";
import Favourites from "./Components/Favourites";
import { AnimatePresence } from "framer-motion";

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
  //darkmode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkMode = {
    backgroundColor: "#303030",
    color: "#fff",
    boxShadow: "2px 2px 4px rgba(94, 94, 94, 0.25)",
  };
  const darkBG = {
    backgroundColor: "#000",
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  //fteam page data
  const [teamDetails, setTeamDetails] = useState(data[0].response[0].team);
  const [venueInfo, setVenueInfo] = useState(data[0].response[0].venue);
  const [teamStatistics, setTeamStatistics] = useState(data[1].response);
  const [fixtures, setFixtures] = useState(data[2].response);
  const [squad, setSquad] = useState(data[3].response);
  const [standings, setStandings] = useState(
    data[4].response[0].league.standings[0]
  );

  //player page data
  const [playerStats, setPlayerStats] = useState(data[5].response[0]);
  const [playerSeasonStats, setPlayerSeasonStats] = useState(
    data[6].response[0]
  );
  const [teamSearchValue, setTeamSearchValue] = useState("");
  const [teamSearchData, setSearchData] = useState(data[7].response);
  const [playerSearchValue, setPlayerSearchValue] = useState("");
  const [playerSearchData, setPlayerSearchData] = useState([]);

  //login page data

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39",
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) =>
  //       setStandings(response.response[0].league.standings[0])
  //     )
  //     .catch((err) => console.error(err));
  // }, []);

  // const fetchTeamStats = (teamid) => {
  //   fetch(
  //     `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=2022&team=${teamid}`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => setTeamStatistics(response.response))
  //     .catch((err) => console.error(err));
  // };

  // const fetchTeamDetails = (teamid) => {
  //   fetch(
  //     `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamid}`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setTeamDetails(response.response[0].team);
  //       setVenueInfo(response.response[0].venue);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const fetchFixtures = (teamid) => {
  //   fetch(
  //     `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&team=${teamid}&next=3`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => setFixtures(response.response))
  //     .catch((err) => console.error(err));
  // };

  // const fetchSquad = (teamid) => {
  //   fetch(
  //     `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamid}&season=2022`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => setSquad(response.response))
  //     .catch((err) => console.error(err));
  // };

  const searchTeam = (id) => {
    console.log(id);
    // fetchTeamStats(id);
    // fetchTeamDetails(id);
    // fetchFixtures(id);
    // fetchSquad(id);
    setTeamSearchValue("");
  };

  const onPlayerSearchChange = (event) => {
    setPlayerSearchValue(event.target.value);
    if (playerSearchValue.split("").length === 4) {
      console.log("Search value === 4");
      fetchPlayerSearchData(playerSearchValue);
    }
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
      `https://api-football-v1.p.rapidapi.com/v3/players?league=39&search=${searchValue}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setPlayerSearchData(response.response))
      .catch((err) => console.error(err));
  };

  const register = async (registerEmail, registerPassword) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      setError(error.message.split("Firebase:")[1]);
    }
  };

  const login = async (loginEmail, loginPassword) => {
    setIsLoggingIn(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    } catch (error) {
      setError(error.message.split("Firebase:")[1]);
      setIsLoggingIn(false);
    }
  };

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
              <Route path="/" element={<Navigate to="/team" />} />
              <Route
                index
                path="/team"
                element={
                  <Team
                    teamdetails={teamDetails}
                    venue={venueInfo}
                    teamstatistics={teamStatistics}
                    fixtures={fixtures}
                    squad={squad}
                    standings={standings}
                    team={teamDetails.name}
                    teamSearchData={teamSearchData}
                    teamSearchValue={teamSearchValue}
                    setTeamSearchValue={setTeamSearchValue}
                    searchTeam={searchTeam}
                    user={user.uid}
                    style={isDarkMode ? darkMode : null}
                  />
                }
              />
              <Route
                path="/player"
                element={
                  <Player
                    stats={playerStats}
                    seasonStats={playerSeasonStats}
                    playerSearchChange={onPlayerSearchChange}
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
                    searchTeam={searchTeam}
                    searchPlayer={searchPlayer}
                    style={isDarkMode ? darkMode : null}
                  />
                }
              />
            </Routes>
          </AnimatePresence>
        </>
      ) : (
        <LoginPage
          login={login}
          logout={logout}
          register={register}
          error={error}
          isLoggingIn={isLoggingIn}
          style={isDarkMode ? darkMode : null}
        />
      )}
    </div>
  );
};

export default App;
