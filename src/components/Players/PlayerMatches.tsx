import { getPlayerMatches } from "@/api/match.api";
import { Match } from "@/types/match.type";
import React from "react";
import { useQuery } from "react-query";
import avater from "../../assets/avater.jpg";
import { extractDateTime } from "@/lib/utils";
import { GiTennisRacket } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/RoleContext";

const PlayerMatcheCard = ({ match }: { match: Match }) => {
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <div
      className="items-center px-2 sm:px-4 rounded-2xl shadow-lg bg-white my-2 sm:my-4 h-auto sm:h-[9rem] grid grid-cols-3 hover:border hover:border-primary cursor-pointer"
      onClick={() =>
        role && role === "parent"
          ? navigate(`/child/matchDetail/${match._id}`)
          : navigate(`/players/matchDetail/${match._id}`)
      }
    >
      {/* Player 1 Section */}
      <div className="flex flex-col items-center justify-center py-2 sm:py-0">
        {match.p1IsObject ? (
          <>
            <img
              src={match?.p1?.avatar}
              alt={match?.p1?.firstName}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <p className="text-sm sm:text-base font-semibold text-center">
              {match?.p1?.firstName} {match?.p1?.lastName}
            </p>
            <small className="text-xs">USTA: #19</small>
          </>
        ) : (
          <p className="font-semibold text-sm sm:text-base text-center">
            {match.p1Name}
          </p>
        )}
      </div>

      {/* Match Status and Details Section */}
      <div className="flex items-center justify-center gap-1 flex-col py-2 sm:py-0">
        <div
          className={`py-1 font-semibold px-4 rounded-full ${
            match.status === "completed"
              ? "bg-green-400 text-white"
              : "text-primary bg-[#ffeedd]"
          }`}
        >
          {match.status}
        </div>
        <GiTennisRacket className="text-primary" />
        <p className="font-semibold text-sm sm:text-base">
          {extractDateTime(match.date).time}
        </p>
        <p className="text-xs">{extractDateTime(match.date).date}</p>
      </div>

      {/* Player 2 Section */}
      <div className="flex flex-col items-center justify-center py-2 sm:py-0">
        {match.p2IsObject ? (
          <>
            <img
              src={match?.p2?.avatar}
              alt={match?.p2?.firstName}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <p className="font-semibold text-sm sm:text-base text-center">
              {match?.p2?.firstName} {match?.p2?.lastName}
            </p>
            <small className="text-xs">USTA: #19</small>
          </>
        ) : (
          <>
            <img
              src={avater}
              alt={match.p2Name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <p className="font-semibold text-sm sm:text-base text-center">
              {match.p2Name}
            </p>
            <small className="text-xs">USTA: #19</small>
          </>
        )}
      </div>
    </div>
  );
};

function PlayerMatches({ playerId }: { playerId: string }) {
  const { data } = useQuery({
    queryKey: ["getPlayerMatches"],
    queryFn: () => getPlayerMatches(playerId),
  });

  if (!data) {
    return;
  }
  return (
    <div className="mx-auto sm:mx-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 items-center justify-center place-items-center px-2">
      {data?.matches.map((match) => (
        <PlayerMatcheCard key={match._id} match={match} />
      ))}
    </div>
  );
}

export default PlayerMatches;
