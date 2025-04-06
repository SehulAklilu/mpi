import { Settings, BookOpen, LayoutDashboard } from "lucide-react";
import { GoHome } from "react-icons/go";
import { FiPieChart } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Location } from "react-router-dom";
import { Role } from "@/types/auth.type";
import vs from "../assets/svg/vs.svg";
import { PiUsersThree } from "react-icons/pi";
import { FaChildren } from "react-icons/fa6";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  svgType?: boolean;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(
  location: Location<any>,
  role: Role | null
): Group[] | [] {
  if (role === "player") {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/progress",
            label: "Progress",
            active: location.pathname.includes("/progress"),
            icon: FiPieChart,
            submenus: [],
          },
          {
            href: "/course",
            label: "Home",
            active: location.pathname.includes("/course"),
            icon: GoHome,
            submenus: [],
          },
          {
            href: "/journal",
            label: "Journal",
            active: location.pathname.includes("/journal"),
            icon: BookOpen,
            submenus: [],
          },
          {
            href: "/matches",
            label: "Matches",
            active: location.pathname.startsWith("/matches"),
            icon: vs,
            svgType: true,
            submenus: [],
          },

          {
            href: "/calendar",
            label: "Calendar",
            active: location.pathname.includes("/calendar"),
            icon: IoCalendarNumberOutline,
            submenus: [],
          },
          {
            href: "/chat",
            label: "Connect",
            active: location.pathname.includes("/chat"),
            icon: RiGroupLine,
            submenus: [],
          },
          // {
          //   href: "/settings",
          //   label: "Settings",
          //   active: location.pathname.includes("/settings"),
          //   icon: Settings,
          //   submenus: [],
          // },
        ],
      },
    ];
  } else if (role === "coach") {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: location.pathname === "/dashboard",
            icon: LayoutDashboard,
            submenus: [],
          },
          {
            href: "/matches",
            label: "Matches",
            active: location.pathname.startsWith("/matches"),
            icon: vs,
            svgType: true,
            submenus: [],
          },
          {
            href: "/players",
            label: "Players",
            active: location.pathname.includes("/players"),
            icon: PiUsersThree,
            submenus: [],
          },
          {
            href: "/calendar",
            label: "Calendar",
            active: location.pathname.includes("/calendar"),
            icon: IoCalendarNumberOutline,
            submenus: [],
          },
          {
            href: "/chat",
            label: "Connect",
            active: location.pathname.includes("/chat"),
            icon: RiGroupLine,
            submenus: [],
          },
          // {
          //   href: "/settings",
          //   label: "Settings",
          //   active: location.pathname.includes("/settings"),
          //   icon: Settings,
          //   submenus: [],
          // },
        ],
      },
    ];
  } else if (role === "parent") {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: location.pathname === "/dashboard",
            icon: LayoutDashboard,
            submenus: [],
          },
          {
            href: "/children",
            label: "Players",
            active: location.pathname.startsWith("/children"),
            icon: FaChildren,
            submenus: [],
          },
          {
            href: "/matches",
            label: "Matches",
            active: location.pathname.startsWith("/matches"),
            icon: vs,
            svgType: true,
            submenus: [],
          },
          {
            href: "/calendar",
            label: "Calendar",
            active: location.pathname.includes("/calendar"),
            icon: IoCalendarNumberOutline,
            submenus: [],
          },
          {
            href: "/chat",
            label: "Connect",
            active: location.pathname.includes("/chat"),
            icon: RiGroupLine,
            submenus: [],
          },
          // {
          //   href: "/profile",
          //   label: "Profile",
          //   active: location.pathname.includes("/profile"),
          //   icon: PiUserCircle,
          //   submenus: [],
          // },
        ],
      },
    ];
  } else {
    return [];
  }
}
