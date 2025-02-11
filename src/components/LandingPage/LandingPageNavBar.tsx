import React from "react";
import { heroLinks, MobileNavbar, Navbar } from "../Navbar/NavbarNew";
import { FiArrowUpRight } from "react-icons/fi";
import logo from "../../assets/logo/new-logo.svg";
import { useNavigate } from "react-router-dom";

function LandingPageNavBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home"); // Replace with your actual route
  };
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
        <div className="block xl:hidden">
          <MobileNavbar links={heroLinks} />
        </div>
      </div>
    </div>
  );
}

export default LandingPageNavBar;
