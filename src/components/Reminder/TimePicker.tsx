import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const hours = Array.from({ length: 13 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const minutes = Array.from({ length: 11 }, (_, i) =>
  ((i + 1) * 5).toString().padStart(2, "0")
);

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState(value || "01:00 ");

  const handleSelect = (hour: string, minute: string, period: string) => {
    const newTime = `${hour}:${minute}`;
    setSelectedTime(newTime);
    onChange(newTime);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full border shadow-md py-2 rounded-lg"
        >
          {selectedTime.split(":")[0] + " HR"}
          {" : "}
          {selectedTime.split(":")[1] + " MIN"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-2 flex gap-2">
        <ScrollArea className="h-40 w-16">
          {hours.map((hour) => (
            <div
              key={hour}
              className={cn(
                "p-2 text-center cursor-pointer hover:bg-gray-100 rounded-md",
                selectedTime.startsWith(hour) && "bg-primary text-white"
              )}
              onClick={() =>
                handleSelect(
                  hour,
                  selectedTime.split(":")[1].split(" ")[0],
                  selectedTime.split(" ")[1]
                )
              }
            >
              {hour}
            </div>
          ))}
        </ScrollArea>
        <ScrollArea className="h-40 w-16">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={cn(
                "p-2 text-center cursor-pointer hover:bg-gray-100 rounded-md",
                selectedTime.includes(`:${minute}`) && "bg-primary text-white"
              )}
              onClick={() =>
                handleSelect(
                  selectedTime.split(":")[0],
                  minute,
                  selectedTime.split(" ")[1]
                )
              }
            >
              {minute}
            </div>
          ))}
        </ScrollArea>
        {/* <div className="flex flex-col gap-1">
          {periods.map((period) => (
            <div
              key={period}
              className={cn(
                "p-2 text-center cursor-pointer hover:bg-gray-100 rounded-md",
                selectedTime.endsWith(period) && "bg-primary text-white"
              )}
              onClick={() =>
                handleSelect(
                  selectedTime.split(":")[0],
                  selectedTime.split(":")[1].split(" ")[0],
                  period
                )
              }
            >
              {period}
            </div>
          ))}
        </div> */}
      </PopoverContent>
    </Popover>
  );
}
