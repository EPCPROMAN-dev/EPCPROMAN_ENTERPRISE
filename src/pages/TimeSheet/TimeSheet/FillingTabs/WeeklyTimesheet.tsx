
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
  
       <Box sx={{
         height: 100,
         width: 100,
         border: "1px solid red",
display:"flex",
justifyContent:"center",
alignItems:"center"

       }}
       >
        <Box sx={{
         height: 50,
         width: 50,
         border: "1px solid red",
display:"flex",
justifyContent:"center",
alignItems:"center"
       }}
        >
 <Typography
        variant="h6"
        sx={{  color: "#334155", mb: 2 }}
      >
       box
      </Typography>

        </Box>
       </Box>
      {/* Daily form and Kendo Grid will go here */}
    </Box>
  );
}
