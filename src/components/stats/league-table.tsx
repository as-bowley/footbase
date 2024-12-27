import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";
import { Standing, StandingApiData } from "@/types/api/standings";
import { mockStandings } from "@/mocks/standings.mock";

export default function LeagueTable() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        setStandings(mockStandings);
        setIsLoading(false);
      }, 1000);
    } else {
      apiService.getStandings().then((data) => {
        const formattedData = data.map((standing: StandingApiData) => ({
          rank: standing.rank,
          name: standing.team.name,
          played: standing.all.played,
          points: standing.points,
        }));

        setStandings(formattedData);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Card className="row-span-3">
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
            {isLoading
              ? // Skeleton rows while loading
                Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                  </TableRow>
                ))
              : // Actual table rows
                standings.map((row) => (
                  <TableRow key={row.rank}>
                    <TableCell>{row.rank}</TableCell>
                    <TableCell>{row.name}</TableCell>
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
