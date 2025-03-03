import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const defaultLabels = [
  "Never",
  "Rarely True",
  "Sometimes True",
  "Often True",
  "Always True",
];
const alternativeLabels = ["Not at all", "", "", "", "Very much so"];

interface RatingProgressBarProps {
  value: number;
  onChange: (newValue: number) => void;
  useAlternativeLabels?: boolean; // Toggle for different labels
}

const RatingProgressBar: React.FC<RatingProgressBarProps> = ({
  value,
  onChange,
  useAlternativeLabels = false, // Default to false, uses normal labels
}) => {
  const labels = useAlternativeLabels ? alternativeLabels : defaultLabels;

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        {/* Progress Bar with Markers */}
        <div className="relative w-full">
          {/* Progress Track */}
          <div className="w-full h-1 bg-gray-300 rounded-full relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all"
              style={{ width: `${value * 25}%` }} // 0%, 25%, 50%, 75%, 100%
            />
          </div>

          {/* Small Circles (Markers) */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2">
            {labels.map((label, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full cursor-pointer flex items-center justify-center transition",
                      index <= value ? "bg-primary text-white" : "bg-gray-400"
                    )}
                    onClick={() => onChange(index)}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Labels Below Markers */}
        <div className="flex justify-between w-full text-xs text-gray-700">
          {labels.map((label, index) => (
            <div key={index + 1} className="text-center  ">
              {label}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RatingProgressBar;
