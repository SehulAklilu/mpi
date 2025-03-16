import { useQuery } from "react-query";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import avater from "../../assets/avater.jpg";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  lastOnline: string;
  __t: string;
  id: string;
}

interface Seen {
  _id: string;
  announcementId: string;
  read: boolean;
}

interface Announcement {
  _id: string;
  title: string;
  description: string;
  category: string;
  announcedTo: string;
  createdBy: User;
  deletedBy: string[];
  createdAt: string;
  updatedAt: string;
  seen: Seen;
  id: string;
}
const Announcements = () => {
  const announcmentQuery = useQuery(
    "announcements",
    () => axios.get("/api/v1/announcements"),
    {
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error loading announcements"
        );
      },
    }
  );
  return (
    <div className="w-full">
      {announcmentQuery.isLoading && <NotificationLoading />}
      {announcmentQuery.isSuccess && (
        <div className="flex flex-col gap-2">
          {announcmentQuery.data.data.map((d: Announcement, ind: number) => {
            return <An key={ind} data={d} />;
          })}
        </div>
      )}
    </div>
  );
};

const An = ({ data }: { data: Announcement }) => {
  return (
    <div className="w-full relative border border-primary/20 shadow flex py-2 px-2 gap-3 rounded-lg">
      <div>
        <img
          src={data?.createdBy?.avatar ?? avater}
          width={100}
          height={100}
          className="rounded-full w-12 h-12"
          alt="img"
        />
      </div>
      <div className="flex flex-col gap-1 capitalize">
        <div className="font-semibold">{data.title}</div>
        <div className="text-xs">{data.description}</div>
      </div>
      <div className="absolute right-2 top-2 text-xs">{data.category}</div>
    </div>
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

export default Announcements;
