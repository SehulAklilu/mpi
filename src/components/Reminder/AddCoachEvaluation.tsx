import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "react-query";
import axiosInstance, {
  getAxiosErrorMessage,
  getAxiosSuccessMessage,
} from "@/api/axios";
import { Attendance, Evaluation } from "@/types/classes.type";
import { toast } from "react-toastify";

function AddCoachEvaluation({
  evaluations,
  playerId,
  sessionId,
}: {
  evaluations: Evaluation[];
  playerId: string;
  sessionId: string;
}) {
  const FormSchema = z.object({
    measurement: z.string(),

    achievable: z.boolean(),
    isRelevant: z.boolean(),
    isTimeBound: z.boolean(),

    performance: z.object({
      engagement: z.string(),
      effort: z.string(),
      execution: z.string(),
    }),
    additionalInfo: z.string(),
    goal: z.string().optional(),
  });
  type FormSchemaType = z.infer<typeof FormSchema>;

  const dataSource = [
    { value: "stronglyDisagree", label: "Strongly Disagree" },
    { value: "disagree", label: "Disagree" },
    { value: "neutral", label: "Neutral" },
    { value: "agree", label: "Agree" },
    { value: "stronglyAgree", label: "Strongly Agree" },
  ];

  const evaluation = evaluations?.find((eva) => eva.player._id === playerId);

  //Api
  const updateEvaluation = useMutation(
    (payload: FormSchemaType) =>
      axiosInstance.post(
        `api/v1/classes/${sessionId}/addCoachEvaluation/${playerId}`,
        payload
      ),
    {
      onSuccess(response) {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        // queryClient.invalidateQueries("reminders");
      },
      onError(err: any) {
        const error = getAxiosErrorMessage(err);
        toast.error(error);
      },
    }
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      measurement: evaluation?.coachEvaluation?.measurement,
      achievable: evaluation?.coachEvaluation?.achievable,
      isRelevant: evaluation?.coachEvaluation?.isRelevant,
      isTimeBound: evaluation?.coachEvaluation?.isTimeBound,
      performance: {
        engagement: evaluation?.coachEvaluation?.performance?.engagement,
        effort: evaluation?.coachEvaluation?.performance?.effort,
        execution: evaluation?.coachEvaluation?.performance?.execution,
      },
      additionalInfo: evaluation?.coachEvaluation?.additionalInfo,
      goal: evaluation?.coachEvaluation?.goal ?? "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    updateEvaluation.mutate({ ...data, goal: "This is the goal" });
  };
  const onError = (err: any) => {
    console.log("e", err);
  };
  return (
    <div className="p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="measurement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Measurement</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="measurement"
                    placeholder="How Do You messaure it?"
                    className={"shadow !bg-white "}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-start justify-between">
            <FormField
              control={form.control}
              name="achievable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Did you achieve it?</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() => field.onChange(true)}
                        />
                        <label className="text-sm">Yes</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() => field.onChange(false)}
                        />
                        <label className="text-sm">No</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRelevant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Was it relevant?</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() => field.onChange(true)}
                        />
                        <label className="text-sm">Yes</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() => field.onChange(false)}
                        />
                        <label className="text-sm">No</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isTimeBound"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is it time bound?</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() => field.onChange(true)}
                        />
                        <label className="text-sm">Yes</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() => field.onChange(false)}
                        />
                        <label className="text-sm">No</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="performance.engagement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engagement</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={
                        "shadow !h-10 !py-4 !px-4 !bg-white !text-black"
                      }
                    >
                      <SelectValue
                        placeholder="Select Engagement"
                        className="!text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSource.map((data) => (
                        <SelectItem key={data.value} value={data.value}>
                          {data.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="performance.effort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effort</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={
                        "shadow !h-10 !py-4 !px-4 !bg-white !text-black"
                      }
                    >
                      <SelectValue
                        placeholder="Select Effort"
                        className="!text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSource.map((data) => (
                        <SelectItem key={data.value} value={data.value}>
                          {data.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="performance.execution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Execution</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={
                        "shadow !h-10 !py-4 !px-4 !bg-white !text-black"
                      }
                    >
                      <SelectValue
                        placeholder="Select Execution"
                        className="!text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSource.map((data) => (
                        <SelectItem key={data.value} value={data.value}>
                          {data.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="additionalInfo"
                      placeholder="Additional Information"
                      className={"shadow !bg-white "}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <button className="py-2 px-4 rounded-lg w-full text-white bg-primary border border-white hover:bg-orange-500 flex items-center justify-center ">
              <span> Submit</span>
              {updateEvaluation.isLoading && (
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
        </form>
      </Form>
    </div>
  );
}

export default AddCoachEvaluation;
