import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, user: clerkUser } = useClerk();
  const user = useSelector((state) => state.user.value);

  // Jab tak auth state load ho rahi hai tab tak spinner/blank dikhao
  if (!isLoaded) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  // Agar user login nahi hai tabhi login page bhejo
  if (!user || !clerkUser) {
    return <Navigate to="/login" replace />;
  }

  // Nahi to normal page dikhao
  return children;
};

export default ProtectedRoute;
