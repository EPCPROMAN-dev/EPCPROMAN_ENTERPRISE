
import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

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
//   A TypeScript type that allows React elements, such as icons, to be passed as values.
  icon: ReactNode; 
  path?: string;
  //   The ? means this property is optional.
}

const timesheetItems: MenuItem[] = [
  { label: "Filling", path: "/timesheet", icon: <DescriptionOutlinedIcon /> },
  { label: "Approval", icon: <FactCheckOutlinedIcon /> },
  { label: "View Attendance", icon: <PersonOutlineIcon /> },
  { label: "Punch-In Details", icon: <AccessTimeOutlinedIcon /> },
  { label: "Punch-Processing Data", icon: <StorageOutlinedIcon /> },
];

const leaveItems: MenuItem[] = [
  { label: "New/Edit", icon: <EditOutlinedIcon /> },
  { label: "Leave Apply", icon: <SendOutlinedIcon /> },
  { label: "Applied History", icon: <HistoryOutlinedIcon /> },
  { label: "Processed History", icon: <HistoryOutlinedIcon /> },
  { label: "Approval/Disapproval", icon: <VerifiedUserOutlinedIcon /> },
];

const changeItems: MenuItem[] = [
  { label: "Approver Employee", icon: <GroupsOutlinedIcon /> },
];

// means a variable of type SectionKey can contain only one of these three strings
type SectionKey = "timesheet" | "leave" | "changes";

export default function TimesheetSidebar() {
//   const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>({
//     timesheet: true,
//     leave: true,
//     changes: true,
//   });

const [expandedSection, setExpandedSection] = useState<SectionKey | null>("timesheet");

const toggleSection = (section: SectionKey) => {
  setExpandedSection((current) =>
    current === section ? null : section
  );
};

  const renderItems = (items: MenuItem[]) =>
    items.map((item) => {
      const content = (
        <>
          <span className="timesheet-nav-icon">{item.icon}</span>
          <span className="timesheet-nav-label">{item.label}</span>
        </>
      );

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

      return (
        <button
          key={item.label}
          type="button"
          className="timesheet-nav-item"
          disabled
          title="This page has not been implemented yet"
        >
          {content}
        </button>
      );
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
