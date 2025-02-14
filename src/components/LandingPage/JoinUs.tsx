import bgImage from "../../assets/landingpage/kimberly-farmer-lUaaKCUANVI-unsplash-2000x1200.jpg";
import CustomButton2 from "./CustomButton2";

function JoinUs() {
  return (
    <div
      className="relative h-[30rem] bg-cover bg-center bg-no-repeat overflow-x-hidden my-20"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full h-full bg-black opacity-10 absolute "></div>
      <div className="flex items-center flex-col justify-center space-y-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className=" text-3xl md:text-5xl text-white font-semibold text-center">
          Are You Ready To Join Us?
        </h1>
        <p className="text-base font-semibold text-white">
          Book Your Class Now
        </p>
        <CustomButton2 label="Register Now" url="signup" style="px-8 py-4" />
      </div>
    </div>
  );
}

export default JoinUs;
