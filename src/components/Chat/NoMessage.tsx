import { IoMenu } from "react-icons/io5";
import chat from "../../assets/svg/chat.svg";

function NoMessage({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="absolute top-2 rounded bg-[#F28822] hover:bg-[#ffa34c] left-4 z-30 md:hidden p-1 "
        onClick={onClick}
      >
        <IoMenu size={24} className="text-white" />
      </button>
      <div className="flex items-center justify-center flex-col gap-2">
        <img src={chat} className="w-24 h-24" alt="chat" />
        <h1 className="text-2xl font-bold text-[#8F92A1]">Chat with Anyone</h1>
        <p className="text-sm text-[#8F92A1]">
          Pick a person from left menu and start a Conversation
        </p>
      </div>
    </div>
  );
}

export default NoMessage;
