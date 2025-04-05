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
import { useEffect, useState } from "react";
import { Chat } from "@/types/chat.type";
import NoMessage from "./NoMessage";
import ChatItemSkeleton from "./ChatItemSkeleton";
import { IoClose, IoMenu } from "react-icons/io5";
import CustomTabs from "./CustomTabs";
import { MenuIcon } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TypingUser, useSocket } from "@/context/SocketContext";
import { Message } from "@/types/socketTypes";
import { formatTelegramTimestamp } from "@/lib/utils";

type Role = "player" | "coach" | "parent";
export interface ChatItems {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  time: string;
  role: Role;
  unreadCount: number;
  reciverId: string;
  isRead: boolean;
  latestMessageId?: string;
  isOnline: boolean;
  isTyping: boolean;
}

interface ChatComponentProps {
  setActiveTab: (tab: string) => void;
  openChatId: string | null;
  onlineUsers: string[];
  messages: Message[];
}

function ChatComponent({
  setActiveTab,
  openChatId,
  onlineUsers,
  messages,
}: ChatComponentProps) {
  const [user_id, setUserId] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatItems | undefined>(
    undefined
  );
  const { socket, isConnected } = useSocket();
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const userId = Cookies.get("user_id");
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

  // const readMessage = useMutation({
  //   mutationKey: ["isRead"],
  //   mutationFn: (id: string) => isRead(id),
  // });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const extractChatItems = (chats: Chat[], user_id: string): ChatItems[] => {
    return chats
      .filter((chat) => !chat.isGroupChat)
      .filter((chat) => chat.users.some((user) => user._id === user_id))
      .map((chat) => {
        const otherUser = chat.users.find((user) => user._id !== user_id);

        if (!otherUser) {
          throw new Error("No other user found in chat");
        }

        return {
          id: chat._id,
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          avatarUrl: otherUser.avatar,
          message: chat?.latestMessageContent || "",
          role: otherUser.role,
          time: chat?.latestMessageTimeStamp
            ? formatTelegramTimestamp(chat.latestMessageTimeStamp)
            : "",

          unreadCount: chat.unreadCount,
          isRead:
            chat?.latestMessageContent && chat.unreadCount === 0 ? true : false,
          reciverId: otherUser._id,
          latestMessageId: chat?.latestMessage ?? "",
          isOnline: onlineUsers?.includes(otherUser._id) ?? false,
          isTyping:
            typingUsers?.some(
              (user) =>
                user.chatId === chat._id && user.userId === otherUser._id
            ) ?? false,
        };
      });
  };

  const chats =
    chats_data && chats_data?.chats.length > 0 && user_id
      ? extractChatItems(chats_data.chats, user_id)
      : undefined;

  useEffect(() => {
    if (!isManuallySelected && openChatId && chats) {
      const selectedChat = chats.find((chat) => chat.id === openChatId);
      if (selectedChat) {
        setSelectedChat(selectedChat);
      }
    }
  }, [chats, openChatId]);

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

    const handleMessageSeen = (data: any) => {
      console.log("message seen", data);
    };

    // const handleMessageReceived = (data: any) => {
    //   console.log("handle message REcived", data);
    // };

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);
    socket.on("message-seen", handleMessageSeen);
    // socket.on("message received", handleMessageReceived);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
      socket.off("message-seen", handleMessageSeen);
      // socket.off("message received", handleMessageReceived);
    };
  }, [socket, isConnected, userId]);

  const filteredChats =
    chats &&
    chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  // State to manage collapsed/expanded roles
  const [collapsedRoles, setCollapsedRoles] = useState<{
    [key in Role]: boolean;
  }>({
    player: false,
    coach: false,
    parent: false,
  });

  // Group chats by role
  const groupedChats = filteredChats?.reduce((acc: any, chat: ChatItems) => {
    if (!acc[chat.role]) acc[chat.role] = [];
    acc[chat.role].push(chat);
    return acc;
  }, {});

  // Toggle collapse for each role
  const toggleCollapse = (role: Role) => {
    setCollapsedRoles((prevState: any) => ({
      ...prevState,
      [role]: !prevState[role],
    }));
  };

  const makeLatestMessageRead = (id: string | undefined) => {
    if (id) {
      // readMessage.mutate(id);
    }
  };
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const openSideBar = () => {
    setSidebarOpen((pre) => !pre);
    if (socket && selectedChat) {
      socket.emit("leave chat", selectedChat.id);
    }
  };

  if (isError) {
    return "Error Page";
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-x-6">
        {/* Sidebar */}
        <div
          className={`fixed inset-0  bg-white transition-transform transform md:relative md:translate-x-0 md:col-span-4 lg:col-span-3 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${isSidebarOpen ? "md:w-full" : ""} `}
        >
          <div className=" md:hidden px-1 m-1 ml-[2rem]">
            <CustomTabs setActiveTab={setActiveTab} tab="messages" />
          </div>
          <div className="flex gap-x-2 items-center p-4 rounded-lg">
            <Input
              type="text"
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
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <ChatItemSkeleton key={index} />
                ))
              ) : groupedChats ? (
                Object.keys(groupedChats).map((role) => (
                  <div key={role}>
                    {/* Role Section (Player, Coach, Parent) */}
                    <div
                      className="flex justify-between items-center p-2 cursor-pointer"
                      onClick={() => toggleCollapse(role as Role)}
                    >
                      <h3 className="capitalize text-sm font-medium">{role}</h3>
                      <span>
                        {collapsedRoles[role as Role] ? (
                          <IoIosArrowDown className="text-gray-400" />
                        ) : (
                          <IoIosArrowUp className="text-gray-400" />
                        )}
                      </span>
                    </div>
                    <hr />

                    {/* Collapsible Chats */}
                    {!collapsedRoles[role as Role] && (
                      <div>
                        {groupedChats[role].map((chat: ChatItems) => (
                          <ChatItem
                            key={chat.id}
                            {...chat}
                            active={selectedChat && selectedChat.id === chat.id}
                            onClick={() => {
                              setIsManuallySelected(true);
                              setSelectedChat(chat);
                              makeLatestMessageRead(chat?.latestMessageId);
                              setSidebarOpen(false); // Close sidebar on mobile after selecting chat
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center p-1 rounded-md text-[#9092A1]">
                  {/* No Chat */}
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
                  id: selectedChat.id,
                  name: selectedChat.name,
                  avatarUrl: selectedChat.avatarUrl,
                  isOnline: selectedChat.isOnline,
                  reciverId: selectedChat.reciverId,
                }}
                onClick={openSideBar}
              />
              <ScrollArea className="h-[74.4vh] sm:h-[76vh] md:h-[68.8vh] !overflow-hidden ">
                <ChatMessages chatId={selectedChat.id} />
              </ScrollArea>
              <ChatInput
                chatId={selectedChat.id}
                reciverId={selectedChat.reciverId}
                chatType="DIRECT"
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
