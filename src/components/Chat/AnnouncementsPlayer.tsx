import { getAnnouncements } from "@/api/chat.api";
import { Announcement } from "@/types/chat.type";
import React, { useState } from "react";
import { useQuery } from "react-query";
import CustomTabs from "./CustomTabs";
import { Input } from "../ui/input";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
interface AnnouncementsProps {
  setActiveTab: (tab: string) => void;
}

export type CategorizedAnnouncements = {
  Today: Announcement[];
  Yesterday: Announcement[];
  "Last Week": Announcement[];
  "Last Month": Announcement[];
  Older: Announcement[];
};

const TodayAnnouncementCard: React.FC<Announcement> = ({
  id,
  title,
  description,
  category,
  showButton,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4 border border-gray-200 hover:border hover:border-primary hover:shadow-sm hover:shadow-primary cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-gray-300"></div>
      <div className="flex-1 flex justify-between">
        <div className="flex-1">
          <div className="">
            <h3 className="text-lg font-medium text-[#152946]">{title}</h3>

            <p className="text-gray-700 mt-2 text-sm">{description}</p>
          </div>
          {showButton ? (
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">
              Show in Matches
            </button>
          ) : null}
        </div>
        <div className="flex flex-col items-end justify-between">
          <span className="border border-primary px-3 py-1 text-sm rounded-full shadow shadow-primary">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

const AnnouncementsPlayer: React.FC<AnnouncementsProps> = ({
  setActiveTab,
}) => {
  const { isLoading: isGettingAnnouncement, data: announcements } = useQuery({
    queryKey: ["announcement"],
    queryFn: getAnnouncements,
  });
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    Today: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  function categorizeAnnouncements(
    announcements: Announcement[]
  ): CategorizedAnnouncements {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const categories: CategorizedAnnouncements = {
      Today: [],
      Yesterday: [],
      "Last Week": [],
      "Last Month": [],
      Older: [],
    };

    announcements.forEach((item) => {
      const createdAt = new Date(item.createdAt);

      if (createdAt.toDateString() === today.toDateString()) {
        categories.Today.push(item);
      } else if (createdAt.toDateString() === yesterday.toDateString()) {
        categories.Yesterday.push(item);
      } else if (createdAt > lastWeek) {
        categories["Last Week"].push(item);
      } else if (createdAt > lastMonth) {
        categories["Last Month"].push(item);
      } else {
        categories.Older.push(item);
      }
    });

    return categories;
  }

  const categorizedAnnouncements: CategorizedAnnouncements | null =
    announcements ? categorizeAnnouncements(announcements) : null;

  return (
    <div className=" mx-auto space-y-4">
      <div className="md:hidden my-1 px-1">
        <CustomTabs setActiveTab={setActiveTab} tab="announcements" />
      </div>
      <Input
        type="text"
        placeholder="Search..."
        className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
        startIcon={FaSearch}
      />
      {categorizedAnnouncements &&
        Object.entries(categorizedAnnouncements)
          .filter(([title, items]) => items.length > 0) // Hides empty categories
          .map(([title, items]) => (
            <div key={title} className="p-2 rounded-lg">
              <div
                className="flex justify-between items-center cursor-pointer p-2"
                onClick={() => toggleSection(title)}
              >
                <h2 className="text-lg text-[#152946] font-semibold">
                  {title}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                    {items.length > 99 ? "99+" : items.length}
                  </div>
                  {openSections[title] ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {openSections[title] && items.length > 0 && (
                <div className="space-y-2">
                  {items
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    ) // Sort items by `createdAt`
                    .map((item, index) => (
                      <TodayAnnouncementCard
                        key={index}
                        {...item}
                        showButton={title === "Today"}
                      />
                    ))}
                </div>
              )}
              <hr />
            </div>
          ))}
    </div>
  );
};

export default AnnouncementsPlayer;
