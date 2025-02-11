import { SheetMenu } from "../Sidebar/sheet-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { Navbar, links } from "../Navbar/NavbarNew";
import userImage from "../../assets/user.jpeg";
import Cookies from "js-cookie";
import { BiBell } from "react-icons/bi";

interface ContentLayoutProps {
  children: React.ReactNode;
  name?: string;
}

export function ContentLayout({ children, name }: ContentLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = Cookies.get("user_id");
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
      {!isChildRoute() ? (
        <div
          className={`flex pt-2 sm:pt-1 items-center  pl-8 pr-4  w-full ${
            excludeNavbar.includes(location.pathname)
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {!excludeNavbar.includes(location.pathname) && (
            <div className="flex-1 flex items-center justify-center">
              <Navbar links={links} />
            </div>
          )}
          <div className="flex-none  flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-primary cursor-pointer">
              <BiBell className="text-white text-lg" />
              <div className="absolute bottom-0 right-0 bg-red-600 w-2 h-2 rounded-full border border-white"></div>
            </div>
            <div
              className="w-10 h-10 border-2 rounded-full border-primary cursor-pointer"
              onClick={() => navigate(`/user/profile/${userId}`)}
            >
              <img src={userImage} className="w-full h-full rounded-full" />
            </div>
          </div>
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
