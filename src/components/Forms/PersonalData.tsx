import { useForm } from "react-hook-form";
import BasicInputLabel from "../Inputs/BasicInputLabel";
import Dropdown from "../Inputs/Dropdown";
import { useState } from "react";
import axios from "axios";
// import { SelectSingleEventHandler } from "react-day-picker";
// import DatePicker from "../Inputs/CalendarInput";
import { Country } from "country-state-city";
import { useRole } from "../RoleContext";

const gender = [{ name: "Male" }, { name: "Female" }, { name: "Other" }];

const PersonalData = () => {
  const { register, handleSubmit } = useForm();
  const [selectedGender, setSelectedGender] = useState("");
  
  const [selected, setSelected] = useState("");
  const countryData = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { role, setPersonalData } = useRole();

  // const [date, setDate] = useState<
  //   SelectSingleEventHandler | undefined | Date
  // >();

  const onSubmit = async (data: any) => {
    // const formData = {
    //   role,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   gender: selectedGender,
    //   country: selectedCountry,
    //   password: "asdfasdff",
    //   avatar: "{{$randomAvatarImage}}",
    //   dateOfBirth: "{{$randomDatePast}}",
    //   phoneNumber: "{{$randomPhoneNumber}}",
    //   phoneNumberCountryCode: "{{$randomCountryCode}}",
    //   streetAddress: "{{$randomStreetAddress}}",
    //   city: "{{$randomCity}}",
    //   stateProvince: "{{$randomCity}}",
    //   emailNotificationEnabled: false,
    //   zipCode: "1000",
    // };

    // try {
    //   const accessToken = localStorage.getItem('accessToken');
    //   const response = await axios.post('http://116.203.117.190:5000/api/profile', formData, {
    //     headers: { Authorization: `Bearer ${accessToken}` }
    //   });

    //   if (response.status === 201) {
    //     setSuccess("Profile updated successfully");
    //     setError(null);
    //   } else {
    //     setError("Profile update failed");
    //     setSuccess(null);
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     setError(error.response.data.message || "Profile update failed");
    //   } else {
    //     setError("Network error");
    //   }
    //   setSuccess(null);
    // }
    const personalData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: selectedGender,
      country: selectedCountry,
    };

    setPersonalData(personalData);
  };

  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center">
        <h3
          className={`font-normal text-3xl phone:text-2xl text-center xs-phone:text-xl `}
        >
          Personal Data
        </h3>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <div className="grid grid-cols-2 gap-10 tablet:flex tablet:flex-col tablet:gap-4 phone:flex phone:flex-col phone:gap-3 phone:justify-center phone:items-center  xs-phone:flex xs-phone:flex-col xs-phone:gap-3 xs-phone:justify-center xs-phone:items-center">
          <BasicInputLabel
            label="First Name"
            iconName={"person"}
            outline={true}
            inputType={"text"}
            placeholder={"Enter your full name here"}
            name={"firstName"}
            register={register}
          />
          <BasicInputLabel
            label="Last Name"
            iconName={"person"}
            outline={true}
            inputType={"text"}
            placeholder={"Enter your full name here"}
            name={"lastName"}
            register={register}
          />
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            label={"Gender"}
            options={gender}
            register={register}
            name={"other"}
            onSubmit={() => {}}
            onOtherSubmit={handleSubmit(onSubmit)}
            containerStyle="z-30"
            iconName="person"
            outline
          />
          {/* <DatePicker
            label="Date of Birth"
            date={date}
            setDate={setDate}
            placeholder="Select Date"
            iconName="calendar_month"
            outline
            containerStyles="z-50"
          /> */}
          <Dropdown
            label={"Place of Birth"}
            options={countryData}
            selected={selectCountry}
            setSelected={setSelectCountry}
            name={""}
            containerStyle="z-20"
            register={register}
            onSubmit={() => {}}
            onOtherSubmit={() => {}}
            iconName="location_on"
            outline
          />
        </div>
      </div>
    </>
  );
};

export default PersonalData;
