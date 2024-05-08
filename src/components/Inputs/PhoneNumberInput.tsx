import { E164Number } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";
import styles from "./styles.module.css";
import { FC } from "react";

interface PhoneNumberInputProps {
  label: string;
  onChange: (value?: E164Number | undefined) => void;
  value: E164Number | undefined;
}

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  label,
  onChange,
  value,
}) => {
  return (
    <div>
      <p className="font-medium text-sm xs-phone:text-xs">{label}</p>
      <div className="border rounded-md flex flex-row gap-1 xs-phone:py-1 py-2 px-2 w-[22rem] xs-phone:w-[17rem] border-black-50">
        <PhoneInput
          className={`${styles.PhoneInputInput}`}
          onChange={onChange}
          placeholder={`Select ${label}`}
          value={value}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
