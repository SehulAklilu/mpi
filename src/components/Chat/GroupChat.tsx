import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import ChatItem, { ChatItemProps } from "./ChatItem";
import chat from "../../assets/svg/chat.svg";
import { ScrollArea } from "../ui/scroll-area";
import ChatTopBar from "./ChatTopBar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import GroupChatMessages from "./GroupChatMessages";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import CustomTabs from "./CustomTabs";
import ChatItemSkeleton from "./ChatItemSkeleton";
import { ChatItems } from "./ChatComponent";
import NoMessage from "./NoMessage";

interface GroupChatProps {
  setActiveTab?: (tab: string) => void;
}

function GroupChat({ setActiveTab }: GroupChatProps) {
  const chats: ChatItemProps[] = [
    {
      name: "Archer",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      status: "online",
      message: "Typing...",
      time: "4:30 PM",
      unreadCount: 2,
    },
    {
      name: "Lana",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      status: "offline",
      message: "Let's meet tomorrow at 10.",
      time: "3:45 PM",
      unreadCount: 0,
    },
    {
      name: "Cyril",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      status: "online",
      message: "Got the report, thanks!",
      time: "2:20 PM",
      unreadCount: 1,
    },
    {
      name: "Pam",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      status: "online",
      message: "Can you send me the files?",
      time: "1:15 PM",
      unreadCount: 4,
    },
  ];
  const [selectedChat, setSelectedChat] = useState<ChatItemProps | undefined>(
    undefined
  );

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const openSideBar = () => {
    setSidebarOpen((pre) => !pre);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-x-6">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-20 bg-white transition-transform transform md:relative md:translate-x-0 md:col-span-4 lg:col-span-3 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${isSidebarOpen ? "md:w-full" : ""} `}
        >
          <div className=" md:hidden px-1 flex items-center gap-x-1">
            <MenuIcon
              size={36}
              className="invisible text-[#F2851C] flex-none "
            />
            <CustomTabs
              setActiveTab={() => {
                return setActiveTab ? setActiveTab : () => {};
              }}
            />
          </div>
          <div className="flex gap-x-2 items-center p-4 rounded-lg">
            <Input
              type="text"
              id="full_name"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              className={"py-2 w-full !rounded-lg !outline-none"}
              startIcon={FaSearch}
            />
            {/* <button
              className="md:hidden flex-none top-4 bg-[#F28822] hover:bg-[#ffa34c] rounded p-1 right-4 text-xl"
              onClick={() => setSidebarOpen(false)}
            >
              <IoClose size={24} className="text-white" />
            </button> */}
          </div>
          <ScrollArea className="h-[74vh] rounded-lg">
            <div>
              {chats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  {...chat}
                  active={false}
                  onClick={() => {
                    setSelectedChat(chat);
                    // makeLatestMessageRead(chat?.latestMessageId);
                    setSidebarOpen(false); // Close sidebar on mobile after selecting chat
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div
          className={`col-span-12 md:col-span-8 lg:col-span-9 transition-transform ${
            isSidebarOpen ? "hidden md:block" : "block"
          }`}
        >
          {selectedChat ? (
            <>
              <ChatTopBar
                user={{
                  name: selectedChat.name,
                  avatarUrl: selectedChat.avatarUrl,
                  status: selectedChat.status,
                }}
                onClick={openSideBar}
              />
              <ScrollArea className="h-[84vh] sm:h-[80vh] md:h-[71vh] !overflow-hidden ">
                <GroupChatMessages />
              </ScrollArea>
              <ChatInput chatId={"1"} reciverId={"2"} />
            </>
          ) : (
            <NoMessage onClick={openSideBar} />
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupChat;
