import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoCloseSharp } from "react-icons/io5";
import { LoaderCircle } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios";
import { FaEdit } from "react-icons/fa";
const EditreminderSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1),
  description: z.string({ required_error: "Description is required" }).min(1),
  // date: z.string({ required_error: "Date is required" }).min(1),
  // type: z.string({ required_error: "Type is required" }),
  // timezone: z.string({ required_error: "Timezone is required" }).min(1),
});

type EditreminderForm = z.infer<typeof EditreminderSchema>;

const Editreminder = ({ initialValue, open, setOpen }: any) => {
  let defaultValues = {
    title: initialValue["title"],
    description: initialValue["description"],
    date: initialValue["date"],
  };
  // delete defaultValues["_id"];
  // delete defaultValues["timezone"];
  // delete defaultValues["type"];
  // delete defaultValues["userId"];
  // defaultValues["date"] = new Date(defaultValues["date"]);
  console.log(defaultValues);
  const form = useForm<EditreminderForm>({
    resolver: zodResolver(EditreminderSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const types = ["reminder", "goal"];

  const { isLoading, mutate } = useMutation(
    (data: EditreminderForm) =>
      axios.patch(`/api/v1/reminders/${initialValue._id}`, data),
    {
      onSuccess() {
        form.reset();
        toast.success("Reminder Updated successfully");
        queryClient.invalidateQueries("reminders");
        setOpen(false);
      },
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data.message ?? "Unable to Udate reminder"
        );
      },
    }
  );

  const onSubmit = (data: EditreminderForm) => {
    mutate(data);
    // alert("working...");
  };

  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger asChild>
        
      </AlertDialogTrigger> */}
      <AlertDialogContent className=" bg-gray-100  overflow-auto">
        <AlertDialogHeader>
          <div className="flex justify-between w-full">
            <AlertDialogTitle>Edit Your Reminder</AlertDialogTitle>
            <Button
              onClick={(event) => {
                setOpen(false);
                event.stopPropagation();
              }}
            >
              <IoCloseSharp />
            </Button>
          </div>
          <form
            className="text-sm"
            onSubmit={(e) => {
              // form.handleSubmit(onSubmit);
              onSubmit(form.getValues());
              e.preventDefault();
            }}
          >
            <div className="space-y-4">
              <div className=""></div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter title"
                  className="bg-white"
                  {...form.register("title")}
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter description"
                  rows={4}
                  className="w-full border rounded-md p-2"
                  {...form.register("description")}
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
              {/* <div>
                <label htmlFor="type" className="block text-sm font-medium">
                  Type
                </label>
                <Select
                  value={form.watch("type")}
                  onValueChange={(value: any) => form.setValue("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type, ind) => (
                      <SelectItem key={ind} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.type && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.type.message}
                  </p>
                )}
              </div> */}
              {/* <div>
                <label htmlFor="timezone" className="block text-sm font-medium">
                  Timezone
                </label>
                <Input
                  id="timezone"
                  placeholder="Enter timezone"
                  {...form.register("timezone")}
                />
                {form.formState.errors.timezone && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.timezone.message}
                  </p>
                )}
              </div> */}
              {/* <div>
                <label htmlFor="date" className="block text-sm font-medium">
                  Due Date
                </label>
                <Input
                  id="date"
                  type="date"
                  placeholder="Enter date"
                  {...form.register("date")}
                />
                {form.formState.errors.date && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </div>
              */}
            </div>

            <Button
              type="submit"
              onClick={() => {}}
              className="flex mt-3 max-w-32 bg-primary py-2 shadow rounded-3xl px-12 items-center justify-center gap-2 text-white border border-gray-300"
            >
              {isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Editreminder;
