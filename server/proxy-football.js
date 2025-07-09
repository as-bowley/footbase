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

const CACHE_TTL = {
  players: 24 * 60 * 60 * 1000, // 24 hours
  teams: 24 * 60 * 60 * 1000, // 24 hours
  fixtures: 2 * 60 * 60 * 1000, // 2 hours
  standings: 12 * 60 * 60 * 1000, // 12 hours
  default: 6 * 60 * 60 * 1000, // 6 hours
};

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
      .single();

    if (error || !data) {
      return null;
    }

    // Check if the cache entry is expired
    const now = new Date();
    const expiresAt = new Date(data.expires_at);

    if (now > expiresAt) {
      console.log(`Cache EXPIRED for: ${cacheKey}`);
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

    const { error } = await supabase.from("api_cache").upsert(
      {
        cache_key: cacheKey,
        data: data,
        expires_at: expiresAt.toISOString(),
        cache_type: cacheType,
      },
      {
        onConflict: "cache_key",
        ignoreDuplicates: false,
      },
    );

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

const pendingRequests = new Map();

app.use("/api/football", async (req, res) => {
  const url = `${FOOTBALL_API_BASE_URL}${req.url}`;
  const cacheKey = getCacheKey(url, req.query);
  const cacheType = getCacheType(req.url);

  try {
    // Try to get from cache first
    const cachedData = await getFromCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Check if this request is already in progress
    if (pendingRequests.has(cacheKey)) {
      console.log(`Request already in progress for: ${cacheKey} - waiting...`);
      const data = await pendingRequests.get(cacheKey);
      return res.json(data);
    }

    // Cache miss - fetch from API
    console.log(`Cache MISS for: ${cacheKey} - fetching from API`);

    // Create a promise for this request to prevent duplicates
    const fetchPromise = (async () => {
      try {
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

        // Cache the response (don't await to avoid blocking the response)
        setCache(cacheKey, data, cacheType).catch((err) => {
          console.error("Background cache set failed:", err);
        });

        return data;
      } finally {
        // Clean up the pending request
        pendingRequests.delete(cacheKey);
      }
    })();

    // Store the promise so other concurrent requests can wait for it
    pendingRequests.set(cacheKey, fetchPromise);

    const data = await fetchPromise;
    res.json(data);
  } catch (error) {
    console.error("API Error:", error);
    pendingRequests.delete(cacheKey); // Clean up on error
    res.status(500).send({
      error: "Error fetching data from Football API",
      message: error.message,
    });
  }
});

app.delete("/api/cache/cleanup", async (req, res) => {
  try {
    const { error } = await supabase
      .from("api_cache")
      .delete()
      .lt("expires_at", new Date().toISOString());

    if (error) {
      throw error;
    }

    res.json({ message: "Cache cleanup completed" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Cache cleanup failed", message: error.message });
  }
});

app.get("/api/cache/stats", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("api_cache")
      .select("cache_type, created_at, expires_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const stats = {
      total: data.length,
      active: data.filter((item) => new Date(item.expires_at) > new Date())
        .length,
      expired: data.filter((item) => new Date(item.expires_at) <= new Date())
        .length,
      byType: data.reduce((acc, item) => {
        acc[item.cache_type] = (acc[item.cache_type] || 0) + 1;
        return acc;
      }, {}),
    };

    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get cache stats", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(
    `Football API proxy server with caching running at http://localhost:${PORT}/api/football`,
  );
});
