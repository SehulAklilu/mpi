import { useEffect, useState } from "react";
import { z } from "zod";
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

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Goal } from "@/types/children.type";

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
  addOn: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

interface AddPhaseDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData?: Goal;
}

export default function PlayerGoalForm({
  isOpen,
  setIsOpen,
  initialData,
}: AddPhaseDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

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

  const onSubmit = (data: FormValues) => {
    console.log("3333333333333", data);
  };

  const onError = (error: any) => {
    console.log("eeeeeeeeeeeee", error);
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
        addOn: "",
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
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {initialData ? "Update" : "Submit"}
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
