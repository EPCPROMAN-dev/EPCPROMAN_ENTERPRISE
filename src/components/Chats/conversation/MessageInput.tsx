
import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        py: 2,
        boxSizing: "border-box",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type a message..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        size="small"
        sx={{
          maxWidth: "850px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            backgroundColor: "#fff",
            pr: 1,
            "& fieldset": {
              borderColor: "#d8e1ec",
            },
            "&:hover fieldset": {
              borderColor: "#94a3b8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2563eb",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: 14,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSend}
                  disabled={!text.trim()}
                  aria-label="Send message"
                  sx={{
                    bgcolor: "#2563eb",
                    color: "#fff",
                    borderRadius: "9px",
                    width: 36,
                    height: 36,
                    "&:hover": {
                      bgcolor: "#1d4ed8",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "#e2e8f0",
                      color: "#78a9ec",
                    },
                  }}
                >
                  <SendRoundedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default MessageInput;
