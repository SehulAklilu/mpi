import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { IoCloseSharp } from "react-icons/io5";
  import { LoaderCircle } from "lucide-react";
  import { useMutation, useQueryClient } from "react-query";
  import { toast } from "react-toastify";
  import axios from "@/api/axios";
  
  const AddReminderSchema = z.object({
    title: z.string({ required_error: "Title is required" }).min(1),
    description: z.string({ required_error: "Description is required" }).min(1),
    date: z.string({ required_error: "Date is required" }).min(1),
    type: z.string({ required_error: "Type is required" }),
    timezone: z.string({ required_error: "Timezone is required" }).min(1),
  });
  
  type AddReminderForm = z.infer<typeof AddReminderSchema>;
  
  const AddReminderAlert = ({
    date,
    open,
    setOpen,
  }: {
    date: string;
    open: null | string;
    setOpen: Function;
  }) => {
    const form = useForm<AddReminderForm>({
      resolver: zodResolver(AddReminderSchema),
      defaultValues: {
        date,
        type: "reminder",
      },
    });
  
    const queryClient = useQueryClient();
    const types = ["reminder", "match", "training", "goal"];
  
    const { isLoading, mutate } = useMutation(
      (data: AddReminderForm) => axios.post("/api/v1/reminders", data),
      {
        onSuccess() {
          toast.success("Reminder added successfully");
          queryClient.invalidateQueries("reminders");
          setOpen(null);
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
  
    const onSubmit = (data: AddReminderForm) => {
      mutate(data);
    };
  
    return (
      <AlertDialog open={open != null}>
        <AlertDialogContent className="min-h-[90vh] h-[90vh] overflow-auto">
          <AlertDialogHeader>
            <div className="flex justify-between w-full">
              <AlertDialogTitle>Add a Reminder</AlertDialogTitle>
              <Button onClick={() => setOpen(false)}>
                <IoCloseSharp />
              </Button>
            </div>
            <AlertDialogDescription>
              Fill in the details below to create a new reminder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="text-sm">{date}</div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter title"
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
              <div>
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
              </div>
              <div>
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
              </div>
            </div>
            <Button
              type="submit"
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
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default AddReminderAlert;
  