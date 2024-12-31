import logo from "../../assets/logo/new-logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const CreatePassword = ({ setCurr }: any) => {
  return (
    <>
      <img className="w-52 mx-auto" src={logo} alt="" />
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold mt-4">Create Password</div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          The password length is at least 6 characters
        </div>
      </div>

      <div className="flex flex-col gap-2 w-[300px]  mx-auto mt-6 ">
        <div>
          <div className="text-sm">Enter Your Password</div>
          <Input
            placeholder="Enter Your Password"
            className="mt-1 rounded-xl shadow"
            endIcon={FaEye}
          />
        </div>
        <div className="mt-">
          <div className="text-sm">Confirm Password</div>
          <Input
            placeholder="Confirm Password"
            className="mt-1 rounded-xl shadow"
            endIcon={FaEye}
          />
        </div>
        <Button
          onClick={() => setCurr((c : number) => c + 1)}
          className=" px-7 mt-2 py-2 shadow rounded-xl bg-primary text-white  "
        >
          Countinue
        </Button>
      </div>
    </>
  );
};

export default CreatePassword;
