import React, { useEffect, useState } from "react";
import { string, z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { FiEdit2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";

import { Calendar as CalendarIcon, LoaderCircle } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Goal, GoalPayload } from "@/types/children.type";
import { useMutation, useQueryClient } from "react-query";
import {
  createGoal,
  createPlayerGoal,
  editGoal,
  editPlayerGoal,
} from "@/api/match.api";
import { toast } from "react-toastify";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import Cookies from "js-cookie";
import { useRole } from "@/RoleContext";
// import { useParams } from "react-router-dom";

// Define Zod Schema
const FormSchema = z.object({
  goal: z.enum(["physical", "mental", "technical", "tactical", "nutrition"]),
  term: z.enum(["short", "long", "medium"]),
  description: z.string(),
  measurement: z.string(),
  achievementDate: z.date(),
  actions: z
    .array(
      z.object({
        description: z.string(),
        date: z.date(),
        isDone: z.boolean(),
      })
    )
    .optional(),
  obstacles: z
    .array(
      z.object({
        description: z.string(),
        isOvercome: z.boolean(),
      })
    )
    .optional(),
  addOns: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

interface AddPhaseDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData?: Goal;
  playerId?: string;
  setInitialGoal: React.Dispatch<React.SetStateAction<Goal | undefined>>;
  coachId?: string;
}

export default function PlayerGoalForm({
  isOpen,
  setIsOpen,
  initialData,
  playerId,
  setInitialGoal,
  coachId,
}: AddPhaseDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const user_id = Cookies.get("user_id");
  const { role } = useRole();

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        achievementDate: new Date(initialData.achievementDate), // Convert achievementDate to Date
        actions:
          initialData.actions?.map((action) => ({
            ...action,
            date: new Date(action.date), // Convert action.date to Date
          })) ?? [],
      });
    }
  }, [initialData, form]);

  const createGoalMutaion = useMutation({
    mutationKey: ["createGoal"],
    mutationFn: ({
      playerId,
      coachId,
      payload,
    }: {
      playerId?: string;
      coachId?: string;
      payload: GoalPayload;
    }) => {
      if (playerId) {
        return createPlayerGoal(playerId, payload); // for player goals
      } else if (coachId) {
        return createGoal(coachId, payload); // for coach goals
      }
      throw new Error("Either playerId or coachId must be provided");
    },
    onSuccess: (response) => {
      toast.success(getAxiosSuccessMessage(response));
      setIsOpen(false);
      setInitialGoal(undefined);
      if (playerId) {
        queryClient.invalidateQueries(
          role === "parent" ? ["children", playerId] : ["getPlayer", playerId]
        );
      }

      if (coachId) {
        queryClient.invalidateQueries("myGoals");
      }
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
      setInitialGoal(undefined);
    },
  });

  const editGoalMutation = useMutation({
    mutationKey: ["editGoal"],
    mutationFn: ({
      playerId,
      coachId,
      goalId,
      payload,
    }: {
      playerId?: string;
      coachId?: string;
      goalId: string;
      payload: GoalPayload;
    }) => {
      if (playerId) {
        return editPlayerGoal(playerId, goalId, payload); // for player goal editing
      } else if (coachId) {
        return editGoal(coachId, goalId, payload); // for coach goal editi
      }
      throw new Error("Either playerId or coachId must be provided");
    },
    onSuccess: (response) => {
      toast.success(getAxiosSuccessMessage(response));
      setIsOpen(false);
      setInitialGoal(undefined);
      if (playerId) {
        queryClient.invalidateQueries(
          role === "parent" ? ["children", playerId] : ["getPlayer", playerId]
        );
      }

      if (coachId) {
        queryClient.invalidateQueries("myGoals");
      }
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
      setInitialGoal(undefined);
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("3333333333333", initialData, playerId);
    if (initialData && coachId) {
      editGoalMutation.mutate({
        coachId,
        goalId: initialData._id,
        payload: {
          ...data,
          actions: data?.actions ?? [],
          obstacles: data?.obstacles ?? [],
          addOns: data.addOns ?? null,
        },
      });
    } else if (coachId) {
      createGoalMutaion.mutate({
        coachId,
        payload: {
          ...data,
          actions: data?.actions ?? [],
          obstacles: data?.obstacles ?? [],
          addOns: data.addOns ?? null,
        },
      });
    } else if (initialData && playerId) {
      editGoalMutation.mutate({
        playerId,
        goalId: initialData._id,
        payload: {
          ...data,
          actions: data?.actions ?? [],
          obstacles: data?.obstacles ?? [],
          addOns: data.addOns ?? null,
        },
      });
    } else if (playerId) {
      createGoalMutaion.mutate({
        playerId,
        payload: {
          ...data,
          actions: data?.actions ?? [],
          obstacles: data?.obstacles ?? [],
          addOns: data.addOns ?? null,
        },
      });
    }
  };

  const onError = (error: any) => {
    console.log("eeeeeeeeeeeee", error, initialData);
  };

  useEffect(() => {
    if (!isOpen) {
      form.reset({
        goal: "physical",
        term: "short",
        description: "",
        measurement: "",
        achievementDate: new Date(),
        actions: [],
        obstacles: [],
        addOns: "",
      });
    }
  }, [isOpen, form]);

  const { control } = form;
  const {
    fields: actionFields,
    append: addAction,
    remove: removeAction,
    update: updateAction,
  } = useFieldArray({ control, name: "actions" });

  const {
    fields: obstacleFields,
    append: addObstacle,
    remove: removeObstacle,
    update: updateObstacle,
  } = useFieldArray({ control, name: "obstacles" });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] w-[600px]  overflow-y-auto">
        <DialogTitle className="text-lg">
          {initialData ? "Edit Goal" : "Add Goal"}
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            {/* term Selector */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Term</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="shadow !h-10 !py-4 !px-4 !bg-white !text-black">
                        <SelectValue
                          placeholder="Select Goal Term"
                          className="!text-black"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">short</SelectItem>
                        <SelectItem value="medium">medium</SelectItem>
                        <SelectItem value="long">long</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* gole Selector */}
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="shadow !h-10 !py-4 !px-4 !bg-white !text-black">
                        <SelectValue
                          placeholder="Select Goal Type"
                          className="!text-black"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical</SelectItem>
                        <SelectItem value="mental">Mental</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="tactical">Tactical</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Goal</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="What is your specific goal?"
                        className="shadow !bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="measurement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement Type</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="What metric will you use to measure?"
                        className="shadow !bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="achievementDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full flex gap-2 justify-start text-left font-normal border py-2 bg-white border-[#E5E5E5]  items-center  rounded-md  px-2",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-medium text-primary">
                Actions You Will Take
              </h1>
              <Button
                type="button"
                onClick={() =>
                  addAction({
                    description: "",
                    date: new Date(),
                    isDone: false,
                  })
                }
                className="flex items-center py-2 border border-primary text-primary px-4  gap-4 rounded-xl"
              >
                Add Action <FaCirclePlus />
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {actionFields.map((item: any, index) => (
                <div key={item.id} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <FormLabel>Description</FormLabel>

                    <Input
                      {...form.register(
                        `actions.${index}.description` as const
                      )}
                      placeholder="Describe the action"
                      className="shadow !bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`actions.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full flex flex-1 gap-2 justify-start text-left font-normal border py-2 bg-white border-[#E5E5E5] items-center rounded-md px-2"
                              >
                                <CalendarIcon />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAction(index)}
                    className="text-red-400 mb-2 flex-none"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-medium text-primary">
                Potential Obstacles
              </h1>
              <Button
                type="button"
                onClick={() =>
                  addObstacle({
                    description: "",
                    isOvercome: false,
                  })
                }
                className="flex items-center py-2 border border-primary text-primary px-4  gap-4 rounded-xl"
              >
                Add Obstacle <FaCirclePlus />
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {obstacleFields.map((item: any, index) => (
                <div key={item.id} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <FormLabel>Description</FormLabel>

                    <Input
                      {...form.register(
                        `obstacles.${index}.description` as const
                      )}
                      placeholder="Describe the Obstacle"
                      className="shadow !bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeObstacle(index)}
                    className="text-red-400 mb-2 flex-none"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-primary flex gap-4 text-white px-4 py-2 rounded"
            >
              {initialData ? "Update" : "Submit"}
              {(createGoalMutaion.isLoading || editGoalMutation.isLoading) && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
