import ChatComponent from "@/components/Chat/ChatComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Chat() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="messages" className="w-full ">
          <TabsList className="flex bg-[#FFF6ED] rounded-full w-[40rem] shadow-md h-[3rem] mx-auto border">
            <TabsTrigger
              value="messages"
              className="flex-1 text-center py-1 text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="group"
              className="flex-1 text-center py-1 text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
            >
              Groups
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="flex-1 text-center py-1 text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
            >
              People
            </TabsTrigger>
          </TabsList>
          <TabsContent value="messages">
            <ChatComponent />
          </TabsContent>
          <TabsContent value="group">Display your groups here.</TabsContent>
          <TabsContent value="people">Display your people here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Chat;
