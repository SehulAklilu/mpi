import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import {
  acceptFriendRequest,
  createChat,
  rejectFriendRequest,
} from "@/api/chat.api";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface FriendRequestCardProps {
  friendshipId: string;
  name: string;
  role: string;
  message: string;
  status: "pending" | "request" | "accepted" | "rejected";
  profilePicture: string;
  onMessage: () => void;
}

const FriendRequestCard: React.FC<FriendRequestCardProps> = ({
  friendshipId,
  name,
  role,
  message,
  status,
  profilePicture,
  onMessage,
}) => {
  const queryClient = useQueryClient();

  const onAcceptMut = useMutation({
    mutationKey: ["accepte"],
    mutationFn: acceptFriendRequest,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries(["FriendRequest"]);
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const onDeclineMut = useMutation({
    mutationKey: ["decline"],
    mutationFn: rejectFriendRequest,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries(["FriendRequest"]);
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const onAccept = (id: string) => {
    onAcceptMut.mutate(id);
  };
  const onDecline = (id: string) => {
    onDeclineMut.mutate(id);
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
        {status === "request" || status === "pending" ? (
          <>
            <button
              onClick={() => onAccept(friendshipId)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full sm:w-auto"
            >
              {onAcceptMut.isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                "Accept"
              )}
            </button>
            <button
              onClick={() => onDecline(friendshipId)}
              className="px-4 py-2 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-100 w-full sm:w-auto"
            >
              {onDeclineMut.isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                "Decline"
              )}
            </button>
          </>
        ) : (
          <button
            onClick={onMessage}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full sm:w-auto"
          >
            Message
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendRequestCard;
