import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const NEWS_API_BASE_URL = "https://newsapi.org/v2";
// eslint-disable-next-line no-undef
const NEWS_API_KEY = process.env.VITE_NEWSAPI_KEY;

app.use("/api/news", async (req, res) => {
  const url = `${NEWS_API_BASE_URL}${req.url}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${NEWS_API_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({
      error: "Error fetching data from News API",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `News API proxy server running at http://localhost:${PORT}/api/news`,
  );
});
