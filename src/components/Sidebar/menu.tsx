import { Ellipsis, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "./collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { Settings, BookOpen } from "lucide-react";
import { GoHome } from "react-icons/go";
import { FiPieChart } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import nightMode from "../../assets/sidebar_svg/night-mode.svg";
import notification from "../../assets/svg/notification.svg";

interface MenuProps {
  isOpen: boolean | undefined;
}

function Menu({ isOpen }: MenuProps) {
  const location = useLocation();
  const menuList = [
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

  return (
    <ScrollArea className="[&gt;div&gt;div[style]]:!block">
      <nav className={cn(isOpen === false ? "h-full w-[55%]" : "h-full mt-4")}>
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[95px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-start ml-[16px] items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={label}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className={`w-full justify-start  h-14 mb-1 hover:bg-[#F1861B] hover:text-white ${
                                active ? "bg-[#F1861B] text-white" : ""
                              }`}
                              asChild
                            >
                              <Link to={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={28} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-1 cursor-pointer">
                <img src={notification} alt="night mode" className="w-12" />
                {isOpen ? <p>10 Notification</p> : null}
              </div>

              <img src={nightMode} alt="night mode" className="w-12" />
            </div>

            {/* <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className={cn(
                      isOpen === false
                        ? "w-2/5 justify-center h-10 mt-5 "
                        : "w-full justify-center h-10 mt-5"
                    )}
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider> */}
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}

export default Menu;
