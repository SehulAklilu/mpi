import React from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import bgImage from "../../assets/landingpage/image26.webp";
import bgImage2 from "../../assets/landingpage/image27.jpg";
import map from "../../assets/landingpage/Screenshot 2025-02-14 082120.png";
import { FaArrowDown } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { FaPhoneFlip } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import Footer from "./Footer";
import { IconType } from "react-icons";

interface LocaiotnInterface {
  Icon: IconType;
  lable: string;
  value: string;
}

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  phoneNumber: z.string().nonempty("Phone number is required"),
  email: z.string({ required_error: "Email is Required!" }).email(),
  message: z.string(),
  subject: z.string(),
});

function Contact() {
  const locationDatas: LocaiotnInterface[] = [
    {
      Icon: IoMdPin,
      lable: "Location",
      value: "Atlanta, Georgia, East Street, 123",
    },
    {
      Icon: FaPhoneFlip,
      lable: "Phone",
      value: "+1 234 567 8990",
    },
    {
      Icon: LuMail,
      lable: "Email",
      value: "contact@mpi.com",
    },
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = () => {};

  // const handleChange = (value: any) => {
  //   form.setValue("phoneNumber", value);

  //   if (value) {
  //     const phoneNumberObj = parsePhoneNumber(value);
  //     if (phoneNumberObj) {
  //       form.setValue("phoneNumberCountryCode", phoneNumberObj?.country || "");
  //     }
  //   }
  // };
  return (
    <div>
      <div
        className="relative h-[30rem] bg-cover bg-center bg-no-repeat overflow-x-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <LandingPageNavBar />

        {/* Diagonal black line */}
        <div className="absolute hidden md:block w-0 h-0 border-l-[100vw]  border-b-[30rem] top-0 border-l-transparent  border-b-black opacity-30"></div>

        {/* Content Section */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] text-center">
          <h1 className="text-3xl md:text-7xl text-white font-semibold tracking-wide leading-tight">
            Reach Out To Us. We Can Help.
          </h1>

          <div className="mt-6 flex  flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-12 h-12 text-lg rounded-full text-white bg-primary   flex items-center justify-center">
              <FaArrowDown className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* map */}
      <div className="my-20">
        <h1 className="text-4xl text-center font-bold mb-10">
          Address & Contacts
        </h1>
        <div
          className="relative mt-10 md:mt-40 h-auto md:h-[44rem] bg-cover bg-center bg-no-repeat w-full"
          style={{
            backgroundImage: `url(${bgImage2})`,
          }}
        >
          {/* Responsive Container */}
          <div className="flex flex-wrap justify-center gap-4 px-4 md:absolute md:w-full md:top-[-6rem]">
            {locationDatas.map((data, index) => (
              <div
                key={index}
                className="py-6 px-4 z-50 flex flex-col items-center rounded-xl shadow-lg bg-white w-full sm:w-[14rem] md:w-[18rem] lg:w-[20rem] gap-3"
              >
                <data.Icon className="text-3xl md:text-4xl text-primary" />
                <p className="text-xl md:text-2xl text-center">{data.lable}</p>
                <p className="text-lg md:text-2xl text-center">{data.value}</p>
              </div>
            ))}
          </div>

          <div className="m-4 grid grid-cols-1 md:grid-cols-6 gap-4 mx-auto bg-white z-20 p-6 md:p-10 rounded-xl shadow-xl drop-shadow-xl w-[94%] md:w-[90%] xl:w-[62rem] mt-10 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:-bottom-16 ">
            <div className="col-span-full md:col-span-4">
              <h1 className="text-primary text-sm">CONTACT</h1>
              <h1 className="text-4xl">Get in Touch</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="First Name"
                              className="!rounded-3xl shadow !bg-[#F0F0FF]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Controller
                        name="phoneNumber"
                        control={form.control}
                        rules={{
                          required: "Phone number is required",
                        }}
                        render={({ field, fieldState }) => (
                          <div className="group flex flex-col space-y-2">
                            <label className="text-sm font-medium">
                              Phone Number
                            </label>

                            <PhoneInput
                              {...field}
                              value={field.value}
                              onChange={(value) => {
                                field.onChange(value);
                                // handleChange(value);
                              }}
                              country={"us"}
                              enableSearch={true}
                              disableDropdown={false}
                              inputClass="!rounded-3xl shadow !h-10 !py-4 !px-12 !bg-[#F0F0FF] !border-0 !w-full"
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
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                id="email"
                                placeholder="Enter your email"
                                className="!rounded-3xl shadow flex-1 !bg-[#F0F0FF]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id="subject"
                              placeholder="Subject"
                              className="!rounded-3xl shadow !bg-[#F0F0FF]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <label>Message</label>
                      <textarea
                        id="Message"
                        placeholder="Enter your message..."
                        rows={2}
                        className="w-full border p-2 !rounded-xl shadow !bg-[#F0F0FF]"
                        {...form.register("message")}
                      />
                    </div>
                    <button className="w-full py-2 bg-primary text-white rounded-full border hover:bg-white hover:text-primary hover:border-primary">
                      Submit
                    </button>
                  </form>
                </Form>
              </div>
            </div>
            <div className="col-span-full md:col-span-2">
              <img
                src={map}
                className="w-full h-auto md:h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* stay connected */}
      <div className="container mx-auto my-40 space-y-4">
        <h1 className="text-3xl font-bold text-center">
          Stay Connect On Our Social Media
        </h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaFacebookF className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaInstagram className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaEnvelope className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaYoutube className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaLinkedin className="text-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center m-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-5xl text-gray-800 md:w-[90%]">
              Subscribe To Our Weekly Newsletter
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed md:w-[90%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              dui at ligula commodo euismod. Quisque sapien libero, aliquet sit
              amet orci sed, sollicitudin blandit ipsum.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start md:w-[90%] rounded-full bg-transparent sm:bg-[#E9E9E9] ">
            <input
              type="email"
              placeholder="Email"
              className="w-full sm:w-auto flex-grow px-4 py-3 rounded-full bg-transparent text-black outline-none m-2 border sm:border-none"
            />
            <button className="w-full sm:w-auto px-6 py-3 m-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Contact;
