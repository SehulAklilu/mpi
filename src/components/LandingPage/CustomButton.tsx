import { FiArrowUpRight } from "react-icons/fi";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const CustomButton = ({
  title,
  className = "",
  link,
  blank,
}: {
  title: string;
  className?: string;
  link?: string;
  blank?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={clsx(
        "mt-3 flex flex-shrink-0 items-center py-1 gap-4 rounded-full pl-4 pr-1 transition-all",
        "bg-primary text-white hover:bg-white hover:text-primary border border-transparent hover:border-primary",
        className
      )}
      onClick={() =>
        link && blank
          ? window.open("/login", "_blank")
          : link
          ? navigate(`${link}`)
          : console.log("link")
      }
    >
      <span className="text-sm sm:text-base">{title}</span>
      <div
        className={
          "w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-primary border flex-shrink-0 border-primary hover:border-white"
        }
      >
        <FiArrowUpRight size={24} className="text-primary hover:text-white " />
      </div>
    </button>
  );
};

export default CustomButton;
