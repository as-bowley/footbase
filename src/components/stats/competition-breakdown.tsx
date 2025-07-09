import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayerStatsAPIResponse } from "@/types/api/player-stats";
import { Badge } from "@/components/ui/badge";

const CompetitionBreakdown = ({ stats }: { stats: PlayerStatsAPIResponse }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Competition Breakdown</CardTitle>
        <CardDescription>
          Performance across different competitions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.statistics.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="font-medium">{stat.league.name}</div>
                <Badge variant="outline">{stat.league.country}</Badge>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold">{stat.games.appearences}</div>
                  <div className="text-muted-foreground">Apps</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {stat.games.position === "Goalkeeper"
                      ? stat.goals.saves || 0
                      : stat.goals.total || 0}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.games.position === "Goalkeeper" ? "Saves" : "Goals"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {stat.games.position === "Goalkeeper"
                      ? stat.goals.conceded
                      : stat.goals.assists || 0}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.games.position === "Goalkeeper"
                      ? "Conceded"
                      : "Assists"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {Math.round(parseFloat(stat.games.rating) * 100) / 100 ||
                      "N/A"}
                  </div>
                  <div className="text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitionBreakdown;
