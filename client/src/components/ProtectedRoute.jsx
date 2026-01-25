import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  // 1. Retrieve and Parse User Info safely
  let userInfo = null;
  try {
    const storedData = localStorage.getItem("userInfo");
    if (storedData) {
      userInfo = JSON.parse(storedData);
    }
  } catch (error) {
    // If JSON is corrupted, force logout
    localStorage.removeItem("userInfo");
    return <Navigate to="/login" replace />;
  }

  // 2. Check if User or Token exists
  if (!userInfo || !userInfo.token) {
    // Redirect to login, but remember where they were trying to go (state)
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. Check if Token is Expired
  try {
    const decoded = jwtDecode(userInfo.token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    if (decoded.exp < currentTime) {
      // Token has expired
      console.warn("Session expired. Logging out...");
      localStorage.removeItem("userInfo");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    // If token is invalid/malformed
    localStorage.removeItem("userInfo");
    return <Navigate to="/login" replace />;
  }

  // 4. Role-Based Access Control (RBAC)
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    // If unauthorized, redirect to their specific dashboard
    let redirectPath = "/login";

    switch (userInfo.role) {
      case "Admin":
        redirectPath = "/admin/dashboard";
        break;
      case "Customer":
        redirectPath = "/customer/dashboard";
        break;
      case "Supplier":
        redirectPath = "/supplier/dashboard";
        break;
      default:
        redirectPath = "/login";
    }

    return <Navigate to={redirectPath} replace />;
  }

  // 5. Authenticated & Authorized -> Render Page
  return children;
};

export default ProtectedRoute;
