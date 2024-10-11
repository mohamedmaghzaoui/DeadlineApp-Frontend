import React from "react";
import { Navigate, Route } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Import the jwt-decode library to decode token

// Function to get the user's role from the token
const getUserRoleFromToken = () => {
  const token = sessionStorage.getItem("token"); // Retrieve the token from local storage

  if (token) {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken.role);
    return decodedToken.role;
  }
  return null;
};

export const ProtectedRoute = ({ element, allowedRoles }) => {
  // Retrieve the user's role using the getUserRoleFromToken function
  const userRole = getUserRoleFromToken();

  // Check if the user's role is allowed for this route
  if (!allowedRoles.includes(userRole)) {
    // Redirect the user to a different page (e.g., login page)
    return <Navigate to="/connecter" />;
  }

  // Render the protected route
  return element;
};
