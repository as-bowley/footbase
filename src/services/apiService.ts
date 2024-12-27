const isDev = import.meta.env.MODE === "development";

const FOOTBALL_API_BASE_URL = isDev
  ? "http://localhost:3001/api/football"
  : "https://v3.football.api-sports.io";

const NEWS_API_BASE_URL = isDev
  ? "http://localhost:3002/api/news"
  : "https://newsapi.org/v2";

type FootballHeaders = {
  "x-rapidapi-key": string;
  "x-rapidapi-host": string;
};

type NewsHeaders = {
  Authorization: string;
};

const defaultFootballHeaders: FootballHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_API_SPORTS_KEY,
  "x-rapidapi-host": "v3.football.api-sports.io",
};

const defaultNewsHeaders: NewsHeaders = {
  Authorization: `Bearer ${import.meta.env.VITE_NEWSAPI_KEY}`,
};

const fetchApi = async (
  endpoint: string,
  baseUrl: string,
  headers: FootballHeaders | NewsHeaders,
  options = {},
) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
  }

  return response.json();
};

const apiService = {
  getStandings: async (leagueId = 39, season = 2024) => {
    const data = await fetchApi(
      `/standings?league=${leagueId}&season=${season}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response[0].league.standings[0];
  },

  getTeamStatistics: async (
    teamId: number,
    leagueId: number = 39,
    season: number = 2024,
  ) => {
    if (!teamId) throw new Error("team ID is required");
    const data = await fetchApi(
      `/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getTeamDetails: async (teamId: number) => {
    if (!teamId) throw new Error("team ID is required");
    const data = await fetchApi(
      `/teams?id=${teamId}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return {
      team: data.response[0]?.team,
      venue: data.response[0]?.venue,
    };
  },

  getFixtures: async (teamId: number, leagueId = 39, nextCount = 3) => {
    if (!teamId) throw new Error("team ID is required");
    const data = await fetchApi(
      `/fixtures?league=${leagueId}&team=${teamId}&next=${nextCount}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getSquad: async (teamId: number, season = 2022) => {
    if (!teamId) throw new Error("team ID is required");
    const data = await fetchApi(
      `/players?team=${teamId}&season=${season}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getTeamSearchData: async (leagueId = 39, season = 2024) => {
    const data = await fetchApi(
      `/teams?league=${leagueId}&season=${season}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getPlayerStats: async (playerId: number, leagueId = 39, season = 2024) => {
    if (!playerId) throw new Error("player ID is required");
    const data = await fetchApi(
      `/players?id=${playerId}&league=${leagueId}&season=${season}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response[0];
  },

  getPlayerSearchData: async (searchValue: string, leagueId = 39) => {
    if (!searchValue) throw new Error("Search value is required");
    const data = await fetchApi(
      `/players?league=${leagueId}&search=${searchValue}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getRecentFixtures: async (leagueId = 39, lastCount = 5) => {
    const data = await fetchApi(
      `/fixtures?league=${leagueId}&last=${lastCount}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getTopScorers: async (leagueId = 39, season = 2024) => {
    const data = await fetchApi(
      `/players/topscorers?season=${season}&league=${leagueId}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getTopAssists: async (leagueId = 39, season = 2024) => {
    const data = await fetchApi(
      `/players/topassists?season=${season}&league=${leagueId}`,
      FOOTBALL_API_BASE_URL,
      defaultFootballHeaders,
    );
    return data.response;
  },

  getFootballNews: async (
    query = "football",
    pageSize = 10,
    language = "en",
  ) => {
    const data = await fetchApi(
      `/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&sortBy=publishedAt&domains=bbc.com,telegraph.co.uk,athletic.com,goal.com,skysports.com,eurosport.com,theguardian.com&language=${language}`,
      NEWS_API_BASE_URL,
      defaultNewsHeaders,
    );
    return data.articles;
  },
};

export default apiService;
