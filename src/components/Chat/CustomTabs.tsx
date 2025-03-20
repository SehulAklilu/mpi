import { useRole } from "@/RoleContext";
import { useState } from "react";

interface CustomTabsProps {
  setActiveTab: (tab: string) => void;
  tab: string;
}

function CustomTabs({ setActiveTab, tab }: CustomTabsProps) {
  const [activeTab, setActive] = useState(tab);
  const { role } = useRole();

  const handleTabChange = (tab: string) => {
    setActive(tab);
    setActiveTab(tab);
  };

  const tabs = [
    { value: "messages", label: "Messages" },
    { value: "group", label: "Groups" },
    { value: "people", label: "People" },
    { value: "announcements", label: "Announcements" },
    { value: "posts", label: "Community" },
  ];

  return (
    <div className="pt-2 flex-auto">
      <div className="flex items-center justify-center">
        {/* Ensure scrolling works */}
        <div className="w-full overflow-x-scroll scrollbar-hide">
          <div className="flex w-max bg-[#FFF6ED] rounded-full shadow-md h-[2.8rem] md:h-[3rem] mx-auto border px-2 space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`text-center px-4 py-2 text-sm md:text-base lg:text-lg rounded-full transition-colors whitespace-nowrap  m-1
                  ${
                    activeTab === tab.value
                      ? "bg-[#F2851C] text-white"
                      : "text-gray-700"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTabs;
