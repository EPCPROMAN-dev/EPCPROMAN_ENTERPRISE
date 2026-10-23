import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TimesheetFilling() {
  return (
    <Box
      sx={{
        minHeight: "100%",
        p: { xs: 1.5, sm: 2 },
        bgcolor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 3,
      }}
    >
      <Typography 
      sx={{
        variant:"h5",
        fontWeight:"600"
        }}>
        Filling
      </Typography>

      {/* We'll add the form, tabs, and Kendo Grid here. */}
    </Box>
  );
}