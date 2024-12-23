import { FC, useState } from "react";

interface TabsProps {
  children: React.ReactNode[];
  tabs: string[];
  onTabChange?: (index: number, tab?: string) => void;
  variant?: "default" | "filled";
}
const activeTabClass = (variant: TabsProps["variant"]) => {
  if (variant === "filled") return "bg-flowius-blue-dark text-white py-1 px-4 ";

  return "inline-block p-3 text-primary rounded-t-lg border-b-2 border-primary active ";
};

const tabClass = (variant: TabsProps["variant"]) => {
  if (variant === "filled")
    return "bg-flowius-blue-light text-flowius-blue-dark py-1 px-4";

  return "inline-block p-3 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 ";
};

const Tabs: FC<TabsProps> = ({
  onTabChange,
  tabs,
  children,
  variant = "default",
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tab: string, index: number) => {
    setActiveTab(index);
    onTabChange?.(index, tab);
  };

  return (
    <div className="flex flex-col w-full gap-4  ">
      <div
        className={`text-sm font-semibold text-center text-black ${
          variant === "default" && "border-b-2"
        } border-gray-200`}
      >
        <ul className="flex flex-wrap  ">
          {tabs.map((tab, index) => (
            <li
              onClick={() => handleTabChange(tab, index)}
              key={`tab-index-${index}`}
              className={`${variant === "default" && "mr-2"} cursor-pointer`}
            >
              <div
                className={
                  activeTab === index
                    ? activeTabClass(variant)
                    : tabClass(variant)
                }
              >
                {tab}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {children[activeTab]}
    </div>
  );
};

export default Tabs;
