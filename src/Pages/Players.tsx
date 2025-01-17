import ProfileCard from "@/components/PendingMatch/ProfileCard";
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
      <div className="bg-white min-h-[100vh] px-10 py-4 ">
        <h1 className="text-xl mb-2">Your Players</h1>
        <div className="sticky top-0 p-4 rounded-lg">
          <Input
            type="text"
            id="full_name"
            placeholder="Search..."
            className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
            startIcon={FaSearch}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map((player) => (
            <ProfileCard
              key={player.id}
              name={player.name}
              ranking={player.ranking}
              onClick={player.onClick}
            />
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}

export default Players;
