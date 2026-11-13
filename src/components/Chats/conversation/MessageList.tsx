 
import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";
import type { Message } from "../../../types/chat";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "1px 35px",
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#64748b",
          }}
        >
          Start a conversation
        </Box>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
    </Box>
  );
};

export default MessageList;
