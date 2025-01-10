import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { IoMdMic } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { createMessage, MessagePayload } from "@/api/chat.api";
import { LoaderCircle } from "lucide-react";

const ChatInput = ({
  chatId,
  reciverId,
}: {
  chatId: string;
  reciverId: string;
}) => {
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

  const handleSend = () => {
    if (message.trim() === "") return;
    const payload: MessagePayload = {
      chatId: chatId,
      receiver: reciverId,
      content: message.trim(),
      // message: message.trim(),
    };
    createMessageMutation.mutate(payload);
    setMessage("");
  };

  const createMessageMutation = useMutation({
    mutationKey: ["createMessage"],
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["message", chatId]);
    },
  });

  return (
    <div className="bg-gradient-to-b from-[#F8B36D] to-[#F28822] px-12 py-2 shadow-md sticky bottom-0 z-10">
      <div className="flex items-center gap-2 px-2 bg-white rounded-full py-1">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={() => console.log("Attach file")}
        >
          <IoMdMic size={24} className="text-black" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 p-2 border-none outline-none border-gray-300 "
        />
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 "
          onClick={() => console.log("open imoju voice")}
        >
          <FaRegSmile size={16} className="text-black" />
        </button>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 mx-2"
          onClick={() => console.log("upload image")}
        >
          <FaRegImage size={16} className="text-black" />
        </button>
        <button type="button" onClick={handleSend}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#F8B36D] to-[#F28822] flex items-center justify-center">
            {createMessageMutation.isLoading ? (
              <LoaderCircle
                style={{
                  animation: "spin 1s linear infinite",
                  fontSize: "1rem",
                  color: "#FFFFFF",
                }}
              />
            ) : (
              <LuSendHorizontal size={24} className="text-white" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
