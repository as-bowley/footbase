import { getAge, isGoalkeeper } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { PlayerStatsAPIResponse } from "@/types/api/player-stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Users } from "lucide-react";
import PlayerQuickStats from "@/components/stats/player-quick-stats";
import { Badge } from "@/components/ui/badge";

const PlayerProfileHeader = ({
  stats,
}: {
  stats: Partial<PlayerStatsAPIResponse>;
}) => {
  const primaryStats = stats?.statistics?.find((stat) => stat.league.id === 39);
  const isGK = isGoalkeeper(stats);
  const age = stats?.player?.birth?.date
    ? getAge(stats?.player?.birth?.date)
    : "N/A";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={stats?.player?.photo} alt="Player" />
              <AvatarFallback className="text-2xl">
                {`${stats?.player?.firstname[0]}${stats?.player?.lastname[0]}`}
              </AvatarFallback>
            </Avatar>
            <Badge variant="secondary" className="mx-auto mb-2">
              {primaryStats?.games.position || "Player"}
            </Badge>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{stats?.player?.name}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{primaryStats?.team.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{stats?.player?.nationality}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{age} years old</span>
                </div>
              </div>
            </div>

            <PlayerQuickStats stats={stats} isGoalkeeper={isGK} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerProfileHeader;
