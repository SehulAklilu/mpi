// import React from 'react'

import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import ProfileCard from "./ProfileCard";
import { ScrollArea } from "../ui/scroll-area";
import { FriendDataResponse } from "@/types/chat.type";
import { useQuery } from "react-query";
import { getFriends } from "@/api/chat.api";
import Cookies from "js-cookie";
import PeopleSkeleton from "./PeopleSkeleton";
import { MenuIcon } from "lucide-react";
import CustomTabs from "./CustomTabs";
import NotificationCard from "../PendingMatch/NotificationCard";
export interface ProfileDataInterface {
  user_id: string;
  friendship_id: string;
  name: string;
  role: string;
  status: "friends" | "pending" | "blocked";
  profilePicture: string;
  otherUserBolocked: boolean;
  setActiveTab?: (tab: string) => void;
}

interface PeopleComponentProps {
  setActiveTab: (tab: string) => void;
}

const PeopleComponent: React.FC<PeopleComponentProps> = ({ setActiveTab }) => {
  const {
    data: friends_data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });
  const user_id = Cookies.get("user_id");

  function extractUsers(
    data: FriendDataResponse,
    userId: string
  ): ProfileDataInterface[] {
    const users: ProfileDataInterface[] = [];

    // Process friendships
    data.friendship.friends.forEach((friendship) => {
      const otherUser =
        friendship.user1._id === userId ? friendship.user2 : friendship.user1;
      const otherUserBolocked =
        friendship.user1._id === userId
          ? friendship.user2IsBlocked
          : friendship.user1IsBlocked;

      users.push({
        user_id: otherUser._id,
        friendship_id: friendship.id,
        name: `${otherUser.firstName} ${otherUser.lastName}`,
        role: otherUser.__t,
        status: friendship.status,
        profilePicture: otherUser.avatar,
        otherUserBolocked: otherUserBolocked,
      });
    });

    return users;
  }

  const friends =
    friends_data && user_id && extractUsers(friends_data, user_id);

  if (isLoading) {
    return <PeopleSkeleton />;
  }

  if (isError) {
    return <>Error</>;
  }

  const notifications = [
    {
      name: "Myles Munroe",
      role: "Coach",
      message: "Myles wants to be your Friend",
      status: "pending",
    },
    {
      name: "Candace Flynn",
      role: "Player",
      message: "Candace accepted your Friend Request!",
      status: "accepted",
    },
    {
      name: "Phineas",
      role: "Coach",
      message: "Myles wants to be your Friend",
      status: "pending",
    },
  ];

  return (
    <div>
      <div className="sticky top-0 md:p-4 mx-2 rounded-lg">
        <div className=" md:hidden px-1 flex items-center gap-x-1 pb-2">
          <MenuIcon size={36} className="invisible text-[#F2851C] flex-none " />
          <CustomTabs setActiveTab={setActiveTab} />
        </div>
        <Input
          type="text"
          id="full_name"
          placeholder="Search..."
          className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
          startIcon={FaSearch}
        />
      </div>
      <ScrollArea className="h-[65vh] rounded-md">
        <section className="p-4">
          <h1 className="text-xl text-[#32445D] my-2 font-bold">
            Friend Requests
          </h1>
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <NotificationCard
                key={index}
                name={notification.name}
                role={notification.role}
                message={notification.message}
                status={notification.status as "pending" | "accepted"}
                onAccept={() => console.log(`${notification.name} accepted`)}
                onDecline={() => console.log(`${notification.name} declined`)}
                onMessage={() => console.log(`Message ${notification.name}`)}
              />
            ))}
          </div>
        </section>
        <section className="p-4">
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
        </section>
      </ScrollArea>
    </div>
  );
};

export default PeopleComponent;

// saminasgigar@gmail.com player
// dotihagos@gmail.com coach
// es.appdevelopers@gmail.com parent
