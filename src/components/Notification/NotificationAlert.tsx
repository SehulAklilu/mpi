import { FaArrowLeft, FaShare } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useQuery } from "react-query";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";

const NotificationAlert = ({ setIsNotiOpen }: { setIsNotiOpen: Function }) => {
  const {
    isSuccess,
    isLoading,
    data: result,
  } = useQuery("notifications", () => axios.get("/api/v1/notifications"), {
    onSuccess(data) {
      console.log(data, "notifications");
    },
    onError(err: any) {
      toast.error(
        typeof err.response.data === "string"
          ? err.response.data
          : "Error loading journals"
      );
    },
  });
  return (
    <div className="fixed top-0 left-[287px]  h-screen w-screen bg-gray-900/70 ">
      <div className="w-[400px] bg-white h-screen z-50 flex flex-col ">
        <Button
          onClick={() => setIsNotiOpen(false)}
          className="bg-gradient-to-b from-[#F8B672] to-[#F2851C] text-white px-2 py-2 rounded-l-xl mt-4 ml-auto  "
        >
          <FaArrowLeft className="text-lg" />
        </Button>
        <div className="w-full flex flex-col gap-5 pb-12 px-2 mt-4 overflow-auto">
          {/* <NotificationMessage />
          <NotificationGroup />
          <NotificationFriends /> */}
          {isLoading ? (
            <>
              <NotificationLoading />
              <NotificationLoading />
              <NotificationLoading />
            </>
          ) : isSuccess && result.data.length == 0 ? (
            <div className="w-full flex justify-center">Nothing Found</div>
          ) : (
            result?.data.map((_: any, ind: number) => (
              <>{ind + 1} Notification</>
            ))
          )}
        </div>
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

const Notification = () => {
  return (
    <div className="border rounded-lg w-full py-2 text-sm p-2">
      <div className="flex gap-2">
        <img
          src="https://randomuser.me/api/portraits/med/men/37.jpg"
          alt=""
          className="rounded-full w-12 h-12"
        />
        <div className="flex flex-col">
          <div className="font-semibold">Jornal</div>
          <div>Player(Friend)</div>
          <div className="mt-4 text-xs w-full">
            I just won my first match since joining Mindsight!!
          </div>
        </div>
      </div>

      <Button className="w-full py-1  border mt-4 rounded-lg border-primary text-primary">
        Reply
      </Button>
    </div>
  );
};

const NotificationMessage = () => {
  return (
    <div className="border rounded-lg w-full py-2 text-sm p-2">
      <div className="flex gap-2">
        <div className="relative w-[6rem]">
          <img
            src="https://randomuser.me/api/portraits/med/women/46.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-0"
          />

          <img
            src="https://randomuser.me/api/portraits/med/women/46.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-5"
          />
          <img
            src="https://randomuser.me/api/portraits/med/women/46.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-10"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">
            Jordan & 15 Others Replied to Your Messages
          </div>
          <div className="mt-4 text-sm w-full text-gray-700">
            Reply to your Connections
          </div>
        </div>
      </div>

      <Button className="w-full py-2 flex gap-2 justify-center items-center border mt-4 rounded-lg border-primary text-primary">
        <div>Messages</div>
        <FaShare />
      </Button>
    </div>
  );
};
const NotificationGroup = () => {
  return (
    <div className="border rounded-lg w-full py-2 text-sm p-2">
      <div className="flex gap-2">
        <div className="relative w-[6rem]">
          <img
            src="https://randomuser.me/api/portraits/med/men/37.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-0"
          />

          <img
            src="https://randomuser.me/api/portraits/med/men/37.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-5"
          />
          <img
            src="https://randomuser.me/api/portraits/med/men/37.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-10"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Coach Damians Team</div>
          <div className="mt-4 text-sm w-full text-gray-700">
            Check out your Group
          </div>
        </div>
      </div>

      <Button className="w-full py-2 flex gap-2 justify-center items-center border mt-4 rounded-lg border-primary text-primary">
        <div>Groups</div>
        <FaShare />
      </Button>
    </div>
  );
};

const NotificationFriends = () => {
  return (
    <div className="border rounded-lg w-full py-2 text-sm p-2">
      <div className="flex gap-2">
        <div className="relative w-[6rem]">
          <img
            src="https://randomuser.me/api/portraits/med/women/22.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-0"
          />

          <img
            src="https://randomuser.me/api/portraits/med/women/22.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-5"
          />
          <img
            src="https://randomuser.me/api/portraits/med/women/22.jpg"
            alt=""
            className="rounded-full w-12 h-12 border absolute left-10"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">New Friends!</div>
          <div className="mt-4 text-sm w-full text-gray-700">
            Talk with new friends
          </div>
        </div>
      </div>

      <Button className="w-full py-2 flex gap-2 justify-center items-center border mt-4 rounded-lg border-primary text-primary">
        <div>People</div>
        <FaShare />
      </Button>
    </div>
  );
};
export default NotificationAlert;
