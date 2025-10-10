import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/adminPanel/sideBar/SideBar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <SideBar />

     
      <main className="flex-1 md:w-2/3 bg-gray-100 p-4 overflow-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
