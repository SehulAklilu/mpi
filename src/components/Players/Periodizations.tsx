import {
  createPlayerPeriodizations,
  deletePlayerPeriodizations,
  editPlayerPeriodizations,
  getPlayerPeriodizations,
} from "@/api/match.api";
import { formatDateTime } from "@/lib/utils";
import {
  CoachGoal,
  FieldType,
  Periodization,
  Preparation,
} from "@/types/children.type";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import { SelectLabel } from "@radix-ui/react-select";
import { useRole } from "@/RoleContext";

export interface NewPreparation extends Preparation {
  for: string; // Allows flexibility if needed
}

function Periodizations({
  playerId,
  coachGoals,
}: {
  playerId: string;
  coachGoals: CoachGoal[];
}) {
  const { role } = useRole();
  const [onEdit, setOnEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<FieldType | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["getPlayerPeriodizations"],
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

  const [selectedPhase, setSelectedPhase] = useState<any | null>(null);

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

  const createSOT = useMutation({
    mutationKey: ["createSOT", playerId],
    mutationFn: ({ playerId, payload }: { playerId: string; payload: any }) =>
      createPlayerPeriodizations(playerId, payload),
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries("getPlayerPeriodizations");
      setIsDatePickerOpen(false);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const editSOT = useMutation({
    mutationKey: ["editSOT", playerId, selectedPeriodizationId],
    mutationFn: ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: any;
    }) => editPlayerPeriodizations(playerId, periodizationId, payload),
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries("getPlayerPeriodizations");
      setIsDatePickerOpen(false);
      setOnEdit(false);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const deleteSOT = useMutation({
    mutationKey: ["deleteSOT", playerId, selectedPeriodizationId],
    mutationFn: ({
      playerId,
      periodizationId,
    }: {
      playerId: string;
      periodizationId: string;
    }) => deletePlayerPeriodizations(playerId, periodizationId),
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries("getPlayerPeriodizations");
      setIsDatePickerOpen(false);
      setOnEdit(false);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const handleConfirm = (dates: { startDate: Date; endDate: Date }) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const payload = {
      startingDate: dates.startDate,
      endingDate: dates.endDate,
      timezone: timeZone,
    };
    if (onEdit) {
      editSOT.mutate({
        playerId,
        periodizationId: selectedPeriodizationId,
        payload,
      });
      return;
    }
    createSOT.mutate({ playerId, payload: payload });
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
        {role && role === "coach" && (
          <>
            <div className="w-10 h-10 flex  flex-none items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
              <MdEdit
                className="text-gray-600 text-xl"
                onClick={() => {
                  setDate({
                    from: selectedPeriodization?.startingDate
                      ? new Date(selectedPeriodization.startingDate)
                      : undefined,
                    to: selectedPeriodization?.endingDate
                      ? new Date(selectedPeriodization.endingDate)
                      : undefined,
                  });
                  setIsDatePickerOpen(true);
                  setOnEdit(true);
                }}
              />
            </div>
            <div className="w-10 h-10 flex  flex-none items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
              <MdDelete
                className="text-gray-600 text-xl"
                onClick={() =>
                  deleteSOT.mutate({
                    playerId,
                    periodizationId: selectedPeriodizationId,
                  })
                }
              />
            </div>
            <FaCirclePlus
              className="text-4xl flex-none mb-2 text-primary cursor-pointer"
              onClick={() => {
                setIsDatePickerOpen(true);
              }}
            />
          </>
        )}
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
                            setSelectedField(field);
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
                            No Preparation Added
                          </h1>
                          <p className="text-center text-gray-500 text-sm">
                            Start adding Preparation to track your progress.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="">
                      {selectedPeriodization[field].competition ? (
                        <div
                          className="p-4 rounded-xl border shadow-lg mx-4 cursor-pointer"
                          onClick={() => {
                            setSelectedPhase({
                              for: "competition",
                              allocatedTime:
                                selectedPeriodization[field].competition
                                  ?.allocatedTime ?? 0,
                              timeType:
                                selectedPeriodization[field].competition
                                  ?.timeType ?? "days",
                              precompetitions:
                                selectedPeriodization[field].competition
                                  ?.precompetitions ?? [],
                              tournaments:
                                selectedPeriodization[field].competition
                                  ?.tournaments ?? [],
                            });
                            setSelectedField(field);
                            setIsOpen(true);
                          }}
                        >
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
                        <div
                          className="p-4 rounded-xl border shadow-lg mx-4 cursor-pointer"
                          onClick={() => {
                            setSelectedPhase({
                              for: "transition",
                              allocatedTime:
                                selectedPeriodization[field].transition
                                  ?.allocatedTime ?? 0,
                              timeType:
                                selectedPeriodization[field].transition
                                  ?.timeType ?? "days",
                              activeRest:
                                selectedPeriodization[field].transition
                                  ?.activeRest ?? [],
                            });
                            setSelectedField(field);
                            setIsOpen(true);
                          }}
                        >
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
                  {role && role === "coach" && (
                    <div className="flex items-center justify-center mt-1 ">
                      <button
                        onClick={() => {
                          setSelectedPhase(null);
                          setSelectedField(field);
                          setIsOpen(true);
                        }}
                        className="py-1 px-4 rounded-full shadow-lg border text-primary font-medium hover:bg-primary hover:text-white"
                      >
                        Add Phase
                      </button>
                    </div>
                  )}
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
        setSelectedPhase={setSelectedPhase}
        playerId={playerId}
        periodizationId={selectedPeriodizationId}
        forType={selectedField}
        coachGoals={coachGoals}
      />
    </div>
  );
}

export default Periodizations;
