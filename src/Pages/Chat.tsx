import Announcements from "@/components/Chat/Announcements";
import AnnouncementsPlayer from "@/components/Chat/AnnouncementsPlayer";
import ChatComponent from "@/components/Chat/ChatComponent";
import GroupChat from "@/components/Chat/GroupChat";
import PeopleComponent from "@/components/Chat/PeopleComponent";
import SocialFeed from "@/components/Chat/Post";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRole } from "@/RoleContext";
import { SocketProvider, useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Message } from "@/types/socketTypes";
import { useQueryClient } from "react-query";

function Chat() {
  const [activeTab, setActiveTab] = useState("messages");
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const { chatId } = useParams<{ chatId: string }>();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket, isConnected } = useSocket();
  const userId = Cookies.get("user_id");
  const queryClient = useQueryClient();

  const { role } = useRole();
  useEffect(() => {
    if (chatId) {
      setOpenChatId(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (!socket || !userId) return;

    // Setup user when connected
    if (isConnected) {
      socket.emit("setup", { userId });
    }

    const handleOnlineUsers = (users: string[]) => {
      setOnlineUsers(users);
    };

    const handleNewMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);

      queryClient.invalidateQueries(["message", data.chatId]);
    };

    socket.on("online-users", handleOnlineUsers);

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("online-users", handleOnlineUsers);
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, isConnected, userId]);

  return (
    <ContentLayout>
      <div className="">
        <div className="flex items-center justify-center">
          <div className="connection-status"></div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="messages"
            className="w-full"
          >
            <TabsList className=" hidden md:flex bg-[#FFF6ED] rounded-full w-full md:w-[34rem] lg:w-[40rem] shadow-md h-[2.5rem] md:h-[3rem] mx-auto border">
              <TabsTrigger
                value="messages"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="group"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Groups
              </TabsTrigger>
              <TabsTrigger
                value="people"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                People
              </TabsTrigger>
              <TabsTrigger
                value="announcements"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Announcements
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Community
              </TabsTrigger>
            </TabsList>
            <TabsContent className="!mt-0" value="messages">
              <ChatComponent
                setActiveTab={setActiveTab}
                openChatId={openChatId}
                messages={messages}
                onlineUsers={onlineUsers}
              />
            </TabsContent>
            <TabsContent className="!mt-0" value="group">
              <GroupChat setActiveTab={setActiveTab} />
            </TabsContent>
            <TabsContent className="!mt-0" value="people">
              <PeopleComponent
                setActiveTab={setActiveTab}
                setOpenChatId={setOpenChatId}
              />
            </TabsContent>
            <TabsContent className="!mt-0" value="announcements">
              {role && role === "coach" ? (
                <Announcements setActiveTab={setActiveTab} />
              ) : (
                <AnnouncementsPlayer setActiveTab={setActiveTab} />
              )}
            </TabsContent>
            <TabsContent className="!mt-5" value="posts">
              <SocialFeed setActiveTab={setActiveTab} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}

export default Chat;
