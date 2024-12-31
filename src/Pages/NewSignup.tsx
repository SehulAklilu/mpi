import AuthWrapper from "@/components/auth/AuthWrapper";
import PhoneNumber from "@/components/auth/phoneNumber";
import Otp from "@/components/auth/Otp";
// import CreatePassword from "@/components/auth/CreatePassword";
import { useState } from "react";
import Profile from "@/components/auth/Profile";
import Role from "@/components/auth/Role";
import Congrats from "@/components/auth/Congrates";
import CreatePassword from "@/components/auth/CreatePassword";
import { InputOTPForm } from "@/components/auth/OtpNew";

const NewSignup = () => {
  const [curr, setCurr] = useState(0);
  return (
    <AuthWrapper>
      {curr == 0 && <InputOTPForm setCurr={setCurr} />}
      {curr == 1 && <InputOTPForm setCurr={setCurr} />}
      {curr == 2 && <CreatePassword setCurr={setCurr} />}
      {curr == 3 && <Profile setCurr={setCurr} />}
      {curr == 4 && <Role setCurr={setCurr} />}
      {curr == 5 && <Congrats />}
    </AuthWrapper>
  );
};

export default NewSignup;
