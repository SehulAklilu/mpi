import { useForm } from "react-hook-form";
import BasicInputLabel from "../Inputs/BasicInputLabel";
import "react-phone-number-input/style.css";
import { useState } from "react";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import { E164Number } from "libphonenumber-js/core";

const AdditionalForms = () => {
  const { register } = useForm();
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();
  const [phoneNumber2, setPhoneNumber2] = useState<E164Number | undefined>();

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h3
        className={`font-normal phone:text-2xl text-3xl text-center xs-phone:text-xl `}
      >
        Additional Information
      </h3>
      <form>
        <div className="grid grid-cols-2 gap-16 tablet:flex tablet:flex-col tablet:gap-4 phone:flex phone:flex-col phone:gap-3 phone:justify-center phone:items-center xs-phone:flex xs-phone:flex-col xs-phone:gap-3 xs-phone:justify-center xs-phone:items-center">
          <BasicInputLabel
            iconName={"123"}
            outline={true}
            inputType={"text"}
            placeholder={"123-456-7890"}
            name={"streetAddress"}
            register={register}
            label={"Your ITN"}
            disabled
          />
          <PhoneNumberInput
            label="Phone Number 1"
            onChange={(value) => setPhoneNumber(value)}
            value={phoneNumber}
          />
          <PhoneNumberInput
            label="Phone Number 2"
            onChange={(value) => setPhoneNumber2(value)}
            value={phoneNumber2}
          />
        </div>
      </form>
    </div>
  );
};

export default AdditionalForms;
