import { Box, Avatar, Typography, IconButton } from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { ChatUser } from "../../../types/chat";

interface ChatHeaderProps {
  user: ChatUser
}

const ChatHeader = ({user}: ChatHeaderProps) => {
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
        <Avatar src={user.profilePic || undefined}>
          {user.name.split(" ").slice(0,2).map((word)=>word[0]).join("").toUpperCase()}
        </Avatar>

        <Box>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
            {user.name}
          </Typography>

          <Typography sx={{ fontSize: 12, color: "#16a34a" }}>
            {user.isGroup ? "Group chat" : user.active? "Online" : "Offline"}
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