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

function PlayersDetail() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Parent | null>(null);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getPlayer"],
    queryFn: () => getPlayer(id as string),
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
            className="w-full"
          >
            <TabsList className="flex bg-[#FFF6ED] rounded-full w-full md:w-[30rem] lg:w-[40rem] shadow-md h-[2.5rem] md:h-[3rem] mx-auto border">
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
            <TabsContent className="!mt-0 p-4" value="Profile">
              <h1 className="text-xl font-bold text-gray-700 mb-2">Parents</h1>
              {data?.player.parents.map((parent) => (
                <div
                  className="flex items-center gap-4 bg-white p-2 rounded-xl my-2 border border-white hover:border-primary cursor-pointer"
                  onClick={() => {
                    setSelectedValue(parent);
                    setOpen(true);
                  }}
                >
                  <img
                    src={parent.avatar}
                    alt={`${parent.firstName} ${parent.lastName}`}
                    className="w-16 h-16 rounded-full object-cover flex-none"
                  />
                  <div>
                    <h1 className="font-lg font-bold">
                      {parent.firstName} {parent.lastName}
                    </h1>
                    <div className="flex items-center gap-2">
                      <AiOutlineMail /> {parent.emailAddress.email}
                    </div>
                  </div>
                </div>
              ))}

              <h1 className="text-xl font-bold text-gray-700 mb-2">Coaches</h1>
              {data?.player.coaches.map((coach) => (
                <div
                  className="flex items-center gap-4 bg-white p-2 rounded-xl my-2 border border-white hover:border-primary cursor-pointer"
                  onClick={() => {
                    setSelectedValue(coach);
                    setOpen(true);
                  }}
                >
                  <img
                    src={coach.avatar}
                    alt={`${coach.firstName} ${coach.lastName}`}
                    className="w-16 h-16 rounded-full object-cover flex-none"
                  />
                  <div>
                    <h1 className="font-lg font-bold">
                      {coach.firstName} {coach.lastName}
                    </h1>
                    <div className="flex items-center gap-2">
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
              <PlayerGoal coachGoals={data.player.coachGoals} />
            </TabsContent>
            <TabsContent className="!mt-0" value="Classes"></TabsContent>
            <TabsContent className="!mt-0" value="SOT">
              <Periodizations playerId={data.player._id} />
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
