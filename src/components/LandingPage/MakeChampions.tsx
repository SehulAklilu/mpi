import image1 from "../../assets/landingpage/image27.webp";
import image2 from "../../assets/landingpage/image21.png";
import { IoPlayOutline } from "react-icons/io5";
import CustomButton2 from "./CustomButton2";

function MakeChampions() {
  return (
    <div className="container mx-auto my-20 mb-5 md:mb-40  grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 px-6 lg:px-0 justify-items-center md:justify-items-start p-1">
      {/* Image Section */}
      <div className="relative flex justify-center lg:ml-14 w-full">
        <img
          src={image1}
          alt="tennis"
          className="h-[20rem] sm:h-[24rem] md:h-[28rem] w-auto object-cover"
        />
        <img
          src={image2}
          alt="tennis"
          className="h-[12rem] sm:h-[18rem] md:h-[20rem] lg:h-[24rem] w-[18rem] sm:w-[20rem] md:w-[22rem] lg:w-[24rem] object-cover absolute -bottom-6 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 -left-4 sm:-left-6 md:-left-8"
        />
        <div className="absolute right-10 md:right-16 lg:right-32 bottom-2 md:bottom-4 w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 rounded-full flex items-center justify-center bg-primary shadow-lg shadow-primary">
          <IoPlayOutline className="text-white text-2xl md:text-3xl" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-4 sm:space-y-5">
        <h1 className="text-primary text-lg sm:text-xl font-medium">
          WELCOME TO MINDSIGHT
        </h1>
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl w-full sm:w-[80%] md:w-[70%]">
          WE MAKE CHAMPIONS & WE MAKE A FAMILY
        </h1>
        <p className="w-full sm:w-[80%] md:w-[70%] text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et asperiores
          corporis est eum repellat quisquam, explicabo sit voluptate excepturi
          quidem accusantium voluptatibus, sapiente at cupiditate dolorum! Iusto
          praesentium magni non!
        </p>

        <CustomButton2
          label="About Us"
          url="about-us"
          style="py-2 sm:py-3 font-medium px-6 sm:px-8 w-fit"
        />
      </div>
    </div>
  );
}

export default MakeChampions;
