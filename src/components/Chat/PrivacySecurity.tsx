import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const FormSchema = z
  .object({
    email: z.string().min(3, {
      message: "First Name must be at least 3 characters.",
    }),
    phoneNumber: z.string().nonempty("Phone number is required"),
    old_password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z.string(),
    messaging: z.string(),
    groups: z.string(),
    following_visibility: z.string(),
    courses_visibility: z.string(),
    personal_information: z.string(),
    course_reviews: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password must mutch",
    path: ["confirm_password"],
  });
function PrivacySecurity() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowoldPassword] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleChange = (value: any) => {
    form.setValue("phoneNumber", value);

    if (value) {
      // const phoneNumberObj = parsePhoneNumber(value);
      console.log("3333333333333", value);
      // if (phoneNumberObj) {
      //   form.setValue("phoneNumberCountryCode", phoneNumberObj?.country || "");
      // }
    }
  };

  const onSubmit = () => {};
  return (
    <div className="px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-4xl mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
            <div className="space-y-6">
              <div>
                <h1 className="font-semibold text-[#152946] my-2">
                  Change Email
                </h1>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="full_name"
                          placeholder="Enter your email"
                          className={"!rounded-3xl shadow !bg-[#F0F0FF] "}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h1 className="font-semibold text-[#152946] my-2">
                  Two-Factor-Authentication
                </h1>
                <Controller
                  name="phoneNumber"
                  control={form.control}
                  rules={{
                    required: "Phone number is required",
                  }}
                  render={({ field, fieldState }) => (
                    <div className="group flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>

                      <PhoneInput
                        {...field}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          handleChange(value);
                        }}
                        country={"us"}
                        enableSearch={true}
                        disableDropdown={false}
                        inputClass="!rounded-3xl shadow !h-10 !py-4 !px-12 !bg-[#F0F0FF] !w-full"
                        containerClass="w-full"
                        buttonStyle={{
                          borderTopLeftRadius: "1.3rem",
                          borderBottomLeftRadius: "1.3rem",
                        }}
                        buttonClass="phone-input-button-hover"
                      />

                      {fieldState.error && (
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-[#152946] my-2">
                Change Password
              </h1>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="full_name"
                            placeholder="Enter your old password"
                            className={"!rounded-3xl shadow !bg-[#F0F0FF] "}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <FaEye
                                className="h-4 w-4"
                                aria-hidden="true"
                                color="#A1A9B5"
                              />
                            ) : (
                              <FaEyeSlash
                                className="h-4 w-4"
                                aria-hidden="true"
                                color="#A1A9B5"
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="full_name"
                            placeholder="Enter your new password"
                            className={"!rounded-3xl shadow !bg-[#F0F0FF] "}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowoldPassword((prev) => !prev)}
                          >
                            {showOldPassword ? (
                              <FaEye
                                className="h-4 w-4"
                                aria-hidden="true"
                                color="#A1A9B5"
                              />
                            ) : (
                              <FaEyeSlash
                                className="h-4 w-4"
                                aria-hidden="true"
                                color="#A1A9B5"
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            id="last_name"
                            placeholder="Confirm your password "
                            className={"!rounded-3xl  shadow !bg-[#F0F0FF]"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
                              <FaEye
                                className="h-4 w-4 "
                                aria-hidden="true"
                                color="#A1A9B5"
                              />
                            ) : (
                              <FaEyeSlash
                                className="h-4 w-4"
                                aria-hidden="true"
                                color="#A1A9B5"
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-4xl">
            <h1 className="text-lg font-semibold text-[#152946]">
              Privacy Settings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 ">
              <div className="space-y-6">
                <div>
                  <FormField
                    control={form.control}
                    name="messaging"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Messaging</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                            }
                          >
                            <SelectValue placeholder="Select Messaging" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everybody">Everybody</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="nobody">Nobody</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ul className="pl-1 ml-6 mt-1  list-disc">
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Everybody: Anyone can Message You
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Followers: Only your Followers can Message You
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Nobody: Nobody can Message You
                    </li>
                  </ul>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="following_visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Following Visibility</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                            }
                          >
                            <SelectValue placeholder="Select Following Visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everybody">Everybody</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="nobody">Nobody</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ul className="pl-1 ml-6 mt-1  list-disc">
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Everybody: All other users can see your Following Stats
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Followers: Only people who follow you can see your
                      Following Stats
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Nobody: Nobody can see your Following Stats
                    </li>
                  </ul>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="personal_information"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Information</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                            }
                          >
                            <SelectValue placeholder="Select Personal Information" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everybody">Everybody</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="nobody">Nobody</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ul className="pl-1 ml-6 mt-1  list-disc">
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Everybody: All other users can see your Information
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Followers: Only people who follow you can see your
                      Information
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Nobody: Nobody can see your Information
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <FormField
                    control={form.control}
                    name="groups"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Groups</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                            }
                          >
                            <SelectValue placeholder="Select Groups" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everybody">Everybody</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="coaches">Coaches</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ul className="pl-1 ml-6 mt-1  list-disc">
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Everybody: Anyone can Add you into Groups
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Followers: Only your Followers can Add you into Groups
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Coaches: Coaches only can Add you into Groups
                    </li>
                  </ul>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="courses_visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Courses Visibility</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                            }
                          >
                            <SelectValue placeholder="Select Courses Visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everybody">Everybody</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="nobody">Nobody</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ul className="pl-1 ml-6 mt-1  list-disc">
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Everybody: All other users can see Taken Courses
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Followers: Only people who follow you can see Taken
                      Courses
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Nobody: Nobody can see Taken Courses
                    </li>
                  </ul>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="course_reviews"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Reviews</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                            }
                          >
                            <SelectValue placeholder="Select Messaging" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everybody">Everybody</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="nobody">Nobody</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ul className="pl-1 ml-6 mt-1  list-disc">
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Everybody: All other users can see your Course Reviews
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Followers: Only people who follow you can see your Course
                      Reviews
                    </li>
                    <li className="text-xs text-[#152946] py-[2px] ">
                      Nobody: Nobody can see your Course Reviews
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PrivacySecurity;
