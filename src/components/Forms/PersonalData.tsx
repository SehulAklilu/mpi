import { useForm, SubmitHandler } from "react-hook-form";
import BasicInputLabel from "../Inputs/BasicInputLabel";
import Dropdown from "../Inputs/Dropdown";
import { useState } from "react";
import axios from "axios";
import { Country, ICountry } from "country-state-city";
import { useRole } from "../../RoleContext";

// Define types for form data and component props
interface FormData {
  firstName: string;
  lastName: string;
  other?: string;
}

interface GenderOption {
  name: string;
}

interface PersonalDataProps {
  onUpdate: (data: FormData & { gender: string; country: string }) => void;
}

const genderOptions: GenderOption[] = [{ name: "Male" }, { name: "Female" }, { name: "Other" }];

const PersonalData: React.FC<PersonalDataProps> = ({ onUpdate }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { role, setPersonalData } = useRole();

  const countryData = Country.getAllCountries();

  // Submit handler with types for form data and async function
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const personalData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: selectedGender,
      country: selectedCountry?.name || "",
    };

    setPersonalData(personalData);
    onUpdate(personalData); 

    // Example async operation with axios (commented out, modify if needed)
    /*
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post("http://example.com/api/profile", personalData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 201) {
        setSuccess("Profile updated successfully");
        setError(null);
      } else {
        setError("Profile update failed");
        setSuccess(null);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Network error");
      setSuccess(null);
    }
    */
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h3 className="font-normal text-3xl phone:text-2xl text-center xs-phone:text-xl">
        Personal Data
      </h3>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div className="grid grid-cols-2 gap-10 tablet:flex tablet:flex-col tablet:gap-4 phone:flex phone:flex-col phone:gap-3 phone:justify-center phone:items-center xs-phone:flex xs-phone:flex-col xs-phone:gap-3 xs-phone:justify-center xs-phone:items-center">
        <BasicInputLabel
          label="First Name"
          iconName="person"
          outline={true}
          inputType="text"
          placeholder="Enter your full name here"
          name="firstName"
          register={register}
        />
        <BasicInputLabel
          label="Last Name"
          iconName="person"
          outline={true}
          inputType="text"
          placeholder="Enter your full name here"
          name="lastName"
          register={register}
        />
        <Dropdown
          selected={selectedGender}
          setSelected={setSelectedGender}
          label="Gender"
          options={genderOptions}
          register={register}
          name="other"
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
          label="Place of Birth"
          options={countryData}
          selected={selectedCountry?.name || ""}
          setSelected={(countryName) => {
            const country = countryData.find((c) => c.name === countryName);
            setSelectedCountry(country || null);
          }}
          name=""
          containerStyle="z-20"
          register={register}
          onSubmit={() => {}}
          onOtherSubmit={() => {}}
          iconName="location_on"
          outline
        />
      </div>
    </div>
  );
};

export default PersonalData;
