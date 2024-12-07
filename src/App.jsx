import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "@components/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Player from "./components/Player/Player";
import Favourites from "./components/Favourites/Favourites";
import Team from "./components/Team/Team";
import { AnimatePresence } from "framer-motion";

import useAuthStore from "./stores/authStore";
import useThemeStore from "./stores/themeStore";

const darkModeStyles = {
  backgroundColor: "#303030",
  color: "#fff",
  boxShadow: "rgb(255 255 255 / 10%)",
};
const darkBG = {
  backgroundColor: "#000",
};

const App = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isLoggedIn, user, logout, initialize } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
      <div className="App" style={isDarkMode ? darkBG : null}>
        {isLoggedIn ? (
            <>
              <Navbar
                  username={user?.email}
                  signOut={logout}
                  style={isDarkMode ? darkModeStyles : null}
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
                            style={isDarkMode ? darkModeStyles : null}
                            darkMode={isDarkMode}
                        />
                      }
                  />
                  <Route
                      path="/team"
                      element={
                        <Team
                            teamId={33} // Default team ID or pass dynamically
                            style={isDarkMode ? darkModeStyles : null}
                            darkMode={isDarkMode}
                            user={user.uid}
                        />
                      }
                  />
                  <Route
                      path="/player"
                      element={
                        <Player
                            playerSearchValue=""
                            setPlayerSearchValue={() => {}}
                            user={user.uid}
                            style={isDarkMode ? darkModeStyles : null}
                            darkMode={isDarkMode}
                        />
                      }
                  />
                  <Route
                      path="/favourites"
                      element={
                        <Favourites
                            user={user.uid}
                            style={isDarkMode ? darkModeStyles : null}
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
                isLoggedIn={useAuthStore.setState}
                setUser={useAuthStore.setState}
                style={isDarkMode ? darkModeStyles : null}
            />
        )}
      </div>
  );
};

export default App;