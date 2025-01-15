import { useRole } from "@/RoleContext";
import { Role } from "@/types/auth.type";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles: Role[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { role } = useRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
