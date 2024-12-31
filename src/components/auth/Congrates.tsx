import AuthWrapper from "./AuthWrapper";
import logo from "../../assets/logo/new-logo.svg";
import congrats from "../../assets/svg/congrats.svg";
import { Button } from "../ui/button";

function Congrats() {
  return (
    <div>
      <img className="w-52 mx-auto" src={logo} alt="" />
      <div className="flex flex-col items-center my-4 mt-6">
        <img className="w-36 mx-auto" src={congrats} alt="" />
        <div className="text-3xl font-semibold mt-4 text-primary">Congrats</div>
        <div className="text-center text-sm mt-2 max-w-lg">
          You have successfully registered on Mindsight!
        </div>
        <div className="text-center text-sm mt-2 max-w-lg">
          We have prepared a minor assessment to help you start right from where
          you belong.
        </div>
        <Button className=" px-10 py-2 mt-6 shadow rounded-3xl bg-primary text-white ">
          Take Assessment
        </Button>
        <Button className=" px-7 mt-1  border-none rounded-3x bg-transparent text-black hover:bg-gray-200 hover:sahdow hover:rounded-3xl ">
          Skip
        </Button>
      </div>
    </div>
  );
}

export default Congrats;
