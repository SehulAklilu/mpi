import { FC, ReactNode } from "react";
import MaterialIcon from "../Icon/MaterialIcon";

interface DashboardCardProps {
  cardTitle: string;
  cardIcon?: string;
  actionButton?: ReactNode;
  children: ReactNode;
}

const DashboardCard: FC<DashboardCardProps> = ({
  cardTitle,
  cardIcon,
  actionButton,
  children,
}) => {
  return (
    <div className="flex flex-col bg-white font-raleway gap-5 py-2 px-3 rounded-lg shadow-md w-full ">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3 ">
          <MaterialIcon className="text-primary" icon={cardIcon || ""} />
          <p className="font-normal">{cardTitle}</p>
        </div>
        <div>{actionButton}</div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default DashboardCard;
