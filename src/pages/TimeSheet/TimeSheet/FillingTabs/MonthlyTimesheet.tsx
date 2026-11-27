import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { EventCalendar } from "@mui/x-scheduler/event-calendar";

import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import type { Dayjs } from "dayjs";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

interface TimesheetTableProps {
  entries: TimesheetEntry[];
  selectedRows: number[];
  onSelectRow: (id: number) => void;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
}

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

// Format date
const formatEntryDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Reusable Timesheet Table
function TimesheetTable({
  entries,
  selectedRows,
  onSelectRow,
  onSelectAll,
  onDeleteSelected,
}: TimesheetTableProps) {
  const allSelected =
    entries.length > 0 &&
    entries.every((entry) => selectedRows.includes(entry.id));

  const someSelected = entries.some((entry) => selectedRows.includes(entry.id));

  return (
    <Box>
      {/* TABLE HEADER */}

      {/* TABLE */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxHeight: 350,
          border: "1px solid #e2e8f0",
          // borderRadius: 2,
        }}
      >
        <Table stickyHeader size="small">
          {/* TABLE HEAD */}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" width="90px">
                <Checkbox
                  size="small"
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={onSelectAll}
                />
              </TableCell>

              <TableCell width="150px" >Date</TableCell>
              <TableCell width="150px">Start Time</TableCell>
              <TableCell width="150px">End Time</TableCell>
              <TableCell width="150px">Project</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={selectedRows.includes(entry.id)}
                      onChange={() => onSelectRow(entry.id)}
                    />
                  </TableCell>

                  <TableCell>{formatEntryDate(entry.date)}</TableCell>

                  <TableCell>{entry.startTime}</TableCell>

                  <TableCell>{entry.endTime}</TableCell>

                  <TableCell>{entry.project}</TableCell>

                  <TableCell align="center">{entry.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 3, color: "text.secondary" }}
                >
                  No timesheet entries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function MonthlyTimesheet({
  view,
  visibleDate,
  selectedDate,
  onVisibleDateChange,
  onSelectedDateChange,
}: MonthlyTimesheetProps) {
  // FORM STATES
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");

  // LOAD DATA FROM LOCAL STORAGE
  const [entries, setEntries] = useState<TimesheetEntry[]>(() => {
    const savedEntries = localStorage.getItem("timesheetEntries");

    if (!savedEntries) return [];

    try {
      return JSON.parse(savedEntries);
    } catch {
      return [];
    }
  });

  // SAVE DATA TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("timesheetEntries", JSON.stringify(entries));
  }, [entries]);

  // TABLE STATES
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // SELECTED DATE
  const formattedDate = selectedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const dateKey = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, "0"),
    String(selectedDate.getDate()).padStart(2, "0"),
  ].join("-");

  // FILTER ENTRIES
  const filteredEntries = entries.filter((entry) => entry.date === dateKey);

  // CLEAR FORM
  const handleClear = () => {
    setStartTime(null);
    setEndTime(null);
    setProject("");
    setDescription("");
  };

  // SAVE ENTRY
  const handleSaveEntry = () => {
    if (!startTime || !endTime || !project || !description.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    if (
      endTime.hour() * 60 + endTime.minute() <=
      startTime.hour() * 60 + startTime.minute()
    ) {
      alert("End time must be later than start time.");
      return;
    }

    const newEntry: TimesheetEntry = {
      id: Date.now(),
      date: dateKey,
      startTime: startTime.format("hh:mm A"),
      endTime: endTime.format("hh:mm A"),
      project,
      description,
    };

    setEntries((previous) => [...previous, newEntry]);

    handleClear();
  };

  // CALENDAR CLICK
  const handleCalendarClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (view === "month") {
      const dateCell = target.closest(".MuiEventCalendar-monthViewCell");

      if (!dateCell) return;

      const dateButton = dateCell.querySelector(
        ".MuiEventCalendar-monthViewCellNumberButton",
      );

      if (!dateButton) return;

      const day = Number(dateButton.textContent?.trim());

      if (!day) return;

      onSelectedDateChange(
        new Date(visibleDate.getFullYear(), visibleDate.getMonth(), day),
      );
    }

    if (view === "week") {
      const headerButton = target.closest(
        ".MuiEventCalendar-dayTimeGridHeaderButton",
      );

      if (!headerButton) return;

      const headerCell = headerButton.closest(
        ".MuiEventCalendar-dayTimeGridHeaderCell",
      );

      const dateLabel = headerCell?.getAttribute("aria-label");

      if (!dateLabel) return;

      const clickedDate = new Date(
        dateLabel + ", " + visibleDate.getFullYear(),
      );

      if (!isNaN(clickedDate.getTime())) {
        onSelectedDateChange(clickedDate);
      }
    }
  };

  // SELECT / DESELECT INDIVIDUAL ROW
  const handleSelectRow = (id: number) => {
    setSelectedRows((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  // SELECT / DESELECT ALL VISIBLE ROWS
  const handleSelectAll = () => {
    const visibleIds = filteredEntries.map((entry) => entry.id);

    const allSelected = visibleIds.every((id) => selectedRows.includes(id));

    if (allSelected) {
      setSelectedRows((previous) =>
        previous.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedRows((previous) => [...new Set([...previous, ...visibleIds])]);
    }
  };

  // DELETE SELECTED ENTRIES
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedRows.length} selected entries?`,
    );

    if (!confirmDelete) return;

    setEntries((previous) =>
      previous.filter((entry) => !selectedRows.includes(entry.id)),
    );

    setSelectedRows([]);
  };

  // CLEAR SELECTION WHEN DATE CHANGES
  useEffect(() => {
    setSelectedRows([]);
  }, [dateKey]);

  return (
    <Box
      className="pt-2"
      sx={{
        display: "flex",
        height: "calc(100vh - 199px)",
        gap: "10px",
      }}
    >
      {/* LEFT: CALENDAR */}
      <Box className="pt-2 w-3/5">
        <Box
          onClick={handleCalendarClick}
          sx={{ width: "100%", height: "100%" }}
        >
          <EventCalendar
            view={view}
            views={["day", "week", "month"]}
            visibleDate={visibleDate}
            onVisibleDateChange={onVisibleDateChange}
            showCurrentTimeIndicator={view === "day" || view === "week"}
            eventCreation={false}
          />
        </Box>
      </Box>

      {/* RIGHT: TIMESHEET FORM */}
      <Box className="pt-2 w-2/5 min-w-0">
        <Box className="h-full w-full bg-gray-100 rounded-lg shadow-md p-4 overflow-y-auto">
          {/* SELECTED DATE */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Selected Date
            </Typography>

            <Typography>{formattedDate}</Typography>
          </Box>

          {/* TIME PICKERS */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 2,
            }}
          >
            <TimePicker
              label="Start Time *"
              value={startTime}
              onChange={setStartTime}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />

            <TimePicker
              label="End Time *"
              value={endTime}
              onChange={setEndTime}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
          </Box>

          {/* PROJECT */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Select
              displayEmpty
              value={project}
              onChange={(event) => setProject(event.target.value)}
              renderValue={(value) => value || "Select Project *"}
            >
              {projectList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* DESCRIPTION */}
          <TextField
            fullWidth
            multiline
            rows={3}
            size="small"
            label="Description *"
            placeholder="Describe the work completed..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            sx={{ mb: 2 }}
          />

          {/* FORM BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              mb: 2,
            }}
          >
            <Button variant="outlined" color="inherit" onClick={handleClear}>
              Clear
            </Button>

            <Button variant="contained" onClick={handleSaveEntry}>
              Save Entry
            </Button>
          </Box>

          <hr className="border-gray-300 mb-4" />

          {/* TABLE HEADING */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "2",
            }}
          >
            <Typography>Timesheet Entries</Typography>

            <Box className="flex Items-center justify-between">
              {/* DELETE */}
              <IconButton
                size="small"
                color="error"
                disabled={selectedRows.length === 0}
                onClick={handleDeleteSelected}
                title="Delete Selected"
              >
                <DeleteIcon />
              </IconButton>

              {/* EXPAND */}
              <IconButton
                size="small"
                color="primary"
                onClick={() => setIsTableExpanded(true)}
                title="Expand Table"
              >
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>
          {/* NORMAL TABLE */}
          <TimesheetTable
            entries={filteredEntries}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            onDeleteSelected={handleDeleteSelected}
          />
        </Box>
      </Box>

      {/* EXPANDED TABLE DIALOG */}
      <Dialog
        open={isTableExpanded}
        onClose={() => setIsTableExpanded(false)}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              width: "90vw",
              height: "90vh",
              borderRadius: 3,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Timesheet Entries
          <Box className="flex justify-between items-center">
            <IconButton
            color="error"
              disabled={selectedRows.length === 0}
              onClick={handleDeleteSelected}
              // sx={{ color:"error"}}
              
              title="Delete Selected"
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              onClick={() => setIsTableExpanded(false)}
              // sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 2}}>
          {/* EXPANDED TABLE */}
          <TimesheetTable
            entries={filteredEntries}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            onDeleteSelected={handleDeleteSelected}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
