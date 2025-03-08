import axiosInstance, {
  getAxiosErrorMessage,
  getAxiosSuccessMessage,
} from "@/api/axios";
import { PlayerSession } from "@/types/session.type";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import RatingProgressBar from "../RingProgressBar";
import { LoaderCircle } from "lucide-react";

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
import { Input } from "../ui/input";
function PostMatchPlayerReflection({
  playerSession,
}: {
  playerSession: PlayerSession;
}) {
  const FormSchema = z.object({
    additionalInfo: z.string(),
    feelTowardsGoal: z.string(),
    stepsTaken: z.string(),
  });
  type FormSchemaType = z.infer<typeof FormSchema>;

  const postSessionQuestions = useMutation(
    async (payload: any) => {
      return axiosInstance.post(
        `api/v1/classes/${playerSession._id}/addPlayerReflection`,
        payload
      );
    },
    {
      onSuccess: (response) => {
        const message = getAxiosSuccessMessage(response);
        toast.success(message);
        // queryClient.invalidateQueries("classes");
      },
      onError: (err: any) => {
        const message = getAxiosErrorMessage(err);
        toast.error(message);
      },
    }
  );
  const questions = [
    {
      no: 1,
      question: "I had a postive mindset throughout practice.",
      formKey: "P",
      label: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
      ],
    },
    {
      no: 2,
      question: "I had difficulty overcoming obstacles.",
      formKey: "R",
      label: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
      ],
    },
    {
      no: 3,
      question: "I could improve my problem solving during practice.",
      formKey: "I",
      label: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
      ],
    },
    {
      no: 4,
      question: "I learned something new about my game or technique.",
      formKey: "M",
      label: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
      ],
    },
    // {
    //   no: 5,
    //   question: "I have a clear understanding of what ot work on next.",
    //   formKey: "C",
    //   label: [
    //     "Strongly Disagree",
    //     "Disagree",
    //     "Neutral",
    //     "Agree",
    //     "Positive Mindset",
    //   ],
    // },
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      feelTowardsGoal: playerSession.feelTowardsGoal,
      stepsTaken: playerSession.stepsTaken,
      additionalInfo: playerSession.additionalInfo,
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    const payload = { ...data, ...formData };
    postSessionQuestions.mutate(payload);
  };
  const onError = (err: any) => {
    console.log("e", err);
  };

  const handleRatingChange = (formKey: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: value,
    }));
  };

  const [formData, setFormData] = useState(
    Object.fromEntries(questions.map((q) => [q.formKey, 0])) // Default all values to 1
  );

  return (
    <div>
      <div>
        <h1>Pre Game Survery</h1>
        {questions.map((question) => (
          <div key={question.no} className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">
              {question.no}, {question.question}
            </h2>
            <div className="mt-3 w-[50%]">
              <RatingProgressBar
                value={formData[question.formKey]}
                onChange={(value) =>
                  handleRatingChange(question.formKey, value)
                }
                useAlternativeLabels={false}
                customLabel={question.label}
              />
            </div>
          </div>
        ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="grid grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="stepsTaken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steps Taken</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="stepsTaken"
                      placeholder="Steps Taken"
                      className={"shadow !bg-white "}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feelTowardsGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feel Towards Goal</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="feelTowardsGoal"
                      placeholder="Feel Towards Goal"
                      className={"shadow !bg-white "}
                      {...field}
                    />
                  </FormControl>
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
            <button className="py-2 px-4 mt-4 rounded-lg w-full text-white bg-primary border border-white hover:bg-orange-500 flex items-center justify-center ">
              <span> Submit Questionnarire</span>
              {postSessionQuestions.isLoading && (
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
      </div>
    </div>
  );
}

export default PostMatchPlayerReflection;
