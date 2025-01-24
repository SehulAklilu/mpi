import { SheetMenu } from "../Sidebar/sheet-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { NavbarNew } from "../Navbar/NavbarNew";

interface ContentLayoutProps {
  children: React.ReactNode;
  name?: string;
}

export function ContentLayout({ children, name }: ContentLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const excludeNavbar = [
    "/chat",
    "/calendar",
    "/journal",
    "/progress",
    "/newJournal",
  ];

  const isChildRoute = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.length > 1;
  };

  console.log(
    "33333333333333333",
    isChildRoute(),
    excludeNavbar.includes(location.pathname),
    location.pathname
  );
  return (
    <div className="relative">
      {isChildRoute() ? (
        <div
          className="absolute z-20 bg-white rounded-full p-[1px] top-2 cursor-pointer flex gap-2"
          onClick={() => navigate(-1)}
        >
          <FaCircleChevronLeft
            size={34}
            className="text-[rgb(255,159,63)] hover:text-[#F1861B]"
          />
          {name && <div className="my-auto">{name}</div>}
        </div>
      ) : (
        <div className="absolute z-40 top-3 left-1">
          <SheetMenu />
        </div>
      )}
      {!isChildRoute() && !excludeNavbar.includes(location.pathname) ? (
        <div className="flex pt-2 sm:pt-0 items-center justify-center pl-8 w-full">
          <NavbarNew />
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
