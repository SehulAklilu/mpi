import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import AdminPanelLayout from "@/components/Sidebar/mainLayout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      const tokenExpiryTime = 10 * 60 * 1000;
      const timeout = setTimeout(() => {
        Cookies.remove("authToken");
        navigate("/login");
      }, tokenExpiryTime);

      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  return (
    <AdminPanelLayout>
      <ContentLayout title="Foundation">
        <Outlet />
      </ContentLayout>
    </AdminPanelLayout>
  );
}

export default Home;
