import { useEffect, useState } from "react";
import profile_img from "../../assets/user.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCity,
  FaHome,
  FaCheck,
} from "react-icons/fa";
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
import img from "@/assets/setting/visa.svg";
import { IoCardOutline } from "react-icons/io5";

const FormSchema = z.object({
  visaType: z.string(),
  cardNumber: z.string(),
  cardOwner: z.string(),
  expiryDate: z.string(),
});

const Payment = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("sssssss", data);
  }

  const countryData = Country.getAllCountries();
  const [formData, setFormData] = useState<z.infer<typeof FormSchema>>({
    visaType: "",
    cardNumber: "",
    cardOwner: "",
    expiryDate: "",
  });

  return (
    <div className="mt-5 p-5 pr-10">
      <div className="flex gap-10  flex-wrap">
        <div className="flex gap-8">
          <input type="checkbox" />
          <div className="flex px-6 py-6 rounded-lg bg-white">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="flex gap-8">
          <input type="checkbox" />
          <div className="flex px-6 py-6 rounded-lg bg-white">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="flex gap-8">
          <input type="checkbox" />
          <div className="flex px-6 py-6 rounded-lg bg-white">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="flex gap-8">
          <input type="checkbox" />
          <div className="flex px-6 py-6 rounded-lg bg-white">
            <img src={img} alt="" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-6 ">
        <div className="flex flex-col w-fit place-content-center">
          <div className="font-semibold">Card number</div>
          <div className="text-xs w-fit text-nowrap text-gray-600">
            Enter the 16-digit card number on the card
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-[300px]">
            <Input
              type="text"
              id="full_name"
              className={"py-6  bg-white"}
              startIcon={IoCardOutline}
              // {...field}
            />
          </div>
          <div className="my-auto flex w-10  h-10 border rounded-full bg-white">
            <FaCheck className="m-auto text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-6 ">
        <div className="flex flex-col w-fit place-content-center">
          <div className="font-semibold">Card owner</div>
          <div className="text-xs w-fit text-nowrap text-gray-600">
            Enter the name on the card
          </div>
        </div>
        <div className="w-[300px]">
          <Input
            type="text"
            id="full_name"
            className={"py-6  bg-white"}
            // startIcon={IoCardOutline}
            // {...field}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 mt-6 ">
        <div className="flex flex-col w-fit place-content-center">
          <div className="font-semibold">Expiry date</div>
          <div className="text-xs w-fit text-nowrap text-gray-600">
            Enter the expration date of the card
          </div>
        </div>
        <div className="flex">
          <div className="w-[75px]  me-3">
            <Input
              type="text"
              id="full_name"
              className={"py-6  bg-white"}
              // {...field}
            />
          </div>
          <div className="flex items-center text-3xl font-black me-3">/</div>
          <div className="w-[75px] me-3">
            <Input
              type="text"
              id="full_name"
              className={"py-6  bg-white"}
              // {...field}
            />
          </div>
          <div className="flex flex-col place-content-center me-3">
            <div className="text-sm font-semibold">CVV2</div>
            <div className="text-xs">Security code</div>
          </div>
          <div className="w-[75px]">
            <Input
              type="text"
              id="full_name"
              className={"py-6  bg-white"}
              // {...field}
            />
          </div>
        </div>
      </div>

      <Button className=" px-10 py-2 mt-8 rounded-md bg-primary text-white  ">
        Add Card
      </Button>
    </div>
  );
};

export default Payment;
