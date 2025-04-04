// src/types/socketTypes.ts
export interface Message {
  chatId: string;
  senderId: string;
}

export interface ServerToClientEvents {
  // Listeners
  "online-users": (userIds: string[]) => void;
  "new-message": (message: Message) => void;
  typing: (data: { chatId: string; userId: string }) => void;
  "stop-typing": (data: { chatId: string; userId: string }) => void;
  "message-received": (chat: any) => void; // Replace 'any' with your chat type
  "message-seen": (userId: string) => void;
}

export interface ClientToServerEvents {
  // Emitters
  setup: (data: { userId: string }) => void;
  "join-chat": (chatId: string) => void;
  "leave-chat": (chatId: string) => void;
  typing: (data: { chatId: string; userId: string }) => void;
  "stop-typing": (data: { chatId: string; userId: string }) => void;
  "new-message": (data: {
    content: string;
    receiver: string;
    chatId: string;
    image?: File;
  }) => void;
}
