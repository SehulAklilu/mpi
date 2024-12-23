import { FC, MouseEventHandler } from "react";
import MaterialIcon from "../Icon/MaterialIcon";
import IconwithcircleBg from "../Icon/IconwithcircleBg";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  buttonText: string;
  buttonStyle?: string;
  backgroundStyleOn: boolean;
  onclick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  small?: boolean;
  boldtext?: boolean;
  iconColor: string;
  outlined?: boolean;
  iconText?: string;
  buttonText2?: string;
  bgColor: string;
}

const IconButton2: FC<ButtonProps> = ({
  type,
  buttonText,
  buttonStyle,
  backgroundStyleOn,
  disabled,
  onclick,
  small,
  iconColor,
  outlined,
  iconText,
  buttonText2,
  bgColor,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onclick}
        className={` ${
          backgroundStyleOn
            ? `${buttonStyle} my-auto border py-[0.5rem] phone:px-2 phone:py-[0.6rem] xs-phone:py-[0.4rem] xs-phone:px-3 px-2  ${
                small
                  ? "w-24 font-medium xs-phone:w-16 xs-phone:text-xs"
                  : "w-44 phone:w-36  xs-phone:w-36 text-base xs-phone:text-sm"
              }  flex items-center justify-center ${
                disabled ? "bg-black-35" : "bg-primary"
              }   text-white font-medium text-sm outline-none rounded-md`
            : ` text-sm xs-phone:text-xs my-auto flex items-center `
        } `}
      >
        <IconwithcircleBg
          icon={buttonText}
          bgColor={bgColor}
          iconColor={iconColor}
        />
      </button>
    </>
  );
};

export default IconButton2;
