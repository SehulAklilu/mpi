import React from "react";

interface ChatTopBarProps {
  user: {
    name: string;
    avatarUrl: string;
    status: "online" | "offline";
  };
}

const ChatTopBar: React.FC<ChatTopBarProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-b py-1 px-4  from-[#F8B36D] to-[#F28822]  shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="text-xl text-white font-medium ">{user.name}</h4>
          <span
            className={`text-sm ${
              user.status === "online" ? "text-white" : "text-gray-500"
            }`}
          >
            {user.status === "online" ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatTopBar;
