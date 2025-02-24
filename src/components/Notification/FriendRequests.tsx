import { useQuery } from "react-query";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role?: string;
  lastOnline?: string;
  isOnline?: boolean;
  __t: string;
  id?: string;
}

interface Friendship {
  user1: User;
  user2: User;
  user1IsBlocked: boolean;
  user2IsBlocked: boolean;
  status: string;
  friendRequestSentAt: string;
  becameFriendsAt: string;
  notification: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

const FriendRequest = () => {
  const friendRequestQuery = useQuery(
    "friendRequest",
    () => axios.get("/api/v1/friendship/friendRequest"),
    {
      onSuccess(data) {
        console.log(data, "friendRequest");
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error loading friendRequest"
        );
      },
    }
  );
  return (
    <div className="w-full">
      {friendRequestQuery.isLoading && <NotificationLoading />}
      {friendRequestQuery.isSuccess && (
        <div className="flex flex-col gap-2">
          {friendRequestQuery.data.data.friendRequests.map(
            (d: Friendship, ind: number) => {
              return <An key={ind} data={d} />;
            }
          )}
        </div>
      )}
    </div>
  );
};

const An = ({ data }: { data: Friendship }) => {
  return (
    <div className="w-full relative border border-primary/20 shadow flex flex-col py-2 px-2 gap-3 rounded-lg">
      <div className="flex gap-3">
        <div>
          <img
            src={data.user1.avatar}
            width={100}
            height={100}
            className="rounded-full w-12 h-12"
            alt="img"
          />
        </div>
        <div className="flex flex-col gap-1 capitalize">
          <div className="font-semibold">{data.user1.firstName}</div>
          <div className="text-xs">
            {new Date(data.friendRequestSentAt)
              .toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "2-digit",
              })
              .replace(/ /g, "-")}
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        <Button className="px-2 rounded-lg py-1 mt-2 bg-primary text-white w-full">
          Accept Friend Request
        </Button>
        <Button className="px-2 rounded-lg py-1 mt-2 border-primary border bg-white w-full">
          Goto Friend Request
        </Button>
      </div>
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

export default FriendRequest;
