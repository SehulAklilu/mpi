import React from "react";
import { heroLinks, MobileNavbar, Navbar } from "../Navbar/NavbarNew";
import { FiArrowUpRight } from "react-icons/fi";
import logo from "../../assets/logo/new-logo.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LandingPageNavBar() {
  const navigate = useNavigate();
  const user_name = Cookies.get("user_name");
  const avater = Cookies.get("avatar");

  const handleClick = () => {
    navigate("/"); // Replace with your actual route
  };

  const initials = user_name
    ? user_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : "";

  const getColorByLetter = (letter: string) => {
    if (!letter) return "bg-gray-500"; // Default color if no letter
    const firstLetter = letter.toUpperCase();
    if (firstLetter >= "A" && firstLetter <= "E") return "bg-red-500";
    if (firstLetter >= "F" && firstLetter <= "J") return "bg-blue-500";
    if (firstLetter >= "K" && firstLetter <= "O") return "bg-green-500";
    if (firstLetter >= "P" && firstLetter <= "T") return "bg-yellow-500";
    if (firstLetter >= "U" && firstLetter <= "Z") return "bg-purple-500";
    return "bg-gray-500"; // Fallback color
  };

  const bgColor = initials ? getColorByLetter(initials[0]) : "bg-gray-500";

  const authToken = Cookies.get("authToken");
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
        {authToken && user_name ? (
          <div className="pl-4 pr-1 py-1 bg-white rounded-full flex items-center justify-between gap-4 border">
            <p className="text-lg font-semibold">{user_name}</p>
            {avater ? (
              <img
                src={avater}
                alt="user image"
                className="w-8 h-8 rounded-full border"
              />
            ) : (
              <div
                className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}
              >
                {initials}
              </div>
            )}
          </div>
        ) : (
          <div
            className="hidden md:flex pl-4 pr-1 py-1 rounded-full border bg-white items-center gap-4 hover:bg-primary cursor-pointer ml-4 group"
            onClick={() => window.open("/login", "_blank")}
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
