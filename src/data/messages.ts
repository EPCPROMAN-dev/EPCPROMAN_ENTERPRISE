import type { Message } from "../types/chat";
const messages : Message[] = [
     {
    id: 1,
    text: "Hey! How are you?",
    sender: "other",
    time: "10:30 AM",
  },
  {
    id: 2,
    text: "I'm good! How about you?",
    sender: "me",
    time: "10:31 AM",
  },
  {
    id: 3,
    text: "I'm doing great!",
    sender: "other",
    time: "10:32 AM",
  },
]

export { messages };