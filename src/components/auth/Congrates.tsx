import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/new-logo.svg";
import congrats from "../../assets/svg/congrats.svg";
import { Button } from "../ui/button";

export interface CongratesProps {
  title: string;
  message: string;
  message2: string;
  button_label: string;
  showSkip?: boolean;
  onclick?: () => void;
}

function Congrats({ ind, setCurr }: { ind: number; setCurr: any }) {
  const navigate = useNavigate();
  const contentValue: CongratesProps[] = [
    {
      title: "Account created successfully",
      message: "You have successfully created your account!",
      message2: "We would love to craft a grate experience for you.",
      button_label: "Setup Profile",
    },
    {
      title: "Congrats",
      message: "You have successfully registered on MindSight!",
      message2:
        "We would prepared a minor assessment to help you start right from where you belong.",
      button_label: "Take Assessment",
      showSkip: true,
      onclick: () => navigate("/assessment"),
    },
    {
      title: "Ace!",
      message: "We have identified your current level as a Ace!",
      message2:
        "It is recommended you start at Course 3: Advanced Professional Tennis Training",
      button_label: "Continue",
      onclick: () => navigate("/"),
      showSkip: true,
    },
  ];
  const selectedValue = contentValue[ind];
  return (
    <div>
      <img className="w-52 mx-auto" src={logo} alt="" />
      <div className="flex flex-col items-center my-4 mt-6">
        <img className="w-36 mx-auto" src={congrats} alt="" />
        <div className="text-3xl font-semibold mt-4 text-primary">
          {selectedValue.title}
        </div>
        <div className="text-center text-sm mt-2 max-w-lg">
          {selectedValue.message}
        </div>
        <div className="text-center text-sm mt-2 max-w-lg">
          {selectedValue.message2}
        </div>
        <Button
          onClick={() =>
            selectedValue?.onclick
              ? selectedValue.onclick()
              : setCurr((c: number) => c + 1)
          }
          className=" px-10 py-2 mt-6 shadow rounded-3xl bg-primary text-white "
        >
          {selectedValue.button_label}
        </Button>
        {selectedValue?.showSkip && (
          <Button
            onClick={() => navigate("/")}
            className=" px-7 mt-1  border-none rounded-3x bg-transparent text-black hover:bg-gray-200 hover:sahdow hover:rounded-3xl "
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}

export default Congrats;
