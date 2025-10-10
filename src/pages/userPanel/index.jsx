import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/adminPanel/sideBar/SideBar';


export default function DashboardLayoutUser() {
  return (
    <div className="flex min-h-screen">
      {/* سایدبار */}
      {/* <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 text-white">
        <SideBar />
      </aside> */}

      {/* محتوا */}
      {/* <div className="flex-1 flex flex-col"> */}
        {/* بالای صفحه */}
        {/* <header className="w-full bg-white shadow p-4 flex items-center justify-between">
          <TopBar />
        </header> */}

        {/* بخش اصلی محتوا */}
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      {/* </div> */}
    </div>
  );
}
