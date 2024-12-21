import "@/components/Home/styles/Home.css";
import leaguelogoalt from "@img/premierleague_logo2.png";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import News from "@/components/Home/News";
import LeagueTable from "@/components/Home/LeagueTable";
import LeagueStats from "@/components/Home/LeagueStats";
import Results from "@/components/Home/Results";
import apiService from "@/services/apiService";

const Dashboard = ({ leaguetable, style, darkMode }) => {
  const [headlines, setHeadlines] = useState([]);
  const [results, setResults] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);

  useEffect(() => {
    apiService
      .getFootballNews("Premier League", 15, "en")
      .then((articles) => setHeadlines(articles))
      .catch((err) => console.error("Error fetching football news:", err));

    apiService
      .getFixtures(39, 5)
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching results:", err));

    apiService
      .getTopScorers(39, 2024)
      .then((data) => {
        setTopScorers(data);
      })
      .catch((err) => console.error("Error fetching top scorers:", err));

    apiService
      .getTopAssists(39, 2024)
      .then((data) => setTopAssists(data))
      .catch((err) => console.error("Error fetching top assists:", err));
  }, []);

  return (
    <div className="home">
      <motion.div
        className="home__title"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={darkMode ? { color: "#fff" } : null}
      >
        <img src={leaguelogoalt} height={"200px"} alt="" />
        <h1>Gameweek - {results[0]?.league.round.split("Regular Season -")}</h1>
      </motion.div>

      <motion.div
        className="home__results__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={style}
      >
        <Results results={results} darkMode={darkMode} />
      </motion.div>
      <motion.div
        className="home__table__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={style}
      >
        <LeagueTable leaguetable={leaguetable} />
      </motion.div>
      <motion.div
        className="home__leaguestats__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={style}
      >
        <LeagueStats
          topScorers={topScorers}
          topAssists={topAssists}
          darkMode={darkMode}
        />
      </motion.div>
      <motion.div
        className="home__headlines__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        style={style}
      >
        <News headlines={headlines} darkMode={darkMode} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
