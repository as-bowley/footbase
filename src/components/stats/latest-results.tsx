import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockResults = [
  { homeTeam: "Team A", awayTeam: "Team B", score: "2-1" },
  { homeTeam: "Team C", awayTeam: "Team D", score: "0-0" },
  { homeTeam: "Team E", awayTeam: "Team F", score: "3-2" },
];

export default function LatestResults() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Results</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockResults.map((result, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{result.homeTeam}</span>
              <span className="font-bold">{result.score}</span>
              <span>{result.awayTeam}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
