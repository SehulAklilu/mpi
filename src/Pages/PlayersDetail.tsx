import { getPlayer } from "@/api/match.api";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlineMail } from "react-icons/ai";
import PlayerGoal from "@/components/Players/PlayerGoal";
import Periodizations from "@/components/Players/Periodizations";
import PlayerMatches from "@/components/Players/PlayerMatches";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Parent } from "@/types/children.type";
import { useRole } from "@/RoleContext";
import { getChild } from "@/api/children.api";
import PlayerClasses from "@/components/Players/PlayerClasses";

function PlayersDetail() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Parent | null>(null);
  const { id } = useParams<{ id: string }>();
  const { role } = useRole();

  const { data, isLoading, isError } = useQuery({
    queryKey: role === "parent" ? ["children", id] : ["getPlayer", id],
    queryFn:
      role === "parent"
        ? () => getChild(id as string)
        : () => getPlayer(id as string),
    enabled: !!id,
  });

  if (!data) {
    return;
  }

  return (
    <ContentLayout>
      <div className="">
        <div>
          <div className="flex justify-center mb-4">
            <img
              src={data.player.avatar}
              alt={`${data.player.firstName} ${data.player.lastName}`}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">
              {data.player.firstName} {data.player.lastName}
            </h3>
            <p className="text-lg text-gray-600">
              {data.player.emailAddress.email}
            </p>
            <p className="my-1  text-primary">UTSA #18</p>
            <p className="text-lg text-gray-600">
              {data.player.phoneNumber.countryCode}{" "}
              {data.player.phoneNumber.number}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="border border-red-500 bg-transparent px-4 py-2 text-red-500 rounded-lg">
              Remove Player
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              Message
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="Profile"
            className="w-full px-1"
          >
            <TabsList className="flex bg-[#FFF6ED] rounded-lg sm:rounded-full w-full md:w-[30rem] lg:w-[40rem] shadow-md h-[6-rem] sm:h-[3rem] mx-auto border flex-wrap">
              <TabsTrigger
                value="Profile"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="Matches"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Matches
              </TabsTrigger>
              <TabsTrigger
                value="Goals"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Goals
              </TabsTrigger>
              <TabsTrigger
                value="Classes"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Classes
              </TabsTrigger>
              <TabsTrigger
                value="SOT"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                SOT
              </TabsTrigger>
            </TabsList>
            <TabsContent className="!mt-0 p-2 sm:p-4" value="Profile">
              <h1 className="text-xl font-bold text-gray-700 mb-2">Parents</h1>
              {data?.player.parents.map((parent) => (
                <div
                  key={parent._id}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl my-2 border border-white hover:border-primary cursor-pointer"
                  onClick={() => {
                    setSelectedValue(parent);
                    setOpen(true);
                  }}
                >
                  <img
                    src={parent.avatar}
                    alt={`${parent.firstName} ${parent.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <h1 className="text-lg font-bold">
                      {parent.firstName} {parent.lastName}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                      <AiOutlineMail /> {parent.emailAddress.email}
                    </div>
                  </div>
                </div>
              ))}

              <h1 className="text-xl font-bold text-gray-700 mb-2 mt-4">
                Coaches
              </h1>
              {data?.player.coaches.map((coach) => (
                <div
                  key={coach._id}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl my-2 border border-white hover:border-primary cursor-pointer"
                  onClick={() => {
                    setSelectedValue(coach);
                    setOpen(true);
                  }}
                >
                  <img
                    src={coach.avatar}
                    alt={`${coach.firstName} ${coach.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <h1 className="text-lg font-bold">
                      {coach.firstName} {coach.lastName}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                      <AiOutlineMail /> {coach.emailAddress.email}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent className="!mt-0" value="Matches">
              <PlayerMatches playerId={data.player._id} />
            </TabsContent>
            <TabsContent className="!mt-0 w-full" value="Goals">
              <PlayerGoal
                coachGoals={data.player.coachGoals}
                playerId={data.player._id}
              />
            </TabsContent>
            <TabsContent className="!mt-0" value="Classes">
              <PlayerClasses playerId={data.player._id} />
            </TabsContent>
            <TabsContent className="!mt-0" value="SOT">
              <Periodizations
                playerId={data.player._id}
                coachGoals={data.player.coachGoals}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <>
        <Dialog
          open={open}
          onOpenChange={(open) => {
            setOpen(open);
          }}
        >
          <DialogContent className="">
            <DialogTitle className="text-lg text-primary">
              About {selectedValue?.firstName} {selectedValue?.lastName}
            </DialogTitle>
            <div className="flex items-center justify-center gap-2 flex-col">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={selectedValue?.avatar}
                alt={selectedValue?.firstName}
              />
              <h1 className="text-xl font-bold">
                {selectedValue?.firstName} {selectedValue?.lastName}
              </h1>
              <p></p>
              <h1>{selectedValue?.emailAddress.email}</h1>
              <p>
                ({selectedValue?.phoneNumber.countryCode})
                {selectedValue?.phoneNumber.number}
              </p>
            </div>
            <hr />
            <h1 className="text-xl font-semibold my-2">Area Of Expertise</h1>
            <hr />

            <h1 className="text-xl font-semibold my-2">About</h1>
          </DialogContent>
        </Dialog>
      </>
    </ContentLayout>
  );
}

export default PlayersDetail;
