import { Input } from "@/components/ui/input";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { TfiCup } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";

interface Player {
  name: string;
  picture: string;
}

interface PlayersArray {
  player1: Player;
  player2: Player;
}

const pendingResults: PlayersArray[] = [
  {
    player1: {
      name: "Alice",
      picture: "https://randomuser.me/api/portraits/med/men/37.jpg",
    },
    player2: {
      name: "Bob",
      picture: "https://randomuser.me/api/portraits/med/men/29.jpg",
    },
  },
  {
    player1: {
      name: "Charlie",
      picture: "https://randomuser.me/api/portraits/med/men/46.jpg",
    },
    player2: {
      name: "Dana",
      picture: "https://randomuser.me/api/portraits/med/men/93.jpg",
    },
  },
  {
    player1: {
      name: "Eve",
      picture: "https://randomuser.me/api/portraits/med/men/79.jpg",
    },
    player2: {
      name: "Frank",
      picture: "https://randomuser.me/api/portraits/thumb/women/3.jpg",
    },
  },
  {
    player1: {
      name: "Grace",
      picture: "https://randomuser.me/api/portraits/women/30.jpg",
    },
    player2: {
      name: "Heidi",
      picture: "https://randomuser.me/api/portraits/thumb/men/84.jpg",
    },
  },
];

const page = () => {
  return (
    <div className="pt-5 pb-20  px-4 bg-white w-full h-screen overflow-auto">
      <Link
        to="/matches/addmatch"
        className="bg-gradient-to-b z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
      >
        <FaPlusCircle className="text-white text-2xl" />
      </Link>
      <div className="flex w-full">
        {/* <FaSearch className="my-auto px-2" /> */}
        <Input placeholder="search" className="w-full border-gray-700 bg-white" type="search" />
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <div className="font-semibold">Pending Match</div>
          <div className="text-primary font-semibold cursor-pointer text-sm underline">
            View All
          </div>
        </div>
        <div className="grid mt-3 grid-cols-2 gap-y-12 max-md:grid-cols-1">
          {pendingResults.map((result) => (
            <PendingMatch result={result} />
          ))}
        </div>
      </div>
      <div className="mt-12">
        <div className="mb-2 flex justify-between">
          <div className="font-semibold">Recent Matches</div>
          <div className="text-primary font-semibold cursor-pointer text-sm underline">
            View All
          </div>
        </div>
        <div className="grid mt-3 grid-cols-2 gap-y-12 max-md:grid-cols-1">
          <RecentMatch />
          <RecentMatch />
          <RecentMatch />
          <RecentMatch />
        </div>
      </div>
    </div>
  );
};

const PendingMatch = ({ result }: { result: PlayersArray }) => {
  return (
    <div title="abcd" className="flex flex-col gap-2">
      <div className="flex gap-2">
        <PersonPending data={result.player1} d={true} />
        <div className="my-auto px-3 py-2 w-14 h-14 text-3xl  font-bold text-white bg-gradient-to-b from-[#F8B36D] to-[#F28822]  rounded-xl flex justify-center items-center">
          VS
        </div>
        <PersonPending data={result.player2} />
      </div>
      <div className="font-semibold text-xs text-center">
        Jan 18, 2025 02:00 PM
      </div>
    </div>
  );
};

const PersonPending = ({ data, d }: { data: Player, d? : boolean }) => {
  //   const user =
  return (
    <div className={`w-fit  rounded-xl border py-2 shadow flex justify-center items-center flex-col  ${d ? "shadow-primary border-primary " : " "} bg-white`}>
      <div className="rounded-full mt-2 mx-12 max-md:mx-4">
        <img
          className="w-24 h-2w-24 rounded-full"
          src={data.picture}
          alt="img"
        />
      </div>
      <div className="text-sm font-semibold  mt-2">{data.name}</div>
      <div className="text-xs mt-1">USDTA: 19</div>
    </div>
  );
};

const RecentMatch = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <PersonRecent won={false} />
        <div className="my-auto px-3 py-2 w-14 h-14 text-3xl  font-bold text-white bg-gradient-to-b from-[#F8B36D] to-[#F28822]  rounded-xl flex justify-center items-center">
          VS
        </div>
        <PersonRecent won={true} />
      </div>
      <div className="font-semibold text-xs text-center">
        Jan 18, 2025 02:00 PM
      </div>
    </div>
  );
};

const PersonRecent = ({ won }: { won: boolean }) => {
  //   const user =
  return (
    <div className="w-fit relative  rounded-xl border border-primary py-2 shadow flex justify-center items-center flex-col  shadow-primary  bg-white">
      <div className="rounded-full mt-2 mx-12 max-md:mx-4">
        <img
          className="w-24 h-2w-24 rounded-full"
          src={"https://randomuser.me/api/portraits/med/women/72.jpg"}
          alt="img"
        />
      </div>
      <div className="text-sm font-semibold  mt-2">Candace Flynn</div>
      <div className="text-xs mt-1">USDTA: 19</div>
      <div className=" mt-1 font-semibold">2</div>
      {won && (
        <div className="absolute top-2 right-2">
          <TfiCup size={20} className="text-primary" />
        </div>
      )}
    </div>
  );
};

export default page;
