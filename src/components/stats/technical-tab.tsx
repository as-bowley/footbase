import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerStatsAPIResponse } from "@/types/api/player-stats";
import { Progress } from "@/components/ui/progress";

const TechnicalTab = ({
  stats,
  isGoalkeeper,
}: {
  stats: PlayerStatsAPIResponse;
  isGoalkeeper: boolean;
}) => {
  const primaryStats = stats.statistics.find((stat) => stat.league.id === 39);

  const totalStats = stats.statistics.reduce(
    (acc, stat) => ({
      saves: acc.saves + (stat.goals.saves || 0),
      conceded: acc.conceded + (stat.goals.conceded || 0),
      passes: acc.passes + (stat.passes.total || 0),
      keyPasses: acc.keyPasses + (stat.passes.key || 0),
      duelsWon: acc.duelsWon + (stat.duels.won || 0),
      duelsTotal: acc.duelsTotal + (stat.duels.total || 0),
      tackles: acc.tackles + (stat.tackles.total || 0),
      shots: acc.shots + (stat.shots.total || 0),
      shotsOn: acc.shotsOn + (stat.shots.on || 0),
    }),
    {
      saves: 0,
      conceded: 0,
      passes: 0,
      keyPasses: 0,
      duelsWon: 0,
      duelsTotal: 0,
      tackles: 0,
      shots: 0,
      shotsOn: 0,
    },
  );

  const savePercentage =
    totalStats.saves > 0
      ? Math.round(
          (totalStats.saves / (totalStats.saves + totalStats.conceded)) * 100,
        )
      : 0;

  const shotAccuracy =
    totalStats.shots > 0
      ? Math.round((totalStats.shotsOn / totalStats.shots) * 100)
      : 0;

  if (isGoalkeeper) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Passes</span>
              <span className="font-semibold">{totalStats.passes}</span>
            </div>
            <div className="flex justify-between">
              <span>Key Passes</span>
              <span className="font-semibold">{totalStats.keyPasses}</span>
            </div>
            <div className="flex justify-between">
              <span>Pass Accuracy</span>
              <span className="font-semibold">
                {primaryStats?.passes.accuracy || "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shot Stopping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Saves</span>
              <span className="font-semibold">{totalStats.saves}</span>
            </div>
            <div className="flex justify-between">
              <span>Save Percentage</span>
              <span className="font-semibold">{savePercentage}%</span>
            </div>
            <Progress value={savePercentage} />
            <div className="flex justify-between">
              <span>Goals Conceded</span>
              <span className="font-semibold">{totalStats.conceded}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Defensive Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Penalties Saved</span>
              <span className="font-semibold">
                {primaryStats?.penalty.saved || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Duels Won</span>
              <span className="font-semibold">
                {totalStats.duelsWon}/{totalStats.duelsTotal}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tackles</span>
              <span className="font-semibold">{totalStats.tackles}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Passing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Total Passes</span>
            <span className="font-semibold">{totalStats.passes}</span>
          </div>
          <div className="flex justify-between">
            <span>Key Passes</span>
            <span className="font-semibold">{totalStats.keyPasses}</span>
          </div>
          <div className="flex justify-between">
            <span>Pass Accuracy</span>
            <span className="font-semibold">
              {primaryStats?.passes.accuracy || "N/A"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Total Shots</span>
            <span className="font-semibold">{totalStats.shots}</span>
          </div>
          <div className="flex justify-between">
            <span>Shots on Target</span>
            <span className="font-semibold">{totalStats.shotsOn}</span>
          </div>
          <div className="flex justify-between">
            <span>Shot Accuracy</span>
            <span className="font-semibold">{shotAccuracy}%</span>
          </div>
          <Progress value={shotAccuracy} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Duels & Tackles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Duels Won</span>
            <span className="font-semibold">
              {totalStats.duelsWon}/{totalStats.duelsTotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Success Rate</span>
            <span className="font-semibold">
              {totalStats.duelsTotal
                ? Math.round(
                    (totalStats.duelsWon / totalStats.duelsTotal) * 100,
                  )
                : 0}
              %
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tackles</span>
            <span className="font-semibold">{totalStats.tackles}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalTab;
