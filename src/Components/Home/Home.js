import "./styles/Home.css";
import leaguelogo from "../../img/premierleague_logo.png";
import leaguelogoalt from "../../img/premierleague_logo2.png";
import leagueemblem from "../../img/premierleague_emblem.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import News from "./News";
import LeagueTable from "./LeagueTable";
import LeagueStats from "./LeagueStats";
import Results from "./Results";

const newsKey = process.env.REACT_APP_NEWS_KEY;
const API_KEY = process.env.REACT_APP_API_KEY;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": `${API_KEY}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
};

const optionsNews = {
  method: "GET",
  headers: {
    "x-api-key": newsKey,
  },
};

const Home = ({ leaguetable, style, darkMode }) => {
  const [headlines, setHeadlines] = useState([]);
  const [results, setResults] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.newscatcherapi.com/v2/search?q="premier league"&countries=GB&page_size=15`,
      optionsNews
    )
      .then((response) => response.json())
      .then((response) => setHeadlines(response.articles))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://v3.football.api-sports.io/fixtures?league=39&last=5`,
      options
    )
      .then((response) => response.json())
      .then((response) => setResults(response.response))
      .catch((err) => console.error(err));

    fetch(
      `https://v3.football.api-sports.io/players/topscorers?season=2022&league=39`,
      options
    )
      .then((response) => response.json())
      .then((response) => setTopScorers(response.response))
      .catch((err) => console.error(err));

    fetch(
      `https://v3.football.api-sports.io/players/topassists?season=2022&league=39`,
      options
    )
      .then((response) => response.json())
      .then((response) => setTopAssists(response.response))
      .catch((err) => console.error(err));
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

export default Home;
