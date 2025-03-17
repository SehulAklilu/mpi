// import React from 'react'

import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import ProfileCard from "./ProfileCard";
import { ScrollArea } from "../ui/scroll-area";
import { FriendDataResponse, FriendRequestResponse } from "@/types/chat.type";
import { useMutation, useQuery } from "react-query";
import { createChat, getFriendRequest, getFriends } from "@/api/chat.api";
import Cookies from "js-cookie";
import PeopleSkeleton from "./PeopleSkeleton";
import { MenuIcon } from "lucide-react";
import CustomTabs from "./CustomTabs";
import NotificationCard from "../PendingMatch/NotificationCard";
import { useEffect, useState } from "react";
export interface ProfileDataInterface {
  user_id: string;
  friendship_id: string;
  name: string;
  role: string;
  status: "friends" | "pending" | "blocked";
  profilePicture: string;
  otherUserBlocked: boolean;
  relationshipType: "following" | "follower";
  setActiveTab?: (tab: string) => void;
}

export interface FriendRequestInterface {
  user_id: string;
  friendship_id: string;
  name: string;
  role: string;
  status: "pending" | "request" | "accepted" | "rejected";
  profilePicture: string;
}
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { nativeEnum } from "zod";
import FriendRequestCard from "../PendingMatch/NotificationCard";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { extractUsers } from "@/lib/utils";
import { searchUsers } from "@/api/auth.api";
import ProfileCardNew from "./ProfileCardNew";

interface PeopleComponentProps {
  setActiveTab: (tab: string) => void;
  setOpenChatId: (chatId: string) => void;
}

const PeopleComponent: React.FC<PeopleComponentProps> = ({
  setActiveTab,
  setOpenChatId,
}) => {
  const [isFriendRequestsOpen, setFriendRequestsOpen] = useState(true);
  const [isFriendsOpen, setFriendsOpen] = useState(true);
  const [isContactsOpen, setContactsOpen] = useState(false);
  const [isPeopleOpen, setPeopleOpen] = useState(false);
  const [showFollowing, setShowFollowing] = useState(true);
  const [showFollowers, setShowFollowers] = useState(false);
  const user_id = Cookies.get("user_id");
  const [searchString, setSearchString] = useState<string>("");
  const [searchInput, setSearchInput] = useState(""); // User input
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data: friends_data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const { data: friendRequests, isLoading: friendRequestLoading } = useQuery({
    queryKey: ["FriendRequest"],
    queryFn: getFriendRequest,
  });

  const onMeesageMut = useMutation({
    mutationKey: ["createChat"],
    mutationFn: createChat,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      setOpenChatId(response?.id);
      setActiveTab("messages");
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const {
    data,
    isLoading: searchingUser,
    error,
  } = useQuery({
    queryKey: ["searchUser", debouncedSearch],
    queryFn: () => searchUsers(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  const onMessage = (otherUserId: string) => {
    onMeesageMut.mutate({ userId: otherUserId });
  };

  function extractFriendRequests(
    data: FriendRequestResponse,
    userId: string
  ): FriendRequestInterface[] {
    const friendRequests: FriendRequestInterface[] = [];

    data.friendRequests.forEach((friendship) => {
      if (friendship.status === "request") {
        const otherUser =
          friendship.user1._id === userId ? friendship.user2 : friendship.user1;
        const otherUserBlocked =
          friendship.user1._id === userId
            ? friendship.user2IsBlocked
            : friendship.user1IsBlocked;

        friendRequests.push({
          user_id: otherUser._id,
          friendship_id: friendship.id,
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          role: otherUser.__t,
          status: friendship.status,
          profilePicture: otherUser.avatar,
        });
      }
    });

    return friendRequests;
  }

  const friends =
    friends_data && user_id && extractUsers(friends_data, user_id);

  const friend_requests =
    friendRequests && user_id && extractFriendRequests(friendRequests, user_id);

  if (isLoading) {
    return <PeopleSkeleton />;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div>
      <div className="sticky top-0 md:p-4 mx-2 rounded-lg">
        <div className="md:hidden px-1 my-1">
          <CustomTabs setActiveTab={setActiveTab} tab="people" />
        </div>
        <Input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
          startIcon={FaSearch}
        />
      </div>
      {/* export interface ProfileDataInterface {
  user2Id?: string;
  user_id: string;
  friendship_id: string;
  name: string;
  role: string;
  status: "friends" | "pending" | "blocked";
  profilePicture: string;
  otherUserBlocked: boolean;
  relationshipType: "following" | "follower";
  setActiveTab?: (tab: string) => void;
  message?: string;
  buttonText?: string;
} */}
      <ScrollArea className="h-[70vh] rounded-md">
        <section className="p-4">
          <div className="space-y-2">
            {data?.users?.map((user, index) => (
              <ProfileCardNew
                key={user.id}
                user2Id={user._id}
                user_id={user.id}
                friendship_id="1"
                name={user.firstName + " " + user.lastName}
                role={user.role}
                status="search"
                profilePicture={user.avatar}
                otherUserBlocked={false}
                relationshipType="following"
              />
            ))}
          </div>
        </section>

        <section className="p-4">
          {/* Friend Requests */}
          <div className="border-b">
            <div
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => setFriendRequestsOpen(!isFriendRequestsOpen)}
            >
              <h1 className="text-xl text-[#152946] font-semibold">
                Friend Requests
              </h1>

              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white px-2 py-[.08rem] flex items-center justify-center  text-sm rounded-full">
                  {friendRequests?.result}
                </span>
                {isFriendRequestsOpen ? (
                  <FiChevronUp size={20} className="text-gray-600" />
                ) : (
                  <FiChevronDown size={20} className="text-gray-600" />
                )}
              </div>
            </div>
            {isFriendRequestsOpen && friend_requests && (
              <div className="space-y-2">
                {friend_requests.map((friendRequest, index) => (
                  <FriendRequestCard
                    key={index}
                    friendshipId={friendRequest.friendship_id}
                    name={friendRequest.name}
                    role={friendRequest.role}
                    message={friendRequest.name + " wants to be your Friend"}
                    profilePicture={friendRequest.profilePicture}
                    status={friendRequest.status as "pending" | "accepted"}
                    onMessage={() => console.log("notting will happen")}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Friends */}
          <div className="border-b">
            <div
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => setFriendsOpen(!isFriendsOpen)}
            >
              <h1 className="text-xl text-[#152946] font-semibold">Friends</h1>
              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white px-2 py-[.08rem] flex items-center justify-center  text-sm rounded-full">
                  {friends_data?.friendship.result}
                </span>
                {isFriendsOpen ? (
                  <FiChevronUp size={20} className="text-gray-600" />
                ) : (
                  <FiChevronDown size={20} className="text-gray-600" />
                )}
              </div>
            </div>
            {isFriendsOpen && friends && (
              <div className="space-y-4">
                <div className="space-y-2 mt-2">
                  {friends?.map((friend) => (
                    <ProfileCardNew
                      key={friend.friendship_id}
                      {...friend}
                      onMessage={onMessage}
                    />
                  ))}
                  {/* <div className="flex items-center justify-center">
                        <button className="border rounded-lg px-6 py-2">
                          Load More
                        </button>
                      </div> */}
                </div>
              </div>
            )}
          </div>

          {/* People From Your Contacts */}
          {/* <div className="border-b">
            <div
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => setContactsOpen(!isContactsOpen)}
            >
              <h1 className="text-xl text-[#32445D] font-bold">
                People From Your Contacts
              </h1>
              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white px-2 py-1 text-sm rounded-full">
                  99+
                </span>
                {isContactsOpen ? (
                  <FiChevronUp size={20} className="text-gray-600" />
                ) : (
                  <FiChevronDown size={20} className="text-gray-600" />
                )}
              </div>
            </div>
            {isContactsOpen && (
              <div className="justify-center sm:justify-start flex flex-wrap gap-x-2 gap-y-4">
                {friends ? (
                  friends.map((profile) => (
                    <ProfileCard
                      key={profile.user_id}
                      {...profile}
                      setActiveTab={setActiveTab}
                    />
                  ))
                ) : (
                  <>No Friends Found</>
                )}
              </div>
            )}
          </div> */}

          {/* People You May Know */}
          {/* <div className="border-b">
            <div
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => setPeopleOpen(!isPeopleOpen)}
            >
              <h1 className="text-xl text-[#32445D] font-bold">
                People You May Know
              </h1>
              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white px-2 py-1 text-sm rounded-full">
                  99+
                </span>
                {isPeopleOpen ? (
                  <FiChevronUp size={20} className="text-gray-600" />
                ) : (
                  <FiChevronDown size={20} className="text-gray-600" />
                )}
              </div>
            </div>
            {isPeopleOpen && (
              <p className="text-gray-500">
                Suggested people you might know...
              </p>
            )}
          </div> */}
        </section>
        {/* <section className="p-4">
          <h1 className="text-xl text-[#32445D] my-2 font-bold">
            From your Contacts
          </h1>
          <div className="justify-center sm:justify-start flex flex-wrap gap-x-2 gap-y-4">
            {friends ? (
              friends.map((profile) => (
                <ProfileCard
                  key={profile.user_id}
                  {...profile}
                  setActiveTab={setActiveTab}
                />
              ))
            ) : (
              <>No Friends Found</>
            )}
          </div>
        </section> */}
      </ScrollArea>
    </div>
  );
};

export default PeopleComponent;

// saminasgigar@gmail.com player
// dotihagos@gmail.com coach
// es.appdevelopers@gmail.com parent

// 673b5771922706927eae7aea - saminas
// 6774fde8f38abd3b7250b700 - nati
// 6776223cf38abd3b7250d4e6 - zenebech
