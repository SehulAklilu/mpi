import { getPlayerMatches } from "@/api/match.api";
import { Match } from "@/types/match.type";
import React from "react";
import { useQuery } from "react-query";
import avater from "../../assets/avater.jpg";
import { extractDateTime } from "@/lib/utils";
import { GiTennisRacket } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const PlayerMatcheCard = ({ match }: { match: Match }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[30rem] items-center rounded-2xl shadow-lg bg-white my-4 h-[9rem] grid grid-cols-3 hover:border hover:border-primary cursor-pointer"
      onClick={() => navigate(`/players/matchDetail/${match._id}`)}
    >
      <div>
        {match.p1IsObject ? (
          <div className="flex flex-col justify-center items-center">
            <img
              src={match.p1.avatar}
              alt={match.p1.firstName}
              className="w-16 h-16 rounded-full object-cover "
            />
            <p className="font-semibold">
              {match.p1.firstName} {match.p1.lastName}
            </p>
            <small>USTA: #19</small>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="font-semibold">{match.p1Name}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-1 flex-col">
        <div
          className={`py-1 font-semibold  px-4 rounded-full ${
            match.status === "completed"
              ? "bg-green-400 text-white"
              : "text-primary bg-[#ffeedd]"
          }`}
        >
          {match.status}
        </div>
        <GiTennisRacket className="text-primary" />
        <p className="font-semibold">{extractDateTime(match.date).time}</p>
        <p className="text-xs">{extractDateTime(match.date).date}</p>
      </div>
      <div>
        {match.p2IsObject ? (
          <div className="flex flex-col justify-center items-center">
            <img
              src={match.p2.avatar}
              alt={match.p2.firstName}
              className="w-16 h-16 rounded-full object-cover "
            />
            <p className="font-semibold">
              {match.p2.firstName} {match.p2.lastName}
            </p>
            <small>USTA: #19</small>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={avater}
              alt={match.p2Name}
              className="w-16 h-16 rounded-full object-cover "
            />
            <p className="font-semibold">{match.p2Name}</p>
            <small>USTA: #19</small>
          </div>
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

  console.log("444444444444", data);

  if (!data) {
    return;
  }
  return (
    <div className="mx-auto sm:mx-0 grid grid-cols-2 items-center justify-center place-items-center">
      {data?.matches.map((match) => (
        <PlayerMatcheCard key={match._id} match={match} />
      ))}
    </div>
  );
}

export default PlayerMatches;
