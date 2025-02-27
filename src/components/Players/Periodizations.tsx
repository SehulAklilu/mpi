import { getPlayerPeriodizations } from "@/api/match.api";
import { formatDateTime } from "@/lib/utils";
import { Periodization, Preparation } from "@/types/children.type";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PeriodizationCard from "./PeriodizationCard";
import { Progress } from "@/components/ui/progress";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoMdHourglass } from "react-icons/io";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoTimeSharp } from "react-icons/io5";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "../ui/input";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCirclePlus } from "react-icons/fa6";
import AddPhaseDialog from "./PeriodizationForm";
import { DatePickerDialog } from "./DatePickerDialog";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export interface NewPreparation extends Preparation {
  for: string; // Allows flexibility if needed
}

function Periodizations({ playerId }: { playerId: string }) {
  const [onEdit, setOnEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["getPlayerGoals"],
    queryFn: () => getPlayerPeriodizations(playerId),
  });

  const FormSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, {
      message: "Title must be at least 3 characters.",
    }),
    description: z.string().min(3, {
      message: "Description must be at least 3 characters.",
    }),
    category: z.string().min(1, {
      message: "Category is required.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [selectedPhase, setSelectedPhase] = useState<NewPreparation | null>(
    null
  );

  const [selectedPeriodizationId, setSelectedPeriodizationId] =
    useState<string>("");
  const [selectedPeriodization, setSelectedPeriodization] = useState<
    Periodization | undefined
  >(data?.periodizations[0]);
  const onSelect = (id: string) => {
    const periodization = data?.periodizations.find(
      (periodization) => periodization._id === id
    );
    setSelectedPeriodization(periodization);
  };

  useEffect(() => {
    if (data) {
      setSelectedPeriodization(data.periodizations[0]);
      setSelectedPeriodizationId(data.periodizations[0]._id);
    }
  }, [data]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const handleConfirm = (dates: { startDate: Date; endDate: Date }) => {
    console.log("Selected Dates:", dates);
  };

  const fields = [
    "physical",
    "technical",
    "psychological",
    "tactical",
    "nutrition",
    "recovery",
  ] as const;

  if (!data) {
    return;
  }

  return (
    <div>
      <div className="flex items-center  my-2 gap-4 justify-center">
        <select
          value={selectedPeriodizationId}
          onChange={(e) => {
            onSelect(e.target.value),
              setSelectedPeriodizationId(e.target.value);
          }}
          className="py-2 px-6 rounded-full my-2 outline-none border border-primary font-medium"
        >
          <option value="">Select a periodization</option>
          {data.periodizations.map((item) => (
            <option key={item._id} value={item._id} className="font-medium">
              {formatDateTime(item.startingDate)} -{" "}
              {formatDateTime(item.endingDate)}
            </option>
          ))}
        </select>
        <FaCirclePlus
          className="text-4xl flex-none mb-2 text-primary cursor-pointer"
          onClick={() => setIsDatePickerOpen(true)}
        />
      </div>
      {selectedPeriodization && (
        <div>
          <PeriodizationCard periodization={selectedPeriodization} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {fields.map((field) => (
              <Card
                key={field}
                className="h-[28rem] rounded-xl bg-white border shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="capitalize text-center text-2xl font-semibold py-2">
                    {field}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[22rem] rounded">
                  <div className="grid grid-rows-3 gap-2 h-full">
                    <div className="">
                      {selectedPeriodization[field].preparation ? (
                        <div
                          className="p-4 rounded-xl border shadow-lg mx-4 cursor-pointer"
                          onClick={() => {
                            setSelectedPhase({
                              for: "preparation",
                              allocatedTime:
                                selectedPeriodization[field].preparation
                                  ?.allocatedTime ?? 0,
                              timeType:
                                selectedPeriodization[field].preparation
                                  ?.timeType ?? "days",
                              generals:
                                selectedPeriodization[field].preparation
                                  ?.generals ?? [],
                              specifics:
                                selectedPeriodization[field].preparation
                                  ?.specifics ?? [],
                              specificDescriptions:
                                selectedPeriodization[field].preparation
                                  ?.specificDescriptions ?? [],
                            });
                            setIsOpen(true);
                          }}
                        >
                          <div className="flex justify-between items-center py-2">
                            <div className="flex items-center gap-2 font-semibold text-xl">
                              <IoMdCheckboxOutline className="text-2xl" />{" "}
                              <span>Preparation</span>
                            </div>
                            <span className="text-gray-500">
                              {
                                selectedPeriodization[field].preparation
                                  .allocatedTime
                              }{" "}
                              {
                                selectedPeriodization[field].preparation
                                  .timeType
                              }
                            </span>
                          </div>
                          <Progress value={1} className="h-1" />
                        </div>
                      ) : (
                        <div className="flex flex-col border shadow-lg rounded-xl mx-4 p-2 items-center justify-center">
                          <IoMdHourglass className="text-2xl font-bold text-primary" />
                          <h1 className="text-center font-semibold text-gray-600">
                            No Preparation Addes
                          </h1>
                          <p className="text-center text-gray-500 text-sm">
                            Start adding Preparation to track your progress.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="">
                      {selectedPeriodization[field].competition ? (
                        <div className="p-4 rounded-xl border shadow-lg mx-4">
                          <div className="flex justify-between items-center py-2">
                            <div className="flex items-center gap-2 font-semibold text-xl">
                              <IoMdCheckboxOutline className="text-2xl" />
                              <span>Competition</span>
                            </div>
                            <span className="text-gray-500">
                              {
                                selectedPeriodization[field].competition
                                  .allocatedTime
                              }{" "}
                              {
                                selectedPeriodization[field].competition
                                  .timeType
                              }
                            </span>
                          </div>
                          <Progress value={1} className="h-1" />
                        </div>
                      ) : (
                        <div className="flex flex-col border shadow-lg rounded-xl mx-4 p-2 items-center justify-center">
                          <IoMdHourglass className="text-2xl font-bold text-primary" />
                          <h1 className="text-center font-semibold text-gray-600">
                            No Competition Added
                          </h1>
                          <p className="text-center text-gray-500 text-sm">
                            Start adding Competition to track your progress.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="">
                      {selectedPeriodization[field].transition ? (
                        <div className="p-4 rounded-xl border shadow-lg mx-4">
                          <div className="flex justify-between items-center py-2">
                            <div className="flex items-center gap-2 font-semibold text-xl">
                              <IoMdCheckboxOutline className="text-2xl" />
                              <span>Transition</span>
                            </div>
                            <span className="text-gray-500">
                              {
                                selectedPeriodization[field].transition
                                  .allocatedTime
                              }{" "}
                              {selectedPeriodization[field].transition.timeType}
                            </span>
                          </div>
                          <Progress value={1} className="h-1" />
                        </div>
                      ) : (
                        <div className="flex flex-col border shadow-lg rounded-xl mx-4 p-2 items-center justify-center">
                          <IoMdHourglass className="text-2xl font-bold text-primary" />
                          <h1 className="text-center font-semibold text-gray-600">
                            No Transition Added
                          </h1>
                          <p className="text-center text-gray-500 text-sm">
                            Start adding a Transition to track your progress.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {selectedPeriodization[field].competition?.tournaments ??
                    "No data available"} */}
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-center mt-1 ">
                    <button
                      onClick={() => {
                        setSelectedPhase(null);
                        setIsOpen(true);
                      }}
                      className="py-1 px-4 rounded-full shadow-lg border text-primary font-medium hover:bg-primary hover:text-white"
                    >
                      Add Phase
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <DatePickerDialog
        setIsOpen={setIsDatePickerOpen}
        isOpen={isDatePickerOpen}
        onConfirm={handleConfirm}
        date={date}
        setDate={setDate}
      />

      <AddPhaseDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialData={selectedPhase}
      />
    </div>
  );
}

export default Periodizations;

{
  /* <DialogFooter>
                {onEdit ? (
                  <div className="flex gap-4 w-full">
                    <button
                      className="py-2 px-4 rounded-lg w-full text-white bg-primary border border-white hover:bg-orange-500 flex items-center justify-center "
                      // onClick={() => updateAnnouncement()}
                    >
                      {updateAnnouncementMut.isLoading ? (
                        <LoaderCircle
                          style={{
                            animation: "spin 1s linear infinite",
                            fontSize: "2rem",
                            color: "#FFFFFF",
                          }}
                        />
                      ) : (
                        <span>Update</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className="py-2 px-4 rounded-lg w-full text-white bg-red-600 border border-white hover:bg-red-400 flex items-center justify-center "
                      onClick={deleteAnnouncement}
                    >
                      {deleteAnnouncemen.isLoading ? (
                        <LoaderCircle
                          style={{
                            animation: "spin 1s linear infinite",
                            fontSize: "2rem",
                            color: "#FFFFFF",
                          }}
                        />
                      ) : (
                        <span>Delelte</span>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 w-full">
                    <button
                      className="py-2 px-4 rounded-lg w-full text-white bg-primary border border-white hover:bg-orange-500 flex items-center justify-center "
                      onClick={() => setIsOpen(true)}
                    >
                      {isLoading ? (
                        <LoaderCircle
                          style={{
                            animation: "spin 1s linear infinite",
                            fontSize: "2rem",
                            color: "#FFFFFF",
                          }}
                        />
                      ) : (
                        <span> Create Announcement</span>
                      )}
                    </button>
                  </div>
                )}
              </DialogFooter> */
}
