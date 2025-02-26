import { useEffect, useState } from "react";
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

// Define TypeScript Interfaces for Backend Compatibility

// Define Zod Schema
const FormSchema = z.object({
  for: z.enum(["preparation", "competition", "transition"]),
  allocatedTime: z.string().min(1, "Time must be at least 1"),
  timeType: z.enum(["days", "weeks", "months"]),
  generals: z.array(z.string()).optional(),
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
}

export default function AddPhaseDialog({
  isOpen,
  setIsOpen,
  initialData,
}: AddPhaseDialogProps) {
  const [phase, setPhase] = useState<
    "preparation" | "competition" | "transition" | ""
  >("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      for: undefined,
      allocatedTime: "1",
      timeType: "days",
      generals: [],
      //   specifics: [],
      specificDescriptions: [],
      precompetitions: [],
      tournaments: [],
      activeRest: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      form.setValue("allocatedTime", initialData?.allocatedTime.toString());
      setPhase(initialData.for);
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
        for: undefined,
        allocatedTime: "1",
        timeType: "days",
        generals: [],
        specificDescriptions: [],
      });
      setPhase("");
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                <DynamicList name="generals" label="Objectives" form={form} />
                <DynamicList
                  name="specificDescriptions"
                  label="Specific Descriptions"
                  form={form}
                />
              </>
            )}
            {phase === "competition" && (
              <>
                <DynamicList
                  name="precompetitions"
                  label="Pre-Competitions"
                  form={form}
                />
                <DynamicList
                  name="tournaments"
                  label="Tournaments"
                  form={form}
                />
              </>
            )}
            {phase === "transition" && (
              <>
                <DynamicList
                  name="activeRest"
                  label="Active Rest Activities"
                  form={form}
                />
              </>
            )}

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

// Helper Component for Dynamic Lists
interface DynamicListProps {
  name: keyof FormValues;
  label: string;
  form: ReturnType<typeof useForm<FormValues>>;
}

function DynamicList({ name, label, form }: DynamicListProps) {
  const fieldValue = form.watch(name) || []; // Watch field value to trigger re-renders
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const onAddOrUpdate = () => {
    if (!inputValue.trim()) return;

    if (editIndex !== null) {
      // If editIndex is set, update the existing item
      const updatedList = [...fieldValue];
      updatedList[editIndex] = inputValue.trim();
      form.setValue(name, updatedList);
      setEditIndex(null); // Reset edit mode
    } else {
      // Otherwise, add new item
      form.setValue(name, [...fieldValue, inputValue.trim()]);
    }

    setInputValue(""); // Clear input field
  };

  const onEdit = (index: number) => {
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

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          {" "}
          {/* This makes the form field take up the rest of the width */}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onAddOrUpdate();
                      }
                    }}
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
            </li>
          ))}
      </ul>
    </div>
  );
}
