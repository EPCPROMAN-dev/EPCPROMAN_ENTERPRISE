import { useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { EventCalendar } from "@mui/x-scheduler/event-calendar";
import type { SchedulerEvent } from "@mui/x-scheduler/models";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../types/LayoutContext";
import AddIcon from "@mui/icons-material/Add";

import "./Calendar.css";
// import "../FilterBar/FilterBar.css";

// Sample calendar events
const initialEvents: SchedulerEvent[] = [
  {
    id: 1,
    title: "Project Discussion",
    start: "2026-11-10T10:00:00",
    end: "2026-11-10T11:00:00",
  },
  {
    id: 2,
    title: "Team Meeting",
    start: "2026-11-12T14:00:00",
    end: "2026-11-12T15:30:00",
  },
  {
    id: 3,
    title: "Client Meeting",
    start: "2026-11-15T11:00:00",
    end: "2026-11-15T12:00:00",
  },
  {
    id: 4,
    title: "Project Review",
    start: "2026-11-18T09:00:00",
    end: "2026-11-18T10:30:00",
  },
];

function Calendar() {
  // Filter dropdown data
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Events", value: "events" },
    { label: "Meetings", value: "meetings" },
    { label: "Appointments", value: "appointments" },
    { label: "Actions", value: "actions" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("all");

  // Calendar events
  const [events, setEvents] = useState<SchedulerEvent[]>(initialEvents);
  const [calendarView, setCalendarView] = useState<
    "day" | "week" | "month" | "agenda"
  >("month");

  // Handle filter change
  const handleFilterChange = (event: any) => {
    setSelectedFilter(event.value.value);
  };

  const { isExpanded, setIsExpanded } = useOutletContext<LayoutContextType>();

  return (
    <div className="calendar-page h-100">
      {/* Top Filter Toolbar */}

      <div className="calendar-filter-toolbar rounded-lg border border-gray-200 bg-white px-5 py-2 shadow-sm flex justify-between items-end gap-4">
        {/* Filter Dropdown */}
        <div className="flex gap-5">
          <div className="calendar-filter-field flex items-center  gap-3 w-80">
            <label className="mb-2">Reporting Group :</label>
            <DropDownList
              className="filter-control flex-1 w-32"
              data={filterOptions}
              textField="label"
              dataItemKey="value"
              value={filterOptions.find(
                (option) => option.value === selectedFilter,
              )}
              onChange={handleFilterChange}
            />
          </div>
          <div className="calendar-filter-field flex items-center  gap-3 w-80">
            <label className="mb-2">Employee :</label>
            <DropDownList
              className="filter-control flex-1 w-32"
              data={filterOptions}
              textField="label"
              dataItemKey="value"
              value={filterOptions.find(
                (option) => option.value === selectedFilter,
              )}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <Box>
          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            color="primary"
          >
            {isExpanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>
      </div>

      {/* MUI Scheduler Calendar */}

      <div className="calendar-grid">
        <div className="calendar-scheduler-container-main">
          <div className="calendar-view-switcher">
            {(["week", "month"] as const).map((view) => (
              <Button
                variant={calendarView === view ? "contained" : "outlined"}
                key={view}
                onClick={() => setCalendarView(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Button>
            ))}
            {/* New Meeting Button */}

            <Button variant="outlined" startIcon={<AddIcon />}>
              New
            </Button>
          </div>
          <div className="calendar-scheduler-container p-3">
            <EventCalendar
              events={events}
              onEventsChange={setEvents}
              views={["day", "week", "month"]}
              view={calendarView}
              onViewChange={setCalendarView}
              defaultVisibleDate={new Date(2026, 10, 10)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
