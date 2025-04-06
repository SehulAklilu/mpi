import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { createChat, getChats } from "@/api/chat.api";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MessageButton({ user_id, style }: { user_id: string; style: string }) {
  const navigate = useNavigate();

  const onMeesageMut = useMutation({
    mutationKey: ["createChat"],
    mutationFn: createChat,
    onSuccess: (response) => {
      if (response) {
        navigate(`/chat/${response._id}`);
      }
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const {
    data: chats_data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    onSuccess: () => {},
  });
  const onMessage = () => {
    const chat = chats_data?.chats
      ?.filter((chat) => !chat.isGroupChat)
      ?.find((singleChat) =>
        singleChat.users?.some((user) => user._id == user_id)
      );
    if (chat) {
      navigate(`/chat/${chat._id}`);
    }
    {
      onMeesageMut.mutate({ userId: user_id });
    }
  };
  return (
    <div onClick={() => onMessage()}>
      <button className={style}>
        Message
        {isLoading && (
          <LoaderCircle
            style={{
              animation: "spin 1s linear infinite",
              fontSize: "2rem",
              color: "#FFFFFF",
            }}
          />
        )}
      </button>
    </div>
  );
}

export default MessageButton;
