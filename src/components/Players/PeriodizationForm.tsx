import { useEffect, useId, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IoTimeSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

import { NewPreparation } from "./Periodizations";
import { useMutation, useQueryClient } from "react-query";
import {
  createCompetition,
  createPreparation,
  createTransition,
  deleteCompetition,
  deletePreparation,
  deleteTransition,
  editCompetition,
  editPreparation,
  editTransition,
} from "@/api/match.api";
import { toast } from "react-toastify";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import {
  CoachGoal,
  CompetitionPayload,
  CompetitionPayloadDelete,
  FieldType,
  PreparationPayload,
  PreparationPayloadDelete,
  TransitionPayload,
  TransitionPayloadDelete,
} from "@/types/children.type";
import { LoaderCircle } from "lucide-react";
import Cookies from "js-cookie";
import { extractDateTime } from "@/lib/utils";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRole } from "@/RoleContext";
import { Role } from "@/types/auth.type";

// Define TypeScript Interfaces for Backend Compatibility

// Define Zod Schema
const FormSchema = z.object({
  for: z.enum(["preparation", "competition", "transition"]),
  allocatedTime: z.string().min(1, "Time must be at least 1"),
  timeType: z.enum(["days", "weeks", "months"]),
  generals: z.array(z.string()).optional(),
  specifics: z.array(z.string()).optional(),
  specificDescriptions: z.array(z.string()).optional(),
  precompetitions: z.array(z.string()).optional(),
  tournaments: z.array(z.string()).optional(),
  activeRest: z.array(z.string()).optional(),
});
type FormValues = z.infer<typeof FormSchema>;

interface AddPhaseDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData?: any;
  setSelectedPhase?: React.Dispatch<React.SetStateAction<any | null>>;
  playerId: string;
  periodizationId: string;
  forType: FieldType | undefined;
  coachGoals: CoachGoal[];
}

export default function AddPhaseDialog({
  isOpen,
  setIsOpen,
  initialData,
  setSelectedPhase,
  playerId,
  periodizationId,
  forType,
  coachGoals,
}: AddPhaseDialogProps) {
  const [phase, setPhase] = useState<
    "preparation" | "competition" | "transition" | undefined
  >(undefined);
  const [addGoal, setAddGoal] = useState(false);
  const user_id = Cookies.get("user_id");
  const { role } = useRole();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      for: undefined,
      allocatedTime: "1",
      timeType: "days",
      generals: [],
      specifics: [],
      specificDescriptions: [],
      precompetitions: [],
      tournaments: [],
      activeRest: [],
    },
  });

  useEffect(() => {
    if (initialData && isOpen) {
      form.reset(initialData);
      form.setValue("allocatedTime", initialData?.allocatedTime.toString());
      setPhase(initialData.for);
      if (initialData.specifics?.length > 0) {
        setSelectedGoals(initialData.specifics.map((item: any) => item?._id));
        setAddGoal(true);
      }
    }
  }, [initialData, form]);

  const queryClient = useQueryClient();

  const createPreparationMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: PreparationPayload;
    }) => createPreparation(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const editPreparationMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: PreparationPayload;
    }) => editPreparation(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const deletePreparationMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: PreparationPayloadDelete;
    }) => deletePreparation(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const createCompetitionMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: CompetitionPayload;
    }) => createCompetition(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const editCompetitionMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: CompetitionPayload;
    }) => editCompetition(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const deleteCompetitionMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: CompetitionPayloadDelete;
    }) => deleteCompetition(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const createTransitionMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: TransitionPayload;
    }) => createTransition(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const editTransitionMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: TransitionPayload;
    }) => editTransition(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const delteTransitionMutation = useMutation(
    ({
      playerId,
      periodizationId,
      payload,
    }: {
      playerId: string;
      periodizationId: string;
      payload: TransitionPayloadDelete;
    }) => deleteTransition(playerId, periodizationId, payload),
    {
      onSuccess: (response) => {
        toast.success(getAxiosSuccessMessage(response));
        queryClient.invalidateQueries("getPlayerPeriodizations");
        resetForm();
      },
      onError: (error) => {
        toast.error(getAxiosErrorMessage(error));
      },
    }
  );

  const isLoading =
    createPreparationMutation.isLoading ||
    createCompetitionMutation.isLoading ||
    createTransitionMutation.isLoading ||
    editCompetitionMutation.isLoading ||
    editTransitionMutation.isLoading ||
    editPreparationMutation.isLoading;

  const isDeleteLoading =
    deleteCompetitionMutation.isLoading ||
    deletePreparationMutation.isLoading ||
    deleteCompetitionMutation.isLoading;

  const onSubmit = (data: FormValues) => {
    if (!forType) {
      return;
    }

    if (initialData) {
      if (phase === "preparation") {
        editPreparationMutation.mutate({
          playerId: playerId,
          periodizationId: periodizationId,
          payload: {
            preparationType: forType,
            preparation: {
              allocatedTime: parseInt(data.allocatedTime),
              timeType: data.timeType,
              generals: data.generals ?? [],
              specifics: selectedGoals ?? [],
              specificDescriptions: data.specificDescriptions ?? [],
            },
          },
        });
      } else if (phase === "competition") {
        editCompetitionMutation.mutate({
          playerId: playerId,
          periodizationId: periodizationId,
          payload: {
            competitionType: forType,
            competition: {
              allocatedTime: parseInt(data.allocatedTime),
              timeType: data.timeType,
              precompetitions: data.precompetitions ?? [],
              tournaments: data.tournaments ?? [],
            },
          },
        });
      } else if (phase === "transition") {
        editTransitionMutation.mutate({
          playerId: playerId,
          periodizationId: periodizationId,
          payload: {
            transitionType: forType,
            transition: {
              allocatedTime: parseInt(data.allocatedTime),
              timeType: data.timeType,
              activeRest: data.activeRest ?? [],
            },
          },
        });
      }
    } else {
      if (phase === "preparation") {
        createPreparationMutation.mutate({
          playerId: playerId,
          periodizationId: periodizationId,
          payload: {
            preparationType: forType,
            preparation: {
              allocatedTime: parseInt(data.allocatedTime),
              timeType: data.timeType,
              generals: data.generals ?? [],
              specifics: selectedGoals ?? [],
              specificDescriptions: data.specificDescriptions ?? [],
            },
          },
        });
      } else if (phase === "competition") {
        createCompetitionMutation.mutate({
          playerId: playerId,
          periodizationId: periodizationId,
          payload: {
            competitionType: forType,
            competition: {
              allocatedTime: parseInt(data.allocatedTime),
              timeType: data.timeType,
              precompetitions: data.precompetitions ?? [],
              tournaments: data.tournaments ?? [],
            },
          },
        });
      } else if (phase === "transition") {
        createTransitionMutation.mutate({
          playerId: playerId,
          periodizationId: periodizationId,
          payload: {
            transitionType: forType,
            transition: {
              allocatedTime: parseInt(data.allocatedTime),
              timeType: data.timeType,
              activeRest: data.activeRest ?? [],
            },
          },
        });
      }
    }
  };

  const onDelete = () => {
    if (phase === "preparation" && forType) {
      deletePreparationMutation.mutate({
        playerId,
        periodizationId,
        payload: { preparationType: forType },
      });
    }
    if (phase === "competition" && forType) {
      deleteCompetitionMutation.mutate({
        playerId,
        periodizationId,
        payload: { competitionType: forType },
      });
    }
    if (phase === "transition" && forType) {
      delteTransitionMutation.mutate({
        playerId,
        periodizationId,
        payload: { transitionType: forType },
      });
    }
  };
  const onError = (error: any) => {
    console.log("eeeeeeeeeeeee", error);
  };

  const [coachGoal, setcoachGoal] = useState<CoachGoal | undefined>(undefined);
  const [selectedGoals, setSelectedGoals] = useState<string[] | undefined>(
    undefined
  );

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((pres) => {
      if (pres?.includes(goalId)) {
        return pres.filter((pre) => pre !== goalId);
      } else {
        return pres ? [...pres, goalId] : [goalId];
      }
    });
  };

  useEffect(() => {
    const coachGoal = coachGoals.find(
      (coachGoal) => coachGoal.coach._id === user_id
    );
    setcoachGoal(coachGoal);
  }, [useId, coachGoals]);

  const resetForm = () => {
    form.reset({
      for: undefined,
      allocatedTime: "1",
      timeType: "days",
      generals: [],
      specificDescriptions: [],
    });
    setPhase(undefined);
    setSelectedPhase && setSelectedPhase(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-lg">
          {initialData ? "Edit Phase" : "Add Phase"}
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            {/* Phase Selector */}
            <FormField
              control={form.control}
              name="for"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>For</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setPhase(
                        value as "preparation" | "competition" | "transition"
                      );
                    }}
                    value={field.value}
                    disabled={role !== "coach"}
                  >
                    <SelectTrigger className="shadow !h-10 !py-4 !px-4 !bg-white !text-black">
                      <SelectValue
                        placeholder="Select Phase"
                        className="!text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preparation">Preparation</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="transition">Transition</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Allocation */}
            <h1 className="text-xl text-primary font-semibold my-2">
              Time Allocation
            </h1>
            <FormField
              control={form.control}
              name="allocatedTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Allocate Time{" "}
                    <IoTimeSharp className="text-xl text-primary" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Time"
                      className="shadow !bg-white"
                      {...field}
                      disabled={role !== "coach"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={role !== "coach"}
                  >
                    <SelectTrigger className="shadow !h-10 !py-4 !px-4 !bg-white !text-black">
                      <SelectValue
                        placeholder="Select Time Type"
                        className="!text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Inputs Based on Phase */}
            {phase === "preparation" && (
              <>
                <DynamicList
                  name="generals"
                  label="Objectives"
                  form={form}
                  role={role}
                />
                <DynamicList
                  name="specificDescriptions"
                  label="Specific Descriptions"
                  form={form}
                  role={role}
                />
                <div
                  className="text-primary font-semibold cursor-pointer text-center flex gap-4 items-center justify-center"
                  onClick={() => setAddGoal((pre) => !pre)}
                >
                  Add Player Goal{" "}
                  {addGoal ? (
                    <IoIosArrowUp className="text-primary text-lg" />
                  ) : (
                    <IoIosArrowDown className="text-primary text-lg" />
                  )}
                </div>
                {addGoal && coachGoal && (
                  <div>
                    {coachGoal.goals.map((goal) => (
                      <div
                        className={`my-2 border py-1 px-2  rounded-lg hover:border-primary cursor-pointer ${
                          selectedGoals?.includes(goal._id)
                            ? "bg-primary text-white"
                            : "bg-white text-black"
                        }`}
                        onClick={() => toggleGoal(goal._id)}
                      >
                        <h1 className="font-semibold">{goal.description}</h1>
                        <p className="text-sm">
                          <span className="font-medium">Goal Type</span>:{" "}
                          <span>{goal.goal}</span>{" "}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Goal Term</span>:{" "}
                          <span>{goal.term}</span>{" "}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Achievement Date</span>:{" "}
                          <span>
                            {extractDateTime(goal.achievementDate)?.date}
                          </span>{" "}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {phase === "competition" && (
              <>
                <DynamicList
                  name="precompetitions"
                  label="Pre-Competitions"
                  form={form}
                  role={role}
                />
                <DynamicList
                  name="tournaments"
                  label="Tournaments"
                  form={form}
                  role={role}
                />
              </>
            )}
            {phase === "transition" && (
              <>
                <DynamicList
                  name="activeRest"
                  label="Active Rest Activities"
                  form={form}
                  role={role}
                />
              </>
            )}

            <div className="flex justify-end items-center">
              {role && role === "coach" && (
                <div className="flex items-center gap-4">
                  {initialData && (
                    <button
                      type="button"
                      className="bg-red-400 flex gap-4 text-white px-4 py-2 rounded"
                      onClick={() => onDelete()}
                    >
                      Delete
                      {isDeleteLoading && (
                        <LoaderCircle
                          style={{
                            animation: "spin 1s linear infinite",
                            fontSize: "2rem",
                            color: "#FFFFFF",
                          }}
                        />
                      )}
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-primary flex gap-4 text-white px-4 py-2 rounded"
                  >
                    {initialData ? "Update" : "Submit"}
                    {isLoading && (
                      <LoaderCircle
                        style={{
                          animation: "spin 1s linear infinite",
                          fontSize: "2rem",
                          color: "#FFFFFF",
                        }}
                      />
                    )}
                  </button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Helper Component for Dynamic Lists
interface DynamicListProps {
  name: keyof FormValues;
  label: string;
  form: ReturnType<typeof useForm<FormValues>>;
  role: Role | null;
}

export function DynamicList({ name, label, form, role }: DynamicListProps) {
  const fieldValue = form.watch(name) || []; // Watch field value to trigger re-renders
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const onAddOrUpdate = () => {
    if (!inputValue.trim()) return;

    if (editIndex !== null) {
      // Update existing item
      const updatedList = [...fieldValue];
      updatedList[editIndex] = inputValue.trim();
      form.setValue(name, updatedList);
      setEditIndex(null);
    } else {
      // Add new item
      form.setValue(name, [...fieldValue, inputValue.trim()]);
    }

    setInputValue(""); // Clear input field
  };

  const onEdit = (index: number) => {
    if (editIndex !== null && inputValue.trim()) {
      // Save previous edit before switching
      const updatedList = [...fieldValue];
      updatedList[editIndex] = inputValue.trim();
      form.setValue(name, updatedList);
    }

    setEditIndex(index);
    setInputValue(fieldValue[index]); // Populate input field with selected item
  };

  const onDelete = (index: number) => {
    if (!Array.isArray(fieldValue)) {
      return;
    }
    const updatedList = fieldValue.filter((_, i) => i !== index);
    form.setValue(name, updatedList);
    setEditIndex(null); // Reset edit mode if deleting the currently edited item
  };

  const onBlur = () => {
    if (inputValue.trim()) {
      onAddOrUpdate(); // Automatically save input when losing focus
    }
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <FormField
            control={form.control}
            name={name}
            render={() => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={label}
                    className="shadow w-full bg-white"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={role !== "coach"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onAddOrUpdate();
                      }
                    }}
                    onBlur={onBlur} // Save automatically on blur
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FaCirclePlus
          className="text-2xl flex-none mb-2 text-primary cursor-pointer"
          onClick={onAddOrUpdate}
        />
      </div>

      {/* List of added items with Edit & Delete */}
      <ul className="mt-2 space-y-2">
        {Array.isArray(fieldValue) &&
          fieldValue.map((item: string, index: number) => (
            <li
              key={index}
              className={`flex items-center justify-between px-3 py-2 rounded-md ${
                editIndex === index ? "bg-[#fff6ec]" : "bg-gray-100"
              }`}
            >
              <span className="flex-1">{item}</span>

              {role && role === "coach" && (
                <div className="flex gap-2">
                  <FiEdit2
                    className="cursor-pointer text-base"
                    onClick={() => onEdit(index)}
                  />
                  <AiOutlineDelete
                    className="text-red-500 text-xl cursor-pointer"
                    onClick={() => onDelete(index)}
                  />
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
