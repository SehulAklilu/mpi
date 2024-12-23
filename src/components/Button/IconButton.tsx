import { FC, MouseEventHandler } from "react";
import MaterialIcon from "../Icon/MaterialIcon";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  buttonText: string;
  buttonStyle?: string;
  backgroundStyleOn: boolean;
  onclick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  small?: boolean;
  boldtext?: boolean;
  iconColor?: string;
  outlined?: boolean;
  iconText?: string;
  buttonText2?: string;
  backgroundStyle?: boolean;
}

const IconButton: FC<ButtonProps> = ({
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
  backgroundStyle,
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
            : `text-${iconColor} text-sm xs-phone:text-xs ${
                backgroundStyle
                  ? `bg-primary items-center justify-center flex p-2 rounded text-white `
                  : ""
              }  `
        } `}
      >
        <MaterialIcon
          className={`${iconText}`}
          outline={outlined}
          icon={buttonText}
        />
      </button>
    </>
  );
};

export default IconButton;
