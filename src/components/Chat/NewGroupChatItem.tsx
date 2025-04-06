import React from "react";
import { MdDoneAll } from "react-icons/md";
import TypingIndicator from "./Typing";
import { User } from "@/types/chat.type";
import { TypingUser } from "@/context/SocketContext";

export interface GroupChatItemProps {
  id?: string;
  name: string;
  avatarUrl?: string;
  message: string;
  time: string;
  unreadCount: number;
  onClick?: () => void;
  active?: boolean;
  isRead?: boolean;
  //   isOnline: boolean;
  //   isTyping: boolean;
  users: User[];
  typingUsers?: TypingUser[];
}

const NewGroupChatItem: React.FC<GroupChatItemProps> = ({
  name,
  avatarUrl,
  message,
  time,
  unreadCount,
  onClick,
  active,
  isRead,
  //   isOnline,
  //   isTyping,
  users,
  typingUsers,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
        active ? "bg-gradient-to-b from-[#F8B46F] to-[#F39030]  text-white" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-none">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Chat Details */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-medium">
            {name && name.length > 15 ? name.slice(0, 15) + "..." : name}
          </h4>
          <span
            className={`text-sm ${active ? "text-white" : "text-gray-500"}`}
          >
            {time}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm truncate max-w-[70%]">
            {typingUsers && typingUsers.length > 0 ? (
              <div className="text-sm flex items-center">
                {typingUsers
                  .map((tu) => {
                    const user = users.find((u) => u._id === tu.userId);
                    return user?.firstName;
                  })
                  .join(", ")}
                {" - "}
                <TypingIndicator />
              </div>
            ) : (
              message &&
              (message.length > 15 ? message.slice(0, 15) + "..." : message)
            )}
          </div>

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

export default NewGroupChatItem;
