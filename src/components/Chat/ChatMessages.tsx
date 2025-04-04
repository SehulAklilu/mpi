import { getMessages } from "@/api/chat.api";
import { Message, NewMessage } from "@/types/chat.type";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import ChatMessagesSkeleton from "./ChatMessagesSkeleton";
import styles from "./ChatMessage.module.css";
import { useSocket } from "@/context/SocketContext";

type ExtractedMessage = {
  id: string;
  type: string;
  content: string;
  time: string;
  date: string;
  image: string | null;
  sender: string;
  isSender: boolean;
};

const ChatMessages = ({ chatId }: { chatId: string }) => {
  const [user_id, setUserId] = useState<string | undefined>(undefined);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { socket, isConnected } = useSocket();
  const userId = Cookies.get("user_id");

  const {
    data: message_datas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["message", chatId],
    queryFn: () => getMessages(chatId),
    enabled: Boolean(chatId),
    onSuccess: () => {
      setUserId(Cookies.get("user_id"));
    },
  });
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [message_datas]);

  if (isError) {
    return <div>Error loading messages.</div>;
  }

  function extractMessages(messages: NewMessage[], userId: string) {
    return messages.map((message) => ({
      id: message.id,
      type: message?.image ? "image" : "text",
      image: message.image,
      content: message.content,
      time: new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date(message.createdAt).toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      sender: `${message.sender.firstName}`,
      isSender: message.sender.id === userId,
    }));
  }

  useEffect(() => {
    if (!socket || !chatId) return;

    // Setup user when connected
    if (isConnected) {
      socket.emit("join chat", chatId);
    }
    if (userId) {
      socket.emit("message-seen", { chatId, userId });
    }

    const handleMessageSeen = (data: any) => {
      console.log("message seed", data);
    };
    socket.on("message-seen", handleMessageSeen);

    return () => {
      socket.off("message-seen", handleMessageSeen);
    };
  }, [socket, isConnected, chatId]);

  const messages =
    message_datas && user_id && message_datas.messages
      ? extractMessages(message_datas.messages, user_id)
      : undefined;

  function groupMessagesByDate(messages: ExtractedMessage[]) {
    return messages.reduce((acc, message) => {
      if (!acc[message.date]) {
        acc[message.date] = [];
      }
      acc[message.date].unshift(message);
      return acc;
    }, {} as Record<string, ExtractedMessage[]>);
  }

  const groupedMessages = messages ? groupMessagesByDate(messages) : {};
  return (
    <div
      className={`flex flex-col-reverse gap-4 h-[84vh] sm:h-[80vh] md:h-[65vh] ${styles.customScrollbar}`}
      ref={scrollAreaRef}
    >
      {isLoading ? (
        <ChatMessagesSkeleton />
      ) : messages ? (
        Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="text-center text-gray-500 text-sm my-2">{date}</div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isSender ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-xs p-3 rounded-lg">
                  <span className="text-xs">{message.time}</span>

                  {message.type === "text" && (
                    <div
                      className={`py-2 px-4 ${
                        message.isSender
                          ? "bg-[#F2851C] text-white rounded-md rounded-tr-none"
                          : "bg-[#D8D8D8] text-black rounded-md rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                  )}

                  {message.type === "image" && message?.image && (
                    <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-2 rounded-lg bg-primary/20 shadow-md">
                      <img
                        src={message.image}
                        alt="Chat Image"
                        className="rounded-lg w-full object-cover"
                      />
                      {message.content && message.content !== "'" && (
                        <p className="text-sm  mt-2 px-2">{message.content}</p>
                      )}
                    </div>
                  )}

                  {message.type === "voice" && (
                    <audio controls className="w-full">
                      <source src={message.content} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        "No Message"
      )}
    </div>
  );
};

export default ChatMessages;
