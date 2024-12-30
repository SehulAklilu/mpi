import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Validation schema
const passwordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long."),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export const PasswordChanger = () => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Password change submitted:", data);
    // Implement your logic for password change here
  };

  return (
    <div className="flex pt-6 flex-col">
      <div className="text-lg font-semibold mb-6">Password</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-10"
        >
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Current Password
                </FormLabel>
                <FormControl className="">
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 text-sm  mt-6 flex gap-1">
            <div>Can’t remember your password?</div>
            <div className="underline text-primary">
              Reset your password
            </div>{" "}
          </div>
          <Button
            className="col-span-2 w-fit px-6 py-2 mt-8 rounded-md bg-primary text-white  "
            type="submit"
          >
            Change Password
          </Button>
        </form>
      </Form>

      <div className="flex flex-col mt-4">
        <div className="text-lg">Delete Account</div>
        <div className="text-sm max-w-1/2 w-1/2 my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          laudantium optio dolore nam cupiditate neque unde odit quis
          repudiandae minima repudiandae minima minima repudiandae minima. ate
          neque und
        </div>
        <div className="text-red-700 underline font-semibold capitalize">
            Delete Account
        </div>
      </div>
    </div>
  );
};

export default PasswordChanger;
