import React, { useEffect, useState } from "react";
import { heroLinks, MobileNavbar, Navbar } from "../Navbar/NavbarNew";
import { FiArrowUpRight } from "react-icons/fi";
import logo from "../../assets/logo/mpi_logo.png";
import Cookies from "js-cookie";

import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRole } from "@/RoleContext";
import { Role } from "@/types/auth.type";
import { useMutation } from "react-query";
import { logout } from "@/api/auth.api";
import { LoaderCircle } from "lucide-react";
import { getGoogleProfileColor } from "@/lib/utils";

interface LinkItem {
  title: string;
  href?: string;
}

interface DropdownMenuProps {
  links: LinkItem[];
  openSubMenu: string | null;
  setOpenSubMenu: (title: string | null) => void;
  isMenuOpen: boolean;
  onClick: () => void;
  isLogoutLoading?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  links,
  openSubMenu,
  setOpenSubMenu,
  isMenuOpen,
  onClick,
  isLogoutLoading,
}) => {
  const navigate = useNavigate();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: LinkItem
  ) => {
    e.stopPropagation();
    if (link.href) {
      navigate(link.href);
      // window.open(`${link.href}`, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-14 right-6 rounded-md bg-white shadow-lg z-[9999]"
        >
          <ul className="space-y-2 p-4 w-48">
            {links.map((link) => (
              <li key={link.title}>
                <div>
                  <button
                    className={`flex justify-between items-center w-full text-left p-2 rounded-md hover:bg-gray-100 hover:text-black ${
                      openSubMenu === link.title ? "bg-primary text-white" : ""
                    }`}
                    onClick={(e) => handleClick(e, link)}
                  >
                    {link.title}
                  </button>
                </div>
              </li>
            ))}
            <li
              className="w-full flex items-center gap-4 text-left p-2 hover:bg-gray-100 font-semibold cursor-pointer"
              onClick={onClick}
            >
              Logout
              {isLogoutLoading && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FF9800",
                  }}
                />
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function LandingPageNavBar() {
  const navigate = useNavigate();
  const avater = Cookies.get("avatar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  // const { role } = useRole();

  const handleClick = () => {
    navigate("/"); // Replace with your actual route
  };

  const playerLinks: LinkItem[] = [
    { title: "Course", href: "/course" },
    // { title: "Progress", href: "/progress" },
    { title: "Journal", href: "/journal" },
    { title: "Connect", href: "/chat" },
  ];

  const coachLinks: LinkItem[] = [
    { title: "Matches", href: "/matches" },
    { title: "Players", href: "/players" },
    { title: "Journal", href: "/journal" },
    { title: "Connect", href: "/chat" },
  ];

  const parentLinks: LinkItem[] = [
    { title: "Matches", href: "/matches" },
    { title: "Players", href: "/players" },
    { title: "Connect", href: "/chat" },
  ];

  const getLinksForRole = (role: string): LinkItem[] => {
    if (role === "coach") {
      return coachLinks;
    } else if (role === "parent") {
      return parentLinks;
    }
    return playerLinks;
  };

  // Example usage:

  const [userName, setUserName] = useState<string | undefined>(
    Cookies.get("user_name")
  );
  const [authToken, setAuthToken] = useState<string | undefined>(
    Cookies.get("authToken")
  );

  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    Cookies.get("refreshToken")
  );
  const [role, setRole] = useState<string | undefined>(Cookies.get("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(Cookies.get("user_name"));
      setAuthToken(Cookies.get("authToken"));
      setRefreshToken(Cookies.get("refreshToken"));
      setRole(Cookies.get("role"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const links = role ? getLinksForRole(role) : [];

  const logoutMut = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove("authToken");
      Cookies.remove("refreshToken");
      Cookies.remove("user_id");
      Cookies.remove("role");
      setAuthToken(undefined);
      setRefreshToken(undefined);
      localStorage.setItem("authUpdate", Date.now().toString());
      navigate("/");
    },
  });

  const logOut = () => {
    if (refreshToken) {
      logoutMut.mutate({
        refreshToken: refreshToken,
      });
    }
  };

  const firstLetter = userName?.trim().charAt(0).toUpperCase();

  return (
    <div className="flex !sticky top-0 left-0 w-full p-4 z-50 bg-transparent items-center">
      {/* Left Section (Logo) */}
      <div className="flex flex-1 items-center">
        <img
          className="w-36 z-50 cursor-pointer"
          src={logo}
          onClick={handleClick}
        />
      </div>

      {/* Middle Section (Navbar) */}
      <div className="hidden xl:flex flex-1 justify-center">
        <Navbar links={heroLinks} />
      </div>

      {/* Right Section (Login/Signup + Mobile Navbar) */}
      <div className="flex flex-1 justify-end items-center gap-2 md:gap-6">
        {authToken && userName ? (
          <div
            className="relative"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            {/* Profile Button */}
            <div className="flex items-center gap-1 md:gap-2 px-4 py-[0.2rem]  bg-white border rounded-full cursor-pointer">
              <p className="text-xs md:text-base font-medium">{userName}</p>
              <div className="w-10 h-10 border-2 rounded-full cursor-pointer">
                {avater ? (
                  <img src={avater} className="w-full h-full rounded-full" />
                ) : (
                  <div
                    style={{ backgroundColor: getGoogleProfileColor(userName) }}
                    className="w-full h-full rounded-full flex items-center justify-center text-white capitalize"
                  >
                    {firstLetter}
                  </div>
                )}
              </div>
              {isMenuOpen ? (
                <IoIosArrowUp className="sm:text-xs md:text-base lg:text-lg" />
              ) : (
                <IoIosArrowDown className="sm:text-xs md:text-base lg:text-lg" />
              )}
            </div>

            {/* Dropdown Menu Component */}
            <DropdownMenu
              links={links}
              openSubMenu={openSubMenu}
              setOpenSubMenu={setOpenSubMenu}
              isMenuOpen={isMenuOpen}
              onClick={logOut}
              isLogoutLoading={logoutMut.isLoading}
            />
          </div>
        ) : (
          <div
            className="hidden md:flex pl-4 pr-1 py-1 rounded-full border bg-white items-center gap-4 hover:bg-primary cursor-pointer ml-4 group"
            onClick={() =>
              window.open(window.location.origin + "/login", "_blank")
            }
          >
            <span className="font-bold group-hover:text-white">
              LOGIN / SIGNUP
            </span>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary group-hover:bg-white text-white border border-primary transition-all">
              <FiArrowUpRight size={24} className="group-hover:text-primary" />
            </div>
          </div>
        )}
        <div className="block xl:hidden">
          <MobileNavbar links={heroLinks} />
        </div>
      </div>
    </div>
  );
}

export default LandingPageNavBar;
