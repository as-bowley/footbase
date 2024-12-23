import DashboardLayout from "@/components/layout/dashboard-layout";
import LatestNews from "@/features/news/news";
import LeagueTable from "@/components/stats/league-table";
import TopScorers from "@/components/stats/top-scorers";
import TopAssists from "@/components/stats/top-assists";
import LatestResults from "@/components/stats/latest-results";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LatestResults />
          <LeagueTable />
          <TopScorers />
          <TopAssists />
          <LatestNews />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
