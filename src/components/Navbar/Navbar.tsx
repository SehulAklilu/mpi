import IconButton from "../Button/IconButton";
import NotificationIcon from "../Notification/NotificationIcon";
import user from "../../assets/user.jpeg";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import CloseClickOutside from "../Additionals/ClickOutside";

interface NavbarProps {
  common: boolean;
  commonHeader: string | undefined;
  commonColor?: boolean;
}

const Navbar: FC<NavbarProps> = ({ common, commonHeader, commonColor }) => {
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="w-full py-5 px-7 flex flex-row justify-between items-center">
      {common ? (
        <p
          className={`text-3xl ${
            commonColor ? "text-primary" : "text-black text-xl"
          }  font-semibold`}
        >
          {commonHeader}
        </p>
      ) : (
        <p className="text-black font-semibold text-xl max-w-1/2">
          Welcome Back, <strong className="text-primary">Gelawdewos</strong>
        </p>
      )}

      <div className="flex flex-row gap-10 relative items-center">
        <div className="relative">
          <NotificationIcon
            notificationNumber={200}
            onclick={() => setOpenNotification(!openNotification)}
          />
          {openNotification && (
            <CloseClickOutside onClose={() => setOpenNotification(false)}>
              <div className="absolute top-10 right-0 z-20 bg-white w-60 h-52 rounded-xl shadow-md">
                Notification Dropdown
              </div>
            </CloseClickOutside>
          )}
        </div>
        <IconButton
          type={"button"}
          buttonText={"group"}
          backgroundStyleOn={false}
          onclick={() => navigate("/connect")}
          iconColor="black-65"
          outlined
          buttonStyle=""
          iconText="text-4xl font-extralight hover:text-primary"
        />
        {/* <div className="flex flex-row gap-14 relative items-center">
          <div className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="cursor-pointer"
            >
              <img className="h-11 w-11 rounded-full" src={user} alt="User" />
            </div>
            {openProfile && (
              <CloseClickOutside onClose={() => setOpenProfile(false)}>
                <div className="absolute top-12 right-0 z-20 bg-white w-60 h-52 rounded-xl shadow-md">
                  Notification Dropdown
                </div>
              </CloseClickOutside>
            )}
          </div>
        </div> */}
        <div className="flex flex-row gap-14 relative items-center">
          <div className="relative">
            <div
              onClick={() => navigate("/profile")} // Navigate to the profile page
              className="cursor-pointer"
            >
              <img className="h-11 w-11 rounded-full" src={user} alt="User" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
