import { useState } from "react";
import profile_img from "../../assets/user.jpeg";

const Report = () => {
  const [cur, setCur] = useState(0);
  const [choice, setChoice] = useState(0);
  return (
    <div className="flex flex-col  ">
      <div className="flex w-full justify-center gap-12 mt-6">
        <div className="flex gap-2 items-center justify-center">
          <div
            className={`h-6 w-6  rounded-full border  border-primary`}
          ></div>
          <div>Candace</div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div>Jene</div>
          <div
            className={`h-6 w-6  rounded-full  bg-primary`}
          ></div>
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

        {choice != -1 && <MyTable />}
        {choice == 0 && (
          <>
            <div className="font-semibold mt-6">Score Report</div>
            <div className="flex gap-10 w-full">
              <div className="basis-2/5 flex flex-col justify-center items-center">
                <div className="mt-5 flex  justify-center items-center">
                  <div className="flex flex-col  justify-center items-center">
                    <div className="px-2 py-1 rounded text-white bg-primary">
                      Total Points
                    </div>
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
                    <div className="px-2 py-1 rounded text-white bg-primary">
                      RALLY LENGTHS
                    </div>
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
                <div className="w-fit px-2 mt-5 py-1 rounded bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                  Ace Counts
                </div>
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
                <div className="w-fit px-2 mt-5 py-1 rounded bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                  DOUBLE FAULTS
                </div>
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
                  <div className="w-fit px-2 mt-5 py-1 rounded bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                    SERVE SPEED(AVG)
                  </div>
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
                  <div className="w-fit px-2 py-1 rounded bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white">
                    SERVE SPEED(MAX)
                  </div>
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
                <CircularProgressBar percentage={70} />
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
      <div className="px-2 text-sm mb-5 py-1 rounded text-white bg-primary">
        FIRST SERVE WIN
      </div>
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
      <div className="px-2 text-sm w-fit mb-8 py-1 rounded text-white bg-primary">
        FIRST SERVE WIN
      </div>
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

const MyTable = () => {
  return (
    <div className="overflow-x-auto mx-4 my-5">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className=" text-left">
            <th className="border  px-4 py-2 w-[400px]">Players</th>
            <th className="border  px-4 py-2 w-[200px] whitespace-nowrap">
              Match Score
            </th>
            <th className="border  px-4 py-2 w-[200px]">1st set</th>
            <th className="border  px-4 py-2 w-[200px]">2nd set</th>
            <th className="border  px-4 py-2 w-[200px]">3rd set</th>
            <th className="border  px-4 py-2 w-[200px]">4th set</th>
            <th className="border  px-4 py-2 w-[200px]">5th set</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`hover:bg-gray-50`}>
            <td className="border border-gray-300 px-4 py-2 flex gap-2">
              <img
                className="w-10 h-10 rounded-full"
                src={profile_img}
                alt=""
              />
              <div>
                <p className="text-sm font-semibold ">Candace Flynn</p>
                <p className="text-gray-700 text-xs">USDTA: 19</p>
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">2</td>
            <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-r to-red-500 from-[#f2851c] text-white">
              6
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">5</td>
            <td className="border border-gray-300 px-4 py-2 text-center">2</td>
            <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-r to-red-500 from-[#f2851c] text-white">
              7
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">3</td>
          </tr>
          <tr className={`hover:bg-gray-50`}>
            <td className="border border-gray-300 px-4 py-2 flex gap-2 bg-gradient-to-b from-[#F8B672] to-[#F2851C] text-white">
              <img
                className="w-10 h-10 rounded-full"
                src={profile_img}
                alt=""
              />
              <div>
                <p className="text-sm font-semibold ">Candace Flynn</p>
                <p className="text-gray-200 text-xs">USDTA: 19</p>
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2 bg-gradient-to-r to-red-500 from-[#f2851c] text-white">
              3
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">4</td>
            <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-r to-red-500 from-[#f2851c] text-white">
              7
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-r to-red-500 from-[#f2851c] text-white">
              6
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center ">6</td>
            <td className="border border-gray-300 px-4 py-2 text-center bg-gradient-to-r to-red-500 from-[#f2851c] text-white">
              6
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
