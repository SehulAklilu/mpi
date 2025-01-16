import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { HiOutlineBuildingOffice2, HiOutlineUserGroup } from "react-icons/hi2";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useSignupContext } from "@/context/SignupContext";

function Role({ setCurr }: any) {
  const [selectedRole, setSelectedRole] = useState<
    "player" | "group" | "coach" | "family" | undefined
  >(undefined);

  const signupCon = useSignupContext();

  const onsubmit = () => {
    signupCon.setUserInfo({ role: selectedRole });
    setCurr((c: number) => c + 1);
  };
  useEffect(() => {
    signupCon.userInfo.role && setSelectedRole(signupCon.userInfo.role);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center my-4">
        <div className="text-3xl font-semibold mt-4">
          Let's Define Your Role!
        </div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          By choosing one of the appropriate roles, you are helping us to craft
          the best in-app experience for our user.
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 max-w-sm mx-auto   mt-5">
          <Button
            onClick={() => setSelectedRole("player")}
            className={`flex items-center justify-center gap-1 px-7 py-3 my-1 text-center shadow rounded-3xl ${
              selectedRole === "player"
                ? "bg-primary text-white"
                : "bg-[#F0F0FF] text-black"
            }`}
          >
            <FaRegUser className="text-lg" />
            <span className="ml-2">Player</span>
          </Button>

          <Button
            onClick={() => setSelectedRole("group")}
            className={` flex items-center justify-center gap-1 px-7 py-3 my-1 text-center shadow rounded-3xl ${
              selectedRole === "group"
                ? "bg-primary text-white"
                : "bg-[#F0F0FF] text-black"
            } `}
          >
            <HiOutlineUserGroup className="text-lg" />
            <span className="ml-2">Group</span>
          </Button>
          <Button
            onClick={() => setSelectedRole("coach")}
            className={` flex items-center justify-center gap-1 px-7 py-3 my-1 text-center shadow rounded-3xl ${
              selectedRole === "coach"
                ? "bg-primary text-white"
                : "bg-[#F0F0FF] text-black"
            } `}
          >
            <RiGraduationCapLine className="text-lg" />
            <span className="ml-2">Coach</span>
          </Button>
          <Button
            onClick={() => setSelectedRole("family")}
            className={` flex items-center justify-center gap-1 px-7 py-3 my-1 text-center shadow rounded-3xl ${
              selectedRole === "family"
                ? "bg-primary text-white"
                : "bg-[#F0F0FF] text-black"
            } `}
          >
            <HiOutlineBuildingOffice2 className="text-lg" />
            <span className="ml-2">Family</span>
          </Button>
          <Button
            onClick={onsubmit}
            className="px-7 py-2 mt-4 shadow rounded-3xl bg-primary text-white "
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Role;
