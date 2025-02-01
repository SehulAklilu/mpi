import { FiArrowUpRight } from "react-icons/fi";
import clsx from "clsx";

const CustomButton = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => {
  return (
    <button
      className={clsx(
        "mt-3 flex flex-shrink-0 items-center py-1 gap-4 rounded-full pl-4 pr-1 transition-all",
        "bg-primary text-white hover:bg-white hover:text-primary border border-transparent hover:border-primary",
        className
      )}
    >
      <span>{title}</span>
      <div
        className={
          "w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-primary border border-primary hover:border-white"
        }
      >
        <FiArrowUpRight size={24} className="text-primary hover:text-white" />
      </div>
    </button>
  );
};

export default CustomButton;
