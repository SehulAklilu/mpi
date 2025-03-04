import { ClassPayload, getPlayerClasses } from "@/api/children.api";
import { useRole } from "@/RoleContext";
import { useQuery } from "react-query";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

function PlayerClasses({ playerId }: { playerId: string }) {
  const [showAll, setShowAll] = useState(false);
  const { role } = useRole();
  const payload: ClassPayload = {
    id: playerId,
    role: role && role === "parent" ? "child" : "player",
  };
  const { data } = useQuery({
    queryKey: ["playerClasses", payload],
    queryFn: () => getPlayerClasses(payload),
    enabled: !!playerId,
  });
  const visibleClasses = showAll ? data?.classes : data?.classes.slice(0, 5);

  return (
    <div className="space-y-4 p-4">
      {visibleClasses?.map((classItem) => (
        <Card
          key={classItem.id}
          className="p-6 flex justify-between items-center border shadow-lg rounded-2xl"
        >
          <div>
            <h2 className="text-xl font-bold text-primary">
              {classItem.levelPlan}
            </h2>
            <p className="text-sm text-gray-600">
              {new Date(classItem.date).toDateString()}
            </p>
            <div className="flex items-center text-sm mt-3 text-gray-700">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              <span className="font-medium capitalize">Time:</span>
              <span className="capitalize ml-2">{classItem.to}</span>
            </div>
            <div className="flex items-center text-sm mt-2 text-gray-700">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              <span className="font-medium">Court:</span>
              <span className="ml-2">Not Provided</span>
            </div>
          </div>
          <ChevronRight className="w-7 h-7 text-primary" />
        </Card>
      ))}

      <div className="flex items-center justify-center mt-2">
        {data?.classes && data?.classes.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-primary text-lg font-medium hover:underline"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default PlayerClasses;
