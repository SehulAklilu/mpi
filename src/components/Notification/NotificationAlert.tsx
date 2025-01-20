import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "../ui/button";

const NotificationAlert = ({ setIsNotiOpen }: { setIsNotiOpen: Function }) => {
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
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>
    </div>
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

export default NotificationAlert;
