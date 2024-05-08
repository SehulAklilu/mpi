import { FC } from "react";
import google from "../../assets/googleIcon.png";

interface SignInWithGoogleProps {
  text: string;
}

const SignInWithGoogle: FC<SignInWithGoogleProps> = ({ text }) => {
  return (
    <button className="flex flex-row gap-2 xs-phone:gap-1 items-center justify-center">
      <img className="w-8 h-8 xs-phone:w-5 xs-phone:h-5 " src={google} alt="" />{" "}
      <p className="font-medium xs-phone:text-sm text-md">
        Sign {text} With Google
      </p>
    </button>
  );
};

export default SignInWithGoogle;
