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
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FiUploadCloud } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  group_name: z.string(),
  group_type: z.string(),
  bio: z.string(),
  avatar: z.string(),
});
interface GroupChatProps {
  setActiveTab: (tab: string) => void;
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [selectedChat, setSelectedChat] = useState<ChatItemProps | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const openSideBar = () => {
    setSidebarOpen((pre) => !pre);
  };
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = () => {};

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
            <CustomTabs setActiveTab={setActiveTab} />
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
              <div
                className="flex  px-2 py-4 items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={() => setOpen(true)}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-b from-orange-300  to-primary rounded-full shadow-lg shadow-primary ">
                  <MdOutlineAddCircleOutline className="text-white text-2xl" />
                </div>
                <p className="text-[#152946] font-semibold">New Group</p>
              </div>
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
                  id: "3q34u234uo23i4o23i",
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="  overflow-x-hidden custom-scrollbar-two rounded-lg bg-white ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex w-full justify-center flex-col items-center">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <div className="w-20 h-20 rounded-full bg-[#F0F0FF]  border border-[#e3e3fd] flex items-center justify-center overflow-hidden">
                            {previewImage ? (
                              <img
                                src={previewImage}
                                alt="Uploaded preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <LuImagePlus />
                            )}
                          </div>

                          <input
                            {...fieldProps}
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(event) => {
                              const file =
                                event.target.files && event.target.files[0];
                              if (file) {
                                onChange(file);
                                const reader = new FileReader();
                                reader.onload = () =>
                                  setPreviewImage(reader.result as string);
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="!text-center" />
                    </FormItem>
                  )}
                />
                <p className="text-center w-[80%]">
                  Drag/Upload Group Picture or Leave to use Your Profile Picture
                </p>
              </div>
              <FormField
                control={form.control}
                name="group_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="group_name"
                        placeholder="Coach Damian"
                        className={"!rounded-3xl shadow !bg-white"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="group_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={
                          "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-white"
                        }
                      >
                        <SelectValue placeholder="Group Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pirvate">Private</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label>Bio</label>
                <textarea
                  id="bio"
                  placeholder="Coach Damian’s Resource Repository..."
                  rows={2}
                  className="w-full border !rounded-2xl p-2"
                  {...form.register("bio")}
                />
              </div>
              <div>
                <label>Add Members</label>
                <Input
                  type="text"
                  id="full_name"
                  placeholder="Search People..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className={"py-2 w-full !rounded-full !bg-white"}
                  startIcon={FaSearch}
                />
              </div>
              <button className="px-4 py-2 mt-4  bg-primary text-white w-full rounded-full">
                Create Group
              </button>
              <button
                type="button"
                className="px-4 py-2  bg-transparent  w-full rounded-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GroupChat;
