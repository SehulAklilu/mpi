import MaterialIcon from "../components/Icon/MaterialIcon";
import logo from "../assets/mpi_logo.png";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const routes = [
  {
    id: 1,
    name: "Learn",
    path: "/",
    icon: "import_contacts",
  },
  {
    id: 2,
    name: "Journal",
    path: "/journal",
    icon: "notes",
  },
  {
    id: 3,
    name: "Progress",
    path: "/progress",
    icon: "equalizer",
  },
  {
    id: 4,
    name: "Calendar",
    path: "/calendar",
    icon: "calendar_month",
  },
  {
    id: 5,
    name: "Settings",
    path: "/settings",
    icon: "settings",
  },
];

const Home = () => {
  const [selected, setSelected] = useState<number>(1);
  const [selectedName, setSelectedName] = useState<string>();

  const headerDecider = selected === 1 ? false : true;

  return (
    <div className="flex flex-row bg-background font-raleway">
      <div className="h-screen fixed bg-white rounded-tr-lg rounded-br-lg px-4 py-6 shadow-md w-[22%] flex flex-col gap-10">
        <div className="flex justify-center items-center">
          <img className="w-52 " src={logo} alt="Mpi logo" />
        </div>
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {routes.map((i) => (
              <Link
                key={i.id}
                onClick={() => {
                  setSelected(i.id);
                  setSelectedName(i.name);
                }}
                to={i.path}
                className={`hover:bg-gray-100 ${
                  selected === i.id
                    ? "bg-primary hover:bg-primary text-white"
                    : "hover:bg-gray-100 text-Grey"
                } cursor-pointer rounded-2xl py-3 px-5 flex flex-row gap-3`}
              >
                <MaterialIcon className="t text-3xl" icon={i.icon} outline />
                <p className="font-semibold my-auto  ">{i.name}</p>
              </Link>
            ))}
          </div>
          <div></div>
        </div>
      </div>
      <div className=" pl-[22%] pt-3 w-full">
        <Navbar common={headerDecider} commonHeader={selectedName} />
        <div className=" pl-[2%] ">
          <p>
            <Outlet />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
