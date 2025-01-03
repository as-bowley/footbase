import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component
import apiService from "@/services/apiService";
import { mockScorers } from "@/mocks/playerStats.mock";

type TopScorer = {
  name: string;
  team: string;
  goals: number;
};

export default function TopScorers() {
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        setTopScorers(mockScorers);
        setIsLoading(false);
      }, 1000);
    } else {
      apiService.getTopScorers().then((data) => {
        const formattedData = data.map(
          (scorer: { name: string; team: string; goals: number }) => ({
            name: scorer.name,
            team: scorer.team,
            goals: scorer.goals,
          }),
        );

        setTopScorers(formattedData);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Scorers</CardTitle>
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
            {topScorers.map((scorer: TopScorer, index) => (
              <li key={index} className="grid grid-cols-3 items-center">
                <span>{scorer.name}</span>
                <span className="text-sm text-muted-foreground">
                  {scorer.team}
                </span>
                <span className="font-bold ml-auto">{scorer.goals}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
