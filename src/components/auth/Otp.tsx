import otp from "../../assets/otp.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Otp = ({ setCurr }: any) => {
  return (
    <>
      <img className="w-32 mx-auto" src={otp} alt="" />
      <div className="flex flex-col items-center text-sm">
        <div className="text-2xl font-semibold mt-4">OTP Verification Code</div>
        <div className="text-center  mt-2 max-w-lg text-gray-600">
          Enter the 4 digits code sent to you at
        </div>
        <div className="text-center">+12 345 678 999</div>
      </div>

      <div className="flex flex-col gap-2 w-[300px]  mx-auto mt-6 ">
        <div>
          <div className="text-sm">Phone number</div>
        </div>
        <div className="flex gap-5">
          <Input className="mt-1 w-10 rounded-xl shadow bg-[#43536B]/10" />
          <Input className="mt-1 w-10 rounded-xl shadow bg-[#43536B]/10" />
          <Input className="mt-1 w-10 rounded-xl shadow bg-[#43536B]/10" />
          <Input className="mt-1 w-10 rounded-xl shadow bg-[#43536B]/10" />
        </div>
        <Button
          onClick={() => setCurr((c: number) => c + 1)}
          className=" px-7 mt-4 py-2 shadow rounded-xl bg-primary text-white  "
        >
          Verify
        </Button>
      </div>
      <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
        <div>Didn’t receive the code?</div>
        <div
          role="button"
          onClick={() => setCurr((c: number) => c - 1)}
          className="text-primary"
        >
          Resend code
        </div>
      </div>
    </>
  );
};

export default Otp;
