import logo from "../../assets/logo/new-logo.svg";
import { heroLinks, MobileNavbar, Navbar } from "../Navbar/NavbarNew";
import { FiArrowUpRight } from "react-icons/fi";
import bgt from "../../assets/landingpage/bg-t.png";
import CustomButton from "./CustomButton";

// import bg from '../../assets/svg/bg.svg'
// import bgOne from '../../assets/svg/bg-one.svg'

function Hero() {
  return (
    <div className="w-full h-screen bg-[#EFEFED] relative">
      <div className="absolute w-40 h-40 rounded-full bg-[#FFF4E6] opacity-40 border-none shadow-xl top-40 left-10 sm:w-32 sm:h-32 sm:top-20 sm:left-5"></div>
      <div className="absolute w-56 h-56 rounded-full bg-[#FFF4E6] opacity-40 border-none shadow-xl top-1/4 right-10 sm:w-40 sm:h-40 sm:top-1/4 sm:right-5"></div>
      <div className="absolute w-64 h-64 rounded-full bg-[#FFF4E6] opacity-40 border-none shadow-xl bottom-10 left-1/4 sm:w-48 sm:h-48 sm:bottom-5 sm:left-1/3"></div>
      <div className="absolute w-32 h-32 rounded-full bg-[#FFF4E6] opacity-40 border-none shadow-xl bottom-1/4 right-1/4 sm:hidden"></div>
      <div
        className="absolute w-72 h-72 rounded-full bg-[#F0D1B1] opacity-40 
                shadow-[0_0_80px_30px_rgba(240,209,177,0.8)] 
                sm:w-56 sm:h-56 sm:opacity-50 drop-shadow-[0_0_60px_30px_rgba(240,209,177,0.8)] 
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ></div>

      {/* Nav bar */}

      <div className="flex !sticky top-0 justify-between bg-[#EFEFED] items-center left-0 w-full p-4 z-50">
        <div className="flex gap-24">
          <img className="w-36 z-50" src={logo} />
          <div className="hidden md:block">
            <Navbar links={heroLinks} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex pl-4 pr-1 py-1 rounded-full border bg-white items-center gap-4 hover:bg-gray-100 cursor-pointer ml-4 ">
            <span className="font-bold">LOGIN / SIGNUP</span>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
              <FiArrowUpRight size={24} className="text-white" />
            </div>
          </div>
          <div className="block md:hidden">
            <MobileNavbar links={heroLinks} />
          </div>
        </div>
      </div>

      <section className="relative mx-auto container w-full bg-transparent z-10">
        <div className="  flex flex-col md:flex-row items-center px-6 md:px-12 justify-between gap-x-12">
          {/* Left Content */}
          <div className="w-full  md:w-1/2 text-center  md:text-left">
            <h1 className="text-4xl  md:text-5xl font-bold text-gray-900">
              <span className="py-1">Elevate Your</span>
              <span className="text-orange-500 block py-2">Tennis Game</span>
              <span className="py-1">with MPI!</span>
            </h1>
            <p className="mt-4 px-4 text-gray-600 text-lg">
              Our Tennis Training Center is dedicated to nurturing talent and
              enhancing skills through specialized courses tailored for players
              of all levels. Experience personal growth with top-tier facilities
              and innovative tools.
            </p>
            <div className="mt-6">
              <CustomButton title="Connect with Us Today" />
            </div>
          </div>

          {/* Right Content (Image Section) */}
          <div className="w-full  md:w-1/2 relative hidden md:block">
            <img src={bgt} alt="Tennis Court" className="rounded-3xl w-[98%]" />
            {/* Overlay Box */}
            <div className="absolute bottom-4 right-8 w-3/4 p-4 rounded-lg border border-white">
              <h3 className="text-lg font-semibold text-white">
                Discover Our Courses
              </h3>
              <p className="text-sm text-white">
                Explore our diverse range of training programs tailored for
                different age groups and skill levels.
              </p>

              <CustomButton title="View All Courses" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
