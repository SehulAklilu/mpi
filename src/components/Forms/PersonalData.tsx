import { useForm } from "react-hook-form";
import BasicInputLabel from "../Inputs/BasicInputLabel";
import Dropdown from "../Inputs/Dropdown";
import { useState } from "react";
// import { SelectSingleEventHandler } from "react-day-picker";
// import DatePicker from "../Inputs/CalendarInput";
import { Country } from "country-state-city";

const gender = [{ name: "Male" }, { name: "Female" }, { name: "Other" }];

const PersonalData = () => {
  const { register, handleSubmit } = useForm();
  const [selected, setSelected] = useState("");
  const countryData = Country.getAllCountries();
  const [selectCountry, setSelectCountry] = useState("");

  // const [date, setDate] = useState<
  //   SelectSingleEventHandler | undefined | Date
  // >();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center">
        <h3
          className={`font-normal text-3xl phone:text-2xl text-center xs-phone:text-xl `}
        >
          Personal Data
        </h3>
        <div className="grid grid-cols-2 gap-10 phone:flex phone:flex-col phone:gap-3 phone:justify-center phone:items-center  xs-phone:flex xs-phone:flex-col xs-phone:gap-3 xs-phone:justify-center xs-phone:items-center">
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
