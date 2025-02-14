import React from "react";
import CustomButton2 from "./CustomButton2";

const AdvantageNewsletter = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12 my-20 p-2">
      {/* Pick Us Section */}
      <div className="flex-1 text-center space-y-6 md:text-left">
        <h2 className="text-2xl md:text-5xl text-gray-800 md:w-[90%]">
          Pick Us As Your Major Advantages Today!
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed md:w-[90%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id dui
          at ligula commodo euismod. Quisque sapien libero, aliquet sit amet
          orci sed, sollicitudin blandit ipsum. Curabitur magna lectus, luctus
          sit amet urna quis, suscipit molestie massa. Aenean pharetr.
        </p>
        <CustomButton2 label="Register Now" url="signup" />
      </div>

      {/* Subscribe Section */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-5xl text-gray-800 md:w-[90%]">
          Subscribe To Our Weekly Newsletter
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed md:w-[90%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id dui
          at ligula commodo euismod. Quisque sapien libero, aliquet sit amet
          orci sed, sollicitudin blandit ipsum.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          *Your personal details are strictly for our use, and you can
          unsubscribe at any time
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start md:w-[90%] rounded-full bg-transparent sm:bg-[#E9E9E9] ">
          <input
            type="email"
            placeholder="Email"
            className="w-full sm:w-auto flex-grow px-4 py-3 rounded-full bg-transparent text-black outline-none m-2 border sm:border-none"
          />
          <button className="w-full sm:w-auto px-6 py-3 m-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvantageNewsletter;
