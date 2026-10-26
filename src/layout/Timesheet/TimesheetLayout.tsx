
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import TimesheetSidebar from "../../pages/TimeSheet/TimesheetSidebar";
// import ModuleBreadcrumb from "../../components/Breadcrumb/ModuleBreadcrumb"

import "../../pages/TimeSheet/Timesheet.css";

export default function TimesheetLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="timesheet-app">
      <Header
        open={sidebarOpen}
        handleDrawerToggle={() =>
          setSidebarOpen((previous) => !previous)
        }
      />

      <div
        className={`timesheet-body ${
          sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
      >
        <aside className="timesheet-sidebar">
          <TimesheetSidebar />
        </aside>
      
        <main className="timesheet-main">
              {/* <ModuleBreadcrumb/> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
