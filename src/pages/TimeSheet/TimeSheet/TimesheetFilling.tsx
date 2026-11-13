
import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import DailyTimesheet from "./FillingTabs/DailyTimesheet";
import WeeklyTimesheet from "./FillingTabs/WeeklyTimesheet";
import MonthlyTimesheet from "./FillingTabs/MonthlyTimesheet";

import ModuleBreadcrumb from "../../../components/Breadcrumb/ModuleBreadcrumb"

export default function TimesheetFilling() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: { xs: 1, sm: 1 },
        bgcolor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 3,
      }}
    >
         <ModuleBreadcrumb/>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          borderBottom: "1px solid #cbd5e1",
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 500,
            minHeight: 48,
            px: 3,
          },
          "& .Mui-selected": {
            color: "#0969ff",
            fontWeight: 600,
          },
          "& .MuiTabs-indicator": {
            height: 3,
            backgroundColor: "#0969ff",
          },
        }}
      >
        <Tab label="Daily Timesheet" />
        <Tab label="Weekly Timesheet" />
        <Tab label="Monthly Timesheet" />
      </Tabs>

      {selectedTab === 0 && <DailyTimesheet />}
      {selectedTab === 1 && <WeeklyTimesheet />}
      {selectedTab === 2 && <MonthlyTimesheet />}
    </Box>
  );
}
