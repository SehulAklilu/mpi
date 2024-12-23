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
  bgcolor?: string;
}

const IconAndButton: FC<ButtonProps> = ({
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
  buttonText2,
  bgcolor,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onclick}
        className={` flex flex-row gap-2 border bg-${bgcolor} px-4 items-center justify-center rounded-md text-white hover:scale-105 `}
      >
        <MaterialIcon
          className={`${iconText}`}
          outline={outlined}
          icon={buttonText}
        />
        <p>{buttonText2}</p>
      </button>
    </>
  );
};

export default IconAndButton;
