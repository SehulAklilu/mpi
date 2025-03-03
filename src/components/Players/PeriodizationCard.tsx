import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaClock } from "react-icons/fa";
import { Periodization } from "@/types/children.type";
import { formatDateTime } from "@/lib/utils";

const calculateProgress = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();

  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const elapsedDays = Math.ceil(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const progressPercentage = Math.min((elapsedDays / totalDays) * 100, 100);

  return {
    totalDays,
    elapsedDays,
    progressPercentage,
  };
};

const PeriodizationCard = ({
  periodization,
}: {
  periodization: Periodization;
}) => {
  const { totalDays, elapsedDays, progressPercentage } = calculateProgress(
    periodization.startingDate,
    periodization.endingDate
  );

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="p-4 rounded-lg shadow-lg border border-gray-200 bg-white ">
        <CardHeader className="flex items-center gap-2 text-lg font-semibold">
          <FaClock className="text-primary text-4xl mb-2" />
          <span>Day {elapsedDays} </span>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-xl font-medium">
            {formatDateTime(periodization.startingDate, false)}-
            {formatDateTime(periodization.endingDate, false)}
          </p>

          <p className="text-sm text-gray-500">{totalDays} days in Total</p>

          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-gray-600 text-right">
            {progressPercentage.toFixed(2)}% completed
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeriodizationCard;
