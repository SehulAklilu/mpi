import { useState } from "react";
import SettingsNav from "../components/Settings/SettingNav";
import SettingsProfile from "../components/Settings/SettingsProfile";
import Payment from "../components/Settings/Payment";
import Account from "../components/Settings/Account";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";

const Settings = () => {
  const [curr, setCurr] = useState(0);
  return (
    <ContentLayout>
      <div className="relative">
        <SettingsNav curr={curr} setCurr={setCurr} />
        {curr == 0 ? (
          <SettingsProfile />
        ) : curr == 1 ? (
          <Account />
        ) : (
          <Payment />
        )}
      </div>
    </ContentLayout>
  );
};

export default Settings;
