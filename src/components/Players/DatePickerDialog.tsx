import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DatePickerDialogProps {
  onConfirm: (dates: { startDate: Date; endDate: Date }) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export function DatePickerDialog({
  onConfirm,
  isOpen,
  setIsOpen,
  date,
  setDate,
}: DatePickerDialogProps) {
  const today = new Date();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-auto p-4">
        <DialogHeader>
          <DialogTitle>Select Training Period</DialogTitle>
          <div className="flex my-1 items-center justify-around font-medium text-primary">
            <p>Starting Date</p> - <p>Ending Date</p>{" "}
          </div>
        </DialogHeader>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          disabled={{ before: today }}
        />
        <Button
          onClick={() => {
            if (date?.from && date?.to) {
              onConfirm({ startDate: date.from, endDate: date.to });
              setIsOpen(false);
            }
          }}
          className="mt-4 py-2 px-4 rounded-full bg-primary text-white"
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
