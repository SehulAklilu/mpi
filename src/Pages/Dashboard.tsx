import CoachDashboard from "@/components/Dashboard/CoachDashboard";
import DashboardByPlayer from "@/components/Dashboard/DashboardByPlayer";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { useRole } from "@/RoleContext";
import Cookies from "js-cookie";

function Dashboard() {
  const { role } = useRole();
  const user_id = Cookies.get("user_id");
  return (
    <ContentLayout>
      <div>{(role === "coach" || role === "parent") && <CoachDashboard />}</div>
      <div>
        {user_id && role === "player" && (
          <DashboardByPlayer playerId={user_id} />
        )}
      </div>
    </ContentLayout>
  );
}

export default Dashboard;
