import logo from "../../assets/logo/new-logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "react-query";
import { sendOtp } from "@/api/auth.api";
import { useSignupContext } from "@/context/SignupContext";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { OtpPayload } from "@/types/auth.type";
import { useEffect } from "react";

const FormSchema = z.object({
  email: z.string({ required_error: "Email is Required!" }).email(),
});

const PhoneNumber = ({ setCurr }: any) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const signupCon = useSignupContext();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["sendOpt"],
    mutationFn: (payload: OtpPayload) => sendOtp(payload),
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
    mutate(data);
    signupCon.setUserInfo({ email: data.email });
  }

  useEffect(() => {
    if (signupCon.userInfo.email) {
      form.setValue("email", signupCon.userInfo.email);
    }
  }, []);
  return (
    <>
      <img className="w-52 mx-auto" src={logo} alt="" />
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold mt-4">
          Sign Up to join Mindsight
        </div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          If continuing, you have agreed to our Terms of Service and confirm you
          have read our Privacy And Cookie Statement
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mx-auto max-w-sm  mt-16">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      className={"!rounded-3xl shadow !bg-[#F0F0FF] "}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="flex items-center justify-center px-7 py-2 shadow rounded-3xl mt-2 bg-primary text-white  ">
              {isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                "Get Started"
              )}
            </Button>
            <Button className="flex py-2 shadow rounded-3xl items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
              <FcGoogle size={22} className="text-red-500" />
              <div className="text-sm">Google</div>
            </Button>
            {/* <Button className="flex py-2 shadow rounded-xl items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
              <FaFacebook size={18} className="text-blue-600" />
              <div className="text-sm">Facebook</div>
            </Button> */}
          </div>
        </form>
      </Form>
      <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
        <div>Already Registered?</div>
        <Link
          to={"/login"}
          //   role="button"
          onClick={() => setCurr((c: number) => c - 1)}
          className="text-primary"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default PhoneNumber;
