import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { FaFlag, FaMapMarkerAlt, FaCity, FaHome } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useSignupContext } from "@/context/SignupContext";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { register } from "@/api/auth.api";
import { requiredFields } from "@/types/auth.type";
import { LoaderCircle } from "lucide-react";
const FormSchema = z.object({
  country: z.string(),
  stateProvince: z.string(),

  city: z.string().min(3, "State Province must be at least 3 characters long"),
  streetAddress: z.string().min(3, {
    message: "Street Address must be at least 3 characters.",
  }),
  zipCode: z.string(),
});
function Address({ setCurr }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const signupCon = useSignupContext();

  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState<IState[]>();
  const [cityData, setCityData] = useState<ICity[]>();
  const [selectCountry, setSelectCountry] = useState<string>();
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<ICity>();

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

  const { mutate, isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: any) => register(payload),
    onSuccess: (response) => {
      setCurr((c: number) => c + 1);
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    signupCon.setUserInfo({
      ...data,
      stateProvince: data.stateProvince + "_",
      country: data.country + "_",
    });

    const missingFields = requiredFields.filter((field) => {
      return (
        signupCon.userInfo[field as keyof typeof data] === undefined ||
        signupCon.userInfo[field as keyof typeof data] === ""
      );
    });
    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      return;
    }
    mutate(signupCon.userInfo);
  }
  useEffect(() => {}, []);
  return (
    <div>
      <div className="flex flex-col items-center my-4">
        <div className="text-3xl font-semibold mt-4">Where do you live</div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          Help us deliver sercices suitable for you location
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 my-6 max-w-lg mx-auto">
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
                      defaultValue=""
                    >
                      <SelectTrigger
                        startIcon={FaFlag}
                        className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                      >
                        <SelectValue placeholder="Select your country" />
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
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        startIcon={FaMapMarkerAlt}
                        className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                      >
                        <SelectValue placeholder="Select your country" />
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        startIcon={FaCity}
                        className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                      >
                        <SelectValue placeholder="Select your city" />
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
                        id="full_name"
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
            </div>
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="full_name"
                        placeholder="Enter zip code"
                        className={"!rounded-3xl !w-fit shadow !bg-[#F0F0FF]"}
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

          <div className="flex py-4 w-full items-center justify-center">
            <Button className="flex items-center justify-center px-7 py-2 mt-4 w-[200px] mx-auto shadow rounded-3xl bg-primary text-white ">
              {isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Address;
