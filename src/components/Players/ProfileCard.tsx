import { Player } from "@/types/match.type";
import { useNavigate } from "react-router-dom";

interface ProfileCardInterface {
  player: Player;
}

function ProfileCard({ player }: ProfileCardInterface) {
  const navigate = useNavigate();
  return (
    <div
      className="flex w-52 h-40 flex-col border border-[#ffb871] items-center gap-y-2 p-4 rounded-lg shadow-md  cursor-pointer hover:shadow-[#F38C28]"
      onClick={() => navigate(`/players/${player._id}`)}
    >
      <img
        className="w-16 h-16 rounded-full object-cover"
        src={player.avatar}
        alt={`${name}'s profile`}
      />
      <p className="text-lg font-medium">
        {player.firstName} {player.lastName}
      </p>
      <p className="text-sm text-gray-400">USTDA: 18</p>
    </div>
  );
}

export default ProfileCard;
