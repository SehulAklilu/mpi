import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import AdminPanelLayout from "@/components/Sidebar/mainLayout";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Foundation">
        <Outlet />
      </ContentLayout>
    </AdminPanelLayout>
  );
}

export default Home;
