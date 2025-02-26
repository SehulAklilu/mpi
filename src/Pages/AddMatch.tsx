import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MatchNav from "@/components/Matches/MatchNav";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import { cn, extractUsers } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import { DateTimePicker24hForm } from "@/components/ui/dateTimePicker";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { useMutation, useQuery } from "react-query";
import { createMatch, getPlayers } from "@/api/match.api";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { useRole } from "@/RoleContext";
import { getFriends } from "@/api/chat.api";
import Cookies from "js-cookie";
import { Player } from "@/types/children.type";
import { ProfileDataInterface } from "@/components/Chat/PeopleComponent";

const AddMatch = () => {
  const [playerOne, setPlayerOne] = useState(true);
  const [playerTwo, setPlayerTwo] = useState(true);
  const [isTournament, setIsTournament] = useState(false);
  const { role } = useRole();
  const user_id = Cookies.get("user_id");

  const FormSchema = useMemo(
    () =>
      z.object({
        date: z.date({
          required_error: "A date and time is required.",
        }),
        p1:
          role === "player"
            ? z.string().optional()
            : playerOne
            ? z.string().min(1, "Required")
            : z.string().optional(),
        p2: playerTwo ? z.string().min(1, "Required") : z.string().optional(),
        p1IsObject: z.boolean(),
        p2IsObject: z.boolean(),
        p1Name:
          role === "player"
            ? z.string().optional()
            : !playerOne
            ? z.string().min(1, "Required")
            : z.string().optional(),
        p2Name: !playerTwo
          ? z.string().min(1, "Required")
          : z.string().optional(),
        matchType: z.string(),
        matchCategory: z.string(),
        tieBreakRule: z.string(),
        courtSurface: z.string(),
        tournamentLevel: isTournament
          ? z.string().min(1, "Required")
          : z.string().optional(),
        tournamentType: isTournament
          ? z.string().min(1, "Required")
          : z.string().optional(),
        indoor: z.boolean(),
        note: z.string().optional(),
      }),
    [playerOne, playerTwo, isTournament, role]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      p2IsObject: true,
      p1IsObject: true,
      p1Name: "",
      p2Name: "",
      matchType: "three",
      tieBreakRule: "7",
      matchCategory: "practice",
      indoor: false,
      courtSurface: "clay",
    },
  });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("date", date);
    }
  }

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

  const type =
    role === "coach" ? "players" : role === "parent" ? "children" : "";

  const {
    data: players,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["player"],
    queryFn: () => getPlayers(type), // Pass the correct type based on role
  });

  const { data: friends_data } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
    enabled: role === "player",
  });

  const friends =
    friends_data && user_id ? extractUsers(friends_data, user_id) : null;

  // /apiv1/users/players /children

  useEffect(() => {
    if (role && role === "player" && user_id) {
      form.setValue("p1", user_id);
    }
  }, [role, user_id]);

  const matchTypes = [
    { value: "one", label: "1 set" },
    { value: "three", label: "2 out of 3" },
    { value: "five", label: "3 out of 5" },
  ];

  const [selectedTournamentType, setSelectedTournamentType] =
    useState<string>("");
  const [availableLevels, setAvailableLevels] = useState<string[]>([]);

  const tournamentTypes: {
    ITF: string[];
    "ATP/WTA": string[];
    USTA: string[];
    College: string[];
  } = {
    ITF: [
      "Junior Grand Slams",
      "J500",
      "J300",
      "J200",
      "J100",
      "J60",
      "J30",
      "15k",
      "25K",
      "40K",
      "60K",
      "100K",
      "125K",
    ],
    "ATP/WTA": [
      "Grand Slam",
      "Masters 1000",
      "500",
      "200",
      "Challenge",
      "ATP Cup",
      "ATP Finals",
    ],
    USTA: [
      "Level 1",
      "Level 2",
      "Level 3",
      "Level 4",
      "Level 5",
      "Level 6",
      "Level 7",
      "Junior Circuit",
      "Unsanctioned",
    ],
    College: ["Regular Season", "Conference", "National", "ITA"],
  };

  // Update tournament levels based on selected type
  useEffect(() => {
    if (selectedTournamentType) {
      setAvailableLevels(
        tournamentTypes[
          selectedTournamentType as keyof typeof tournamentTypes
        ] || []
      );
    } else {
      setAvailableLevels([]);
    }
  }, [selectedTournamentType]);

  const onError = (error: any) => {
    console.log("eeeeeeeeeeee", error);
  };

  const p1IsObjectChanged = (checked: boolean) => {
    if (!checked) {
      form.setValue("p1", "");
      form.setValue("p1Name", "");
      setPlayerOne(checked);
    }
  };

  const p2IsObjectChanged = (checked: boolean) => {
    if (!checked) {
      form.setValue("p2", "");
      form.setValue("p2Name", "");
      setPlayerTwo(checked);
    }
  };

  const createMatchMut = useMutation({
    mutationKey: ["createMatch"],
    mutationFn: createMatch,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Loop through the data and replace empty strings with null
    const modifiedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    createMatchMut.mutate(modifiedData);
  }

  return (
    <ContentLayout>
      <div className="flex flex-col pt-5 bg-white px-6 max-md:px-3 pb-12  w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-y-8 gap-5 mt-8 pb-12">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">01</div>
                  </div>
                  <div className="font-semibold">Select Players</div>
                </div>
                <div className="grid grid-cols-2 gap-x-2 ">
                  <div>
                    {form.watch("p1IsObject") ? (
                      <FormField
                        control={form.control}
                        name="p1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Player One{" "}
                              {role && role === "player" ? "YOU" : ""}{" "}
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                                players?.players?.length === 1 &&
                                  form.setValue("p2IsObject", false);
                              }}
                              value={field.value ?? undefined}
                              disabled={
                                role === "player" ||
                                role === null ||
                                role === undefined
                              }
                            >
                              <SelectTrigger className="!w-full flex-1 !py-2 shadow">
                                <SelectValue placeholder="Select Player" />
                              </SelectTrigger>
                              <SelectContent>
                                {players?.players
                                  .filter(
                                    (player) => player._id !== form.watch("p2")
                                  ) // Exclude selected p2
                                  .map((player) => (
                                    <SelectItem
                                      value={player._id}
                                      key={player._id}
                                    >
                                      <div className="flex items-center gap-x-2">
                                        <img
                                          src={player.avatar}
                                          className="w-8 h-8 rounded-full object-cover"
                                          alt={`${player.firstName} ${player.lastName}`}
                                        />
                                        <p>
                                          {player.firstName} {player.lastName}
                                        </p>
                                      </div>
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="p1Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Player One Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Player One Name"
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="p1IsObject"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-end gap-6  p-3">
                          <div className="">
                            <FormLabel className="cursor-pointer ">
                              My Player
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Checkbox
                              checked={field.value} // Bind the checkbox to the form value
                              className="p-2"
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                p1IsObjectChanged(checked as boolean);
                              }}
                              disabled={
                                role === "player" ||
                                role === null ||
                                role === undefined
                              }
                              // Update the form state on change
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    {form.watch("p2IsObject") ? (
                      <FormField
                        control={form.control}
                        name="p2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Player Two</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                                players?.players?.length === 1 &&
                                  form.setValue("p1IsObject", false);
                              }}
                              value={field.value ?? undefined}
                            >
                              <SelectTrigger className="!w-full flex-1 !py-2 shadow">
                                <SelectValue placeholder="Select Player" />
                              </SelectTrigger>
                              <SelectContent>
                                {(role === "player"
                                  ? friends
                                  : players?.players
                                )
                                  ?.filter((player) => {
                                    // Check for the player type and filter accordingly
                                    if ("user_id" in player) {
                                      // If it's a friend (ProfileDataInterface), use user_id
                                      return (
                                        player.user_id !== form.watch("p1")
                                      );
                                    }
                                    // If it's a player (Player), use _id
                                    return player._id !== form.watch("p1");
                                  })
                                  .map((player) => {
                                    // Check if player is of type Player
                                    const isPlayer = (
                                      player: Player | ProfileDataInterface
                                    ): player is Player => "_id" in player;

                                    // Get the correct identifier (_id or user_id)
                                    const playerId = isPlayer(player)
                                      ? player._id
                                      : (player as ProfileDataInterface)
                                          .user_id;

                                    return (
                                      <SelectItem
                                        value={playerId}
                                        key={playerId}
                                      >
                                        <div className="flex items-center gap-x-2">
                                          {/* Check the type and render accordingly */}
                                          <img
                                            src={
                                              isPlayer(player)
                                                ? player.avatar
                                                : (
                                                    player as ProfileDataInterface
                                                  ).profilePicture
                                            }
                                            className="w-8 h-8 rounded-full object-cover"
                                            alt={`${
                                              isPlayer(player)
                                                ? player.firstName
                                                : (
                                                    player as ProfileDataInterface
                                                  ).name
                                            }`}
                                          />
                                          <p>
                                            {isPlayer(player)
                                              ? `${player.firstName} ${player.lastName}`
                                              : (player as ProfileDataInterface)
                                                  .name}
                                          </p>
                                        </div>
                                      </SelectItem>
                                    );
                                  })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="p2Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Player Two Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Player Two Name"
                                className="bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="p2IsObject"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-end gap-6  p-3">
                          <div className="">
                            <FormLabel className="cursor-pointer ">
                              My Player
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Checkbox
                              checked={field.value} // Bind the checkbox to the form value
                              className="p-2"
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                p2IsObjectChanged(checked as boolean);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col  ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">02</div>
                  </div>
                  <div className="font-semibold">Game Time</div>
                </div>
                <div className="w-full md:w-[50%] py-1">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Enter your date & time (12h)</FormLabel>
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
                                  <span>MM/DD/YYYY hh:mm aa</span>
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
                                          handleTimeChange(
                                            "hour",
                                            hour.toString()
                                          )
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
              </div>
              <div className="flex flex-col  ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">03</div>
                  </div>
                  <div className="font-semibold">Match Format</div>
                </div>
                <div className="w-full  md:w-[50%]">
                  <FormField
                    control={form.control}
                    name="matchType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Sets to Win</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value} // Ensure the value is undefined if no value is selected
                        >
                          <SelectTrigger className="!w-full shadow">
                            <SelectValue placeholder="Select Match Format" />
                          </SelectTrigger>
                          <SelectContent>
                            {matchTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col  ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">04</div>
                  </div>
                  <div className="font-semibold">Tie Breaker Rule</div>
                </div>
                <div className="w-full md:w-[50%]">
                  <FormField
                    control={form.control}
                    name="tieBreakRule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points to Break Ties</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="!w-full shadow">
                            <SelectValue placeholder="Select Match Format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">Tiebreak to seven</SelectItem>
                            <SelectItem value="10">Tiebreak to ten</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col  ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">05</div>
                  </div>
                  <div className="font-semibold">Match Category</div>
                </div>
                <div className="w-full md:w-[50%]">
                  <FormField
                    control={form.control}
                    name="matchCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Match Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value); // Update form state
                            setIsTournament(value === "tournament"); // Update local state
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="!w-full shadow">
                            <SelectValue placeholder="Select Match Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="practice">Practice</SelectItem>
                            <SelectItem value="tournament">
                              Tournament
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {isTournament ? (
                <>
                  <div className="flex flex-col  ">
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                        <div className="m-auto text-xl font-semibold">06</div>
                      </div>
                      <div className="font-semibold">Tournament Type</div>
                    </div>
                    <div className="w-full md:w-[50%]">
                      <FormField
                        control={form.control}
                        name="tournamentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Tournament Type</FormLabel>

                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedTournamentType(value); // Set tournament type
                              }}
                              value={field.value}
                            >
                              <SelectTrigger className="!w-full shadow">
                                <SelectValue placeholder="Select Tournament Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ITF">ITF</SelectItem>
                                <SelectItem value="ATP/WTA">ATP/WTA</SelectItem>
                                <SelectItem value="USTA">USTA</SelectItem>
                                <SelectItem value="College">College</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col  ">
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                        <div className="m-auto text-xl font-semibold">07</div>
                      </div>
                      <div className="font-semibold">Tournament Level</div>
                    </div>
                    <div className="w-full md:w-[50%]">
                      <FormField
                        control={form.control}
                        name="tournamentLevel"
                        render={({ field }: any) => (
                          <FormItem>
                            <FormLabel>Select Tournament Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={availableLevels.length === 0} // Disable if no levels are available
                            >
                              <SelectTrigger className="!w-full shadow">
                                <SelectValue placeholder="Select Tournament Level" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableLevels.length > 0 &&
                                  availableLevels.map((level, index) => (
                                    <SelectItem key={index} value={level}>
                                      {level}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              ) : null}

              <div className="flex flex-col  ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">
                      {isTournament ? "08" : "06"}
                    </div>
                  </div>
                  <div className="font-semibold">Surface Type</div>
                </div>
                <div className="w-full md:w-[50%]">
                  <FormField
                    control={form.control}
                    name="courtSurface"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Surface Material</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="!w-full shadow">
                            <SelectValue placeholder="Select Match Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clay">
                              <p>Clay</p>
                            </SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="carpet">Carpet</SelectItem>
                            <SelectItem value="grass">Grass</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col  ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">
                      {isTournament ? "9" : "07"}
                    </div>
                  </div>
                  <div className="font-semibold"> Indoor Court </div>
                </div>
                <div className="w-full md:w-[50%]">
                  <div className="text-sm font-medium">Court Location</div>
                  <FormField
                    control={form.control}
                    name="indoor"
                    render={({ field }) => (
                      <FormItem className="flex my-2 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="cursor-pointer">
                            Indoor Court
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value} // Bind the checkbox to the form value
                            onCheckedChange={(checked) =>
                              field.onChange(checked)
                            } // Update the form state on change
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col  ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 text-white flex rounded-full shadow shadow-primary bg-primary">
                    <div className="m-auto text-xl font-semibold">
                      {isTournament ? "10" : "08"}
                    </div>
                  </div>
                  <div className="font-semibold">Additional Notes </div>
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add Notes..."
                            className="resize-none !bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Create Match
              {createMatchMut.isLoading && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
};

export default AddMatch;
