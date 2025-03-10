import { getGroups, getGroupsMessage, Group } from "@/api/group-chat.api";
import React, { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import Cookies from "js-cookie";
import styles from "./ChatMessage.module.css";
import ChatMessagesSkeleton from "./ChatMessagesSkeleton";
import { GroupChatItemProps } from "./GroupChatItem";
import { group } from "console";

function GroupChatMessages({ groupId }: { groupId: string }) {
  const user_id = Cookies.get("user_id");
  const {
    data: messages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["groupmessage", groupId],
    queryFn: () => getGroupsMessage(groupId),
    enabled: !!groupId,
  });

  const { data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  function formatTime(createdAt: string): string {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString([], options);
  }

  const getProfile = (
    senderId: string,
    groups: Group[] | undefined,
    groupId: string | undefined
  ) => {
    if (senderId === user_id) {
      return null;
    }

    if (groupId && groups) {
      const selectedGroup = groups?.find((group) => group?._id === groupId);
      if (selectedGroup) {
        const sender = selectedGroup?.members.find(
          (member) => member?.user?._id === senderId
        );

        if (sender) {
          return (
            <div className="flex gap-1 items-center">
              <img
                src={sender.user.avatar}
                className="w-8 h-8 rounded-full object-cover"
                alt={sender.user.firstName}
              />
              <p className="text-sm font-medium">{sender.user.firstName}</p>
            </div>
          );
        }
      }
    }

    return null;
  };
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`flex flex-col-reverse gap-4 h-[84vh] sm:h-[80vh] md:h-[65vh] ${styles.customScrollbar}`}
      ref={scrollAreaRef}
      // style={{ height: "467px" }}
    >
      {isLoading ? (
        <ChatMessagesSkeleton />
      ) : (
        user_id &&
        messages
          ?.slice()
          .reverse()
          .map((message, index) => (
            <div
              key={index}
              className={`flex  ${
                message.sender === user_id ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-xs p-3 rounded-lg">
                <span className="flex  items-center gap-1">
                  {" "}
                  {getProfile(message.sender, groups, groupId)}{" "}
                  {formatTime(message.createdAt)}
                </span>

                {message.type === "message" && (
                  <div
                    className={`py-2 px-4  ${
                      message.sender === user_id
                        ? "bg-[#F2851C]  text-white rounded-md rounded-tr-none"
                        : "bg-[#D8D8D8] text-black rounded-md rounded-tl-none"
                    }`}
                  >
                    {message.message}
                  </div>
                )}
                {message.type === "image" && (
                  <img
                    src={message.message}
                    alt="Chat Image"
                    className="rounded"
                  />
                )}
                {message.type === "voice" && (
                  <audio controls className="w-full">
                    <source src={message.message} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default GroupChatMessages;
