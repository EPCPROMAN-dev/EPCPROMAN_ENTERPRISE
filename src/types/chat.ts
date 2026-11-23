export interface Message{
    id: number,
    userId: number,
    text: string,
    sender: "me" | "other",
    time: string,
}

 export interface ChatUser {
  id: number;
  category: string;
  profilePic: string;
  name: string;
  isGroup: boolean;
  lastMessage: string;
  lastMessageDate: number;
  unreadCount: number;
  active: boolean;
}