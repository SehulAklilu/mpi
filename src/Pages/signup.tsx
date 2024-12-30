import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mpi_logo.png";
import Or from "../components/Additionals/Or";
import Button from "../components/Button/Button";
import SignInWithGoogle from "../components/Button/SignInWithGoogle";
import BasicInput from "../components/Inputs/BasicInput";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "https://mpiglobal.org/api/register",
        data
      );

      if (response.status === 201) {
        setSuccess("Registration successful!");
        setError("");
        navigate("/login"); // Redirect to login page
      } else {
        setError("Registration failed");
        setSuccess("");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
      } else {
        setError("Network error");
      }
      setSuccess(null);
    }
  };

  return (
    <div className="bg-background h-screen flex items-center justify-center">
      <div className="flex flex-col w-1/2 items-center phone:w-full xs-phone:w-full justify-center gap-10">
        <div className="w-56 xs-phone:w-44 ">
          <img src={logo} alt="mpi logo" />
        </div>
        <div className="flex flex-col gap-5">
          <h3
            className={`font-normal text-3xl phone:text-2xl xs-phone:text-xl text-center`}
          >
            Register
          </h3>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-3 ">
              <BasicInput
                iconName={"mail"}
                outline={true}
                inputType={"email"}
                placeholder={"Enter your email here"}
                name="email"
                register={register}
              />

              <BasicInput
                iconName={"lock"}
                outline={true}
                inputType={"password"}
                placeholder={"Enter your password here"}
                name="password"
                register={register}
                isPassword={true}
              />

              <BasicInput
                iconName={"lock"}
                outline={true}
                inputType={"password"}
                placeholder={"confirm your password "}
                name="confirmPassword"
                register={register}
                isPassword={true}
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <Button
                onclick={() => {}}
                type="submit"
                buttonText="Register"
                backgroundStyleOn={true}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-5 w-80 xs-phone:w-56 justify-center">
          <Or />
          <div className="flex justify-center items-center">
            <SignInWithGoogle text={"up"} />
          </div>
        </div>
        <div className="flex xs-phone:flex-col flex-row gap-1  text-sm">
          <p>Already have an account?</p>{" "}
          <Button
            onclick={() => navigate("/login")}
            type="button"
            buttonText="Sign In here"
            backgroundStyleOn={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
