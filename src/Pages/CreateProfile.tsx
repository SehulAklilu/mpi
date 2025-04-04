import axios from "axios";
import logo from "../assets/mpi_logo.png";
import { Stepper, Step } from "@material-tailwind/react";
import Role from "./Role";
import { useState } from "react";
import Button from "../components/Button/Button";
import { toast } from "react-toastify";
import PersonalData from "../components/Forms/PersonalData";
import ContactInfo from "../components/Forms/ContactInfo";
import AdditionalForms from "../components/Forms/AdditionalForms";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [roleData, setRoleData] = useState<string | null>(null);
  const [personalData, setPersonalData] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState({});
  const navigate = useNavigate();

  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    toast.info("Make sure you have filled all the necessary inputs", {
      autoClose: 1000,
    });
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleFinish = async () => {
    const profileData = { roleData, personalData, contactInfo, additionalInfo };

    try {
      const response = await axios.post(
        "http://your-backend-url.com/api/profile",
        profileData
      );
      if (response.status === 200) {
        toast.success("Profile created successfully!");
        navigate("/invite-organization");
      } else {
        toast.error("Failed to create profile. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the profile.");
    }
  };

  return (
    <div className="bg-background xs-phone:h-full  w-full h-screen py-12">
      <div className="flex flex-col gap-5 items-center justify-center xs-phone:w-full">
        <div className="w-56 2xl:w-64 xs-phone:w-44">
          <img src={logo} alt="mpi logo" />
        </div>
        <div className="flex flex-col gap-10 xs-phone:gap-8">
          <h3
            className={`font-normal text-3xl phone:text-2xl xs-phone:text-xl text-[#565D6A] text-center `}
          >
            Your Competitve Edge: Insight
          </h3>
          <div className="">
            {activeStep === 0 ? (
              <Role onUpdate={(data) => setRoleData(data)} />
            ) : activeStep === 1 ? (
              <PersonalData onUpdate={(data) => setPersonalData(data)} />
            ) : activeStep === 2 ? (
              <ContactInfo onUpdate={(data) => setContactInfo(data)} />
            ) : activeStep === 3 ? (
              <AdditionalForms onUpdate={(data) => setAdditionalInfo(data)} />
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-10 items-center justify-center w-full ">
            <Stepper
              className="w-40 "
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              placeholder={""}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              activeLineClassName="w-0 h-0"
              lineClassName="w-0"
            >
              <Step
                className="h-3 w-3 xs-phone:h-2 xs-phone:w-2 "
                onClick={() => setActiveStep(0)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                activeClassName="bg-primary"
                completedClassName="bg-primary"
              ></Step>
              <Step
                className="h-3 w-3 xs-phone:h-2 xs-phone:w-2"
                onClick={() => setActiveStep(1)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                activeClassName="bg-primary"
                completedClassName="bg-primary"
              />
              <Step
                className="h-3 w-3  xs-phone:h-2 xs-phone:w-2"
                onClick={() => setActiveStep(2)}
                placeholder={""}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                activeClassName="bg-primary"
                completedClassName="bg-primary"
              />
              <Step
                className="h-3 w-3 xs-phone:h-2 xs-phone:w-2 "
                onClick={() => setActiveStep(3)}
                placeholder={""}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                activeClassName="bg-primary"
                completedClassName="bg-primary"
              />
            </Stepper>
            <div className="w-full flex flex-row justify-between">
              <Button
                type={"button"}
                buttonText={"Prev"}
                backgroundStyleOn={true}
                onclick={handlePrev}
                disabled={isFirstStep}
                small
              />
              {activeStep < 3 ? (
                <Button
                  type={"button"}
                  buttonText={"Next"}
                  backgroundStyleOn={true}
                  onclick={handleNext}
                  disabled={isLastStep}
                  small
                />
              ) : (
                <Button
                  type={"button"}
                  buttonText={"Finish"}
                  backgroundStyleOn={true}
                  onclick={handleFinish}
                  disabled={false} // Adjust disabled state as needed
                  small
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
