import { useState } from "react";
import ConversationalPanel from "../../components/Chats/ConversationalPanel";
import ChatPanel from "../../components/Chats/ChatPanel";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
// import FitScreenIcon from "@mui/icons-material/FitScreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../types/LayoutContext";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const ChatApp = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { isExpanded, setIsExpanded } = useOutletContext<LayoutContextType>();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // p: 2,
        backgroundColor: "#f4f7fb",
        minHeight: "100%",
        boxSizing: "border-box",
        gap: 2,
        height: "100%",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: "52px",
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTabs-flexContainer": {
                gap: "6px",
              },
              "& .MuiTab-root": {
                minHeight: "42px",
                minWidth: "auto",
                padding: "10px 16px",
                margin: "5px 0",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "13px",
                fontWeight: 500,
                color: "#64748b",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              },
              "& .MuiTab-root:hover": {
                backgroundColor: "#edf3fc",
                color: "#2463c9",
              },
              "& .Mui-selected": {
                backgroundColor: "#e8f1ff",
                color: "#2463c9 !important",
                fontWeight: 600,
              },
            }}
          >
            <Tab icon={<ChatOutlinedIcon />} iconPosition="start" label="Chat & Calls"/>
            <Tab icon={<CalendarMonthOutlinedIcon />} iconPosition="start" label="Team Calendar"/>
            <Tab icon={<TaskAltOutlinedIcon />} iconPosition="start" label="Tasks"/>
            <Tab icon={<DescriptionOutlinedIcon />} iconPosition="start" label="HR Document"/>
          </Tabs>

          <Box>
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              color="primary"
            >
              {isExpanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Tab Content */}
        {value === 0 && (
          <Box sx={{ display: "flex", gap: 2, flex: 1, height: "92%", p: 1 }}>
            <ChatPanel />
            <ConversationalPanel />
          </Box>
        )}

        {value === 1 && <Box>Team Calendar</Box>}

        {value === 2 && <Box>Tasks</Box>}

        {value === 3 && <Box>HR Document</Box>}
      </Box>
    </Box>
  );
};

export default ChatApp;
