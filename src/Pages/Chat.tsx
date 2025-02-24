import Announcements from "@/components/Chat/Announcements";
import AnnouncementsPlayer from "@/components/Chat/AnnouncementsPlayer";
import ChatComponent from "@/components/Chat/ChatComponent";
import GroupChat from "@/components/Chat/GroupChat";
import PeopleComponent from "@/components/Chat/PeopleComponent";
import SocialFeed from "@/components/Chat/Post";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRole } from "@/RoleContext";
import { useState } from "react";

function Chat() {
  const [activeTab, setActiveTab] = useState("messages");
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const { role } = useRole();
  return (
    <ContentLayout>
      <div className="">
        <div className="flex items-center justify-center">
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
                Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent className="!mt-0" value="messages">
              <ChatComponent
                setActiveTab={setActiveTab}
                openChatId={openChatId}
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
              <SocialFeed />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}

export default Chat;
