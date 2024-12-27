import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";
import { Skeleton } from "@/components/ui/skeleton";
import { Fixture, FixtureApiData } from "@/types/api/fixtures";
import { dateConversion } from "@/lib/utils";
import { mockFixtures } from "@/mocks/fixtures.mock";

export default function LatestResults() {
  const [results, setResults] = useState<Fixture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        setResults(mockFixtures);
        setIsLoading(false);
      }, 1000);
    } else {
      apiService
        .getRecentFixtures()
        .then((data) => {
          const formattedResults = data.map((fixture: FixtureApiData) => ({
            homeTeam: {
              name: fixture.teams.home.name,
              logo: fixture.teams.home.logo,
            },
            awayTeam: {
              name: fixture.teams.away.name,
              logo: fixture.teams.away.logo,
            },
            score: `${fixture.goals.home} - ${fixture.goals.away}`,
            date: fixture.fixture.date,
          }));
          setResults(formattedResults);
        })
        .catch((error) => console.error("Failed to fetch results:", error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Latest Results</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="border-b pb-2 last:border-b-0 w-full">
                <div className="grid grid-cols-3">
                  <div className="grid grid-cols-[1fr_2fr] items-center gap-6">
                    <img className="h-10 mx-auto" src={result.homeTeam.logo} />
                    <span>{result.homeTeam.name}</span>
                  </div>
                  <div className="text-center text-xl font-bold my-auto">
                    <span>{result.score}</span>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr] items-center gap-6">
                    <span>{result.awayTeam.name}</span>
                    <img className="h-10 mx-auto" src={result.awayTeam.logo} />
                  </div>
                </div>
                <p className="text-center text-xs italic">
                  {dateConversion(result.date)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
