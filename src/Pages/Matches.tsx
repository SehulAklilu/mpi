import { getMatches } from "@/api/match.api";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Input } from "@/components/ui/input";
import { formatDateTime, getStatusColors } from "@/lib/utils";
import { Match, Player, Status } from "@/types/match.type";
import { useState } from "react";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { TfiCup } from "react-icons/tfi";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import avater from "../assets/avater.jpg";
import {
  MatchSkeleton,
  PendingMatchSkeleton,
} from "@/components/Matches/PendingMatchSkeleton";

function groupMatchesByStatus(matches: Match[]): Record<Status, Match[]> {
  return matches?.reduce((grouped, match) => {
    const { status } = match;
    if (!grouped[status]) {
      grouped[status] = [];
    }
    grouped[status].push(match);
    return grouped;
  }, {} as Record<Status, Match[]>);
}

const page = () => {
  const { data: matches, isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  const categorizedMatchs = matches
    ? groupMatchesByStatus(matches?.matches)
    : {
        pending: [],
        confirmed: [],
        inProgress: [],
        completed: [],
        cancelled: [],
        postponed: [],
        forfeited: [],
      };

  const [showAll, setShowAll] = useState(false);

  const pendingMatchesToShow = showAll
    ? categorizedMatchs?.["pending"]?.slice().reverse()
    : categorizedMatchs?.["pending"]?.slice().reverse().slice(0, 4);

  const [showAllRecent, setShowAllRecent] = useState(false);

  const recentMatchesToShow = showAll
    ? categorizedMatchs?.["completed"]?.slice().reverse()
    : categorizedMatchs?.["completed"]?.slice().reverse().slice(0, 4);

  if (isLoading) {
    return <MatchSkeleton />;
  }

  return (
    <ContentLayout>
      <div className="pt-5 pb-20 px-2  sm:px-4 bg-white w-full min-h-screen">
        <Link
          to="/matches/new"
          className="bg-gradient-to-b z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
        >
          <FaPlusCircle className="text-white text-2xl" />
        </Link>
        <div className="flex w-full">
          {/* <FaSearch className="my-auto px-2" /> */}
          <Input
            placeholder="search"
            className="w-full border-gray-700 bg-white"
            type="search"
          />
        </div>
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="font-semibold text-xl text-primary pl-2">
              Pending Match
            </div>
            <div
              className="text-primary font-semibold cursor-pointer text-sm underline"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View All"}
            </div>
          </div>
          <div className="grid mt-3 grid-cols-1 lg:grid-cols-2 gap-y-6 md:gap-y-12 justify-center items-center mx-auto">
            {pendingMatchesToShow?.map((match) => (
              <div key={match._id}>
                <PendingMatch match={match} link={`/matches/${match._id}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <div className="mb-2 flex justify-between">
            <div className="font-semibold text-xl text-primary pl-2">
              Recent Matches
            </div>
            <div
              className="text-primary font-semibold cursor-pointer text-sm underline"
              onClick={() => setShowAllRecent((prev) => !prev)}
            >
              {showAllRecent ? "Show Less" : "View All"}
            </div>
          </div>
          <div className="grid mt-3 grid-cols-1 lg:grid-cols-2 gap-y-6 md:gap-y-12 justify-center items-center mx-auto">
            {recentMatchesToShow?.map((match) => (
              <div key={match._id}>
                <PendingMatch match={match} link={`/matches/${match._id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

const PendingMatch = ({ match, link }: { match: Match; link: string }) => {
  return (
    <Link to={link} title="abcd" className="flex flex-col gap-2">
      <div className="flex items-center flex-col justify-center">
        <div className="flex gap-2">
          <PersonPending
            isObject={match.p1IsObject}
            player={match?.p1}
            name={match?.p1Name}
          />
          <div className="my-auto px-3 py-2 h-10 w-10 sm:w-14 sm:h-14 text-xl sm:text-3xl  font-bold text-white bg-gradient-to-b from-[#F8B36D] to-[#F28822]  rounded-xl flex justify-center items-center">
            VS
          </div>
          <PersonPending
            isObject={match.p2IsObject}
            player={match?.p2}
            name={match?.p2Name}
          />
        </div>
        <div className="flex items-center justify-center mt-2">
          <p
            className="capitalize px-4 py-1 font-semibold text-sm rounded-full"
            style={{
              color: getStatusColors(match.status).text,
              backgroundColor: getStatusColors(match.status).bg,
            }}
          >
            {match?.status}
          </p>
        </div>
        <div className="font-semibold text-xs text-center mt-2">
          {formatDateTime(match.date)}
        </div>
      </div>
    </Link>
  );
};

const PersonPending = ({
  isObject,
  name,
  player,
}: {
  isObject: boolean;
  name?: string;
  player?: Player;
}) => {
  //   const user =
  return (
    <div
      className={`w-fit  rounded-xl border py-2 shadow flex justify-center items-center flex-col  bg-white`}
    >
      {isObject ? (
        <div className="w-[8rem] h-[8rem] sm:w-[10rem] sm:h-[8rem] md:w-[12rem] md:h-[10rem] flex flex-col items-center">
          <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mt-2 mx-12 max-md:mx-4">
            <img
              className="w-full h-full rounded-full object-cover"
              src={player?.avatar}
              alt="img"
            />
          </div>
          <div className="text-sm font-semibold  mt-2">
            {player?.firstName} {player?.lastName}
          </div>
          <div className="text-xs mt-1">USDTA: 19</div>
        </div>
      ) : (
        <div className="w-[8rem] h-[8rem] sm:w-[10rem] sm:h-[8rem] md:w-[12rem] md:h-[10rem] flex flex-col items-center justify-center">
          <div className="w-[8rem] h-[8rem] sm:w-[10rem] sm:h-[8rem] md:w-[12rem] md:h-[10rem] flex flex-col items-center">
            <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mt-2 mx-12 max-md:mx-4">
              <img
                className="w-full h-full rounded-full object-cover"
                src={avater}
                alt="img"
              />
            </div>
            <div className="text-sm font-semibold  mt-2">{name}</div>
            <div className="text-xs mt-1">USDTA: 19</div>
          </div>
        </div>
      )}
    </div>
  );
};

// const RecentMatch = () => {
//   return (
//     <Link
//       to={"/matches/recentMatch"}
//       title="abcd"
//       className="flex flex-col gap-2"
//     >
//       <div className="flex gap-2">
//         <PersonRecent won={false} />
//         <div className="my-auto px-3 py-2 w-14 h-14 text-3xl  font-bold text-white bg-gradient-to-b from-[#F8B36D] to-[#F28822]  rounded-xl flex justify-center items-center">
//           VS
//         </div>
//         <PersonRecent won={true} />
//       </div>
//       <div className="font-semibold text-xs text-center">
//         Jan 18, 2025 02:00 PM
//       </div>
//     </Link>
//   );
// };

// const PersonRecent = ({ won }: { won: boolean }) => {
//   //   const user =
//   return (
//     <div className="w-fit relative  rounded-xl border border-primary py-2 shadow flex justify-center items-center flex-col  shadow-primary  bg-white">
//       <div className="rounded-full mt-2 mx-12 max-md:mx-4">
//         <img
//           className="w-24 h-2w-24 rounded-full"
//           src={"https://randomuser.me/api/portraits/med/women/72.jpg"}
//           alt="img"
//         />
//       </div>
//       <div className="text-sm font-semibold  mt-2">Candace Flynn</div>
//       <div className="text-xs mt-1">USDTA: 19</div>
//       <div className=" mt-1 font-semibold">2</div>
//       {won && (
//         <div className="absolute top-2 right-2">
//           <TfiCup size={20} className="text-primary" />
//         </div>
//       )}
//     </div>
//   );
// };

export default page;
