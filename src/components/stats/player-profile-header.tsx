import { isGoalkeeper } from "@/lib/utils";
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
  const primaryStats = stats.statistics?.[0];
  const playerStats = stats.player;

  const isGK = isGoalkeeper(stats);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={playerStats?.photo} alt="Player" />
              <AvatarFallback className="text-2xl">
                {`${playerStats?.firstname[0]}${playerStats?.lastname[0]}`}
              </AvatarFallback>
            </Avatar>
            <Badge variant="secondary" className="mx-auto mb-2">
              {primaryStats?.games.position || "Player"}
            </Badge>
          </div>

          <div className="flex flex-col w-full">
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{playerStats?.name}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{primaryStats?.team.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{playerStats?.nationality}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{playerStats?.age} years old</span>
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
