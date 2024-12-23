import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockScorers = [
  { name: "Player A", team: "Team X", goals: 12 },
  { name: "Player B", team: "Team Y", goals: 10 },
  { name: "Player C", team: "Team Z", goals: 9 },
  { name: "Player D", team: "Team W", goals: 8 },
  { name: "Player E", team: "Team V", goals: 7 },
];

export default function TopScorers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Scorers</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockScorers.map((scorer, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{scorer.name}</span>
              <span className="text-sm text-muted-foreground">
                {scorer.team}
              </span>
              <span className="font-bold">{scorer.goals}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
