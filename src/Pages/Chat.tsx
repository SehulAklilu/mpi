import ChatComponent from "@/components/Chat/ChatComponent";
import GroupChat from "@/components/Chat/GroupChat";
import PeopleComponent from "@/components/Chat/PeopleComponent";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

function Chat() {
  const [activeTab, setActiveTab] = useState("messages");
  return (
    <ContentLayout>
      <div className=" md:pt-4">
        <div className="flex items-center justify-center">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="messages"
            className="w-full"
          >
            <TabsList className="flex bg-[#FFF6ED] rounded-full w-full md:w-[30rem] lg:w-[40rem] shadow-md h-[2.5rem] md:h-[3rem] mx-auto border">
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
            </TabsList>
            <TabsContent value="messages">
              <ChatComponent />
            </TabsContent>
            <TabsContent value="group">
              <GroupChat />
            </TabsContent>
            <TabsContent value="people">
              <PeopleComponent setActiveTab={setActiveTab} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}

export default Chat;
