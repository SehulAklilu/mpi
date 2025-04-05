// src/contexts/SocketContext.ts
import { Message } from "@/types/socketTypes";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface TypingUser {
  chatId: string;
  userId: string;
}

// Define event types based on your application
interface ServerToClientEvents {
  "online-users": (users: string[]) => void;
  typing: (data: TypingUser) => void;
  "stop-typing": (data: TypingUser) => void;
  "new-message": (data: Message) => void;
  "message-seen": (data: any) => void;
  "message received": (data: any) => void;
}

interface ClientToServerEvents {
  setup: (data: { userId: string }) => void;
  typing: (data: { chatId: string; userId: string }) => void;
  "stop-typing": (data: { chatId: string; userId: string }) => void;
  "new-message": (data: { senderId: string; message: string }) => void;
  "message-seen": (data: { chatId: string; userId: string }) => void;
  "join chat": (chatId: string) => void;
  "leave chat": (chatId: string) => void;
}

interface ISocketContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to your server
    const socketInstance = io("http://46.202.93.201:4000", {
      autoConnect: true,
      reconnection: true,
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    // Built-in events
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
