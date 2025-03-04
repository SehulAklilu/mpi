import CoachDashboard from "@/components/Dashboard/CoachDashboard";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";

function Dashboard() {
  return (
    <ContentLayout>
      <div>
        <CoachDashboard />
      </div>
    </ContentLayout>
  );
}

export default Dashboard;
