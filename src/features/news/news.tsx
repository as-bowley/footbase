import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockNews = [
  {
    title: "Transfer Rumors: Star Player X Linked with Big Move",
    date: "2023-07-15",
  },
  { title: "Injury Update: Key Player Y Out for 3 Weeks", date: "2023-07-14" },
  {
    title: "Match Preview: Upcoming Derby Between Rival Teams",
    date: "2023-07-13",
  },
];

export default function LatestNews() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockNews.map((item, index) => (
            <li key={index} className="border-b pb-2 last:border-b-0">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
