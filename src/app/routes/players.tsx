import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { mockPlayerStats } from "@/mocks/playerStats.mock";
import { PlayerStatsAPIResponse } from "@/types/api/player-stats";
import { isGoalkeeper } from "@/lib/utils";
import PlayerProfileHeader from "@/components/stats/player-profile-header";
import StatsOverviewCards from "@/components/stats/stats-overview-cards";
import PerformanceTab from "@/components/stats/performance-tab";
import TechnicalTab from "@/components/stats/technical-tab";
import CompetitionBreakdown from "@/components/stats/competition-breakdown";

const Players = () => {
  const [stats, setStats] = useState<Partial<PlayerStatsAPIResponse>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        setStats(mockPlayerStats[0]);
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  if (!stats || isLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  const isGK = isGoalkeeper(stats);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Player Profile Header */}
        <div className="mb-8">
          <PlayerProfileHeader stats={stats} />
        </div>

        {/* Stats Overview Cards */}
        <StatsOverviewCards
          stats={stats as PlayerStatsAPIResponse}
          isGoalkeeper={isGK}
        />

        {/* Detailed Stats Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceTab isGoalkeeper={isGK} />
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <TechnicalTab
              stats={stats as PlayerStatsAPIResponse}
              isGoalkeeper={isGK}
            />
          </TabsContent>

          <TabsContent value="physical" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Physical Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">
                        {stats?.player?.height ?? "N/A"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Height
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {stats?.player?.weight ?? "N/A"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Weight
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {stats?.player?.age ?? "N/A"}
                      </div>
                      <div className="text-sm text-muted-foreground">Age</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {stats?.player?.injured === undefined
                          ? "N/A"
                          : stats.player.injured
                            ? "Yes"
                            : "No"}{" "}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Injured
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Discipline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Yellow Cards</span>
                    <span className="font-semibold">
                      {stats?.statistics?.reduce(
                        (acc, stat) => acc + (stat.cards.yellow || 0),
                        0,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Red Cards</span>
                    <span className="font-semibold">
                      {stats?.statistics?.reduce(
                        (acc, stat) => acc + (stat.cards.red || 0),
                        0,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fouls Drawn</span>
                    <span className="font-semibold">
                      {stats?.statistics?.reduce(
                        (acc, stat) => acc + (stat.fouls.drawn || 0),
                        0,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fouls Committed</span>
                    <span className="font-semibold">
                      {stats?.statistics?.reduce(
                        (acc, stat) => acc + (stat.fouls.committed || 0),
                        0,
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <CompetitionBreakdown stats={stats as PlayerStatsAPIResponse} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Players;
