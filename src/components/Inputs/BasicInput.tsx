import { FC, useState } from "react";
import MaterialIcon from "../Icon/MaterialIcon";
import { UseFormRegister } from "react-hook-form";

interface BasicInputProps {
  iconName: string;
  outline: boolean;
  inputType: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  isPassword?: boolean;
}

const BasicInput: FC<BasicInputProps> = ({
  inputType,
  iconName,
  outline,
  placeholder,
  name,
  register,
  isPassword,
}) => {
  const [visible, setVisible] = useState<boolean>();

  const passwordLogic = isPassword
    ? visible
      ? "text"
      : "password"
    : inputType;

  return (
    <div className="border rounded-md flex flex-row gap-1 xs-phone:w-[17rem] phone:w-[20rem]  xs-phone:px-2 py-2 px-2 w-[22rem]  border-black-50">
      <MaterialIcon
        className="text-xl phone:text-base text-black-75 "
        outline={outline}
        icon={iconName}
      />
      <input
        className="w-full text-sm xs-phone:text-xs placeholder:text-black-65 outline-none border-none bg-inherit"
        type={passwordLogic}
        placeholder={placeholder}
        {...register(name)}
      />
      {isPassword ? (
        <button
          onClick={() => setVisible((prev) => !prev)}
          className="my-auto text-black-65 flex "
        >
          {visible ? (
            <MaterialIcon
              className="text-[20px] phone:text-base "
              icon="visibility"
            />
          ) : (
            <MaterialIcon
              className="text-[20px] phone:text-base "
              icon="visibility_off"
            />
          )}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default BasicInput;
