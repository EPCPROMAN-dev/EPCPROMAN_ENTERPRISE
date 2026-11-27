import { useState, useEffect } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { EventCalendar, } from "@mui/x-scheduler/event-calendar";
import type { SchedulerEvent, SchedulerEventColor, } from "@mui/x-scheduler/models";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../types/LayoutContext";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import "./Calendar.css";
// import "../FilterBar/FilterBar.css";

interface CalendarEvent extends SchedulerEvent {
  eventType: string;
  employeeIds: string[];
  location: string;
  notes: string;
  allDay: boolean;
  meetingLink: string;
  color?: SchedulerEventColor;
}

// Sample calendar events
const initialEvents = [
  {
    id: 1,
    title: "Weekly Coordination Meeting",
    start: "2026-11-17T10:00:00",
    end: "2026-11-17T11:00:00",
    eventType: "Meeting",
    employeeIds: ["neha", "kavita", "arjun"],
    location: "Site Office",
    notes: "Discuss project progress",
    allDay: false,
    meetingLink: "",
  },
  {
    id: 2,
    title: "Team Meeting",
    start: "2026-11-12T14:00:00",
    end: "2026-11-12T15:30:00",
    eventType: "Meeting",
    employeeIds: ["neha", "kavita", "arjun"],
    location: "Site Office",
    notes: "Discuss project progress",
    allDay: false,
    meetingLink: "",
  },
  {
    id: 3,
    title: "Client Meeting",
    start: "2026-11-15T11:00:00",
    end: "2026-11-15T12:00:00",
    eventType: "Meeting",
    employeeIds: ["neha", "kavita", "arjun"],
    location: "Site Office",
    notes: "Discuss project progress",
    allDay: false,
    meetingLink: "",
  },
];

// Reporting Group dropdown data
const reportingGroups = [
  { label: "Whole organisation", value: "all" },
  { label: "Amol Kurkute — Project Director (team)", value: "amol" },
  { label: "Priya Nair — Construction Manager (team)", value: "priya" },
  { label: "Sanjay Kulkarni — Engineering Manager (team)", value: "sanjay" },
  { label: "Neha Deshmukh — Planning Manager (team)", value: "neha" },
  { label: "Imran Shaikh — Procurement Manager (team)", value: "imran" },
];

// Employee dropdown data
const employees = [
  { label: "Amol Kurkute · Project Director", value: "amol", group: "amol" },
  {
    label: "Priya Nair · Construction Manager",
    value: "priya",
    group: "priya",
  },
  {
    label: "Sanjay Kulkarni · Engineering Manager",
    value: "sanjay",
    group: "sanjay",
  },
  { label: "Neha Deshmukh · Planning Manager", value: "neha", group: "neha" },
  {
    label: "Imran Shaikh · Procurement Manager",
    value: "imran",
    group: "imran",
  },
  { label: "Vikram Patil · Site Engineer", value: "vikram", group: "other" },
  { label: "Anita Joshi · Safety Officer", value: "anita", group: "other" },
  { label: "Rohit Sharma · Piping Lead", value: "rohit", group: "other" },
  { label: "Kavita Rao · Planning Engineer", value: "kavita", group: "neha" },
  { label: "Mohan Das · Buyer", value: "mohan", group: "other" },
  { label: "Sneha Iyer · QA/QC Engineer", value: "sneha", group: "other" },
  { label: "Arjun Reddy · Document Controller", value: "arjun", group: "neha" },
  { label: "Meera Kapoor · HR Manager", value: "meera", group: "other" },
];

const eventTypes = [
  "Meeting",
  "Site Visit",
  "Inspection",
  "Review",
  "Leave",
  "Milestone",
  "Training",
];

// colors for events
const eventColors: Record<string, SchedulerEventColor> = {
  Meeting: "blue",
  "Site Visit": "green",
  Inspection: "purple",
  Review: "amber",
  Leave: "red",
  Milestone: "teal",
  Training: "grey",
};

function Calendar() {
  // Calendar events
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem("calendarEvents");

    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });
  const [calendarView, setCalendarView] = useState<
    "day" | "week" | "month" | "agenda"
  >("month");
  // Handle filter change
  const { isExpanded, setIsExpanded } = useOutletContext<LayoutContextType>();
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  // Controls the dialog
  const [openDialog, setOpenDialog] = useState(false);
  // Stores the selected calendar date
  // const [selectedDate, setSelectedDate] = useState(new Date(2026, 10, 17));
  //Stores selected employees
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const [eventType, setEventType] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allDay, setAllDay] = useState(false);

  const [location, setLocation] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [notes, setNotes] = useState("");

  const [editingEventId, setEditingEventId] = useState<
    CalendarEvent["id"] | null
  >(null);

  // active button
  const [activeButton, setActiveButton] = useState("");

  const filteredEmployees =
    selectedGroup === "all"
      ? employees
      : employees.filter((employee) => employee.group === selectedGroup);

  const filteredEvents = events.filter((event) => {
    if (selectedEmployee !== "all") {
      return event.employeeIds.includes(selectedEmployee);
    }

    if (selectedGroup !== "all") {
      return event.employeeIds.some((id) =>
        employees.some(
          (emp) => emp.value === id && emp.group === selectedGroup,
        ),
      );
    }

    return true;
  });

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId],
    );
  };

  // Select employees from the currently selected reporting group
  const handleFilteredGroup = () => {
    setSelectedEmployees(filteredEmployees.map((employee) => employee.value));
  };

  // Select everyone
  const handleSelectAll = () => {
    setSelectedEmployees(employees.map((employee) => employee.value));
  };

  // Clear all selections
  const handleSelectNone = () => {
    setSelectedEmployees([]);
  };

  // Add new Event
  const handleCreateEvent = () => {
    if (!eventTitle.trim()) {
      alert("Please Enter event title");
      return;
    }
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee");
      return;
    }
    const newEvent: CalendarEvent = {
      id: editingEventId ?? String(Date.now()),
      title: eventTitle,
      start: allDay ? `${eventDate}T00:00:00` : `${eventDate}T${startTime}:00`,
      end: allDay ? `${eventDate}T23:59:59` : `${eventDate}T${endTime}:00`,
      eventType,
      employeeIds: selectedEmployees,
      location,
      meetingLink,
      notes,
      allDay,
      color: eventColors[eventType],
    };
    if (editingEventId !== null) {
      // Update existing event
      setEvents((prev) =>
        prev.map((event) => (event.id === editingEventId ? newEvent : event)),
      );
    } else {
      // Create new event
      setEvents((prev) => [...prev, newEvent]);
    }
    setOpenDialog(false);
  };

  // To open the same modal for edit date or task or event
  const handleEventEditingStart = (occurrence: any, eventDetails: any) => {
    if (eventDetails.reason === "creation") {
      eventDetails.cancel();
      return;
    }

    if (eventDetails.reason === "edit") {
      eventDetails.cancel();

      const event = events.find((item) => item.id === occurrence.id);

      if (event) {
        setEditingEventId(event.id);

        setEventTitle(event.title);
        setEventType(event.eventType);

        setEventDate(event.start.slice(0, 10));
        setStartTime(event.start.slice(11, 16));
        setEndTime(event.end.slice(11, 16));

        setLocation(event.location);
        setMeetingLink(event.meetingLink);
        setNotes(event.notes);
        setSelectedEmployees(event.employeeIds);
        setAllDay(event.allDay);

        setOpenDialog(true);
      }
    }
  };

  //Reset the Event after click or creating new event
  const resetEventForm = () => {
    setEditingEventId(null);
    setEventType("");
    setEventTitle("");
    setEventDate("");
    setStartTime("");
    setEndTime("");
    setAllDay(false);
    setLocation("");
    setMeetingLink("");
    setNotes("");
    setSelectedEmployees([]);
    setActiveButton("");
  };

  const handleDeleteEvent=()=>{
    if(editingEventId===null) return;

    const confirmDelete=window.confirm("Are you sure you want to delte this event ?");

    if(!confirmDelete) return;

    setEvents((prev)=>prev.filter((event)=>event.id!==editingEventId));
    setOpenDialog(false);
    resetEventForm();
  }

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

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
              data={reportingGroups}
              textField="label"
              dataItemKey="value"
              value={reportingGroups.find(
                (group) => group.value === selectedGroup,
              )}
              onChange={(event) => {
                setSelectedGroup(event.value.value);
                // Reset employee when reporting group changes
                setSelectedEmployee("all");
              }}
            />
          </div>

          <div className="calendar-filter-field flex items-center  gap-3 w-80">
            <label className="mb-2">Employee :</label>
            <DropDownList
              className="filter-control flex-1 w-32"
              data={[
                { label: "All in group", value: "all" },
                ...filteredEmployees,
              ]}
              textField="label"
              dataItemKey="value"
              value={[
                { label: "All in group", value: "all" },
                ...filteredEmployees,
              ].find((employee) => employee.value === selectedEmployee)}
              onChange={(event) => {
                setSelectedEmployee(event.value.value);
              }}
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

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              New
            </Button>
          </div>
          <div className="calendar-scheduler-container p-3">
            <EventCalendar
              events={filteredEvents}
              onEventsChange={setEvents}
              views={["day", "week", "month"]}
              view={calendarView}
              onViewChange={setCalendarView}
              defaultVisibleDate={new Date(2026, 10, 10)}
              onEventEditingStart={handleEventEditingStart}
            />
          </div>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <Box className="my-5 flex flex-column gap-3">
            <TextField
              select
              label="Event Type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              fullWidth
              required
              size="small"
              className=""
            >
              {eventTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Title"
              placeholder="e.g Weekly coordination meeting"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              fullWidth
              size="small"
              required
              className=""
            ></TextField>{" "}
          </Box>

          <Box className="flex flex-column gap-3 my-5">
            {/* Date */}
            <TextField
              label="Date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              fullWidth
              size="small"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            {/* Start and End Time */}
            <TextField
              label="Start Time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              size="small"
              disabled={allDay}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />

            <TextField
              label="End Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              fullWidth
              size="small"
              disabled={allDay}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Box>

          {/* All Day */}
          <FormControlLabel
            control={
              <Checkbox
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
            }
            label="All-day event"
          />

          <Box className="my-5 flex flex-column gap-3">
            {/* Location */}
            <TextField
              label="Location"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              size="small"
            />

            {/* Meeting Link */}
            <TextField
              label="Meeting Link"
              placeholder="Paste meeting link"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              fullWidth
              size="small"
            />
          </Box>
          <Box className="my-4">
            {/* Notes */}
            <TextField
              label="Notes"
              placeholder="Add event description or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Box>

          <Box className="flex flex-column gap-3 my-4 justify-between items-center">
            <h4 className="">Selected Employees : </h4>
            {/* Slection button */}
            <Box className="flex flex-column gap-3">
              <Button
                variant={activeButton === "filtered" ? "contained" : "outlined"}
                onClick={() => {
                  handleFilteredGroup();
                  setActiveButton("filtered");
                }}
                size="small"
              >
                Filtered Group
              </Button>
              <Button
                variant={activeButton === "All" ? "contained" : "outlined"}
                onClick={() => {
                  handleSelectAll();
                  setActiveButton("All");
                }}
                size="small"
              >
                All
              </Button>
              <Button
                variant={activeButton === "None" ? "contained" : "outlined"}
                onClick={() => {
                  handleSelectNone();
                  setActiveButton("None");
                }}
                size="small"
              >
                None
              </Button>
            </Box>
          </Box>
          {/* Employee checkbox */}
          <Box className="h-50 overflow-auto p-2 border border-slate-300 rounded-sm">
            <FormGroup className="">
              {employees.map((employee) => (
                <FormControlLabel
                  key={employee.value}
                  control={
                    <Checkbox
                      checked={selectedEmployees.includes(employee.value)}
                      onChange={() => handleEmployeeToggle(employee.value)}
                    />
                  }
                  label={employee.label}
                />
              ))}
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          {editingEventId !==null &&(
            <Button color="error" onClick={handleDeleteEvent}>
              Delete Event
            </Button>
          )}

          <Button
            onClick={() => {
              setOpenDialog(false);
              resetEventForm();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCreateEvent();
              resetEventForm();
            }}
          >
            {editingEventId!==null ? "Update Event":"Create Event"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Calendar;
