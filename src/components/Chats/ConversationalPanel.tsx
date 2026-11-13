import { useState } from "react";
import { Box } from "@mui/material";

import ChatHeader from "./conversation/ChatHeader";
import MessageList from "./conversation/MessageList";
import MessageInput from "./conversation/MessageInput";

import { messages as initialMessages } from "../../data/messages";
import type { Message } from "../../types/chat";

const ConversationalPanel = () => {

 
  const [messages, setMessages] = useState<Message[]>(initialMessages);


  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: text,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
 
    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
    ]);
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
      <ChatHeader />
      
      <MessageList messages={messages} />

      <MessageInput onSend={handleSendMessage} />
    </Box>
  );
};


export default ConversationalPanel;