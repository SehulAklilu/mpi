import { SignupContextProvider } from "@/context/SignupContext";
import bg from "../../assets/bg.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const AuthWrapper = ({ children, curr, setCurr }: any) => {
  return (
    <div className="w-full min-h-screen relative flex">
      <div className="absolute left-0 z-10 right-0 bottom-0 top-0 ">
        <div className="bg-white/30 absolute left-0 right-0 bottom-0 top-0 z-10 "></div>
        <img className="w-full h-screen z-10" src={bg} alt="" />
      </div>
      <div className="w-[90%] md:w-[65%]  p-10 z-50 relative min-h-[85vh] m-auto bg-white rounded-xl flex flex-col">
        <SignupContextProvider>
          <>
            {curr !== 0 && (
              <IoArrowBackCircleOutline
                size={24}
                className="cursor-pointer"
                onClick={() => setCurr((c: number) => c - 1)}
              />
            )}
            {children}
          </>
        </SignupContextProvider>
      </div>
    </div>
  );
};

export default AuthWrapper;
