import { FC } from "react";
import MaterialIcon from "../Icon/MaterialIcon";

export interface SingleChatProps {
  id: string;
  name: string;
  lastText: string;
  readReceipts: string;
  time: string;
  userPhoto: string;
  setSelected: (id: string) => void;
}

export interface User {
  id: string;
  name: string;
  lastText: string;
  readReceipts: string;
  time: string;
  userPhoto: string;
}

const SingleChat: FC<SingleChatProps> = ({
  name,
  lastText,
  readReceipts,
  time,
  userPhoto,
  setSelected,
  id,
}) => {
  return (
    <div
      onClick={() => setSelected(id)}
      className="flex flex-row hover:bg-lightGrey  rounded-2xl justify-between py-2  bg-white cursor-pointer"
    >
      <div className="flex flex-row gap-3">
        <div className="flex my-auto ">
          <img className="w-12 h-12 rounded-full" src={userPhoto} alt="" />
        </div>
        <div className=" flex flex-col justify-center">
          <p className="font-medium text-base xs-phone:text-xs">{name}</p>
          <p className="font-extralight text-xs text-black-65 xs-phone:text-xs ">
            {lastText}
          </p>
        </div>
      </div>
      <div className="w-1/4 flex flex-col items-center justify-center ">
        <MaterialIcon className="text-base text-blue" icon={readReceipts} />
        <p className="font-extralight text-xs xs-phone:text-xs text-black-65 ">
          {time}
        </p>
      </div>
    </div>
  );
};

export default SingleChat;
