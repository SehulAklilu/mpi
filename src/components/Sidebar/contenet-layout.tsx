import { SheetMenu } from "../Sidebar/sheet-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isChildRoute = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.length > 1;
  };
  return (
    <div className="relative">
      {isChildRoute() ? (
        <div
          className="absolute z-50 bg-white rounded-full p-[1px] top-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaCircleChevronLeft
            size={34}
            className="text-[rgb(255,159,63)] hover:text-[#F1861B]"
          />
        </div>
      ) : (
        <SheetMenu />
      )}

      <div>{children}</div>
    </div>
  );
}
