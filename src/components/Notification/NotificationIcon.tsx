import { FC } from "react";
import MaterialIcon from "../Icon/MaterialIcon";

interface NotificationIconProps {
  onclick: () => void;
  notificationNumber: number;
}

const NotificationIcon: FC<NotificationIconProps> = ({
  onclick,
  notificationNumber,
}) => {
  return (
    <div className="relative cursor-pointer " onClick={onclick}>
      <div>
        <MaterialIcon
          icon="notifications"
          outline
          className="text-black-65 text-4xl rounded-md"
        />
      </div>
      <div className="absolute h-5 w-5 top-0 right-0 flex justify-center items-center text-[0.6rem] font-semibold text-white bg-primary rounded-full">
        {notificationNumber}
      </div>
    </div>
  );
};

export default NotificationIcon;
