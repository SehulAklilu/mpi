import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import {
  blockFriend,
  createChat,
  CreateChatPayload,
  sendFriendRequest,
  sendFriendRequestPayload,
  unblockFriend,
  unfriend,
} from "@/api/chat.api";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

import { HiDotsHorizontal } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface ProfileDataInterface {
  user2Id?: string;
  user_id: string;
  friendship_id: string;
  name: string;
  role: string;
  status: "friends" | "pending" | "blocked" | "search";
  profilePicture: string;
  otherUserBlocked: boolean;
  relationshipType: "following" | "follower";
  setActiveTab?: (tab: string) => void;
  message?: string;
  buttonText?: string;
}

const ProfileCardNew: React.FC<ProfileDataInterface> = ({
  user2Id,
  user_id,
  friendship_id,
  name,
  role,
  profilePicture,
  status,
  otherUserBlocked,
  setActiveTab,
  buttonText,
  message,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationKey: ["follow"],
    mutationFn: (payload: sendFriendRequestPayload) =>
      sendFriendRequest(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["friends"]);
      toast.success(getAxiosSuccessMessage(response));
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
    },
  });

  const unfollow = useMutation({
    mutationKey: ["unfollow"],
    mutationFn: (id: string) => unfriend(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["friends"]);
      toast.success(getAxiosSuccessMessage(response));
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
    },
  });

  const block = useMutation({
    mutationKey: ["block"],
    mutationFn: (id: string) => blockFriend(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["friends"]);
      toast.success(getAxiosSuccessMessage(response));
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
    },
  });

  const unblock = useMutation({
    mutationKey: ["unblock"],
    mutationFn: (id: string) => unblockFriend(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["friends"]);
      toast.success(getAxiosSuccessMessage(response));
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
    },
  });

  const createChatMessage = useMutation({
    mutationKey: ["createChat"],
    mutationFn: (payload: CreateChatPayload) => createChat(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["chats"]);
      setActiveTab && setActiveTab("messages");
      toast.success(getAxiosSuccessMessage(response));
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
    },
  });

  const onFollow = () => {
    if (status === "friends") {
      unfollow.mutate(friendship_id);
    } else {
      user2Id && follow.mutate({ user2: user2Id });
    }
  };
  const onMessage = () => {
    // createChatMessage.mutate({ userId: user_id });
    setActiveTab && setActiveTab("messages");
  };
  const onBlockToggle = () => {
    if (otherUserBlocked) {
      unblock.mutate(friendship_id);
      return;
    }
    block.mutate(friendship_id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200 gap-4 w-full max-w-full overflow-hidden">
      {/* Left Section: Avatar + Info */}
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
        {/* Placeholder Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
          <img
            src={profilePicture}
            alt="profilePicture"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="font-medium text-lg">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex gap-2 flex-wrap justify-start sm:justify-end w-full sm:w-auto">
        <div className="flex items-center justify-center py-1 gap-4">
          <button
            onClick={onFollow}
            className="w-full flex gap-2 bg-orange-500 text-white text-xs md:text-sm py-2 px-3 rounded-md  hover:bg-orange-600 transition-colors"
          >
            {status === "friends" ? "Unfollow" : "Follow"}
            {follow.isLoading ||
              (unfollow.isLoading && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              ))}
          </button>
          {status === "friends" && (
            <button
              onClick={onMessage}
              disabled={status !== "friends"}
              className={`w-full py-2 px-3 text-xs md:text-sm border rounded-md  ${
                status !== "friends"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-300"
              }`}
            >
              Message
            </button>
          )}
        </div>
        {status === "friends" && (
          <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <HiDotsHorizontal size={20} />
            </button>
            {showMenu && (
              <div className="absolute bottom-5 right-8 z-10 mt-2 w-24 bg-white shadow-md rounded-lg border border-gray-200">
                <button
                  onClick={() => onBlockToggle()}
                  className="block w-full text-center px-4 py-2 hover:bg-gray-100"
                >
                  {otherUserBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCardNew;
