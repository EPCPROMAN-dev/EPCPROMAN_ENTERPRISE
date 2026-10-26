
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WeeklyTimesheet() {
  return (
    <Box sx={{ pt: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#334155", mb: 2 }}
      >
        Weekly Timesheet
      </Typography>

      {/* Daily form and Kendo Grid will go here */}
    </Box>
  );
}
