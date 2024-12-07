const API_KEY = import.meta.env.REACT_APP_API_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": `${API_KEY}`,
        "x-rapidapi-host": "v3.football.api-sports.io",
    },
};

const apiService = {
    getStandings: async () => {
        const response = await fetch(`${BASE_URL}/standings?league=39&season=2022`, options);
        if (!response.ok) throw new Error('Failed to fetch standings');
        const data = await response.json();
        return data.response[0].league.standings[0];
    },
    getTeamStatistics: async (teamId) => {
        const response = await fetch(`${BASE_URL}/teams/statistics?league=39&season=2022&team=${teamId}`, options);
        if (!response.ok) throw new Error('Failed to fetch team statistics');
        const data = await response.json();
        return data.response;
    },
    getTeamDetails: async (teamId) => {
        const response = await fetch(`${BASE_URL}/teams?id=${teamId}`, options);
        if (!response.ok) throw new Error('Failed to fetch team details');
        const data = await response.json();
        return {
            team: data.response[0].team,
            venue: data.response[0].venue,
        };
    },
    getFixtures: async (teamId) => {
        const response = await fetch(`${BASE_URL}/fixtures?league=39&team=${teamId}&next=3`, options);
        if (!response.ok) throw new Error('Failed to fetch fixtures');
        const data = await response.json();
        return data.response;
    },
    getSquad: async (teamId) => {
        const response = await fetch(`${BASE_URL}/players?team=${teamId}&season=2022`, options);
        if (!response.ok) throw new Error('Failed to fetch squad');
        const data = await response.json();
        return data.response;
    },
    getTeamSearchData: async () => {
        const response = await fetch(`${BASE_URL}/teams?league=39&season=2022`, options);
        if (!response.ok) throw new Error('Failed to fetch team search data');
        const data = await response.json();
        return data.response;
    },
    getPlayerStats: async (playerId) => {
        const response = await fetch(`${BASE_URL}/players?id=${playerId}&league=39&season=2022`, options);
        if (!response.ok) throw new Error('Failed to fetch player stats');
        const data = await response.json();
        return data.response[0];
    },
    getPlayerSearchData: async (searchValue) => {
        const response = await fetch(`${BASE_URL}/players?league=39&search=${searchValue}`, options);
        if (!response.ok) throw new Error('Failed to fetch player search data');
        const data = await response.json();
        return data.response;
    },
};

export default apiService;