import AuthWrapper from "@/components/auth/AuthWrapper";
import PhoneNumber from "@/components/auth/phoneNumber";
import Otp from "@/components/auth/Otp";
import CreatePassword from "@/components/auth/CreatePassword";
import { useState } from "react";

const NewSignup = () => {
  const [curr, setCurr] = useState(0);
  return (
    <AuthWrapper>
      {curr == 0 && <PhoneNumber setCurr={setCurr} />}
      {curr == 1 && <Otp setCurr={setCurr} />}
      {curr == 2 && <CreatePassword setCurr={setCurr} />}
    </AuthWrapper>
  );
};

export default NewSignup;
