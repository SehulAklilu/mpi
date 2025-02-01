import React from "react";
import { heroLinks, MobileNavbar, Navbar } from "../Navbar/NavbarNew";
import { FiArrowUpRight } from "react-icons/fi";
import logo from "../../assets/logo/new-logo.svg";

function LandingPageNavBar() {
  return (
    <div className="flex !sticky top-0 justify-between bg-[#EFEFED] border  items-center left-0 w-full p-4 z-50">
      <div className="flex gap-24">
        <img className="w-36 z-50" src={logo} />
        <div className="hidden xl:block">
          <Navbar links={heroLinks} />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden md:flex pl-4 pr-1 py-1 rounded-full border bg-white items-center gap-4 hover:bg-gray-100 cursor-pointer ml-4 ">
          <span className="font-bold">LOGIN / SIGNUP</span>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
            <FiArrowUpRight size={24} className="text-white" />
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
