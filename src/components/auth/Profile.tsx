import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";

import { LuImagePlus } from "react-icons/lu";
import { useSignupContext } from "@/context/SignupContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Country } from "country-state-city";
// import PhoneInput, {
//   isValidPhoneNumber,
//   parsePhoneNumber,
// } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormSchema = z.object({
  firstName: z.string().min(3, {
    message: "First Name must be at least 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Last Name must be at least 3 characters.",
  }),
  avatar: z.any().optional(),
  gender: z.string(),
  dateOfBirth: z.date(),
  phoneNumber: z.string().nonempty("Phone number is required"),
  phoneNumberCountryCode: z.string(),
});

function Profile({ setCurr }: any) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
    },
  });

  const countryData = Country.getAllCountries();

  const signupCon = useSignupContext();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDateOfBirth =
      data.dateOfBirth instanceof Date
        ? data.dateOfBirth.toISOString()
        : data.dateOfBirth;

    signupCon.setUserInfo({
      ...data,
      dateOfBirth: formattedDateOfBirth,
      phoneNumberCountryCode: data.phoneNumberCountryCode ?? "",
      phoneNumber: data.phoneNumber,
    });
    setCurr((c: number) => c + 1);
  }

  const onError = (e: any) => {
    console.log("error", e, form.getValues());
  };

  const handleChange = (value: any, data: any) => {
    form.setValue("phoneNumber", value);
    form.setValue("phoneNumberCountryCode", data?.countryCode?.toUpperCase());
  };

  useEffect(() => {
    signupCon.userInfo.firstName &&
      form.setValue("firstName", signupCon.userInfo.firstName);
    signupCon.userInfo.lastName &&
      form.setValue("lastName", signupCon.userInfo.lastName);
    signupCon.userInfo.gender && form.setValue("gender", "male");
    signupCon.userInfo.dateOfBirth &&
      form.setValue("dateOfBirth", new Date(signupCon.userInfo.dateOfBirth));
    signupCon.userInfo.avatar &&
      form.setValue("avatar", signupCon.userInfo.avatar);
    signupCon.userInfo.phoneNumber &&
      form.setValue("phoneNumber", signupCon.userInfo.phoneNumber);
    signupCon.userInfo.phoneNumberCountryCode &&
      form.setValue(
        "phoneNumberCountryCode",
        signupCon.userInfo.phoneNumberCountryCode
      );
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center my-4">
        <div className="text-3xl font-semibold mt-4">Setup your Profile</div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          Let Friends on MindSight can recognize you
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col gap-2  mx-auto   mt-5">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex justify-center items-center">
                      <div className="w-20 h-20 rounded-full bg-[#F0F0FF]  border border-[#e3e3fd] flex items-center justify-center overflow-hidden">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Uploaded preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <LuImagePlus />
                        )}
                      </div>

                      <input
                        {...fieldProps}
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(event) => {
                          const file =
                            event.target.files && event.target.files[0];
                          if (file) {
                            onChange(file);
                            const reader = new FileReader();
                            reader.onload = () =>
                              setPreviewImage(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="!text-center" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-lg mx-auto">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First Name"
                        className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="lastName"
                        placeholder="Last Name "
                        className={"!rounded-3xl  shadow !bg-[#F0F0FF]"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={
                          "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                        }
                      >
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full flex gap-2 justify-start text-left font-normal border border-[#E5E5E5]  items-center   !rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]",
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
                          disabled={(date) =>
                            date >
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 12
                              )
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={
                          "!rounded-3xl  shadow !h-10 !py-4 !px-4 !bg-[#F0F0FF]"
                        }
                      >
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryData.map((country) => (
                          <SelectItem
                            value={country.isoCode}
                            key={country.isoCode}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
                      onChange={(value, data) => {
                        field.onChange(value);
                        handleChange(value, data);
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

            <Button className=" px-7 py-2 mt-4 w-[200px] mx-auto shadow rounded-3xl bg-primary text-white ">
              Continue
            </Button>
            {/* <Button
              onClick={() => setCurr((c: number) => c + 1)}
              className=" px-7  border-none rounded-3x bg-transparent text-black hover:bg-gray-200 hover:sahdow hover:rounded-3xl "
            >
              Skip
            </Button> */}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Profile;
