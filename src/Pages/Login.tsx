import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/mpi_logo.png";
import Or from "../components/Additionals/Or";
import Button from "../components/Button/Button";
import SignInWithGoogle from "../components/Button/SignInWithGoogle";
import BasicInput from "../components/Inputs/BasicInput";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://116.203.117.190:5000/api/login', data);
  
      if (response.status === 200) {
        setError('');
        const token = response.data.token;
        localStorage.setItem('token', token); // Store token in localStorage
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else {
        setError('Login failed');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('Network error');
      }
    }
  };
  

  return (
    <div className="bg-backgroundColor w-full h-screen flex items-center justify-center">
      <div className="flex flex-col w-1/2 phone:w-full xs-phone:w-full  items-center justify-center gap-10 ">
        <div className="w-56 xs-phone:w-48  ">
          <img src={logo} alt="mpi logo" />
        </div>
        <div className="flex flex-col gap-5">
          <h3
            className={`font-normal text-3xl phone:text-2xl xs-phone:text-xl  text-center`}
          >
            Log In
          </h3>
          {error && <div className="text-red-500">{error}</div>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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
              <div className="flex flex-col gap-2">
                <BasicInput
                  iconName={"lock"}
                  outline={true}
                  inputType={"password"}
                  placeholder={"Enter your password here"}
                  name="password"
                  register={register}
                  isPassword={true}
                />
                <div className="w-full flex items-end justify-end">
                  <Button
                    onclick={() => {}}
                    type="button"
                    buttonText="Forgot Password?"
                    backgroundStyleOn={false}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center">
              <Button
                onclick={() => {}}
                type="submit"
                buttonText="Log In"
                backgroundStyleOn={true}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-5 w-80 xs-phone:w-64 justify-center">
          <Or />
          <div className="flex justify-center items-center">
            <SignInWithGoogle text={"in"} />
          </div>
        </div>
        <div className="flex flex-row xs-phone:flex-col xs-phone:justify-center xs-phone:items-center gap-1 xs-phone:gap-0 xs-phone:w-56 xs-phone:text-xs text-sm phone:text-base ">
          <p>Don't have an account?</p>
          <Button
            onclick={() => navigate("/signup")}
            type="button"
            buttonText="Create your account here"
            backgroundStyleOn={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
