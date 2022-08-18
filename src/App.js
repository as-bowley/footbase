import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
const data = require("./Components/data.json");

const App = () => {
  const [teamDetails, setTeamDetails] = useState(data[0].response[0].team);
  const [venueInfo, setVenueInfo] = useState(data[0].response[0].venue);

  return (
    <div className="App">
      <Navbar />
    </div>
  );
};

export default App;
