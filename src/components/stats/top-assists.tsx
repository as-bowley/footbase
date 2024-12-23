import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockAssists = [
  { name: "Player K", team: "Team M", assists: 8 },
  { name: "Player L", team: "Team N", assists: 7 },
  { name: "Player M", team: "Team O", assists: 6 },
  { name: "Player N", team: "Team P", assists: 5 },
  { name: "Player O", team: "Team Q", assists: 5 },
];

export default function TopAssists() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Assists</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockAssists.map((player, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{player.name}</span>
              <span className="text-sm text-muted-foreground">
                {player.team}
              </span>
              <span className="font-bold">{player.assists}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
