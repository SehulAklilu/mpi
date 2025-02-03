import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import AdminPanelLayout from "@/components/Sidebar/mainLayout";
import { useEffect } from "react";
import { Outlet, useNavigate, Location, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useRole } from "@/RoleContext";

function Home() {
  const navigate = useNavigate();
  const { setLastAttemptedRoute } = useRole();
  const location: Location<any> = useLocation();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken && location.pathname === "/") {
      navigate("/home");
    }
    if (!authToken && location.pathname !== "/") {
      setLastAttemptedRoute(location.pathname);
      navigate("/login");
    }
  }, [navigate]);
  return (
    <AdminPanelLayout>
      <Outlet />
    </AdminPanelLayout>
  );
}

export default Home;
