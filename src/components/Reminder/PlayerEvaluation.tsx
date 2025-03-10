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
import { useMutation } from "react-query";
import axiosInstance, {
  getAxiosErrorMessage,
  getAxiosSuccessMessage,
} from "@/api/axios";
import { toast } from "react-toastify";
import { PlayerSession } from "@/types/session.type";

function PlayerEvaluation({ session }: { session: PlayerSession }) {
  const FormSchema = z.object({
    performance: z.object({
      engagement: z.string(),
      effort: z.string(),
      execution: z.string(),
    }),
    additionalInfo: z.string(),
  });
  type FormSchemaType = z.infer<typeof FormSchema>;

  const agreementLevels = [
    { value: "stronglyDisagree", label: "Strongly Disagree" },
    { value: "disagree", label: "Disagree" },
    { value: "neutral", label: "Neutral" },
    { value: "agree", label: "Agree" },
    { value: "stronglyAgree", label: "Strongly Agree" },
  ];

  //Api
  const updatePlayerEvaluation = useMutation(
    (payload: FormSchemaType) =>
      axiosInstance.post(
        `api/v1/classes/${session._id}/addPlayerEvaluation`,
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
      performance: {
        engagement: session?.playerEvaluation?.performance.engagement,
        effort: session?.playerEvaluation?.performance.effort,
        execution: session?.playerEvaluation?.performance.execution,
      },
      additionalInfo: session?.playerEvaluation?.additionalInfo,
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    updatePlayerEvaluation.mutate({ ...data });
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
                      {agreementLevels.map((data) => (
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
                      {agreementLevels.map((data) => (
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
                  <FormLabel>Effort</FormLabel>
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
                      {agreementLevels.map((data) => (
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
              {updatePlayerEvaluation.isLoading && (
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

export default PlayerEvaluation;
