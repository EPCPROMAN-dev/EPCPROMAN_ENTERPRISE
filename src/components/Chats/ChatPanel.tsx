import React from "react";
import { Box } from "@mui/material";

const ChatPanel = () => {
  return (
    <Box
      sx={{
        flex: "1 1 20%",
        backgroundColor: "#fff",
        border: "1px solid var(--border)",
        boxShadow: "0px 5px 18px rgba(10, 35, 70, 0.06)",
        height: "100%",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Chat Panel
    </Box>
  );
};

export default ChatPanel;
