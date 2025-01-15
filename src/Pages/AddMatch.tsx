import { Input } from "@/components/ui/input";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MatchNav from "@/components/Matches/MatchNav";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const players = [
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
const AddMatch = () => {
  return (
    <div className="flex flex-col pt-5 bg-white px-6 max-md:px-3 pb-12  h-screen overflow-auto w-full">
      <MatchNav />
      <div className="flex gap-2">
        <Link
          to={"/matches"}
          className="text-white shadow w-fit bg-primary shadow-primary p-2 rounded-lg"
        >
          <FaAngleLeft size={20} />
        </Link>
        <div className="my-auto text-lg font-semibold">Add Match</div>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-y-8 gap-5 mt-8 pb-12">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
              <div className="m-auto text-xl font-semibold">01</div>
            </div>
            <div className="font-semibold">Game Type</div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 ms-4">
            <div className="flex gap-2">
              <input type="radio" />
              <div className="flex flex-col">
                <div className="font-[500]">Single</div>
                <div className="text-xs">One Player vs. One Player</div>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="radio" />
              <div className="flex flex-col">
                <div className="font-[500]">Doubles</div>
                <div className="text-xs">Pairs vs. Pairs</div>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="radio" />
              <div className="flex flex-col">
                <div className="font-[500]">Mixed Doubles</div>
                <div className="text-xs">Male-Female Pairs</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
              <div className="m-auto text-xl font-semibold">02</div>
            </div>
            <div className="font-semibold">Game Time</div>
          </div>
          <div className="flex gap-4 mt-2 ms-4 ">
            <div className="flex flex-col gap- w-full">
              <div>Date</div>
              <Input type="date" className="w-full" />
            </div>
            <div className="flex flex-col w-full">
              <div>Time</div>

              <Input type="date" />
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
              <div className="m-auto text-xl font-semibold">03</div>
            </div>
            <div className="font-semibold">First Serve</div>
          </div>
          <div className="flex gap-4 mt-2 ms-4 ">
            <div className="flex flex-col ">
              <div className="text-sm">Pick Player</div>
              <Select>
                <SelectTrigger className="w-[220px] bg-white">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
              <div className="m-auto text-xl font-semibold">04</div>
            </div>
            <div className="font-semibold">First Serve</div>
          </div>
          <div className="flex gap-4 mt-2 ms-4 w-full">
            <div className="flex flex-col ">
              <div className="text-sm">Court Type</div>
              <Select>
                <SelectTrigger className="w-[220px] bg-white">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Courts Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
              <div className="m-auto text-xl font-semibold">05</div>
            </div>
            <div className="font-semibold">Surface Type</div>
          </div>
          <div className="flex gap-4 mt-2 ms-4 w-full">
            <div className="flex flex-col ">
              <div className="text-sm">Field Surface Material</div>
              <Select>
                <SelectTrigger className="w-[220px] bg-white">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Courts Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
              <div className="m-auto text-xl font-semibold">06</div>
            </div>
            <div className="font-semibold">Game Best Out Of</div>
          </div>
          <div className="flex gap-4 mt-2 ms-4 w-full">
            <div className="flex flex-col ">
              <div className="text-sm">Total Sets to Win</div>
              <Input className="w-[200px]" type="number" defaultValue={2} />
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
              <div className="m-auto text-xl font-semibold">07</div>
            </div>
            <div className="font-semibold">Tie Breaker Rule</div>
          </div>
          <div className="flex gap-4 mt-2 ms-4 w-full">
            <div className="flex flex-col ">
              <div className="text-sm">Points to Break Ties</div>
              <Select>
                <SelectTrigger className="w-[220px] bg-white">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Courts Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:mx-auto flex max-md:flex-col gap-10">
        <SelecPlayer />
        <div className="my-auto max-md:mx-auto px-3 py-2 w-14 h-14 text-3xl  font-bold text-white bg-gradient-to-b from-[#F8B36D] to-[#F28822]  rounded-xl flex justify-center items-center">
          VS
        </div>
        <SelecPlayer />
      </div>
      <Button className="mx-auto text-white rounded-full mt-12 px-14 py-2 bg-primary ">Create Match</Button>
    </div>
  );
};

const SelecPlayer = () => {
  interface player {
    name: string;
    picture: string;
  }
  const [selectedPlayers, setSelectedPlayers] = useState<player[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSet, setSelectedSet] = useState<string[]>([]);

  const allPlayers = players.flatMap(({ player1, player2 }) => [
    player1,
    player2,
  ]);

  const handleCheckboxChange = (name: string, picture: string) => {
    setSelectedPlayers((prev) => {
      if (selectedSet.includes(name)) {
        setSelectedSet((p) => p.filter((pl) => pl != name));
        return prev.filter((player) => player.name !== name);
      }
      setSelectedSet((p) => [...p, name]);
      return [...prev, { name, picture }];
    });
  };

  const filteredPlayers = allPlayers.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-2 rounded-lg  max-md:w-full md:max-w-sm border max-h-[400px] overflow-auto">
      {/* Search Input */}
      <Input
        type="search"
        placeholder="Search players..."
        className="w-full p-1 border border-gray-300 bg-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Selected Players */}
      {selectedPlayers.length > 0 && (
        <div className="my-2 p-4 border border-gray-300 rounded">
          <div className="grid grid-cols-2 gap-2">
            {selectedPlayers.map(({ name, picture }) => (
              <div
                key={name}
                className="flex gap-1 px-2 items-center py-1 rounded-lg text-white  bg-gradient-to-b from-[#F8B36D] to-[#F28822]"
              >
                <img
                  src={picture}
                  alt={name}
                  className="w-9 h-9 rounded-full"
                />
                <span className="text-sm">{name.slice(0, 2)}...</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Player List */}
      <div className="space-y-2 ">
        {filteredPlayers.map((player) => (
          <div key={player.name} className="flex items-center space-x-4 ps-2 ">
            <input
              type="checkbox"
              checked={selectedSet.includes(player.name)}
              onChange={() => handleCheckboxChange(player.name, player.picture)}
              className="h-5 w-5"
            />
            <img
              src={player.picture}
              alt={player.name}
              className="w-9 h-9 rounded-full"
            />
            <span className="text-sm">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMatch;
