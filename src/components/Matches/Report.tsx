import { useState } from "react";
import profile_img from "../../assets/user.jpeg";
import { cn } from "@/lib/utils";
import { Match } from "@/types/match.type";

const Report = ({ match }: { match: Match }) => {
  const [cur, setCur] = useState(0);
  const [choice, setChoice] = useState(0);
  return (
    <div className="flex flex-col  ">
      <div className="flex w-full justify-center gap-12 mt-6">
        <div className="flex gap-2 items-center justify-center">
          <div className={`h-6 w-6  rounded-full border  border-primary`}></div>
          <div>
            {match?.p1IsObject
              ? match.p1?.firstName + " " + match.p1?.lastName
              : match?.p1Name}{" "}
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div>
            {match?.p2IsObject
              ? match.p2?.firstName + " " + match.p2?.lastName
              : match?.p2Name}{" "}
          </div>

          <div className={`h-6 w-6  rounded-full  bg-primary`}></div>
        </div>
      </div>
      <div className=" w-full  flex flex-col">
        <div className="flex gap-5 mx-auto my-8">
          <div
            onClick={() => setChoice(0)}
            className={`py-2 px-3 cursor-pointer ${
              choice == 0 ? "border-b-2 border-b-primary" : ""
            } border-x border-black`}
          >
            Score Report
          </div>
          <div
            onClick={() => setChoice(1)}
            className={`py-2 px-3 cursor-pointer ${
              choice == 1 ? "border-b-2 border-b-primary" : ""
            } border-x border-black`}
          >
            Serve Report
          </div>
          <div
            onClick={() => setChoice(2)}
            className={`py-2 px-3 cursor-pointer ${
              choice == 2 ? "border-b-2 border-b-primary" : ""
            } border-x border-black`}
          >
            Net/Volley Report
          </div>
          <div
            onClick={() => setChoice(3)}
            className={`py-2 px-3 cursor-pointer ${
              choice == 3 ? "border-b-2 border-b-primary" : ""
            } border-x border-black`}
          >
            Return/Pass Report
          </div>
          <div
            onClick={() => setChoice(4)}
            className={`py-2 px-3 cursor-pointer ${
              choice == 4 ? "border-b-2 border-b-primary" : ""
            } border-x border-black`}
          >
            Net/Volley Report
          </div>
        </div>

        {choice != -1 && <MyTable match={match} />}
        {choice == 0 && (
          <>
            <div className="font-semibold mt-6">Score Report</div>
            <div className="flex gap-10 w-full">
              <div className="basis-2/5 flex flex-col justify-center items-center">
                <div className="mt-5 flex  justify-center items-center">
                  <div className="flex flex-col  justify-center items-center">
                    <ColoredTab name={"Total Points"} />
                    <div className="p-2 w-20 h-20 mt-2 shadow-lg shadow-primary  rounded-full flex text-white bg-primary">
                      <div className="m-auto text-xl">299</div>
                    </div>
                  </div>
                </div>
                <div className="w-full  border border-primary grid grid-cols-2 mt-4 ">
                  <div className="text-primary py-2 px-2 flex justify-center gap-2">
                    <div className="font-semibold text-2xl">142</div>
                    <div className="my-auto">(47.5%)</div>
                  </div>
                  <div className="text-white py-2 px-2 bg-gradient-to-b from-[#f8b672] to-[#f2851c] flex justify-center gap-2">
                    <div className="font-semibold text-2xl">142</div>
                    <div className="my-auto">(47.5%)</div>
                  </div>
                </div>
              </div>
              <div className="basis-3/5 flex flex-col justify-center items-center">
                <div className="mt-5 flex  justify-center items-center">
                  <div className="flex flex-col  justify-center items-center">
                    <ColoredTab name={"RALLY LENGTHS"} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-full  flex  flex-col mt-4 ">
                    <div className="text-primary w-[180px] border border-primary  py-1 px-1 flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="text-white border w-[200px] border-primary  py-1 px-1 bg-gradient-to-b from-[#f8b672] to-[#f2851c] flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="mt-3 mx-auto font-semibold">1-5</div>
                  </div>
                  <div className="w-full  flex  flex-col mt-4 ">
                    <div className="text-primary w-[180px] border border-primary  py-1 px-1 flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="text-white border w-[200px] border-primary  py-1 px-1 bg-gradient-to-b from-[#f8b672] to-[#f2851c] flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="mt-3 mx-auto font-semibold">5-10</div>
                  </div>
                  <div className="w-full  flex  flex-col mt-4 ">
                    <div className="text-primary w-[180px] border border-primary  py-1 px-1 flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="text-white border w-[200px] border-primary  py-1 px-1 bg-gradient-to-b from-[#f8b672] to-[#f2851c] flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="mt-3 mx-auto font-semibold">10+</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {choice == 1 && (
          <>
            <div className="font-semibold mt-6">Serve Report</div>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-3 justify-center items-center px-6">
                <ColoredTab name={"Ace Counts"} />

                <div className="w-full border flex ">
                  <div className="border w-[30%] py-2 border-primary   px-1 text-primary flex justify-center gap-2">
                    <div className="font-semibold text-xl">142</div>
                    <div className="my-auto">(47.5%)</div>
                  </div>
                  <div className="border w-[70%] py-2 border-primary   px-1 bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white flex justify-center gap-2">
                    <div className="font-semibold text-xl">142</div>
                    <div className="my-auto">(47.5%)</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-center items-center px-6">
                <ColoredTab name={"DOUBLE FAULTS"} />

                <div className="w-full border flex ">
                  <div className="border w-[30%] py-2 border-primary   px-1 text-primary flex justify-center gap-2">
                    <div className="font-semibold text-xl">142</div>
                    <div className="my-auto">(47.5%)</div>
                  </div>
                  <div className="border w-[70%] py-2 border-primary   px-1 bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white flex justify-center gap-2">
                    <div className="font-semibold text-xl">142</div>
                    <div className="my-auto">(47.5%)</div>
                  </div>
                </div>
              </div>
            </div>
            {/* ---- */}
            <div className="grid grid-cols-2 w-full mt-12 gap-4">
              <div className="flex gap-6">
                <Hist />
                <Hist />
                <Hist />
              </div>
              <div className="grid grid-rows-2  ">
                <div className="flex flex-col  gap-3 justify-center items-center px-6">
                  <ColoredTab
                    name={"SERVE SPEED(AVG)"}
                    className="text-sm  mt-5"
                  />

                  <div className="w-full border flex ">
                    <div className="border w-[30%] py-2 border-primary   px-1 text-primary flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="border w-[70%] py-2 border-primary   px-1 bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-3 justify-center items-center px-6">
                  <ColoredTab
                    name={"SERVE SPEED(MAX)"}
                    className="text-sm  mt-5"
                  />
                  <div className="w-full border flex ">
                    <div className="border w-[30%] py-2 border-primary   px-1 text-primary flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                    <div className="border w-[70%] py-2 border-primary   px-1 bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white flex justify-center gap-2">
                      <div className="font-semibold text-xl">142</div>
                      <div className="my-auto">(47.5%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ---- */}
        {choice == 2 && (
          <>
            <div className="flex items-center gap-5 ">
              <div className="w-fit h-full  text-2xl mt-12 text-center font-semibold text-[#152946]">
                <div>FOREHAND SERVE</div>
              </div>
              <div className="w-full grid grid-cols-3 mt-12">
                <Hist2 />
                <Hist2 />
                <Hist2 />
              </div>
            </div>
            <div className="flex items-center gap-5 ">
              <div className="w-fit h-full  text-2xl mt-12 text-center font-semibold text-[#152946]">
                <div>BACKHAND SERVE</div>
              </div>
              <div className="w-full grid grid-cols-3 mt-12">
                <Hist2 />
                <Hist2 />
                <Hist2 />
              </div>
            </div>
            {/* ---- */}
            <div className="flex items-center gap-5 ">
              {/* ---- */}
              <div className="w-fit h-full  text-2xl mt-12 text-center font-semibold text-[#152946]">
                <div>BODY SERVE</div>
              </div>
              <div className="w-full grid grid-cols-3 mt-12">
                <Hist2 />
                <Hist2 />
                <Hist2 />
              </div>
            </div>
          </>
        )}
        {choice == 4 && (
          <>
            <div className="mt-12 grid grid-cols-2">
              <div className="flex gap-12">
                <CircularProgressBar percentage={55} />
                <CircularProgressBar percentage={55} outline />
              </div>
              <div className="grid grid-cols-2 gap-12">
                <Hist />
                <Hist />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CircularProgressBar = ({
  percentage,
  size = 52,
  className = "",
  outline = false,
}: {
  percentage: number;
  size?: number;
  className?: string;
  outline?: boolean;
}) => {
  const conicStyle = {
    background: `conic-gradient(rgb(242, 133, 28) 0% ${percentage}%, white ${percentage}% 100%)`,
  };

  return (
    <div className={`relative  w-${size} h-${size}`}>
      <div
        className={`absolute inset-0 rounded-full border-2 border-primary flex ${className}`}
        style={conicStyle}
      >
        <div className="m-auto pt-12 font-semibold  text-xl ">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default Report;

const Hist = () => {
  return (
    <div className="flex flex-col">
      <ColoredTab name={"FIRST SERVE WIN"} className="text-sm px-2 mb-5" />
      <div className="w-[150px] h-[300px] flex ">
        <div className="h-[60%] mt-auto w-1/2 border border-primary"></div>
        <div className="h-[100%] w-1/2 bg-primary"></div>
      </div>
      <div className="w-[150px]  flex ">
        <div className="w-1/2 flex flex-col items-center text-primary text-2xl mt-4 px-2">
          <div>43</div>
          <div className="w-full h-[1px] bg-primary"></div>
          <div>67</div>
        </div>
        <div className="w-1/2 flex flex-col items-center text-primary text-2xl mt-4 px-2">
          <div>43</div>
          <div className="w-full h-[1px] bg-primary"></div>
          <div>67</div>
        </div>
      </div>
    </div>
  );
};

const Hist2 = () => {
  return (
    <div className="flex flex-col">
      {/* <div className="px-2 text-sm w-fit mb-8 py-1 rounded text-white bg-primary"></div> */}
      <ColoredTab name={"FIRST SERVE WIN"} className="text-sm w-fit px mb-8" />
      <div className="w-[150px] h-[300px] flex gap-2 ">
        <div className="h-[60%] mt-auto w-1/2 border border-primary"></div>
        <div className="h-[100%] w-1/2 bg-primary"></div>
      </div>
      <div className="w-[150px]  flex gap-2 ">
        <div className="w-1/2 flex flex-col items-center text-primary text-2xl mt-4 px-2">
          <div>43</div>
          <div className="w-full h-[1px] bg-primary"></div>
          <div>67</div>
        </div>
        <div className="w-1/2 flex flex-col items-center text-primary text-2xl mt-4 px-2">
          <div>43</div>
          <div className="w-full h-[1px] bg-primary"></div>
          <div>67</div>
        </div>
      </div>
    </div>
  );
};

const MyTable = ({ match }: { match: Match }) => {
  const { p1, p2, p1Name, p2Name, sets, winner, p1IsObject, p2IsObject } =
    match;

  const player1Name = p1IsObject ? p1?.firstName + " " + p1?.lastName : p1Name;
  const player2Name = p2IsObject ? p2?.firstName + " " + p2?.lastName : p2Name;
  const player1Img = p1IsObject ? p1?.avatar : null;
  const player2Img = p2IsObject ? p2?.avatar : null;
  const player1Rank = p1IsObject ? 18 : null;
  const player2Rank = p2IsObject ? 19 : null;

  return (
    <div className="overflow-x-auto mx-4 my-5">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-left">
            <th className="border px-4 py-2 w-[400px]">Players</th>
            <th className="border px-4 py-2 w-[200px] whitespace-nowrap">
              Match Score
            </th>
            {[...Array(5)].map((_, index) => (
              <th key={index} className="border px-4 py-2 w-[200px]">{`${
                index + 1
              }st set`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            {
              id: "p1",
              name: player1Name,
              img: player1Img,
              rank: player1Rank,
              object: p1IsObject,
              data: p1,
            },
            {
              id: "p2",
              name: player2Name,
              img: player2Img,
              rank: player2Rank,
              object: p2IsObject,
              data: p2,
            },
          ].map((player, index) => {
            const isWinner = winner === (player.object ? player.data?._id : "");
            return (
              <tr key={player.id} className="hover:bg-gray-50">
                {/* Player Info */}
                <td
                  className={`border border-gray-300 px-4 py-2 flex gap-2 ${
                    isWinner
                      ? "bg-gradient-to-b from-[#F8B672] to-[#F2851C] text-white"
                      : ""
                  }`}
                >
                  {player.img && (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={player.img}
                      alt={player.name}
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{player.name}</p>
                    {player.rank && (
                      <p
                        className={`text-xs ${
                          isWinner ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        USDTA: {player.rank}
                      </p>
                    )}
                  </div>
                </td>
                {/* Match Score */}
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    isWinner ? "text-xl font-bold" : ""
                  }`}
                >
                  {index === 0 ? "2" : "3"}
                </td>
                {/* Set Scores */}
                {[...Array(5)].map((_, setIndex) => {
                  const set = sets[setIndex];
                  const score = set
                    ? index === 0
                      ? set.p1TotalScore
                      : set.p2TotalScore
                    : "-";
                  const isSetWinner =
                    set?.winner === (player.object ? player.data?._id : "");

                  return (
                    <td
                      key={setIndex}
                      className={`border border-gray-300 px-4 py-2 text-center ${
                        isSetWinner ? "text-xl font-bold" : ""
                      }`}
                    >
                      {score}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ColoredTab = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "px-6 py-[2px] w-fit rounded text-white bg-[#152946]",
        className
      )}
    >
      {name}
    </div>
  );
};
