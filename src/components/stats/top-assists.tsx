import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";
import { TopAssist } from "@/types/api/player-stats";
import { mockAssists } from "@/mocks/playerStats.mock";

export default function TopAssists() {
  const [topAssists, setTopAssists] = useState<TopAssist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        setTopAssists(mockAssists.slice(0, 5));
        setIsLoading(false);
      }, 1000);
    } else {
      apiService.getTopAssists().then((data) => {
        const formattedData = data
          .slice(0, 5)
          .map((assist: { name: string; team: string; assists: number }) => ({
            name: assist.name,
            team: assist.team,
            assists: assist.assists,
          }));

        setTopAssists(formattedData);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Assists</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ul className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="flex justify-between items-center">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-1/4 h-4" />
                <Skeleton className="w-1/6 h-4" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2">
            {topAssists.map((topAssist: TopAssist, index) => (
              <li key={index} className="grid grid-cols-3 items-center">
                <span>{topAssist.name}</span>
                <span className="text-sm text-muted-foreground">
                  {topAssist.team}
                </span>
                <span className="font-bold ml-auto">{topAssist.assists}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
