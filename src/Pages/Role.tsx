import axios from "axios";
import { useRole } from "../RoleContext.js";
import { useState } from "react";
import MaterialIcon from "../components/Icon/MaterialIcon";

const roles = [
  {
    id: 1,
    name: "Player",
    icon: "sports_tennis",
    value: "player",
  },
  {
    id: 2,
    name: "Coach",
    icon: "sports",
    value: "coach",
  },
  {
    id: 3,
    name: "Family",
    icon: "family_restroom",
    value: "family",
  },
  {
    id: 4,
    name: "Organization",
    icon: "corporate_fare",
    value: "organization",
  },
];

const Role = () => {
  const {role, setRole } = useRole();
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSelected = (value: string) => {
    setSelected(value);
    setRole(value);
  };

  const handleSubmit = async () => {
    if (!selected) {
      setError("Please select a role");
      return;
    }
  
    const data = {
      role: selected,
      // Add other required fields here
      // password: "asdfasdff",
      // avatar: "{{$randomAvatarImage}}",
      // dateOfBirth: "{{$randomDatePast}}",
      // gender: "{{Gender}}",
      // phoneNumber: "{{$randomPhoneNumber}}",
      // phoneNumberCountryCode: "{{$randomCountryCode}}",
      // streetAddress: "{{$randomStreetAddress}}",
      // city: "{{$randomCity}}",
      // stateProvince: "{{$randomCity}}",
      // country: "{{$randomCountry}}",
      // emailNotificationEnabled: false,
      // zipCode: "1000"
    };
  
    try {
      const response = await axios.post('http://116.203.117.190:5000/api/role', data);
  
      if (response.status === 201) {
        setSuccess("Role selected successfully");
        setError(null);
      } else {
        setError("Role selection failed");
        setSuccess(null);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Role selection failed");
      } else {
        setError("Network error");
      }
      setSuccess(null);
    }
  };
  

  return (
    <div className="">
      <div className="flex flex-col xs-phone:gap-1 w-full gap-10 items-center justify-center">
        <h3
          className={`font-normal phone:2xl text-3xl xs-phone:text-xl text-center `}
        >
          What are you?
        </h3>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <div className="flex flex-row tablet:grid tablet:grid-cols-2 tablet:gap-10 phone:grid phone:grid-cols-2  phone:gap-6  xs-phone:grid-cols-2  xs-phone:gap-6 justify-between gap-14">
          {roles.map((role) => (
            <button
              onClick={() => handleSelected(role.value)}
              key={role.id}
              className={`flex flex-col justify-between h-48 w-52 phone:h-36 phone:w-40  xs-phone:h-28 xs-phone:w-32 items-center py-2 rounded-xl ${
                selected === role.value
                  ? "bg-primary text-white"
                  : "shadow-md border-2"
              }  `}
            >
              <div></div>
              <MaterialIcon
                className={`text-8xl phone:text-6xl xs-phone:text-4xl ${
                  selected === role.value ? "text-white" : "text-black-35"
                } `}
                icon={role.icon}
              />
              <h3
                className={`font-normal text-xl xs-phone:text-base ${
                  selected === role.value ? "text-white" : "text-black-35"
                } `}
              >
                {role.name}
              </h3>
            </button>
          ))}
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-2 px-4 rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Role;
