import { FC } from "react";
import MaterialIcon from "./MaterialIcon";

interface IconProps {
  icon: string;
  bgColor: string | undefined;
  iconColor: string | undefined;
}

const IconwithcircleBg: FC<IconProps> = ({ icon, bgColor, iconColor }) => {
  return (
    <div
      className={`bg-${bgColor} w-6 h-6 text-${iconColor} flex justify-center items-center p-1 rounded-full`}
    >
      <MaterialIcon className="text-sm" outline icon={icon} />
    </div>
  );
};

export default IconwithcircleBg;
