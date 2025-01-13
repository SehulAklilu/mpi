import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import ChatItem from "./ChatItem";
import { ScrollArea } from "../ui/scroll-area";
import ChatTopBar from "./ChatTopBar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useMutation, useQuery } from "react-query";
import { getChats, isRead } from "@/api/chat.api";
import Cookies from "js-cookie";
import { useState } from "react";
import { ChatInterface } from "@/types/chat.type";
import NoMessage from "./NoMessage";
import ChatItemSkeleton from "./ChatItemSkeleton";
import { IoClose, IoMenu } from "react-icons/io5";

export interface ChatItems {
  id: string;
  name: string;
  avatarUrl: string;
  status: "online" | "offline";
  message: string;
  time: string;
  unreadCount: number;
  reciverId: string;
  isRead: boolean;
  latestMessageId?: string;
}

function ChatComponent() {
  const [user_id, setUserId] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [selectedChat, setSelectedChat] = useState<ChatItems | undefined>(
    undefined
  );
  const {
    data: chats_data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    onSuccess: () => {
      setUserId(Cookies.get("user_id"));
    },
  });

  const readMessage = useMutation({
    mutationKey: ["isRead"],
    mutationFn: (id: string) => isRead(id),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const extractChatItems = (
    chats: ChatInterface[],
    user_id: string
  ): ChatItems[] => {
    return chats
      .filter((chat) => chat.users.some((user) => user._id === user_id))
      .map((chat) => {
        const otherUser = chat.users.find((user) => user._id !== user_id);

        if (!otherUser) {
          throw new Error("No other user found in chat");
        }

        return {
          id: chat.id,
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          avatarUrl: otherUser.avatar,
          status: otherUser.lastOnline ? "online" : "offline",
          message: chat.latestMessage?.content || "",
          time: chat.latestMessage?.createdAt
            ? new Date(chat.latestMessage.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          unreadCount: chat.latestMessage?.isRead ? 0 : 1,
          isRead: chat.latestMessage?.isRead ?? false,
          reciverId: otherUser._id,
          latestMessageId: chat?.latestMessage.id,
        };
      });
  };
  if (isError) {
    return "Error Page";
  }

  const chats =
    chats_data && chats_data?.length > 0 && user_id
      ? extractChatItems(chats_data.chats, user_id)
      : undefined;

  const filteredChats =
    chats &&
    chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  const makeLatestMessageRead = (id: string | undefined) => {
    if (id) {
      readMessage.mutate(id);
    }
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
          } ${isSidebarOpen ? "sm:w-1/2 md:w-full" : ""} `}
        >
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
            <button
              className="md:hidden flex-none top-4 bg-[#F28822] hover:bg-[#ffa34c] rounded p-1 right-4 text-xl"
              onClick={() => setSidebarOpen(false)}
            >
              <IoClose size={24} className="text-white" />
            </button>
          </div>
          <ScrollArea className="h-[74vh] rounded-lg">
            <div>
              {isLoading ? (
                Array.from({ length: 3 }).map(() => <ChatItemSkeleton />)
              ) : filteredChats && filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    {...chat}
                    active={
                      (selectedChat && selectedChat.id === chat.id) ?? false
                    }
                    onClick={() => {
                      setSelectedChat(chat);
                      makeLatestMessageRead(chat?.latestMessageId);
                      setSidebarOpen(false); // Close sidebar on mobile after selecting chat
                    }}
                  />
                ))
              ) : (
                <p className="text-center p-1 border border-[#9092A1] rounded-md text-[#9092A1]">
                  No Chat
                </p>
              )}
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
              <ChatMessages chatId={selectedChat.id} />
              <ChatInput
                chatId={selectedChat.id}
                reciverId={selectedChat.reciverId}
              />
            </>
          ) : (
            <NoMessage onClick={openSideBar} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
