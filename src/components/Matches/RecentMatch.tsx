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
import { useParams } from "react-router-dom";
import { string } from "zod";
import { useQuery } from "react-query";
import { getMatch } from "@/api/match.api";
import { formatDateTime } from "@/lib/utils";
import { Match } from "@/types/match.type";
import MatchTable from "./Sets";
import SetsTable from "./SetsTable";
import MatchReportTabs from "../Players/MatchReportTabs";

interface DetailsInterface {
  icon: any;
  label: string;
  value: string | number;
}

function RecentMatch() {
  const [activeTab, setActiveTab] = useState("details");

  const { id } = useParams<{ id: string }>();

  const { data: match } = useQuery({
    queryKey: ["getMatch", id],
    queryFn: () => (id ? getMatch(id) : Promise.reject("No ID provided")),
    enabled: !!id,
  });

  const getMatchDetail = (match: Match): DetailsInterface[] => {
    const details: DetailsInterface[] = [
      {
        label: "Match Date & Time",
        icon: FaRegCalendarPlus,
        value: formatDateTime(match.date),
      },
      {
        label: "Match Length",
        icon: IoTime,
        value: match.totalGameTime,
      },
      {
        label: "Game Best Out of",
        icon: FaTrophy,
        value: match.matchType,
      },
      {
        label: "Tie-Breaker Rule",
        icon: FaBalanceScaleLeft,
        value: match.tieBreakRule,
      },
      {
        label: "Court Type",
        icon: FaFlag,
        value: match.indoor ? "Indoor" : "Outdoor",
      },
      {
        label: "Court Surface Type",
        icon: MdOutlineWaves,
        value: match.courtSurface,
      },
    ];
    return details;
  };

  // if (!match) {
  //   return;
  // }

  return (
    <ContentLayout name="Recent Match">
      {!match ? (
        <p>No Match Found</p>
      ) : (
        <div className="bg-white pt-10 min-h-[100vh] pb-12">
          <div className="w-full mx-auto mt-4">
            <div className="flex gap-x-6 flex-col gap-y-2 sm:flex-row items-center justify-center">
              <ProfileCard
                name={match?.p1Name}
                isObject={match.p1IsObject}
                player={match?.p1}
              />
              <div className="px-4 py-6 text-4xl text-white bg-gradient-to-b from-[#F8B570] font-bold rounded-xl to-[#F38C28] ">
                VS
              </div>
              <ProfileCard
                name={match?.p2Name}
                isObject={match.p2IsObject}
                player={match?.p2}
              />
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
                  {getMatchDetail(match).map(({ icon: Icon, value, label }) => (
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
                  className="w-full md:w-[54rem] lg:w-[64rem] mx-auto px-4"
                >
                  {/* <MatchTable match={match} /> */}
                  <SetsTable match={match} />
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
                  {/* <Report match={match} /> */}
                  <MatchReportTabs match={match} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </ContentLayout>
  );
}

export default RecentMatch;
