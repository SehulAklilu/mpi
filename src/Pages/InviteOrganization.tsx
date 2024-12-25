import { useState } from "react";
import logo from "../assets/mpi_logo.png";
import { useForm } from "react-hook-form";
import Dropdown from "../components/Inputs/Dropdown";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

const InviteOrganization = () => {
  const { register } = useForm();
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const disabled = !selectedOrganization ? true : false;
  const navigate = useNavigate();
  return (
    <div className="bg-background h-screen py-12">
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="w-56  ">
          <img src={logo} alt="mpi logo" />
        </div>
        <div className="flex flex-col gap-10">
          <h3
            className={`font-normal phone:text-2xl text-3xl xs-phone:text-xl text-[#565D6A] text-center `}
          >
            Your Competitve Edge: Insight
          </h3>
        </div>
        <div className="flex flex-col gap-10 items-center justify-center">
          <h3
            className={`font-normal phone:text-2xl xs-phone:text-xl text-3xl text-center `}
          >
            Invite Your Organization
          </h3>
          <form className="flex flex-col w-full justify-center items-center gap-14">
            <Dropdown
              label={"Your Organization"}
              options={[]}
              selected={selectedOrganization}
              setSelected={setSelectedOrganization}
              name={""}
              register={register}
              onSubmit={() => {}}
              onOtherSubmit={() => {}}
              iconName="search"
              outline
              nolabel
              containerStyle="z-40"
            />
            <div className="flex flex-col gap-3 justify-center items-center">
              <Button
                type={"submit"}
                buttonText={"Invite Organization"}
                backgroundStyleOn={true}
                onclick={() => {}}
                disabled={disabled}
              />
              <Button
                type={"button"}
                buttonText={"Skip"}
                backgroundStyleOn={false}
                onclick={() => navigate("/pre-assesment")}
                small
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteOrganization;
