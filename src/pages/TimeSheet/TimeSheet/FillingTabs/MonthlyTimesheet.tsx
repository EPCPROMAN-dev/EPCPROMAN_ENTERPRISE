import { useState } from "react";
import { EventCalendar } from "@mui/x-scheduler/event-calendar";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

interface MonthlyTimesheetProps {
  view: "day" | "week" | "month";
  visibleDate: Date;
  selectedDate: Date;
  onVisibleDateChange: (date: Date) => void;
  onSelectedDateChange: (date: Date) => void;
}

interface TimesheetEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  project: string;
  description: string;
}

const projectList = ["APEXMIS", "EPCPROMAN", "Timesheet Module"];

export default function MonthlyTimesheet({
  view,
  visibleDate,
  selectedDate,
  onVisibleDateChange,
  onSelectedDateChange,
}: MonthlyTimesheetProps) {
  // Form states
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");

  // Store all timesheet entries
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);

  // Format selected date
  const formattedDate = selectedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Get selected date in YYYY-MM-DD format
  const dateKey = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, "0"),
    String(selectedDate.getDate()).padStart(2, "0"),
  ].join("-");

  // Filter entries for selected date
  const filteredEntries = entries.filter((entry) => {
    return entry.date === dateKey;
  });

  // Clear form
  const handleClear = () => {
    setStartTime(null);
    setEndTime(null);
    setProject("");
    setDescription("");
  };

  // Save timesheet entry
  const handleSaveEntry = () => {
    if (!startTime || !endTime || !project || !description.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();

    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();

    if (endMinutes <= startMinutes) {
      alert("End time must be later than start time.");
      return;
    }

    const newEntry: TimesheetEntry = {
      id: Date.now(),
      date: dateKey,

      startTime: startTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),

      endTime: endTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),

      project: project,
      description: description,
    };

    setEntries((previousEntries) => [...previousEntries, newEntry]);

    handleClear();
  };

  // Handle calendar clicks
  const handleCalendarClick = (event: any) => {
    const target = event.target as HTMLElement;

    // MONTHLY VIEW
    if (view === "month") {
      const dateCell = target.closest(".MuiEventCalendar-monthViewCell");

      if (!dateCell) return;

      const dateButton = dateCell.querySelector(
        ".MuiEventCalendar-monthViewCellNumberButton",
      );

      if (!dateButton) return;

      const day = Number(dateButton.textContent?.trim());

      if (!day) return;

      const clickedDate = new Date(
        visibleDate.getFullYear(),
        visibleDate.getMonth(),
        day,
      );

      onSelectedDateChange(clickedDate);
    }

    // WEEKLY VIEW
    if (view === "week") {
      const headerButton = target.closest(
        ".MuiEventCalendar-dayTimeGridHeaderButton",
      );

      if (!headerButton) return;

      const headerCell = headerButton.closest(
        ".MuiEventCalendar-dayTimeGridHeaderCell",
      );

      if (!headerCell) return;

      const dateLabel = headerCell.getAttribute("aria-label");

      if (!dateLabel) return;

      // Example: Monday, November 9, 2026
      const clickedDate = new Date(
        dateLabel + ", " + visibleDate.getFullYear(),
      );

      if (isNaN(clickedDate.getTime())) return;

      onSelectedDateChange(clickedDate);
    }
  };

  return (
    <div
      className="pt-2"
      style={{
        display: "flex",
        height: "calc(100vh - 199px)",
        gap: "10px",
      }}
    >
      {/* LEFT: CALENDAR */}
      <div className="pt-2 w-3/5 ">
        <div
          onClick={handleCalendarClick}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <EventCalendar
            view={view}
            views={["day", "week", "month"]}
            visibleDate={visibleDate}
            onVisibleDateChange={onVisibleDateChange}
            showCurrentTimeIndicator={view === "day" || view === "week"}
            eventCreation={false}
          />
        </div>
      </div>

      {/* RIGHT: TIMESHEET ENTRY FORM */}
      <div className="pt-2 w-2/5 min-w-0">
        <div className="h-full w-full bg-gray-100 rounded-lg shadow-md p-4 overflow-y-auto ">
          {/* SELECTED DATE */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Selected Date
            </label>

            <div className="font-semibold text-gray-800">{formattedDate}</div>
          </div>

          {/* START TIME AND END TIME */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time *
              </label>

              <TimePicker
                value={startTime}
                onChange={(event) => setStartTime(event.value)}
                format="hh:mm a"
                placeholder="Start Time"
                width="100%"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time *
              </label>

              <TimePicker
                value={endTime}
                onChange={(event) => setEndTime(event.value)}
                format="hh:mm a"
                placeholder="End Time"
                width="100%"
              />
            </div>
          </div>

          {/* PROJECT NAME */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>

            <DropDownList
              data={projectList}
              value={project}
              onChange={(event) => setProject(event.value)}
              defaultItem="Select Project"
              style={{ width: "100%" }}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the work completed..."
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none outline-none focus:border-blue-500"
            />
          </div>

          {/* FORM BUTTONS */}
          <div className="flex justify-end gap-2 mb-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleSaveEntry}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Entry
            </button>
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* TIMESHEET ENTRIES GRID */}
          <div className="mb-3">
            <h3 className="font-semibold text-gray-800 mb-3">
              Timesheet Entries
            </h3>

            <Grid data={filteredEntries} style={{ maxHeight: "350px" }}>
              <GridColumn field="startTime" title="Start Time" width="105px" />

              <GridColumn field="endTime" title="End Time" width="105px" />

              <GridColumn field="project" title="Project" width="130px" />

              <GridColumn field="description" title="Description" />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
