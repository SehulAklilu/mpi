import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface CustomTabsProps {
  setActiveTab: (tab: string) => void;
}
function CustomTabs({ setActiveTab }: CustomTabsProps) {
  return (
    <div className="pt-2 flex-auto ">
      <div className="flex items-center justify-center">
        <Tabs
          onValueChange={setActiveTab}
          defaultValue="messages"
          className="w-full"
        >
          <TabsList className="flex bg-[#FFF6ED] rounded-full w-full md:w-[30rem] lg:w-[40rem] shadow-md h-[2.5rem] md:h-[3rem] mx-auto border overflow-x-scroll">
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
        </Tabs>
      </div>
    </div>
  );
}

export default CustomTabs;
