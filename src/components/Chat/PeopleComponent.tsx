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

  return (
    <div>
      <div className="sticky top-0 p-4 rounded-lg">
        <Input
          type="text"
          id="full_name"
          placeholder="Search..."
          className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
          startIcon={FaSearch}
        />
      </div>
      <ScrollArea className="h-[65vh] rounded-md">
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
      </ScrollArea>
    </div>
  );
};

export default PeopleComponent;

// saminasgigar@gmail.com player
// dotihagos@gmail.com coach
// es.appdevelopers@gmail.com parent
