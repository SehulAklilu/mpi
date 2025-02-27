import { getPlayers } from "@/api/match.api";
import ProfileCard from "@/components/Players/ProfileCard";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "react-query";

function Players() {
  const {
    data: players,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers("players"),
  });

  if (!players) {
    return;
  }

  return (
    <ContentLayout>
      <div className="bg-white min-h-[100vh] px-10 rounded-md ">
        <div className="p-4 rounded-lg">
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
            {players.players?.map((player) => (
              <ProfileCard key={player._id} player={player} />
            ))}
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}

export default Players;
