import { Player } from "@/types/match.type";
import { useNavigate } from "react-router-dom";

interface ProfileCardInterface {
  player: Player;
}

function ProfileCard({ player }: ProfileCardInterface) {
  const navigate = useNavigate();

  return (
    <div
      className="flex w-full sm:w-52 h-36 sm:h-40 flex-col border border-[#ffb871] items-center gap-y-2 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-[#F38C28]"
      onClick={() => navigate(`/players/${player._id}`)}
    >
      <img
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
        src={player.avatar}
        alt={`${player.firstName} ${player.lastName}'s profile`}
      />
      <p className="text-base sm:text-lg font-medium">
        {player.firstName} {player.lastName}
      </p>
      <p className="text-xs sm:text-sm text-gray-400">USTDA: 18</p>
    </div>
  );
}

export default ProfileCard;
