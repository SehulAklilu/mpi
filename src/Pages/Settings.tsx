import { useState } from "react";
import SettingsNav from "../components/Settings/SettingNav";
import SettingsProfile from "../components/Settings/SettingsProfile";

const Settings = () => {
  const [curr, setCurr] = useState(0);
  return (
    <div>
      <SettingsNav curr={curr} setCurr={setCurr} />
      {curr == 0 ? <SettingsProfile /> : <></>}
    </div>
  );
};

export default Settings;
