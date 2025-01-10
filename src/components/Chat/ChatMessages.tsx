import { getMessages } from "@/api/chat.api";
import { Message } from "@/types/chat.type";
import { useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

type ExtractedMessage = {
  id: string;
  type: string;
  content: string;
  time: string;
  sender: string;
  isSender: boolean;
};

const ChatMessages = ({ chatId }: { chatId: string }) => {
  const [user_id, setUserId] = useState<string | undefined>(undefined);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading messages.</div>;
  }

  function extractMessages(
    messages: Message[],
    userId: string
  ): ExtractedMessage[] {
    return messages.map((message) => ({
      id: message.id,
      type: "text",
      content: message.content,
      time: new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: `${message.sender.firstName}`,
      isSender: message.sender.id === userId,
    }));
  }

  const messages =
    message_datas && user_id && message_datas.messages
      ? extractMessages(message_datas.messages, user_id)
      : undefined;

  return (
    <div className="flex flex-col gap-4">
      {messages
        ? messages.reverse().map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-xs p-3 rounded-lg">
                <span className="text-lg">{message.time}</span>

                {message.type === "text" && (
                  <div
                    className={`py-2 px-4  ${
                      message.isSender
                        ? "bg-[#F2851C]  text-white rounded-md rounded-tr-none"
                        : "bg-[#D8D8D8] text-black rounded-md rounded-tl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                )}
                {message.type === "image" && (
                  <img
                    src={message.content}
                    alt="Chat Image"
                    className="rounded"
                  />
                )}
                {message.type === "voice" && (
                  <audio controls className="w-full">
                    <source src={message.content} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          ))
        : "No Message"}
    </div>
  );
};

export default ChatMessages;
