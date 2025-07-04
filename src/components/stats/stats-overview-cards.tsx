import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerStatsAPIResponse } from "@/types/api/player-stats";
import {
  Activity,
  Clock,
  Goal,
  Save,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const StatsOverviewCards = ({
  stats,
  isGoalkeeper,
}: {
  stats: PlayerStatsAPIResponse;
  isGoalkeeper: boolean;
}) => {
  const totalStats = stats.statistics.reduce(
    (acc, stat) => ({
      appearances: acc.appearances + (stat.games.appearences || 0),
      minutes: acc.minutes + (stat.games.minutes || 0),
      goals: acc.goals + (stat.goals.total || 0),
      assists: acc.assists + (stat.goals.assists || 0),
      saves: acc.saves + (stat.goals.saves || 0),
      conceded: acc.conceded + (stat.goals.conceded || 0),
      penaltiesSaved: acc.penaltiesSaved + (stat.penalty.saved || 0),
      shots: acc.shots + (stat.shots.total || 0),
      shotsOn: acc.shotsOn + (stat.shots.on || 0),
    }),
    {
      appearances: 0,
      minutes: 0,
      goals: 0,
      assists: 0,
      saves: 0,
      conceded: 0,
      penaltiesSaved: 0,
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Save Percentage
            </CardTitle>
            <Save className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savePercentage}%</div>
            <Progress value={savePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Goals Conceded
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.conceded}</div>
            <p className="text-xs text-muted-foreground">
              {totalStats.appearances
                ? (totalStats.conceded / totalStats.appearances).toFixed(1)
                : "0"}{" "}
              per game
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Minutes Played
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.minutes.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalStats.appearances
                ? Math.round(totalStats.minutes / totalStats.appearances)
                : 0}{" "}
              avg per game
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Penalties Saved
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.penaltiesSaved}
            </div>
            <p className="text-xs text-muted-foreground">This season</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Goals per Game</CardTitle>
          <Goal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalStats.appearances
              ? (totalStats.goals / totalStats.appearances).toFixed(2)
              : "0.00"}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalStats.goals} goals total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Shot Accuracy</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{shotAccuracy}%</div>
          <Progress value={shotAccuracy} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Minutes Played</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalStats.minutes.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalStats.appearances
              ? Math.round(totalStats.minutes / totalStats.appearances)
              : 0}{" "}
            avg per game
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Assists</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStats.assists}</div>
          <p className="text-xs text-muted-foreground">
            {totalStats.appearances
              ? (totalStats.assists / totalStats.appearances).toFixed(2)
              : "0.00"}{" "}
            per game
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverviewCards;
