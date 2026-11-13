
import { Box, Typography } from "@mui/material";
import type { Message } from "../../../types/chat";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.sender === "me";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        width: "100%",
        mb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          overflowWrap: "anywhere",
          backgroundColor: isMe ? "#2563eb" : "#f1f5f9",
          color: isMe ? "#fff" : "#1e293b",
          px: 1.75,
          py: 1.25,
          borderRadius: isMe
            ? "12px 12px 2px 12px"
            : "12px 12px 12px 2px",
        }}
      >
        <Typography sx={{ fontSize: 14 }}>
          {message.text}
        </Typography>

        <Typography
          sx={{
            fontSize: 10,
            textAlign: "right",
            mt: 0.5,
            opacity: 0.75,
          }}
        >
          {message.time}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;
