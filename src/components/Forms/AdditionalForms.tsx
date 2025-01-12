import { useForm } from "react-hook-form";
import BasicInputLabel from "../Inputs/BasicInputLabel";
import "react-phone-number-input/style.css";
import { useState } from "react";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import { E164Number } from "libphonenumber-js/core";
import { useRole } from "../../RoleContext";
import axios from "axios";

interface AdditionalFormsProps {
  onUpdate: (data: {
    itn: string;
    phoneNumber1: E164Number | undefined;
    phoneNumber2?: E164Number;
  }) => void;
}

const AdditionalForms: React.FC<AdditionalFormsProps> = ({ onUpdate }) => {
  const { register, handleSubmit } = useForm();
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();
  const [phoneNumber2, setPhoneNumber2] = useState<E164Number | undefined>();
  const { role, personalData, contactInfo, setAdditionalInfo, additionalInfo } = useRole();

  const onSubmit = async (data : any) => {
    const additionalInfoData = {
      itn: data.itn,
      phoneNumber1: phoneNumber,
      phoneNumber2: phoneNumber2,
    };

    setAdditionalInfo(additionalInfoData);
    onUpdate(additionalInfoData);

    const formData = {
      ...personalData,
      ...contactInfo,
      ...additionalInfoData,
      role,
      password: "asdfasdff",
      avatar: "{{$randomAvatarImage}}",
      dateOfBirth: "{{$randomDatePast}}",
      phoneNumber: "{{$randomPhoneNumber}}",
      phoneNumberCountryCode: "{{$randomCountryCode}}",
      emailNotificationEnabled: false,
      zipCode: "1000",
    };

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://116.203.117.190:5000/api/profile', formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.status === 201) {
        console.log("Profile updated successfully");
      } else {
        console.error("Profile update failed");
      }
    } catch (error : any) {
      console.error(error.response?.data.message || "Profile update failed");
    }
  };


  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h3
        className={`font-normal phone:text-2xl text-3xl text-center xs-phone:text-xl `}
      >
        Additional Information
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
