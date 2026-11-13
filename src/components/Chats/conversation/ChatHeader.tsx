import { Box, Avatar, Typography, IconButton } from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChatHeader = () => {
     return (
         <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderBottom: "1px solid #e8edf3",
      }}
    >
      {/* User details */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar sx={{ bgcolor: "#dbeafe", color: "#1d4ed8" }}>
          SP
        </Avatar>

        <Box>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
            Smitali Patil
          </Typography>

          <Typography sx={{ fontSize: 12, color: "#16a34a" }}>
            Online
          </Typography>
        </Box>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton aria-label="Voice call">
          <CallOutlinedIcon fontSize="medium"/>
        </IconButton>

        <IconButton aria-label="Video call">
          <VideocamOutlinedIcon  fontSize="medium" />
        </IconButton>

        <IconButton aria-label="More options">
          <MoreVertIcon  fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
   
     )
}

export default ChatHeader