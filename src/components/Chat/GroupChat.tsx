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
import { LoaderCircle, MenuIcon } from "lucide-react";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getChats, getFriends } from "@/api/chat.api";
import Cookies from "js-cookie";
import { extractUsers, formatTelegramTimestamp } from "@/lib/utils";
import MultiSelectDropdown from "../MultipleDropDown";
import { createGroup, CreateGroupPayload } from "@/api/group-chat.api";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import GroupChatItem, { GroupChatItemProps } from "./GroupChatItem";
import { groupCollapsed } from "console";
import { Chat, User } from "@/types/chat.type";
import NewGroupChatItem from "./NewGroupChatItem";

export interface GroupChatItems {
  id: string;
  name: string;
  avatarUrl?: string;
  message: string;
  time: string;
  unreadCount: number;
  isRead: boolean;
  latestMessageId?: string;
  active: boolean;
  // isOnline: boolean;
  // isTyping: boolean;
  users: User[];
}

const FormSchema = z.object({
  group_name: z.string(),
  members: z.array(z.string()).min(1, "At least one member is required"),
});
interface GroupChatProps {
  setActiveTab: (tab: string) => void;
}

function GroupChat({ setActiveTab }: GroupChatProps) {
  const user_id = Cookies.get("user_id");
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      members: [],
    },
  });
  const [selectedChat, setSelectedChat] = useState<GroupChatItems | undefined>(
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

  const { data: friends_data } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const {
    data: chats_data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    // onSuccess: (response) => {
    //   setGroupChats(response?.chats?.filter((chat) => chat.isGroupChat));
    // },
  });

  const extractChatItems = (
    chats: Chat[],
    user_id: string
  ): GroupChatItems[] => {
    return chats
      .filter((chat) => chat.isGroupChat)
      .filter((chat) => chat.users.some((user) => user._id === user_id))
      .map((chat) => {
        const otherUsers = chat.users.filter((user) => user._id !== user_id);

        if (!otherUsers) {
          throw new Error("No other user found in chat");
        }

        return {
          id: chat._id,
          name: chat.chatName,
          avatarUrl: chat.photo ?? chat.groupAdmin?.avatar,
          message: chat?.latestMessageContent || "",
          time: chat?.latestMessageTimeStamp
            ? formatTelegramTimestamp(chat.latestMessageTimeStamp)
            : "",

          unreadCount: chat.unreadCount,
          isRead:
            chat?.latestMessageContent && chat.unreadCount === 0 ? true : false,
          latestMessageId: chat?.latestMessage ?? "",
          users: otherUsers,
          active: false,
          //   isOnline: onlineUsers?.includes(otherUser._id) ?? false,
          //   isTyping:
          //     typingUsers?.some(
          //       (user) =>
          //         user.chatId === chat._id && user.userId === otherUser._id
          //     ) ?? false,
        };
      });
  };

  const groupChats: GroupChatItems[] =
    chats_data?.chats && user_id
      ? extractChatItems(chats_data?.chats, user_id)
      : [];

  const { mutate, isLoading: isCreatingGroup } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: (payload: CreateGroupPayload) => createGroup(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["groups"]);
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      form.reset();
      setOpen(false);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const friends =
    friends_data && user_id && extractUsers(friends_data, user_id);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const payload = {
      chatName: data.group_name,
      userIds: data.members,
    };
    mutate(payload);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-x-6">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-20 bg-white transition-transform transform md:relative md:translate-x-0 md:col-span-4 lg:col-span-3 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${isSidebarOpen ? "md:w-full" : ""} `}
        >
          <div className=" md:hidden px-1 m-1 ml-[2rem]">
            <CustomTabs setActiveTab={setActiveTab} tab="group" />
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
              <div
                className="flex  px-2 py-4 items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={() => setOpen(true)}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-b from-orange-300  to-primary rounded-full shadow-lg shadow-primary ">
                  <MdOutlineAddCircleOutline className="text-white text-2xl" />
                </div>
                <p className="text-[#152946] font-semibold">New Group</p>
              </div>
              {groupChats?.length > 0 &&
                groupChats.map((groupChat) => (
                  <NewGroupChatItem
                    {...groupChat}
                    active={selectedChat && selectedChat.id === groupChat.id}
                    onClick={() => {
                      setSelectedChat(groupChat);
                      setSidebarOpen(false);
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
                  id: selectedChat.id,
                  name: selectedChat.name,
                  avatarUrl: selectedChat.avatarUrl
                    ? selectedChat.avatarUrl
                    : "",
                  isOnline: false,
                  reciverId: "3q34u234uo23i4o23i",
                }}
                onClick={openSideBar}
                chatType="Group"
                memebers={selectedChat?.users?.length + 1}
              />
              <ScrollArea className="h-[74.4vh] sm:h-[76vh] md:h-[68.8vh] !overflow-hidden ">
                <GroupChatMessages groupId={selectedChat.id} />
              </ScrollArea>
              <ChatInput
                chatId={selectedChat.id}
                reciverId={"2"}
                chatType="GROUP"
              />
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
                        placeholder="Group Name"
                        className={"!rounded-lg shadow !bg-white"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label
                  className={
                    form.formState.errors?.members
                      ? "text-red-500 font-medium text-sm"
                      : "text-black font-medium text-sm"
                  }
                >
                  Add Members
                </label>

                <Controller
                  name="members"
                  control={form.control}
                  rules={{ required: "At least one member is required" }}
                  render={({ field }) => (
                    <MultiSelectDropdown
                      control={form.control}
                      name="members"
                      options={
                        friends
                          ? friends.map((friend) => ({
                              value: friend.user_id,
                              label: friend.name,
                              image: friend.profilePicture,
                            }))
                          : []
                      }
                    />
                  )}
                />

                {form.formState.errors?.members && (
                  <small className="text-red-500">
                    {form.formState.errors.members.message}
                  </small>
                )}
              </div>

              <button className="px-4 py-2 mt-4 flex items-center justify-center  bg-primary text-white w-full rounded-full">
                {isCreatingGroup ? (
                  <LoaderCircle
                    style={{
                      animation: "spin 1s linear infinite",
                      fontSize: "2rem",
                      color: "#FFFFFF",
                    }}
                  />
                ) : (
                  <span>Create Group</span>
                )}
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
