
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";

import Collapse from "@mui/material/Collapse";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface MenuItem {
  label: string;
  icon: ReactNode;
  path?: string;
  children?: MenuItem[];
}


const timesheetItems: MenuItem[] = [
  {
    label: "Filling",
    path: "/timesheet/filling",
    icon: <DescriptionOutlinedIcon />,
  },
  {
    label: "Approval",
    path: "/timesheet/approval",
    icon: <FactCheckOutlinedIcon />,
  },
  {
    label: "View Attendance",
    path: "/timesheet/attendance",
    icon: <PersonOutlineIcon />,
  },
  {
    label: "Punch-In Details",
    path: "/timesheet/punch-in-details",
    icon: <AccessTimeOutlinedIcon />,
  },
  {
    label: "Punch-Processing Data",
    path: "/timesheet/pre-processing",
    icon: <StorageOutlinedIcon />,
  },
];

const leaveItems: MenuItem[] = [
  {
    label: "New/Edit",
    icon: <EditOutlinedIcon />,
    children: [
      {
        label: "Leave Apply",
        path: "/leave/new-edit/leave-apply",
        icon: <SendOutlinedIcon />,
      },
      {
        label: "Applied History",
        path: "/leave/new-edit/applied-history",
        icon: <HistoryOutlinedIcon />,
      },
      {
        label: "Processed History",
        path: "/leave/new-edit/processed-history",
        icon: <HistoryOutlinedIcon />,
      },
    ],
  },
  {
    label: "Approval/Disapproval",
    path: "/leave/approval-disapproval",
    icon: <VerifiedUserOutlinedIcon />,
  },
];

const changeItems: MenuItem[] = [
  { label: "Approver Employee",  path: "/changes-manages/approver-employee", icon: <GroupsOutlinedIcon /> },
];

// means a variable of type SectionKey can contain only one of these three strings
type SectionKey = "timesheet" | "leave" | "changes";

export default function TimesheetSidebar() {

    const location = useLocation();
    const currentPath = location.pathname;  

  const [expandedSection, setExpandedSection] =
    useState<SectionKey | null>("timesheet");
  
  const [expandedNestedItems, setExpandedNestedItems] =
    useState<Record<string, boolean>>({
      "New/Edit": false,
    });
  
  const toggleSection = (section: SectionKey) => {
    setExpandedSection((current) =>
      current === section ? null : section
    );
  };
  
  const toggleNestedItem = (label: string) => {
    setExpandedNestedItems((current) => ({
      ...current,
      [label]: !current[label],
    }));
  };

   useEffect(() => {
      if (currentPath.startsWith("/timesheet/")) {
        setExpandedSection("timesheet");
      } else if (currentPath.startsWith("/leave/")) {
        setExpandedSection("leave");
      } else if (currentPath.startsWith("/changes/")) {
        setExpandedSection("changes");
      }
    
      if (currentPath.startsWith("/leave/new-edit/")) {
        setExpandedNestedItems((current) => ({
          ...current,
          "New/Edit": true,
        }));
      }
    }, [currentPath]);
 
const renderItems = (items: MenuItem[], level = 1) =>
  items.map((item) => {
    const content = (
      <>
        <span className="timesheet-nav-icon">{item.icon}</span>
        <span className="timesheet-nav-label">{item.label}</span>
      </>
    );

    // If the item has children, render it as an expandable parent.
    if (item.children?.length) {
      return (
        <div
          key={item.label}
          className={`timesheet-nested-section level-${level}`}
        >
          <button
            type="button"
            className="timesheet-nav-item timesheet-nested-heading"
            onClick={() => toggleNestedItem(item.label)}
            aria-expanded={!!expandedNestedItems[item.label]}
          >
            {content}
            {expandedNestedItems[item.label] ? (
              <ExpandLessIcon className="timesheet-section-arrow" />
            ) : (
              <ExpandMoreIcon className="timesheet-section-arrow" />
            )}
          </button>

          <Collapse
            in={!!expandedNestedItems[item.label]}
            timeout="auto"
            unmountOnExit
          >
            <nav
              className="timesheet-nav-items timesheet-nested-items"
              aria-label={item.label}
            >
              {renderItems(item.children, level + 1)}
            </nav>
          </Collapse>
        </div>
      );
    }

    // If the item has a route, render it as a link.
    if (item.path) {
      return (
        <NavLink
          key={item.label}
          to={item.path}
          end
          className={({ isActive }) =>
            `timesheet-nav-item${isActive ? " active" : ""}`
          }
        >
          {content}
        </NavLink>
      );
    }

    return null;
  });


  const renderSection = (
    label: string,
    section: SectionKey,
    icon: ReactNode,
    items: MenuItem[]
  ) => (
    <section className="timesheet-nav-section">
        <button
          type="button"
          className="timesheet-section-heading"
          onClick={() => toggleSection(section)}
          aria-expanded={expandedSection === section}
          title={label}
        >
          <span className="timesheet-section-icon">{icon}</span>
          <span className="timesheet-section-label">{label}</span>

          {expandedSection === section ? (
            <ExpandLessIcon className="timesheet-section-arrow" />
          ) : (
            <ExpandMoreIcon className="timesheet-section-arrow" />
          )}
        </button>
      
        <Collapse
         in={expandedSection === section}
          timeout="auto"
          unmountOnExit
        >
          <nav className="timesheet-nav-items" aria-label={label}>
            {renderItems(items)}
          </nav>
        </Collapse>
    </section>
  );

  return (
    <aside className="timesheet-sidebar-inner">
      {renderSection(
        "Timesheet",
        "timesheet",
        <DescriptionOutlinedIcon />,
        timesheetItems
      )}

      <div className="timesheet-sidebar-divider" />

      {renderSection(
        "Leave",
        "leave",
        <CalendarMonthOutlinedIcon />,
        leaveItems
      )}

      <div className="timesheet-sidebar-divider" />

      {renderSection(
        "Changes/Manage",
        "changes",
        <SettingsOutlinedIcon />,
        changeItems
      )}
    </aside>
  );
}
