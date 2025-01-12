import React from "react";
import { MdDoneAll } from "react-icons/md";

export interface ChatItemProps {
  id?: string;
  name: string;
  avatarUrl: string;
  status: "online" | "offline";
  message: string;
  time: string;
  unreadCount: number;
  onClick?: () => void;
  active?: boolean;
  isRead?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  avatarUrl,
  status,
  message,
  time,
  unreadCount,
  onClick,
  active,
  isRead,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 hover:bg-gray-100 rounded-lg cursor-pointer ${
        active ? "bg-gradient-to-b from-[#F8B46F] to-[#F39030]  text-white" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
            status === "online" ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
      </div>

      {/* Chat Details */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-medium">{name}</h4>
          <span
            className={`text-sm ${active ? "text-white" : "text-gray-500"}`}
          >
            {time}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm truncate max-w-[70%]">{message}</p>
          {isRead ? (
            <MdDoneAll className="text-green-500 text-lg" />
          ) : (
            unreadCount > 0 && (
              <span
                className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                  active
                    ? "bg-white text-orange-500"
                    : "bg-orange-500 text-white"
                }`}
              >
                {unreadCount}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
