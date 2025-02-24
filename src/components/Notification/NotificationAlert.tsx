import { FaArrowLeft, FaShare } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useQuery } from "react-query";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import Announcements from "./Announcments";
import FriendRequest from "./FriendRequests";
import { MoreVertical } from "lucide-react";
const NotificationAlert = ({ setIsNotiOpen }: { setIsNotiOpen: Function }) => {
  const notificationQuery = useQuery(
    "notifications",
    () => axios.get("/api/v1/notifications"),
    {
      onSuccess(data) {
        console.log(data, "notifications");
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error loading notifications"
        );
      },
    }
  );

  const announcmentQuery = useQuery(
    "announcements",
    () => axios.get("/api/v1/announcements"),
    {
      onSuccess(data) {
        console.log(data, "announcements");
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error loading announcements"
        );
      },
    }
  );

  const isLoading = notificationQuery.isLoading || announcmentQuery.isLoading;
  const isSuccess = notificationQuery.isSuccess && announcmentQuery.isSuccess;
  const result = announcmentQuery.data || notificationQuery.data;
  const [tab, setTab] = useState(0);
  const tabs = [
    "Messages, People& Groups",
    "Posts",
    "Matches & Training",
    "Announcements",
  ];
  return (
    <div className="fixed top-0 left-[287px]  h-screen w-screen bg-gray-900/70 ">
      <div className="w-[600px] bg-white h-screen z-50 flex flex-col ">
        <div className="flex justify-between">
          <Button
            onClick={() => setIsNotiOpen(false)}
            className="bg-gradient-to-b from-[#F8B672] to-[#F2851C] text-white px-2 py-2 rounded-r-xl mt-4 mr-auto  "
          >
            <FaArrowLeft className="text-lg" />
          </Button>
          <Button>
            <MoreVertical className="text-lg text-primary" />
          </Button>
        </div>
        <div className="w-full flex gap-4 mt-3">
          {tabs.map((t, ind) => (
            <Tab
              key={ind}
              active={ind == tab}
              name={t}
              onClick={() => setTab(ind)}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-5 pb-12 px-2 mt-4 overflow-auto">
          {tab == 3 ? <Announcements /> : tab == 0 ? <FriendRequest /> : <></>}
        </div>
      </div>
    </div>
  );
};

const Tab = ({
  name,
  onClick,
  active,
}: {
  name: string;
  onClick: Function;
  active: boolean;
}) => {
  return (
    <Button
      onClick={() => onClick()}
      className={`py-1 px-2 border-b-2  text-sm ${
        active ? "border-primary" : "border-white"
      }`}
    >
      {name}
    </Button>
  );
};

const NotificationLoading = () => {
  return (
    <Skeleton className="border rounded-lg w-full py-2 text-sm p-2 bg-primary/40">
      <div className="flex gap-2">
        <Skeleton className="rounded-full w-12 h-12 bg-primary" />
        <div className="flex flex-col">
          <Skeleton className="w-2/3 py-3 bg-primary" />
          <Skeleton className="w-2/3 py-3 bg-primary" />
          <Skeleton className="w-1/2 py-3 bg-primary" />
        </div>
      </div>
    </Skeleton>
  );
};

const NotificationFriends = () => {
  return <div className="w-full "></div>;
};

export default NotificationAlert;
