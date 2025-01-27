import ProfileCard from "@/components/Players/ProfileCard";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

function Players() {
  const players = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `Player ${index + 1}`,
    ranking: Math.floor(Math.random() * 100) + 1,
    onClick: () => {
      console.log(`Progress clicked for Player ${index + 1}`);
    },
  }));

  return (
    <ContentLayout>
      <div className="bg-white min-h-[100vh] px-10 rounded-md ">
        <div className="sticky top-0 p-4 rounded-lg">
          <Input
            type="text"
            id="full_name"
            placeholder="Search..."
            className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
            startIcon={FaSearch}
          />
        </div>
        <section>
          <div className="flex items-center justify-between py-1">
            <h1>Your Players</h1>
            <span className="text-primary underline cursor-pointer text-sm">
              View All
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {players.map((player) => (
              <ProfileCard
                key={player.id}
                name={player.name}
                ranking={player.ranking}
                onClick={player.onClick}
              />
            ))}
          </div>
        </section>
        <section className="my-4">
          <div className="flex items-center justify-between py-1">
            <h1>New Players</h1>
            <span className="text-primary underline cursor-pointer text-sm">
              View All
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {players.map((player) => (
              <ProfileCard
                key={player.id}
                name={player.name}
                ranking={player.ranking}
                onClick={player.onClick}
              />
            ))}
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}

export default Players;
