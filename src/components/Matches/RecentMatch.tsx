import ProfileCard from "@/components/PendingMatch/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { FaFlag, FaInfoCircle } from "react-icons/fa";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { FaRegCalendarPlus } from "react-icons/fa";
import { MdOutlineWaves } from "react-icons/md";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { FiInfo } from "react-icons/fi";
import profile_img from "../../assets/user.jpeg";
import Report from "./Report";

interface DetailsInterface {
  icon: any;
  label: string;
  value: string;
}

function RecentMatch() {
  const [activeTab, setActiveTab] = useState("details");

  const details: DetailsInterface[] = [
    {
      label: "Match Date & Time",
      icon: FaRegCalendarPlus,
      value: "Feb 05, 2025, 10:00 AM",
    },
    {
      label: "Match Length",
      icon: IoTime,
      value: "2 Hours 23 Minutes",
    },
    {
      label: "Game Best Out of",
      icon: FaTrophy,
      value: "3 Games",
    },
    {
      label: "Tie-Breaker Rule",
      icon: FaBalanceScaleLeft,
      value: "7 points Tie Breaker",
    },
    {
      label: "Court Type",
      icon: FaFlag,
      value: "Outdoor Court",
    },
    {
      label: "Court Surface Type",
      icon: MdOutlineWaves,
      value: "Hard Court",
    },
  ];

  return (
    <ContentLayout name="Recent Match">
      <div className="bg-white pt-10 min-h-[100vh] overflow-auto pb-12">
        <div className="w-full mx-auto mt-4">
          <div className="flex gap-x-6 flex-col gap-y-2 sm:flex-row items-center justify-center">
            <ProfileCard name="Candace Flynn" ranking={19} />
            <div className="px-4 py-6 text-4xl text-white bg-gradient-to-b from-[#F8B570] font-bold rounded-xl to-[#F38C28] ">
              VS
            </div>
            <ProfileCard name="Jene" ranking={19} />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-center">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="details"
              className="w-full"
            >
              <TabsList className="flex bg-[#FFF6ED] rounded-full w-full md:w-[44rem] lg:w-[56rem] shadow-md h-[2.5rem] md:h-[3rem] mx-auto border">
                <TabsTrigger
                  value="details"
                  className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="sets"
                  className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
                >
                  Sets
                </TabsTrigger>
                <TabsTrigger
                  value="momentum"
                  className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
                >
                  Momentum
                </TabsTrigger>
                <TabsTrigger
                  value="report"
                  className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
                >
                  Report
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className="w-full md:w-[44rem] lg:w-[56rem] mx-auto px-4"
                value="details"
              >
                {details.map(({ icon: Icon, value, label }) => (
                  <div className=" w-full md:w-[70%] flex items-center justify-between my-2">
                    <div className="flex items-center gap-x-1 ">
                      <div className="p-1 rounded-md bg-[#FFF6ED]">
                        <Icon size={20} className="text-[#F38C28]" />
                      </div>
                      <p className="">{label}</p>
                    </div>
                    <p className="p-1 px-4 rounded-full bg-[#FFF6ED]">
                      {value}
                    </p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent
                value="sets"
                className="w-full md:w-[44rem] lg:w-[56rem] mx-auto px-4"
              >
                <div className="w-full flex gap-2 mt-14">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className=" text-left">
                          <th className="border  px-4 py-2 w-[400px]">
                            Players
                          </th>
                          <th className="border  px-4 py-2 w-[200px] whitespace-nowrap">
                            Match Score
                          </th>
                          <th className="border  px-4 py-2 w-[200px]">
                            1st set
                          </th>
                          <th className="border  px-4 py-2 w-[200px]">
                            2nd set
                          </th>
                          <th className="border  px-4 py-2 w-[200px]">
                            3rd set
                          </th>
                          <th className="border  px-4 py-2 w-[200px]">
                            4th set
                          </th>
                          <th className="border  px-4 py-2 w-[200px]">
                            5th set
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={`hover:bg-gray-50`}>
                          <td className="border border-gray-300 px-4 py-2 flex gap-2">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={profile_img}
                              alt=""
                            />
                            <div>
                              <p className="text-sm font-semibold ">
                                Candace Flynn
                              </p>
                              <p className="text-gray-700 text-xs">USDTA: 19</p>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            2
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                            6
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            5
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            2
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                            7
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            3
                          </td>
                        </tr>
                        <tr className={`hover:bg-gray-50`}>
                          <td className="border border-gray-300 px-4 py-2 flex gap-2 bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={profile_img}
                              alt=""
                            />
                            <div>
                              <p className="text-sm font-semibold ">
                                Candace Flynn
                              </p>
                              <p className="text-gray-200 text-xs">USDTA: 19</p>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                            3
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            4
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                            7
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                            6
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center ">
                            6
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                            6
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="momentum"
                className="w-full md:w-[44rem] lg:w-[56rem] mx-auto px-4"
              >
                <div className="w-full flex justify-center items-center flex-col gap-2 mt-14">
                  {/* <div className="w-12 h-12 rounded-xl bg-gray-300 flex justify-center items-center">
                    <FiInfo className="text-primary text-3xl" />
                  </div>
                  <div className="mt-3">
                    Set not Available for undone Mactch
                  </div> */}
                </div>
              </TabsContent>
              <TabsContent value="report" className="w-full   px-2">
                <Report />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default RecentMatch;
