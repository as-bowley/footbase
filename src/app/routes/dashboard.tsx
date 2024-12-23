// import leaguelogoalt from "@img/premierleague_logo2.png";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import News from "@/components/Home/News";
// import LeagueTable from "@/components/Home/LeagueTable";
// import LeagueStats from "@/components/Home/LeagueStats";
// import Results from "@/components/Home/Results";
// import apiService from "@/services/apiService";
// import useThemeStore from "@/stores/themeStore.js";
import DashboardLayout from "@/components/layout/dashboard-layout";

const Dashboard = () => {
  // const [headlines, setHeadlines] = useState([]);
  // const [results, setResults] = useState([]);
  // const [topScorers, setTopScorers] = useState([]);
  // const [topAssists, setTopAssists] = useState([]);

  // const { darkMode } = useThemeStore();

  // useEffect(() => {
  //   apiService
  //     .getFootballNews("Premier League", 15, "en")
  //     .then((articles) => setHeadlines(articles))
  //     .catch((err) => console.error("Error fetching football news:", err));
  //
  //   apiService
  //     .getFixtures(39, 5)
  //     .then((data) => setResults(data))
  //     .catch((err) => console.error("Error fetching results:", err));
  //
  //   apiService
  //     .getTopScorers(39, 2024)
  //     .then((data) => {
  //       setTopScorers(data);
  //     })
  //     .catch((err) => console.error("Error fetching top scorers:", err));
  //
  //   apiService
  //     .getTopAssists(39, 2024)
  //     .then((data) => setTopAssists(data))
  //     .catch((err) => console.error("Error fetching top assists:", err));
  // }, []);

  return (
    <DashboardLayout>
      <></>
    </DashboardLayout>
  );
};

export default Dashboard;
