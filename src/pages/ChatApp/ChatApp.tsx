import ConversationalPanel from "../../components/Chats/ConversationalPanel";
import ChatPanel from "../../components/Chats/ChatPanel";
import { Box } from "@mui/material";

const ChatApp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        backgroundColor: "#f4f7fb",
        minHeight: "100%",
        boxSizing: "border-box",
        gap: 2,
        height: "100%",
        borderRadius: "5px"
      }}
    >
      <ChatPanel />
      <ConversationalPanel />
    </Box>
  );
};

export default ChatApp;
