import {
  blockFriend,
  createChat,
  CreateChatPayload,
  sendFriendRequest,
  sendFriendRequestPayload,
  unblockFriend,
  unfriend,
} from "@/api/chat.api";
import React, { useState } from "react";

import { HiDotsHorizontal } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";
import { ProfileDataInterface } from "./PeopleComponent";

const ProfileCard: React.FC<ProfileDataInterface> = ({
  user_id,
  friendship_id,
  name,
  role,
  profilePicture,
  status,
  otherUserBolocked,
  setActiveTab,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationKey: ["follow"],
    mutationFn: (payload: sendFriendRequestPayload) =>
      sendFriendRequest(payload),
  });

  const unfollow = useMutation({
    mutationKey: ["unfollow"],
    mutationFn: (id: string) => unfriend(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const block = useMutation({
    mutationKey: ["block"],
    mutationFn: (id: string) => blockFriend(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const unblock = useMutation({
    mutationKey: ["unblock"],
    mutationFn: (id: string) => unblockFriend(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const createChatMessage = useMutation({
    mutationKey: ["createChat"],
    mutationFn: (payload: CreateChatPayload) => createChat(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
      setActiveTab && setActiveTab("messages");
    },
  });

  const onFollow = () => {
    if (status === "friends") {
      unfollow.mutate(friendship_id);
    }
  };
  const onMessage = () => {
    createChatMessage.mutate({ userId: user_id });
  };
  const onBlockToggle = () => {
    if (otherUserBolocked) {
      unblock.mutate(friendship_id);
      return;
    }
    block.mutate(friendship_id);
  };

  return (
    <div className="w-72 relative bg-[#F2F2F7] shadow-md rounded-lg border border-[#AEAFB2] p-6 text-center">
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <HiDotsHorizontal size={20} />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-24  bg-white shadow-md rounded-lg border border-gray-200">
            <button
              onClick={() => {
                onBlockToggle();
                setShowMenu(false);
              }}
              className="block w-full text-center px-4 py-2 hover:bg-gray-100"
            >
              {otherUserBolocked ? "Unblock" : "Block"}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={profilePicture}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-2xl py-1">{name}</p>

        <p className="py-1 text-lg text-gray-600">{role}</p>
        <div className="flex items-center justify-center py-1 gap-4">
          <button
            onClick={onFollow}
            className="w-full bg-orange-500 text-white py-2 rounded-md px-3 hover:bg-orange-600 transition-colors"
          >
            {status === "friends" ? "Unfollow" : "Follow"}
          </button>
          <button
            onClick={onMessage}
            disabled={status !== "friends"}
            className={`w-full py-2 border rounded-md px-3 ${
              status !== "friends"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-gray-300"
            }`}
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
