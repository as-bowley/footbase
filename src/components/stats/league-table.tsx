import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTableData = [
  { position: 1, team: "Team A", played: 10, points: 25 },
  { position: 2, team: "Team B", played: 10, points: 22 },
  { position: 3, team: "Team C", played: 10, points: 19 },
  { position: 4, team: "Team D", played: 10, points: 18 },
  { position: 5, team: "Team E", played: 10, points: 15 },
];

export default function LeagueTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>League Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>P</TableHead>
              <TableHead>Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTableData.map((row) => (
              <TableRow key={row.position}>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.team}</TableCell>
                <TableCell>{row.played}</TableCell>
                <TableCell>{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
