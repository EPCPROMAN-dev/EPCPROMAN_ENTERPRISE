
import { useState } from "react";
import Box from "@mui/material/Box";
import { DropDownList } from "@progress/kendo-react-dropdowns";

import MonthlyTimesheet from "./FillingTabs/MonthlyTimesheet";
import ModuleBreadcrumb from "../../../components/Breadcrumb/ModuleBreadcrumb";

type CalendarView = "day" | "week" | "month";

export default function TimesheetFilling() {
  // Calendar view - Monthly selected by default
  const [selectedView, setSelectedView] = useState<CalendarView>("month");

  // Selected date for timesheet entry
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Date currently displayed by calendar
  const [visibleDate, setVisibleDate] = useState<Date>(new Date());

  const handleVisibleDateChange = (date: Date) => {
    setVisibleDate(date);
    setSelectedDate(date);
  };

  const calendarViews = ["Daily", "Weekly", "Monthly"];

  const viewLabels: Record<CalendarView, string> = {
    day: "Daily",
    week: "Weekly",
    month: "Monthly",
  };

  const handleViewChange = (event: any) => {
    const viewMap: Record<string, CalendarView> = {
      Daily: "day",
      Weekly: "week",
      Monthly: "month",
    };

    const newView = viewMap[event.value];

    setSelectedView(newView);

    // Open the calendar around the currently selected date
    setVisibleDate(selectedDate);
  };
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

      {/* Timesheet Header */}
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

        <div style={{ width: 180 }}>
          <DropDownList
            data={calendarViews}
            value={viewLabels[selectedView]}
            onChange={handleViewChange}
          />
        </div>
      </Box>

      {/* Shared Calendar */}
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




// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// import DailyTimesheet from "./FillingTabs/DailyTimesheet";
// import WeeklyTimesheet from "./FillingTabs/WeeklyTimesheet";
// import MonthlyTimesheet from "./FillingTabs/MonthlyTimesheet";

// import ModuleBreadcrumb from "../../../components/Breadcrumb/ModuleBreadcrumb"

// export default function TimesheetFilling() {
//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleTabChange = (
//     _event: React.SyntheticEvent,
//     newValue: number
//   ) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100%",
//         p: { xs: 1, sm: 1 },
//         bgcolor: "#ffffff",
//         border: "1px solid #e2e8f0",
//         borderRadius: 3,
//       }}
//     >
//          <ModuleBreadcrumb/>
//       <Tabs
//         value={selectedTab}
//         onChange={handleTabChange}
//         variant="scrollable"
//         scrollButtons="auto"
//         allowScrollButtonsMobile
//         sx={{
//           borderBottom: "1px solid #cbd5e1",
//           "& .MuiTab-root": {
//             textTransform: "none",
//             fontSize: "14px",
//             fontWeight: 500,
//             minHeight: 48,
//             px: 3,
//           },
//           "& .Mui-selected": {
//             color: "#0969ff",
//             fontWeight: 600,
//           },
//           "& .MuiTabs-indicator": {
//             height: 3,
//             backgroundColor: "#0969ff",
//           },
//         }}
//       >
//         <Tab label="Daily Timesheet" />
//         <Tab label="Weekly Timesheet" />
//         <Tab label="Monthly Timesheet" />
//       </Tabs>

//       {selectedTab === 0 && <DailyTimesheet />}
//       {selectedTab === 1 && <WeeklyTimesheet />}
//       {/* {selectedTab === 2 && <MonthlyTimesheet />} */}
//     </Box>
//   );
// }