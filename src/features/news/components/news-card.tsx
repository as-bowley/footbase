import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService";
import { dateConversion } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsItem } from "@/types/api/news";

// const mockNews = [
//   {
//     title: "Transfer Rumors: Star Player X Linked with Big Move",
//     publishedAt: "2023-07-15",
//   },
//   { title: "Injury Update: Key Player Y Out for 3 Weeks", publishedAt: "2023-07-14" },
//   {
//     title: "Match Preview: Upcoming Derby Between Rival Teams",
//     publishedAt: "2023-07-13",
//   },
// ];

export default function NewsCard() {
  const [latestNews, setLatestNews] = useState<NewsItem[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiService
      .getFootballNews()
      .then((data) => setLatestNews(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ul className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index} className="border-b pb-2 last:border-b-0">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {latestNews.map((item, index) => (
              <li key={index} className="border-b pb-2 last:border-b-0">
                <a href={item.url} target="_blank" rel="noreferrer">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {dateConversion(item.publishedAt)}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
