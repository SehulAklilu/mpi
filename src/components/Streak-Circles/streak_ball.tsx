import { FC } from "react";

interface StreakBallPRops {
  taskDone: boolean;
  day: string;
}

const Streak_ball: FC<StreakBallPRops> = ({ taskDone, day }) => {
  return (
    <div
      className={` ${
        taskDone ? "border-primary text-primary" : "text-gray-500"
      } flex items-center justify-center uppercase border-2 w-12 h-12 rounded-full`}
    >
      {day}
    </div>
  );
};

export default Streak_ball;
