import { useState } from "react";
import SettingsNav from "../components/Settings/SettingNav";
import SettingsProfile from "../components/Settings/SettingsProfile";
import Payment from "../components/Settings/Payment";
import Account from "../components/Settings/Account";

const Settings = () => {
  const [curr, setCurr] = useState(0);
  return (
    <div className="relative">
      <SettingsNav curr={curr} setCurr={setCurr} />
      {curr == 0 ? <SettingsProfile /> : curr == 1 ? <Account /> : <Payment />}
    </div>
  );
};

export default Settings;
