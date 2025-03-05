import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { CoachGoal, Goal, GoalType } from "@/types/children.type";
import { formatDateTime } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { FiChevronDown } from "react-icons/fi";
import PlayerGoalForm from "./PlayerGoalForm";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { CirclePlus } from "lucide-react";

function MyGoal({ coachGoals }: { coachGoals: CoachGoal[] }) {
  const sortedGoals = useMemo(() => {
    const groupedByTerm: Record<string, Record<string, Goal[]>> = {};

    coachGoals.forEach((coachGoal) => {
      coachGoal.goals.forEach((goal) => {
        if (!groupedByTerm[goal.term]) {
          groupedByTerm[goal.term] = {};
        }
        if (!groupedByTerm[goal.term][coachGoal.coach._id]) {
          groupedByTerm[goal.term][coachGoal.coach._id] = [];
        }
        groupedByTerm[goal.term][coachGoal.coach._id].push(goal);
      });
    });

    return groupedByTerm;
  }, [coachGoals]);

  const [initialGoal, setInitialGoal] = useState<Goal | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCoaches, setExpandedCoaches] = useState<
    Record<string, boolean>
  >({});
  const [coachId, setCoachId] = useState<string | undefined>(undefined);

  const toggleCoach = (coachId: string) => {
    setExpandedCoaches((prev) => ({
      ...prev,
      [coachId]: !prev[coachId],
    }));
  };

  return (
    <div>
      {/* <div
        className="flex underline text-primary items-center justify-end pr-6 text-lg font-medium cursor-pointer"
       
      >
        Add Goal
      </div> */}
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
          {Object.entries(sortedGoals).map(([term, coaches]) => (
            <TabsContent key={term} value={term}>
              {Object.entries(coaches).map(([coachId, goals]) => {
                const coach = coachGoals.find(
                  (c) => c.coach._id === coachId
                )?.coach;
                return (
                  <div key={coachId} className="mb-4 border rounded-lg p-2">
                    <div className="cursor-pointer font-bold capitalize flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                      <h1 className="text-xl">
                        {coach?.firstName} {coach?.lastName}
                      </h1>
                      <div className="flex gap-4">
                        <FiChevronDown
                          className={` text-2xl transition-transform ${
                            expandedCoaches[coachId] ? "rotate-180" : ""
                          }`}
                          onClick={() => {
                            setCoachId(coachId);
                            toggleCoach(coachId);
                          }}
                        />
                        <CirclePlus
                          className={` text-2xl text-primary transition-transform ${
                            expandedCoaches[coachId] ? "rotate-180" : ""
                          }`}
                          onClick={() => {
                            setCoachId(coachId);
                            setIsOpen(true);
                          }}
                        />
                      </div>
                    </div>
                    {expandedCoaches[coachId] && (
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
                    )}
                  </div>
                );
              })}
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
          coachId={coachId}
        />
      </div>
    </div>
  );
}

export default MyGoal;
