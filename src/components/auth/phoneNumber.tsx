import logo from "../../assets/logo/new-logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const PhoneNumber = ({ setCurr }: any) => {
  return (
    <>
      <img className="w-52 mx-auto" src={logo} alt="" />
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold mt-4">
          Sign Up to join Mindsight
        </div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          If continuing, you have agreed to our Terms of Service and confirm you
          have read our Privacy And Cookie Statement
        </div>
      </div>

      <div className="flex flex-col gap-2 w-[300px]  mx-auto mt-6 ">
        <div>
          <div className="text-sm">Phone number</div>
          <Input
            placeholder="+12 345 678 999"
            className="mt-1 rounded-xl shadow"
          />
        </div>
        <Button
          onClick={() => setCurr((c: number) => c + 1)}
          className=" px-7 py-2 shadow rounded-xl bg-primary text-white  "
        >
          Get Started
        </Button>
        <Button className="flex py-2 shadow rounded-xl items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
          <FcGoogle size={22} className="text-red-500" />
          <div className="text-sm">Google</div>
        </Button>
        <Button className="flex py-2 shadow rounded-xl items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
          <FaFacebook size={18} className="text-blue-600" />
          <div className="text-sm">Facebook</div>
        </Button>
      </div>
      <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
        <div>Already Registered?</div>
        <Link
          to={"/login"}
          //   role="button"
          onClick={() => setCurr((c: number) => c - 1)}
          className="text-primary"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default PhoneNumber;
