import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { GoPerson, GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TypingIndicator from "./Typing";
import { TypingUser, useSocket } from "@/context/SocketContext";
import Cookies from "js-cookie";
interface ChatTopBarProps {
  user: {
    id: string;
    name: string;
    avatarUrl: string;
    isOnline: boolean;
    reciverId: string;
  };
  onClick: () => void;
}

const ChatTopBar: React.FC<ChatTopBarProps> = ({ user, onClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { socket, isConnected } = useSocket();
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const userId = Cookies.get("user_id");
  useEffect(() => {
    if (!socket) return;

    const handleTyping = (data: TypingUser) => {
      if (data.userId !== userId) {
        setTypingUsers((prev) => [...prev, data]);
      }
    };

    const handleStopTyping = (data: TypingUser) => {
      setTypingUsers((prev) => prev.filter((id) => id.userId !== data.userId));
    };

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, [socket, isConnected, userId]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center justify-between bg-gradient-to-b py-1 px-4  from-[#F8B36D] to-[#F28822]  shadow-md sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button onClick={onClick}>
          <FaArrowLeft size={24} className="text-white" />
        </button>
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="text-xl text-white font-medium ">{user.name}</h4>
          <span
            className={`text-sm ${
              user.isOnline ? "text-white" : "text-gray-500"
            }`}
          >
            {typingUsers?.some(
              (typingUser) =>
                typingUser.chatId === user.id &&
                typingUser.userId === user.reciverId
            ) ? (
              <TypingIndicator />
            ) : user.isOnline ? (
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-green-700"></span>{" "}
                <span>Online</span>
              </div>
            ) : (
              "Offline"
            )}
          </span>
        </div>
      </div>
      <div className="relative">
        {/* <HiDotsVertical
          className="text-white cursor-pointer"
          size={24}
          onClick={() => setIsMenuOpen((pre) => !pre)}
        /> */}
        {isMenuOpen && (
          <div
            className="absolute top-12 right-0 w-[12rem] rounded-xl shadow-md p-2 border-2 border-primary bg-white flex flex-col "
            ref={dropdownRef}
          >
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md p-2">
              <GoPerson size={24} />
              <span onClick={() => navigate(`/chat/profile/${user.id}`)}>
                View Profile
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200  p-2 rounded-md">
              <GoTrash size={24} className="text-red-400" />
              <span className="text-red-400">Delete Chat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTopBar;
