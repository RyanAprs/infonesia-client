import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export const getRole = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const AdminProtectedRoute = ({
  isAuthenticated,
  redirectTo = "/",
  token,
}) => {
  const role = getRole(token);

  return isAuthenticated && role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};
