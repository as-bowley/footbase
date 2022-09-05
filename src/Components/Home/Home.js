import "./styles/Home.css";
import leaguelogo from "../../img/premierleague_logo.png";
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

const Home = ({ leaguetable }) => {
  const [headlines, setHeadlines] = useState([]);
  const [results, setResults] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=premier-league&apiKey=${newsKey}`
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
      <div className="home__title">
        <img src={leagueemblem} height={"200px"} alt="" />
        <img src={leaguelogo} height={"200px"} alt="" />
      </div>

      <motion.div className="home__results__container">
        <Results results={results} />
      </motion.div>
      <div className="home_season">
        {" "}
        <h1>2022/23</h1>
      </div>
      <motion.div className="home__table__container">
        <LeagueTable leaguetable={leaguetable} />
      </motion.div>
      <motion.div className="home__leaguestats__container">
        <LeagueStats topScorers={topScorers} topAssists={topAssists} />
      </motion.div>
      <motion.div
        className="home__headlines__container"
        initial={{ x: 5, opacity: 0 }}
        exit={{ y: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <News headlines={headlines} />
      </motion.div>
    </div>
  );
};

export default Home;
