import logo from "../../assets/logo/new-logo.svg";
import { Button } from "../ui/button";
import { useState } from "react";
import { HiOutlineBuildingOffice2, HiOutlineUserGroup } from "react-icons/hi2";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useSignupContext } from "@/context/SignupContext";
import { useMutation } from "react-query";
import { register, RegisterPayload } from "@/api/auth.api";
import { getAxiosErrorMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

function Role({ setCurr }: any) {
  const [selectedRole, setSelectedRole] = useState<
    "player" | "group" | "coach" | "organization" | undefined
  >(undefined);

  const signupCon = useSignupContext();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: any) => register(payload),
    onSuccess: () => {
      setCurr((c: number) => c + 1);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const onsubmit = () => {
    console.log(signupCon.userInfo);
    signupCon.setUserInfo({ role: selectedRole });
    if (
      selectedRole &&
      signupCon.userInfo?.email &&
      // signupCon.userInfo.password &&
      signupCon.userInfo?.otp
    ) {
      const payload: any = {
        email: signupCon.userInfo.email,
        otp: signupCon.userInfo.otp,
        password: signupCon.userInfo.password,
        role: selectedRole,
        avatar: signupCon.userInfo?.avatar,
        firstName: signupCon.userInfo?.firstName,
        lastName: signupCon.userInfo?.lastName,
        dateOfBirth: "11/11/2012",
        gender: "male",
        phoneNumber: "911234567",
        phoneNumberCountryCode: "ET",
        streetAddress: "Bole",
        // "streetAddress2": "{{$randomStreetAddress}}"
        city: "Addis Ababa",
        stateProvince: "Addis Ababa",
        country: "Ethiopia",

        zipCode: "1000",
      };
      mutate(payload);
    }
  };

  return (
    <div>
      <img className="w-52 mx-auto" src={logo} alt="" />
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
            <span className="ml-2">Single Player</span>
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
            onClick={() => setSelectedRole("organization")}
            className={` flex items-center justify-center gap-1 px-7 py-3 my-1 text-center shadow rounded-3xl ${
              selectedRole === "organization"
                ? "bg-primary text-white"
                : "bg-[#F0F0FF] text-black"
            } `}
          >
            <HiOutlineBuildingOffice2 className="text-lg" />
            <span className="ml-2">Organiztion</span>
          </Button>
          <Button
            onClick={onsubmit}
            className=" flex items-center justify-center px-7 py-2 mt-4 shadow rounded-3xl bg-primary text-white "
          >
            {isLoading ? (
              <LoaderCircle
                style={{
                  animation: "spin 1s linear infinite",
                  fontSize: "2rem",
                  color: "#FFFFFF",
                }}
              />
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Role;
