import AuthWrapper from "@/components/auth/AuthWrapper";
import PhoneNumber from "@/components/auth/phoneNumber";
import { useState } from "react";
import Profile from "@/components/auth/Profile";
import Role from "@/components/auth/Role";
import Congrats from "@/components/auth/Congrates";
import CreatePassword from "@/components/auth/CreatePassword";
import { InputOTPForm } from "@/components/auth/OtpNew";
import Address from "@/components/auth/Address";

const NewSignup = () => {
  const [curr, setCurr] = useState(0);
  return (
    <AuthWrapper setCurr={setCurr} curr={curr}>
      {curr == 0 && <PhoneNumber setCurr={setCurr} />}
      {curr == 1 && <InputOTPForm setCurr={setCurr} />}
      {curr == 2 && <CreatePassword setCurr={setCurr} />}
      {curr == 3 && <Congrats setCurr={setCurr} ind={0} />}
      {curr == 4 && <Role setCurr={setCurr} />}
      {curr == 5 && <Profile setCurr={setCurr} />}
      {curr == 6 && <Address setCurr={setCurr} />}
      {curr == 7 && <Congrats setCurr={setCurr} ind={1} />}
    </AuthWrapper>
  );
};

export default NewSignup;
