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
  if (isLoading && isError) {
    return "loading or error";
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
                value={searchValue}
                onChange={handleSearchChange}
                className={"py-2 w-full !rounded-lg !outline-none"}
                startIcon={FaSearch}
              />
            </div>
            <div>
              {filteredChats && filteredChats.length > 0
                ? filteredChats.map((chat) => (
                    <ChatItem
                      key={chat.id}
                      {...chat}
                      active={
                        (selectedChat && selectedChat.id === chat.id) ?? false
                      }
                      onClick={() => {
                        setSelectedChat(chat);
                        makeLatestMessageRead(chat?.latestMessageId);
                      }}
                    />
                  ))
                : "No Chat"}
            </div>
          </ScrollArea>
        </div>
        <div className="col-span-9">
          {selectedChat ? (
            <>
              <ChatTopBar
                user={{
                  name: selectedChat.name,
                  avatarUrl: selectedChat.avatarUrl,
                  status: selectedChat.status,
                }}
              />

              <ScrollArea className="h-[57vh] rounded-md overflow-y-auto p-4">
                <ChatMessages chatId={selectedChat.id} />
              </ScrollArea>

              <ChatInput
                chatId={selectedChat.id}
                reciverId={selectedChat.reciverId}
              />
            </>
          ) : (
            <NoMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
