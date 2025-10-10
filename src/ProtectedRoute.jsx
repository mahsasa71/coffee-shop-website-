
import React, { useContext } from "react";
import { AuthContext } from "../src/pages/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loading...</div>; 

  if (user.isAdmin !== 1) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl font-bold">
        ⚠️ فقط مدیران به این بخش دسترسی دارند
      </div>
    );
  }

  return children;
}
