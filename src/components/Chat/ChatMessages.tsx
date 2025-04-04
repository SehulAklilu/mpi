import { getMessages } from "@/api/chat.api";
import { Message, NewMessage, NewUser } from "@/types/chat.type";
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
  sender: NewUser;
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
      sender: message.sender,
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
            {messages.map((message) => {
              const isSender = message.isSender;

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  } px-3 py-1`}
                >
                  <div
                    className={`flex flex-col max-w-md ${
                      isSender ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Time */}
                    <span className="text-[10px] text-gray-400 mb-1">
                      {message.time}
                    </span>

                    {/* Text Message */}
                    {message.type === "text" && (
                      <div
                        className={`py-2 px-4 text-sm shadow-sm ${
                          isSender
                            ? "bg-[#F2851C] text-white rounded-xl rounded-br-none"
                            : "bg-[#D8D8D8] text-black rounded-xl rounded-bl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                    )}

                    {/* Image Message */}
                    {message.type === "image" && message.image && (
                      <div
                        className={`relative p-2 shadow-md rounded-xl ${
                          isSender ? "bg-[#f2851c22]" : "bg-[#d8d8d822]"
                        }`}
                      >
                        <img
                          src={message.image}
                          alt="Chat Image"
                          className="rounded-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
                        />
                        {message.content && message.content !== "'" && (
                          <p className="text-sm mt-2 px-1 text-gray-800">
                            {message.content}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))
      ) : (
        "No Message"
      )}
    </div>
  );
};

export default ChatMessages;
