import { PlayerStatsAPIResponse } from "@/types/api/player-stats";

const PlayerQuickStats = ({
  stats,
  isGoalkeeper,
}: {
  stats: Partial<PlayerStatsAPIResponse>;
  isGoalkeeper: boolean;
}) => {
  const totalStats = stats.statistics?.reduce(
    (acc, stat) => ({
      appearances: acc.appearances + (stat.games.appearences || 0),
      minutes: acc.minutes + (stat.games.minutes || 0),
      goals: acc.goals + (stat.goals.total || 0),
      assists: acc.assists + (stat.goals.assists || 0),
      saves: acc.saves + (stat.goals.saves || 0),
      conceded: acc.conceded + (stat.goals.conceded || 0),
      cleanSheets:
        acc.cleanSheets +
        (stat.goals.conceded === 0 && stat.games.appearences > 0 ? 1 : 0),
    }),
    {
      appearances: 0,
      minutes: 0,
      goals: 0,
      assists: 0,
      saves: 0,
      conceded: 0,
      cleanSheets: 0,
    },
  ) || {
    appearances: 0,
    minutes: 0,
    goals: 0,
    assists: 0,
    saves: 0,
    conceded: 0,
    cleanSheets: 0,
  };

  const avgRating =
    (stats?.statistics
      ?.filter((stat) => stat.games.rating)
      ?.reduce((acc, stat) => acc + parseFloat(stat.games.rating!), 0) || 0) /
    (stats?.statistics?.filter((stat) => stat.games.rating)?.length || 1);

  if (isGoalkeeper) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
        <div className="text-center border-r border-gray-300">
          <div className="text-2xl font-bold text-blue-600">
            {totalStats.saves}
          </div>
          <div className="text-sm text-muted-foreground">Saves</div>
        </div>
        <div className="text-center border-r border-gray-300">
          <div className="text-2xl font-bold text-green-600">
            {totalStats.cleanSheets}
          </div>
          <div className="text-sm text-muted-foreground">Clean Sheets</div>
        </div>
        <div className="text-center border-r border-gray-300">
          <div className="text-2xl font-bold text-purple-600">
            {avgRating ? avgRating.toFixed(1) : "N/A"}
          </div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {totalStats.appearances}
          </div>
          <div className="text-sm text-muted-foreground">Appearances</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center h-full">
      <div className="text-center border-r border-gray-300">
        <div className="text-2xl font-bold text-green-600">
          {totalStats.goals}
        </div>
        <div className="text-sm text-muted-foreground">Goals</div>
      </div>
      <div className="text-center border-r border-gray-300">
        <div className="text-2xl font-bold text-orange-600">
          {totalStats.assists}
        </div>
        <div className="text-sm text-muted-foreground">Assists</div>
      </div>
      <div className="text-center border-r border-gray-300">
        <div className="text-2xl font-bold text-purple-600">
          {avgRating ? avgRating.toFixed(1) : "N/A"}
        </div>
        <div className="text-sm text-muted-foreground">Avg Rating</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">
          {totalStats.appearances}
        </div>
        <div className="text-sm text-muted-foreground">Appearances</div>
      </div>
    </div>
  );
};

export default PlayerQuickStats;
