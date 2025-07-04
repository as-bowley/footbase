import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Line, LineChart, XAxis, YAxis } from "recharts";

const PerformanceTab = ({ isGoalkeeper }: { isGoalkeeper: boolean }) => {
  // Mock data - in real app this would come from props or API
  const goalkeepperData = [
    { month: "Aug", saves: 12, conceded: 4, rating: 7.2, cleanSheets: 2 },
    { month: "Sep", saves: 15, conceded: 6, rating: 6.8, cleanSheets: 1 },
    { month: "Oct", saves: 18, conceded: 3, rating: 8.1, cleanSheets: 3 },
    { month: "Nov", saves: 14, conceded: 5, rating: 7.5, cleanSheets: 2 },
    { month: "Dec", saves: 20, conceded: 2, rating: 8.4, cleanSheets: 4 },
    { month: "Jan", saves: 16, conceded: 7, rating: 6.9, cleanSheets: 1 },
  ];

  const outfieldData = [
    { month: "Aug", goals: 4, assists: 2, rating: 7.2 },
    { month: "Sep", goals: 6, assists: 3, rating: 7.8 },
    { month: "Oct", goals: 3, assists: 5, rating: 7.5 },
    { month: "Nov", goals: 8, assists: 4, rating: 8.2 },
    { month: "Dec", goals: 5, assists: 6, rating: 7.9 },
    { month: "Jan", goals: 7, assists: 3, rating: 8.1 },
  ];

  const performanceData = isGoalkeeper ? goalkeepperData : outfieldData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isGoalkeeper ? "Saves & Goals Conceded" : "Goals & Assists"}
          </CardTitle>
          <CardDescription>Monthly performance over the season</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={
              isGoalkeeper
                ? {
                    saves: { label: "Saves", color: "hsl(var(--chart-1))" },
                    conceded: {
                      label: "Goals Conceded",
                      color: "hsl(var(--chart-2))",
                    },
                  }
                : {
                    goals: { label: "Goals", color: "hsl(var(--chart-1))" },
                    assists: { label: "Assists", color: "hsl(var(--chart-2))" },
                  }
            }
            className="h-[300px]"
          >
            <AreaChart data={performanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {isGoalkeeper ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="saves"
                    stackId="1"
                    stroke="var(--color-saves)"
                    fill="var(--color-saves)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="conceded"
                    stackId="2"
                    stroke="var(--color-conceded)"
                    fill="var(--color-conceded)"
                    fillOpacity={0.6}
                  />
                </>
              ) : (
                <>
                  <Area
                    type="monotone"
                    dataKey="goals"
                    stackId="1"
                    stroke="var(--color-goals)"
                    fill="var(--color-goals)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="assists"
                    stackId="1"
                    stroke="var(--color-assists)"
                    fill="var(--color-assists)"
                    fillOpacity={0.6}
                  />
                </>
              )}
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Rating</CardTitle>
          <CardDescription>Match rating progression</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rating: { label: "Rating", color: "hsl(var(--chart-3))" },
            }}
            className="h-[300px]"
          >
            <LineChart data={performanceData}>
              <XAxis dataKey="month" />
              <YAxis domain={[6, 9]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="var(--color-rating)"
                strokeWidth={3}
                dot={{ fill: "var(--color-rating)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;
