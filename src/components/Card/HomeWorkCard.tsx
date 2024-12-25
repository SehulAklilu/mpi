import { FC, MouseEventHandler } from "react";
import MaterialIcon from "../Icon/MaterialIcon";

interface HomeWorkCardProps {
  title: string;
  homeworkDone: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const HomeWorkCard: FC<HomeWorkCardProps> = ({
  title,
  homeworkDone,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-background p-3 rounded-lg shadow-md flex flex-row justify-between"
    >
      <p>{title}</p>
      {homeworkDone ? (
        <MaterialIcon className="text-blue" icon="done_all" />
      ) : (
        <MaterialIcon className="text-blue" icon="adjust" />
      )}
    </div>
  );
};

export default HomeWorkCard;
