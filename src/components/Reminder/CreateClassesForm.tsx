import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios";
import { useEffect, useRef, useState } from "react";
import { useRole } from "@/RoleContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { getPlayers } from "@/api/match.api";
import MultiSelectDropdown from "../MultipleDropDown";
import { TimePicker } from "./TimePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Player } from "@/types/match.type";
import { CoachGoal } from "@/types/children.type";
import Cookies from "js-cookie";

type ObjectiveType =
  | "physical"
  | "technical"
  | "tactics"
  | "mental"
  | "recovery";

type SubObjectiveType = "gameStyle" | "fiveGameSituations";

const AddReminderSchema = z.object({
  date: z.date({
    required_error: "A date and time is required.",
  }),
  levelPlan: z.string({ required_error: "Description is required" }).min(1),
  objectives: z.object({
    objective: z.string(),
    subObjective: z.string(),
    nestedSubObjective: z.string()?.optional(),
  }),
  players: z.array(z.string()),
  to: z.string(),
  goal: z.string()?.optional(),
});

type AddReminderForm = z.infer<typeof AddReminderSchema>;

const AddClasses = ({
  date,
  setDate,
  ref,
}: {
  date: string;
  setDate: Function;
  ref: any;
}) => {
  const form = useForm<AddReminderForm>({
    resolver: zodResolver(AddReminderSchema),
    defaultValues: {
      // date: new Date(date),
      players: [],
      to: "01:00",
    },
  });

  const queryClient = useQueryClient();
  const { role }: any = useRole();

  const objectivesDatas = [
    { value: "physical", label: "Physical" },
    { value: "technical", label: "Technical" },
    { value: "tactics", label: "Tactics" },
    { value: "mental", label: "Mental" },
    { value: "recovery", label: "Recovery" },
  ];

  const subObjectives = {
    physical: [
      { value: "endurance", label: "Endurance" },
      { value: "speed", label: "Speed" },
      { value: "agility", label: "Agility" },
      { value: "flexibility", label: "Flexibility" },
      { value: "coordination", label: "Coordination" },
      { value: "balance", label: "Balance" },
      { value: "recovery", label: "Recovery" },
      { value: "other", label: "Other" },
    ],
    technical: [
      { value: "grips", label: "Grips" },
      { value: "serve", label: "Serve" },
      { value: "return", label: "Return" },
      { value: "forehand", label: "Forehand" },
      { value: "backhand", label: "Backhand" },
      { value: "volley", label: "Volley" },
      { value: "overhead", label: "Overhead" },
      { value: "dropShot", label: "Drop Shot" },
      { value: "lob", label: "Lob" },
      { value: "approachShot", label: "Approach Shot" },
      { value: "passingShot", label: "Passing Shot" },
      { value: "emergencyShots", label: "Emergency Shots" },
    ],
    tactics: [
      { value: "consistency", label: "Consistency" },
      { value: "gamePlan", label: "Game Plan" },
      { value: "gameStyle", label: "Game Style" },
      { value: "fiveGameSituations", label: "Five Game Situations" },
      { value: "anticipation", label: "Anticipation" },
      { value: "percentagePlay", label: "Percentage Play" },
      { value: "reducingUnforcedErrors", label: "Reducing Unforced Errors" },
      { value: "ruleNumberOne", label: "Rule Number One" },
      { value: "workingWeakness", label: "Working Weakness" },
    ],
    mental: [
      { value: "motivation", label: "Motivation" },
      { value: "concentration", label: "Concentration" },
      { value: "emotionRegulation", label: "Emotion Regulation" },
      { value: "selfTalk", label: "Self Talk" },
      { value: "selfConfidence", label: "Self Confidence" },
      { value: "relaxation", label: "Relaxation" },
      { value: "routine", label: "Routine" },
      { value: "goalSetting", label: "Goal Setting" },
      { value: "mindfulness", label: "Mindfulness" },
      { value: "momentum", label: "Momentum" },
    ],
    recovery: [
      { value: "sleep", label: "Sleep" },
      { value: "coldTherapy", label: "Cold Therapy" },
      { value: "mental", label: "Mental" },
      { value: "nutrition", label: "Nutrition" },
      { value: "hydration", label: "Hydration" },
      { value: "physical", label: "Physical" },
    ],
  };

  const tacticalSubObjectives = {
    fiveGameSituations: [
      { value: "serving", label: "Serving" },
      { value: "returning", label: "Returning" },
      { value: "rallyingFromTheBaseline", label: "Rallying From The Baseline" },
      { value: "passing", label: "Passing" },
      { value: "approachingVolleying", label: "Approaching & Volleying" },
    ],
    gameStyle: [
      { value: "serveAndVolley", label: "Serve and Volley" },
      { value: "aggressiveBaseLiner", label: "Aggressive Baseline" },
      { value: "counterPuncher", label: "Counter Puncher" },
      { value: "allAround", label: "All-Around" },
    ],
  };

  const [selectedObjective, setSelectedObjective] = useState<
    ObjectiveType | undefined
  >(undefined);

  const [selectedSubObjective, setSelectedSubObjective] = useState<
    SubObjectiveType | undefined
  >(undefined);

  const [coachGoal, setcoachGoal] = useState<CoachGoal | undefined>(undefined);

  const { isLoading, mutate } = useMutation(
    (data: any) => axios.post("/api/v1/classes", data),
    {
      onSuccess() {
        toast.success("Reminder added successfully");
        queryClient.invalidateQueries("classes");
        setDate("");
      },
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data.message ?? "Unable to add reminder"
        );
      },
    }
  );

  const { data: players } = useQuery({
    queryKey: ["player"],
    queryFn: () => getPlayers("players"),
  });

  const onSubmit = (data: AddReminderForm) => {
    const pickedDate = new Date(data.date);
    const utcDate = new Date(
      pickedDate.getTime() - pickedDate.getTimezoneOffset() * 60000
    );
    mutate({ ...data, date: utcDate.toISOString() });
  };

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = form.getValues("date") || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    form.setValue("date", newDate);
  }

  const user_id = Cookies.get("user_id");

  const selectedPlayers = form.watch("players");

  useEffect(() => {
    if (selectedPlayers?.length === 1) {
      const selectedPlayer = selectedPlayers[0];

      const player = players?.players.find((p) => p._id === selectedPlayer);

      const coachGoals = player?.coachGoals ?? [];

      const coachGoal = coachGoals.find((goal) => goal.coach._id === user_id);
      setcoachGoal(coachGoal);
    }
    if (selectedPlayers?.length > 1) {
      setcoachGoal(undefined);
    }
  }, [form, players, user_id, selectedPlayers]);

  useEffect(() => {
    function func() {
      date && form.setValue("date", new Date(date));
    }
    func();

    return () => {};
  }, [date]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="levelPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    className="resize-none !bg-white w-full border rounded-md p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormField
              control={form.control}
              name="objectives.objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ojective</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedObjective(value as ObjectiveType);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="capitalize"
                        placeholder="Select Ojective"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {objectivesDatas.map((objective) => (
                        <SelectItem
                          key={objective.value}
                          value={objective.value}
                          className="capitalize"
                        >
                          {objective.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedObjective && (
              <FormField
                control={form.control}
                name="objectives.subObjective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Objective</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (
                          value === "gameStyle" ||
                          value === "fiveGameSituations"
                        ) {
                          setSelectedSubObjective(value);
                        } else {
                          setSelectedSubObjective(undefined);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          className="capitalize"
                          placeholder="Select Sub Objective"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {subObjectives[selectedObjective].map((objective) => (
                          <SelectItem
                            key={objective.value}
                            value={objective.value}
                            className="capitalize"
                          >
                            {objective.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedSubObjective && (
              <FormField
                control={form.control}
                name="objectives.nestedSubObjective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nested Sub Objective</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          className="capitalize"
                          placeholder="Select Nested Sub Objective"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {tacticalSubObjectives[selectedSubObjective].map(
                          (objective) => (
                            <SelectItem
                              key={objective.value}
                              value={objective.value}
                              className="capitalize"
                            >
                              {objective.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div>
            <label
              className={
                form.formState.errors?.players
                  ? "text-red-500 font-medium text-sm"
                  : "text-black font-medium text-sm"
              }
            >
              Add players
            </label>

            <Controller
              name="players"
              control={form.control}
              rules={{ required: "At least one player is required" }}
              render={({ field }) => (
                <MultiSelectDropdown
                  control={form.control}
                  name="players"
                  options={
                    players
                      ? players.players.map((player) => ({
                          value: player._id,
                          label: player.firstName,
                          image: player.avatar,
                        }))
                      : []
                  }
                />
              )}
            />

            {form.formState.errors?.players && (
              <small className="text-red-500">
                {form.formState.errors.players.message}
              </small>
            )}
          </div>

          {coachGoal && (
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue
                        className="capitalize"
                        placeholder="Select a type"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {coachGoal?.goals?.map((goal) => (
                        <SelectItem
                          key={goal._id}
                          value={goal._id}
                          className="capitalize"
                        >
                          {goal.goal} : {goal.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="w-full py-1">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Training Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full flex items-center justify-start pl-3 text-left border py-2 rounded-lg font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy hh:mm aa")
                            ) : (
                              <span>MM/DD/YYYY</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        side="bottom"
                        className="w-auto p-0"
                      >
                        <div className="sm:flex">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                            initialFocus
                          />
                          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            <ScrollArea className="w-24 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from(
                                  { length: 12 },
                                  (_, i) => i + 1
                                ).map((hour) => (
                                  <button
                                    key={hour}
                                    className={`shrink-0 aspect-square p-2 rounded-sm
                                  ${
                                    field.value &&
                                    (field.value.getHours() % 12 || 12) === hour
                                      ? "bg-primary text-white"
                                      : ""
                                  }`}
                                    onClick={() =>
                                      handleTimeChange("hour", hour.toString())
                                    }
                                  >
                                    {hour}
                                  </button>
                                ))}
                              </div>
                            </ScrollArea>

                            <ScrollArea className="w-24 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from(
                                  { length: 12 },
                                  (_, i) => i * 5
                                ).map((minute) => (
                                  <button
                                    key={minute}
                                    className={`sm:w-full shrink-0 aspect-square p-2 rounded-sm
                                    ${
                                      field.value &&
                                      field.value.getMinutes() === minute
                                        ? "bg-primary text-white"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleTimeChange(
                                        "minute",
                                        minute.toString()
                                      )
                                    }
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </button>
                                ))}
                              </div>
                            </ScrollArea>

                            <ScrollArea className="w-20 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {["AM", "PM"].map((ampm) => (
                                  <button
                                    key={ampm}
                                    className={`sm:w-full shrink-0 aspect-square p-2 rounded-sm 
                                        ${
                                          field.value &&
                                          ((ampm === "AM" &&
                                            field.value.getHours() < 12) ||
                                            (ampm === "PM" &&
                                              field.value.getHours() >= 12))
                                            ? "bg-primary text-white"
                                            : ""
                                        }`}
                                    onClick={() =>
                                      handleTimeChange("ampm", ampm)
                                    }
                                  >
                                    {ampm}
                                  </button>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Duration</FormLabel>
                  <FormControl>
                    <TimePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          onClick={() => {}}
          className="flex my-5  w-full bg-primary py-2 shadow rounded-3xl px-12 items-center justify-center gap-2 text-white border border-gray-300"
        >
          {isLoading ? (
            <LoaderCircle
              style={{
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            "Create Schedule"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddClasses;
