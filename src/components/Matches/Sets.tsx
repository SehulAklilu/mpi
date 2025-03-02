import { Match } from "@/types/match.type";
import avater from "../../assets/avater.jpg";

const MatchTable = ({ match }: { match: Match }) => {
  const {
    p1,
    p2,
    p1Name,
    p2Name,
    sets,
    winner,
    p1IsObject,
    p2IsObject,
    status,
  } = match;

  const player1Name = p1IsObject ? p1?.firstName + " " + p1?.lastName : p1Name;
  const player2Name = p2IsObject ? p2?.firstName + " " + p2?.lastName : p2Name;
  const plMatchScore = match?.sets?.filter(
    (set) => set?.winner === "playerOne"
  )?.length;
  const p2MatchScore = match?.sets?.filter(
    (set) => set?.winner === "playerTwo"
  )?.length;
  const colCount: number = (() => {
    switch (match?.matchType) {
      case "one":
        return 1;
      case "tree":
        return 3;
      case "five":
        return 5;
      default:
        return 3;
    }
  })();

  return (
    <div>
      {status === "pending" ? (
        <div className="min-h-[14rem] flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-400 text-center">
            Game Not Finished
          </h1>
        </div>
      ) : (
        <div className="w-full flex gap-2 mt-14">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="text-left">
                  <th className="border px-4 py-2 w-[400px]">Players</th>
                  <th className="border px-4 py-2 w-[200px]">Match Score</th>
                  {[...Array(colCount)].map((_, index) => (
                    <th key={index} className="border px-4 py-2 w-[200px]">{`${
                      index + 1
                    }st set`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "p1", name: player1Name, object: p1IsObject, data: p1 },
                  { id: "p2", name: player2Name, object: p2IsObject, data: p2 },
                ].map((player, index) => {
                  const isWinner =
                    winner === (player.object ? player.data?._id : "");

                  return (
                    <tr key={player.id} className="hover:bg-gray-50">
                      {/* Player Info */}
                      <td
                        className={`border border-gray-300 px-4 py-2 flex gap-2 ${
                          isWinner
                            ? "bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white"
                            : ""
                        }`}
                      >
                        {player.object && player.data?.avatar ? (
                          <img
                            className="w-10 h-10 rounded-full"
                            src={player.data.avatar}
                            alt={player.name}
                          />
                        ) : (
                          <img
                            className="w-10 h-10 rounded-full"
                            src={avater}
                            alt={player.name}
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold">{player.name}</p>
                          <p className="text-gray-700 text-xs">USDTA: 18</p>
                        </div>
                      </td>
                      {/* Match Score */}
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          isWinner
                            ? "bg-gradient-to-b from-[#f8b672] to-[#f2851c] text-white"
                            : ""
                        }`}
                      >
                        {index === 0 ? (
                          <span
                            className={
                              plMatchScore > p2MatchScore
                                ? "font-semibold text-lg"
                                : ""
                            }
                          >
                            {plMatchScore}
                          </span>
                        ) : (
                          <span
                            className={
                              p2MatchScore > plMatchScore
                                ? "font-semibold text-lg"
                                : ""
                            }
                          >
                            {p2MatchScore}
                          </span>
                        )}
                      </td>
                      {/* Set Scores */}
                      {[...Array(colCount)].map((_, setIndex) => {
                        const set = sets[setIndex];
                        const score = set
                          ? index === 0
                            ? set.p1TotalScore
                            : set.p2TotalScore
                          : "-";
                        const isSetWinner =
                          (index === 0 && set?.winner === "playerOne") ||
                          (index === 1 && set?.winner === "playerTwo");

                        return (
                          <td
                            key={setIndex}
                            className={`border border-gray-300 px-4 py-2 text-center ${
                              isSetWinner ? "text-xl font-semibold" : ""
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
        </div>
      )}
    </div>
  );
};

export default MatchTable;
