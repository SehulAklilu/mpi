import { Settings, BookOpen } from "lucide-react";
import { GoHome } from "react-icons/go";
import { FiPieChart } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Location } from "react-router-dom";
import { Role } from "@/types/auth.type";

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
            href: "/",
            label: "Home",
            active: location.pathname === "/",
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
            href: "/progress",
            label: "Progress",
            active: location.pathname.includes("/progress"),
            icon: FiPieChart,
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
          {
            href: "/settings",
            label: "Settings",
            active: location.pathname.includes("/settings"),
            icon: Settings,
            submenus: [],
          },
        ],
      },
    ];
  } else if (role === "coach") {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/",
            label: "Home",
            active: location.pathname === "/",
            icon: GoHome,
            submenus: [],
          },
          {
            href: "/matches",
            label: "Matches",
            active: location.pathname === "/matches",
            icon: GoHome,
            submenus: [],
          },
          {
            href: "/calendar",
            label: "Calendar",
            active: location.pathname.includes("/calendar"),
            icon: IoCalendarNumberOutline,
            submenus: [],
          },
        ],
      },
    ];
  } else {
    return [];
  }
}
