import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { CoachGoal, Goal, GoalType } from "@/types/children.type";
import { formatDateTime } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { FiChevronDown } from "react-icons/fi";
import PlayerGoalForm from "./PlayerGoalForm";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

function PlayerGoal({
  coachGoals,
  playerId,
}: {
  coachGoals: CoachGoal[];
  playerId: string;
}) {
  const user_id = Cookies.get("user_id");

  const sortedGoals = useMemo(() => {
    const coach = coachGoals.find(
      (coachGoal) => coachGoal.coach._id === user_id
    );

    if (!coach) return {}; // Return an empty object if no matching coach is found

    const groupedByTerm: Record<string, Goal[]> = coach.goals.reduce(
      (acc, goal) => {
        acc[goal.term] = acc[goal.term] || [];
        acc[goal.term].push(goal);
        return acc;
      },
      {} as Record<string, Goal[]>
    );

    return groupedByTerm;
  }, [coachGoals, user_id]);

  const [initialGoal, setInitialGoal] = useState<Goal | undefined>(undefined);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex underline text-primary items-center justify-end pr-6 text-lg font-medium cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Add Goal
      </div>
      <Tabs defaultValue="short" orientation="vertical" className="flex">
        <TabsList className="flex flex-col w-32 h-[10rem] mt-10 space-y-2">
          {["short", "medium", "long"].map((term) => (
            <TabsTrigger
              key={term}
              value={term}
              className="h-12 data-[state=active]:bg-primary  data-[state=active]:text-white"
            >
              {term}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="p-4 border rounded-lg w-full min-h-[40vh]">
          {Object.entries(sortedGoals).map(([term, goals]) => (
            <TabsContent key={term} value={term}>
              {Object.entries(
                goals.reduce((acc, goal) => {
                  acc[goal.goal] = acc[goal.goal] || [];
                  acc[goal.goal].push(goal);
                  return acc;
                }, {} as Record<GoalType, Goal[]>)
              ).map(([goalType, goals]) => (
                <div key={goalType} className="mb-4 border rounded-lg p-2">
                  <details className="group">
                    <summary className="cursor-pointer font-bold capitalize flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                      <h1 className="text-2xl ">{goalType}</h1>
                      <FiChevronDown className="transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 p-2">
                      {goals.map((goal) => (
                        <div
                          key={goal._id}
                          className="p-2 border-b hover:border hover:border-primary rounded-lg cursor-pointer"
                          onClick={() => {
                            setInitialGoal(goal);
                            setIsOpen(true);
                          }}
                        >
                          <p className="text-xl font-normal">
                            {goal.description}
                          </p>
                          <p>{goal.measurement}</p>
                          <p className="text-sm text-gray-700">
                            Achievement Date:{" "}
                            {formatDateTime(goal.achievementDate)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              ))}
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <div className="w-full">
        <PlayerGoalForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          initialData={initialGoal}
          setInitialGoal={setInitialGoal}
          playerId={playerId}
        />
      </div>
    </div>
  );
}

export default PlayerGoal;
