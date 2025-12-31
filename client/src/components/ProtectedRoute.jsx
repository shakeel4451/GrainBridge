import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Retrieve user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 1. Check if user is logged in
  if (!userInfo) {
    // Redirect to login if no user info exists
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the user's role is allowed for this specific route
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    // If unauthorized, redirect to their own dashboard or home
    const redirectPath =
      userInfo.role === "Admin"
        ? "/admin/dashboard"
        : userInfo.role === "Customer"
        ? "/customer/dashboard"
        : "/supplier/dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  // 3. If authenticated and authorized, render the component (children)
  return children;
};

export default ProtectedRoute;
