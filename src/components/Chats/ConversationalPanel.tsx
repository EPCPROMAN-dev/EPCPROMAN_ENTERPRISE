import { useState } from "react";
import { Box } from "@mui/material";

import ChatHeader from "./conversation/ChatHeader";
import MessageList from "./conversation/MessageList";
import MessageInput from "./conversation/MessageInput";

import { messages as initialMessages } from "../../data/messages";
import type { Message } from "../../types/chat";
import type { ChatUser } from "../../types/chat";

interface ConversationalPanelProps {
   selectedUser: ChatUser | null
}

const ConversationalPanel = ({selectedUser,
  }:ConversationalPanelProps) => {

  const [messagesByUser, setMessagesByUser] = useState<
  Record<number, Message[]>
>({1: initialMessages,});

const currentMessages = selectedUser
  ? messagesByUser[selectedUser.id] ?? []
  : [];

const handleSendMessage = (text: string) => {
  if (!selectedUser) return;

  const newMessage: Message = {
    id: Date.now(),
    text: text,
    sender: "me",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setMessagesByUser((prevMessages) => ({
    ...prevMessages,
    [selectedUser.id]: [
      ...(prevMessages[selectedUser.id] ?? []),
      newMessage,
    ],
  }));
};

  return (
    <Box sx={{ flex: "1 1 80%",
        backgroundColor: "#fff",
        border: "1px solid var(--border)",
        boxShadow: "0px 5px 18px rgba(10, 35, 70, 0.06)",
        height: "100%",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch", }}>

          {selectedUser ? (
  <>
    <ChatHeader user={selectedUser} />
    <MessageList messages={currentMessages} />
    <MessageInput onSend={handleSendMessage} />
  </>
) : (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#64748b",
    }}
  >
    Select a chat to start a conversation
  </Box>
)}
     
    </Box>
  );
};


export default ConversationalPanel;