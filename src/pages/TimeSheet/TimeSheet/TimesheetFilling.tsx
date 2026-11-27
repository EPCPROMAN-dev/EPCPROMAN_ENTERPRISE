
import { useState } from "react";
import {Box,FormControl,Select,MenuItem,} from "@mui/material";

import MonthlyTimesheet from "./FillingTabs/MonthlyTimesheet";
import ModuleBreadcrumb from "../../../components/Breadcrumb/ModuleBreadcrumb";



type CalendarView = "day" | "week" | "month";

export default function TimesheetFilling() {
  const [selectedView, setSelectedView] =
    useState<CalendarView>("month");

  const [selectedDate, setSelectedDate] =
    useState<Date>(new Date());

  const [visibleDate, setVisibleDate] =
    useState<Date>(new Date());


  const handleVisibleDateChange = (date: Date) => {
    setVisibleDate(date);
    setSelectedDate(date);
  };

  // const viewLabels: Record<CalendarView, string> = {
  //   day: "Daily",
  //   week: "Weekly",
  //   month: "Monthly",
  // };

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: 1,
        bgcolor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 3,
      }}
    >
      <ModuleBreadcrumb />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          borderBottom: "1px solid #cbd5e1",
        }}
      >
        <h3 className="text-base font-semibold text-blue-600 p-0">
          Monthly Timesheet
        </h3>

        <FormControl size="small" sx={{ width: 180 }}>
          <Select
            value={selectedView}
            onChange={(event) => {
              setSelectedView(event.target.value as CalendarView);
              setVisibleDate(selectedDate);
            }}
          >
            <MenuItem value="day">Daily</MenuItem>
            <MenuItem value="week">Weekly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <MonthlyTimesheet
        view={selectedView}
        visibleDate={visibleDate}
        selectedDate={selectedDate}
        onVisibleDateChange={handleVisibleDateChange}
        onSelectedDateChange={setSelectedDate}
      />
    </Box>
  );
}
