import { SheetMenu } from "../Sidebar/sheet-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { Navbar, heroLinks, links } from "../Navbar/NavbarNew";
import userImage from "../../assets/user.jpeg";
import Cookies from "js-cookie";
import { BiBell } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { logout } from "@/api/auth.api";

interface ContentLayoutProps {
  children: React.ReactNode;
  name?: string;
}

export function ContentLayout({ children, name }: ContentLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = Cookies.get("user_id");
  const excludeNavbar = ["/assessment", "/video"];

  const profile = useRef<HTMLDivElement | null>(null);

  const isChildRoute = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.length > 1;
  };

  const shouldExcludeNavbar = excludeNavbar.some((path) =>
    location.pathname.includes(path)
  );

  const logoutMut = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove("authToken");
      Cookies.remove("refreshToken");
      Cookies.remove("user_id");
      Cookies.remove("role");
      navigate("/");
    },
  });

  const [showProfile, setShowProfile] = useState(false);

  const logOut = () => {
    logoutMut.mutate();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profile.current && !profile.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profile]);

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
      {!shouldExcludeNavbar ? (
        <div
          className={`flex pt-2 sm:pt-1 items-center  pl-8 pr-4  w-full ${
            excludeNavbar.includes(location.pathname)
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {!shouldExcludeNavbar && (
            <div className="flex-1 flex items-center justify-center">
              <Navbar links={heroLinks} />
            </div>
          )}
          <div
            className="flex-none relative  flex items-center gap-1"
            onClick={() => setShowProfile(true)}
          >
            {/* <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-primary cursor-pointer">
              <BiBell className="text-white text-lg" />
              <div className="absolute bottom-0 right-0 bg-red-600 w-2 h-2 rounded-full border border-white"></div>
            </div> */}
            <div className="w-10 h-10 border-2 rounded-full border-primary cursor-pointer">
              <img src={userImage} className="w-full h-full rounded-full" />
            </div>
            <FaCaretDown className="text-xl text-primary" />

            {showProfile && (
              <div
                className="absolute  flex flex-col p-4 drop-shadow-xl shadow-md shadow-primary rounded-lg gap-4 bg-white top-12 right-4 z-50"
                ref={profile}
              >
                <p
                  onClick={() => {
                    navigate(`/user/profile/${userId}`);
                    setShowProfile(false);
                  }}
                  className="text-lg hover:text-primary cursor-pointer whitespace-nowrap"
                >
                  View Profile
                </p>
                <p
                  onClick={logOut}
                  className="text-lg hover:text-primary cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
