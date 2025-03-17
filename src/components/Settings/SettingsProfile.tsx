import { useEffect, useState } from "react";
import profile_img from "../../assets/user.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { FaUser, FaMapMarkerAlt, FaCity, FaHome } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { City, Country, ICity, IState, State } from "country-state-city";

const FormSchema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.date(),
  place_of_birth: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  streetAddress1: z.string(),
  streetAddress2: z.string().optional(),
});

const SettingsProfile = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("sssssss", data);
  }

  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState<IState[]>();
  const [cityData, setCityData] = useState<ICity[]>();
  const [selectCountry, setSelectCountry] = useState<string>();
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<ICity>();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(selectCountry));
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
    <div className="mt-5 p-5 pr-10">
      <div className="flex justify-between items-end">
        <div className="flex items-center justify-center gap-5">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profile_img} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg">John Wick</p>
            <p className="text-sm">johnwick@gmail.com</p>
          </div>
        </div>
        <Button className=" px-7 py-1 rounded-md bg-primary text-white  ">
          Edit
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5 my-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your first name here"
                      className={"py-6"}
                      startIcon={FaUser}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="last_name"
                      placeholder="Enter your last name here"
                      className={"py-6"}
                      startIcon={FaUser}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger startIcon={FaUser} className={"py-6"}>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full flex gap-2 justify-start text-left font-normal border py-3 border-[#E5E5E5]  items-center  rounded-md  px-2",
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place Of Birth</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      startIcon={FaMapMarkerAlt}
                      className={"py-6"}
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
            />
          </div>
          <div className="">
            <h1 className="text-2xl font-semibold pt-8 pb-4">
              Contact Information
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectCountry(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        startIcon={FaMapMarkerAlt}
                        className={"py-6"}
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
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedState(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        startIcon={FaMapMarkerAlt}
                        className={"py-6"}
                      >
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {stateData?.map((state) => (
                          <SelectItem value={state.isoCode} key={state.isoCode}>
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        startIcon={FaMapMarkerAlt}
                        className={"py-6"}
                      >
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cityData?.map((city) => (
                          <SelectItem value={city.name} key={city.stateCode}>
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
                name="streetAddress1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address One</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your street address here"
                        className={"py-6"}
                        startIcon={FaCity}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address Two</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your street address here"
                        className={"py-6"}
                        startIcon={FaHome}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex py-4 items-center justify-end">
            <Button
              className="px-4 py-2 rounded bg-[#F1861B] text-white hover:bg-[#ffba75]"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsProfile;
