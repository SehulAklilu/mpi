import applePay from "@/assets/setting/applePay.png";
import mastercard from "@/assets/setting/mastercard.png";
import paypal from "@/assets/setting/paypal.png";
import visa from "@/assets/setting/visa.png";
import americanExpress from "@/assets/setting/americanExpress.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";

const paymentMethods = [
  { name: "Apple Pay", img: applePay, value: "applePay" },
  { name: "MasterCard", img: mastercard, value: "mastercard" },
  { name: "PayPal", img: paypal, value: "paypal" },
  { name: "Visa", img: visa, value: "visa" },
  { name: "American Express", img: americanExpress, value: "americanExpress" },
];
const FormSchema = z.object({
  card_number: z.string().min(3),
  card_owner_name: z.string().min(3),
  expiry_date: z.date(),
  card_verification_value: z.string(),
});

function Purchases() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = () => {};
  const [card, setCard] = useState("");
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10 my-4 flex-wrap">
            {paymentMethods.map((method, index) => (
              <label
                key={index}
                className={`flex flex-col items-center justify-between gap-2 border border-gray-200 shadow-lg p-4 rounded-2xl cursor-pointer w-48 h-36 relative ${
                  card === method.value ? "border-2 border-primary" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={method.img}
                    alt={method.name}
                    className="w-16 h-10"
                  />
                  <p className="text-sm mt-2">{method.name}</p>
                </div>

                {/* Radio Button Positioned at the Bottom */}
                <input
                  type="radio"
                  name="payment"
                  value={method.value}
                  checked={card === method.value}
                  onChange={(e) => setCard(e.target.value)}
                  className="peer hidden"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-primary">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full peer-checked:bg-primary"></div>
                </div>
              </label>
            ))}
          </div>
          <div className="my-4">
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 max-w-4xl">
              <FormField
                control={form.control}
                name="card_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="card_number"
                        placeholder="Card Number"
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
                name="card_owner_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Owner Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="card_owner_name"
                        placeholder="Card Owner Name"
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
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
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
              <FormField
                control={form.control}
                name="card_verification_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Verification Value</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="card_verification_value"
                        placeholder="Card Verification Value"
                        className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex items-center space-x-6 p-8 px-2">
            {/* Basic Plan */}
            <div className="w-80 bg-white shadow-lg rounded-lg p-6 h-fit">
              <button className="px-4 py-2 bg-gray-200 rounded-lg text-[#000B33]">
                BASIC
              </button>
              <p className="text-sm my-2">
                For all individuals and starters who want to start with
                learning.
              </p>
              <hr className="my-2 border-[#000B33]" />
              <p className="text-6xl font-semibold text-[#000B33] mt-4">$19</p>
              <p className="">Per member, per Month</p>
              <hr className="my-2 border-[#000B33]" />

              <ul className="mt-4 space-y-2 ">
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Access to All Courses
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Connect with Others
                </li>
                <li className="text-gray-800 flex gap-x-4">
                  <FaCircleCheck /> Course Analytics{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
                <li className="text-gray-800 flex gap-x-4">
                  <FaCircleCheck /> Course Cohorts{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
                <li className="text-gray-800 flex gap-x-4">
                  <FaCircleCheck /> New Feature 3{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-black text-white py-2 rounded">
                Pick
              </button>
            </div>

            {/* Professional Plan */}
            <div className="w-80 bg-orange-500 shadow-lg rounded-lg p-6 text-white relative">
              <button className="text-lg my-2 font-semibold bg-gray-200 px-4 py-2 text-[#000B33] rounded-lg">
                PROFESSIONAL{" "}
                <span className="bg-black text-white  text-xs px-2 py-1 rounded">
                  Popular
                </span>
              </button>
              <p className="text-sm">
                For professional domain names investors with a big portfolio.
              </p>
              <hr className="my-2 border-gray-200" />

              <p className="text-6xl font-semibold text-[#000B33] mt-4">$49</p>
              <p className="text-sm">Per member, per Month</p>

              <hr className="my-2 border-gray-200" />

              <div className="mt-2 bg-white text-black text-xs px-3 py-1 rounded inline-block">
                CURRENT SUBSCRIPTION
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Access to All Courses
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Connect with Others
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Feature 3
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Feature 4
                </li>
                <li className="text-gray-200 flex gap-x-4">
                  <FaCircleCheck /> Course Analytics{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
                <li className="text-gray-200 flex gap-x-4">
                  <FaCircleCheck /> Course Cohorts{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
                <li className="text-gray-200 flex gap-x-4">
                  <FaCircleCheck /> New Feature 3{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-black text-white py-2 rounded">
                Unsubscribe
              </button>
            </div>

            {/* Advanced Plan */}
            <div className="w-80 bg-white shadow-lg rounded-lg p-6">
              <button className="px-4 py-2 bg-gray-200 rounded-lg text-[#000B33]">
                ADVANCED
              </button>
              <p className="text-sm">
                For all individuals and starters who want to start with
                domaining.
              </p>
              <hr className="my-2 border-[#000B33]" />

              <p className="text-6xl font-semibold text-[#000B33] mt-4">$99</p>

              <p className="text-gray-500">Per member, per Month</p>
              <hr className="my-2 border-[#000B33]" />

              <ul className="mt-4 space-y-2 ">
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Access to All Courses
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Connect with Others
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Feature 3
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Feature 4
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Feature 5
                </li>
                <li className="flex gap-x-4">
                  <FaCircleCheck /> Feature 6
                </li>
                <li className="text-gray-800 flex gap-x-4">
                  <FaCircleCheck /> Course Analytics{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
                <li className="text-gray-800 flex gap-x-4">
                  <FaCircleCheck /> Course Cohorts{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
                <li className="text-gray-800 flex gap-x-4">
                  <FaCircleCheck /> New Feature 3{" "}
                  <span className="text-xs">(Coming Soon)</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-black text-white py-2 rounded">
                Pick
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Purchases;
