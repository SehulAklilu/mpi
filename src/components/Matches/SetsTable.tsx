import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Match, Player } from "@/types/match.type";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import avater from "../../assets/avater.jpg";

const SetsTable: React.FC<{ match: Match }> = ({ match }) => {
  // Determine display names for player one and player two.
  const playerOne: string | Player = match.p1IsObject
    ? match.p1 ?? match.p1Name
    : match.p1Name;
  const playerTwo: string | Player = match.p2IsObject
    ? match.p2 ?? match.p2Name
    : match.p2Name;

  // Only one set can be expanded at a time.
  const [expandedSetIndex, setExpandedSetIndex] = useState<number | null>(null);
  // Track which game's score table is expanded (by game._id).
  const [expandedGameIds, setExpandedGameIds] = useState<string[]>([]);

  // Toggle set expansion: collapse if already expanded.
  const handleSetClick = (index: number) => {
    setExpandedSetIndex(expandedSetIndex === index ? null : index);
    // Reset any expanded game scores when toggling a new set.
    setExpandedGameIds([]);
  };

  // Toggle the nested (score) table for a game.
  const toggleGameExpansion = (gameId: string) => {
    setExpandedGameIds((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  function isPlayer(player: string | Player): player is Player {
    return player !== null && typeof player === "object";
  }

  const getPlayerDetail = (key: string): JSX.Element | null => {
    const player: string | Player | undefined =
      key === "playerOne"
        ? playerOne
        : key === "playerTwo"
        ? playerTwo
        : undefined;

    if (!player) {
      return null;
    }

    return (
      <div className="flex items-center gap-2">
        <img
          className="w-6 h-6 rounded-full"
          src={isPlayer(player) ? player.avatar : avater}
          alt={isPlayer(player) ? player.firstName : "image"}
        />
        <div>
          <p className="text-sm">
            {isPlayer(player)
              ? `${player.firstName} ${player.lastName}`
              : player}
          </p>
        </div>
      </div>
    );
  };

  // Total columns in the parent table: 1 for "Player" plus one for each set.
  const totalColumns = match.sets.length + 1;

  return (
    <div className="overflow-hidden border rounded-2xl shadow-lg">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-primary text-center">
              Player
            </th>
            {match.sets.map((set, index) => (
              <th
                key={set._id}
                onClick={() => handleSetClick(index)}
                className="border border-gray-300 p-2 text-primary  cursor-pointer text-center hover:bg-primary hover:text-white"
              >
                <div className="flex justify-center items-center gap-2">
                  Set {index + 1} <ChevronDownIcon className="" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Player rows */}
          <tr>
            <td
              style={{
                border: "1px solid #ccc  ",
                borderRadius: "10px",
                width: "35%",
                padding: "8px",
              }}
            >
              {isPlayer(playerOne) ? (
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={playerOne.avatar}
                    alt={playerOne.firstName}
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {playerOne.firstName} {playerOne.lastName}
                    </p>
                    <p className="text-gray-700 text-xs">USDTA: 18</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={avater}
                    alt="image"
                  />
                  <>
                    <p className="text-sm font-semibold">{playerOne}</p>
                    <p className="text-gray-700 text-xs">USDTA: 18</p>
                  </>
                </div>
              )}
            </td>
            {match.sets.map((set, index) => (
              <td
                key={`${set._id}-p1`}
                onClick={() => handleSetClick(index)}
                className="border border-gray-300 p-2 text-center cursor-pointer"
              >
                {set.p1TotalScore}
              </td>
            ))}
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #ccc  ",
                borderRadius: "10px",
                width: "35%",
                padding: "8px",
              }}
            >
              {isPlayer(playerTwo) ? (
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={playerTwo.avatar}
                    alt={playerTwo.firstName}
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {playerTwo.firstName} {playerTwo.lastName}
                    </p>
                    <p className="text-gray-700 text-xs">USDTA: 18</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={avater}
                    alt="image"
                  />
                  <>
                    <p className="text-sm font-semibold">{playerTwo}</p>
                    <p className="text-gray-700 text-xs">USDTA: 18</p>
                  </>
                </div>
              )}
            </td>
            {match.sets.map((set, index) => (
              <td
                key={`${set._id}-p2`}
                onClick={() => handleSetClick(index)}
                className="border border-gray-300 p-2 text-center cursor-pointer"
              >
                {set.p2TotalScore}
              </td>
            ))}
          </tr>
          {/* Expanded child row for the selected set */}
          <AnimatePresence>
            {expandedSetIndex !== null && (
              <motion.tr
                key="expandedRow"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td colSpan={totalColumns} className="p-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-[#fff6ed]"
                  >
                    <h4 className="mb-4 text-lg  text-primary underline font-semibold">
                      Set {expandedSetIndex + 1} – Game Details
                    </h4>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 p-2">Game</th>
                          <th className="border border-gray-300 p-2">Server</th>
                          <th className="border border-gray-300 p-2">Winner</th>
                          <th className="border border-gray-300 p-2">Scores</th>
                        </tr>
                      </thead>
                      <tbody>
                        {match.sets[expandedSetIndex].games.map((game) => (
                          <React.Fragment key={game._id}>
                            <tr>
                              <td className="border border-gray-300 p-2 text-center">
                                <div className="flex items-center justify-center">
                                  {game.gameNumber}
                                </div>
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                <div className="pl-8">
                                  {getPlayerDetail(game.server)}
                                </div>
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                <div className="pl-8">
                                  {getPlayerDetail(game.winner)}
                                </div>
                              </td>
                              <td
                                onClick={() => toggleGameExpansion(game._id)}
                                className="border border-gray-300 p-2 text-center cursor-pointer"
                              >
                                {expandedGameIds.includes(game._id) ? (
                                  <div className="flex items-center justify-center  text-primary">
                                    Hide Scores{" "}
                                    <ChevronUpIcon className="text-xs" />
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center  text-primary">
                                    Show Scores{" "}
                                    <ChevronDownIcon className="text-xs" />
                                  </div>
                                )}
                              </td>
                            </tr>
                            <AnimatePresence>
                              {expandedGameIds.includes(game._id) && (
                                <motion.tr
                                  key={`${game._id}-scores`}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <td colSpan={4} className="p-0">
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="p-4 bg-[#fffbf9]"
                                    >
                                      <h5 className="mb-2 text-md text-primary font-semibold">
                                        Score Details
                                      </h5>
                                      <table className="w-full border-collapse">
                                        <thead>
                                          <tr>
                                            <th className="border font-medium border-gray-300 p-1">
                                              P1 Score
                                            </th>
                                            <th className="border font-medium border-gray-300 p-1">
                                              P2 Score
                                            </th>
                                            <th className="border font-medium border-gray-300 p-1">
                                              Type
                                            </th>
                                            <th className="border font-medium border-gray-300 p-1">
                                              Serve
                                            </th>
                                            <th className="border font-medium border-gray-300 p-1">
                                              Rally Count
                                            </th>
                                            <th className="border font-medium border-gray-300 p-1">
                                              Is First Serve
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {game.scores.map((score, idx) => (
                                            <tr key={idx}>
                                              <td className="border border-gray-300 p-1 text-center">
                                                {score.p1Score}
                                              </td>
                                              <td className="border border-gray-300 p-1 text-center">
                                                {score.p2Score}
                                              </td>
                                              <td className="border border-gray-300 p-1 text-center">
                                                {score.type}
                                              </td>
                                              <td className="border border-gray-300 p-1 text-center">
                                                {score.servePlacement}
                                              </td>
                                              <td className="border border-gray-300 p-1 text-center">
                                                {score.rallies}
                                              </td>
                                              <td className="border border-gray-300 p-1 text-center">
                                                {score.isSecondService
                                                  ? "No"
                                                  : "Yes"}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </motion.div>
                                  </td>
                                </motion.tr>
                              )}
                            </AnimatePresence>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default SetsTable;
