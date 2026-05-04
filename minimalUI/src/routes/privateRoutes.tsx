import { Navigate } from "react-router-dom";

export const PrivateLoginRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export const GuestListRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/app/user/list" replace />;
  }

  return children;
};

export const RoleRoute = ({ children, allowedRoles }: any) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();
  const userId = localStorage.getItem("userId");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRoles = allowedRoles.map((r: string) => r.toLowerCase());

  if (!role || !normalizedRoles.includes(role)) {
    return <Navigate to={`/user/my-account/${userId}`} replace />;
  }

  return children;
};