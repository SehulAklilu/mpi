import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";
import { CoachGoal, Goal, GoalType } from "@/types/children.type";
import { formatDateTime } from "@/lib/utils";
import { FiChevronDown } from "react-icons/fi";

function PlayerGoal({ coachGoals }: { coachGoals: CoachGoal[] }) {
  const sortedGoals = useMemo(() => {
    const allGoals = coachGoals.flatMap((coachGoal) => coachGoal.goals);
    const groupedByTerm: Record<string, Goal[]> = allGoals.reduce(
      (acc, goal) => {
        acc[goal.term] = acc[goal.term] || [];
        acc[goal.term].push(goal);
        return acc;
      },
      {} as Record<string, Goal[]>
    );
    return groupedByTerm;
  }, [coachGoals]);

  return (
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
                      <div key={goal._id} className="p-2 border-b">
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
  );
}

export default PlayerGoal;
