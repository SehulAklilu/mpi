import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CiCreditCard1 } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import userImage from "../../assets/user.jpeg";
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
import { CalendarIcon, LoaderCircle } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn, getGoogleProfileColor } from "@/lib/utils";
import { City, Country, ICity, IState, State } from "country-state-city";
// import PhoneInput, {
//   isValidPhoneNumber,
//   parsePhoneNumber,
// } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "react-phone-number-input/style.css";
import { FiUploadCloud } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { FaCity, FaFlag, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import "./ChatMessage.module.css";
import PrivacySecurity from "./PrivacySecurity";
import Purchases from "./Purchases";
import { ContentLayout } from "../Sidebar/contenet-layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteProfile,
  getUserProfile,
  updateUserProfile,
} from "@/api/auth.api";
import Cookies from "js-cookie";
import { getMyGoals } from "@/api/children.api";
import MyGoal from "../Players/MyGoals";
import { useRole } from "@/RoleContext";
import { User } from "@/types/user.types";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
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
import { Calendar } from "../ui/calendar";
import { useNavigate } from "react-router-dom";

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
  // placeOfBith: z.string(),
  phoneNumber: z.string().nonempty("Phone number is required"),
  phoneNumberCountryCode: z.string(),
  country: z.string(),
  stateProvince: z.string(),

  city: z.string().min(3, "State Province must be at least 3 characters long"),
  streetAddress: z.string().min(3, {
    message: "Street Address must be at least 3 characters.",
  }),
  zipCode: z.string(),
});

function ProfileSetting() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { role } = useRole();
  const [countryPlaceholder, setCountryPlaceholder] =
    useState("Select Country");
  const [cityPlaceholder, setCityPlaceholder] = useState("Select City");
  const [statePlaceholder, setStatePlaceholder] = useState("Select State");

  const [countryValue, setCountryValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const { data } = useQuery({
    queryKey: ["myGoals"],
    queryFn: getMyGoals,
    enabled: role === "player",
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      queryClient.invalidateQueries("userProfile");
      // toast.success(message);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      // toast.error(message);
    },
  });

  const { reset } = form;
  const navigate = useNavigate();

  useEffect(() => {
    if (profileData) {
      reset({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        avatar: profileData.avatar || null,
        gender: profileData.gender || "",
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth)
          : new Date(),
        phoneNumber: profileData.phoneNumber?.number || "",
        phoneNumberCountryCode: profileData.phoneNumber?.countryCode || "",
        country: profileData.address.country || "",
        stateProvince: profileData.address.stateProvince || "",
        city: profileData.address.city || "",
        streetAddress: profileData.address.streetAddress || "",
        zipCode: profileData.address.zipCode || "",
      });
      setCountryPlaceholder(profileData.address.country);
      setCityPlaceholder(profileData.address.city);
      setStatePlaceholder(profileData.address.stateProvince);

      setCountryValue(profileData.address.country);
      setCityValue(profileData.address.city);
      setStateValue(profileData.address.stateProvince);
    }
  }, [profileData, reset]);

  const updateProfile = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateUserProfile,
  });

  const deleteUserProfile = useMutation({
    mutationKey: ["deleteProfile"],
    mutationFn: deleteProfile,
    onSuccess: () => {
      setIsOpen(false);
      navigate("/login");
    },
  });

  // const updateProfileMu = useMutation(
  //   async (payload: FormData | Record<string, any>) => {
  //     const isFormData = payload instanceof FormData;

  //     return axiosInstance.patch(`/api/v1/users/profile`, payload, {
  //       headers: {
  //         "Content-Type": isFormData
  //           ? "multipart/form-data"
  //           : "application/json",
  //       },
  //     });
  //   },
  //   {
  //     onSuccess: (response) => {
  //       const message = getAxiosSuccessMessage(response);
  //       toast.success(message);
  //     },
  //     onError: (err: any) => {
  //       const message = getAxiosErrorMessage(err);
  //       toast.error(message);
  //     },
  //   }
  // );

  //  const onSubmit = (data: any) => {
  //   const payload = {
  //     ...data,
  //     dateOfBirth: data.dateOfBirth?.toISOString(),
  //     phoneNumberCountryCode:
  //       data.phoneNumberCountryCode ??
  //       profileData?.phoneNumber.countryCode ??
  //       "",
  //     country: countryValue,
  //     stateProvince: stateValue,
  //     city: cityValue,
  //     streetAddress2: profileData?.address.streetAddress2
  //       ? profileData?.address.streetAddress2
  //       : data.streetAddress,
  //     what: "what",
  //   };

  //   if (avatarFile) {
  //     const formData = new FormData();
  //     Object.entries(payload).forEach(([key, value]) => {
  //       if (value !== undefined && key !== "avatar") {
  //         formData.append(key, value as string);
  //       }
  //     });

  //     if (avatarFile instanceof File) {
  //       formData.append("avatar", avatarFile);
  //     }

  //     updateProfileMu.mutate(formData);
  //   } else {
  //     updateProfileMu.mutate(payload);
  //   }
  // };

  const onSubmit = (data: any) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth?.toISOString(),
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      phoneNumberCountryCode:
        data.phoneNumberCountryCode ??
        profileData?.phoneNumber.countryCode ??
        "",
      country: countryValue,
      stateProvince: stateValue,
      city: cityValue,
      zipCode: data.zipCode,
      streetAddress: data.streetAddress,
      streetAddress2: profileData?.address.streetAddress2
        ? profileData?.address.streetAddress2
        : data.streetAddress,
      avatar: data.avatar || undefined,
    };

    updateProfile.mutate(payload);
  };

  const countryData = Country.getAllCountries();

  const handleChange = (value: any) => {
    form.setValue("phoneNumber", value);

    if (value) {
      // const phoneNumberObj = parsePhoneNumber(value);
      // if (phoneNumberObj) {
      //   form.setValue("phoneNumberCountryCode", phoneNumberObj?.country || "");
      // }
    }
  };
  const firstLetter = profileData?.firstName?.trim().charAt(0).toUpperCase();
  const [stateData, setStateData] = useState<IState[]>();
  const [cityData, setCityData] = useState<ICity[]>();
  const [selectCountry, setSelectCountry] = useState<string>();
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<ICity>();
  const [phone, setPhone] = useState("");
  const avater = Cookies.get("avatar");
  useEffect(() => {
    setStateData(State.getStatesOfCountry(selectCountry));
    setCityData([]);
  }, [selectCountry]);

  useEffect(() => {
    if (selectCountry && selectedState) {
      setCityData(City.getCitiesOfState(selectCountry, selectedState));
    }
  }, [selectCountry, selectedState]);

  useEffect(() => {
    if (selectCountry && selectedState && selectedCity) {
      setCityData(City.getCitiesOfState(selectCountry, selectedState));
    }
  }, [selectCountry, selectedState, selectedCity]);

  return (
    <ContentLayout>
      <div className="px-2 sm:px-4 md:px-10 mb-10">
        <div className="flex items-center justify-center mt-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="Profile"
            className="w-full"
          >
            <TabsList className="flex bg-transparent  w-full md:w-[30rem] lg:w-[40rem] gap-x-1 sm:gap-x-4  h-[2.5rem] md:h-[3rem]  ">
              <TabsTrigger
                value="Profile"
                className="flex-1 text-center gap-x-0 sm:gap-x-2 py-1 text-sm md:text-base lg:text-lg rounded-md transition-colors border border-[#152946] data-[state=active]:border-[#F2851C] text-[#152946]"
              >
                <BsPerson className="hidden sm:block" /> Profile
              </TabsTrigger>
              {role && role === "player" && (
                <TabsTrigger
                  value="myGoals"
                  className="flex-1 text-center gap-x-0 sm:gap-x-2 py-1 text-sm md:text-base lg:text-lg rounded-md transition-colors border border-[#152946] data-[state=active]:border-[#F2851C] text-[#152946]"
                >
                  <BsPerson className="hidden sm:block" /> My Goals
                </TabsTrigger>
              )}
              <TabsTrigger
                value="Privacy & Security"
                className="flex-1 text-center gap-x-0 sm:gap-x-2 py-1 text-sm md:text-base lg:text-lg rounded-md transition-colors border border-[#152946] data-[state=active]:border-[#F2851C] text-[#152946]"
              >
                <CiLock className="hidden sm:block" />{" "}
                <span className="flex gap-0 sm:gap-1">
                  {" "}
                  Privacy <span className="hidden sm:block">
                    & Security
                  </span>{" "}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="Purchases"
                className="flex-1 text-center gap-x-0 sm:gap-x-2 py-1 text-sm md:text-base lg:text-lg rounded-md transition-colors border border-[#152946] data-[state=active]:border-[#F2851C] text-[#152946]"
              >
                <CiCreditCard1 className="hidden sm:block" /> Purchases
              </TabsTrigger>
            </TabsList>
            <TabsContent className="!mt-4" value="Profile">
              <h1 className="font-semibold text-[#152946] text-center md:text-left text-base mb-2">
                Profile Picture
              </h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex gap-x-4 flex-col md:flex-row gap-y-2 items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Uploaded preview"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full">
                          {avater ? (
                            <img
                              src={avater}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <div
                              style={{
                                backgroundColor: getGoogleProfileColor(
                                  profileData?.firstName
                                ),
                              }}
                              className="w-full h-full rounded-full flex items-center justify-center text-white capitalize"
                            >
                              {firstLetter}
                            </div>
                          )}
                        </div>

                        // <img
                        //   src={userImage}
                        //   className="w-full h-full rounded-full object-cover"
                        // />
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="avatar"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex items-center">
                              <div className="w-[16rem] sm:[18rem] md:w-[22rem]  border border-dashed rounded-lg  border-gray-500 flex flex-col gap-y-2 py-4 items-center justify-center overflow-hidden">
                                <FiUploadCloud className="" size={32} />
                                <p className="text-gray-500 text-sm md:text-lg text-center">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-gray-500">
                                  Max. File Size: 30MB
                                </p>
                                <button className="py-2 px-4 rounded-lg bg-primary text-white">
                                  Browse File
                                </button>
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
                  </div>
                  <div className="flex flex-col gap-2   mt-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-12 gap-y-2 ">
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
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    const maxDate = new Date();
                                    maxDate.setMonth(maxDate.getMonth() - 1);
                                    return (
                                      date > new Date() ||
                                      date < new Date("1900-01-01") ||
                                      date > maxDate
                                    );
                                  }}
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                  {/* address info */}
                  <div className="mt-10">
                    <h1 className="font-semibold text-[#152946] text-base">
                      Location Details
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-12 gap-y-2 my-6">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setCountryValue(field.name);
                                setSelectCountry(value);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                startIcon={FaFlag}
                                className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                              >
                                <SelectValue placeholder={countryPlaceholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {countryData.map((country) => (
                                  <SelectItem
                                    value={country.isoCode}
                                    key={country.isoCode + country.latitude}
                                  >
                                    {country.name}
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
                        name="stateProvince"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedState(value);
                                setStateValue(field.name);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                startIcon={FaMapMarkerAlt}
                                className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                              >
                                <SelectValue placeholder={statePlaceholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {stateData?.map((state) => (
                                  <SelectItem
                                    value={state.isoCode}
                                    key={state.isoCode + state.latitude}
                                  >
                                    {state.name}
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
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setCityValue(field.name);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                startIcon={FaCity}
                                className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                              >
                                <SelectValue placeholder={cityPlaceholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {cityData?.map((city) => (
                                  <SelectItem
                                    value={city.name}
                                    key={city.stateCode + city.latitude}
                                  >
                                    {city.name}
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
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter your street address here"
                                className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                                startIcon={FaHome}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter zip code"
                                className={"!rounded-3xl  shadow !bg-[#F0F0FF]"}
                                startIcon={IoIosMail}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-600 px-4 py-2 rounded-lg text-white">
                          Delete Profile
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-500 px-4 py-2 rounded-lg text-white">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteUserProfile.mutate()}
                            className="bg-red-600 flex gap-2 px-4 py-2 rounded-lg text-white"
                          >
                            Continue
                            {deleteUserProfile.isLoading && (
                              <LoaderCircle
                                style={{
                                  animation: "spin 1s linear infinite",
                                  fontSize: "2rem",
                                  color: "#FFFFFF",
                                }}
                              />
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <button className="py-2 flex gap-2 px-4 rounded-md bg-primary text-white mx:0 sm:mx-4 ">
                      Save Changes
                      {updateProfile.isLoading && (
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
            </TabsContent>
            <TabsContent className="!mt-0" value="myGoals">
              {data?.goals && role && role === "player" ? (
                <MyGoal coachGoals={data?.goals} />
              ) : (
                <div>No Goal Found</div>
              )}
            </TabsContent>
            <TabsContent className="!mt-0" value="Privacy & Security">
              <PrivacySecurity />
            </TabsContent>
            <TabsContent className="!mt-0" value="Purchases">
              <Purchases />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}

export default ProfileSetting;
