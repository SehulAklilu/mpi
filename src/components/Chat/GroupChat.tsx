import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import ChatItem, { ChatItemProps } from "./ChatItem";
import chat from "../../assets/svg/chat.svg";
import { ScrollArea } from "../ui/scroll-area";
import ChatTopBar from "./ChatTopBar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import GroupChatMessages from "./GroupChatMessages";
function GroupChat() {
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
  return (
    <div className="">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-3">
          <ScrollArea className="h-[75vh] rounded-md  ">
            <div className="sticky top-0 p-4 rounded-lg">
              <Input
                type="text"
                id="full_name"
                placeholder="Search..."
                className={"py-2 w-full !rounded-lg !outline-none"}
                startIcon={FaSearch}
              />
            </div>
            <div>
              {chats.map((chat, index) => (
                <ChatItem key={index} {...chat} />
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="col-span-9">
          <ChatTopBar
            user={{
              name: "Archer",
              avatarUrl: "https://i.pravatar.cc/150?img=1",
              status: "online",
            }}
          />

          <ScrollArea className="h-[57vh] rounded-md overflow-y-auto p-4">
            <GroupChatMessages />
          </ScrollArea>

          <ChatInput reciverId="" chatId="" />
        </div>
      </div>
    </div>
  );
}

export default GroupChat;
