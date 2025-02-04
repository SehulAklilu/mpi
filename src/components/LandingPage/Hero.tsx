import bgt from "../../assets/landingpage/bg-t.png";
import CustomButton from "./CustomButton";
import LandingPageNavBar from "./LandingPageNavBar";

// import bg from '../../assets/svg/bg.svg'
// import bgOne from '../../assets/svg/bg-one.svg'

function Hero() {
  return (
    <div className="w-full bg-[#EFEFED] relative">
      <div className="mx-auto container">
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
        <LandingPageNavBar />

        <section className="relative w-full bg-transparent z-10 mt-0 md:mt-20 xl:mt-0 flex items-center justify-center ">
          <div className="  flex flex-col md:flex-row   items-center lg:px-12 justify-between gap-x-12">
            {/* Left Content */}
            <div className="flex flex-col justify-between items-center my-auto md:block w-full   md:w-1/2 text-center  md:text-left">
              <h1 className="text-4xl  md:text-5xl font-bold text-gray-900">
                <span className="py-1">Elevate Your</span>
                <span className="text-orange-500 block py-2">Tennis Game</span>
                <span className="py-1">with MPI!</span>
              </h1>
              <p className="mt-4 px-4 hidden sm:block text-gray-600 text-lg">
                Our Tennis Training Center is dedicated to nurturing talent and
                enhancing skills through specialized courses tailored for
                players of all levels. Experience personal growth with top-tier
                facilities and innovative tools.
              </p>
              <p className="mt-4 sm:hidden px-4 text-gray-600 text-lg sm:text-base">
                Elevate your game with expert training, top facilities, and
                tailored courses.
              </p>
              <div className="mt-6">
                <CustomButton title="Connect with Us Today" />
              </div>
            </div>

            {/* Right Content (Image Section) */}
            <div className="w-full md:w-[60%] lg:w-1/2 relative hidden md:block">
              <img
                src={bgt}
                alt="Tennis Court"
                className="rounded-3xl w-full"
              />
              {/* Overlay Box */}
              <div className="absolute bottom-4 right-8 w-3/4 p-4 rounded-lg border border-white">
                <h3 className="text-lg font-semibold text-white">
                  Discover Our Courses
                </h3>
                <p className="text-sm text-white">
                  Explore our diverse range of training programs tailored for
                  different age groups and skill levels.
                </p>

                <CustomButton title="View All Courses" link="/course" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Hero;
