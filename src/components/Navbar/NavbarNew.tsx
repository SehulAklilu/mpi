import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";

import { useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa"; // Using React Icons for mobile and dropdown icons
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
interface LinkItem {
  title: string;
  href: string;
  description?: string;
  subLinks?: LinkItem[];
}

interface NavbarProps {
  links: LinkItem[];
}

export function Navbar({ links }: NavbarProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.title}>
            {link.subLinks ? (
              <>
                <NavigationMenuTrigger className="!bg-transparent !font-normal">
                  {link.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px] sm:w-[400px]">
                    {link.subLinks.map((subLink) => (
                      <ListItem
                        key={subLink.title}
                        title={subLink.title}
                        href={subLink.href}
                      >
                        {subLink.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link to={link.href}>
                <NavigationMenuLink className="mx-2">
                  {link.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 bg-transparent rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p> */}
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

interface LinkItem {
  title: string;
  href: string;
  description?: string;
  subLinks?: LinkItem[];
}

interface MobileNavbarProps {
  links: LinkItem[];
}

export const MobileNavbar = ({ links }: MobileNavbarProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false); // State to manage the menu visibility
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null); // State to manage sub-menu visibility

  const toggleMenu = () => setMenuOpen(!isMenuOpen); // Toggle menu button
  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title); // Toggle sub-menu visibility
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-white bg-primary rounded-md"
      >
        <FaBars size={20} />
      </button>

      {/* Animated Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-12 right-0 rounded-md bg-white shadow-lg z-10"
          >
            <ul className="space-y-2 p-4 w-48">
              {links.map((link) => (
                <li key={link.title}>
                  <div>
                    <button
                      className="flex justify-between items-center w-full text-left p-2 hover:bg-gray-100"
                      onClick={() => toggleSubMenu(link.title)}
                    >
                      {link.title}
                      {link.subLinks && <FaChevronDown />}
                    </button>

                    {/* Animated Sub-links */}
                    <AnimatePresence>
                      {link.subLinks && openSubMenu === link.title && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="pl-4 space-y-2 overflow-hidden"
                        >
                          {link.subLinks.map((subLink) => (
                            <li key={subLink.title}>
                              <Link
                                to={subLink.href}
                                className="block p-2 text-gray-700 hover:bg-gray-200"
                              >
                                {subLink.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              ))}
              <li className="w-full text-left p-2 hover:bg-gray-100 font-semibold cursor-pointer">
                LOGIN / SIGNUP
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const links = [
  {
    title: "Services",
    href: "/services",
    subLinks: [
      {
        title: "Service One",
        href: "/docs/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Service Two",
        href: "/docs/installation",
        description: "How to install dependencies and structure your app.",
      },
    ],
  },
  {
    title: "Learn More",
    href: "/learn-more",
    subLinks: [
      {
        title: "Learn More 1",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Learn More 2",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
];

export const heroLinks = [
  {
    title: "ABOUT US",
    href: "/about-us",
  },
  {
    title: "COURSES",
    href: "/courses",
  },
  {
    title: "TRAINING & FACILITIES",
    href: "/services",
    subLinks: [
      {
        title: "Service One",
        href: "/docs/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Service Two",
        href: "/docs/installation",
        description: "How to install dependencies and structure your app.",
      },
    ],
  },
  {
    title: "TESTIMONIALS & FAQs",
    href: "/learn-more",
    subLinks: [
      {
        title: "Learn More 1",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Learn More 2",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
    ],
  },
  {
    title: "CONTACT",
    href: "/contact",
  },
];
