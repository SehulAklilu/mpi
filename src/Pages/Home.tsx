import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useRole } from "@/RoleContext";
import AdminPanelLayout from "@/components/Sidebar/mainLayout";

function Home() {
  const navigate = useNavigate();
  const { setLastAttemptedRoute } = useRole();
  const location = useLocation();
  const [authToken, setAuthToken] = useState<string | undefined>(
    Cookies.get("authToken")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(Cookies.get("authToken")); // Update state when cookies change
    };

    window.addEventListener("storage", handleStorageChange);

    console.log("is authToken updated", authToken);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (authToken === undefined && location.pathname === "/") {
      navigate("/");
    }
    if (authToken === undefined && location.pathname !== "/") {
      setLastAttemptedRoute(location.pathname);
      navigate("/login");
    }
  }, [authToken, navigate, location.pathname]);

  return (
    <AdminPanelLayout>
      <Outlet />
    </AdminPanelLayout>
  );
}

export default Home;
