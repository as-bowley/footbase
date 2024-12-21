import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const FOOTBALL_API_BASE_URL = "https://v3.football.api-sports.io";
// eslint-disable-next-line no-undef
const FOOTBALL_API_KEY = process.env.VITE_API_SPORTS_KEY;

if (!FOOTBALL_API_KEY) {
  throw new Error("VITE_API_SPORTS_KEY is not defined in the environment");
}

app.use("/api/football", async (req, res) => {
  const url = `${FOOTBALL_API_BASE_URL}${req.url}`;
  try {
    const response = await fetch(url, {
      headers: {
        "x-rapidapi-key": FOOTBALL_API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({
      error: "Error fetching data from Football API",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Football API proxy server running at http://localhost:${PORT}/api/football`,
  );
});
