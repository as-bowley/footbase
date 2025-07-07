import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const FOOTBALL_API_BASE_URL = "https://v3.football.api-sports.io";
const FOOTBALL_API_KEY = process.env.VITE_API_SPORTS_KEY;

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY,
);

if (!FOOTBALL_API_KEY) {
  throw new Error("VITE_API_SPORTS_KEY is not defined in the environment");
}

// Cache configuration
const CACHE_TTL = {
  players: 24 * 60 * 60 * 1000,
  teams: 24 * 60 * 60 * 1000,
  fixtures: 2 * 60 * 60 * 1000,
  standings: 12 * 60 * 60 * 1000,
  default: 6 * 60 * 60 * 100,
};

// Cache helper functions
const getCacheKey = (url, params) => {
  const urlObj = new URL(url);
  const sortedParams = Object.keys(params || {})
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return `${urlObj.pathname}?${sortedParams}`;
};

const getCacheType = (url) => {
  if (url.includes("/players")) return "players";
  if (url.includes("/teams")) return "teams";
  if (url.includes("/fixtures")) return "fixtures";
  if (url.includes("/standings")) return "standings";
  return "default";
};

const getFromCache = async (cacheKey) => {
  try {
    const { data, error } = await supabase
      .from("api_cache")
      .select("data, expires_at")
      .eq("cache_key", cacheKey)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !data) {
      return null;
    }

    console.log(`Cache HIT for: ${cacheKey}`);
    return data.data;
  } catch (err) {
    console.error("Cache get error:", err);
    return null;
  }
};

const setCache = async (cacheKey, data, cacheType) => {
  try {
    const ttl = CACHE_TTL[cacheType] || CACHE_TTL.default;
    const expiresAt = new Date(Date.now() + ttl);

    const { error } = await supabase.from("api_cache").upsert({
      cache_key: cacheKey,
      data: data,
      expires_at: expiresAt.toISOString(),
      cache_type: cacheType,
    });

    if (error) {
      console.error("Cache set error:", error);
    } else {
      console.log(
        `Cache SET for: ${cacheKey} (expires in ${ttl / 1000 / 60} minutes)`,
      );
    }
  } catch (err) {
    console.error("Cache set error:", err);
  }
};

app.use("/api/football", async (req, res) => {
  const url = `${FOOTBALL_API_BASE_URL}${req.url}`;
  const cacheKey = getCacheKey(url, req.query);
  const cacheType = getCacheType(req.url);

  try {
    const cachedData = await getFromCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    console.log(`Cache MISS for: ${cacheKey} - fetching from API`);
    const response = await fetch(url, {
      headers: {
        "x-rapidapi-key": FOOTBALL_API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    await setCache(cacheKey, data, cacheType);

    res.json(data);
  } catch (error) {
    console.error("API Error:", error);
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
